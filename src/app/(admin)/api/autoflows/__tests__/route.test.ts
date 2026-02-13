/**
 * @jest-environment node
 */

/**
 * Tests for AutoFlow API route
 * Tests CRUD operations and status field
 * Updated: prompts are now independent (no cascade delete), populated via promptIds
 */

// Mock connectDB
jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

// Mock AutoFlowModel
jest.mock('@/models/AutoFlow', () => {
    const mockLean = jest.fn()
    const mockSort = jest.fn().mockReturnValue({ lean: mockLean })
    const model: any = jest.fn()
    model.find = jest.fn().mockReturnValue({ sort: mockSort })
    model.create = jest.fn()
    model.findById = jest.fn()
    model.findByIdAndUpdate = jest.fn()
    model.findByIdAndDelete = jest.fn()
    model._mockSort = mockSort
    model._mockLean = mockLean
    return { __esModule: true, default: model }
})

// Mock PromptModel
jest.mock('@/models/Prompt', () => {
    const mockLean = jest.fn()
    const mockSort = jest.fn().mockReturnValue({ lean: mockLean })
    const model: any = jest.fn()
    model.find = jest.fn().mockReturnValue({ sort: mockSort })
    model.deleteMany = jest.fn()
    model._mockSort = mockSort
    model._mockLean = mockLean
    return { __esModule: true, default: model }
})

import { DELETE, GET, POST, PUT } from '@/app/(admin)/api/autoflows/route'
import AutoFlowModel from '@/models/AutoFlow'
import PromptModel from '@/models/Prompt'
import { NextRequest } from 'next/server'

