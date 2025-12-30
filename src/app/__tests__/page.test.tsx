import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

// Mock the LandingPage component
jest.mock('@/components/landing/LandingPage', () => {
    return function MockLandingPage() {
        return <div data-testid="landing-page">Landing Page Component</div>
    }
})

describe('HomePage', () => {
    it('renders the LandingPage component', () => {
        render(<HomePage />)

        const landingPage = screen.getByTestId('landing-page')
        expect(landingPage).toBeInTheDocument()
    })

    it('displays without errors', () => {
        expect(() => render(<HomePage />)).not.toThrow()
    })
})
