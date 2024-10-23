<script lang="ts">
  import { onMount } from 'svelte'
  
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  import { year } from '$lib/formatters';
  let { data }: { data: PageData } = $props()

  onMount(() => {
  })
</script>


<section class="flex" id={data.item.fields.id}>
  <div class="col col--4of12 flex flex--column">
    {#if data.item.fields.titre}
    <h1 class="h2">{data.item.fields.titre}<br>{data.item.fields.region}</h1>
    {/if}
    {#if data.item.fields.date}
    <h2>{year(data.item.fields.date)}</h2>
    {/if}
  </div>
  <div class="col col--4of12">
    {#if data.item.fields.description}
    <Rich body={data.item.fields.description} />
    {/if}
  </div>
  <div class="col col--4of12">
    {#if data.item.fields.details}
    <Rich body={data.item.fields.details} />
    {/if}
  </div>


  {#if data.item.fields.thumbnail}
  <figure class="col col--12of12">
    <Media media={data.item.fields.thumbnail} />
  </figure>
  {/if}

  <ol class="list--nostyle flex flex--column flex--gapped">
    <!-- {#each data.item.fields.produits as item}
    <li>
      <Produit {item} />
    </li>
    {/each} -->
  </ol>

  <nav class="col col--12of12">
    <a href="/projets" class="button">Voir tous les projets</a>
  </nav>
</section>




<style lang="scss">
  section {
    padding: $s3 0;

    > div {
      border-right: 1px solid $muted;

      padding: 0 $s-1;
      margin-bottom: $s0;

      h1 + h2 {
        margin-top: auto;
      }
    }

    nav {
      padding: 0 $s-1;
      margin-top: $s3;
    }
  }
</style>