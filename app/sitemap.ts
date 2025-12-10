import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://b2dev.fr'
  const currentDate = new Date()

  // Pages statiques du site
  const routes = [
    '',
    '/services',
    '/apropos',
    '/contact',
    '/realisations',
    '/mentions-legales',
    '/politique-confidentialite',
    '/cgs',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1 : route === '/services' || route === '/contact' ? 0.9 : 0.7,
  }))

  return routes
}
