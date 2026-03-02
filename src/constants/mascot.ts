export const PATH_TO_SECTION: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/experience': 'experience',
  '/skills': 'skills',
  '/projects': 'projects',
  '/contact': 'contact',
}

export const MASCOT_SELECTORS = [
  '.page-title',
  '.about-summary',
  '.experience-item',
  '.project-card',
  '.contact-form',
  '.contact-info',
  '.project-tags',
]

export const MASCOT_ACTIONS = ['hide', 'move'] as const

export const MIN_ACTION_DELAY_MS = 4000
export const MAX_ACTION_DELAY_MS = 10000
export const MOVE_DURATION_MS = 2500
export const RESTORE_AFTER_MS = 2800
export const COMMENT_DURATION_MS = 5500
