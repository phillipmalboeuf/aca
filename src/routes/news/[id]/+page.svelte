<script lang="ts">
  import { date } from '$lib/formatters'

  import Page from '../../+page.svelte'
  
  import Text from '$lib/components/Text.svelte'
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  import { page } from '$app/state';
  let { data }: { data: PageData } = $props()
</script>

<svelte:head>
	{#if page.data.article?.fields}
	<title>{page.data.article.fields.titre}</title>
	<meta name="description" content={page.data.article.fields.description} />
	{/if}
</svelte:head>

<section>
  <Page {data} />
</section>


<style lang="scss">
  section {
    padding: $s4 0;

    // hr {
    //   width: 100%;
    //   margin: 0;
    // }

    // aside {

    //   > a {
    //     margin: 0 auto;
    //   }
    // }

    // figure {
    //   margin: $s2 0;
    // }
  }
</style>