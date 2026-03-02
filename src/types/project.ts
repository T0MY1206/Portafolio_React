export interface Technology {
  id: number
  name: string
  type: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOL'
  yearsOfExperience: number
  isCurrentlyUsed: boolean
}

export interface ProjectRepositoryLink {
  labelKey: string
  url: string
}

export interface Project {
  id: number
  name: string
  description: string
  imageUrl: string | null
  /** Varias imágenes para el carrusel del modal (si no se define, se usa imageUrl si existe) */
  images?: string[]
  repositoryUrl: string | null
  repositoryLinks?: ProjectRepositoryLink[]
  liveUrl: string | null
  technologies: Technology[]
}
