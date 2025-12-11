import { useLanguage } from '../context/LanguageContext'
import './Experience.css'

const Experience = () => {
  const { t } = useLanguage()

  const experiences = [
    {
      titleKey: 'experience.thankit.title',
      companyKey: 'experience.thankit.company',
      periodKey: 'experience.thankit.period',
      descriptionKey: 'experience.thankit.description'
    },
    {
      titleKey: 'experience.isfdyt.title',
      companyKey: 'experience.isfdyt.company',
      periodKey: 'experience.isfdyt.period',
      descriptionKey: 'experience.isfdyt.description'
    },
    {
      titleKey: 'experience.bono.title',
      companyKey: 'experience.bono.company',
      periodKey: 'experience.bono.period',
      descriptionKey: 'experience.bono.description'
    }
  ]

  return (
    <section className="experience">
      <div className="experience-container">
        <h1 className="page-title">{t('experience.title')}</h1>
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <h2>{t(exp.titleKey)}</h2>
                <span className="experience-company">{t(exp.companyKey)}</span>
              </div>
              <span className="experience-period">{t(exp.periodKey)}</span>
              <p className="experience-description">{t(exp.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

