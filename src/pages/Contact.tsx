import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import profileData from '../data/profile.json'
import './Contact.css'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the form data to a backend
    alert('Thank you for your message! In a production app, this would be sent to a backend.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="contact">
      <div className="contact-container">
        <h1 className="page-title">{t('contact.title')}</h1>
        <p className="contact-subtitle">{t('contact.subtitle')}</p>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <h3>{t('contact.email')}</h3>
              <a href={`mailto:${profileData.personal.email}`}>
                {profileData.personal.email}
              </a>
            </div>
            <div className="contact-item">
              <h3>{t('contact.phone')}</h3>
              <a href={`tel:${profileData.personal.phone}`}>
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
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.form.message')}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {t('contact.form.send')}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

