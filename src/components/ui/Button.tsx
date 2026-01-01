import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import LoadingSpinner from './LoadingSpinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    loading?: boolean
    fullWidth?: boolean
    variant?: 'gradient' | 'outline' | 'ghost'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, loading = false, fullWidth = false, variant = 'gradient', className = '', disabled, ...props }, ref) => {
        const baseStyles = 'py-3.5 rounded-xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

        const variantStyles = {
            gradient: 'bg-gradient-to-r from-[#00e5ff] to-[#b927fc] text-white shadow-lg shadow-[#00e5ff]/30 hover:scale-[1.02] hover:shadow-[#b927fc]/50 active:scale-[0.98]',
            outline: 'border-2 border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10',
            ghost: 'text-[#00e5ff] hover:bg-[#00e5ff]/10'
        }

        const widthStyles = fullWidth ? 'w-full' : ''

        const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`.trim()

        return (
            <button
                ref={ref}
                className={combinedClassName}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <LoadingSpinner />
                        {children}
                    </span>
                ) : (
                    children
                )}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
