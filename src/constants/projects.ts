import type { Project, Technology } from '../types/project'

const createTech = (
  id: number,
  name: string,
  type: 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'TOOL'
): Technology => ({
  id,
  name,
  type,
  yearsOfExperience: 1,
  isCurrentlyUsed: true,
})

export const TECHS: Record<string, Technology> = {
  python: createTech(1, 'Python', 'BACKEND'),
  fastapi: createTech(2, 'FastAPI', 'BACKEND'),
  uvicorn: createTech(3, 'Uvicorn', 'BACKEND'),
  openpyxl: createTech(4, 'openpyxl', 'TOOL'),
  html: createTech(5, 'HTML/CSS', 'FRONTEND'),
  js: createTech(6, 'JavaScript', 'FRONTEND'),
  node: createTech(7, 'Node.js', 'BACKEND'),
  express: createTech(8, 'Express', 'BACKEND'),
  ssas: createTech(9, 'Analysis Services', 'DATABASE'),
  angular: createTech(10, 'Angular', 'FRONTEND'),
  ts: createTech(11, 'TypeScript', 'FRONTEND'),
  bootstrap: createTech(12, 'Bootstrap', 'FRONTEND'),
  rxjs: createTech(13, 'RxJS', 'FRONTEND'),
  dotnet: createTech(14, '.NET', 'BACKEND'),
  aspnet: createTech(15, 'ASP.NET Core', 'BACKEND'),
  ef: createTech(16, 'Entity Framework', 'BACKEND'),
  sqlserver: createTech(17, 'SQL Server', 'DATABASE'),
  swagger: createTech(18, 'Swagger', 'TOOL'),
  java: createTech(19, 'Java', 'BACKEND'),
  springboot: createTech(20, 'Spring Boot', 'BACKEND'),
  jpa: createTech(21, 'JPA/Hibernate', 'BACKEND'),
  mysql: createTech(22, 'MySQL', 'DATABASE'),
  docker: createTech(23, 'Docker', 'TOOL'),
  postgresql: createTech(24, 'PostgreSQL', 'DATABASE'),
  jwt: createTech(25, 'JWT', 'BACKEND'),
  testcontainers: createTech(26, 'Testcontainers', 'TOOL'),
  reactnative: createTech(27, 'React Native', 'FRONTEND'),
  expo: createTech(28, 'Expo', 'FRONTEND'),
  asyncstorage: createTech(29, 'AsyncStorage', 'FRONTEND'),
  contextapi: createTech(30, 'Context API', 'FRONTEND'),
  php: createTech(31, 'PHP', 'BACKEND'),
  laravel: createTech(32, 'Laravel', 'BACKEND'),
  inertia: createTech(33, 'Inertia.js', 'FRONTEND'),
  react: createTech(34, 'React', 'FRONTEND'),
  vite: createTech(35, 'Vite', 'TOOL'),
  tailwind: createTech(36, 'Tailwind CSS', 'FRONTEND'),
  csharp: createTech(37, 'C#', 'BACKEND'),
  dotnetfw: createTech(38, '.NET Framework', 'BACKEND'),
  winforms: createTech(39, 'Windows Forms', 'FRONTEND'),
  adonet: createTech(40, 'ADO.NET', 'BACKEND'),
  openapi: createTech(41, 'OpenAPI/Scalar', 'TOOL'),
  signals: createTech(42, 'Angular Signals', 'FRONTEND'),
  maven: createTech(43, 'Maven', 'TOOL'),
  camunda: createTech(44, 'Camunda 7', 'BACKEND'),
  springcloud: createTech(45, 'Spring Cloud', 'BACKEND'),
  eureka: createTech(46, 'Eureka', 'TOOL'),
  prometheus: createTech(47, 'Prometheus', 'TOOL'),
  zipkin: createTech(48, 'Zipkin', 'TOOL'),
  kafka: createTech(49, 'Kafka', 'TOOL'),
  zookeeper: createTech(50, 'Zookeeper', 'TOOL'),
  gateway: createTech(51, 'API Gateway', 'BACKEND'),
  csv: createTech(52, 'CSV Persistence', 'DATABASE'),
}

export const REPO_URLS: Record<string, string | null> = {
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
  camundaBackend: 'https://github.com/T0MY1206/camunda-backend',
  microservicesObservability: 'https://github.com/T0MY1206/springboot-microservices-observability',
  talentoTechBackendJava: 'https://github.com/T0MY1206/Talento-Tech-Curso-Backend-Java',
  proyectoKafka: 'https://github.com/T0MY1206/Proyecto-Kafka',
}

