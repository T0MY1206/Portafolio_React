import { useLanguage } from '../../context/LanguageContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import PageTitle from '../ui/PageTitle'
import { EXPERIENCE_ITEMS } from '../../constants/experience'
import './ExperienceSection.css'

const ExperienceSection = () => {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleExperience'), t('meta.descExperience'))

  return (
    <section className="experience" aria-labelledby="experience-heading">
      <div className="experience-container">
        <PageTitle id="experience-heading">{t('experience.title')}</PageTitle>
        <div className="experience-list">
          {EXPERIENCE_ITEMS.map((exp) => (
            <article key={exp.titleKey} className="experience-item" aria-label={`${t(exp.titleKey)} - ${t(exp.companyKey)}`}>
              <div className="experience-header">
                <h2>{t(exp.titleKey)}</h2>
                <span className="experience-company">{t(exp.companyKey)}</span>
              </div>
              <span className="experience-period">{t(exp.periodKey)}</span>
              <p className="experience-description">{t(exp.descriptionKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
