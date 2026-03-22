/**
 * @jest-environment node
 */

/**
 * Tests for TikTok Scheduled Posts API route
 * Covers: GET, POST (auto-schedule with TIKTOK_DEFAULT_HOUR_GAP), PUT, DELETE
 * DELETE scenarios: single delete, cleanup expired, delete last remaining post
 */

// Mock connectDB
jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))
jest.mock('@/lib/cache', () => ({
    withCache: jest.fn((_key: string, _ttl: number, fn: () => Promise<unknown>) => fn()),
    invalidateCache: jest.fn().mockResolvedValue(undefined),
}))
jest.mock('@/lib/redis', () => ({
    getRedis: jest.fn(() => ({ keys: jest.fn().mockResolvedValue([]), del: jest.fn().mockResolvedValue(undefined) })),
}))

// Mock constants
jest.mock('@/utils/constants', () => ({
    R2_ACCOUNT_ID: 'test-account',
    R2_ACCESS_KEY_ID: 'test-key',
    R2_SECRET_ACCESS_KEY: 'test-secret',
    R2_BUCKET_NAME: 'test-bucket',
    TIKTOK_DEFAULT_HOUR_GAP: 1,
}))

// Mock minio
const mockRemoveObject = jest.fn()
jest.mock('minio', () => {
    return {
        Client: jest.fn().mockImplementation(() => ({
            removeObject: (...args: any[]) => mockRemoveObject(...args),
        })),
    }
})

// Mock TikTokScheduledPostModel
jest.mock('@/models/TikTokScheduledPost', () => {
    const mockLean = jest.fn()
    const mockSort = jest.fn().mockReturnValue({ lean: mockLean })
    const mockFindLean = jest.fn() // Separate lean for find().lean() (no sort)
    const model: any = jest.fn()
    model.find = jest.fn().mockReturnValue({ sort: mockSort, lean: mockFindLean })
    model.findOne = jest.fn()
    model.create = jest.fn()
    model.findById = jest.fn()
    model.findByIdAndUpdate = jest.fn()
    model.findByIdAndDelete = jest.fn()
    model._mockSort = mockSort
    model._mockLean = mockLean
    model._mockFindLean = mockFindLean
    return { __esModule: true, default: model }
})

import { DELETE, GET, POST, PUT } from '@/app/(admin)/api/tiktok-scheduled-posts/route'
import TikTokScheduledPostModel from '@/models/TikTokScheduledPost'
import { NextRequest } from 'next/server'

