'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Editor from '@monaco-editor/react'
import { Play, RotateCcw, Trash2, Code, Terminal, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import CyberCard from '@/components/ui/CyberCard'
import { DecryptText } from '@/components/ui/DecryptText'
import TechBadge from '@/components/ui/TechBadge'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import Button from '@/components/ui/Button'
import { useThemeMode } from '@/contexts/ThemeContext'
import { useSoundContext } from '@/contexts/SoundContext'

// --- Custom React Error Boundary for Sandbox ---
class SandboxErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: (error: Error) => React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Sandbox Render Crash:', error, errorInfo)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error)
    }
    return this.props.children
  }
}

// --- Console Log Item Structure ---
interface LogItem {
  type: 'log' | 'info' | 'warn' | 'error'
  timestamp: string
  messages: any[]
}

// --- Presets Data ---
const PRESETS = {
  ts: [
    {
      id: 'basic-logic',
      name: 'Basic Logic & Loops',
      description: 'Test simple TypeScript calculations and array operations.',
      code: `// Define variables and custom interfaces
interface Developer {
  name: string;
  role: string;
  experience: number;
}

const devs: Developer[] = [
  { name: "Khuong", role: "Lead", experience: 8 },
  { name: "Alex", role: "Junior", experience: 2 },
  { name: "Yuki", role: "Senior", experience: 6 }
];

console.log("Analyzing developer experience...");
const experienced = devs.filter(d => d.experience >= 5);

console.log("Experienced devs count:", experienced.length);
console.log("Full list of experienced developers:");
console.log(experienced);
`
    },
    {
      id: 'fetch-api',
      name: 'Fetch Backend API',
      description: 'Asynchronously query the sandbox diagnostic server route.',
      code: `console.log("Initiating asynchronous diagnostic check...");

try {
  const response = await fetch('/api/test');
  
  if (!response.ok) {
    throw new Error(\`HTTP Error: \${response.status}\`);
  }
  
  const data = await response.json();
  console.log("✅ Request Success!");
  console.log("Server Message:", data.message);
  console.log("Quote of the day:", data.quote);
  console.log("Request details:", data.requestInfo);
} catch (error) {
  console.error("❌ Failed to query API:", error.message);
}
`
    },
    {
      id: 'async-timeout',
      name: 'Async Promise Test',
      description: 'Simulate async workflows with delays and timers.',
      code: `console.log("Timer started. Setting timeouts...");

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

console.log("Waiting 1 second...");
await delay(1000);
console.warn("⚠️ 1 second passed. Executing step 2...");

console.log("Waiting another 500ms...");
await delay(500);
console.log("🎉 Complete! Async sequence executed correctly.");
`
    }
  ],
  react: [
    {
      id: 'interactive-counter',
      name: 'Animated Counter Card',
      description: 'Uses Framer Motion and local components (CyberCard, TechBadge).',
      code: `return function CounterDemo() {
  const [count, setCount] = React.useState(0);
  
  return (
    <CyberCard glowColor="cyan" className="p-6 text-center max-w-sm mx-auto">
      <h3 className="text-xl font-bold text-text-primary mb-3">
        <DecryptText text="REACT PLAYGROUND" />
      </h3>
      <p className="text-text-secondary text-sm mb-6">
        Test local UI primitives and hooks loaded dynamically.
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount(c => c + 1)}
          className="px-6 py-2.5 bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)] rounded-lg font-bold text-sm text-white shadow-lg shadow-[var(--neon-cyan)]/20"
        >
          ⚡ Click Count: {count}
        </motion.button>
        
        <div className="flex gap-2">
          <TechBadge label={\`Count: \${count}\`} color="var(--neon-cyan)" />
          <TechBadge label="Active Sandbox" color="var(--neon-purple)" />
        </div>
      </div>
    </CyberCard>
  );
}`
    },
    {
      id: 'button-showcase',
      name: 'Button Showcase',
      description: 'Render and interact with system button styles.',
      code: `return function ButtonShowcase() {
  const [loading, setLoading] = React.useState(false);
  
  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <div className="flex flex-col gap-4 max-w-xs mx-auto p-4 border border-border-dim rounded-xl bg-bg-card/40">
      <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider text-center mb-2">
        System Buttons
      </h4>
      <Button variant="gradient" loading={loading} onClick={triggerLoading}>
        {loading ? "Simulating..." : "Gradient Variant"}
      </Button>
      <Button variant="outline" onClick={() => console.log("Outline Clicked!")}>
        Outline Variant
      </Button>
      <Button variant="ghost" onClick={() => console.log("Ghost Clicked!")}>
        Ghost Variant
      </Button>
    </div>
  );
}`
    },
    {
      id: 'decrypt-config',
      name: 'Decrypt Configurator',
      description: 'Control state variables dynamically to trigger text decrypt effects.',
      code: `return function DecryptConfig() {
  const [inputText, setInputText] = React.useState("CYBERPUNK SANDBOX");
  const [refreshKey, setRefreshKey] = React.useState(0);
  
  return (
    <CyberCard glowColor="green" className="p-6 max-w-sm mx-auto">
      <h3 className="text-lg font-bold text-text-primary mb-4 text-center">
        Decrypt Custom Text
      </h3>
      
      <div className="flex flex-col gap-4">
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full px-3 py-2 bg-bg-input border border-border-input rounded-lg text-text-primary text-sm focus:outline-none focus:border-[var(--neon-green)] font-mono"
          placeholder="Enter text..."
        />
        
        <Button 
          variant="outline" 
          className="!py-2 !text-sm"
          onClick={() => setRefreshKey(k => k + 1)}
        >
          Re-trigger Animation
        </Button>
        
        <div className="p-4 bg-bg-surface-dim/80 border border-border-dim rounded-lg text-center font-mono text-lg text-[var(--neon-green)] min-h-[56px] flex items-center justify-center">
          <DecryptText key={refreshKey} text={inputText} />
        </div>
      </div>
    </CyberCard>
  );
}`
    }
  ]
}

export default function CodeSandboxPage() {
  const { isDarkMode } = useThemeMode()
  const { playClick } = useSoundContext()

  const [mode, setMode] = useState<'react' | 'ts'>('ts')
  const [code, setCode] = useState(PRESETS.ts[0].code)
  const [logs, setLogs] = useState<LogItem[]>([])
  const [isBabelLoaded, setIsBabelLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // React Live Preview component
  const [ActiveComponent, setActiveComponent] = useState<React.ComponentType | null>(null)
  const [componentError, setComponentError] = useState<string | null>(null)

  const consoleEndRef = useRef<HTMLDivElement>(null)

  // --- Dynamic Babel Load ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).Babel) {
        setIsBabelLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.12/babel.min.js'
      script.async = true
      script.onload = () => {
        setIsBabelLoaded(true)
      }
      script.onerror = () => {
        console.error('Failed to load Babel standalone CDN.')
      }
      document.body.appendChild(script)
    }
  }, [])

  // --- Sync console scroll ---
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  // --- Switch Mode and Load Template ---
  const handleModeChange = (newMode: 'react' | 'ts') => {
    playClick()
    setMode(newMode)
    setCode(PRESETS[newMode][0].code)
    setLogs([])
    setActiveComponent(null)
    setComponentError(null)
  }

  const handleSelectPreset = (presetCode: string) => {
    playClick()
    setCode(presetCode)
    setActiveComponent(null)
    setComponentError(null)
  }

  const clearConsoleLogs = () => {
    playClick()
    setLogs([])
  }

  // --- Execute Code Logic ---
  const handleRunCode = async () => {
    playClick()
    setIsLoading(true)
    setComponentError(null)

    const capturedLogs: LogItem[] = []
    
    // Custom log capturing handler
    const makeCapture = (type: 'log' | 'info' | 'warn' | 'error') => (...args: any[]) => {
      const serialized = args.map(arg => {
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2)
          } catch {
            return String(arg)
          }
        }
        return String(arg)
      })
      capturedLogs.push({
        type,
        timestamp: new Date().toLocaleTimeString(),
        messages: serialized
      })
    }

    const customConsole = {
      log: makeCapture('log'),
      info: makeCapture('info'),
      warn: makeCapture('warn'),
      error: makeCapture('error')
    }

    try {
      if (typeof window === 'undefined' || !(window as any).Babel) {
        throw new Error('Babel compiler is still loading from CDN. Please wait.')
      }

      // Transpile TypeScript + JSX to JavaScript
      const transpiled = (window as any).Babel.transform(code, {
        presets: ['react', ['typescript', { isTSX: true, allExtensions: true }]],
        filename: 'sandbox.tsx'
      }).code

      if (mode === 'ts') {
        // Pure JS execution (wrapped in async to allow top-level awaits)
        const execFn = new Function(
          'console',
          'React',
          'motion',
          'CyberCard',
          'DecryptText',
          'TechBadge',
          'LoadingSpinner',
          'Button',
          `return (async () => {
            ${transpiled}
          })()`
        )

        await execFn(customConsole, React, motion, CyberCard, DecryptText, TechBadge, LoadingSpinner, Button)
        setActiveComponent(null)
      } else {
        // React Component mode
        const evalFn = new Function(
          'console',
          'React',
          'motion',
          'CyberCard',
          'DecryptText',
          'TechBadge',
          'LoadingSpinner',
          'Button',
          transpiled
        )

        const result = evalFn(customConsole, React, motion, CyberCard, DecryptText, TechBadge, LoadingSpinner, Button)

        let ComponentToMount: React.ComponentType
        if (typeof result === 'function') {
          ComponentToMount = result
        } else if (React.isValidElement(result)) {
          ComponentToMount = () => result
        } else {
          throw new Error('Your React code must return a React Element (e.g. <div>Hello</div>) or a Component function (e.g. return function App() { ... })')
        }

        setActiveComponent(() => ComponentToMount)
      }
    } catch (err: any) {
      customConsole.error(err.message || 'Error occurred during compilation/execution.')
      if (mode === 'react') {
        setComponentError(err.message || 'Error executing component code.')
        setActiveComponent(null)
      }
    } finally {
      setLogs(prev => [...prev, ...capturedLogs])
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--space-bg)] text-text-primary flex flex-col font-sans relative transition-colors duration-300">
      {/* Background Decorative Line Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15" style={{ backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Header bar */}
      <header className="border-b border-border-dim px-4 py-3 flex items-center justify-between relative z-10 backdrop-blur-md bg-bg-header/40">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center justify-center w-8 h-8 rounded-lg border border-border-dim hover:border-border-primary transition-all text-text-secondary hover:text-text-primary" onClick={playClick}>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-[1px] bg-border-dim" />
          <h1 className="text-md font-bold uppercase tracking-wider flex items-center gap-2">
            <span className="text-[var(--neon-cyan)] animate-pulse">🛠️</span>
            <DecryptText text="CODE SANDBOX LAB" />
          </h1>
        </div>

        {/* Global info metrics */}
        <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-green)] animate-ping" />
            <span>CDN status:</span>
            <span className={isBabelLoaded ? 'text-[var(--neon-green)] font-bold' : 'text-amber-500 font-bold'}>
              {isBabelLoaded ? 'Babel Ready' : 'Loading Babel...'}
            </span>
          </div>
          <div className="h-3 w-[1px] bg-border-dim hidden sm:block" />
          <div>Theme: <span className="text-text-primary font-bold">{isDarkMode ? 'Dark Space' : 'Light Matrix'}</span></div>
        </div>
      </header>

      {/* Main workspace container */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-4 p-4 relative z-10">
        
        {/* LEFT COLUMN: Controls & Editor (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-3 min-h-[500px]">
          
          {/* Mode Switching and Presets Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border-dim bg-bg-card/45 backdrop-blur-sm">
            
            {/* Option toggles */}
            <div className="flex gap-2">
              <button
                onClick={() => handleModeChange('ts')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                  mode === 'ts'
                    ? 'border-[var(--neon-cyan)] bg-[var(--neon-cyan)]/15 text-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)]/20'
                    : 'border-border-dim text-text-secondary hover:border-border-primary hover:text-text-primary'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Pure TS / JS
              </button>
              <button
                onClick={() => handleModeChange('react')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                  mode === 'react'
                    ? 'border-[var(--neon-purple)] bg-[var(--neon-purple)]/15 text-[var(--neon-purple)] shadow-[0_0_10px_var(--neon-purple)]/20'
                    : 'border-border-dim text-text-secondary hover:border-border-primary hover:text-text-primary'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                React JSX
              </button>
            </div>

            {/* Presets dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Presets:</span>
              <div className="flex gap-1.5">
                {PRESETS[mode].map((preset, i) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.code)}
                    className="px-2 py-1 rounded bg-bg-tag border border-border-dim text-[10px] font-bold text-text-secondary hover:text-text-primary hover:border-border-primary transition-all"
                    title={preset.description}
                  >
                    #{i + 1} {preset.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 rounded-xl border border-border-primary overflow-hidden relative shadow-lg bg-[#1e1e1e] min-h-[350px]">
            {/* Custom status overlay bar in editor */}
            <div className="absolute top-0 right-0 z-20 flex gap-2 p-2">
              <span className="px-2 py-0.5 rounded bg-bg-card/70 border border-border-dim text-[9px] font-mono font-bold text-text-muted uppercase">
                {mode === 'react' ? 'TypeScript TSX' : 'TypeScript JS'}
              </span>
            </div>
            
            <Editor
              height="100%"
              language={mode === 'react' ? 'typescript' : 'typescript'}
              theme={isDarkMode ? 'vs-dark' : 'light'}
              value={code}
              onChange={(val) => setCode(val || '')}
              loading={<div className="h-full flex items-center justify-center gap-2 bg-[#1e1e1e] text-text-secondary"><LoadingSpinner /> Loading Editor...</div>}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                readOnly: false,
                cursorBlinking: 'blink',
                fontFamily: 'var(--font-inter), monospace',
                padding: { top: 16, bottom: 16 }
              }}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center p-3 rounded-xl border border-border-dim bg-bg-card/45">
            <div className="text-[10px] font-mono text-text-muted">
              Press Run to compile & execute locally.
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="!py-2 !px-4 !text-xs flex items-center gap-1.5 border-red-500/30 text-red-500 hover:bg-red-500/10"
                onClick={() => handleSelectPreset(PRESETS[mode][0].code)}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Code
              </Button>
              <Button
                variant="gradient"
                className="!py-2 !px-5 !text-xs flex items-center gap-1.5"
                onClick={handleRunCode}
                loading={isLoading}
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Code
              </Button>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Live Preview & CRT Console Output (5 cols) */}
        <div className="xl:col-span-5 flex flex-col gap-3 min-h-[500px]">
          
          {/* Top segment: React Live Preview Pane (only shown when in React Mode) */}
          {mode === 'react' && (
            <div className="flex-1 flex flex-col rounded-xl border border-border-primary overflow-hidden bg-bg-card/30 shadow-lg min-h-[220px]">
              <div className="px-4 py-2 border-b border-border-dim bg-bg-surface-dim/70 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-text-secondary">
                <Eye className="w-3.5 h-3.5 text-[var(--neon-purple)]" />
                React Live Preview
              </div>

              <div className="flex-1 p-6 flex items-center justify-center overflow-auto relative">
                <SandboxErrorBoundary
                  key={ActiveComponent ? ActiveComponent.toString() : 'empty'}
                  fallback={(error) => (
                    <div className="w-full p-4 border border-red-500/20 bg-red-500/5 rounded-lg text-red-500 text-xs font-mono">
                      <div className="font-bold mb-1">💥 Render-Time Exception:</div>
                      {error.message}
                      <div className="text-[10px] text-red-400/80 mt-2">Check console outputs for stack traces.</div>
                    </div>
                  )}
                >
                  {componentError ? (
                    <div className="w-full p-4 border border-red-500/20 bg-red-500/5 rounded-lg text-red-500 text-xs font-mono">
                      <div className="font-bold mb-1">💥 Compile/Eval Error:</div>
                      {componentError}
                    </div>
                  ) : ActiveComponent ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <ActiveComponent />
                    </div>
                  ) : (
                    <div className="text-xs text-text-muted italic flex flex-col items-center gap-2">
                      <Code className="w-8 h-8 opacity-40 animate-pulse text-[var(--neon-purple)]" />
                      No active component. Click "Run Code" to compile & mount.
                    </div>
                  )}
                </SandboxErrorBoundary>
              </div>
            </div>
          )}

          {/* Bottom segment: Cyberpunk Retro CRT Console log display */}
          <div className="flex-[1.5] flex flex-col rounded-xl border border-border-primary overflow-hidden bg-black/95 shadow-xl relative min-h-[280px]">
            {/* Terminal Glow Line on top */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-85" />
            
            {/* CRT monitor curvature grid line effect */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))]" style={{ backgroundSize: '100% 4px, 6px 100%' }} />

            {/* Title / Toolbar */}
            <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between text-xs font-mono text-zinc-400 relative z-20">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[var(--neon-cyan)]" />
                <span className="font-bold tracking-wider text-shadow-glow">SYSTEM LOG TERMINAL</span>
              </div>
              <button
                onClick={clearConsoleLogs}
                disabled={logs.length === 0}
                className="flex items-center gap-1 px-2 py-0.5 rounded border border-white/10 hover:border-white/20 hover:bg-white/5 text-[10px] text-zinc-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            </div>

            {/* Logs render container */}
            <div className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-3 scrollbar-thin relative z-20">
              {logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-2 select-none italic text-center p-4">
                  <Terminal className="w-6 h-6 opacity-30 animate-pulse text-[var(--neon-cyan)]" />
                  <span>Terminal idle. Logs will display here.</span>
                </div>
              ) : (
                logs.map((log, index) => {
                  let colorClass = 'text-green-400'
                  let label = 'LOG'

                  if (log.type === 'warn') {
                    colorClass = 'text-amber-400'
                    label = 'WRN'
                  } else if (log.type === 'error') {
                    colorClass = 'text-red-400'
                    label = 'ERR'
                  } else if (log.type === 'info') {
                    colorClass = 'text-sky-400'
                    label = 'INF'
                  }

                  return (
                    <div key={index} className="flex flex-col gap-1 border-b border-white/5 pb-2 last:border-0">
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <span className={`px-1.5 py-0.5 rounded bg-white/5 font-bold ${colorClass}`}>
                          {label}
                        </span>
                        <span>{log.timestamp}</span>
                      </div>
                      
                      <div className="pl-2 space-y-1">
                        {log.messages.map((msg, i) => (
                          <pre key={i} className={`whitespace-pre-wrap font-mono break-all leading-relaxed ${colorClass}`}>
                            {msg}
                          </pre>
                        ))}
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={consoleEndRef} />
            </div>

            {/* Scan line animated effect */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-scanlines animate-scanline opacity-[0.03]" />
          </div>

        </div>

      </main>

      {/* Styled JSX for scanline CRT animations */}
      <style jsx global>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .bg-scanlines {
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0, 240, 255, 0.4) 50%,
            rgba(0, 240, 255, 0.4)
          );
          background-size: 100% 4px;
        }
        .animate-scanline {
          animation: scanline 12s linear infinite;
        }
        .text-shadow-glow {
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.5);
        }
      `}</style>
    </div>
  )
}
