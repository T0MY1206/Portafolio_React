import type { Project } from '../types/project'

export function getProjectImages(project: Project): string[] {
  if (project.images?.length) return project.images
  if (project.imageUrl) return [project.imageUrl]
  return []
}
