import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import { buildProjects } from '../../constants/projects'
import type { Project } from '../../types/project'
import { getProjectImages } from '../../utils/projects'
import PageTitle from '../ui/PageTitle'
import { usePageMeta } from '../../hooks/usePageMeta'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import './ProjectsSection.css'

const HOVER_INTERVAL_MS = 2500

const ProjectsSection = () => {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleProjects'), t('meta.descProjects'))
  const projects = buildProjects(t)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null)
  const [hoveredCardImageIndex, setHoveredCardImageIndex] = useState(0)
  const hoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const focusBeforeModalRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!selectedProject) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [selectedProject])

  useEffect(() => {
    if (!selectedProject) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [selectedProject])

  function handleCardMouseEnter(project: Project) {
    const imgs = getProjectImages(project)
    if (imgs.length === 0) return
    setHoveredProjectId(project.id)
    setHoveredCardImageIndex(0)
    if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current)
    hoverIntervalRef.current = setInterval(() => {
      setHoveredCardImageIndex((i) => (i >= imgs.length - 1 ? 0 : i + 1))
    }, HOVER_INTERVAL_MS)
  }

  function handleCardMouseLeave() {
    setHoveredProjectId(null)
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current)
      hoverIntervalRef.current = null
    }
  }

  function handleSelectProject(p: Project) {
    focusBeforeModalRef.current = document.activeElement as HTMLElement | null
    setSelectedProject(p)
  }

  function handleCloseModal() {
    setSelectedProject(null)
    setTimeout(() => focusBeforeModalRef.current?.focus(), 0)
  }

  useEffect(() => {
    return () => {
      if (hoverIntervalRef.current) clearInterval(hoverIntervalRef.current)
    }
  }, [])

  return (
    <section className="projects" aria-labelledby="projects-heading">
      <div className="projects-container">
        <PageTitle id="projects-heading">{t('projects.title')}</PageTitle>
        <h2 className="projects-intro">{t('projects.description')}</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isHovered={hoveredProjectId === project.id}
              currentImageIndex={hoveredCardImageIndex}
              onSelect={handleSelectProject}
              onMouseEnter={handleCardMouseEnter}
              onMouseLeave={handleCardMouseLeave}
            />
          ))}
        </div>
      </div>
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
        />
      )}
    </section>
  )
}

export default ProjectsSection
