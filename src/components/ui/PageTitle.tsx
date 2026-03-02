import './PageTitle.css'

interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

const PageTitle = ({ children, className = '' }: PageTitleProps) => {
  return (
    <h1 className={`page-title ${className}`.trim()}>
      {children}
    </h1>
  )
}

export default PageTitle
