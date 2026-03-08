import { NextRequest, NextResponse } from 'next/server'
import TikTokScheduledPostModel from '@/models/TikTokScheduledPost'
import connectDb from '@/utils/connectDb'
import { Client } from 'minio'
import { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, TIKTOK_DEFAULT_HOUR_GAP } from '@/utils/constants'

const r2Client = new Client({
    endPoint: `${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    useSSL: true,
    accessKey: R2_ACCESS_KEY_ID || '',
    secretKey: R2_SECRET_ACCESS_KEY || '',
    port: 443,
    pathStyle: true,
})

// GET all scheduled posts (optionally filter by accountId)
export async function GET(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const accountId = searchParams.get('accountId')

        const query = accountId ? { accountId } : {}
        const posts = await TikTokScheduledPostModel.find(query)
            .sort({ scheduledDate: 1, scheduledTime: 1 })
            .lean()

        return NextResponse.json({ success: true, data: posts })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// POST create new scheduled post
export async function POST(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()

        // Auto-calculate scheduledDate & scheduledTime if not provided
        if (!body.scheduledDate || !body.scheduledTime) {
            // Find the latest scheduled post for this account
            const latestPost = await TikTokScheduledPostModel.findOne(
                { accountId: body.accountId }
            ).sort({ scheduledDate: -1, scheduledTime: -1 }).lean() as any

            let baseDate: Date

            if (latestPost?.scheduledDate && latestPost?.scheduledTime) {
                // Parse latest post date (DD/MM/YYYY HH:mm)
                const [day, month, year] = latestPost.scheduledDate.split('/')
                const [hour, minute] = latestPost.scheduledTime.split(':')
                baseDate = new Date(+year, +month - 1, +day, +hour, +minute)
            } else {
                baseDate = new Date()
            }

            // Add 1 hour + random 0-59 minutes
            const randomMinutes = Math.floor(Math.random() * 60)
            baseDate.setHours(baseDate.getHours() + TIKTOK_DEFAULT_HOUR_GAP)
            baseDate.setMinutes(baseDate.getMinutes() + randomMinutes)

            // Format back to DD/MM/YYYY and HH:mm
            const dd = String(baseDate.getDate()).padStart(2, '0')
            const mm = String(baseDate.getMonth() + 1).padStart(2, '0')
            const yyyy = baseDate.getFullYear()
            const hh = String(baseDate.getHours()).padStart(2, '0')
            const min = String(baseDate.getMinutes()).padStart(2, '0')

            body.scheduledDate = body.scheduledDate || `${dd}/${mm}/${yyyy}`
            body.scheduledTime = body.scheduledTime || `${hh}:${min}`
        }

        const post = await TikTokScheduledPostModel.create(body)
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// PUT update scheduled post
export async function PUT(request: NextRequest) {
    try {
        await connectDb()
        const body = await request.json()
        const { id, ...data } = body
        const post = await TikTokScheduledPostModel.findByIdAndUpdate(id, data, { new: true })
        return NextResponse.json({ success: true, data: post })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}

// ═══════════════════════════════════════════════════════════════
// DELETE /api/tiktok-scheduled-posts
// ═══════════════════════════════════════════════════════════════
// 1. Xoá 1 bài:       ?id=xxx
//    → Xoá video trên R2 + xoá record trong DB
//
// 2. Cleanup expired:  ?cleanup=expired&accountId=xxx
//    → Nếu chỉ còn 1 bài duy nhất → xoá luôn (không cần check quá hạn)
//    → Nếu nhiều bài → chỉ xoá bài có scheduledDate + scheduledTime < NOW
//    → Mỗi bài: xoá video R2 + xoá DB record
// ═══════════════════════════════════════════════════════════════
export async function DELETE(request: NextRequest) {
    try {
        await connectDb()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const cleanup = searchParams.get('cleanup')
        const accountId = searchParams.get('accountId')

        // Cleanup expired posts for an account
        if (cleanup === 'expired' && accountId) {
            const now = new Date()
            const allPosts = await TikTokScheduledPostModel.find({ accountId }).lean() as any[]

            // Nếu chỉ còn 1 bài duy nhất → xoá luôn không cần check quá hạn
            if (allPosts.length === 1) {
                const post = allPosts[0]
                if (post.video?.publicId) {
                    try {
                        const bucketName = R2_BUCKET_NAME || 'tiktok-videos'
                        await r2Client.removeObject(bucketName, post.video.publicId)
                        console.log('🗑️ Cleanup R2 (last post):', post.video.publicId)
                    } catch (err) {
                        console.error('Failed to delete R2 video:', err)
                    }
                }
                await TikTokScheduledPostModel.findByIdAndDelete(post._id)
                return NextResponse.json({
                    success: true,
                    message: `Đã xoá bài cuối cùng của account`,
                    deleted: 1,
                    total: 0
                })
            }

            // Filter posts that are expired using scheduledUnixTime (timezone-safe)
            // scheduledUnixTime is stored as Unix seconds in VN timezone
            const nowUnix = Math.floor(Date.now() / 1000)
            const expiredPosts = allPosts.filter((post: any) => {
                if (post.scheduledUnixTime) {
                    return post.scheduledUnixTime < nowUnix
                }
                // Fallback: parse date string (legacy posts without scheduledUnixTime)
                if (!post.scheduledDate || !post.scheduledTime) return false
                const [day, month, year] = post.scheduledDate.split('/')
                const [hour, minute] = post.scheduledTime.split(':')
                const postDate = new Date(+year, +month - 1, +day, +hour, +minute)
                return postDate < new Date()
            })

            // Delete R2 videos + DB records
            let deleted = 0
            for (const post of expiredPosts) {
                if (post.video?.publicId) {
                    try {
                        const bucketName = R2_BUCKET_NAME || 'tiktok-videos'
                        await r2Client.removeObject(bucketName, post.video.publicId)
                        console.log('🗑️ Cleanup R2:', post.video.publicId)
                    } catch (err) {
                        console.error('Failed to delete R2 video:', err)
                    }
                }
                await TikTokScheduledPostModel.findByIdAndDelete(post._id)
                deleted++
            }

            return NextResponse.json({
                success: true,
                message: `Đã xoá ${deleted} bài quá hạn (tổng ${allPosts.length} bài)`,
                deleted,
                total: allPosts.length
            })
        }

        // Single post delete by id
        if (!id) {
            return NextResponse.json({ success: false, error: 'Missing id or cleanup parameter' }, { status: 400 })
        }

        const post = await TikTokScheduledPostModel.findById(id).lean() as any

        if (post?.video?.publicId) {
            try {
                const bucketName = R2_BUCKET_NAME || 'tiktok-videos'
                await r2Client.removeObject(bucketName, post.video.publicId)
                console.log('🗑️ Deleted R2 video:', post.video.publicId)
            } catch (err) {
                console.error('Failed to delete R2 video:', err)
            }
        }

        await TikTokScheduledPostModel.findByIdAndDelete(id)
        return NextResponse.json({ success: true })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
