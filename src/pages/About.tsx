import { useLanguage } from '../context/LanguageContext'
import './About.css'

const About = () => {
  const { t } = useLanguage()
  const basePath = import.meta.env.BASE_URL || '/'

  return (
    <section className="about">
      <div className="about-container">
        <h1 className="page-title">{t('about.title')}</h1>
        <div className="about-content">
          <div className="about-section">
            <p className="about-summary">{t('about.summary')}</p>
          </div>
          <div className="about-section">
            <h2>{t('about.education.title')}</h2>
            <ul className="education-list">
              <li className="education-item">
                <div className="education-main">{t('about.education.item1')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/isfdyt-analista-dev-programador.pdf`}
                    title="Certificado ISFDyT N°93"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item2')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/frontend-js-cac.pdf`}
                    title="Certificado Front-End JS"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item3')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/argentina-programa.pdf`}
                    title="Certificado Argentina Programa"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item4')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/blazor-aspnetcore7.pdf`}
                    title="Certificado Blazor ASP.NET Core 7"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item5')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/introduccion-algoritmos-todocode.pdf`}
                    title="Certificado Introducción a los Algoritmos"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item6')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/fundamentos-programacion-ftm.pdf`}
                    title="Certificado Fundamentos de Programación"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item7')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/diseno-web-html5-ftm.pdf`}
                    title="Certificado Diseño Web con HTML5"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item8')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/html-css-todocode.pdf`}
                    title="Certificado HTML y CSS TodoCode"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item9')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/git-github-todocode.pdf`}
                    title="Certificado Git y GitHub TodoCode"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item10')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/ciberseguridad-entorno-educativo.pdf`}
                    title="Certificado Ciberseguridad en el Entorno Educativo"
                    loading="lazy"
                  />
                </div>
              </li>
              <li className="education-item">
                <div className="education-main">{t('about.education.item11')}</div>
                <div className="education-certificate">
                  <iframe
                    src={`${basePath}certificates/google-hacking-dorks.pdf`}
                    title="Certificado Google Hacking Dorks"
                    loading="lazy"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div className="about-section">
            <h2>{t('about.languages.title')}</h2>
            <ul className="languages-list">
              <li>{t('about.languages.spanish')}</li>
              <li>{t('about.languages.english')}</li>
              <li>{t('about.languages.italian')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

