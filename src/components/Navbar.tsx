import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../hooks/useTheme'
import './Navbar.css'

const Navbar = () => {
  const { t, toggleLanguage, language } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          TTO
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              {t('nav.home')}
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive('/about') ? 'active' : ''}>
              {t('nav.about')}
            </Link>
          </li>
          <li>
            <Link to="/experience" className={isActive('/experience') ? 'active' : ''}>
              {t('nav.experience')}
            </Link>
          </li>
          <li>
            <Link to="/skills" className={isActive('/skills') ? 'active' : ''}>
              {t('nav.skills')}
            </Link>
          </li>
          <li>
            <Link to="/projects" className={isActive('/projects') ? 'active' : ''}>
              {t('nav.projects')}
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive('/contact') ? 'active' : ''}>
              {t('nav.contact')}
            </Link>
          </li>
        </ul>
        <div className="navbar-controls">
          <button onClick={toggleLanguage} className="lang-toggle" aria-label="Toggle language">
            {language === 'en' ? 'ES' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

