import { describe, expect, it } from 'vitest'
import { isValidEmail } from './validation'

describe('isValidEmail', () => {
  it('acepta emails validos', () => {
    expect(isValidEmail('test@example.com')).toBe(true)
    expect(isValidEmail('nombre.apellido+tag@dominio.com')).toBe(true)
  })

  it('rechaza emails invalidos', () => {
    expect(isValidEmail('test@')).toBe(false)
    expect(isValidEmail('test.com')).toBe(false)
    expect(isValidEmail('')).toBe(false)
  })
})
