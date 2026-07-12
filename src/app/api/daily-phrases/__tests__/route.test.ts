/**
 * @jest-environment node
 */
import { GET, PATCH } from '@/app/api/daily-phrases/route'
import { NextRequest } from 'next/server'

jest.mock('@/utils/connectDb', () => jest.fn().mockResolvedValue(undefined))

const mockFind = jest.fn()
const mockCountDocuments = jest.fn()
const mockFindById = jest.fn()

jest.mock('@/models/DailyPhrase', () => ({
    __esModule: true,
    default: {
        find: (...args: unknown[]) => ({
            sort: () => ({
                lean: () => mockFind(...args),
            }),
        }),
        countDocuments: (...args: unknown[]) => mockCountDocuments(...args),
        findById: (...args: unknown[]) => mockFindById(...args),
    },
}))

const mockPhrase = {
    _id: 'phrase1',
    category: 'standup',
    phrase: "Yesterday I worked on...",
    meaning: "Hôm qua mình đã làm...",
    example: "Yesterday I worked on the header component refactor.",
    tip: "Cách mở đầu standup phổ biến nhất.",
    interval: 1,
    nextReviewAt: new Date('2026-07-12'),
    easeFactor: 2.5,
    reviewCount: 0,
    lastReviewedAt: null,
}

describe('Daily Phrases API', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    describe('GET', () => {
        it('returns all phrases with dueCount', async () => {
            mockFind.mockResolvedValue([mockPhrase])
            mockCountDocuments.mockResolvedValue(5)

            const req = new NextRequest('http://localhost:3000/api/daily-phrases')
            const res = await GET(req)
            const data = await res.json()

            expect(data.items).toHaveLength(1)
            expect(data.total).toBe(1)
            expect(data.dueCount).toBe(5)
            expect(data.items[0].phrase).toBe("Yesterday I worked on...")
        })

        it('filters by category', async () => {
            mockFind.mockResolvedValue([mockPhrase])
            mockCountDocuments.mockResolvedValue(1)

            const req = new NextRequest('http://localhost:3000/api/daily-phrases?category=standup')
            const res = await GET(req)
            const data = await res.json()

            expect(data.items).toHaveLength(1)
            expect(data.items[0].category).toBe('standup')
        })

        it('filters due phrases', async () => {
            mockFind.mockResolvedValue([mockPhrase])
            mockCountDocuments.mockResolvedValue(1)

            const req = new NextRequest('http://localhost:3000/api/daily-phrases?due=true')
            const res = await GET(req)
            const data = await res.json()

            expect(data.items).toBeDefined()
        })

        it('ignores invalid category', async () => {
            mockFind.mockResolvedValue([])
            mockCountDocuments.mockResolvedValue(0)

            const req = new NextRequest('http://localhost:3000/api/daily-phrases?category=invalid')
            const res = await GET(req)
            const data = await res.json()

            expect(res.status).toBe(200)
            expect(data.items).toBeDefined()
        })

        it('returns 500 on DB error', async () => {
            mockFind.mockRejectedValue(new Error('DB error'))

            const req = new NextRequest('http://localhost:3000/api/daily-phrases')
            const res = await GET(req)

            expect(res.status).toBe(500)
        })
    })

    describe('PATCH (review)', () => {
        it('returns 400 without id and rating', async () => {
            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({}),
            })
            const res = await PATCH(req)
            expect(res.status).toBe(400)
        })

        it('returns 400 for invalid rating', async () => {
            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({ id: 'phrase1', rating: 'super' }),
            })
            const res = await PATCH(req)
            expect(res.status).toBe(400)
        })

        it('returns 404 for non-existent phrase', async () => {
            mockFindById.mockResolvedValue(null)

            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({ id: 'nonexistent', rating: 'good' }),
            })
            const res = await PATCH(req)
            expect(res.status).toBe(404)
        })

        it('reviews with hard → interval = 1', async () => {
            const saveMock = jest.fn().mockResolvedValue(undefined)
            mockFindById.mockResolvedValue({
                ...mockPhrase,
                reviewCount: 2,
                interval: 4,
                easeFactor: 2.5,
                save: saveMock,
            })

            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({ id: 'phrase1', rating: 'hard' }),
            })
            const res = await PATCH(req)
            const data = await res.json()

            expect(data.success).toBe(true)
            expect(data.phrase.interval).toBe(1)
            expect(saveMock).toHaveBeenCalled()
        })

        it('reviews with good → interval increases', async () => {
            const saveMock = jest.fn().mockResolvedValue(undefined)
            mockFindById.mockResolvedValue({
                ...mockPhrase,
                reviewCount: 1,
                interval: 2,
                easeFactor: 2.5,
                save: saveMock,
            })

            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({ id: 'phrase1', rating: 'good' }),
            })
            const res = await PATCH(req)
            const data = await res.json()

            expect(data.success).toBe(true)
            expect(data.phrase.interval).toBe(5) // ceil(2 * 2.5)
            expect(data.phrase.reviewCount).toBe(2)
        })

        it('reviews with easy → interval increases more', async () => {
            const saveMock = jest.fn().mockResolvedValue(undefined)
            mockFindById.mockResolvedValue({
                ...mockPhrase,
                reviewCount: 1,
                interval: 2,
                easeFactor: 2.5,
                save: saveMock,
            })

            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({ id: 'phrase1', rating: 'easy' }),
            })
            const res = await PATCH(req)
            const data = await res.json()

            expect(data.success).toBe(true)
            expect(data.phrase.interval).toBe(8) // ceil(2 * 2.5 * 1.5)
            expect(data.phrase.easeFactor).toBe(2.65) // 2.5 + 0.15
        })

        it('returns 500 on DB error', async () => {
            mockFindById.mockRejectedValue(new Error('DB error'))

            const req = new NextRequest('http://localhost:3000/api/daily-phrases', {
                method: 'PATCH',
                body: JSON.stringify({ id: 'phrase1', rating: 'good' }),
            })
            const res = await PATCH(req)
            expect(res.status).toBe(500)
        })
    })
})
