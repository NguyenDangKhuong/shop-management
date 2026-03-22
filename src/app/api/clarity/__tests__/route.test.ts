/**
 * @jest-environment node
 */
import { DELETE, GET, PUT } from '@/app/api/clarity/route'
import { NextRequest } from 'next/server'

jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))
jest.mock('@/lib/rateLimit', () => ({
    checkRateLimit: jest.fn().mockResolvedValue(null),
}))
jest.mock('@/lib/cache', () => ({
    withCache: jest.fn((_key: string, _ttl: number, fn: () => Promise<unknown>) => fn()),
    invalidateCache: jest.fn().mockResolvedValue(undefined),
}))

const mockFindOne = jest.fn()
const mockCreate = jest.fn()
const mockFindOneAndUpdate = jest.fn()
const mockFindOneAndDelete = jest.fn()

jest.mock('@/models/MonthPlan', () => ({
    __esModule: true,
    default: {
        findOne: (...args: unknown[]) => ({
            lean: () => mockFindOne(...args),
        }),
        create: (...args: unknown[]) => mockCreate(...args),
        findOneAndUpdate: (...args: unknown[]) => mockFindOneAndUpdate(...args),
        findOneAndDelete: (...args: unknown[]) => mockFindOneAndDelete(...args),
    }
}))

const mockPlan = {
    _id: 'plan1',
    month: '2026-03',
    goals: [{ text: 'Learn React', progress: 50, color: '#3b82f6' }],
    habits: [{ name: 'Exercise', days: Array(31).fill(false) }],
    weeks: [{ weekNumber: 1, goals: ['Study'], reflection: '' }],
    dailyTasks: [],
    monthReflection: { wentWell: '', improve: '', grateful: '', rating: 0 },
}

describe('Clarity API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET', () => {
        it('returns existing plan for month', async () => {
            mockFindOne.mockResolvedValue(mockPlan)

            const req = new NextRequest('http://localhost:3000/api/clarity?month=2026-03')
            const res = await GET(req)
            const data = await res.json()

            expect(data.plan).toBeDefined()
            expect(data.plan.month).toBe('2026-03')
        })

        it('creates new plan if not found', async () => {
            mockFindOne.mockResolvedValue(null)
            mockCreate.mockResolvedValue({
                ...mockPlan,
                toObject: () => mockPlan,
            })

            const req = new NextRequest('http://localhost:3000/api/clarity?month=2026-04')
            const res = await GET(req)
            const data = await res.json()

            expect(data.plan).toBeDefined()
            expect(mockCreate).toHaveBeenCalled()
        })

        it('returns 400 for invalid month format', async () => {
            const req = new NextRequest('http://localhost:3000/api/clarity?month=invalid')
            const res = await GET(req)

            expect(res.status).toBe(400)
        })

        it('returns 400 for missing month param', async () => {
            const req = new NextRequest('http://localhost:3000/api/clarity')
            const res = await GET(req)

            expect(res.status).toBe(400)
        })

        it('returns 500 on DB error', async () => {
            mockFindOne.mockRejectedValue(new Error('DB error'))

            const req = new NextRequest('http://localhost:3000/api/clarity?month=2026-03')
            const res = await GET(req)

            expect(res.status).toBe(500)
        })
    })

    describe('PUT', () => {
        it('updates plan successfully', async () => {
            mockFindOneAndUpdate.mockResolvedValue(mockPlan)

            const req = new NextRequest('http://localhost:3000/api/clarity', {
                method: 'PUT',
                body: JSON.stringify(mockPlan),
            })

            const res = await PUT(req)
            const data = await res.json()

            expect(data.success).toBe(true)
            expect(mockFindOneAndUpdate).toHaveBeenCalled()
        })

        it('returns 400 for invalid month', async () => {
            const req = new NextRequest('http://localhost:3000/api/clarity', {
                method: 'PUT',
                body: JSON.stringify({ month: 'bad' }),
            })

            const res = await PUT(req)
            expect(res.status).toBe(400)
        })

        it('returns 500 on DB error', async () => {
            mockFindOneAndUpdate.mockRejectedValue(new Error('DB error'))

            const req = new NextRequest('http://localhost:3000/api/clarity', {
                method: 'PUT',
                body: JSON.stringify(mockPlan),
            })

            const res = await PUT(req)
            expect(res.status).toBe(500)
        })
    })

    describe('DELETE', () => {
        it('deletes plan by month', async () => {
            mockFindOneAndDelete.mockResolvedValue(mockPlan)

            const req = new NextRequest('http://localhost:3000/api/clarity?month=2026-03', {
                method: 'DELETE',
            })

            const res = await DELETE(req)
            const data = await res.json()

            expect(data.success).toBe(true)
        })

        it('returns 400 without month', async () => {
            const req = new NextRequest('http://localhost:3000/api/clarity', {
                method: 'DELETE',
            })

            const res = await DELETE(req)
            expect(res.status).toBe(400)
        })

        it('returns 500 on DB error', async () => {
            mockFindOneAndDelete.mockRejectedValue(new Error('DB error'))

            const req = new NextRequest('http://localhost:3000/api/clarity?month=2026-03', {
                method: 'DELETE',
            })

            const res = await DELETE(req)
            expect(res.status).toBe(500)
        })
    })
})
