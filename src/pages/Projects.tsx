import { useLanguage } from '../context/LanguageContext'
import type { Project, Technology } from '../types/project'
import './Projects.css'

// Proyectos hardcodeados (página estática)
const MOCK_TECHNOLOGIES: Record<string, Technology> = {
  react: { id: 1, name: 'React', type: 'FRONTEND', yearsOfExperience: 2, isCurrentlyUsed: true },
  ts: { id: 2, name: 'TypeScript', type: 'FRONTEND', yearsOfExperience: 2, isCurrentlyUsed: true },
  vite: { id: 3, name: 'Vite', type: 'TOOL', yearsOfExperience: 1, isCurrentlyUsed: true },
  angular: { id: 4, name: 'Angular', type: 'FRONTEND', yearsOfExperience: 1, isCurrentlyUsed: true },
  html: { id: 5, name: 'HTML/CSS', type: 'FRONTEND', yearsOfExperience: 3, isCurrentlyUsed: true },
  node: { id: 6, name: 'Node.js', type: 'BACKEND', yearsOfExperience: 1, isCurrentlyUsed: true },
}

function buildMockProjects(t: (key: string) => string): Project[] {
  return [
    {
      id: 1,
      name: t('projects.portfolioReact.title'),
      description: t('projects.portfolioReact.description'),
      imageUrl: null,
      repositoryUrl: null,
      liveUrl: null,
      technologies: [MOCK_TECHNOLOGIES.react, MOCK_TECHNOLOGIES.ts, MOCK_TECHNOLOGIES.vite],
    },
    {
      id: 2,
      name: t('projects.portfolioAngular.title'),
      description: t('projects.portfolioAngular.description'),
      imageUrl: null,
      repositoryUrl: null,
      liveUrl: null,
      technologies: [MOCK_TECHNOLOGIES.angular, MOCK_TECHNOLOGIES.ts, MOCK_TECHNOLOGIES.html],
    },
  ]
}

const Projects = () => {
  const { t } = useLanguage()
  const projects = buildMockProjects(t)

  return (
    <section className="projects">
      <div className="projects-container">
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="projects-description">{t('projects.description')}</p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.technologies.map((tech) => (
                  <span key={tech.id}>{tech.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
