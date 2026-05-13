import { render, screen, waitFor } from '@testing-library/react'
import { MotionHero } from '../MotionHero'

describe('MotionHero Component', () => {
    it('renders without crashing', () => {
        render(<MotionHero purposeText="landing.purpose" />)
    })

    it('displays the correct name and title', async () => {
        render(<MotionHero purposeText="landing.purpose" />)
        expect(screen.getByText(/Hello, I'm/i)).toBeInTheDocument()
        await waitFor(() => {
            expect(screen.getByText(/Khuong/i)).toBeInTheDocument()
        }, { timeout: 3000 })
        expect(screen.getByText(/Front-End Developer/i)).toBeInTheDocument()
    })

    it('renders CTA buttons', () => {
        render(<MotionHero purposeText="landing.purpose" />)
        expect(screen.getByRole('link', { name: /Side Projects/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Download CV/i })).toBeInTheDocument()
    })

    it('calculates years of experience correctly', () => {
        render(<MotionHero purposeText="landing.purpose" />)
        const yearsOfExperience = new Date().getFullYear() - 2018
        expect(screen.getByText(new RegExp(`${yearsOfExperience}\\+ Years`, 'i'))).toBeInTheDocument()
    })
})
