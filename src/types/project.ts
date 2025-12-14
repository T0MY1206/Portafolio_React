export interface Technology {
  id: number
  name: string
  type: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOL'
  yearsOfExperience: number
  isCurrentlyUsed: boolean
}

export interface Project {
  id: number
  name: string
  description: string
  imageUrl: string | null
  repositoryUrl: string | null
  liveUrl: string | null
  technologies: Technology[]
}
