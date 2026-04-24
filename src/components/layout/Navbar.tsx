import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { useTheme } from '../../hooks/useTheme'
import { NAV_LINKS } from '../../constants/routes'
import './Navbar.css'

const Navbar = () => {
  const { t, toggleLanguage, language } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const isActive = (path: string) => location.pathname === path
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu} aria-label={t('nav.home')}>
          TTO
        </Link>
        <button
          type="button"
          className="navbar-burger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          aria-expanded={menuOpen}
        >
          <span className="navbar-burger-bar" />
          <span className="navbar-burger-bar" />
          <span className="navbar-burger-bar" />
        </button>
        <div className={`navbar-dropdown ${menuOpen ? 'navbar-dropdown-open' : ''}`}>
          <div className="navbar-menu-wrapper">
            <ul className="navbar-menu">
              {NAV_LINKS.map(({ path, key }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={isActive(path) ? 'active' : ''}
                    onClick={closeMenu}
                    aria-current={isActive(path) ? 'page' : undefined}
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-controls navbar-controls-in-menu">
            <button
              onClick={toggleLanguage}
              className="lang-toggle"
              aria-label={t('nav.toggleLang')}
            >
              {language === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={t('nav.toggleTheme')}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
