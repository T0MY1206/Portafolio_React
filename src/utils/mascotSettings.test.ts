import { describe, expect, it } from 'vitest'
import {
  getDelayRangeByFrequency,
  normalizeMascotFrequency,
  normalizeMascotMode,
} from './mascotSettings'

describe('mascotSettings', () => {
  it('normaliza modo con fallback seguro', () => {
    expect(normalizeMascotMode('assistant')).toBe('assistant')
    expect(normalizeMascotMode('valor-invalido')).toBe('interactive')
  })

  it('normaliza frecuencia con fallback seguro', () => {
    expect(normalizeMascotFrequency('low')).toBe('low')
    expect(normalizeMascotFrequency('otro')).toBe('normal')
  })

  it('ajusta delays para frecuencia baja', () => {
    const normal = getDelayRangeByFrequency('normal')
    const low = getDelayRangeByFrequency('low')
    expect(low.min).toBeGreaterThan(normal.min)
    expect(low.max).toBeGreaterThan(normal.max)
  })
})
