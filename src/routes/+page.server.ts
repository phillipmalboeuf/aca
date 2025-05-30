
import type { TypeNavigationSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'


export const load = async ({ request, cookies }) => {

  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: 'page', include: 4, "fields.id": "home", locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' }),
  ])

  return {
    page: page.items[0],
  }
}