
import type { TypeCategorieSkeleton, TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'



export const load = async ({ url, params, cookies }) => {

  const filter = url.searchParams.get("categorie")
  const format = url.searchParams.get("format")

  const [categories] = await Promise.all([
    content.getEntries<TypeCategorieSkeleton>({ content_type: 'categorie', locale: { en: 'en-CA' }[languageTag()] || 'fr-CA', order: ['fields.titre'] }),
  ])

  const projets = await content.getEntries<TypeProjetSkeleton>({
    content_type: 'projet', locale: { en: 'en-CA' }[languageTag()] || 'fr-CA', order: ['-fields.date'], ...filter
    ? { "links_to_entry": categories.items.find(c => c.fields.id === filter)?.sys.id }
    : format !== 'liste' ? { "fields.archive[ne]": true } : {}})

  return {
    filter,
    projets,
    categories
  }
}