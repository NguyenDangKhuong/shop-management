import { render, screen } from '@testing-library/react'
import { ScrollReveal } from '../ScrollReveal'

describe('ScrollReveal Component', () => {
    it('renders without crashing', () => {
        render(
            <ScrollReveal>
                <div>Test Content</div>
            </ScrollReveal>
        )
    })

    it('renders children correctly', () => {
        render(
            <ScrollReveal>
                <div data-testid="child-element">Revealed Content</div>
            </ScrollReveal>
        )
        expect(screen.getByTestId('child-element')).toBeInTheDocument()
        expect(screen.getByText('Revealed Content')).toBeInTheDocument()
    })
})
