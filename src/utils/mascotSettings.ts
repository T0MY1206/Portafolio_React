import {
  MAX_ACTION_DELAY_MS,
  MASCOT_FREQUENCIES,
  MASCOT_MODES,
  MIN_ACTION_DELAY_MS,
} from '../constants/mascot'

export type MascotMode = (typeof MASCOT_MODES)[number]
export type MascotFrequency = (typeof MASCOT_FREQUENCIES)[number]

export function normalizeMascotMode(value: string | null): MascotMode {
  return MASCOT_MODES.includes(value as MascotMode) ? (value as MascotMode) : 'interactive'
}

export function normalizeMascotFrequency(value: string | null): MascotFrequency {
  return MASCOT_FREQUENCIES.includes(value as MascotFrequency) ? (value as MascotFrequency) : 'normal'
}

export function getDelayRangeByFrequency(frequency: MascotFrequency) {
  if (frequency === 'low') {
    return {
      min: MIN_ACTION_DELAY_MS * 1.8,
      max: MAX_ACTION_DELAY_MS * 1.8,
    }
  }

  return { min: MIN_ACTION_DELAY_MS, max: MAX_ACTION_DELAY_MS }
}
