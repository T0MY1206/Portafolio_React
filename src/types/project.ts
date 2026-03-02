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
  images?: string[]
  repositoryUrl: string | null
  repositoryLinks?: ProjectRepositoryLink[]
  liveUrl: string | null
  technologies: Technology[]
}
