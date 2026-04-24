import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { renderWithProviders } from './test/renderWithProviders'

describe('App routing', () => {
  it('renderiza home por defecto', async () => {
    renderWithProviders(<App />, { route: '/' })
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Tomas Tutor Onetto')
  })

  it('muestra pagina 404 en ruta desconocida', async () => {
    renderWithProviders(<App />, { route: '/ruta-inexistente' })
    expect(await screen.findByRole('heading', { level: 1 })).toHaveTextContent('Page not found')
  })
})
