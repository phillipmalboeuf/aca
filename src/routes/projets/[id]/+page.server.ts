
import type { TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'


export const load = async ({ request, params, cookies }) => {

  const [items] = await Promise.all([
    content.getEntries<TypeProjetSkeleton>({ content_type: 'projet', include: 3, "fields.id": params.id, locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    item: items.items[0],
  }
}