import { blogPosts } from '../blogs/blogData'
import { SITE_URL } from '@/utils/constants'
import { BlogPost } from '../blogs/types'

export async function GET() {
    const posts = [...blogPosts]
        .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime())

    const feedItems = posts
        .map((post) => {
            const url = `${SITE_URL}/blogs/${post.slug}`
            return `    <item>
      <title><![CDATA[${post.title.vi}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.description.vi}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>khuong@thetaphoa.com (Nguyen Dang Khuong)</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
        })
        .join('\n')

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>TheTapHoa — Frontend Knowledge Blog</title>
    <link>${SITE_URL}/blogs</link>
    <description>Chia sẻ kiến thức Frontend chuyên sâu: JavaScript, React, Next.js, TypeScript, System Design — dành cho developer Việt Nam.</description>
    <language>vi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>khuong@thetaphoa.com (Nguyen Dang Khuong)</managingEditor>
    <webMaster>khuong@thetaphoa.com (Nguyen Dang Khuong)</webMaster>
    <ttl>60</ttl>
${feedItems}
  </channel>
</rss>`

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
    })
}
