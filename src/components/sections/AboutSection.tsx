import { useLanguage } from '../../context/LanguageContext'
import { usePageMeta } from '../../hooks/usePageMeta'
import PageTitle from '../ui/PageTitle'
import './AboutSection.css'

const EDUCATION_ITEMS: { labelKey: string; src: string; title: string }[] = [
  { labelKey: 'about.education.item1', src: 'certificates/isfdyt-analista-dev-programador.pdf', title: 'Certificado ISFDyT N°93' },
  { labelKey: 'about.education.item2', src: 'certificates/Certificado - Curso de Java Profesional.pdf', title: 'Certificado Curso de Java Profesional' },
  { labelKey: 'about.education.item3', src: 'certificates/Certificado - Curso profesional de Git.pdf', title: 'Certificado Curso profesional de Git' },
  { labelKey: 'about.education.item4', src: 'certificates/frontend-js-cac.pdf', title: 'Certificado Front-End JS' },
  { labelKey: 'about.education.item5', src: 'certificates/argentina-programa.pdf', title: 'Certificado Argentina Programa' },
  { labelKey: 'about.education.item6', src: 'certificates/blazor-aspnetcore7.pdf', title: 'Certificado Blazor ASP.NET Core 7' },
  { labelKey: 'about.education.item7', src: 'certificates/introduccion-algoritmos-todocode.pdf', title: 'Certificado Introducción a los Algoritmos' },
  { labelKey: 'about.education.item8', src: 'certificates/fundamentos-programacion-ftm.pdf', title: 'Certificado Fundamentos de Programación' },
  { labelKey: 'about.education.item9', src: 'certificates/diseno-web-html5-ftm.pdf', title: 'Certificado Diseño Web con HTML5' },
  { labelKey: 'about.education.item10', src: 'certificates/html-css-todocode.pdf', title: 'Certificado HTML y CSS TodoCode' },
  { labelKey: 'about.education.item11', src: 'certificates/git-github-todocode.pdf', title: 'Certificado Git y GitHub TodoCode' },
  { labelKey: 'about.education.item12', src: 'certificates/ciberseguridad-entorno-educativo.pdf', title: 'Certificado Ciberseguridad en el Entorno Educativo' },
  { labelKey: 'about.education.item13', src: 'certificates/google-hacking-dorks.pdf', title: 'Certificado Google Hacking Dorks' },
]

const AboutSection = () => {
  const { t } = useLanguage()
  usePageMeta(t('meta.titleAbout'), t('meta.descAbout'))
  const basePath = import.meta.env.BASE_URL || '/'

  return (
    <section className="about" aria-labelledby="about-heading">
      <div className="about-container">
        <PageTitle id="about-heading">{t('about.title')}</PageTitle>
        <div className="about-content">
          <div className="about-section">
            <p className="about-summary">{t('about.summary')}</p>
          </div>
          <section className="about-section" aria-labelledby="about-education">
            <h2 id="about-education">{t('about.education.title')}</h2>
            <ul className="education-list">
              {EDUCATION_ITEMS.map((item) => (
                <li key={item.labelKey} className="education-item">
                  <div className="education-main">{t(item.labelKey)}</div>
                  <div className="education-certificate">
                    <iframe
                      src={encodeURI(`${basePath}${item.src}`)}
                      title={item.title}
                      loading="lazy"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <section className="about-section" aria-labelledby="about-languages">
            <h2 id="about-languages">{t('about.languages.title')}</h2>
            <ul className="languages-list">
              <li>{t('about.languages.spanish')}</li>
              <li>{t('about.languages.english')}</li>
              <li>{t('about.languages.italian')}</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
