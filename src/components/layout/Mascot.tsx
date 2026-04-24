import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useMascotBehavior } from '../../hooks/useMascotBehavior'
import './Mascot.css'

export default function Mascot() {
  const { t } = useLanguage()
  const location = useLocation()
  const settingsPanelRef = useRef<HTMLDivElement | null>(null)
  const settingsToggleRef = useRef<HTMLButtonElement | null>(null)
  const {
    position,
    comment,
    acting,
    visible,
    mode,
    frequency,
    settingsOpen,
    prefersReducedMotion,
    effectiveMode,
    setMode,
    setFrequency,
    setSettingsOpen,
    handleClose,
    handleRestore,
  } = useMascotBehavior(
    location.pathname,
    t
  )

  useEffect(() => {
    if (!settingsOpen) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return

      const clickedInsidePanel = settingsPanelRef.current?.contains(target)
      const clickedToggle = settingsToggleRef.current?.contains(target)

      if (!clickedInsidePanel && !clickedToggle) {
        setSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [settingsOpen, setSettingsOpen])

  if (!visible) {
    return (
      <button
        type="button"
        className="mascot-reopen"
        onClick={handleRestore}
        aria-label={t('mascot.restoreLabel')}
        data-testid="mascot-reopen"
      >
        {t('mascot.reopen')}
      </button>
    )
  }

  return (
    <div
      className={`mascot${acting ? ' mascot-acting' : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      role="img"
      aria-label={t('mascot.ariaLabel')}
    >
      <button
        type="button"
        ref={settingsToggleRef}
        className="mascot-settings-toggle"
        onClick={() => setSettingsOpen((prev) => !prev)}
        aria-expanded={settingsOpen}
        aria-controls="mascot-settings"
        aria-label={t('mascot.settingsLabel')}
        data-testid="mascot-settings-toggle"
      >
        ⚙
      </button>
      <button
        type="button"
        className="mascot-close"
        onClick={handleClose}
        aria-label={t('mascot.hideLabel')}
        data-testid="mascot-close"
      >
        ×
      </button>
      {settingsOpen && (
        <div
          ref={settingsPanelRef}
          className="mascot-settings"
          id="mascot-settings"
          data-testid="mascot-settings"
        >
          <p className="mascot-settings-title">{t('mascot.settingsTitle')}</p>
          <label>
            {t('mascot.modeLabel')}
            <select
              value={mode}
              onChange={(event) => setMode(event.target.value as typeof mode)}
            >
              <option value="interactive">{t('mascot.modeInteractive')}</option>
              <option value="assistant">{t('mascot.modeAssistant')}</option>
              <option value="reduced">{t('mascot.modeReduced')}</option>
            </select>
          </label>
          <label>
            {t('mascot.frequencyLabel')}
            <select
              value={frequency}
              onChange={(event) => setFrequency(event.target.value as typeof frequency)}
            >
              <option value="normal">{t('mascot.frequencyNormal')}</option>
              <option value="low">{t('mascot.frequencyLow')}</option>
            </select>
          </label>
          {prefersReducedMotion && (
            <p className="mascot-settings-note">
              {t('mascot.reducedMotionHint')}
            </p>
          )}
          <p className="mascot-settings-note">
            {effectiveMode === 'assistant'
              ? t('mascot.assistantModeHint')
              : t('mascot.interactiveModeHint')}
          </p>
        </div>
      )}
      {comment && (
        <div className="mascot-bubble">
          <span>{comment}</span>
        </div>
      )}
      <div className="mascot-character">
        <svg
          viewBox="0 0 32 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mascot-pixel"
        >
          <rect x="8" y="2" width="16" height="14" fill="var(--mascot-skin)" />
          <rect x="6" y="4" width="4" height="4" fill="var(--mascot-skin)" />
          <rect x="22" y="4" width="4" height="4" fill="var(--mascot-skin)" />
          <rect x="8" y="10" width="3" height="3" fill="var(--mascot-eyes)" />
          <rect x="21" y="10" width="3" height="3" fill="var(--mascot-eyes)" />
          <rect
            x="5"
            y="7"
            width="8"
            height="8"
            fill="rgba(255,255,255,0.12)"
            stroke="var(--mascot-glasses-frame)"
            strokeWidth="1.25"
          />
          <rect
            x="19"
            y="7"
            width="8"
            height="8"
            fill="rgba(255,255,255,0.12)"
            stroke="var(--mascot-glasses-frame)"
            strokeWidth="1.25"
          />
          <rect
            x="13"
            y="10"
            width="6"
            height="2"
            fill="var(--mascot-glasses-frame)"
          />
          <rect x="6" y="16" width="20" height="10" fill="var(--mascot-shirt)" />
          <g className="mascot-arm mascot-arm-left">
            <rect x="2" y="18" width="6" height="10" fill="var(--mascot-shirt)" />
            <rect x="2" y="26" width="4" height="4" fill="var(--mascot-skin)" />
          </g>
          <g className="mascot-arm mascot-arm-right">
            <rect
              x="24"
              y="18"
              width="6"
              height="10"
              fill="var(--mascot-shirt)"
            />
            <rect x="26" y="26" width="4" height="4" fill="var(--mascot-skin)" />
          </g>
          <rect x="10" y="26" width="4" height="12" fill="var(--mascot-pants)" />
          <rect x="18" y="26" width="4" height="12" fill="var(--mascot-pants)" />
          <rect x="8" y="36" width="6" height="4" fill="#333" />
          <rect x="18" y="36" width="6" height="4" fill="#333" />
        </svg>
      </div>
    </div>
  )
}
