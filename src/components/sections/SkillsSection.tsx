import { useLanguage } from '../../context/LanguageContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import PageTitle from '../ui/PageTitle'
import { SkillsScene } from '../skills3d/SkillsScene'
import './SkillsSection.css'

const SKILL_CATEGORY_KEYS = ['skills.frontend', 'skills.backend', 'skills.databases', 'skills.tools'] as const

const SkillsSection = () => {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleSkills'), t('meta.descSkills'))

  const categoryLabels = Object.fromEntries(
    SKILL_CATEGORY_KEYS.map((key) => [key, t(key)])
  ) as Record<string, string>

  return (
    <section className="skills" aria-labelledby="skills-heading">
      <div className="skills-container">
        <PageTitle id="skills-heading">{t('skills.title')}</PageTitle>
        <SkillsScene categoryLabels={categoryLabels} />
      </div>
    </section>
  )
}

export default SkillsSection
