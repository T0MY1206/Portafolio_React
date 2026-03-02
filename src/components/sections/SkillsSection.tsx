import { useLanguage } from '../../context/LanguageContext'
import PageTitle from '../ui/PageTitle'
import PageMeta from '../ui/PageMeta'
import profileData from '../../data/profile.json'
import './SkillsSection.css'

const SKILL_CATEGORIES = [
  { key: 'skills.frontend', skills: profileData.skills.frontend },
  { key: 'skills.backend', skills: profileData.skills.backend },
  { key: 'skills.databases', skills: profileData.skills.databases },
  { key: 'skills.tools', skills: profileData.skills.tools },
] as const

const SkillsSection = () => {
  const { t } = useLanguage()

  return (
    <section className="skills" aria-labelledby="skills-heading">
      <PageMeta title={t('meta.titleSkills')} description={t('meta.descSkills')} />
      <div className="skills-container">
        <PageTitle id="skills-heading">{t('skills.title')}</PageTitle>
        <div className="skills-grid">
          {SKILL_CATEGORIES.map(({ key, skills }) => (
            <section key={key} className="skills-category" aria-labelledby={`skills-${key.replace('.', '-')}`}>
              <h2 id={`skills-${key.replace('.', '-')}`}>{t(key)}</h2>
              <div className="skills-list">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
