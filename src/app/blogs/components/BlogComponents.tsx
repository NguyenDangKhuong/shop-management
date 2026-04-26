import React from 'react';

// Extract text from ReactNode and generate a URL-safe slug
function textToSlug(children: React.ReactNode): string {
    const text = extractText(children)
    return text
        .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '') // strip emojis
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

function extractText(node: React.ReactNode): string {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (React.isValidElement(node) && node.props) {
        return extractText((node.props as { children?: React.ReactNode }).children)
    }
    return ''
}

export const CodeBlock = ({ children, title }: { children: string; title?: string }) => (
    <div className="my-6 rounded-xl overflow-hidden border border-border-primary">
        {title && (
            <div className="bg-bg-tag px-4 py-2 text-xs text-text-secondary border-b border-border-primary font-mono">
                {title}
            </div>
        )}
        <pre className="bg-bg-surface-dim p-4 overflow-x-auto text-sm leading-relaxed">
            <code className="text-text-primary font-mono">{children}</code>
        </pre>
    </div>
)

export const Heading2 = ({ children }: { children: React.ReactNode }) => {
    const id = textToSlug(children)
    return (
        <h2 id={id} className="text-2xl font-bold text-text-primary mt-10 mb-4 flex items-center gap-2 scroll-mt-8">
            {children}
        </h2>
    )
}

export const Heading3 = ({ children }: { children: React.ReactNode }) => {
    const id = textToSlug(children)
    return (
        <h3 id={id} className="text-xl font-semibold text-[#c084fc] mt-8 mb-3 scroll-mt-8">
            {children}
        </h3>
    )
}

export const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-text-primary leading-relaxed mb-4">{children}</p>
)

export const Highlight = ({ children }: { children: React.ReactNode }) => (
    <span className="text-[#38bdf8] font-semibold">{children}</span>
)

export const InlineCode = ({ children }: { children: React.ReactNode }) => (
    <code className="bg-bg-tag text-[#fbbf24] px-1.5 py-0.5 rounded text-sm font-mono border border-border-primary">
        {children}
    </code>
)

export const Callout = ({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
    const styles = {
        tip: 'border-green-500/30 bg-green-500/5 text-green-500',
        warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500',
        info: 'border-blue-500/30 bg-blue-500/5 text-blue-500',
    }
    const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' }
    return (
        <div className={`my-6 p-4 rounded-xl border ${styles[type]}`}>
            <span className="mr-2">{icons[type]}</span>
            <span className="text-text-primary">{children}</span>
        </div>
    )
}
