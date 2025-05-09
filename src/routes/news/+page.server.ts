import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const [items] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ 
      content_type: 'page', 
      include: 4, 
      "fields.id": 'news', 
      locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' 
    }),
  ])

  if (items.items.length === 0) {
    throw error(404, 'Page non trouvée')
  }

  return {
    page: items.items[0],
  }
}