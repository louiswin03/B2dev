import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://b2dev.pro'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/favicon*.png', '/favicon.ico', '/apple-touch-icon.png'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
