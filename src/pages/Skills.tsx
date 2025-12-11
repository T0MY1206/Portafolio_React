import { useLanguage } from '../context/LanguageContext'
import profileData from '../data/profile.json'
import './Skills.css'

const Skills = () => {
  const { t } = useLanguage()

  return (
    <section className="skills">
      <div className="skills-container">
        <h1 className="page-title">{t('skills.title')}</h1>
        <div className="skills-grid">
          <div className="skills-category">
            <h2>{t('skills.frontend')}</h2>
            <div className="skills-list">
              {profileData.skills.frontend.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-category">
            <h2>{t('skills.backend')}</h2>
            <div className="skills-list">
              {profileData.skills.backend.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-category">
            <h2>{t('skills.databases')}</h2>
            <div className="skills-list">
              {profileData.skills.databases.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          <div className="skills-category">
            <h2>{t('skills.tools')}</h2>
            <div className="skills-list">
              {profileData.skills.tools.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