describe('TikTok Scheduled Posts API', () => {
    const mockModel = TikTokScheduledPostModel as any
    const mockLean = mockModel._mockLean        // for find().sort().lean() (GET)
    const mockFindLean = mockModel._mockFindLean // for find().lean() (DELETE cleanup)
    const mockSort = mockModel._mockSort

    beforeEach(() => {
        jest.clearAllMocks()
        mockRemoveObject.mockReset()
        mockRemoveObject.mockResolvedValue(undefined)
        mockModel.find.mockReturnValue({ sort: mockSort, lean: mockFindLean })
        mockSort.mockReturnValue({ lean: mockLean })
    })

    // ═══════════════════════════════════
    // GET /api/tiktok-scheduled-posts
    // ═══════════════════════════════════
    describe('GET', () => {
        it('fetches all posts sorted by date+time', async () => {
            const posts = [
                { _id: 'p1', scheduledDate: '06/03/2026', scheduledTime: '10:00' },
                { _id: 'p2', scheduledDate: '07/03/2026', scheduledTime: '12:00' },
            ]
            mockLean.mockResolvedValue(posts)

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toHaveLength(2)
            expect(mockModel.find).toHaveBeenCalledWith({})
            expect(mockSort).toHaveBeenCalledWith({ scheduledDate: 1, scheduledTime: 1 })
        })

        it('filters by accountId', async () => {
            mockLean.mockResolvedValue([])

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts?accountId=acc1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.find).toHaveBeenCalledWith({ accountId: 'acc1' })
        })

        it('returns empty array when no posts', async () => {
            mockLean.mockResolvedValue([])

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toEqual([])
        })

        it('returns 500 on DB error', async () => {
            mockModel.find.mockImplementation(() => { throw new Error('DB error') })

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
            expect(json.error).toBe('DB error')
        })
    })

    // ═══════════════════════════════════
    // POST /api/tiktok-scheduled-posts
    // ═══════════════════════════════════
    describe('POST', () => {
        it('creates post with explicit date/time (no auto-calc)', async () => {
            const body = {
                accountId: 'acc1',
                scheduledDate: '06/03/2026',
                scheduledTime: '14:00',
                description: 'Test post',
                video: { url: 'https://r2.dev/video.mp4', type: 'video', publicId: 'video.mp4' },
            }
            mockModel.create.mockResolvedValue({ _id: 'p1', ...body })

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'POST',
                body: JSON.stringify(body),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.scheduledDate).toBe('06/03/2026')
            expect(json.data.scheduledTime).toBe('14:00')
            expect(mockModel.findOne).not.toHaveBeenCalled()
        })

        // ────────────────────────────────────────────────
        // Precise auto-schedule tests (mocked Math.random)
        // ────────────────────────────────────────────────
        describe('auto-schedule (timezone-safe, exact values)', () => {
            let randomSpy: jest.SpyInstance

            afterEach(() => {
                randomSpy?.mockRestore()
            })

            // Helper to setup findOne mock
            const setupLatestPost = (post: any) => {
                mockModel.findOne.mockReturnValue({
                    sort: jest.fn().mockReturnValue({
                        lean: jest.fn().mockResolvedValue(post),
                    }),
                })
                mockModel.create.mockImplementation((body: any) =>
                    Promise.resolve({ _id: 'p_new', ...body })
                )
            }

            const callPOST = async (body: any) => {
                const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                    method: 'POST',
                    body: JSON.stringify(body),
                })
                return POST(request)
            }

            it('10:00 VN + 1h gap + 0 random = 11:00 VN (exact)', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

                // 08/03/2026 10:00 VN = 08/03/2026 03:00 UTC
                const latestUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 0) / 1000)
                setupLatestPost({ scheduledUnixTime: latestUnix })

                await callPOST({ accountId: 'acc1', description: 'Test' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledDate).toBe('08/03/2026')
                expect(arg.scheduledTime).toBe('11:00')
                expect(arg.scheduledUnixTime).toBe(latestUnix + 3600) // exactly +1h
            })

            it('10:00 VN + 1h gap + 30 random = 11:30 VN (exact)', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5)

                const latestUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 0) / 1000)
                setupLatestPost({ scheduledUnixTime: latestUnix })

                await callPOST({ accountId: 'acc1', description: 'Test' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledDate).toBe('08/03/2026')
                expect(arg.scheduledTime).toBe('11:30')
                expect(arg.scheduledUnixTime).toBe(latestUnix + 3600 + 1800)
            })

            it('10:32 VN → floors to 10:00, then +1h = 11:00 (not 11:32)', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

                // 08/03/2026 10:32 VN = 08/03/2026 03:32 UTC
                const latestUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 32) / 1000)
                setupLatestPost({ scheduledUnixTime: latestUnix })

                await callPOST({ accountId: 'acc1', description: 'Test floor' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledDate).toBe('08/03/2026')
                expect(arg.scheduledTime).toBe('11:00') // NOT 11:32!

                // Verify: floor(03:32 UTC) = 03:00 UTC, +1h = 04:00 UTC = 11:00 VN
                const expectedUnix = Math.floor(Date.UTC(2026, 2, 8, 4, 0) / 1000)
                expect(arg.scheduledUnixTime).toBe(expectedUnix)
            })

            it('05:48 VN + random 25min → 06:25 (floor to 05:00, +1h +25m)', async () => {
                // Math.floor(0.42 * 60) = 25
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.42)

                // 08/03/2026 05:48 VN = 07/03/2026 22:48 UTC
                const latestUnix = Math.floor(Date.UTC(2026, 2, 7, 22, 48) / 1000)
                setupLatestPost({ scheduledUnixTime: latestUnix })

                await callPOST({ accountId: 'acc1', description: 'Test floor+random' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledDate).toBe('08/03/2026')
                expect(arg.scheduledTime).toBe('06:25') // floor(05:48)=05:00, +1h+25m=06:25
            })
            it('23:00 VN + 1h + 30min = next day 00:30 VN (cross-midnight)', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5)

                // 08/03/2026 23:00 VN = 08/03/2026 16:00 UTC
                const latestUnix = Math.floor(Date.UTC(2026, 2, 8, 16, 0) / 1000)
                setupLatestPost({ scheduledUnixTime: latestUnix })

                await callPOST({ accountId: 'acc1', description: 'Cross midnight' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledDate).toBe('09/03/2026') // Next day!
                expect(arg.scheduledTime).toBe('00:30')
            })

            // ────────────────────────────────────────────────
            // KEY TEST: 2 bài tạo liên tiếp cách nhau đúng 1h
            // ────────────────────────────────────────────────
            it('two sequential posts are exactly 1h apart (0 random)', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

                // Bài đầu: 08/03/2026 10:00 VN
                const firstUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 0) / 1000)
                setupLatestPost({ scheduledUnixTime: firstUnix })

                await callPOST({ accountId: 'acc1', description: 'Post 1' })
                const post1 = mockModel.create.mock.calls[0][0]

                // Bài thứ 2: dùng output bài 1 làm latest
                setupLatestPost({ scheduledUnixTime: post1.scheduledUnixTime })
                await callPOST({ accountId: 'acc1', description: 'Post 2' })
                const post2 = mockModel.create.mock.calls[1][0]

                // Verify exact gap = 3600 seconds (1 hour)
                const gapSeconds = post2.scheduledUnixTime - post1.scheduledUnixTime
                expect(gapSeconds).toBe(3600)

                // Verify dates
                expect(post1.scheduledDate).toBe('08/03/2026')
                expect(post1.scheduledTime).toBe('11:00')
                expect(post2.scheduledDate).toBe('08/03/2026')
                expect(post2.scheduledTime).toBe('12:00')
            })

            it('three sequential posts maintain consistent 1h gaps', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

                const baseUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 0) / 1000) // 10:00 VN

                // Create 3 posts sequentially
                const posts: any[] = []
                let lastUnix = baseUnix

                for (let i = 0; i < 3; i++) {
                    setupLatestPost({ scheduledUnixTime: lastUnix })
                    await callPOST({ accountId: 'acc1', description: `Post ${i + 1}` })
                    const created = mockModel.create.mock.calls[i][0]
                    posts.push(created)
                    lastUnix = created.scheduledUnixTime
                }

                // All gaps should be exactly 3600s (1h)
                expect(posts[1].scheduledUnixTime - posts[0].scheduledUnixTime).toBe(3600)
                expect(posts[2].scheduledUnixTime - posts[1].scheduledUnixTime).toBe(3600)

                // Verify times: 11:00, 12:00, 13:00
                expect(posts[0].scheduledTime).toBe('11:00')
                expect(posts[1].scheduledTime).toBe('12:00')
                expect(posts[2].scheduledTime).toBe('13:00')
            })

            it('gap is always between 1h0m and 1h59m with random jitter', async () => {
                // Test with various random values
                const randomValues = [0, 0.1, 0.25, 0.5, 0.75, 0.99]
                const baseUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 0) / 1000)

                for (const rv of randomValues) {
                    jest.clearAllMocks()
                    randomSpy = jest.spyOn(Math, 'random').mockReturnValue(rv)
                    setupLatestPost({ scheduledUnixTime: baseUnix })
                    await callPOST({ accountId: 'acc1', description: 'Test' })

                    const arg = mockModel.create.mock.calls[0][0]
                    const gapSeconds = arg.scheduledUnixTime - baseUnix
                    const gapMinutes = gapSeconds / 60

                    // Gap must be 60min (1h) + 0-59min random = 60..119 minutes
                    expect(gapMinutes).toBeGreaterThanOrEqual(60)
                    expect(gapMinutes).toBeLessThan(120)
                }
            })

            it('sorts by scheduledUnixTime to find latest post', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)
                const mockSortFn = jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue(null),
                })
                mockModel.findOne.mockReturnValue({ sort: mockSortFn })
                mockModel.create.mockImplementation((body: any) =>
                    Promise.resolve({ _id: 'p_new', ...body })
                )

                await callPOST({ accountId: 'acc1', description: 'Test' })

                expect(mockSortFn).toHaveBeenCalledWith({ scheduledUnixTime: -1 })
            })

            it('falls back to date string for legacy posts (no scheduledUnixTime)', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)

                // Legacy post without scheduledUnixTime
                setupLatestPost({
                    scheduledDate: '08/03/2026',
                    scheduledTime: '10:00',
                    // No scheduledUnixTime!
                })

                await callPOST({ accountId: 'acc1', description: 'Legacy' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledDate).toBe('08/03/2026')
                expect(arg.scheduledTime).toBe('11:00') // 10:00 + 1h
                expect(arg.scheduledUnixTime).toBeDefined()
                expect(typeof arg.scheduledUnixTime).toBe('number')
            })

            it('auto-sets scheduledUnixTime on every new post', async () => {
                randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0)
                const latestUnix = Math.floor(Date.UTC(2026, 2, 8, 3, 0) / 1000)
                setupLatestPost({ scheduledUnixTime: latestUnix })

                await callPOST({ accountId: 'acc1', description: 'Test' })

                const arg = mockModel.create.mock.calls[0][0]
                expect(arg.scheduledUnixTime).toBe(latestUnix + 3600)
                expect(typeof arg.scheduledUnixTime).toBe('number')
            })
        })

        it('uses description fallback to empty string when omitted', async () => {
            mockModel.create.mockImplementation((body: any) => Promise.resolve({ _id: 'p1', ...body }))

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'POST',
                body: JSON.stringify({
                    accountId: 'acc1',
                    scheduledDate: '06/03/2026',
                    scheduledTime: '14:00',
                    description: '',
                }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.create).toHaveBeenCalled()
        })

        it('returns 500 on validation error', async () => {
            mockModel.findOne.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue(null),
                }),
            })
            mockModel.create.mockRejectedValue(new Error('description is required'))

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'POST',
                body: JSON.stringify({ accountId: 'acc1' }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
            expect(json.error).toContain('description is required')
        })
    })

    // ═══════════════════════════════════
    // PUT /api/tiktok-scheduled-posts
    // ═══════════════════════════════════
    describe('PUT', () => {
        it('updates post fields', async () => {
            const updated = { _id: 'p1', description: 'Updated', status: 'posted' }
            mockModel.findByIdAndUpdate.mockResolvedValue(updated)

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'PUT',
                body: JSON.stringify({ id: 'p1', description: 'Updated', status: 'posted' }),
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.status).toBe('posted')
            expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
                'p1',
                { description: 'Updated', status: 'posted' },
                { new: true }
            )
        })

        it('strips id from update payload', async () => {
            mockModel.findByIdAndUpdate.mockResolvedValue({ _id: 'p1', status: 'draft' })

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'PUT',
                body: JSON.stringify({ id: 'p1', status: 'draft' }),
            })
            await PUT(request)

            const [, updateData] = mockModel.findByIdAndUpdate.mock.calls[0]
            expect(updateData).not.toHaveProperty('id')
            expect(updateData).toEqual({ status: 'draft' })
        })

        it('returns 500 on update error', async () => {
            mockModel.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'))

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'PUT',
                body: JSON.stringify({ id: 'p1', status: 'failed' }),
            })
            const response = await PUT(request)

            expect(response.status).toBe(500)
        })
    })

    // ═══════════════════════════════════
    // DELETE /api/tiktok-scheduled-posts
    // ═══════════════════════════════════
    describe('DELETE', () => {
        // ── Single post delete ──
        describe('single post (?id=xxx)', () => {
            it('deletes post and cleans up R2 video', async () => {
                mockModel.findById.mockReturnValue({
                    lean: jest.fn().mockResolvedValue({
                        _id: 'p1',
                        video: { publicId: 'vid.mp4', url: 'https://r2.dev/vid.mp4' },
                    }),
                })
                mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

                const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts?id=p1', {
                    method: 'DELETE',
                })
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p1')
                expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'vid.mp4')
            })

            it('deletes post even without video', async () => {
                mockModel.findById.mockReturnValue({
                    lean: jest.fn().mockResolvedValue({ _id: 'p1' }),
                })
                mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

                const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts?id=p1', {
                    method: 'DELETE',
                })
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(mockRemoveObject).not.toHaveBeenCalled()
            })

            it('still deletes DB record if R2 cleanup fails', async () => {
                mockModel.findById.mockReturnValue({
                    lean: jest.fn().mockResolvedValue({
                        _id: 'p1',
                        video: { publicId: 'vid.mp4' },
                    }),
                })
                mockRemoveObject.mockRejectedValue(new Error('R2 error'))
                mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

                const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts?id=p1', {
                    method: 'DELETE',
                })
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p1')
            })
        })

        // ── Missing params ──
        it('returns 400 when no id or cleanup param', async () => {
            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'DELETE',
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        // ── Cleanup: last remaining post ──
        describe('cleanup - last remaining post', () => {
            it('deletes last post regardless of expiry (future date)', async () => {
                const lastPost = {
                    _id: 'p_last',
                    scheduledDate: '31/12/2099',
                    scheduledTime: '23:59',
                    video: { publicId: 'last-video.mp4' },
                }
                mockFindLean.mockResolvedValue([lastPost])
                mockModel.findByIdAndDelete.mockResolvedValue(lastPost)

                const request = new NextRequest(
                    'http://localhost:3000/api/tiktok-scheduled-posts?cleanup=expired&accountId=acc1',
                    { method: 'DELETE' }
                )
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(json.deleted).toBe(1)
                expect(json.total).toBe(0)
                expect(json.message).toContain('cuối cùng')
                expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p_last')
                expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'last-video.mp4')
            })

            it('deletes last post even if already expired', async () => {
                const lastPost = {
                    _id: 'p_old',
                    scheduledDate: '01/01/2020',
                    scheduledTime: '08:00',
                    video: { publicId: 'old.mp4' },
                }
                mockFindLean.mockResolvedValue([lastPost])
                mockModel.findByIdAndDelete.mockResolvedValue(lastPost)

                const request = new NextRequest(
                    'http://localhost:3000/api/tiktok-scheduled-posts?cleanup=expired&accountId=acc1',
                    { method: 'DELETE' }
                )
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(json.deleted).toBe(1)
                expect(json.total).toBe(0)
            })

            it('handles last post without video', async () => {
                const lastPost = { _id: 'p_last', scheduledDate: '06/03/2026', scheduledTime: '10:00' }
                mockFindLean.mockResolvedValue([lastPost])
                mockModel.findByIdAndDelete.mockResolvedValue(lastPost)

                const request = new NextRequest(
                    'http://localhost:3000/api/tiktok-scheduled-posts?cleanup=expired&accountId=acc1',
                    { method: 'DELETE' }
                )
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(mockRemoveObject).not.toHaveBeenCalled()
            })
        })

        // ── Cleanup: multiple posts → only delete expired ──
        describe('cleanup - expired posts', () => {
            it('deletes only expired posts using scheduledUnixTime (timezone-safe)', async () => {
                const nowUnix = Math.floor(Date.now() / 1000)
                const posts = [
                    { _id: 'p_exp1', scheduledUnixTime: nowUnix - 86400, video: { publicId: 'old1.mp4' } },
                    { _id: 'p_exp2', scheduledUnixTime: nowUnix - 3600, video: { publicId: 'old2.mp4' } },
                    { _id: 'p_future', scheduledUnixTime: nowUnix + 86400, video: { publicId: 'new.mp4' } },
                ]
                mockFindLean.mockResolvedValue(posts)
                mockModel.findByIdAndDelete.mockResolvedValue({})

                const request = new NextRequest(
                    'http://localhost:3000/api/tiktok-scheduled-posts?cleanup=expired&accountId=acc1',
                    { method: 'DELETE' }
                )
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(json.deleted).toBe(2)
                expect(json.total).toBe(3)
                expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p_exp1')
                expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p_exp2')
                expect(mockModel.findByIdAndDelete).not.toHaveBeenCalledWith('p_future')
                expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'old1.mp4')
                expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'old2.mp4')
                expect(mockRemoveObject).not.toHaveBeenCalledWith('test-bucket', 'new.mp4')
            })

            it('returns 0 deleted when all posts are in the future', async () => {
                const nowUnix = Math.floor(Date.now() / 1000)
                const posts = [
                    { _id: 'p1', scheduledUnixTime: nowUnix + 86400 },
                    { _id: 'p2', scheduledUnixTime: nowUnix + 172800 },
                ]
                mockFindLean.mockResolvedValue(posts)

                const request = new NextRequest(
                    'http://localhost:3000/api/tiktok-scheduled-posts?cleanup=expired&accountId=acc1',
                    { method: 'DELETE' }
                )
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(json.deleted).toBe(0)
                expect(json.total).toBe(2)
                expect(mockModel.findByIdAndDelete).not.toHaveBeenCalled()
            })

            it('handles empty account (no posts)', async () => {
                mockFindLean.mockResolvedValue([])

                const request = new NextRequest(
                    'http://localhost:3000/api/tiktok-scheduled-posts?cleanup=expired&accountId=acc1',
                    { method: 'DELETE' }
                )
                const response = await DELETE(request)
                const json = await response.json()

                expect(json.success).toBe(true)
                expect(json.deleted).toBe(0)
                expect(json.total).toBe(0)
            })
        })

        it('returns 500 on DELETE error', async () => {
            mockModel.findById.mockImplementation(() => { throw new Error('DB error') })

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts?id=p1', {
                method: 'DELETE',
            })
            const response = await DELETE(request)

            expect(response.status).toBe(500)
        })
    })
})
