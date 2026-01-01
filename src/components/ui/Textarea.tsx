import React, { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    showCharCount?: boolean
    error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ showCharCount = false, error = false, className = '', value, maxLength, ...props }, ref) => {
        const baseStyles = 'w-full bg-transparent border rounded-xl py-4 px-4 text-white placeholder-gray-500 outline-none transition-all duration-300 resize-none'

        const borderStyles = error
            ? 'border-red-500/50 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.3)]'
            : 'border-[rgba(255,255,255,0.08)] focus:border-[#00e5ff] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)]'

        const combinedClassName = `${baseStyles} ${borderStyles} ${className}`.trim()

        const charCount = typeof value === 'string' ? value.length : 0

        return (
            <div className="group relative">
                <textarea
                    ref={ref}
                    className={combinedClassName}
                    value={value}
                    maxLength={maxLength}
                    {...props}
                />

                {showCharCount && (
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {charCount}{maxLength ? ` / ${maxLength}` : ''} characters
                    </div>
                )}
            </div>
        )
    }
)

Textarea.displayName = 'Textarea'

export default Textarea
