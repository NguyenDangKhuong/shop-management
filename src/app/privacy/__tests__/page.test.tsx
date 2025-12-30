import { render, screen } from '@testing-library/react'
import PrivacyPolicy from '@/app/privacy/page'

describe('PrivacyPolicy Page', () => {
    it('renders the privacy policy heading', () => {
        render(<PrivacyPolicy />)

        const heading = screen.getByRole('heading', { name: /privacy policy/i, level: 1 })
        expect(heading).toBeInTheDocument()
    })

    it('displays the last updated date', () => {
        render(<PrivacyPolicy />)

        expect(screen.getByText(/last updated:/i)).toBeInTheDocument()
        expect(screen.getByText(/december 27, 2024/i)).toBeInTheDocument()
    })

    it('shows all major policy sections', () => {
        render(<PrivacyPolicy />)

        // Check for all 14 major sections
        expect(screen.getByRole('heading', { name: /1\. introduction/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /2\. information we collect/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /3\. how we use your information/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /4\. how we share your information/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /5\. tiktok data usage and permissions/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /6\. data security/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /7\. data retention/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /8\. your privacy rights/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /9\. cookies and tracking technologies/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /10\. third-party services/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /11\. children's privacy/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /12\. international data transfers/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /13\. changes to this privacy policy/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /14\. contact us/i })).toBeInTheDocument()
    })

    it('contains contact information', () => {
        render(<PrivacyPolicy />)

        // Email appears twice (Email and Support Email)
        expect(screen.getAllByText(/nguyendangkhuong96@gmail\.com/i).length).toBeGreaterThan(0)
        expect(screen.getByText(/https:\/\/shop\.thetaphoa\.com/i)).toBeInTheDocument()
    })

    it('displays TikTok integration information', () => {
        render(<PrivacyPolicy />)

        expect(screen.getByText(/tiktok integration data/i)).toBeInTheDocument()
        expect(screen.getByText(/tiktok account information/i)).toBeInTheDocument()
    })

    it('shows copyright notice', () => {
        render(<PrivacyPolicy />)

        expect(screen.getByText(/© 2024 thetaphoa\. all rights reserved\./i)).toBeInTheDocument()
    })

    it('has proper page structure with sections', () => {
        const { container } = render(<PrivacyPolicy />)

        const sections = container.querySelectorAll('section')
        expect(sections.length).toBeGreaterThan(10)
    })
})
