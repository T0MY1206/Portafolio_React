import { useLanguage } from '../context/LanguageContext'
import type { Project, Technology } from '../types/project'
import './Projects.css'

const T = (id: number, name: string, type: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOL'): Technology =>
  ({ id, name, type, yearsOfExperience: 1, isCurrentlyUsed: true })

const TECHS: Record<string, Technology> = {
  python: T(1, 'Python', 'BACKEND'),
  fastapi: T(2, 'FastAPI', 'BACKEND'),
  uvicorn: T(3, 'Uvicorn', 'BACKEND'),
  openpyxl: T(4, 'openpyxl', 'TOOL'),
  html: T(5, 'HTML/CSS', 'FRONTEND'),
  js: T(6, 'JavaScript', 'FRONTEND'),
  node: T(7, 'Node.js', 'BACKEND'),
  express: T(8, 'Express', 'BACKEND'),
  ssas: T(9, 'Analysis Services', 'DATABASE'),
  angular: T(10, 'Angular', 'FRONTEND'),
  ts: T(11, 'TypeScript', 'FRONTEND'),
  bootstrap: T(12, 'Bootstrap', 'FRONTEND'),
  rxjs: T(13, 'RxJS', 'FRONTEND'),
  dotnet: T(14, '.NET', 'BACKEND'),
  aspnet: T(15, 'ASP.NET Core', 'BACKEND'),
  ef: T(16, 'Entity Framework', 'BACKEND'),
  sqlserver: T(17, 'SQL Server', 'DATABASE'),
  swagger: T(18, 'Swagger', 'TOOL'),
  java: T(19, 'Java', 'BACKEND'),
  springboot: T(20, 'Spring Boot', 'BACKEND'),
  jpa: T(21, 'JPA/Hibernate', 'BACKEND'),
  mysql: T(22, 'MySQL', 'DATABASE'),
  docker: T(23, 'Docker', 'TOOL'),
  postgresql: T(24, 'PostgreSQL', 'DATABASE'),
  jwt: T(25, 'JWT', 'BACKEND'),
  testcontainers: T(26, 'Testcontainers', 'TOOL'),
  reactnative: T(27, 'React Native', 'FRONTEND'),
  expo: T(28, 'Expo', 'FRONTEND'),
  asyncstorage: T(29, 'AsyncStorage', 'FRONTEND'),
  contextapi: T(30, 'Context API', 'FRONTEND'),
  php: T(31, 'PHP', 'BACKEND'),
  laravel: T(32, 'Laravel', 'BACKEND'),
  inertia: T(33, 'Inertia.js', 'FRONTEND'),
  react: T(34, 'React', 'FRONTEND'),
  vite: T(35, 'Vite', 'TOOL'),
  tailwind: T(36, 'Tailwind CSS', 'FRONTEND'),
  csharp: T(37, 'C#', 'BACKEND'),
  dotnetfw: T(38, '.NET Framework', 'BACKEND'),
  winforms: T(39, 'Windows Forms', 'FRONTEND'),
  adonet: T(40, 'ADO.NET', 'BACKEND'),
  openapi: T(41, 'OpenAPI/Scalar', 'TOOL'),
  signals: T(42, 'Angular Signals', 'FRONTEND'),
  maven: T(43, 'Maven', 'TOOL'),
  dockercompose: T(44, 'Docker Compose', 'TOOL'),
}

const REPO_URLS: Record<string, string | null> = {
  contadores: 'https://github.com/T0MY1206/proyecto-contadores',
  bocato: 'https://github.com/T0MY1206/Bocato-pasteleria',
  backendJava: 'https://github.com/T0MY1206/Proyecto-Backend-Java',
  taskFlowApi: 'https://github.com/T0MY1206/taskflow-api',
  pronafe: 'https://github.com/T0MY1206/Proyecto-Pronafe',
  portfolioMobile: 'https://github.com/T0MY1206/Portafolio_Mobile',
  urlShortener: 'https://github.com/T0MY1206/url-shortener-dotnet',
  windowsForm: 'https://github.com/T0MY1206/Proyecto-Windows-Form',
  awInternetSales: 'https://github.com/T0MY1206/Proyecto_Analysis-Service',
  loginOauth: 'https://github.com/T0MY1206/Login-con-Google',
}

const REPO_LINKS: Record<string, { labelKey: string; url: string }[]> = {
  tarjetaCredito: [
    { labelKey: 'projects.repoFrontend', url: 'https://github.com/T0MY1206/Proyecto-Angular-Tarjeta-de-Credito' },
    { labelKey: 'projects.repoBackend', url: 'https://github.com/T0MY1206/Backend-Proyecto-Angular-Tarjeta-Credito' },
  ],
}

function buildProjects(t: (key: string) => string): Project[] {
  const repo = (key: keyof typeof REPO_URLS) => REPO_URLS[key] ?? null
  const repoLinks = (key: keyof typeof REPO_LINKS) => REPO_LINKS[key]
  return [
    { id: 1, name: t('projects.contadores.title'), description: t('projects.contadores.description'), imageUrl: null, repositoryUrl: repo('contadores'), liveUrl: null, technologies: [TECHS.python, TECHS.fastapi, TECHS.uvicorn, TECHS.openpyxl, TECHS.html, TECHS.js] },
    { id: 2, name: t('projects.bocato.title'), description: t('projects.bocato.description'), imageUrl: null, repositoryUrl: repo('bocato'), liveUrl: null, technologies: [TECHS.angular, TECHS.ts, TECHS.bootstrap, TECHS.signals] },
    { id: 3, name: t('projects.backendJava.title'), description: t('projects.backendJava.description'), imageUrl: null, repositoryUrl: repo('backendJava'), liveUrl: null, technologies: [TECHS.java, TECHS.springboot, TECHS.jpa, TECHS.mysql, TECHS.docker, TECHS.maven] },
    { id: 4, name: t('projects.taskFlowApi.title'), description: t('projects.taskFlowApi.description'), imageUrl: null, repositoryUrl: repo('taskFlowApi'), liveUrl: null, technologies: [TECHS.java, TECHS.springboot, TECHS.postgresql, TECHS.jwt, TECHS.swagger, TECHS.testcontainers, TECHS.docker] },
    { id: 5, name: t('projects.pronafe.title'), description: t('projects.pronafe.description'), imageUrl: null, repositoryUrl: repo('pronafe'), liveUrl: null, technologies: [TECHS.php, TECHS.laravel, TECHS.inertia, TECHS.react, TECHS.ts, TECHS.vite, TECHS.tailwind, TECHS.mysql, TECHS.docker] },
    { id: 6, name: t('projects.tarjetaCredito.title'), description: t('projects.tarjetaCredito.description'), imageUrl: null, repositoryUrl: null, repositoryLinks: repoLinks('tarjetaCredito'), liveUrl: null, technologies: [TECHS.angular, TECHS.ts, TECHS.bootstrap, TECHS.rxjs, TECHS.dotnet, TECHS.aspnet, TECHS.ef, TECHS.sqlserver, TECHS.swagger] },
    { id: 7, name: t('projects.portfolioMobile.title'), description: t('projects.portfolioMobile.description'), imageUrl: null, repositoryUrl: repo('portfolioMobile'), liveUrl: null, technologies: [TECHS.reactnative, TECHS.expo, TECHS.js, TECHS.asyncstorage, TECHS.contextapi] },
    { id: 8, name: t('projects.urlShortener.title'), description: t('projects.urlShortener.description'), imageUrl: null, repositoryUrl: repo('urlShortener'), liveUrl: null, technologies: [TECHS.csharp, TECHS.dotnet, TECHS.aspnet, TECHS.openapi] },
    { id: 9, name: t('projects.windowsForm.title'), description: t('projects.windowsForm.description'), imageUrl: null, repositoryUrl: repo('windowsForm'), liveUrl: null, technologies: [TECHS.csharp, TECHS.dotnetfw, TECHS.winforms, TECHS.sqlserver, TECHS.adonet] },
    { id: 10, name: t('projects.awInternetSales.title'), description: t('projects.awInternetSales.description'), imageUrl: null, repositoryUrl: repo('awInternetSales'), liveUrl: null, technologies: [TECHS.ssas] },
    { id: 11, name: t('projects.loginOauth.title'), description: t('projects.loginOauth.description'), imageUrl: null, repositoryUrl: repo('loginOauth'), liveUrl: null, technologies: [TECHS.node, TECHS.express] },
  ]
}

const Projects = () => {
  const { t } = useLanguage()
  const projects = buildProjects(t)

  return (
    <section className="projects">
      <div className="projects-container">
        <h1 className="page-title">{t('projects.title')}</h1>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-card-header">
                <h3>{project.name}</h3>
                {(project.repositoryLinks?.length || project.repositoryUrl) && (
                  <div className="project-repo-links">
                    {project.repositoryLinks?.length
                      ? project.repositoryLinks.map((link) => (
                          <a
                            key={link.labelKey}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-repo-link"
                            aria-label={t(link.labelKey)}
                          >
                            {t(link.labelKey)}
                          </a>
                        ))
                      : project.repositoryUrl && (
                          <a
                            href={project.repositoryUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-repo-link"
                            aria-label={t('projects.viewRepo')}
                          >
                            {t('projects.viewRepo')}
                          </a>
                        )}
                  </div>
                )}
              </div>
              <p className="project-card-description">{project.description}</p>
              <div className="project-tags">
                {project.technologies.map((tech) => (
                  <span key={tech.id}>{tech.name}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
