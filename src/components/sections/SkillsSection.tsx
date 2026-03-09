import { useLanguage } from '../../context/LanguageContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import PageTitle from '../ui/PageTitle'
import profileData from '../../data/profile.json'
import { getSkillMeta } from '../../data/skillIcons'
import DotNetLogo from '../icons/DotNetLogo'
import './SkillsSection.css'

const SKILL_CATEGORIES = [
  { key: 'skills.frontend', skills: profileData.skills.frontend },
  { key: 'skills.backend', skills: profileData.skills.backend },
  { key: 'skills.databases', skills: profileData.skills.databases },
  { key: 'skills.tools', skills: profileData.skills.tools },
] as const

const CUSTOM_SKILL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dotnet: DotNetLogo,
}

function SkillItem({ name }: { name: string }) {
  const meta = getSkillMeta(name)
  const { color, devicon, customKey } = meta
  const isLight = isLightColor(color)
  const CustomIcon = customKey ? CUSTOM_SKILL_ICONS[customKey] : null
  return (
    <div
      className="skill-item"
      style={{ backgroundColor: color }}
      data-light={isLight || undefined}
    >
      <span className="skill-item-icon-wrap">
        {CustomIcon ? (
          <CustomIcon className="skill-item-icon skill-item-icon-svg" />
        ) : (
          <i className={`devicon ${devicon ?? 'devicon-devicon-plain'} skill-item-icon`} aria-hidden />
        )}
      </span>
      <span className="skill-item-label">{name}</span>
    </div>
  )
}

function isLightColor(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8) & 0xff
  const b = n & 0xff
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.7
}

const SkillsSection = () => {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleSkills'), t('meta.descSkills'))

  return (
    <section className="skills" aria-labelledby="skills-heading">
      <div className="skills-container">
        <PageTitle id="skills-heading">{t('skills.title')}</PageTitle>
        <div className="skills-grid">
          {SKILL_CATEGORIES.map(({ key, skills }) => (
            <section key={key} className="skills-category" aria-labelledby={`skills-${key.replace('.', '-')}`}>
              <h2 id={`skills-${key.replace('.', '-')}`}>{t(key)}</h2>
              <div className="skills-list">
                {skills.map((skill) => (
                  <SkillItem key={skill} name={skill} />
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
