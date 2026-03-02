import { useState } from 'react'
import { send as emailjsSend } from '@emailjs/browser'
import { isValidEmail } from '../utils/validation'

export interface ContactFormState {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name: string
  email: string
  message: string
}

export type SubmitStatus = 'idle' | 'success' | 'error'

interface UseContactFormOptions {
  t: (key: string) => string
  publicKey: string | undefined
  serviceId: string | undefined
  templateId: string | undefined
}

/**
 * Handles contact form state, validation and submission via EmailJS.
 * Returns form data, validation errors, submit status and handlers for inputs and submit.
 */
export function useContactForm({
  t,
  publicKey,
  serviceId,
  templateId,
}: UseContactFormOptions) {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<ContactFormErrors>({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const validate = (
    name: string,
    email: string,
    message: string
  ): ContactFormErrors => {
    const newErrors: ContactFormErrors = { name: '', email: '', message: '' }

    if (!name) {
      newErrors.name = t('contact.form.errors.nameRequired')
    } else if (name.length <= 3) {
      newErrors.name = t('contact.form.errors.nameMinLength')
    }

    if (!email) {
      newErrors.email = t('contact.form.errors.emailRequired')
    } else if (!isValidEmail(email)) {
      newErrors.email = t('contact.form.errors.emailInvalid')
    }

    if (!message) {
      newErrors.message = t('contact.form.errors.messageRequired')
    } else if (message.split(/\s+/).filter(Boolean).length <= 1) {
      newErrors.message = t('contact.form.errors.messageMinWords')
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    const newErrors = validate(name, email, message)
    setErrors(newErrors)
    setSubmitStatus('idle')

    if (Object.values(newErrors).some(Boolean)) return

    if (!publicKey || !serviceId || !templateId) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)

    try {
      await emailjsSend(
        serviceId,
        templateId,
        { from_name: name, from_email: email, message },
        { publicKey: publicKey! }
      )
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setErrors({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleSubmit,
    handleChange,
  }
}
