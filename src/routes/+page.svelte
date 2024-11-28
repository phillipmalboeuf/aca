<script lang="ts">
  import { isTypeList, isTypeText, isTypeGallerie, isTypeProjet, isTypeArticle } from '$lib/clients/content_types'

  // import Hero from '$lib/components/Hero.svelte'
  import List from '$lib/components/List.svelte'
  import Text from '$lib/components/Text.svelte'
  // import Form from '$lib/components/Form.svelte'
  import Gallerie from '$lib/components/Gallerie.svelte'
  import Projet from '$lib/components/Projet.svelte'
  import Article from '$lib/components/Article.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>


{#if data.page.fields.contenu?.length}
{#each data.page.fields.contenu as item, i}
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
    // margin: $s1 0;
  }
</style>