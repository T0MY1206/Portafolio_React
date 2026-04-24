import { useLanguage } from '../../context/LanguageContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import Button from '../ui/Button'

export default function NotFoundSection() {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleNotFound'), t('meta.descNotFound'))

  return (
    <section className="home" aria-labelledby="not-found-title">
      <div className="home-container">
        <div className="home-content">
          <h1 id="not-found-title" className="home-title">{t('notFound.title')}</h1>
          <p className="home-location">{t('notFound.description')}</p>
          <Button to="/" variant="primary">
            {t('notFound.backHome')}
          </Button>
        </div>
      </div>
    </section>
  )
}
