'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

interface RoadmapProgressContextType {
    learnedTopics: Set<string>
    toggleLearned: (title: string) => void
    isLoggedIn: boolean
    isLoading: boolean
}

const RoadmapProgressContext = createContext<RoadmapProgressContextType>({
    learnedTopics: new Set(),
    toggleLearned: () => {},
    isLoggedIn: false,
    isLoading: true,
})

export function useRoadmapProgress() {
    return useContext(RoadmapProgressContext)
}

export function RoadmapProgressProvider({ children }: { children: React.ReactNode }) {
    const [learnedTopics, setLearnedTopics] = useState<Set<string>>(new Set())
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Try to fetch from API first. If 401 → not logged in → fallback to localStorage
    useEffect(() => {
        fetch('/api/roadmap/progress')
            .then(res => {
                if (res.status === 401) {
                    setIsLoggedIn(false)
                    loadFromLocalStorage()
                    return null
                }
                setIsLoggedIn(true)
                return res.json()
            })
            .then(data => {
                if (data) {
                    setLearnedTopics(new Set(data.learnedTopics || []))
                }
                setIsLoading(false)
            })
            .catch(() => {
                loadFromLocalStorage()
                setIsLoading(false)
            })
    }, [])

    const loadFromLocalStorage = () => {
        const topics = new Set<string>()
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            if (key?.startsWith('roadmap-learned-') && localStorage.getItem(key) === 'true') {
                topics.add(key.replace('roadmap-learned-', ''))
            }
        }
        setLearnedTopics(topics)
    }

    const toggleLearned = useCallback((title: string) => {
        setLearnedTopics(prev => {
            const next = new Set(prev)
            const newState = !next.has(title)

            if (newState) {
                next.add(title)
            } else {
                next.delete(title)
            }

            // Persist to API if logged in
            if (isLoggedIn) {
                fetch('/api/roadmap/progress', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title, learned: newState }),
                }).catch(console.error)
            }

            // Always sync localStorage as backup
            localStorage.setItem(`roadmap-learned-${title}`, String(newState))

            return next
        })
    }, [isLoggedIn])

    return (
        <RoadmapProgressContext.Provider value={{ learnedTopics, toggleLearned, isLoggedIn, isLoading }}>
            {children}
        </RoadmapProgressContext.Provider>
    )
}
