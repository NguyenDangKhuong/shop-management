import { render, screen } from '@testing-library/react'
import TermsOfService from '@/app/terms/page'

describe('TermsOfService Page', () => {
    it('renders the terms of service heading', () => {
        render(<TermsOfService />)

        const heading = screen.getByRole('heading', { name: /terms of service/i, level: 1 })
        expect(heading).toBeInTheDocument()
    })

    it('displays the last updated date', () => {
        render(<TermsOfService />)

        expect(screen.getByText(/last updated:/i)).toBeInTheDocument()
        expect(screen.getByText(/december 27, 2024/i)).toBeInTheDocument()
    })

    it('shows all major terms sections', () => {
        render(<TermsOfService />)

        // Check for all 12 major sections
        expect(screen.getByRole('heading', { name: /1\. acceptance of terms/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /2\. description of service/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /3\. user accounts/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /4\. tiktok integration/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /5\. user content/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /6\. prohibited conduct/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /7\. intellectual property/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /8\. termination/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /9\. disclaimer of warranties/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /10\. limitation of liability/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /11\. changes to terms/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /12\. contact information/i })).toBeInTheDocument()
    })

    it('contains contact information', () => {
        render(<TermsOfService />)

        expect(screen.getByText(/nguyendangkhuong96@gmail\.com/i)).toBeInTheDocument()
        expect(screen.getByText(/https:\/\/shop\.thetaphoa\.com/i)).toBeInTheDocument()
    })

    it('mentions TikTok integration terms', () => {
        render(<TermsOfService />)

        // TikTok integration appears multiple times (heading and paragraph)
        expect(screen.getAllByText(/tiktok integration/i).length).toBeGreaterThan(0)
        expect(screen.getByText(/comply with tiktok's terms of service/i)).toBeInTheDocument()
    })

    it('shows copyright notice', () => {
        render(<TermsOfService />)

        expect(screen.getByText(/© 2024 thetaphoa\. all rights reserved\./i)).toBeInTheDocument()
    })

    it('displays user responsibilities', () => {
        render(<TermsOfService />)

        expect(screen.getByText(/provide accurate, current, and complete information/i)).toBeInTheDocument()
        expect(screen.getByText(/maintain the security of your password/i)).toBeInTheDocument()
    })

    it('has proper page structure with sections', () => {
        const { container } = render(<TermsOfService />)

        const sections = container.querySelectorAll('section')
        expect(sections.length).toBeGreaterThanOrEqual(12)
    })
})
