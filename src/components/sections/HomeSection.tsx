import { useLanguage } from '../../context/LanguageContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import Button from '../ui/Button'
import './HomeSection.css'

const HomeSection = () => {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleHome'), t('meta.descHome'))

  return (
    <section className="home" aria-label={t('nav.home')}>
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">{t('home.title')}</h1>
          <h2 className="home-subtitle">{t('home.subtitle')}</h2>
          <p className="home-location">{t('home.location')}</p>
          <div className="home-cta">
            <Button variant="primary" to="/projects">
              {t('home.cta')}
            </Button>
            <Button variant="secondary" to="/contact">
              {t('nav.contact')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSection
