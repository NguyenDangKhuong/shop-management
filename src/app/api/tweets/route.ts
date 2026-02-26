import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/utils/connectDb'
import TwitterTokenModel from '@/models/TwitterToken'

// In-memory cache: username -> { html, timestamp }
const cache = new Map<string, { html: string; ts: number }>()
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

// Track rate limit cooldown
let rateLimitUntil = 0

// Cache DB cookie in memory
let cachedCookie: { value: string; ts: number } | null = null
const COOKIE_CACHE_TTL = 5 * 60 * 1000

async function getCookie(): Promise<string | null> {
  if (cachedCookie && Date.now() - cachedCookie.ts < COOKIE_CACHE_TTL) {
    return cachedCookie.value
  }
  try {
    await connectDB()
    const token = await TwitterTokenModel.findOne().sort({ createdAt: -1 })
    if (token?.cookie) {
      cachedCookie = { value: token.cookie, ts: Date.now() }
      return token.cookie
    }
  } catch {
    console.error('Failed to get cookie from DB')
  }
  return process.env.TWITTER_COOKIE || null
}

async function fetchWithRetry(url: string, headers: Record<string, string>, maxRetries = 3): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const res = await fetch(url, { headers })

    if (res.status !== 429) return res

    // Respect Retry-After header
    const retryAfter = res.headers.get('Retry-After')
    const waitMs = retryAfter
      ? parseInt(retryAfter) * 1000
      : Math.pow(2, attempt) * 1000 // exponential backoff: 1s, 2s, 4s

    rateLimitUntil = Date.now() + waitMs
    await new Promise(r => setTimeout(r, waitMs))
  }
  // Return last 429 response if all retries fail
  return fetch(url, { headers })
}

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  if (!username) {
    return NextResponse.json({ error: 'username required' }, { status: 400 })
  }

  const key = username.toLowerCase()

  // Check cache first
  const cached = cache.get(key)
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return new NextResponse(cached.html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
        'X-Cache': 'HIT',
      },
    })
  }

  // If we're in rate limit cooldown, serve stale cache
  if (Date.now() < rateLimitUntil && cached) {
    return new NextResponse(cached.html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Cache': 'RATE-LIMITED',
      },
    })
  }

  try {
    const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${encodeURIComponent(key)}?dnt=true&embedId=twitter-widget-0&hideHeader=true&hideFooter=true&hideBorder=true&theme=dark&transparent=true&lang=en`

    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    }

    const cookie = await getCookie()
    if (cookie) {
      headers['Cookie'] = cookie
    }

    const res = await fetchWithRetry(url, headers)

    if (!res.ok) {
      // If still rate limited after retries, serve stale cache
      if (res.status === 429 && cached) {
        return new NextResponse(cached.html, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, s-maxage=60',
            'X-Cache': 'STALE-429',
          },
        })
      }
      return NextResponse.json(
        { error: `Twitter returned ${res.status}` },
        { status: res.status }
      )
    }

    let html = await res.text()

    // 1. Extract video mp4 URLs and group by video ID (highest quality)
    // Matches both amplify_video and ext_tw_video formats
    const mp4Regex = /https:\/\/video\.twimg\.com\/(?:amplify_video|ext_tw_video)\/(\d+)\/(?:vid|pu\/vid)\/avc1\/(\d+)x(\d+)\/[^"\\]+\.mp4[^"\\]*/g
    const videoMap: Record<string, { url: string; w: number; h: number }> = {}
    let mp4Match
    while ((mp4Match = mp4Regex.exec(html)) !== null) {
      const [url, videoId, w, h] = mp4Match
      const width = parseInt(w)
      const height = parseInt(h)
      if (!videoMap[videoId] || width > videoMap[videoId].w) {
        videoMap[videoId] = { url, w: width, h: height }
      }
    }

    // 2. Inject dark background CSS
    const darkCss = `<style>
body, html { background: #0a0a0a !important; color: #e2e8f0 !important; }
article, [data-testid="tweet"] { background: #0a0a0a !important; }
div { border-color: rgba(255,255,255,0.1) !important; }
/* macOS-style scrollbar */
* { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
</style>`
    html = html.replace('</head>', darkCss + '</head>')

    // 3. Inject client-side script to replace video thumbnails with <video> elements
    const videoMapJson = JSON.stringify(videoMap)
    const injectedScript = `<script>
(function(){
  // Bypass sensitive content warning — auto-click Yes/View buttons
  var t=setInterval(function(){document.querySelectorAll('button').forEach(function(b){if(b.textContent&&(b.textContent.includes('Yes')||b.textContent.trim()==='View'))b.click();});},300);setTimeout(function(){clearInterval(t);},8000);

  // Video map: videoId -> { url, w, h }
  var videoMap = ${videoMapJson};

  // Replace video thumbnails with actual <video> elements
  function replaceVideos() {
    var links = document.querySelectorAll('a[aria-label="View video on X"]');
    links.forEach(function(a) {
      var img = a.querySelector('img');
      if (!img) return;
      var src = img.src || '';
      var match = src.match(/(?:amplify_video_thumb|ext_tw_video_thumb)\\/(\\d+)/);
      if (!match) return;
      var videoId = match[1];
      var info = videoMap[videoId];
      if (!info) return;

      var isPortrait = info.h > info.w;
      var container = document.createElement('div');
      container.style.cssText = 'position:relative;width:100%;border-radius:12px;overflow:hidden;';
      var video = document.createElement('video');
      video.playsInline = true;
      video.controls = true;
      video.preload = 'metadata';
      video.poster = src;
      video.style.cssText = 'width:100%;display:block;border-radius:12px;aspect-ratio:' + info.w + '/' + info.h + ';';
      var source = document.createElement('source');
      source.src = info.url;
      source.type = 'video/mp4';
      video.appendChild(source);
      container.appendChild(video);
      a.parentNode.replaceChild(container, a);
      // Fix sibling div with padding-bottom:100% that forces square
      var grandparent = container.parentElement && container.parentElement.parentElement;
      if (grandparent) {
        var siblings = grandparent.querySelectorAll('div');
        siblings.forEach(function(sib) {
          if (sib.style.paddingBottom && sib.style.paddingBottom.indexOf('100') !== -1) {
            sib.style.paddingBottom = (info.h / info.w * 100).toFixed(2) + '%';
          }
        });
      }
    });
  }

  // Block ALL navigation — intercept clicks and prevent redirect
  document.addEventListener('click', function(e) {
    var el = e.target;
    while (el && el !== document.body) {
      if (el.tagName === 'A' || el.getAttribute && el.getAttribute('role') === 'link') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      el = el.parentElement;
    }
  }, true);

  // Also block window.open
  window.open = function() { return null; };

  // Strip <a> tags to <span>
  function stripLinks() {
    document.querySelectorAll('a').forEach(function(a) {
      var span = document.createElement('span');
      span.innerHTML = a.innerHTML;
      span.className = a.className;
      span.style.cssText = a.style.cssText + ';cursor:default;';
      if (a.parentNode) a.parentNode.replaceChild(span, a);
    });
  }

  // Add copy button next to @usernames
  function addCopyButtons() {
    document.querySelectorAll('span').forEach(function(span) {
      if (span.dataset.copyAdded) return;
      var text = span.textContent || '';
      if (!text.match(/^@[a-zA-Z0-9_]+$/) || span.closest('[data-copy-btn]')) return;
      span.dataset.copyAdded = '1';
      var btn = document.createElement('span');
      btn.dataset.copyBtn = '1';
      btn.textContent = '📋';
      btn.style.cssText = 'cursor:pointer;font-size:10px;margin-left:4px;opacity:0.4;vertical-align:middle;';
      btn.onmouseover = function() { btn.style.opacity = '1'; };
      btn.onmouseout = function() { btn.style.opacity = '0.4'; };
      btn.onclick = function(e) {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(text).then(function() {
          btn.textContent = '✓';
          setTimeout(function() { btn.textContent = '📋'; }, 1000);
        });
        return false;
      };
      span.parentNode.insertBefore(btn, span.nextSibling);
    });
  }

  // Wait for Twitter JS to render DOM, then replace
  var attempts = 0;
  var replacer = setInterval(function() {
    replaceVideos();
    stripLinks();
    addCopyButtons();
    attempts++;
    if (attempts > 20) clearInterval(replacer);
  }, 500);
})();
</script>`
    html = html.replace('</body>', injectedScript + '</body>')

    // Store in cache
    cache.set(key, { html, ts: Date.now() })

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache': 'MISS',
      },
    })
  } catch {
    // Serve stale cache on error
    if (cached) {
      return new NextResponse(cached.html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'X-Cache': 'STALE-ERROR',
        },
      })
    }
    return NextResponse.json({ error: 'Failed to fetch tweets' }, { status: 500 })
  }
}
