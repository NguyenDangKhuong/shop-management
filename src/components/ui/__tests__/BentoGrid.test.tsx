import { render, screen } from '@testing-library/react'
import { BentoGrid } from '../BentoGrid'

describe('BentoGrid Component', () => {
    it('renders without crashing', () => {
        render(<BentoGrid />)
    })

    it('displays all feature cards', () => {
        render(<BentoGrid />)
        expect(screen.getByText(/Modern Architecture/i)).toBeInTheDocument()
        expect(screen.getByText(/Cinematic UI/i)).toBeInTheDocument()
        expect(screen.getByText(/High Performance/i)).toBeInTheDocument()
        expect(screen.getByText(/Fullstack Ready/i)).toBeInTheDocument()
    })

    it('displays descriptions for features', () => {
        render(<BentoGrid />)
        expect(screen.getByText(/100 Lighthouse score/i)).toBeInTheDocument()
        expect(screen.getByText(/Next\.js 15 App Router/i)).toBeInTheDocument()
    })
})
