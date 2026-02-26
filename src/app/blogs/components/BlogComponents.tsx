import React from 'react';

export const CodeBlock = ({ children, title }: { children: string; title?: string }) => (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
        {title && (
            <div className="bg-gray-100 dark:bg-slate-800/80 px-4 py-2 text-xs text-gray-500 dark:text-slate-400 border-b border-gray-200 dark:border-white/10 font-mono">
                {title}
            </div>
        )}
        <pre className="bg-gray-50 dark:bg-slate-900/80 p-4 overflow-x-auto text-sm leading-relaxed">
            <code className="text-gray-800 dark:text-slate-300 font-mono">{children}</code>
        </pre>
    </div>
)

export const Heading2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 flex items-center gap-2">
        {children}
    </h2>
)

export const Heading3 = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-[#9333ea] dark:text-[#c084fc] mt-8 mb-3">
        {children}
    </h3>
)

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">{children}</p>
)

export const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#0284c7] dark:text-[#38bdf8] font-semibold">{children}</span>
)

export const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 dark:bg-slate-800/80 text-[#d97706] dark:text-[#fbbf24] px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200 dark:border-white/10">
        {children}
    </code>
)

export const Callout = ({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
    const styles = {
        tip: 'border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400',
        warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400',
        info: 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400',
    }
    const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' }
    return (
        <div className={`my-6 p-4 rounded-xl border ${styles[type]}`}>
            <span className="mr-2">{icons[type]}</span>
            <span className="text-gray-700 dark:text-slate-300">{children}</span>
        </div>
    )
}
