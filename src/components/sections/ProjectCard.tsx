import type { Project } from '../../types/project'
import { getProjectImages } from '../../utils/projects'

interface ProjectCardProps {
  project: Project
  isHovered: boolean
  currentImageIndex: number
  onSelect: (project: Project) => void
  onMouseEnter: (project: Project) => void
  onMouseLeave: () => void
  viewDetailsLabel: string
  viewRepoLabel: string
  t: (key: string) => string
}

const ProjectCard = ({
  project,
  isHovered,
  currentImageIndex,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  viewDetailsLabel,
  viewRepoLabel,
  t,
}: ProjectCardProps) => {
  const images = getProjectImages(project)

  const handleKeyDown = (e: React.KeyboardEvent, p: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(p)
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
      onKeyDown={(e) => handleKeyDown(e, project)}
      aria-label={viewDetailsLabel}
    >
      {images.length > 0 && (
        <>
          <div className="project-card-preview" aria-hidden>
            {images.map((src, i) => {
              const idx = isHovered ? currentImageIndex : 0
              const isEmphasized = i === idx
              return (
                <div
                  key={i}
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
                    aria-label={viewRepoLabel}
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

export default ProjectCard
