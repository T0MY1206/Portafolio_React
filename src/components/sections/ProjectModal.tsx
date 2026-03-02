import { useState, useEffect, useRef } from 'react'
import type { Project } from '../../types/project'
import { useLanguage } from '../../context/LanguageContext'
import { getProjectImages } from '../../utils/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

function getImageAlt(projectName: string, label: string, index: number): string {
  return `${projectName} - ${label} ${index + 1}`
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const { t } = useLanguage()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const modalImages = getProjectImages(project)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const imageAltLabel = t('projects.imageAlt')

  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  const hasCarousel = modalImages.length > 0
  const hasMultipleImages = modalImages.length > 1
  const n = modalImages.length

  const goPrev = () =>
    setCarouselIndex((i) => (i <= 0 ? n - 1 : i - 1))
  const goNext = () =>
    setCarouselIndex((i) => (i >= n - 1 ? 0 : i + 1))

  return (
    <div
      className="project-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <header className="project-modal-header">
          <div className="project-modal-title-wrap">
            <h2 id="project-modal-title" className="project-modal-title">
              {project.name}
            </h2>
            {(project.repositoryLinks?.length || project.repositoryUrl) && (
              <div className="project-modal-repo">
                {project.repositoryLinks?.length ? (
                  project.repositoryLinks.map((link, i) => (
                    <span key={link.labelKey}>
                      {i > 0 && ' · '}
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-modal-repo-link"
                      >
                        {t(link.labelKey)}
                      </a>
                    </span>
                  ))
                ) : (
                  project.repositoryUrl && (
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-repo-link"
                    >
                      {t('projects.viewRepo')}
                    </a>
                  )
                )}
              </div>
            )}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="project-modal-close"
            onClick={onClose}
            aria-label={t('projects.closeModal')}
          >
            ×
          </button>
        </header>
        <div className={hasCarousel ? '' : 'project-modal-content-center'}>
          <p className="project-modal-description">{project.description}</p>
          <div className="project-modal-tags">
            {project.technologies.map((tech) => (
              <span key={tech.id}>{tech.name}</span>
            ))}
          </div>
        </div>
        {hasCarousel && (
          <div className="project-modal-carousel">
            <div className="project-modal-carousel-wrap">
              {hasMultipleImages && (
                <button
                  type="button"
                  className="project-modal-carousel-arrow project-modal-carousel-arrow-left"
                  onClick={goPrev}
                  aria-label={t('projects.carouselPrev')}
                >
                  ‹
                </button>
              )}
              {hasMultipleImages && (
                <div className="project-modal-carousel-row project-modal-carousel-row-left">
                  {[1, 2, 3].map((offset) => {
                    const idx = (carouselIndex - offset + n * 2) % n
                    return (
                      <button
                        key={`l-${offset}`}
                        type="button"
                        className="project-modal-carousel-polaroid project-modal-carousel-polaroid-side"
                        onClick={() => setCarouselIndex(idx)}
                      >
                        <img
                          src={modalImages[idx]}
                          alt={getImageAlt(project.name, imageAltLabel, idx)}
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    )
                  })}
                </div>
              )}
              <div className="project-modal-carousel-center">
                <div className="project-modal-carousel-polaroid project-modal-carousel-polaroid-main">
                  <img
                    src={modalImages[carouselIndex]}
                    alt={getImageAlt(project.name, imageAltLabel, carouselIndex)}
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </div>
              {hasMultipleImages && (
                <div className="project-modal-carousel-row project-modal-carousel-row-right">
                  {[1, 2, 3].map((offset) => {
                    const idx = (carouselIndex + offset) % n
                    return (
                      <button
                        key={`r-${offset}`}
                        type="button"
                        className="project-modal-carousel-polaroid project-modal-carousel-polaroid-side"
                        onClick={() => setCarouselIndex(idx)}
                      >
                        <img
                          src={modalImages[idx]}
                          alt={getImageAlt(project.name, imageAltLabel, idx)}
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    )
                  })}
                </div>
              )}
              {hasMultipleImages && (
                <button
                  type="button"
                  className="project-modal-carousel-arrow project-modal-carousel-arrow-right"
                  onClick={goNext}
                  aria-label={t('projects.carouselNext')}
                >
                  ›
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectModal
