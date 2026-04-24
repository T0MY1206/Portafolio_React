import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useContactForm } from './useContactForm'

const sendMock = vi.fn()

vi.mock('@emailjs/browser', () => ({
  send: (...args: unknown[]) => sendMock(...args),
}))

const t = (key: string) => key

describe('useContactForm', () => {
  beforeEach(() => {
    sendMock.mockReset()
  })

  it('valida campos y no envia si hay errores', async () => {
    const { result } = renderHook(() =>
      useContactForm({
        t,
        publicKey: 'pk',
        serviceId: 'service',
        templateId: 'template',
      })
    )

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Tom' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'mail-invalido' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'message', value: 'hola' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent)
    })

    expect(result.current.errors.name).toBe('contact.form.errors.nameMinLength')
    expect(result.current.errors.email).toBe('contact.form.errors.emailInvalid')
    expect(result.current.errors.message).toBe('contact.form.errors.messageMinWords')
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('envia el formulario y limpia estado al tener datos validos', async () => {
    sendMock.mockResolvedValueOnce({ status: 200 })
    const { result } = renderHook(() =>
      useContactForm({
        t,
        publicKey: 'pk',
        serviceId: 'service',
        templateId: 'template',
      })
    )

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Tomas Tutor' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'email', value: 'tomas@example.com' },
      } as React.ChangeEvent<HTMLInputElement>)
      result.current.handleChange({
        target: { name: 'message', value: 'Mensaje con varias palabras' },
      } as React.ChangeEvent<HTMLTextAreaElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent)
    })

    expect(sendMock).toHaveBeenCalledOnce()
    expect(result.current.submitStatus).toBe('success')
    expect(result.current.formData).toEqual({ name: '', email: '', message: '' })
  })
})
