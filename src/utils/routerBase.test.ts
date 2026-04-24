import { describe, expect, it } from 'vitest'
import { getRouterBasename } from './routerBase'

describe('getRouterBasename', () => {
  it('devuelve undefined para raiz', () => {
    expect(getRouterBasename('/')).toBeUndefined()
    expect(getRouterBasename('')).toBeUndefined()
  })

  it('normaliza base con slash final', () => {
    expect(getRouterBasename('/Portafolio_React/')).toBe('/Portafolio_React')
    expect(getRouterBasename('/app')).toBe('/app')
  })
})
