import { useEffect } from 'react'

const DEFAULT_TITLE = 'Tomas Tutor Onetto - Software Developer Portfolio'
const DEFAULT_DESCRIPTION =
  'Tomas Tutor Onetto - Software Developer & Technical Leader Portfolio. Full Stack Developer based in Buenos Aires, Argentina.'
const DEFAULT_CANONICAL = 'https://t0my1206.github.io/Portafolio_React/'

function setMetaContent(
  selector: string,
  attribute: string,
  value: string
): string {
  const el = document.querySelector(selector)
  const prev = el?.getAttribute(attribute) ?? ''
  if (el) el.setAttribute(attribute, value)
  return prev
}

/**
 * Sets document title, meta description, Open Graph and Twitter tags, and canonical URL for the current page.
 * Restores previous values on unmount. Call once per route/section at the top of the component.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const prevDesc = setMetaContent('meta[name="description"]', 'content', description)
    const prevOgTitle = setMetaContent('meta[property="og:title"]', 'content', title)
    const prevOgDesc = setMetaContent('meta[property="og:description"]', 'content', description)
    const prevTwTitle = setMetaContent('meta[name="twitter:title"]', 'content', title)
    const prevTwDesc = setMetaContent('meta[name="twitter:description"]', 'content', description)

    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    const prevCanonical = canonicalLink?.href ?? ''
    if (canonicalLink) canonicalLink.href = window.location.href

    const prevOgUrl = setMetaContent('meta[property="og:url"]', 'content', window.location.href)

    return () => {
      document.title = prevTitle || DEFAULT_TITLE
      setMetaContent('meta[name="description"]', 'content', prevDesc || DEFAULT_DESCRIPTION)
      setMetaContent('meta[property="og:title"]', 'content', prevOgTitle || DEFAULT_TITLE)
      setMetaContent('meta[property="og:description"]', 'content', prevOgDesc || DEFAULT_DESCRIPTION)
      setMetaContent('meta[name="twitter:title"]', 'content', prevTwTitle || DEFAULT_TITLE)
      setMetaContent('meta[name="twitter:description"]', 'content', prevTwDesc || DEFAULT_DESCRIPTION)
      if (canonicalLink) canonicalLink.href = prevCanonical || DEFAULT_CANONICAL
      setMetaContent('meta[property="og:url"]', 'content', prevOgUrl || DEFAULT_CANONICAL)
    }
  }, [title, description])
}
