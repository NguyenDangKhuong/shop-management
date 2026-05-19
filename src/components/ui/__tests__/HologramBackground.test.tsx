import { render, act } from '@testing-library/react'
import HologramBackground from '@/components/ui/HologramBackground'

// Mock react-three-fiber to avoid WebGL context errors in JSDOM
jest.mock('@react-three/fiber', () => {
    const React = require('react')
    return {
        Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-canvas">{children}</div>,
        useFrame: jest.fn(),
    }
})

jest.mock('@react-three/drei', () => ({
    Stars: () => <div data-testid="mock-stars" />,
    Html: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-html">{children}</div>,
    Line: () => <div data-testid="mock-line" />,
}))

describe('HologramBackground Component', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(<HologramBackground />)
        expect(getByTestId('mock-canvas')).toBeInTheDocument()
        expect(getByTestId('mock-stars')).toBeInTheDocument()
    })

    // FocusHUD is inside WireframeBattlecruiser. It listens to window events.
    it('listens to setHoveredSection events', () => {
        const { queryByText, rerender } = render(<HologramBackground />)
        
        // Initially no target is hovered
        expect(queryByText(/TARGET : YAMATO_CANNON/i)).not.toBeInTheDocument()

        // Dispatch hover event for hero
        act(() => {
            window.dispatchEvent(new CustomEvent('setHoveredSection', { detail: 'hero' }))
        })
        
        // FocusHUD should now render the Html label for hero
        expect(queryByText(/TARGET : YAMATO_CANNON/i)).toBeInTheDocument()

        // Dispatch leave event
        act(() => {
            window.dispatchEvent(new CustomEvent('setHoveredSection', { detail: null }))
        })
        expect(queryByText(/TARGET : YAMATO_CANNON/i)).not.toBeInTheDocument()
    })
})
