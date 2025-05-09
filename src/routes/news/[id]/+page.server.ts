import type { TypeArticleSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import { languageTag } from '$lib/paraglide/runtime'
import { error } from '@sveltejs/kit'

export const load = async ({ params }) => {
  const [pages, articles] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ 
      content_type: 'page', 
      include: 4, 
      "fields.id": 'news', 
      locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' 
    }),
    content.getEntries<TypeArticleSkeleton>({ 
      content_type: 'article', 
      include: 4, 
      "fields.id": params.id, 
      locale: { en: 'en-CA' }[languageTag()] || 'fr-CA' 
    }),
  ])

  if (articles.items.length === 0) {
    throw error(404, 'Page non trouvée')
  }

  const page = pages.items[0]
  const article = articles.items[0]

  return {
    page: {
      ...page,
      fields: {
        ...page.fields,
        contenu: page.fields.contenu.filter(item => item.fields.id === article.fields.id)
      }
    },
    article,
  }
}