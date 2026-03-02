import { useState, useEffect } from 'react'

/** Provides current theme (light/dark), persisted in localStorage and synced to document. */
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved as 'light' | 'dark'
    const envDefault = import.meta.env.VITE_DEFAULT_THEME
    if (envDefault === 'light' || envDefault === 'dark') return envDefault
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, toggleTheme }
}

