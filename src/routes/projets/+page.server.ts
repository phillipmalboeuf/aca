
import type { TypeCategorieSkeleton, TypeProjetSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'



export const load = async ({ url, params, cookies }) => {

  const filter = url.searchParams.get("categorie")

  const [projets, categories] = await Promise.all([
    content.getEntries<TypeProjetSkeleton>({ content_type: 'projet', locale: 'fr-CA', order: ['-fields.date'], ...filter
    ? { "fields.catgorie.fields.id": filter, "fields.catgorie.sys.contentType.sys.id": "categorie" }
    : {} }),
    content.getEntries<TypeCategorieSkeleton>({ content_type: 'categorie', locale: 'fr-CA', order: ['fields.titre'] }),
  ])

  return {
    filter,
    projets,
    categories
  }
}