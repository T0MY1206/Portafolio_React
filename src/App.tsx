import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'

const HomeSection = lazy(() => import('./components/sections/HomeSection'))
const AboutSection = lazy(() => import('./components/sections/AboutSection'))
const ExperienceSection = lazy(() => import('./components/sections/ExperienceSection'))
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'))
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'))
const ContactSection = lazy(() => import('./components/sections/ContactSection'))

function SectionFallback() {
  return (
    <div className="section-fallback" role="status" aria-live="polite">
      <span aria-hidden>Loading…</span>
    </div>
  )
}

function App() {
  return (
    <Layout>
      <Suspense fallback={<SectionFallback />}>
        <Routes>
          <Route path="/" element={<HomeSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/experience" element={<ExperienceSection />} />
          <Route path="/skills" element={<SkillsSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/contact" element={<ContactSection />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App
