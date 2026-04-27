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
  Bootstrap: { devicon: 'devicon-bootstrap-plain', color: '#7952B3' },
  'Tailwind CSS': { devicon: 'devicon-tailwindcss-plain', color: '#06B6D4' },
  'React Native': { devicon: 'devicon-react-original', color: '#20232A' },
  'Web Forms': { labelIcon: 'WF', color: '#2563EB' },
  'Windows Forms': { devicon: 'devicon-dot-net-plain', color: '#512BD4' },
  'C#': { devicon: 'devicon-csharp-plain', color: '#239120' },
  'C++': { devicon: 'devicon-cplusplus-plain', color: '#00599C' },
  Cobol: { labelIcon: 'COB', color: '#475569' },
  '.NET': { customKey: 'dotnet', color: '#512BD4' },
  'ASP.NET Core': { devicon: 'devicon-dotnetcore-plain', color: '#512BD4' },
  Blazor: { labelIcon: 'BZ', color: '#7C3AED' },
  'Node.js': { devicon: 'devicon-nodejs-plain', color: '#339933' },
  'Nest.js': { devicon: 'devicon-nestjs-plain', color: '#E0234E' },
  'Next.js': { devicon: 'devicon-nextjs-plain', color: '#F3F4F6' },
  Express: { devicon: 'devicon-express-original', color: '#334155' },
  Flask: { devicon: 'devicon-flask-original', color: '#111827' },
  Laravel: { devicon: 'devicon-laravel-plain', color: '#FF2D20' },
  'Entity Framework': { labelIcon: 'EF', color: '#7C3AED' },
  SQLAlchemy: { labelIcon: 'SA', color: '#D97706' },
  JWT: { labelIcon: 'JWT', color: '#7C3AED' },
  RASA: { labelIcon: 'RA', color: '#5B21B6' },
  Python: { devicon: 'devicon-python-plain', color: '#3776AB' },
  Java: { devicon: 'devicon-java-plain', color: '#ED8B00' },
  Kotlin: { devicon: 'devicon-kotlin-plain', color: '#7F52FF' },
  PHP: { devicon: 'devicon-php-plain', color: '#777BB4' },
  Ruby: { devicon: 'devicon-ruby-plain', color: '#CC342D' },
  Rust: { devicon: 'devicon-rust-original', color: '#DEA584' },
  'Spring Boot': { devicon: 'devicon-spring-plain', color: '#6DB33F' },
  Microservicios: { labelIcon: 'MS', color: '#0EA5E9' },
  'Arquitectura en capas': { labelIcon: 'AC', color: '#0284C7' },
  'Arquitectura hexagonal': { labelIcon: 'AH', color: '#0369A1' },
  WebSockets: { labelIcon: 'WS', color: '#0F766E' },
  'SQL Server': { devicon: 'devicon-azuresqldatabase-plain', color: '#CC2927' },
  PostgreSQL: { devicon: 'devicon-postgresql-plain', color: '#4169E1' },
  MongoDB: { devicon: 'devicon-mongodb-plain', color: '#47A248' },
  MySQL: { devicon: 'devicon-mysql-plain', color: '#4479A1' },
  SQL: { labelIcon: 'SQL', color: '#2563EB' },
  SQLite: { devicon: 'devicon-sqlite-plain', color: '#003B57' },
  Access: { labelIcon: 'ACC', color: '#A4373A' },
  Firebase: { devicon: 'devicon-firebase-plain', color: '#FFCA28' },
  Git: { devicon: 'devicon-git-plain', color: '#F05032' },
  GitHub: { devicon: 'devicon-github-plain', color: '#181717' },
  'GitHub Actions': { devicon: 'devicon-githubactions-plain', color: '#2088FF' },
  Jira: { devicon: 'devicon-jira-plain', color: '#0052CC' },
  GitLab: { devicon: 'devicon-gitlab-plain', color: '#FC6D26' },
  Bitbucket: { devicon: 'devicon-bitbucket-original', color: '#0052CC' },
  Postman: { devicon: 'devicon-postman-plain', color: '#FF6C37' },
  Vitest: { labelIcon: 'VT', color: '#729B1B' },
  Playwright: { labelIcon: 'PW', color: '#2EAD33' },
  jUnit: { labelIcon: 'JU', color: '#DC2626' },
  Mockito: { labelIcon: 'MO', color: '#16A34A' },
  'React Testing Library': { labelIcon: 'RTL', color: '#EF4444' },
  'Jest DOM': { labelIcon: 'JDOM', color: '#C21325' },
  'Testing Library User Event': { labelIcon: 'UE', color: '#F97316' },
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
  'GitHub Pages': { labelIcon: 'GHP', color: '#222222' },
  DockerHub: { labelIcon: 'DH', color: '#2496ED' },
  DBeaver: { labelIcon: 'DB', color: '#7C3AED' },
  Gamma: { labelIcon: 'GA', color: '#7C3AED' },
}

const DEFAULT_SKILL: SkillIconMeta = { devicon: 'devicon-devicon-plain', color: '#64748b' } as const

export function getSkillMeta(skillName: string): SkillIconMeta {
  return SKILL_ICONS[skillName] ?? DEFAULT_SKILL
}
