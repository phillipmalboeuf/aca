
import type { TypeCategorieSkeleton, TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'



export const load = async ({ url, params, cookies }) => {

  const filter = url.searchParams.get("categorie")
  const format = url.searchParams.get("format")

  const [projets, categories] = await Promise.all([
    content.getEntries<TypeProjetSkeleton>({ content_type: 'projet', locale: { en: 'en-CA' }[languageTag()] || 'fr-CA', order: ['-fields.date'], ...filter
    ? { "fields.catgorie.fields.id": filter, "fields.catgorie.sys.contentType.sys.id": "categorie" }
    : format !== 'liste' ? { "fields.archive[ne]": true } : {}}),
    content.getEntries<TypeCategorieSkeleton>({ content_type: 'categorie', locale: { en: 'en-CA' }[languageTag()] || 'fr-CA', order: ['fields.titre'] }),
  ])

  return {
    filter,
    projets,
    categories
  }
}