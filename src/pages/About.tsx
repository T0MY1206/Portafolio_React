import { useLanguage } from '../context/LanguageContext'
import profileData from '../data/profile.json'
import './About.css'

const About = () => {
  const { t } = useLanguage()

  return (
    <section className="about">
      <div className="about-container">
        <h1 className="page-title">{t('about.title')}</h1>
        <div className="about-content">
          <div className="about-section">
            <p className="about-summary">{t('about.summary')}</p>
          </div>
          <div className="about-section">
            <h2>{t('about.education.title')}</h2>
            <p><strong>{profileData.education.degree}</strong></p>
            <p>{t('about.education.status')}</p>
          </div>
          <div className="about-section">
            <h2>{t('about.languages.title')}</h2>
            <ul className="languages-list">
              <li>{t('about.languages.spanish')}</li>
              <li>{t('about.languages.english')}</li>
              <li>{t('about.languages.italian')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

