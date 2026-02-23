import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import './Mascot.css'

const pathToSection: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/experience': 'experience',
  '/skills': 'skills',
  '/projects': 'projects',
  '/contact': 'contact',
}

const SELECTORS = [
  '.page-title',
  '.about-summary',
  '.experience-item',
  '.project-card',
  '.contact-form',
  '.contact-info',
  '.project-tags',
]

const ACTIONS = ['hide', 'move'] as const

const MIN_ACTION_DELAY_MS = 4000
const MAX_ACTION_DELAY_MS = 10000
const MOVE_DURATION_MS = 2500
const RESTORE_AFTER_MS = 2800

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getComments(t: (k: string) => string, key: string): string[] {
  const raw = t(key)
  return raw.includes('|') ? raw.split('|').map((s) => s.trim()).filter(Boolean) : [raw].filter(Boolean)
}

export default function Mascot() {
  const { t } = useLanguage()
  const location = useLocation()
  const section = pathToSection[location.pathname] ?? 'home'

  const [position, setPosition] = useState({ x: 15, y: 20 })
  const [comment, setComment] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)
  const [acting, setActing] = useState(false)
  const affectedRef = useRef<{ el: Element; action: string } | null>(null)
  const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moveToTargetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const commentClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const COMMENT_DURATION_MS = 5500

  const moveToRandom = useCallback(() => {
    const x = 5 + Math.random() * 90
    const y = 10 + Math.random() * 75
    setPosition({ x, y })
  }, [])

  const positionNearElement = useCallback((el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (Math.random() > 0.5 ? 1 : -1) * (60 + Math.random() * 50)
    let xPx = centerX + offsetX
    let yPx = centerY - 20
    const margin = 36
    xPx = Math.max(margin, Math.min(window.innerWidth - margin, xPx))
    yPx = Math.max(margin, Math.min(window.innerHeight - margin, yPx))
    const x = (xPx / window.innerWidth) * 100
    const y = (yPx / window.innerHeight) * 100
    setPosition({ x, y })
  }, [])

  const restoreAffected = useCallback(() => {
    if (affectedRef.current) {
      affectedRef.current.el.classList.remove('mascot-hidden', 'mascot-moved')
      affectedRef.current.el.removeAttribute('style')
      affectedRef.current = null
    }
    setActing(false)
  }, [])

  useEffect(() => {
    moveToRandom()
  }, [moveToRandom])

  useEffect(() => {
    const key = `mascot.${section}`
    const raw = t(key)
    if (raw === key) return
    const list = raw.includes('|') ? raw.split('|').map((s) => s.trim()).filter(Boolean) : [raw]
    const msg = list.length ? list[Math.floor(Math.random() * list.length)] : null
    if (!msg) return
    setComment(msg)
    const hide = setTimeout(() => setComment(null), COMMENT_DURATION_MS)
    return () => clearTimeout(hide)
  }, [section, position.x, position.y])

  useEffect(() => {
    restoreAffected()
    if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current)
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current)
    if (moveToTargetTimerRef.current) clearTimeout(moveToTargetTimerRef.current)
    if (commentClearRef.current) clearTimeout(commentClearRef.current)
    actionTimerRef.current = restoreTimerRef.current = moveToTargetTimerRef.current = commentClearRef.current = null

    function runNextAction() {
      const container = document.querySelector('.main-content-inner')
      if (!container) {
        scheduleNext()
        return
      }

      const candidates: Element[] = []
      SELECTORS.forEach((sel) => {
        try {
          container.querySelectorAll(sel).forEach((el) => candidates.push(el))
        } catch {
          // ignore
        }
      })

      if (candidates.length === 0) {
        scheduleNext()
        return
      }

      const el = pickRandom(candidates) as HTMLElement
      const action = pickRandom([...ACTIONS])
      positionNearElement(el)
      setActing(true)

      moveToTargetTimerRef.current = setTimeout(() => {
        moveToTargetTimerRef.current = null
        if (action === 'hide') {
          el.classList.add('mascot-hidden')
          affectedRef.current = { el, action }
          const msgs = getComments(t, 'mascot.hideComment')
          setComment(msgs.length ? pickRandom(msgs) : t('mascot.hideComment'))
        } else {
          const dx = (Math.random() - 0.5) * 80
          const dy = (Math.random() - 0.5) * 60
          el.style.setProperty('--mascot-dx', `${dx}px`)
          el.style.setProperty('--mascot-dy', `${dy}px`)
          el.classList.add('mascot-moved')
          affectedRef.current = { el, action }
          const msgs = getComments(t, 'mascot.moveComment')
          setComment(msgs.length ? pickRandom(msgs) : t('mascot.moveComment'))
        }
        if (commentClearRef.current) clearTimeout(commentClearRef.current)
        commentClearRef.current = setTimeout(() => setComment(null), COMMENT_DURATION_MS)

        restoreTimerRef.current = setTimeout(() => {
          restoreAffected()
          restoreTimerRef.current = null
          scheduleNext()
        }, RESTORE_AFTER_MS)
      }, MOVE_DURATION_MS)
    }

    function scheduleNext() {
      const delay = MIN_ACTION_DELAY_MS + Math.random() * (MAX_ACTION_DELAY_MS - MIN_ACTION_DELAY_MS)
      actionTimerRef.current = setTimeout(runNextAction, delay)
    }

    scheduleNext()

    return () => {
      if (actionTimerRef.current) clearTimeout(actionTimerRef.current)
      if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current)
      if (moveToTargetTimerRef.current) clearTimeout(moveToTargetTimerRef.current)
      if (commentClearRef.current) clearTimeout(commentClearRef.current)
      restoreAffected()
    }
  }, [section, positionNearElement, restoreAffected, t])

  if (!visible) return null

  return (
    <div
      className={`mascot${acting ? ' mascot-acting' : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      role="img"
      aria-label="Mascota del portfolio"
    >
      <button
        type="button"
        className="mascot-close"
        onClick={() => setVisible(false)}
        aria-label="Ocultar mascota"
      >
        ×
      </button>
      {comment && (
        <div className="mascot-bubble">
          <span>{comment}</span>
        </div>
      )}
      <div className="mascot-character">
        <svg viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mascot-pixel">
          {/* Cabeza */}
          <rect x="8" y="2" width="16" height="14" fill="var(--mascot-skin)" />
          <rect x="6" y="4" width="4" height="4" fill="var(--mascot-skin)" />
          <rect x="22" y="4" width="4" height="4" fill="var(--mascot-skin)" />
          {/* Ojos verdes */}
          <rect x="8" y="10" width="3" height="3" fill="var(--mascot-eyes)" />
          <rect x="21" y="10" width="3" height="3" fill="var(--mascot-eyes)" />
          {/* Lentes transparentes (más gruesos) */}
          <rect x="5" y="7" width="8" height="8" fill="rgba(255,255,255,0.12)" stroke="var(--mascot-glasses-frame)" strokeWidth="1.25" />
          <rect x="19" y="7" width="8" height="8" fill="rgba(255,255,255,0.12)" stroke="var(--mascot-glasses-frame)" strokeWidth="1.25" />
          <rect x="13" y="10" width="6" height="2" fill="var(--mascot-glasses-frame)" />
          {/* Torso */}
          <rect x="6" y="16" width="20" height="10" fill="var(--mascot-shirt)" />
          {/* Brazo izquierdo */}
          <g className="mascot-arm mascot-arm-left">
            <rect x="2" y="18" width="6" height="10" fill="var(--mascot-shirt)" />
            <rect x="2" y="26" width="4" height="4" fill="var(--mascot-skin)" />
          </g>
          {/* Brazo derecho */}
          <g className="mascot-arm mascot-arm-right">
            <rect x="24" y="18" width="6" height="10" fill="var(--mascot-shirt)" />
            <rect x="26" y="26" width="4" height="4" fill="var(--mascot-skin)" />
          </g>
          {/* Short / pantalón */}
          <rect x="10" y="26" width="4" height="12" fill="var(--mascot-pants)" />
          <rect x="18" y="26" width="4" height="12" fill="var(--mascot-pants)" />
          <rect x="8" y="36" width="6" height="4" fill="#333" />
          <rect x="18" y="36" width="6" height="4" fill="#333" />
        </svg>
      </div>
    </div>
  )
}
