import { useLanguage } from '../../context/LanguageContext'
import { useContactForm } from '../../hooks/useContactForm'
import profileData from '../../data/profile.json'
import PageTitle from '../ui/PageTitle'
import Button from '../ui/Button'
import './ContactSection.css'

const ContactSection = () => {
  const { t } = useLanguage()
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    handleSubmit,
    handleChange,
  } = useContactForm({ t, publicKey, serviceId, templateId })

  return (
    <section className="contact">
      <div className="contact-container">
        <PageTitle>{t('contact.title')}</PageTitle>
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
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
