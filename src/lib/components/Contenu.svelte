<script lang="ts">
  import { isTypeProjet, isTypeText, isTypeList, isTypeGallerie, isTypeArticle, type TypePageSkeleton } from '$lib/clients/content_types'

  import Text from '$lib/components/Text.svelte'
  import List from '$lib/components/List.svelte'
  import Gallerie from '$lib/components/Gallerie.svelte'
  import Projet from '$lib/components/Projet.svelte'
  import Article from '$lib/components/Article.svelte'
  import type { Entry } from 'contentful';

  let { contenu }: { contenu: Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>['fields']['contenu'] } = $props()
</script>

{#if contenu?.length}
{#each contenu as item, i}
<section class:padded={!isTypeProjet(item)}>
  {#if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List {item} />
  {:else if isTypeGallerie(item)}
  <Gallerie {item} />
  {:else if isTypeProjet(item)}
  <Projet {item} hero first={i === 0} />
  {:else if isTypeArticle(item)}
  <Article article={item} />
  {/if}
</section>
{/each}
{/if}

<style lang="scss">
  section {
    overflow-x: hidden;
  }
</style>