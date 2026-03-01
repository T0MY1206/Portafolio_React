import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { useLanguage } from '../context/LanguageContext'
import profileData from '../data/profile.json'
import './Contact.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    const newErrors = { name: '', email: '', message: '' }

    if (!name) {
      newErrors.name = t('contact.form.errors.nameRequired')
    } else if (name.length <= 3) {
      newErrors.name = t('contact.form.errors.nameMinLength')
    }

    if (!email) {
      newErrors.email = t('contact.form.errors.emailRequired')
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = t('contact.form.errors.emailInvalid')
    }

    if (!message) {
      newErrors.message = t('contact.form.errors.messageRequired')
    } else if (message.split(/\s+/).filter(Boolean).length <= 1) {
      newErrors.message = t('contact.form.errors.messageMinWords')
    }

    setErrors(newErrors)
    setSubmitStatus('idle')

    const hasErrors = Object.values(newErrors).some(Boolean)
    if (hasErrors) return

    if (!publicKey || !serviceId || !templateId) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.send(serviceId, templateId, {
        from_name: name,
        from_email: email,
        message
      }, publicKey)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setErrors({ name: '', email: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <h1 className="page-title">{t('contact.title')}</h1>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>{t('contact.email')}</h3>
              <a
                href={`https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(profileData.personal.email)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.personal.email}
              </a>
            </div>
            <div className="contact-item">
              <h3>{t('contact.phone')}</h3>
              <a
                href={`https://wa.me/${profileData.personal.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profileData.personal.phone}
              </a>
            </div>
            <div className="contact-item">
              <h3>{t('contact.location')}</h3>
              <p>{profileData.personal.location}</p>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.form.name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error' : ''}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="form-error" role="alert">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="form-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={errors.message ? 'input-error' : ''}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              {errors.message && (
                <p id="message-error" className="form-error" role="alert">
                  {errors.message}
                </p>
              )}
            </div>
            {submitStatus === 'success' && (
              <p className="form-success" role="status">
                {t('contact.form.success')}
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="form-error form-error-global" role="alert">
                {t('contact.form.sendError')}
              </p>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

