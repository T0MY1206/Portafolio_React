import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { buildProjects } from '../../constants/projects'
import type { Project } from '../../types/project'
import { getProjectImages } from '../../utils/projects'
import PageTitle from '../ui/PageTitle'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import './ProjectsSection.css'

const HOVER_INTERVAL_MS = 2500

const ProjectsSection = () => {
  const { t } = useLanguage()
  const projects = buildProjects(t)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null)
  const [hoveredCardImageIndex, setHoveredCardImageIndex] = useState(0)
  const hoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!selectedProject) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [selectedProject])

  useEffect(() => {
    setCarouselIndex(0)
  }, [selectedProject?.id])

  useEffect(() => {
    if (selectedProject) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [selectedProject])

  const goPrev = () => {
    const imgs = selectedProject ? getProjectImages(selectedProject) : []
    const n = imgs.length
    setCarouselIndex((i) => (i <= 0 ? n - 1 : i - 1))
  }

  const goNext = () => {
    const imgs = selectedProject ? getProjectImages(selectedProject) : []
    const n = imgs.length
    setCarouselIndex((i) => (i >= n - 1 ? 0 : i + 1))
  }

  const handleCardMouseEnter = (project: Project) => {
    const imgs = getProjectImages(project)
    if (imgs.length === 0) return
    setHoveredProjectId(project.id)
    setHoveredCardImageIndex(0)
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current)
    hoverIntervalRef.current = setInterval(() => {
      setHoveredCardImageIndex((i) => (i >= imgs.length - 1 ? 0 : i + 1))
    }, HOVER_INTERVAL_MS)
  }

  const handleCardMouseLeave = () => {
    setHoveredProjectId(null)
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current)
      hoverIntervalRef.current = null
    }
  }

  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current)
    }
  }, [])

  return (
    <section className="projects">
      <div className="projects-container">
        <PageTitle>{t('projects.title')}</PageTitle>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredProjectId === project.id}
              currentImageIndex={hoveredCardImageIndex}
              onSelect={setSelectedProject}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
              viewDetailsLabel={t('projects.viewDetails')}
              viewRepoLabel={t('projects.viewRepo')}
              t={t}
            />
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          carouselIndex={carouselIndex}
          onPrev={goPrev}
          onNext={goNext}
          onSelectImage={setCarouselIndex}
          t={t}
        />
      )}
    </section>
  )
}

export default ProjectsSection
