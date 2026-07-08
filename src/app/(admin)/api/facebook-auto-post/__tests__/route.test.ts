/**
 * @jest-environment node
 */

/**
 * Tests for Facebook Auto Post API route
 * Covers: GET, POST (create from Douyin URL), PUT, DELETE
 */

// Mock connectDB
jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

// Mock constants
jest.mock('@/utils/constants', () => ({
    R2_ACCOUNT_ID: 'test-account',
    R2_ACCESS_KEY_ID: 'test-key',
    R2_SECRET_ACCESS_KEY: 'test-secret',
    R2_BUCKET_NAME: 'test-bucket',
    R2_PUBLIC_URL: 'https://pub-test.r2.dev',
    FB_PAGE_ID: '106470202191109',
    FB_PAGE_NAME: 'Yumy Shop',
}))

// Mock minio
const mockPutObject = jest.fn().mockResolvedValue(undefined)
const mockRemoveObject = jest.fn().mockResolvedValue(undefined)
jest.mock('minio', () => ({
    Client: jest.fn().mockImplementation(() => ({
        putObject: (...args: any[]) => mockPutObject(...args),
        removeObject: (...args: any[]) => mockRemoveObject(...args),
    })),
}))

// Mock global fetch for Douyin API calls
const mockFetch = jest.fn()
global.fetch = mockFetch as any

// Mock FacebookPostModel
jest.mock('@/models/FacebookPost', () => {
    const model: any = jest.fn()
    model.find = jest.fn()
    model.create = jest.fn()
    model.findById = jest.fn()
    model.findByIdAndUpdate = jest.fn()
    model.findByIdAndDelete = jest.fn()
    return { __esModule: true, default: model }
})

import { GET, POST, PUT, DELETE } from '@/app/(admin)/api/facebook-auto-post/route'
import FacebookPostModel from '@/models/FacebookPost'
import { NextRequest } from 'next/server'

