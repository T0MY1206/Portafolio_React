export function getTranslationVariants(
  t: (key: string) => string,
  key: string
): string[] {
  const raw = t(key)
  return raw.includes('|')
    ? raw.split('|').map((s) => s.trim()).filter(Boolean)
    : [raw].filter(Boolean)
}
