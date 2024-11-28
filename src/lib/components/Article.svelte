<script lang="ts">
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'
  
  import Media from './Media.svelte'
  import Rich from './Rich.svelte'

  const { article } : { article: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string> } = $props()
</script>


<div class="flex flex--gapped">
  <hr class="col col--12of12" />

  <figure class="col col--4of12 col--mobile--12of12">
    <Media media={article.fields.thumbnail} />
  </figure>

  <article class="flex flex--gapped flex--column col col--4of12 col--mobile--12of12">
    <date>{date(article.fields.date)}</date>
    <h3>{article.fields.titre}</h3>
  </article>

  <div class="col col--4of12 col--mobile--12of12">
    <Rich body={article.fields.corps} />
  </div>
</div>


<style lang="scss">
  div {
    padding-bottom: $s2;
  }
  hr {
    margin: $s-2 0;
    color: rgba($light, 0.25);
  }
</style>