describe('Facebook Auto Post API', () => {
    const mockModel = FacebookPostModel as any

    beforeEach(() => {
        jest.clearAllMocks()
        mockPutObject.mockReset().mockResolvedValue(undefined)
        mockRemoveObject.mockReset().mockResolvedValue(undefined)
        mockFetch.mockReset()
    })

    // ═══════════════════════════════════
    // GET /api/facebook-auto-post
    // ═══════════════════════════════════
    describe('GET', () => {
        it('fetches all auto-video posts sorted by createdAt desc', async () => {
            const posts = [
                { _id: 'p1', postType: 'auto-video', content: 'Test 1' },
                { _id: 'p2', postType: 'auto-video', content: 'Test 2' },
            ]
            mockModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue(posts),
                }),
            })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toHaveLength(2)
            expect(mockModel.find).toHaveBeenCalledWith({ postType: 'auto-video' })
        })

        it('filters by status when provided', async () => {
            mockModel.find.mockReturnValue({
                sort: jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue([]),
                }),
            })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post?status=draft')
            await GET(request)

            expect(mockModel.find).toHaveBeenCalledWith({ postType: 'auto-video', status: 'draft' })
        })

        it('returns 500 on DB error', async () => {
            mockModel.find.mockImplementation(() => { throw new Error('DB error') })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post')
            const response = await GET(request)

            expect(response.status).toBe(500)
            const json = await response.json()
            expect(json.success).toBe(false)
        })
    })

    // ═══════════════════════════════════
    // POST /api/facebook-auto-post
    // ═══════════════════════════════════
    describe('POST', () => {
        const setupDouyinMocks = () => {
            // Mock Douyin API metadata response
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    data: {
                        desc: 'Cô gái nhảy hip hop',
                        video_data: {
                            nwm_video_url_HQ: 'https://douyin.com/video.mp4',
                        },
                    },
                }),
            })
            // Mock video download response
            mockFetch.mockResolvedValueOnce({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(1024)),
            })
        }

        it('creates post from Douyin URL — downloads video and saves to R2', async () => {
            setupDouyinMocks()
            mockModel.create.mockResolvedValue({
                _id: 'p1',
                content: 'Test caption',
                postType: 'auto-video',
                videoR2Url: 'https://pub-test.r2.dev/facebook-auto/123.mp4',
            })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'POST',
                body: JSON.stringify({
                    douyinUrl: 'https://douyin.com/abc',
                    caption: 'Test caption',
                }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockPutObject).toHaveBeenCalled()
            expect(mockModel.create).toHaveBeenCalledWith(
                expect.objectContaining({
                    postType: 'auto-video',
                    targetType: 'page',
                    targetId: '106470202191109',
                    targetName: 'Yumy Shop',
                    douyinUrl: 'https://douyin.com/abc',
                    aiCaption: 'Test caption',
                    status: 'draft',
                })
            )
        })

        it('returns 400 when douyinUrl is missing', async () => {
            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'POST',
                body: JSON.stringify({}),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(response.status).toBe(400)
            expect(json.error).toContain('douyinUrl')
        })

        it('returns 502 when Douyin API fails', async () => {
            mockFetch.mockResolvedValueOnce({ ok: false })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'POST',
                body: JSON.stringify({ douyinUrl: 'https://douyin.com/bad' }),
            })
            const response = await POST(request)

            expect(response.status).toBe(502)
        })

        it('returns 404 when no video URL in Douyin response', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: () => Promise.resolve({
                    data: { desc: 'Test', video_data: {} },
                }),
            })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'POST',
                body: JSON.stringify({ douyinUrl: 'https://douyin.com/no-video' }),
            })
            const response = await POST(request)

            expect(response.status).toBe(404)
        })

        it('sets status to scheduled when scheduledDate is provided', async () => {
            setupDouyinMocks()
            mockModel.create.mockImplementation((body: any) =>
                Promise.resolve({ _id: 'p1', ...body })
            )

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'POST',
                body: JSON.stringify({
                    douyinUrl: 'https://douyin.com/abc',
                    caption: 'Scheduled post',
                    scheduledDate: '15/07/2026',
                    scheduledTime: '14:00',
                }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.status).toBe('scheduled')
            expect(json.data.scheduledDate).toBe('15/07/2026')
        })

        it('uses douyinDesc as fallback content when no caption provided', async () => {
            setupDouyinMocks()
            mockModel.create.mockImplementation((body: any) =>
                Promise.resolve({ _id: 'p1', ...body })
            )

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'POST',
                body: JSON.stringify({ douyinUrl: 'https://douyin.com/abc' }),
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.content).toBe('Cô gái nhảy hip hop')
        })
    })

    // ═══════════════════════════════════
    // PUT /api/facebook-auto-post
    // ═══════════════════════════════════
    describe('PUT', () => {
        it('updates caption and syncs to content field', async () => {
            mockModel.findByIdAndUpdate.mockResolvedValue({
                _id: 'p1',
                aiCaption: 'New caption',
                content: 'New caption',
            })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'PUT',
                body: JSON.stringify({ id: 'p1', aiCaption: 'New caption' }),
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
                'p1',
                expect.objectContaining({
                    aiCaption: 'New caption',
                    content: 'New caption',
                }),
                { new: true }
            )
        })

        it('returns 400 when id is missing', async () => {
            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'PUT',
                body: JSON.stringify({ aiCaption: 'No id' }),
            })
            const response = await PUT(request)

            expect(response.status).toBe(400)
        })
    })

    // ═══════════════════════════════════
    // DELETE /api/facebook-auto-post
    // ═══════════════════════════════════
    describe('DELETE', () => {
        it('deletes post and cleans up R2 video', async () => {
            mockModel.findById.mockReturnValue({
                lean: jest.fn().mockResolvedValue({
                    _id: 'p1',
                    videoR2Key: 'facebook-auto/123.mp4',
                }),
            })
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post?id=p1', {
                method: 'DELETE',
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockRemoveObject).toHaveBeenCalledWith('test-bucket', 'facebook-auto/123.mp4')
            expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p1')
        })

        it('deletes post even without video', async () => {
            mockModel.findById.mockReturnValue({
                lean: jest.fn().mockResolvedValue({ _id: 'p1' }),
            })
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post?id=p1', {
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
                    videoR2Key: 'facebook-auto/err.mp4',
                }),
            })
            mockRemoveObject.mockRejectedValue(new Error('R2 error'))
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'p1' })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post?id=p1', {
                method: 'DELETE',
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('p1')
        })

        it('returns 400 when id is missing', async () => {
            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post', {
                method: 'DELETE',
            })
            const response = await DELETE(request)

            expect(response.status).toBe(400)
        })

        it('returns 404 when post not found', async () => {
            mockModel.findById.mockReturnValue({
                lean: jest.fn().mockResolvedValue(null),
            })

            const request = new NextRequest('http://localhost:3000/api/facebook-auto-post?id=nonexistent', {
                method: 'DELETE',
            })
            const response = await DELETE(request)

            expect(response.status).toBe(404)
        })
    })
})
