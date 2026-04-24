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
  /** Badge textual cuando no hay logo disponible en devicon. */
  labelIcon?: string
}

export const SKILL_ICONS: Record<string, SkillIconMeta> = {
  HTML: { devicon: 'devicon-html5-plain', color: '#E34F26' },
  CSS: { devicon: 'devicon-css3-plain', color: '#1572B6' },
  JavaScript: { devicon: 'devicon-javascript-plain', color: '#F7DF1E' },
  TypeScript: { devicon: 'devicon-typescript-plain', color: '#3178C6' },
  React: { devicon: 'devicon-react-original', color: '#61DAFB' },
  Angular: { devicon: 'devicon-angularjs-plain', color: '#DD0031' },
  'Tailwind CSS': { devicon: 'devicon-tailwindcss-plain', color: '#06B6D4' },
  'React Native': { devicon: 'devicon-react-original', color: '#20232A' },
  'Windows Forms': { devicon: 'devicon-dot-net-plain', color: '#512BD4' },
  'C#': { devicon: 'devicon-csharp-plain', color: '#239120' },
  '.NET': { customKey: 'dotnet', color: '#512BD4' },
  'Node.js': { devicon: 'devicon-nodejs-plain', color: '#339933' },
  'Nest.js': { devicon: 'devicon-nestjs-plain', color: '#E0234E' },
  'Next.js': { devicon: 'devicon-nextjs-plain', color: '#F3F4F6' },
  Express: { devicon: 'devicon-express-original', color: '#334155' },
  Laravel: { devicon: 'devicon-laravel-plain', color: '#FF2D20' },
  JWT: { labelIcon: 'JWT', color: '#7C3AED' },
  Python: { devicon: 'devicon-python-plain', color: '#3776AB' },
  Java: { devicon: 'devicon-java-plain', color: '#ED8B00' },
  'Spring Boot': { devicon: 'devicon-spring-plain', color: '#6DB33F' },
  'SQL Server': { devicon: 'devicon-azuresqldatabase-plain', color: '#CC2927' },
  PostgreSQL: { devicon: 'devicon-postgresql-plain', color: '#4169E1' },
  MongoDB: { devicon: 'devicon-mongodb-plain', color: '#47A248' },
  MySQL: { devicon: 'devicon-mysql-plain', color: '#4479A1' },
  SQLite: { devicon: 'devicon-sqlite-plain', color: '#003B57' },
  Access: { labelIcon: 'ACC', color: '#A4373A' },
  Firebase: { devicon: 'devicon-firebase-plain', color: '#FFCA28' },
  Git: { devicon: 'devicon-git-plain', color: '#F05032' },
  GitHub: { devicon: 'devicon-github-plain', color: '#181717' },
  'GitHub Actions': { devicon: 'devicon-githubactions-plain', color: '#2088FF' },
  Jira: { devicon: 'devicon-jira-plain', color: '#0052CC' },
  Postman: { devicon: 'devicon-postman-plain', color: '#FF6C37' },
  Bruno: { labelIcon: 'BR', color: '#F59E0B' },
  'REST APIs': { labelIcon: 'API', color: '#0EA5A4' },
  UiPath: { labelIcon: 'UI', color: '#FA4616' },
  Docker: { devicon: 'devicon-docker-plain', color: '#2496ED' },
  Jenkins: { devicon: 'devicon-jenkins-line', color: '#D24939' },
  Linux: { devicon: 'devicon-linux-plain', color: '#FCC624' },
  Nginx: { devicon: 'devicon-nginx-original', color: '#009639' },
  'Swagger/OpenAPI': { devicon: 'devicon-swagger-plain', color: '#85EA2D' },
  'PostgreSQL pgAdmin': { labelIcon: 'PGA', color: '#336791' },
  Cursor: { labelIcon: 'CU', color: '#5B8CFF' },
  'GitHub Copilot': { labelIcon: 'COP', color: '#111827' },
  ChatGPT: { labelIcon: 'GPT', color: '#10A37F' },
  Gemini: { labelIcon: 'GEM', color: '#1A73E8' },
  'Claude Code': { labelIcon: 'CC', color: '#D97706' },
  Figma: { devicon: 'devicon-figma-plain', color: '#A259FF' },
  Supabase: { devicon: 'devicon-supabase-plain', color: '#3ECF8E' },
  Render: { labelIcon: 'REN', color: '#46E3B7' },
  Vercel: { devicon: 'devicon-vercel-original', color: '#111827' },
  Netlify: { devicon: 'devicon-netlify-plain', color: '#00C7B7' },
  Gamma: { labelIcon: 'GA', color: '#7C3AED' },
}

const DEFAULT_SKILL: SkillIconMeta = { devicon: 'devicon-devicon-plain', color: '#64748b' } as const

export function getSkillMeta(skillName: string): SkillIconMeta {
  return SKILL_ICONS[skillName] ?? DEFAULT_SKILL
}
