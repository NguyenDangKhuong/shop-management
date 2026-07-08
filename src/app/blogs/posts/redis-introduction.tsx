import { BlogPost } from '../types'
import { CodeBlock, Heading2, Heading3, Paragraph, Highlight, Callout, InlineCode } from '../components/BlogComponents'

const redisIntroduction: BlogPost = {
    slug: 'redis-introduction',
    title: {
        vi: 'Redis — Giới thiệu, Cách dùng, Ưu & Nhược điểm',
        en: 'Redis — Introduction, Usage, Pros & Cons',
    },
    description: {
        vi: 'Tìm hiểu Redis từ A-Z: khái niệm in-memory database, data structures, caching strategies, pub/sub, use cases thực tế và khi nào nên (hoặc không nên) dùng Redis.',
        en: 'Learn Redis from A-Z: in-memory database concepts, data structures, caching strategies, pub/sub, real-world use cases and when you should (or should not) use Redis.',
    },
    date: '2025-03-12',
    tags: ['Redis', 'Database', 'Caching', 'Backend'],
    emoji: '🔴',
    color: '#DC382D',
    content: {
        vi: (
            <>
                <Paragraph>
                    <Highlight>Redis</Highlight> (Remote Dictionary Server) là một <Highlight>in-memory data store</Highlight> mã nguồn mở,
                    được sử dụng rộng rãi làm cache, message broker, session store, và real-time analytics.
                    Redis lưu dữ liệu trong RAM nên có tốc độ đọc/ghi <Highlight>cực nhanh</Highlight> — hàng triệu operations/giây.
                </Paragraph>

                <Callout type="info">
                    Redis ban đầu là <strong>cache layer</strong>, nhưng giờ đã phát triển thành một <strong>multi-model database</strong> với
                    hỗ trợ persistence, clustering, streams, và nhiều data structures phong phú.
                </Callout>

                {/* ===== Khái niệm ===== */}
                <Heading2>🧠 Khái niệm cốt lõi</Heading2>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-5">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="text-red-400 font-bold text-sm mb-1">In-Memory</div>
                        <div className="text-text-primary text-sm">Dữ liệu lưu trong RAM</div>
                        <div className="text-text-secondary text-xs mt-1">Tốc độ: ~100,000 ops/sec (single thread)</div>
                    </div>
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-5">
                        <div className="text-3xl mb-2">🔑</div>
                        <div className="text-blue-400 font-bold text-sm mb-1">Key-Value Store</div>
                        <div className="text-text-primary text-sm">Mọi data đều lưu dạng key → value</div>
                        <div className="text-text-secondary text-xs mt-1">Key: string, Value: nhiều kiểu data</div>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="text-green-400 font-bold text-sm mb-1">Single-Threaded</div>
                        <div className="text-text-primary text-sm">1 thread xử lý commands</div>
                        <div className="text-text-secondary text-xs mt-1">Không cần lock → atomic operations</div>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-5">
                        <div className="text-3xl mb-2">💾</div>
                        <div className="text-purple-400 font-bold text-sm mb-1">Persistence (tuỳ chọn)</div>
                        <div className="text-text-primary text-sm">RDB snapshots + AOF logs</div>
                        <div className="text-text-secondary text-xs mt-1">Dữ liệu không mất khi restart</div>
                    </div>
                </div>

                {/* ===== Data Structures ===== */}
                <Heading2>📦 Data Structures trong Redis</Heading2>

                <Paragraph>
                    Redis không chỉ là key-value đơn giản. Nó hỗ trợ <Highlight>nhiều data structures phong phú</Highlight>,
                    mỗi loại phù hợp với use case khác nhau.
                </Paragraph>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border-primary">
                                <th className="text-left p-3 text-text-secondary font-medium">Type</th>
                                <th className="text-left p-3 text-text-secondary font-medium">Mô tả</th>
                                <th className="text-left p-3 text-text-secondary font-medium">Use Case</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-primary">
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-red-400">String</td>
                                <td className="p-3">Giá trị đơn (text, number, JSON)</td>
                                <td className="p-3">Cache, counter, session</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-blue-400">Hash</td>
                                <td className="p-3">Object (field → value pairs)</td>
                                <td className="p-3">User profile, product info</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-green-400">List</td>
                                <td className="p-3">Linked list (ordered, duplicates OK)</td>
                                <td className="p-3">Message queue, activity feed</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-yellow-400">Set</td>
                                <td className="p-3">Unordered unique values</td>
                                <td className="p-3">Tags, unique visitors, friends</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-purple-400">Sorted Set</td>
                                <td className="p-3">Set + score (auto-sorted)</td>
                                <td className="p-3">Leaderboard, ranking, timeline</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-cyan-400">Stream</td>
                                <td className="p-3">Append-only log (like Kafka)</td>
                                <td className="p-3">Event sourcing, real-time data</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium text-pink-400">Pub/Sub</td>
                                <td className="p-3">Publish/Subscribe messaging</td>
                                <td className="p-3">Chat, notifications, real-time</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock title="redis-data-structures.sh">{`# ===== STRING =====
SET user:token "abc123"          # Lưu token
GET user:token                    # → "abc123"
SET page:views 0                  # Counter
INCR page:views                   # → 1 (atomic increment)
SETEX session:user1 3600 "data"   # Set + expire 1 giờ (TTL)

# ===== HASH =====
HSET user:1001 name "Khuong" age 28 role "developer"
HGET user:1001 name               # → "Khuong"
HGETALL user:1001                 # → name, Khuong, age, 28, role, developer
HINCRBY user:1001 age 1           # age = 29 (atomic)

# ===== LIST =====
LPUSH queue:emails "email1" "email2"   # Push vào đầu
RPOP queue:emails                       # Pop từ cuối → "email1"
LRANGE queue:emails 0 -1               # Lấy tất cả

# ===== SET =====
SADD tags:post1 "redis" "database" "cache"
SMEMBERS tags:post1                     # → redis, database, cache
SISMEMBER tags:post1 "redis"            # → 1 (true)
SINTER tags:post1 tags:post2            # Intersection 2 sets

# ===== SORTED SET =====
ZADD leaderboard 100 "player1" 200 "player2" 150 "player3"
ZRANGE leaderboard 0 -1 WITHSCORES     # Sorted by score
ZREVRANGE leaderboard 0 2              # Top 3 (desc)
ZINCRBY leaderboard 50 "player1"       # player1 = 150

# ===== PUB/SUB =====
SUBSCRIBE chat:room1                    # Subscriber lắng nghe
PUBLISH chat:room1 "Hello everyone!"    # Publisher gửi message`}</CodeBlock>

                {/* ===== Caching Strategies ===== */}
                <Heading2>🎯 Caching Strategies với Redis</Heading2>

                <Heading3>1. Cache-Aside (Lazy Loading)</Heading3>
                <Paragraph>Pattern phổ biến nhất: app kiểm tra cache trước, nếu miss thì query DB rồi lưu vào cache.</Paragraph>
                <CodeBlock title="cache-aside.ts">{`async function getUser(userId: string) {
  // 1. Check cache
  const cached = await redis.get(\`user:\${userId}\`)
  if (cached) return JSON.parse(cached) // Cache HIT ✅

  // 2. Cache MISS → query database
  const user = await db.user.findById(userId)

  // 3. Save to cache (TTL 1 giờ)
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user))

  return user
}

// Khi update → invalidate cache
async function updateUser(userId: string, data: any) {
  await db.user.update(userId, data)
  await redis.del(\`user:\${userId}\`)  // Xóa cache → next read sẽ fetch mới
}`}</CodeBlock>

                <Heading3>2. Write-Through</Heading3>
                <Paragraph>Ghi vào cache VÀ DB cùng lúc. Data luôn consistent nhưng write chậm hơn.</Paragraph>
                <CodeBlock title="write-through.ts">{`async function updateProduct(id: string, data: any) {
  // Ghi cả 2 cùng lúc
  await Promise.all([
    db.product.update(id, data),
    redis.setex(\`product:\${id}\`, 3600, JSON.stringify(data)),
  ])
}`}</CodeBlock>

                <Heading3>3. Write-Behind (Write-Back)</Heading3>
                <Paragraph>Ghi vào cache trước, batch write vào DB sau. Nhanh nhưng rủi ro mất data nếu Redis crash.</Paragraph>

                <Heading3>4. Read-Through</Heading3>
                <Paragraph>Cache tự động fetch từ DB khi miss. Dùng trong các frameworks như Spring Cache.</Paragraph>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border-primary">
                                <th className="text-left p-3 text-text-secondary font-medium">Strategy</th>
                                <th className="text-left p-3 text-green-500 font-medium">Pros</th>
                                <th className="text-left p-3 text-red-500 font-medium">Cons</th>
                                <th className="text-left p-3 text-text-secondary font-medium">Dùng khi</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-primary">
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Cache-Aside</td>
                                <td className="p-3">Đơn giản, flexible</td>
                                <td className="p-3">Cache miss penalty</td>
                                <td className="p-3">General purpose (90% cases)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Write-Through</td>
                                <td className="p-3">Data luôn consistent</td>
                                <td className="p-3">Write chậm (2x)</td>
                                <td className="p-3">Data consistency quan trọng</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Write-Behind</td>
                                <td className="p-3">Write cực nhanh</td>
                                <td className="p-3">Risk mất data</td>
                                <td className="p-3">High write throughput</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Read-Through</td>
                                <td className="p-3">Transparent cho app</td>
                                <td className="p-3">Complex setup</td>
                                <td className="p-3">Framework-managed cache</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== Use Cases ===== */}
                <Heading2>🚀 Use Cases thực tế</Heading2>

                <div className="my-4 space-y-3">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm mb-2">1. 🗄️ Caching (phổ biến nhất)</div>
                        <div className="text-text-primary text-sm">
                            Cache API responses, database queries, HTML fragments, computed results.<br />
                            <strong>Ví dụ:</strong> E-commerce product pages — cache product info + reviews, TTL 5 phút.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm mb-2">2. 🔐 Session Store</div>
                        <div className="text-text-primary text-sm">
                            Lưu user sessions thay vì trong memory server. Shared across multiple servers.<br />
                            <strong>Ví dụ:</strong> <InlineCode>express-session</InlineCode> + <InlineCode>connect-redis</InlineCode> — session persist qua deploys.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm mb-2">3. 🏆 Leaderboard / Ranking</div>
                        <div className="text-text-primary text-sm">
                            Sorted Set: tự động sort by score, O(log N) insert/update, O(1) get rank.<br />
                            <strong>Ví dụ:</strong> Game leaderboard — <InlineCode>ZADD</InlineCode> score, <InlineCode>ZREVRANGE</InlineCode> top 100.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <div className="text-yellow-400 font-bold text-sm mb-2">4. 🚦 Rate Limiting</div>
                        <div className="text-text-primary text-sm">
                            Đếm requests per IP/user trong sliding window. Atomic INCR + EXPIRE.<br />
                            <strong>Ví dụ:</strong> API rate limit: 100 requests/phút per user.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm mb-2">5. 📨 Message Queue / Pub-Sub</div>
                        <div className="text-text-primary text-sm">
                            List (LPUSH/BRPOP) cho simple queue. Pub/Sub cho real-time broadcast. Streams cho durable messaging.<br />
                            <strong>Ví dụ:</strong> Chat app — PUBLISH message tới channel, subscribers nhận real-time.
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                        <div className="text-cyan-400 font-bold text-sm mb-2">6. 🔒 Distributed Lock</div>
                        <div className="text-text-primary text-sm">
                            SET key NX EX — acquire lock atomically. Redlock algorithm cho multi-node.<br />
                            <strong>Ví dụ:</strong> Prevent double payment processing trong microservices.
                        </div>
                    </div>
                </div>

                <CodeBlock title="real-world-examples.ts">{`// ===== Rate Limiting =====
async function rateLimit(ip: string, limit = 100, window = 60) {
  const key = \`rate:\${ip}\`
  const current = await redis.incr(key)
  if (current === 1) await redis.expire(key, window) // Set TTL lần đầu
  return current <= limit  // true = allowed, false = blocked
}

// ===== Session Store (Express) =====
import session from 'express-session'
import RedisStore from 'connect-redis'
app.use(session({
  store: new RedisStore({ client: redis }),
  secret: 'your-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
}))

// ===== Distributed Lock =====
async function acquireLock(key: string, ttl = 10) {
  // SET key "locked" NX EX 10 — chỉ set nếu chưa tồn tại
  const result = await redis.set(\`lock:\${key}\`, 'locked', 'EX', ttl, 'NX')
  return result === 'OK' // true = acquired, false = already locked
}
async function releaseLock(key: string) {
  await redis.del(\`lock:\${key}\`)
}

// ===== Leaderboard =====
await redis.zadd('leaderboard', 1500, 'player:khuong')
await redis.zadd('leaderboard', 2000, 'player:minh')
const top10 = await redis.zrevrange('leaderboard', 0, 9, 'WITHSCORES')
const rank = await redis.zrevrank('leaderboard', 'player:khuong') // 0-indexed`}</CodeBlock>

                {/* ===== Node.js Integration ===== */}
                <Heading2>🔌 Tích hợp Redis với Node.js</Heading2>

                <CodeBlock title="redis-nodejs.ts">{`// ===== ioredis (recommended) =====
import Redis from 'ioredis'

// Single instance
const redis = new Redis({
  host: 'localhost',
  port: 6379,
  password: 'your-password',  // optional
  db: 0,                       // database number (0-15)
  retryStrategy: (times) => Math.min(times * 50, 2000),
})

// Connection events
redis.on('connect', () => console.log('✅ Redis connected'))
redis.on('error', (err) => console.error('❌ Redis error:', err))

// ===== Basic Operations =====
await redis.set('key', 'value')
await redis.get('key')              // → "value"
await redis.setex('temp', 60, 'v')  // Expire in 60s
await redis.del('key')              // Delete

// ===== Pipeline (batch commands — much faster) =====
const pipeline = redis.pipeline()
pipeline.set('a', '1')
pipeline.set('b', '2')
pipeline.get('a')
pipeline.get('b')
const results = await pipeline.exec()  // 1 roundtrip for 4 commands!

// ===== Next.js API Route =====
// app/api/products/[id]/route.ts
import { redis } from '@/lib/redis'

export async function GET(req: Request, { params }) {
  const cacheKey = \`product:\${params.id}\`

  // Try cache first
  const cached = await redis.get(cacheKey)
  if (cached) return Response.json(JSON.parse(cached))

  // Fetch from DB
  const product = await db.product.findById(params.id)
  await redis.setex(cacheKey, 300, JSON.stringify(product)) // Cache 5 min

  return Response.json(product)
}`}</CodeBlock>

                {/* ===== Persistence ===== */}
                <Heading2>💾 Persistence — Lưu data xuống disk</Heading2>

                <div className="my-4 space-y-3">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="text-blue-400 font-bold text-sm mb-2">📸 RDB (Redis Database Backup)</div>
                        <div className="text-text-primary text-sm">
                            <strong>Snapshot</strong> toàn bộ data tại thời điểm → file <InlineCode>.rdb</InlineCode><br />
                            • Compact, tốt cho backup/disaster recovery<br />
                            • Có thể mất data giữa 2 snapshots (ví dụ: save mỗi 5 phút → mất tối đa 5 phút data)<br />
                            • Config: <InlineCode>save 900 1</InlineCode> (save nếu 1 key thay đổi trong 15 phút)
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm mb-2">📝 AOF (Append-Only File)</div>
                        <div className="text-text-primary text-sm">
                            <strong>Log mọi write command</strong> → replay khi restart<br />
                            • Durable hơn RDB (fsync every second hoặc every command)<br />
                            • File lớn hơn RDB, restore chậm hơn<br />
                            • Config: <InlineCode>appendonly yes</InlineCode>, <InlineCode>appendfsync everysec</InlineCode> (recommended)
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <div className="text-purple-400 font-bold text-sm mb-2">🔀 RDB + AOF (recommended)</div>
                        <div className="text-text-primary text-sm">
                            Dùng cả 2: AOF cho durability (mất tối đa 1 giây data), RDB cho fast backup/restore.<br />
                            Khi restart: Redis ưu tiên load AOF (đầy đủ hơn).
                        </div>
                    </div>
                </div>

                {/* ===== Pros & Cons ===== */}
                <Heading2>⚖️ Ưu điểm & Nhược điểm</Heading2>

                <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm mb-3">✅ Ưu điểm</div>
                        <div className="text-text-primary text-sm space-y-2">
                            <div>⚡ <strong>Cực nhanh</strong> — sub-millisecond latency, ~100K ops/sec</div>
                            <div>📦 <strong>Rich data structures</strong> — String, Hash, List, Set, Sorted Set, Stream</div>
                            <div>🔄 <strong>Atomic operations</strong> — INCR, LPUSH... thread-safe mà không cần lock</div>
                            <div>📡 <strong>Pub/Sub built-in</strong> — real-time messaging không cần thêm tool</div>
                            <div>💾 <strong>Persistence tuỳ chọn</strong> — RDB + AOF, không sợ mất data</div>
                            <div>🌐 <strong>Clustering</strong> — horizontal scaling, sharding tự động</div>
                            <div>⏰ <strong>TTL built-in</strong> — tự xoá key hết hạn, perfect for cache</div>
                            <div>🔧 <strong>Lua scripting</strong> — chạy custom logic server-side, atomic</div>
                            <div>📚 <strong>Ecosystem phong phú</strong> — mọi ngôn ngữ đều có client library</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm mb-3">❌ Nhược điểm</div>
                        <div className="text-text-primary text-sm space-y-2">
                            <div>💰 <strong>RAM expensive</strong> — data phải fit trong RAM. 1TB data = cần 1TB+ RAM</div>
                            <div>🔍 <strong>Không có query language</strong> — không WHERE, JOIN, GROUP BY như SQL</div>
                            <div>📊 <strong>Không phù hợp cho complex queries</strong> — chỉ lookup by key</div>
                            <div>⚠️ <strong>Single-threaded I/O</strong> — CPU-bound operations có thể block</div>
                            <div>🔄 <strong>Persistence trade-offs</strong> — RDB mất data, AOF chậm + file lớn</div>
                            <div>🏗️ <strong>Cluster complexity</strong> — multi-key operations bị giới hạn</div>
                            <div>📉 <strong>No built-in security</strong> — cần config TLS, ACL riêng</div>
                            <div>🗑️ <strong>Eviction khi hết RAM</strong> — data bị xoá theo policy</div>
                        </div>
                    </div>
                </div>

                {/* ===== Khi nào dùng / không dùng ===== */}
                <Heading2>🤔 Khi nào dùng (và KHÔNG dùng) Redis?</Heading2>

                <div className="my-4 space-y-3">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm mb-2">✅ NÊN dùng Redis khi:</div>
                        <div className="text-text-primary text-sm">
                            • Cần <strong>cache layer</strong> giữa app và DB (giảm DB load 80-95%)<br />
                            • <strong>Session management</strong> cho multiple servers (horizontal scaling)<br />
                            • <strong>Real-time features</strong>: chat, notifications, live updates<br />
                            • <strong>Rate limiting</strong>, throttling, request counting<br />
                            • <strong>Leaderboards</strong>, rankings (Sorted Set là perfect)<br />
                            • <strong>Job/task queues</strong> (BullMQ, Bee-Queue đều dùng Redis)<br />
                            • Data có <strong>TTL tự nhiên</strong> (OTP codes, temp tokens, carts)
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm mb-2">❌ KHÔNG nên dùng Redis khi:</div>
                        <div className="text-text-primary text-sm">
                            • Data lớn hơn RAM available (dùng DB thường)<br />
                            • Cần <strong>complex queries</strong>: JOIN, aggregation, full-text search (dùng PostgreSQL, Elasticsearch)<br />
                            • Data cần <strong>strong consistency</strong> + ACID transactions (dùng relational DB)<br />
                            • <strong>Primary database</strong> cho critical data (Redis là cache, không phải source of truth)<br />
                            • <strong>Large objects</strong> ({'>'}512MB per key — Redis limit)<br />
                            • Budget limited — RAM đắt hơn disk storage nhiều lần
                        </div>
                    </div>
                </div>

                {/* ===== Redis vs Alternatives ===== */}
                <Heading2>📊 Redis vs Alternatives</Heading2>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border-primary">
                                <th className="text-left p-3 text-text-secondary font-medium">Feature</th>
                                <th className="text-left p-3 text-red-400 font-medium">Redis</th>
                                <th className="text-left p-3 text-green-400 font-medium">Memcached</th>
                                <th className="text-left p-3 text-blue-400 font-medium">PostgreSQL</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-primary">
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Data structures</td>
                                <td className="p-3">Nhiều (String, Hash, List, Set...)</td>
                                <td className="p-3">Chỉ String</td>
                                <td className="p-3">Tables, JSON, Arrays</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Persistence</td>
                                <td className="p-3">RDB + AOF</td>
                                <td className="p-3">Không</td>
                                <td className="p-3">Full ACID</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Speed</td>
                                <td className="p-3">~100K ops/s</td>
                                <td className="p-3">~100K ops/s (multi-thread)</td>
                                <td className="p-3">~10K queries/s</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Pub/Sub</td>
                                <td className="p-3">✅ Built-in</td>
                                <td className="p-3">❌</td>
                                <td className="p-3">✅ LISTEN/NOTIFY</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Best for</td>
                                <td className="p-3">Cache + nhiều use cases</td>
                                <td className="p-3">Simple cache only</td>
                                <td className="p-3">Primary database</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== Quick Reference ===== */}
                <Heading2>📋 Quick Reference — Redis Commands</Heading2>

                <CodeBlock title="redis-cheatsheet.sh">{`# === Connection ===
redis-cli                          # Connect local
redis-cli -h host -p 6379 -a pass  # Connect remote
PING                               # → PONG (health check)
INFO                               # Server info
DBSIZE                             # Số keys hiện tại

# === Key Management ===
KEYS pattern*                      # Tìm keys (⚠️ chậm, dùng SCAN thay)
SCAN 0 MATCH user:* COUNT 100     # Iterate keys safely
EXISTS key                         # Check tồn tại
TYPE key                           # Kiểm tra type
TTL key                            # Thời gian còn lại (-1 = no expire)
EXPIRE key 60                      # Set TTL 60 giây
PERSIST key                        # Remove TTL
DEL key1 key2                      # Xóa keys
FLUSHDB                            # Xóa all keys trong DB hiện tại ⚠️

# === Monitoring ===
MONITOR                            # Log tất cả commands (debug)
SLOWLOG GET 10                     # 10 commands chậm nhất
CLIENT LIST                        # Connected clients
MEMORY USAGE key                   # RAM usage của 1 key`}</CodeBlock>

                <Callout type="tip">
                    Trong production: <strong>KHÔNG dùng KEYS *</strong> (block server). Dùng <Highlight>SCAN</Highlight> để iterate.
                    Luôn set <Highlight>maxmemory</Highlight> + <Highlight>maxmemory-policy</Highlight> (recommended: <InlineCode>allkeys-lru</InlineCode>) để tránh OOM crash.
                </Callout>

                <Callout type="warning">
                    Redis là <strong>cache layer</strong>, KHÔNG phải primary database. Luôn có fallback plan: nếu Redis down,
                    app phải vẫn hoạt động (chậm hơn nhưng không crash). Implement <Highlight>circuit breaker pattern</Highlight>.
                </Callout>
            </>
        ),
        en: (
            <>
                <Paragraph>
                    <Highlight>Redis</Highlight> (Remote Dictionary Server) is an open-source <Highlight>in-memory data store</Highlight>,
                    widely used as a cache, message broker, session store, and real-time analytics engine.
                    Redis stores data in RAM, enabling <Highlight>extremely fast</Highlight> read/write — millions of operations per second.
                </Paragraph>

                <Callout type="info">
                    Redis started as a <strong>cache layer</strong>, but has evolved into a <strong>multi-model database</strong> with
                    persistence, clustering, streams, and rich data structure support.
                </Callout>

                {/* ===== Core Concepts ===== */}
                <Heading2>🧠 Core Concepts</Heading2>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-5">
                        <div className="text-3xl mb-2">⚡</div>
                        <div className="text-red-400 font-bold text-sm mb-1">In-Memory</div>
                        <div className="text-text-primary text-sm">Data stored in RAM</div>
                        <div className="text-text-secondary text-xs mt-1">Speed: ~100,000 ops/sec (single thread)</div>
                    </div>
                    <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-5">
                        <div className="text-3xl mb-2">🔑</div>
                        <div className="text-blue-400 font-bold text-sm mb-1">Key-Value Store</div>
                        <div className="text-text-primary text-sm">All data stored as key → value</div>
                        <div className="text-text-secondary text-xs mt-1">Key: string, Value: multiple types</div>
                    </div>
                    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5">
                        <div className="text-3xl mb-2">🔄</div>
                        <div className="text-green-400 font-bold text-sm mb-1">Single-Threaded</div>
                        <div className="text-text-primary text-sm">1 thread processes commands</div>
                        <div className="text-text-secondary text-xs mt-1">No locks needed → atomic operations</div>
                    </div>
                    <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-5">
                        <div className="text-3xl mb-2">💾</div>
                        <div className="text-purple-400 font-bold text-sm mb-1">Persistence (optional)</div>
                        <div className="text-text-primary text-sm">RDB snapshots + AOF logs</div>
                        <div className="text-text-secondary text-xs mt-1">Data survives restarts</div>
                    </div>
                </div>

                {/* ===== Data Structures ===== */}
                <Heading2>📦 Redis Data Structures</Heading2>

                <Paragraph>
                    Redis is not just a simple key-value store. It supports <Highlight>rich data structures</Highlight>,
                    each suited for different use cases.
                </Paragraph>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border-primary">
                                <th className="text-left p-3 text-text-secondary font-medium">Type</th>
                                <th className="text-left p-3 text-text-secondary font-medium">Description</th>
                                <th className="text-left p-3 text-text-secondary font-medium">Use Case</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-primary">
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-red-400">String</td>
                                <td className="p-3">Single value (text, number, JSON)</td>
                                <td className="p-3">Cache, counter, session</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-blue-400">Hash</td>
                                <td className="p-3">Object (field → value pairs)</td>
                                <td className="p-3">User profile, product info</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-green-400">List</td>
                                <td className="p-3">Linked list (ordered, duplicates OK)</td>
                                <td className="p-3">Message queue, activity feed</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-yellow-400">Set</td>
                                <td className="p-3">Unordered unique values</td>
                                <td className="p-3">Tags, unique visitors, friends</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-purple-400">Sorted Set</td>
                                <td className="p-3">Set + score (auto-sorted)</td>
                                <td className="p-3">Leaderboard, ranking, timeline</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium text-cyan-400">Stream</td>
                                <td className="p-3">Append-only log (like Kafka)</td>
                                <td className="p-3">Event sourcing, real-time data</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium text-pink-400">Pub/Sub</td>
                                <td className="p-3">Publish/Subscribe messaging</td>
                                <td className="p-3">Chat, notifications, real-time</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <CodeBlock title="redis-data-structures.sh">{`# ===== STRING =====
SET user:token "abc123"          # Store token
GET user:token                    # → "abc123"
SET page:views 0                  # Counter
INCR page:views                   # → 1 (atomic increment)
SETEX session:user1 3600 "data"   # Set + expire 1 hour (TTL)

# ===== HASH =====
HSET user:1001 name "Khuong" age 28 role "developer"
HGET user:1001 name               # → "Khuong"
HGETALL user:1001                 # → name, Khuong, age, 28, role, developer

# ===== LIST =====
LPUSH queue:emails "email1" "email2"   # Push to head
RPOP queue:emails                       # Pop from tail → "email1"

# ===== SET =====
SADD tags:post1 "redis" "database" "cache"
SISMEMBER tags:post1 "redis"            # → 1 (true)

# ===== SORTED SET =====
ZADD leaderboard 100 "player1" 200 "player2"
ZREVRANGE leaderboard 0 2              # Top 3 (descending)

# ===== PUB/SUB =====
SUBSCRIBE chat:room1                    # Subscriber listens
PUBLISH chat:room1 "Hello everyone!"    # Publisher sends`}</CodeBlock>

                {/* ===== Caching ===== */}
                <Heading2>🎯 Caching Strategies with Redis</Heading2>

                <Heading3>1. Cache-Aside (Lazy Loading)</Heading3>
                <Paragraph>Most common pattern: app checks cache first, if miss then queries DB and saves to cache.</Paragraph>
                <CodeBlock title="cache-aside.ts">{`async function getUser(userId: string) {
  const cached = await redis.get(\`user:\${userId}\`)
  if (cached) return JSON.parse(cached) // Cache HIT ✅

  const user = await db.user.findById(userId) // Cache MISS
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user)) // TTL 1h
  return user
}

// On update → invalidate cache
async function updateUser(userId: string, data: any) {
  await db.user.update(userId, data)
  await redis.del(\`user:\${userId}\`)  // Delete cache → next read fetches fresh
}`}</CodeBlock>

                <div className="my-4 overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-border-primary">
                                <th className="text-left p-3 text-text-secondary font-medium">Strategy</th>
                                <th className="text-left p-3 text-green-500 font-medium">Pros</th>
                                <th className="text-left p-3 text-red-500 font-medium">Cons</th>
                                <th className="text-left p-3 text-text-secondary font-medium">Best for</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-primary">
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Cache-Aside</td>
                                <td className="p-3">Simple, flexible</td>
                                <td className="p-3">Cache miss penalty</td>
                                <td className="p-3">General purpose (90%)</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Write-Through</td>
                                <td className="p-3">Always consistent</td>
                                <td className="p-3">Slower writes (2x)</td>
                                <td className="p-3">Consistency critical</td>
                            </tr>
                            <tr className="border-b border-gray-200">
                                <td className="p-3 font-medium">Write-Behind</td>
                                <td className="p-3">Fast writes</td>
                                <td className="p-3">Data loss risk</td>
                                <td className="p-3">High write throughput</td>
                            </tr>
                            <tr>
                                <td className="p-3 font-medium">Read-Through</td>
                                <td className="p-3">Transparent to app</td>
                                <td className="p-3">Complex setup</td>
                                <td className="p-3">Framework-managed</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ===== Pros & Cons ===== */}
                <Heading2>⚖️ Pros & Cons</Heading2>

                <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="text-green-400 font-bold text-sm mb-3">✅ Pros</div>
                        <div className="text-text-primary text-sm space-y-2">
                            <div>⚡ <strong>Blazing fast</strong> — sub-millisecond latency</div>
                            <div>📦 <strong>Rich data structures</strong> — beyond simple key-value</div>
                            <div>🔄 <strong>Atomic operations</strong> — thread-safe without locks</div>
                            <div>📡 <strong>Pub/Sub built-in</strong> — real-time messaging</div>
                            <div>💾 <strong>Optional persistence</strong> — RDB + AOF</div>
                            <div>🌐 <strong>Clustering</strong> — horizontal scaling</div>
                            <div>⏰ <strong>Built-in TTL</strong> — auto key expiration</div>
                            <div>📚 <strong>Rich ecosystem</strong> — every language has clients</div>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="text-red-400 font-bold text-sm mb-3">❌ Cons</div>
                        <div className="text-text-primary text-sm space-y-2">
                            <div>💰 <strong>RAM expensive</strong> — data must fit in memory</div>
                            <div>🔍 <strong>No query language</strong> — no WHERE, JOIN, GROUP BY</div>
                            <div>📊 <strong>Not for complex queries</strong> — key-based lookup only</div>
                            <div>⚠️ <strong>Single-threaded I/O</strong> — CPU-bound ops can block</div>
                            <div>🔄 <strong>Persistence trade-offs</strong> — durability vs speed</div>
                            <div>🏗️ <strong>Cluster complexity</strong> — multi-key ops limited</div>
                            <div>📉 <strong>No built-in security</strong> — must config TLS, ACL</div>
                            <div>🗑️ <strong>Eviction on OOM</strong> — data removed by policy</div>
                        </div>
                    </div>
                </div>

                <Callout type="tip">
                    In production: <strong>never use KEYS *</strong> (blocks server). Use <Highlight>SCAN</Highlight> to iterate.
                    Always set <Highlight>maxmemory</Highlight> + <Highlight>maxmemory-policy</Highlight> (recommended: <InlineCode>allkeys-lru</InlineCode>) to prevent OOM crashes.
                </Callout>

                <Callout type="warning">
                    Redis is a <strong>cache layer</strong>, NOT a primary database. Always have a fallback:
                    if Redis goes down, your app should still work (slower but no crash). Implement <Highlight>circuit breaker pattern</Highlight>.
                </Callout>
            </>
        ),
    },
}

export default redisIntroduction
