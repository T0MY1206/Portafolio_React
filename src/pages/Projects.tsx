import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import GalleryModal from '../components/GalleryModal'
import { projectService } from '../services/projectService'
import './Projects.css'

// Tipos definidos localmente para evitar problemas de importación
type Technology = {
  id: number
  name: string
  type: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOL'
  yearsOfExperience: number
  isCurrentlyUsed: boolean
}

type Project = {
  id: number
  name: string
  description: string
  imageUrl: string | null
  repositoryUrl: string | null
  liveUrl: string | null
  technologies: Technology[]
}

const Projects = () => {
  const { t } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Imágenes de Bocato Pasteleria
  const bocatoImages = [
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_193011-092d6b04-73d2-44fc-84a1-b4b10a92a1a1.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_195451-b7c80d54-644c-4f5c-9c84-708c8c3adfef.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_200028-5d424bad-aa9c-4562-903d-e532fa547444.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_200726-aa4576fd-39ba-4fc5-a026-c67d507dc260.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_200739-c9e59828-24c0-476a-ae11-e5ccbc10b6ca.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_200748-7932bb7c-3bea-4887-b180-629b7247e377.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_201255-4bd9f552-1af8-4cdb-b1d0-35af06d539c3.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_201334-a40f68f6-e402-4f38-aa18-23269a8c9115.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_201652-b9850dda-d902-489b-b9ea-4ffb517956be.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_202148-d3e749fa-997b-404b-aebf-24f73c67769a.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_202300-81362377-8112-44a3-8ff3-21c889e99dd1.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221021-9e84e3db-750f-4c4d-845e-1ccf4d188a0f.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221032-5d3a4a7b-a41a-42e3-a9f2-06cb28b7295d.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221043-878f130b-25d5-4342-912f-989a0418ebf0.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221055-9fba264b-1758-4a94-879a-2fab93912127.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221102-1ea290a2-2a93-47d2-a00b-eb3842ee516c.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221107-595a8c56-8047-4cad-84fa-f4cf95678e03.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221116-b7e9d964-fe0e-49b2-9bfe-e8dfe37feba5.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_Captura_de_pantalla_2025-12-11_221123-1a1b2c85-7498-4e60-8afb-0c01f3867020.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-044b4da7-4764-4630-9d6f-b43f70c1421b.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-075e1646-7f80-4812-97ed-55e25617e80f.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-0b418b9f-c153-4599-a682-1609841c2fbc.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-2f3066d4-e8d7-42e1-a61e-b25e86ccf3f2.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-60a6383b-45d6-4816-bb9d-ae66bf64a2f4.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-6d905e58-55d5-4cef-8eb9-ccef0553fefc.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-70067522-c68c-4a51-a3b8-2869f17d1224.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-786b2579-1f7e-494d-b986-60f9e52efe49.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-9ed95ea7-79eb-46f3-aeae-376eee138a7f.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-a489309e-ab8f-40ea-8557-2735feca1807.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-aec22a61-1600-4ca3-9fdd-2a33a7d14b45.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-b7357e1f-db94-492f-8071-cdf5bde501b7.png',
    '/assets/bocato/c__Users_tomas_AppData_Roaming_Cursor_User_workspaceStorage_697e9fbe3ecaa62adccfad828f533f29_images_image-db480f89-871e-41b7-86c8-1d204b5bee3e.png'
  ]

  // Cargar proyectos del backend
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await projectService.getAllProjects()
        setProjects(data)
      } catch (err) {
        setError('Error al cargar los proyectos. Por favor, intenta de nuevo más tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [])

  // Verificar si un proyecto es Bocato Pasteleria
  const isBocatoProject = (project: Project) => {
    return project.name.toLowerCase().includes('bocato')
  }

  // Manejar click en tarjeta de proyecto
  const handleProjectClick = (project: Project) => {
    if (isBocatoProject(project)) {
      setIsModalOpen(true)
    }
  }

  return (
    <section className="projects">
      <div className="projects-container">
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="projects-description">{t('projects.description')}</p>
        
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
            Cargando proyectos...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--accent)' }}>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="projects-grid">
            {projects.map((project) => {
              const isBocato = isBocatoProject(project)
              return (
                <div
                  key={project.id}
                  className={`project-card ${isBocato ? 'project-card-clickable' : ''}`}
                  onClick={() => isBocato && handleProjectClick(project)}
                  role={isBocato ? 'button' : undefined}
                  tabIndex={isBocato ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isBocato && (e.key === 'Enter' || e.key === ' ')) {
                      handleProjectClick(project)
                    }
                  }}
                >
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech.id}>{tech.name}</span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <GalleryModal
        images={bocatoImages}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t('projects.bocato.title')}
      />
    </section>
  )
}

export default Projects

