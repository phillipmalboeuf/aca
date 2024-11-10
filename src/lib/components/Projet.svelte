<script lang="ts">
  import type { TypeProjetSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'
  import { year } from '$lib/formatters';

  let { item, hero = false, first = false }: {
    item: Entry<TypeProjetSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    hero?: boolean
    first?: boolean
  } = $props()
</script>

<a href={`/projets/${item.fields.id}`} class="flex flex--bottom" id={item.fields.id} class:hero class:first={first}>
  {#if item.fields.thumbnail}
    <figure class="">
      <Media media={item.fields.thumbnail} />
    </figure>
  {/if}

  <div class="flex" class:flex--column={!hero} class:flex--gapped={hero}>
    {#if !hero}
      <date>{year(item.fields.date)}</date>
    {/if}

    {#if item.fields.titre}
      <h3>{item.fields.titre}</h3>
    {/if}

    {#if item.fields.region}
      <h3>{item.fields.region}</h3>
    {/if}

    <!-- {#if item.fields.corps}
      <Rich body={item.fields.corps} />
    {/if} -->

    <!-- {#if item.fields.cta}
      <Link href={item.fields.cta.fields.url}>
        {item.fields.cta.fields.texte}
      </Link>
    {/if} -->
  </div>
</a>

<style lang="scss">
  .hero {
    min-height: 100lvh;
    text-align: left;
    position: relative;
    overflow: hidden;
    
    > div {
      align-items: flex-start;
      position: relative;
      z-index: 1;
      padding: $s-1;
      color: $light;
    }

    > figure {
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      :global(img), :global(video), :global(picture) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>