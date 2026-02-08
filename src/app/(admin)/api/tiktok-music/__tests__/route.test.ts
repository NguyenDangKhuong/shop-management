/**
 * @jest-environment node
 */

/**
 * Tests for TikTok Music API route
 * Tests CRUD operations and random endpoint
 */

// Mock connectDB
jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

// Mock Cloudinary
jest.mock('cloudinary', () => ({
    v2: {
        config: jest.fn(),
        uploader: {
            destroy: jest.fn().mockResolvedValue({ result: 'ok' })
        }
    }
}))

// Mock constants
jest.mock('@/utils/constants', () => ({
    CLOUD_NAME_CLOUDINARY: 'test_cloud',
    API_KEY_CLOUDINARY: 'test_key',
    API_SECRET_CLOUDINARY: 'test_secret'
}))

// Mock TikTokMusicModel
jest.mock('@/models/TikTokMusic', () => {
    const mockLean = jest.fn()
    const mockSort = jest.fn().mockReturnValue({ lean: mockLean })
    const model: any = jest.fn()
    model.find = jest.fn().mockReturnValue({ sort: mockSort })
    model.findById = jest.fn()
    model.create = jest.fn()
    model.findByIdAndUpdate = jest.fn()
    model.findByIdAndDelete = jest.fn()
    model.aggregate = jest.fn()
    model._mockSort = mockSort
    model._mockLean = mockLean
    return { __esModule: true, default: model }
})

import { DELETE, GET, POST, PUT } from '@/app/(admin)/api/tiktok-music/route'
import TikTokMusicModel from '@/models/TikTokMusic'
import { NextRequest } from 'next/server'

describe('TikTok Music API', () => {
    const mockModel = TikTokMusicModel as any
    const mockLean = mockModel._mockLean
    const mockSort = mockModel._mockSort

    beforeEach(() => {
        jest.clearAllMocks()
        mockModel.find.mockReturnValue({ sort: mockSort })
        mockSort.mockReturnValue({ lean: mockLean })
    })

    describe('GET', () => {
        it('fetches all music', async () => {
            const mockData = [
                { _id: 'm_1', name: 'Song 1', music: { url: 'https://example.com/song1.mp3', type: 'audio' } },
                { _id: 'm_2', name: 'Song 2' }
            ]
            mockLean.mockResolvedValue(mockData)

            const request = new NextRequest('http://localhost:3000/api/tiktok-music')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toHaveLength(2)
        })

        it('returns random music when ?random=1', async () => {
            const randomSong = { _id: 'm_1', name: 'Random Song', music: { url: 'https://example.com/random.mp3', type: 'audio' } }
            mockModel.aggregate.mockResolvedValue([randomSong])

            const request = new NextRequest('http://localhost:3000/api/tiktok-music?random=1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.name).toBe('Random Song')
            expect(mockModel.aggregate).toHaveBeenCalledWith([{ $sample: { size: 1 } }])
        })

        it('returns 404 when no music for random', async () => {
            mockModel.aggregate.mockResolvedValue([])

            const request = new NextRequest('http://localhost:3000/api/tiktok-music?random=1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(404)
        })

        it('returns 500 on error', async () => {
            mockModel.find.mockImplementation(() => { throw new Error('DB error') })

            const request = new NextRequest('http://localhost:3000/api/tiktok-music')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('POST', () => {
        it('creates music with name and file', async () => {
            const newMusic = {
                _id: 'm_new',
                name: 'New Song',
                music: { url: 'https://example.com/new.mp3', type: 'audio', publicId: 'music_123' }
            }
            mockModel.create.mockResolvedValue(newMusic)

            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'POST',
                body: JSON.stringify({
                    name: 'New Song',
                    music: { url: 'https://example.com/new.mp3', type: 'audio', publicId: 'music_123' }
                })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.name).toBe('New Song')
            expect(json.data.music.url).toBe('https://example.com/new.mp3')
        })

        it('creates music with name only', async () => {
            mockModel.create.mockResolvedValue({ _id: 'm_new', name: 'Name Only' })

            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'POST',
                body: JSON.stringify({ name: 'Name Only' })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.create).toHaveBeenCalledWith({ name: 'Name Only', music: undefined })
        })

        it('returns 400 when name is missing', async () => {
            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'POST',
                body: JSON.stringify({})
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 500 on creation error', async () => {
            mockModel.create.mockRejectedValue(new Error('Create failed'))

            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'POST',
                body: JSON.stringify({ name: 'Test' })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('PUT', () => {
        it('updates music name and file', async () => {
            const updated = { _id: 'm_1', name: 'Updated', music: { url: 'new.mp3' } }
            mockModel.findByIdAndUpdate.mockResolvedValue(updated)

            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'PUT',
                body: JSON.stringify({ id: 'm_1', name: 'Updated', music: { url: 'new.mp3' } })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.name).toBe('Updated')
        })

        it('returns 400 when id is missing', async () => {
            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'PUT',
                body: JSON.stringify({ name: 'No ID' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 404 when music not found', async () => {
            mockModel.findByIdAndUpdate.mockResolvedValue(null)

            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'PUT',
                body: JSON.stringify({ id: 'nonexistent', name: 'Test' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(404)
        })
    })

    describe('DELETE', () => {
        it('deletes a music item', async () => {
            mockModel.findById.mockResolvedValue({ _id: 'm_1', music: null })
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'm_1' })

            const request = new NextRequest('http://localhost:3000/api/tiktok-music?id=m_1', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
        })

        it('deletes music with Cloudinary file', async () => {
            const { v2: cloudinary } = require('cloudinary')
            mockModel.findById.mockResolvedValue({
                _id: 'm_1',
                music: { url: 'https://example.com/song.mp3', type: 'audio', publicId: 'music_123' }
            })
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'm_1' })

            const request = new NextRequest('http://localhost:3000/api/tiktok-music?id=m_1', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('music_123', { resource_type: 'video' })
        })

        it('returns 400 when id is missing', async () => {
            const request = new NextRequest('http://localhost:3000/api/tiktok-music', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 404 when music not found', async () => {
            mockModel.findById.mockResolvedValue(null)

            const request = new NextRequest('http://localhost:3000/api/tiktok-music?id=nonexistent', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(404)
        })

        it('still deletes from DB if Cloudinary fails', async () => {
            const { v2: cloudinary } = require('cloudinary')
            cloudinary.uploader.destroy.mockRejectedValueOnce(new Error('Cloudinary error'))
            mockModel.findById.mockResolvedValue({
                _id: 'm_1',
                music: { url: 'https://example.com/song.mp3', type: 'audio', publicId: 'music_fail' }
            })
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'm_1' })

            const request = new NextRequest('http://localhost:3000/api/tiktok-music?id=m_1', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('m_1')
        })
    })
})