export const REPO_LINKS: Record<string, { labelKey: string; url: string }[]> = {
  tarjetaCredito: [
    { labelKey: 'projects.repoFrontend', url: 'https://github.com/T0MY1206/Proyecto-Angular-Tarjeta-de-Credito' },
    { labelKey: 'projects.repoBackend', url: 'https://github.com/T0MY1206/Backend-Proyecto-Angular-Tarjeta-Credito' },
  ],
}

const BOCATO_IMAGES = Object.values(
  import.meta.glob('../assets/bocato/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const CONTADORES_IMAGES = Object.values(
  import.meta.glob('../assets/contadores/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const backendJavaUrls = Object.values(
  import.meta.glob('../assets/backendJava/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const taskFlowApiUrls = Object.values(
  import.meta.glob('../assets/taskFlowApi/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const pronafeUrls = Object.values(
  import.meta.glob('../assets/pronafe/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const tarjetaCreditoUrls = Object.values(
  import.meta.glob('../assets/tarjetaCredito/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const portfolioMobileUrls = Object.values(
  import.meta.glob('../assets/portfolioMobile/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const urlShortenerUrls = Object.values(
  import.meta.glob('../assets/urlShortener/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const windowsFormUrls = Object.values(
  import.meta.glob('../assets/windowsForm/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const awInternetSalesUrls = Object.values(
  import.meta.glob('../assets/awInternetSales/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const loginOauthUrls = Object.values(
  import.meta.glob('../assets/loginOauth/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const camundaBackendUrls = Object.values(
  import.meta.glob('../assets/camundaBackend/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const microservicesObservabilityUrls = Object.values(
  import.meta.glob('../assets/microservicesObservability/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const talentoTechBackendJavaUrls = Object.values(
  import.meta.glob('../assets/talentoTechBackendJava/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

const proyectoKafkaUrls = Object.values(
  import.meta.glob('../assets/proyectoKafka/*.{png,jpg,jpeg,webp,avif}', {
    eager: true,
    query: '?url',
    import: 'default',
  })
) as string[]

export function buildProjects(t: (key: string) => string): Project[] {
  const repo = (key: keyof typeof REPO_URLS) => REPO_URLS[key] ?? null
  const repoLinks = (key: keyof typeof REPO_LINKS) => REPO_LINKS[key]
  return [
    {
      id: 1,
      name: t('projects.contadores.title'),
      description: t('projects.contadores.description'),
      imageUrl: null,
      images: CONTADORES_IMAGES,
      repositoryUrl: repo('contadores'),
      liveUrl: null,
      technologies: [TECHS.python, TECHS.fastapi, TECHS.uvicorn, TECHS.openpyxl, TECHS.html, TECHS.js],
    },
    {
      id: 2,
      name: t('projects.bocato.title'),
      description: t('projects.bocato.description'),
      imageUrl: null,
      images: BOCATO_IMAGES,
      repositoryUrl: repo('bocato'),
      liveUrl: null,
      technologies: [TECHS.angular, TECHS.ts, TECHS.bootstrap, TECHS.signals],
    },
    {
      id: 3,
      name: t('projects.camundaBackend.title'),
      description: t('projects.camundaBackend.description'),
      imageUrl: null,
      images: camundaBackendUrls,
      repositoryUrl: repo('camundaBackend'),
      liveUrl: null,
      technologies: [TECHS.java, TECHS.springboot, TECHS.camunda, TECHS.postgresql, TECHS.openapi, TECHS.swagger, TECHS.docker, TECHS.maven],
    },
    {
      id: 4,
      name: t('projects.microservicesObservability.title'),
      description: t('projects.microservicesObservability.description'),
      imageUrl: null,
      images: microservicesObservabilityUrls,
      repositoryUrl: repo('microservicesObservability'),
      liveUrl: null,
      technologies: [TECHS.java, TECHS.springboot, TECHS.springcloud, TECHS.eureka, TECHS.gateway, TECHS.jwt, TECHS.postgresql, TECHS.prometheus, TECHS.zipkin, TECHS.maven, TECHS.docker],
    },
    {
      id: 5,
      name: t('projects.proyectoKafka.title'),
      description: t('projects.proyectoKafka.description'),
      imageUrl: null,
      images: proyectoKafkaUrls,
      repositoryUrl: repo('proyectoKafka'),
      liveUrl: null,
      technologies: [TECHS.java, TECHS.springboot, TECHS.kafka, TECHS.zookeeper, TECHS.docker, TECHS.maven],
    },
    {
      id: 6,
      name: t('projects.backendJava.title'),
      description: t('projects.backendJava.description'),
      imageUrl: null,
      images: backendJavaUrls,
      repositoryUrl: repo('backendJava'),
      liveUrl: null,
      technologies: [TECHS.java, TECHS.springboot, TECHS.jpa, TECHS.mysql, TECHS.docker, TECHS.maven],
    },
    {
      id: 7,
      name: t('projects.taskFlowApi.title'),
      description: t('projects.taskFlowApi.description'),
      imageUrl: null,
      images: taskFlowApiUrls,
      repositoryUrl: repo('taskFlowApi'),
      liveUrl: null,
      technologies: [TECHS.java, TECHS.springboot, TECHS.postgresql, TECHS.jwt, TECHS.swagger, TECHS.testcontainers, TECHS.docker],
    },
    {
      id: 8,
      name: t('projects.pronafe.title'),
      description: t('projects.pronafe.description'),
      imageUrl: null,
      images: pronafeUrls,
      repositoryUrl: repo('pronafe'),
      liveUrl: null,
      technologies: [TECHS.php, TECHS.laravel, TECHS.inertia, TECHS.react, TECHS.ts, TECHS.vite, TECHS.tailwind, TECHS.mysql, TECHS.docker],
    },
    {
      id: 9,
      name: t('projects.tarjetaCredito.title'),
      description: t('projects.tarjetaCredito.description'),
      imageUrl: null,
      images: tarjetaCreditoUrls,
      repositoryUrl: null,
      repositoryLinks: repoLinks('tarjetaCredito'),
      liveUrl: null,
      technologies: [TECHS.angular, TECHS.ts, TECHS.bootstrap, TECHS.rxjs, TECHS.dotnet, TECHS.aspnet, TECHS.ef, TECHS.sqlserver, TECHS.swagger],
    },
    {
      id: 10,
      name: t('projects.portfolioMobile.title'),
      description: t('projects.portfolioMobile.description'),
      imageUrl: null,
      images: portfolioMobileUrls,
      repositoryUrl: repo('portfolioMobile'),
      liveUrl: null,
      technologies: [TECHS.reactnative, TECHS.expo, TECHS.js, TECHS.asyncstorage, TECHS.contextapi],
    },
    {
      id: 11,
      name: t('projects.urlShortener.title'),
      description: t('projects.urlShortener.description'),
      imageUrl: null,
      images: urlShortenerUrls,
      repositoryUrl: repo('urlShortener'),
      liveUrl: null,
      technologies: [TECHS.csharp, TECHS.dotnet, TECHS.aspnet, TECHS.openapi],
    },
    {
      id: 12,
      name: t('projects.windowsForm.title'),
      description: t('projects.windowsForm.description'),
      imageUrl: null,
      images: windowsFormUrls,
      repositoryUrl: repo('windowsForm'),
      liveUrl: null,
      technologies: [TECHS.csharp, TECHS.dotnetfw, TECHS.winforms, TECHS.sqlserver, TECHS.adonet],
    },
    {
      id: 13,
      name: t('projects.awInternetSales.title'),
      description: t('projects.awInternetSales.description'),
      imageUrl: null,
      images: awInternetSalesUrls,
      repositoryUrl: repo('awInternetSales'),
      liveUrl: null,
      technologies: [TECHS.ssas],
    },
    {
      id: 14,
      name: t('projects.loginOauth.title'),
      description: t('projects.loginOauth.description'),
      imageUrl: null,
      images: loginOauthUrls,
      repositoryUrl: repo('loginOauth'),
      liveUrl: null,
      technologies: [TECHS.node, TECHS.express],
    },
    {
      id: 15,
      name: t('projects.talentoTechBackendJava.title'),
      description: t('projects.talentoTechBackendJava.description'),
      imageUrl: null,
      images: talentoTechBackendJavaUrls,
      repositoryUrl: repo('talentoTechBackendJava'),
      liveUrl: null,
      technologies: [TECHS.java, TECHS.csv, TECHS.maven],
    },
  ]
}
