import { useEffect } from 'react'

const DEFAULT_TITLE = 'Tomas Tutor Onetto - Software Developer Portfolio'
const DEFAULT_DESCRIPTION =
  'Tomas Tutor Onetto - Software Developer & Technical Leader Portfolio'

interface PageMetaProps {
  title: string
  description: string
}

export default function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevContent = metaDesc?.getAttribute('content') ?? ''
    if (metaDesc) metaDesc.setAttribute('content', description)

    return () => {
      document.title = prevTitle || DEFAULT_TITLE
      if (metaDesc) metaDesc.setAttribute('content', prevContent || DEFAULT_DESCRIPTION)
    }
  }, [title, description])

  return null
}
