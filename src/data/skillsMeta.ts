/**
 * Optional metadata for each skill (years, description) for the 3D book interior.
 * Add entries here to show custom text; missing skills get defaults.
 */
export interface SkillMeta {
  years: string
  description: string
}

const meta: Record<string, SkillMeta> = {
  HTML: { years: '4+', description: 'Semantic markup, accessibility, responsive layouts.' },
  CSS: { years: '4+', description: 'Layouts, animations, custom properties, preprocessors.' },
  JavaScript: { years: '4+', description: 'ES6+, DOM, async, tooling and build systems.' },
  'C#': { years: '3+', description: 'Backend services, APIs, and .NET ecosystem.' },
  '.NET': { years: '3+', description: 'ASP.NET Core, Entity Framework, REST APIs.' },
  'Node.js': { years: '2+', description: 'Server-side JS, Express, tooling.' },
  Python: { years: '2+', description: 'Scripting, automation, and backend services.' },
  Java: { years: '2+', description: 'Enterprise applications and Spring ecosystem.' },
  'Spring Boot': { years: '2+', description: 'REST APIs, JPA, security, and microservices.' },
  'SQL Server': { years: '3+', description: 'Queries, modeling, and BI integration.' },
  PostgreSQL: { years: '2+', description: 'Relational modeling, migrations, and APIs.' },
  GitHub: { years: '4+', description: 'Version control, CI/CD, and collaboration.' },
  Jira: { years: '3+', description: 'Agile boards, sprints, and issue tracking.' },
  Postman: { years: '3+', description: 'API testing, collections, and documentation.' },
  'REST APIs': { years: '4+', description: 'Design, implementation, and consumption.' },
}

const defaultMeta: SkillMeta = {
  years: '—',
  description: 'Used in professional and personal projects.',
}

export function getSkillMeta(skillName: string): SkillMeta {
  return meta[skillName] ?? defaultMeta
}
