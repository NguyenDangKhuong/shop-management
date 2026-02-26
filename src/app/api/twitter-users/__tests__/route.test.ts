/**
 * @jest-environment node
 */
import { DELETE, GET, POST } from '@/app/api/twitter-users/route'
import { NextRequest } from 'next/server'

// Mock connectDb
jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

// Mock TwitterUser model
const mockSort = jest.fn()
const mockFindOne = jest.fn()
const mockCreate = jest.fn()
const mockFindByIdAndDelete = jest.fn()

jest.mock('@/models/TwitterUser', () => ({
    __esModule: true,
    default: {
        find: () => ({ sort: mockSort }),
        findOne: (...args: unknown[]) => mockFindOne(...args),
        create: (...args: unknown[]) => mockCreate(...args),
        findByIdAndDelete: (...args: unknown[]) => mockFindByIdAndDelete(...args),
    }
}))

describe('Twitter Users API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET', () => {
        it('returns all users', async () => {
            const mockUsers = [
                { _id: '1', username: 'vercel' },
                { _id: '2', username: 'reactjs' },
            ]
            mockSort.mockResolvedValue(mockUsers)

            const response = await GET()
            const data = await response.json()

            expect(data.success).toBe(true)
            expect(data.data).toEqual(mockUsers)
        })

        it('returns 500 on error', async () => {
            mockSort.mockRejectedValue(new Error('DB error'))

            const response = await GET()
            const data = await response.json()

            expect(response.status).toBe(500)
            expect(data.success).toBe(false)
            expect(data.error).toBe('DB error')
        })
    })

    describe('POST', () => {
        it('creates user with cleaned username', async () => {
            mockFindOne.mockResolvedValue(null)
            mockCreate.mockResolvedValue({ _id: '1', username: 'vercel' })

            const request = new NextRequest('http://localhost:3000/api/twitter-users', {
                method: 'POST',
                body: JSON.stringify({ username: '@Vercel' }),
            })

            const response = await POST(request)
            const data = await response.json()

            expect(data.success).toBe(true)
            expect(mockCreate).toHaveBeenCalledWith({ username: 'vercel' })
        })

        it('returns 409 for duplicate', async () => {
            mockFindOne.mockResolvedValue({ _id: '1', username: 'vercel' })

            const request = new NextRequest('http://localhost:3000/api/twitter-users', {
                method: 'POST',
                body: JSON.stringify({ username: 'vercel' }),
            })

            const response = await POST(request)
            expect(response.status).toBe(409)
        })

        it('returns 400 for missing username', async () => {
            const request = new NextRequest('http://localhost:3000/api/twitter-users', {
                method: 'POST',
                body: JSON.stringify({}),
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
        })

        it('returns 400 for empty username after trim', async () => {
            const request = new NextRequest('http://localhost:3000/api/twitter-users', {
                method: 'POST',
                body: JSON.stringify({ username: '@  ' }),
            })

            const response = await POST(request)
            expect(response.status).toBe(400)
        })
    })

    describe('DELETE', () => {
        it('deletes user by id', async () => {
            mockFindByIdAndDelete.mockResolvedValue({ _id: '1', username: 'vercel' })

            const request = new NextRequest('http://localhost:3000/api/twitter-users?id=1', {
                method: 'DELETE',
            })

            const response = await DELETE(request)
            const data = await response.json()

            expect(data.success).toBe(true)
            expect(mockFindByIdAndDelete).toHaveBeenCalledWith('1')
        })

        it('returns 400 without id', async () => {
            const request = new NextRequest('http://localhost:3000/api/twitter-users', {
                method: 'DELETE',
            })

            const response = await DELETE(request)
            expect(response.status).toBe(400)
        })

        it('returns 404 when not found', async () => {
            mockFindByIdAndDelete.mockResolvedValue(null)

            const request = new NextRequest('http://localhost:3000/api/twitter-users?id=999', {
                method: 'DELETE',
            })

            const response = await DELETE(request)
            expect(response.status).toBe(404)
        })
    })
})
