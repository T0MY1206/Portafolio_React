import { useEffect, useRef } from 'react'

const VISITS_API = import.meta.env.VITE_VISITS_API_URL as string | undefined

/**
 * Envía una vez por sesión datos de la visita al backend (si está configurado).
 * Los datos se guardan en visits.log en el servidor.
 */
export function useVisitLog() {
  const sent = useRef(false)

  useEffect(() => {
    const apiUrl = VISITS_API
    if (!apiUrl || sent.current) return
    sent.current = true

    const payload = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: Array.isArray(navigator.languages) ? navigator.languages.join(',') : '',
      platform: navigator.platform,
      screenWidth: window.screen?.width,
      screenHeight: window.screen?.height,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? ''
    }

    const base = apiUrl.replace(/\/$/, '')
    fetch(`${base}/api/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => { /* silenciar si el servidor no está */ })
  }, [])
}
