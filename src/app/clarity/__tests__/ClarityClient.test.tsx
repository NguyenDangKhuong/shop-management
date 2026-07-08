import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ClarityClient from '../ClarityClient'

const mockPlan = {
    _id: 'plan1',
    month: '2026-03',
    goals: [
        { text: 'Learn TypeScript', progress: 60, color: '#3b82f6' },
        { text: 'Exercise daily', progress: 30, color: '#10b981' },
    ],
    habits: [{ name: 'Read 30min', days: Array(31).fill(false) }],
    weeks: [
        { weekNumber: 1, goals: ['Study DSA'], reflection: 'Good week' },
        { weekNumber: 2, goals: ['Build project'], reflection: '' },
    ],
    dailyTasks: [],
    monthReflection: { wentWell: '', improve: '', grateful: '', rating: 0 },
}

// Mock fetch
const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockResolvedValue({
        json: async () => ({ plan: mockPlan }),
    })
})

describe('ClarityClient', () => {
    it('renders loading state then content', async () => {
        render(<ClarityClient />)

        // Should show loading initially
        expect(screen.getByText(/Loading plan/i)).toBeInTheDocument()

        // After fetch, show the title
        await waitFor(() => {
            expect(screen.getByText('Clarity')).toBeInTheDocument()
        })
    })

    it('renders monthly goals tab by default', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('🎯 Mục tiêu tháng')).toBeInTheDocument()
        })

        // Should show goal inputs
        expect(screen.getByDisplayValue('Learn TypeScript')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Exercise daily')).toBeInTheDocument()
    })

    it('shows overall progress bar', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            // Average of 60 and 30 = 45%
            expect(screen.getByText('45%')).toBeInTheDocument()
        })
    })

    it('switches to habits tab', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('Clarity')).toBeInTheDocument()
        })

        // Click habits tab (find by hidden text)
        const habitsTab = screen.getByText('🔁 Thói quen')
        fireEvent.click(habitsTab)

        expect(screen.getByText('🔁 Thói quen hàng ngày')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Read 30min')).toBeInTheDocument()
    })

    it('switches to weekly tab', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('Clarity')).toBeInTheDocument()
        })

        const weeklyTab = screen.getByText('📅 Tuần')
        fireEvent.click(weeklyTab)

        expect(screen.getByText('📅 Mục tiêu tuần')).toBeInTheDocument()
        expect(screen.getByText('Tuần 1')).toBeInTheDocument()
    })

    it('switches to daily tasks tab', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('Clarity')).toBeInTheDocument()
        })

        const dailyTab = screen.getByText('✅ Task')
        fireEvent.click(dailyTab)

        expect(screen.getByText('✅ Task hằng ngày')).toBeInTheDocument()
        expect(screen.getByText('+ Task')).toBeInTheDocument()
    })

    it('switches to reflection tab', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('Clarity')).toBeInTheDocument()
        })

        const reflectionTab = screen.getByText('💭 Reflection')
        fireEvent.click(reflectionTab)

        expect(screen.getByText('💭 Reflection cuối tháng')).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Tháng này mình đã làm được gì tốt/)).toBeInTheDocument()
    })

    it('adds a new goal', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('🎯 Mục tiêu tháng')).toBeInTheDocument()
        })

        const addBtn = screen.getByText('+ Thêm')
        fireEvent.click(addBtn)

        // Should now have 3 goal inputs
        const inputs = screen.getAllByPlaceholderText(/Mục tiêu/)
        expect(inputs.length).toBe(3)
    })

    it('navigates months with arrow buttons', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(screen.getByText('Clarity')).toBeInTheDocument()
        })

        // Click previous month
        const prevBtn = screen.getByText('←')
        fireEvent.click(prevBtn)

        // Should trigger a new fetch
        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledTimes(3) // streak + initial plan + prev month plan
        })
    })

    it('fetches plan from API on mount', async () => {
        render(<ClarityClient />)

        await waitFor(() => {
            expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('/api/clarity?month='))
        })
    })
})
