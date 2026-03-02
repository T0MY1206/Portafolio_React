import './PageTitle.css'

interface PageTitleProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const PageTitle = ({ children, className = '', id }: PageTitleProps) => {
  return (
    <h1 id={id} className={`page-title ${className}`.trim()}>
      {children}
    </h1>
  )
}

export default PageTitle
