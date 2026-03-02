import { useState, useEffect, useCallback, useRef } from 'react'
import { pickRandom } from '../utils/random'
import { getTranslationVariants } from '../utils/i18n'
import {
  PATH_TO_SECTION,
  MASCOT_SELECTORS,
  MASCOT_ACTIONS,
  MIN_ACTION_DELAY_MS,
  MAX_ACTION_DELAY_MS,
  MOVE_DURATION_MS,
  RESTORE_AFTER_MS,
  COMMENT_DURATION_MS,
} from '../constants/mascot'

export function useMascotBehavior(
  pathname: string,
  t: (key: string) => string
) {
  const section = PATH_TO_SECTION[pathname] ?? 'home'

  const [position, setPosition] = useState(() => ({
    x: 5 + Math.random() * 90,
    y: 10 + Math.random() * 75,
  }))
  const [comment, setComment] = useState<string | null>(null)
  const [visible, setVisible] = useState(true)
  const [acting, setActing] = useState(false)

  const affectedRef = useRef<{ el: Element; action: string } | null>(null)
  const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const actionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const moveToTargetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const commentClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
    setPosition({
      x: (xPx / window.innerWidth) * 100,
      y: (yPx / window.innerHeight) * 100,
    })
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
    if (!visible) return

    const key = `mascot.${section}`
    const raw = t(key)
    if (raw === key) return
    const list = getTranslationVariants(t, key)
    const msg = list.length ? pickRandom(list) : null
    if (!msg) return
    setComment(msg)
    const hide = setTimeout(() => setComment(null), COMMENT_DURATION_MS)
    return () => clearTimeout(hide)
  }, [section, position.x, position.y, visible, t])

  useEffect(() => {
    restoreAffected()
    if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current)
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current)
    if (moveToTargetTimerRef.current) clearTimeout(moveToTargetTimerRef.current)
    if (commentClearRef.current) clearTimeout(commentClearRef.current)
    actionTimerRef.current = restoreTimerRef.current = moveToTargetTimerRef.current = commentClearRef.current = null

    if (!visible) {
      return () => {
        if (actionTimerRef.current) clearTimeout(actionTimerRef.current)
        if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current)
        if (moveToTargetTimerRef.current) clearTimeout(moveToTargetTimerRef.current)
        if (commentClearRef.current) clearTimeout(commentClearRef.current)
        restoreAffected()
      }
    }

    function runNextAction() {
      const container = document.querySelector('.main-content-inner')
      if (!container) {
        scheduleNext()
        return
      }

      const candidates: Element[] = []
      MASCOT_SELECTORS.forEach((sel) => {
        try {
          container.querySelectorAll(sel).forEach((el) => candidates.push(el))
        } catch {
          // ignore invalid selector
        }
      })

      if (candidates.length === 0) {
        scheduleNext()
        return
      }

      const el = pickRandom(candidates) as HTMLElement
      const action = pickRandom([...MASCOT_ACTIONS])
      positionNearElement(el)
      setActing(true)

      moveToTargetTimerRef.current = setTimeout(() => {
        moveToTargetTimerRef.current = null
        if (action === 'hide') {
          el.classList.add('mascot-hidden')
          affectedRef.current = { el, action }
          const msgs = getTranslationVariants(t, 'mascot.hideComment')
          setComment(msgs.length ? pickRandom(msgs) : t('mascot.hideComment'))
        } else {
          const dx = (Math.random() - 0.5) * 80
          const dy = (Math.random() - 0.5) * 60
          el.style.setProperty('--mascot-dx', `${dx}px`)
          el.style.setProperty('--mascot-dy', `${dy}px`)
          el.classList.add('mascot-moved')
          affectedRef.current = { el, action }
          const msgs = getTranslationVariants(t, 'mascot.moveComment')
          setComment(msgs.length ? pickRandom(msgs) : t('mascot.moveComment'))
        }
        if (commentClearRef.current) clearTimeout(commentClearRef.current)
        commentClearRef.current = setTimeout(
          () => setComment(null),
          COMMENT_DURATION_MS
        )

        restoreTimerRef.current = setTimeout(() => {
          restoreAffected()
          restoreTimerRef.current = null
          scheduleNext()
        }, RESTORE_AFTER_MS)
      }, MOVE_DURATION_MS)
    }

    function scheduleNext() {
      const delay =
        MIN_ACTION_DELAY_MS +
        Math.random() * (MAX_ACTION_DELAY_MS - MIN_ACTION_DELAY_MS)
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
  }, [section, positionNearElement, restoreAffected, t, visible])

  const handleClose = useCallback(() => {
    setVisible(false)
    setComment(null)
    setActing(false)
    if (actionTimerRef.current) clearTimeout(actionTimerRef.current)
    if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current)
    if (moveToTargetTimerRef.current) clearTimeout(moveToTargetTimerRef.current)
    if (commentClearRef.current) clearTimeout(commentClearRef.current)
    restoreAffected()
  }, [restoreAffected])

  return {
    position,
    comment,
    acting,
    visible,
    handleClose,
  }
}
