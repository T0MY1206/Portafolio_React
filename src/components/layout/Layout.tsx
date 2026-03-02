import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import Mascot from './Mascot'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const showMascot = import.meta.env.VITE_MASCOT_ENABLED !== 'false'

  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
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
