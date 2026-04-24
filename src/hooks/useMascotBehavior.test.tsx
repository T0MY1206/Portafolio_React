import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useMascotBehavior } from './useMascotBehavior'

const t = (key: string) => key

describe('useMascotBehavior', () => {
  it('permite ocultar y restaurar la mascota', () => {
    const { result } = renderHook(() => useMascotBehavior('/', t))

    expect(result.current.visible).toBe(true)

    act(() => {
      result.current.handleClose()
    })
    expect(result.current.visible).toBe(false)

    act(() => {
      result.current.handleRestore()
    })
    expect(result.current.visible).toBe(true)
  })

  it('expone modo y frecuencia configurables', () => {
    const { result } = renderHook(() => useMascotBehavior('/', t))
    act(() => {
      result.current.setMode('assistant')
      result.current.setFrequency('low')
    })
    expect(result.current.mode).toBe('assistant')
    expect(result.current.frequency).toBe('low')
  })
})
