export function getRouterBasename(baseUrl: string): string | undefined {
  const normalized = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  return normalized === '' || normalized === '/' ? undefined : normalized
}
