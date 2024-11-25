<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'
  
  import Media from './Media.svelte'
  import Rich from './Rich.svelte'

  const { article } : { article: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string> } = $props()
</script>


<div class="flex flex--gapped">
  <figure class="col col--4of12">
    <Media media={article.fields.thumbnail} />
  </figure>

  <article class="flex flex--gapped flex--column padded col col--4of12">
    <date>{date(article.fields.date)}</date>
    <h5>{article.fields.titre}</h5>
  </article>

  <div class="col col--4of12">
    <Rich body={article.fields.corps} />
  </div>
</div>


<style lang="scss">
</style>