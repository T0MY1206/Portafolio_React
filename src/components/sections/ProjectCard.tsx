import type { Project } from '../../types/project'
import { useLanguage } from '../../context/LanguageContext'
import { getProjectImages } from '../../utils/projects'

interface ProjectCardProps {
  project: Project
  isHovered: boolean
  currentImageIndex: number
  onSelect: (project: Project) => void
  onMouseEnter: (project: Project) => void
  onMouseLeave: () => void
}

export default function ProjectCard({
  project,
  isHovered,
  currentImageIndex,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  const { t } = useLanguage()
  const images = getProjectImages(project)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(project)
    }
  }

  return (
    <div
      className="project-card"
      role="button"
      tabIndex={0}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('a')) return
        onSelect(project)
      }}
      onMouseEnter={() => onMouseEnter(project)}
      onMouseLeave={onMouseLeave}
      onKeyDown={handleKeyDown}
      aria-label={t('projects.viewDetails')}
    >
      {images.length > 0 && (
        <>
          <div className="project-card-preview" aria-hidden>
            {images.map((src, i) => {
              const idx = isHovered ? currentImageIndex : 0
              const isEmphasized = i === idx
              return (
                <div
                  key={`${project.id}-img-${i}`}
                  className={`project-card-preview-img ${isEmphasized ? 'emphasized' : 'dimmed'}`}
                  style={{ backgroundImage: `url(${src})` }}
                />
              )
            })}
          </div>
          <div className="project-card-overlay" aria-hidden />
        </>
      )}
      <div className="project-card-header">
        <h3>{project.name}</h3>
        {(project.repositoryLinks?.length || project.repositoryUrl) && (
          <div
            className="project-repo-links"
            onClick={(e) => e.stopPropagation()}
          >
            {project.repositoryLinks?.length
              ? project.repositoryLinks.map((link) => (
                  <a
                    key={link.labelKey}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-repo-link"
                    aria-label={t(link.labelKey)}
                  >
                    {t(link.labelKey)}
                  </a>
                ))
              : project.repositoryUrl && (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-repo-link"
                    aria-label={t('projects.viewRepo')}
                  >
                    {t('projects.viewRepo')}
                  </a>
                )}
          </div>
        )}
      </div>
      <p className="project-card-description">{project.description}</p>
      <div className="project-tags">
        {project.technologies.map((tech) => (
          <span key={tech.id}>{tech.name}</span>
        ))}
      </div>
    </div>
  )
}
