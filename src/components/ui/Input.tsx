import React, { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    error?: boolean
    onRightIconClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ leftIcon, rightIcon, error = false, className = '', onRightIconClick, ...props }, ref) => {
        const baseStyles = 'w-full bg-transparent border rounded-xl py-3.5 text-white placeholder-gray-500 outline-none transition-all duration-300'

        const borderStyles = error
            ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px] focus:shadow-red-500/30'
            : 'border-glass-border focus:border-primary focus:shadow-[0_0_15px] focus:shadow-primary/30'

        const paddingStyles = `${leftIcon ? 'pl-12' : 'pl-4'} ${rightIcon ? 'pr-12' : 'pr-4'}`

        const combinedClassName = `${baseStyles} ${borderStyles} ${paddingStyles} ${className}`.trim()

        return (
            <div className="group relative">
                {leftIcon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors duration-300">
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    className={combinedClassName}
                    {...props}
                />

                {rightIcon && (
                    <button
                        type="button"
                        onClick={onRightIconClick}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors duration-300"
                    >
                        {rightIcon}
                    </button>
                )}
            </div>
        )
    }
)

Input.displayName = 'Input'

export default Input
