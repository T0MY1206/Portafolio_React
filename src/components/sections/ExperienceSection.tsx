import { useLanguage } from '../../context/LanguageContext'
import PageTitle from '../ui/PageTitle'
import { EXPERIENCE_ITEMS } from '../../constants/experience'
import './ExperienceSection.css'

const ExperienceSection = () => {
  const { t } = useLanguage()

  return (
    <section className="experience">
      <div className="experience-container">
        <PageTitle>{t('experience.title')}</PageTitle>
        <div className="experience-list">
          {EXPERIENCE_ITEMS.map((exp) => (
            <div key={exp.titleKey} className="experience-item">
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

export default ExperienceSection
