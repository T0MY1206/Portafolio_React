const API_BASE_URL = 'https://portfolio-backend-xzbv.onrender.com/api'

// Tipos locales (no exportados para evitar problemas con verbatimModuleSyntax)
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

export const projectService = {
  /**
   * Obtiene todos los proyectos del backend
   * @param lang - Idioma para las traducciones ('es' o 'en')
   */
  async getAllProjects(lang: string = 'es'): Promise<Project[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects?lang=${lang}`)
      
      if (!response.ok) {
        throw new Error(`Error al obtener proyectos: ${response.statusText}`)
      }
      
      const projects: Project[] = await response.json()
      return projects
    } catch (error) {
      console.error('Error al obtener proyectos:', error)
      throw error
    }
  },

  /**
   * Obtiene un proyecto por su ID
   * @param id - ID del proyecto
   * @param lang - Idioma para las traducciones ('es' o 'en')
   */
  async getProjectById(id: number, lang: string = 'es'): Promise<Project> {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}?lang=${lang}`)
      
      if (!response.ok) {
        throw new Error(`Error al obtener el proyecto: ${response.statusText}`)
      }
      
      const project: Project = await response.json()
      return project
    } catch (error) {
      console.error('Error al obtener el proyecto:', error)
      throw error
    }
  }
}
