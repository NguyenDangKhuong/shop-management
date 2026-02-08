/**
 * @jest-environment node
 */

/**
 * Tests for Veo3 Media API route
 * Tests the CRUD operations for veo3 media items
 */

// Mock connectDB
jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

// Mock deleteCloudinaryImage
jest.mock('@/actions/cloudinary', () => ({
    deleteCloudinaryImage: jest.fn().mockResolvedValue({ success: true })
}))

// Mock Veo3MediaModel
jest.mock('@/models/Veo3Media', () => {
    const mockLean = jest.fn()
    const mockSort = jest.fn().mockReturnValue({ lean: mockLean })
    const model: any = jest.fn()
    model.find = jest.fn().mockReturnValue({ sort: mockSort })
    model.create = jest.fn()
    model.findByIdAndUpdate = jest.fn()
    model.findByIdAndDelete = jest.fn()
    model._mockSort = mockSort
    model._mockLean = mockLean
    return { __esModule: true, default: model }
})

import { DELETE, GET, POST, PUT } from '@/app/(admin)/api/veo3-media/route'
import Veo3MediaModel from '@/models/Veo3Media'
import { NextRequest } from 'next/server'

describe('Veo3 Media API', () => {
    const mockModel = Veo3MediaModel as any
    const mockLean = mockModel._mockLean
    const mockSort = mockModel._mockSort

    beforeEach(() => {
        jest.clearAllMocks()
        // Re-wire find().sort().lean() chain after clearAllMocks
        mockModel.find.mockReturnValue({ sort: mockSort })
        mockSort.mockReturnValue({ lean: mockLean })
    })

    describe('GET', () => {
        it('fetches media by accountId', async () => {
            const mockData = [
                { _id: 'vm_1', accountId: 'acc_1', mediaId: 'media_1' },
                { _id: 'vm_2', accountId: 'acc_1', mediaId: 'media_2' }
            ]
            mockLean.mockResolvedValue(mockData)

            const request = new NextRequest('http://localhost:3000/api/veo3-media?accountId=acc_1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toEqual(mockData)
            expect(mockModel.find).toHaveBeenCalledWith({ accountId: 'acc_1' })
        })

        it('returns 400 when no accountId provided', async () => {
            const request = new NextRequest('http://localhost:3000/api/veo3-media')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 500 on error', async () => {
            mockLean.mockRejectedValue(new Error('DB error'))

            const request = new NextRequest('http://localhost:3000/api/veo3-media?accountId=acc_1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('POST', () => {
        it('creates a new veo3 media item', async () => {
            const newMedia = { _id: 'vm_new', accountId: 'acc_1', mediaId: 'new_media' }
            mockModel.create.mockResolvedValue(newMedia)

            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'POST',
                body: JSON.stringify({ accountId: 'acc_1', mediaId: 'new_media' })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toEqual(newMedia)
        })

        it('returns 400 when missing required fields', async () => {
            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'POST',
                body: JSON.stringify({ accountId: 'acc_1' })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 500 on creation error', async () => {
            mockModel.create.mockRejectedValue(new Error('Validation error'))

            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'POST',
                body: JSON.stringify({ accountId: 'acc_1', mediaId: 'test' })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('PUT', () => {
        it('updates a veo3 media item with mediaFile', async () => {
            const updatedMedia = {
                _id: 'vm_1',
                mediaFile: { url: 'https://new-image.jpg', type: 'image', publicId: 'new_id' }
            }
            mockModel.findByIdAndUpdate.mockResolvedValue(updatedMedia)

            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'PUT',
                body: JSON.stringify({
                    id: 'vm_1',
                    mediaFile: { url: 'https://new-image.jpg', type: 'image', publicId: 'new_id' }
                })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toEqual(updatedMedia)
        })

        it('returns 400 when no id provided', async () => {
            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'PUT',
                body: JSON.stringify({ mediaId: 'updated' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 404 when media not found', async () => {
            mockModel.findByIdAndUpdate.mockResolvedValue(null)

            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'PUT',
                body: JSON.stringify({ id: 'nonexistent', mediaId: 'test' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(404)
        })

        it('returns 500 on update error', async () => {
            mockModel.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'))

            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'PUT',
                body: JSON.stringify({ id: 'vm_1', mediaId: 'updated' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('DELETE', () => {
        it('deletes a veo3 media item', async () => {
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'vm_1' })

            const request = new NextRequest('http://localhost:3000/api/veo3-media?id=vm_1', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('vm_1')
        })

        it('returns 400 when no id provided', async () => {
            const request = new NextRequest('http://localhost:3000/api/veo3-media', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(400)
        })

        it('returns 404 when media not found', async () => {
            mockModel.findByIdAndDelete.mockResolvedValue(null)

            const request = new NextRequest('http://localhost:3000/api/veo3-media?id=nonexistent', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(404)
        })

        it('returns 500 on delete error', async () => {
            mockModel.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'))

            const request = new NextRequest('http://localhost:3000/api/veo3-media?id=invalid', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })
})
