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
            // findOne should NOT be called when date/time is provided
            expect(mockModel.findOne).not.toHaveBeenCalled()
        })

        it('auto-calculates from latest post when no date/time', async () => {
            const latestPost = {
                scheduledDate: '06/03/2026',
                scheduledTime: '10:00',
            }
            mockModel.findOne.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue(latestPost),
                }),
            })
            mockModel.create.mockImplementation((body: any) => Promise.resolve({ _id: 'p_new', ...body }))

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'POST',
                body: JSON.stringify({
                    accountId: 'acc1',
                    description: 'Auto scheduled',
                }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            const createArg = mockModel.create.mock.calls[0][0]
            // Should auto-fill date and time (+1h from 10:00 + random minutes)
            expect(createArg.scheduledDate).toBeDefined()
            expect(createArg.scheduledTime).toBeDefined()
            expect(createArg.scheduledDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/) // DD/MM/YYYY format
            expect(createArg.scheduledTime).toMatch(/^\d{2}:\d{2}$/)          // HH:mm format
        })

        it('auto-calculates from NOW when no existing posts', async () => {
            mockModel.findOne.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue(null),
                }),
            })
            mockModel.create.mockImplementation((body: any) => Promise.resolve({ _id: 'p_new', ...body }))

            const request = new NextRequest('http://localhost:3000/api/tiktok-scheduled-posts', {
                method: 'POST',
                body: JSON.stringify({ accountId: 'acc1', description: 'First post' }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            const createArg = mockModel.create.mock.calls[0][0]
            expect(createArg.scheduledDate).toBeDefined()
            expect(createArg.scheduledTime).toBeDefined()
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
            // Description can be empty — server just passes through
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

            // id should be separated, not in the data payload
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
                // DB record should still be deleted even if R2 fails
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
                    scheduledDate: '31/12/2099',  // Tương lai xa → chưa quá hạn
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

            it('cleans up R2 even if last post has no video', async () => {
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
                    { _id: 'p_exp1', scheduledDate: '01/01/2020', scheduledTime: '08:00', scheduledUnixTime: nowUnix - 86400, video: { publicId: 'old1.mp4' } },
                    { _id: 'p_exp2', scheduledDate: '15/06/2023', scheduledTime: '14:30', scheduledUnixTime: nowUnix - 3600, video: { publicId: 'old2.mp4' } },
                    { _id: 'p_future', scheduledDate: '31/12/2099', scheduledTime: '20:00', scheduledUnixTime: nowUnix + 86400, video: { publicId: 'new.mp4' } },
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
                // R2 cleanup for expired only
                expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'old1.mp4')
                expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'old2.mp4')
                expect(mockRemoveObject).not.toHaveBeenCalledWith('test-bucket', 'new.mp4')
            })

            it('returns 0 deleted when all posts are in the future (by scheduledUnixTime)', async () => {
                const nowUnix = Math.floor(Date.now() / 1000)
                const posts = [
                    { _id: 'p1', scheduledDate: '31/12/2099', scheduledTime: '10:00', scheduledUnixTime: nowUnix + 86400 },
                    { _id: 'p2', scheduledDate: '31/12/2099', scheduledTime: '12:00', scheduledUnixTime: nowUnix + 172800 },
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

            it('skips posts with missing date/time fields', async () => {
                const posts = [
                    { _id: 'p_no_date', scheduledTime: '10:00' },       // missing date
                    { _id: 'p_no_time', scheduledDate: '01/01/2020' },  // missing time
                    { _id: 'p_ok', scheduledDate: '01/01/2020', scheduledTime: '08:00', video: {} },
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
                expect(json.deleted).toBe(1)
                // Only p_ok (has both date+time and is expired) gets deleted
                expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p_ok')
                expect(mockModel.findByIdAndDelete).not.toHaveBeenCalledWith('p_no_date')
                expect(mockModel.findByIdAndDelete).not.toHaveBeenCalledWith('p_no_time')
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
