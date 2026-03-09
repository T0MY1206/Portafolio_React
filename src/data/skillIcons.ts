/**
 * Devicon class (devicon-{name}-plain) y color por skill.
 * Para agregar un ítem: key = nombre exacto de profile.json,
 * valor = { devicon: 'devicon-XXXX-plain', color: '#hex' }.
 * Si no existe en Devicon: { customKey: 'xxx', color: '#hex' } y registrar el componente en SkillsSection.
 * Icones: https://devicon.dev
 */
export interface SkillIconMeta {
  devicon?: string
  color: string
  /** Si está definido, se usa un icono custom (ej. .NET) en lugar de devicon. */
  customKey?: string
}

export const SKILL_ICONS: Record<string, SkillIconMeta> = {
  HTML: { devicon: 'devicon-html5-plain', color: '#E34F26' },
  CSS: { devicon: 'devicon-css3-plain', color: '#1572B6' },
  JavaScript: { devicon: 'devicon-javascript-plain', color: '#F7DF1E' },
  'C#': { devicon: 'devicon-csharp-plain', color: '#239120' },
  '.NET': { customKey: 'dotnet', color: '#512BD4' },
  'Node.js': { devicon: 'devicon-nodejs-plain', color: '#339933' },
  Python: { devicon: 'devicon-python-plain', color: '#3776AB' },
  Java: { devicon: 'devicon-java-plain', color: '#ED8B00' },
  'Spring Boot': { devicon: 'devicon-spring-plain', color: '#6DB33F' },
  'SQL Server': { devicon: 'devicon-azuresqldatabase-plain', color: '#CC2927' },
  PostgreSQL: { devicon: 'devicon-postgresql-plain', color: '#4169E1' },
  GitHub: { devicon: 'devicon-github-plain', color: '#181717' },
  Jira: { devicon: 'devicon-jira-plain', color: '#0052CC' },
  Postman: { devicon: 'devicon-postman-plain', color: '#FF6C37' },
  'REST APIs': { devicon: 'devicon-express-original', color: '#009688' },
}

const DEFAULT_SKILL: SkillIconMeta = { devicon: 'devicon-devicon-plain', color: '#64748b' } as const

export function getSkillMeta(skillName: string): SkillIconMeta {
  return SKILL_ICONS[skillName] ?? DEFAULT_SKILL
}
