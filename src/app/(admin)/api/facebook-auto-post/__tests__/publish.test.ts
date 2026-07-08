/**
 * @jest-environment node
 */

/**
 * Tests for Facebook Auto Post Publish API
 * Covers: publish to Facebook Page via Graph API
 */

jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

jest.mock('@/utils/constants', () => ({
    FB_PAGE_ID: '106470202191109',
    FB_PAGE_ACCESS_TOKEN: 'test-page-token',
    FB_GRAPH_API_BASE: 'https://graph.facebook.com/v21.0',
}))

// Mock global fetch
const mockFetch = jest.fn()
global.fetch = mockFetch as any

jest.mock('@/models/FacebookPost', () => {
    const model: any = jest.fn()
    model.findById = jest.fn()
    model.findByIdAndUpdate = jest.fn()
    return { __esModule: true, default: model }
})

import { POST } from '@/app/(admin)/api/facebook-auto-post/publish/route'
import FacebookPostModel from '@/models/FacebookPost'
import { NextRequest } from 'next/server'

describe('Facebook Publish API', () => {
    const mockModel = FacebookPostModel as any

    beforeEach(() => {
        jest.clearAllMocks()
        mockFetch.mockReset()
    })

    it('publishes video to Facebook Page successfully', async () => {
        mockModel.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                _id: 'p1',
                status: 'draft',
                aiCaption: 'Test caption 🔥',
                videoR2Url: 'https://pub-test.r2.dev/facebook-auto/123.mp4',
            }),
        })
        mockModel.findByIdAndUpdate.mockResolvedValue({ _id: 'p1', status: 'published' })

        // Mock Facebook Graph API response
        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: 'fb_video_123' }),
        })

        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({ id: 'p1' }),
        })
        const response = await POST(request)
        const json = await response.json()

        expect(json.success).toBe(true)
        expect(json.facebookPostId).toBe('fb_video_123')

        // Verify Graph API was called correctly
        expect(mockFetch).toHaveBeenCalledWith(
            'https://graph.facebook.com/v21.0/106470202191109/videos',
            expect.objectContaining({
                method: 'POST',
                body: expect.stringContaining('Test caption 🔥'),
            })
        )

        // Verify DB was updated
        expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('p1', expect.objectContaining({
            status: 'published',
            facebookPostId: 'fb_video_123',
            errorMessage: null,
        }))
    })

    it('returns 400 when post id is missing', async () => {
        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({}),
        })
        const response = await POST(request)

        expect(response.status).toBe(400)
    })

    it('returns 404 when post not found', async () => {
        mockModel.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue(null),
        })

        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({ id: 'nonexistent' }),
        })
        const response = await POST(request)

        expect(response.status).toBe(404)
    })

    it('returns 400 when post is already published', async () => {
        mockModel.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                _id: 'p1',
                status: 'published',
                videoR2Url: 'https://pub-test.r2.dev/video.mp4',
            }),
        })

        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({ id: 'p1' }),
        })
        const response = await POST(request)

        expect(response.status).toBe(400)
    })

    it('returns 400 when post has no video URL', async () => {
        mockModel.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                _id: 'p1',
                status: 'draft',
                // No videoR2Url
            }),
        })

        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({ id: 'p1' }),
        })
        const response = await POST(request)

        expect(response.status).toBe(400)
    })

    it('marks post as failed when Facebook API returns error', async () => {
        mockModel.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                _id: 'p1',
                status: 'draft',
                aiCaption: 'Test',
                videoR2Url: 'https://pub-test.r2.dev/video.mp4',
            }),
        })
        mockModel.findByIdAndUpdate.mockResolvedValue({ _id: 'p1', status: 'failed' })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({
                error: { message: 'Invalid OAuth access token', code: 190 },
            }),
        })

        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({ id: 'p1' }),
        })
        const response = await POST(request)
        const json = await response.json()

        expect(response.status).toBe(502)
        expect(json.success).toBe(false)

        // Verify post marked as failed
        expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('p1', expect.objectContaining({
            status: 'failed',
            errorMessage: 'Invalid OAuth access token',
        }))
    })

    it('uses content as fallback when aiCaption is empty', async () => {
        mockModel.findById.mockReturnValue({
            lean: jest.fn().mockResolvedValue({
                _id: 'p1',
                status: 'draft',
                content: 'Fallback content',
                aiCaption: '',
                videoR2Url: 'https://pub-test.r2.dev/video.mp4',
            }),
        })
        mockModel.findByIdAndUpdate.mockResolvedValue({ _id: 'p1' })

        mockFetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ id: 'fb_123' }),
        })

        const request = new NextRequest('http://localhost:3000/api/facebook-auto-post/publish', {
            method: 'POST',
            body: JSON.stringify({ id: 'p1' }),
        })
        await POST(request)

        expect(mockFetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                body: expect.stringContaining('Fallback content'),
            })
        )
    })
})
