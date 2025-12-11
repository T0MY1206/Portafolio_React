import { useLanguage } from '../context/LanguageContext'
import './Projects.css'

const Projects = () => {
  const { t } = useLanguage()

  return (
    <section className="projects">
      <div className="projects-container">
        <h1 className="page-title">{t('projects.title')}</h1>
        <p className="projects-description">{t('projects.description')}</p>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Portfolio React</h3>
            <p>Modern portfolio built with React, TypeScript, and Vite</p>
            <div className="project-tags">
              <span>React</span>
              <span>TypeScript</span>
              <span>Vite</span>
            </div>
          </div>
          <div className="project-card">
            <h3>Portfolio Angular</h3>
            <p>Professional portfolio using Angular standalone components</p>
            <div className="project-tags">
              <span>Angular</span>
              <span>TypeScript</span>
              <span>CSS</span>
            </div>
          </div>
          <div className="project-card">
            <h3>Portfolio Mobile</h3>
            <p>Cross-platform mobile portfolio with React Native and Expo</p>
            <div className="project-tags">
              <span>React Native</span>
              <span>Expo</span>
              <span>Mobile</span>
            </div>
          </div>
          <div className="project-card">
            <h3>Spring Boot Backend</h3>
            <p>Microservice with Spring Boot, Tomcat, JPA/Hibernate, Swagger, SQL</p>
            <div className="project-tags">
              <span>Spring Boot</span>
              <span>JPA</span>
              <span>Swagger</span>
            </div>
          </div>
          <div className="project-card">
            <h3>Camunda 7 BPM Frontend</h3>
            <p>BPM/DMN flow with AngularJS forms, PostgreSQL, and custom Camunda UI</p>
            <div className="project-tags">
              <span>Camunda 7</span>
              <span>AngularJS</span>
              <span>PostgreSQL</span>
            </div>
          </div>
          <div className="project-card">
            <h3>{t('projects.pronafe.title')}</h3>
            <p>{t('projects.pronafe.description')}</p>
            <div className="project-tags">
              <span>PHP</span>
              <span>Laravel</span>
              <span>MySQL</span>
            </div>
          </div>
          <div className="project-card">
            <h3>{t('projects.begenerico.title')}</h3>
            <p>{t('projects.begenerico.description')}</p>
            <div className="project-tags">
              <span>Backend</span>
              <span>REST API</span>
              <span>Database</span>
            </div>
          </div>
          <div className="project-card">
            <h3>{t('projects.urlshortener.title')}</h3>
            <p>{t('projects.urlshortener.description')}</p>
            <div className="project-tags">
              <span>.NET</span>
              <span>OpenAPI</span>
              <span>Scalar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

