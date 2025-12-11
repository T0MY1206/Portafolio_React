import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import profileData from '../data/profile.json'
import './Home.css'

const Home = () => {
  const { t } = useLanguage()

  return (
    <section className="home">
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">{t('home.title')}</h1>
          <h2 className="home-subtitle">{t('home.subtitle')}</h2>
          <p className="home-location">{t('home.location')}</p>
          <div className="home-cta">
            <Link to="/projects" className="btn btn-primary">
              {t('home.cta')}
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

