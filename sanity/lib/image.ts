import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper pour obtenir le LQIP (Low Quality Image Placeholder) depuis les métadonnées
export function getLqip(image: any): string | undefined {
  return image?.asset?.metadata?.lqip
}
