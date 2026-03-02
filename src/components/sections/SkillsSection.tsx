import { useLanguage } from '../../context/LanguageContext'
import PageTitle from '../ui/PageTitle'
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
    <section className="skills">
      <div className="skills-container">
        <PageTitle>{t('skills.title')}</PageTitle>
        <div className="skills-grid">
          {SKILL_CATEGORIES.map(({ key, skills }) => (
            <div key={key} className="skills-category">
              <h2>{t(key)}</h2>
              <div className="skills-list">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