describe('AutoFlow API', () => {
    const mockModel = AutoFlowModel as any
    const mockLean = mockModel._mockLean
    const mockSort = mockModel._mockSort
    const mockPromptModel = PromptModel as any
    const mockPromptLean = mockPromptModel._mockLean
    const mockPromptSort = mockPromptModel._mockSort

    beforeEach(() => {
        jest.clearAllMocks()
        mockModel.find.mockReturnValue({ sort: mockSort })
        mockSort.mockReturnValue({ lean: mockLean })
        mockPromptModel.find.mockReturnValue({ sort: mockPromptSort })
        mockPromptSort.mockReturnValue({ lean: mockPromptLean })
    })

    describe('GET', () => {
        it('fetches autoflows by accountId with prompts populated via promptIds', async () => {
            const mockAutoflows = [
                {
                    _id: 'af_1',
                    accountId: 'acc_1',
                    productId: 'prod_1',
                    productTitle: 'Product 1',
                    enabled: true,
                    status: 'pending',
                    promptIds: ['p_1']
                }
            ]
            const mockPrompts = [
                { _id: 'p_1', accountId: 'acc_1', title: 'Prompt 1', content: 'Content 1' }
            ]
            mockLean.mockResolvedValue(mockAutoflows)
            mockPromptLean.mockResolvedValue(mockPrompts)

            const request = new NextRequest('http://localhost:3000/api/autoflows?accountId=acc_1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data).toHaveLength(1)
            expect(json.data[0].prompts).toHaveLength(1)
            expect(json.data[0].status).toBe('pending')
        })

        it('returns empty prompts when autoflow has no promptIds', async () => {
            const mockAutoflows = [
                { _id: 'af_1', accountId: 'acc_1', productId: 'prod_1', enabled: true }
            ]
            mockLean.mockResolvedValue(mockAutoflows)
            mockPromptLean.mockResolvedValue([])

            const request = new NextRequest('http://localhost:3000/api/autoflows?accountId=acc_1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data[0].prompts).toHaveLength(0)
        })

        it('fetches autoflows by productId', async () => {
            mockLean.mockResolvedValue([])
            mockPromptLean.mockResolvedValue([])

            const request = new NextRequest('http://localhost:3000/api/autoflows?productId=prod_1')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.find).toHaveBeenCalledWith({ productId: 'prod_1' })
        })

        it('returns 500 on error', async () => {
            mockModel.find.mockImplementation(() => { throw new Error('DB error') })

            const request = new NextRequest('http://localhost:3000/api/autoflows')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })

        it('randomPrompt=true returns either 1 hook or all describe prompts (not both)', async () => {
            const mockAutoflows = [
                {
                    _id: 'af_1',
                    accountId: 'acc_1',
                    productId: 'prod_1',
                    promptIds: ['p_hook1', 'p_hook2', 'p_desc1', 'p_desc2']
                }
            ]
            const mockPrompts = [
                { _id: 'p_hook1', accountId: 'acc_1', title: 'Hook 1', content: 'Hook content 1', type: 'hook' },
                { _id: 'p_hook2', accountId: 'acc_1', title: 'Hook 2', content: 'Hook content 2', type: 'hook' },
                { _id: 'p_desc1', accountId: 'acc_1', title: 'Desc 1', content: 'Desc content 1', type: 'describe' },
                { _id: 'p_desc2', accountId: 'acc_1', title: 'Desc 2', content: 'Desc content 2', type: 'describe' }
            ]
            mockLean.mockResolvedValue(mockAutoflows)
            mockPromptLean.mockResolvedValue(mockPrompts)

            const request = new NextRequest('http://localhost:3000/api/autoflows?accountId=acc_1&randomPrompt=true')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            const prompts = json.data[0].prompts
            // Should be EITHER 1 hook OR 2 describes, never both
            const hookResults = prompts.filter((p: any) => p.type === 'hook')
            const descResults = prompts.filter((p: any) => p.type === 'describe')
            const isHookMode = hookResults.length === 1 && descResults.length === 0
            const isDescribeMode = hookResults.length === 0 && descResults.length === 2
            expect(isHookMode || isDescribeMode).toBe(true)
        })

        it('randomPrompt=true returns all describe prompts when no hook prompts exist', async () => {
            const mockAutoflows = [
                {
                    _id: 'af_1',
                    accountId: 'acc_1',
                    productId: 'prod_1',
                    promptIds: ['p_desc1', 'p_desc2']
                }
            ]
            const mockPrompts = [
                { _id: 'p_desc1', accountId: 'acc_1', title: 'Desc 1', content: 'Content 1', type: 'describe' },
                { _id: 'p_desc2', accountId: 'acc_1', title: 'Desc 2', content: 'Content 2', type: 'describe' }
            ]
            mockLean.mockResolvedValue(mockAutoflows)
            mockPromptLean.mockResolvedValue(mockPrompts)

            const request = new NextRequest('http://localhost:3000/api/autoflows?accountId=acc_1&randomPrompt=true')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data[0].prompts).toHaveLength(2)
        })

        it('randomPrompt=true returns 1 random hook when only hook prompts exist', async () => {
            const mockAutoflows = [
                {
                    _id: 'af_1',
                    accountId: 'acc_1',
                    productId: 'prod_1',
                    promptIds: ['p_hook1', 'p_hook2', 'p_hook3']
                }
            ]
            const mockPrompts = [
                { _id: 'p_hook1', accountId: 'acc_1', title: 'Hook 1', content: 'Content 1', type: 'hook' },
                { _id: 'p_hook2', accountId: 'acc_1', title: 'Hook 2', content: 'Content 2', type: 'hook' },
                { _id: 'p_hook3', accountId: 'acc_1', title: 'Hook 3', content: 'Content 3', type: 'hook' }
            ]
            mockLean.mockResolvedValue(mockAutoflows)
            mockPromptLean.mockResolvedValue(mockPrompts)

            const request = new NextRequest('http://localhost:3000/api/autoflows?accountId=acc_1&randomPrompt=true')
            const response = await GET(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data[0].prompts).toHaveLength(1)
            expect(json.data[0].prompts[0].type).toBe('hook')
        })
    })

    describe('POST', () => {
        it('creates a new autoflow with default status pending', async () => {
            const newAutoflow = {
                _id: 'af_new',
                accountId: 'acc_1',
                productId: 'prod_1',
                productTitle: 'Product 1',
                enabled: false,
                status: 'pending',
                promptIds: []
            }
            mockModel.create.mockResolvedValue(newAutoflow)

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'POST',
                body: JSON.stringify({
                    accountId: 'acc_1',
                    productId: 'prod_1',
                    productTitle: 'Product 1',
                    promptIds: []
                })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.status).toBe('pending')
        })

        it('creates autoflow with videoFile', async () => {
            const newAutoflow = {
                _id: 'af_new',
                accountId: 'acc_1',
                productId: 'prod_1',
                videoFile: { url: 'https://cloudinary.com/video.mp4', publicId: 'vid1', type: 'video' }
            }
            mockModel.create.mockResolvedValue(newAutoflow)

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'POST',
                body: JSON.stringify({
                    accountId: 'acc_1',
                    productId: 'prod_1',
                    videoFile: { url: 'https://cloudinary.com/video.mp4', publicId: 'vid1', type: 'video' }
                })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.videoFile.url).toBe('https://cloudinary.com/video.mp4')
        })

        it('returns 500 on creation error', async () => {
            mockModel.create.mockRejectedValue(new Error('Create failed'))

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'POST',
                body: JSON.stringify({ accountId: 'acc_1' })
            })
            const response = await POST(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('PUT', () => {
        it('updates autoflow status', async () => {
            const updated = {
                _id: 'af_1', status: 'running', enabled: true
            }
            mockModel.findByIdAndUpdate.mockResolvedValue(updated)

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'PUT',
                body: JSON.stringify({ id: 'af_1', status: 'running' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.status).toBe('running')
            expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
                'af_1',
                { status: 'running' },
                { new: true }
            )
        })

        it('updates autoflow enabled toggle', async () => {
            const updated = { _id: 'af_1', enabled: true }
            mockModel.findByIdAndUpdate.mockResolvedValue(updated)

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'PUT',
                body: JSON.stringify({ id: 'af_1', enabled: true })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.enabled).toBe(true)
        })

        it('updates autoflow videoFile', async () => {
            const updated = {
                _id: 'af_1',
                videoFile: { url: 'https://cloudinary.com/video.mp4', publicId: 'vid1', type: 'video' }
            }
            mockModel.findByIdAndUpdate.mockResolvedValue(updated)

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'PUT',
                body: JSON.stringify({
                    id: 'af_1',
                    videoFile: { url: 'https://cloudinary.com/video.mp4', publicId: 'vid1', type: 'video' }
                })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(json.data.videoFile.url).toBe('https://cloudinary.com/video.mp4')
        })

        it('returns 500 on update error', async () => {
            mockModel.findByIdAndUpdate.mockRejectedValue(new Error('Update failed'))

            const request = new NextRequest('http://localhost:3000/api/autoflows', {
                method: 'PUT',
                body: JSON.stringify({ id: 'af_1', status: 'error' })
            })
            const response = await PUT(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })

    describe('DELETE', () => {
        it('deletes autoflow only (no cascade delete of prompts)', async () => {
            mockModel.findByIdAndDelete.mockResolvedValue({ _id: 'af_1' })

            const request = new NextRequest('http://localhost:3000/api/autoflows?id=af_1', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(true)
            expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('af_1')
            // Prompts should NOT be deleted — they are independent entities
            expect(mockPromptModel.deleteMany).not.toHaveBeenCalled()
        })

        it('returns 500 on delete error', async () => {
            mockModel.findByIdAndDelete.mockRejectedValue(new Error('Delete failed'))

            const request = new NextRequest('http://localhost:3000/api/autoflows?id=af_1', {
                method: 'DELETE'
            })
            const response = await DELETE(request)
            const json = await response.json()

            expect(json.success).toBe(false)
            expect(response.status).toBe(500)
        })
    })
})
