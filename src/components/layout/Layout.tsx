import type { ReactNode } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import Navbar from './Navbar'
import Footer from './Footer'
import Mascot from './Mascot'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { t } = useLanguage()
  const showMascot = import.meta.env.VITE_MASCOT_ENABLED !== 'false'

  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">
        {t('nav.skipToContent')}
      </a>
      <Navbar />
      <main id="main-content" className="main-content" tabIndex={-1}>
        <div className="main-content-inner">
          {children}
        </div>
      </main>
      <Footer />
      {showMascot && <Mascot />}
    </div>
  )
}

export default Layout
