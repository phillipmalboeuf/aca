<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, full, small, first }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    full?: boolean
    small?: boolean
  } = $props()

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class="flex flex--gapped" class:no-media={!item.fields.media} id={item.fields.id}>
  <div class:col--6of12={!!item.fields.media} class:col--12of12={!item.fields.media} class="corps col flex flex--column flex--gapped">
    {#if item.fields.titre}
    <div class="titre flex flex--column flex--gapped">
      <!-- {#if item.fields.sousTitre}
        <small>{@html item.fields.sousTitre.replaceAll('\\n', '<br />')}</small>
      {/if} -->
      <h2>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h2>
    </div>
    {/if}

    {#if item.fields.corps}
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.corps} />
    </div>
    {/if}

    {#if item.fields.liens?.length}
    <ul class="list--nostyle">
      {#each item.fields.liens as link}
        <li><Link className="button button--muted" {link} /></li>
      {/each}
    </ul>
    {/if}
  </div>

  {#if item.fields.media}
  <div class="col col--6of12 media">
    <figure>
      <Media media={item.fields.media} rounded />
    </figure>
  </div>
  {/if}
</section>

<style lang="scss">
  section {
    // text-align: center;
    // min-height: 50lvh;
    
    // div {
    //   align-items: center;
    //   margin: 0 auto;
    // }

    &.no-media {
      display: inline-flex;
      width: auto;
      margin: 0 auto;
      justify-content: center;
      text-align: left;
    }

    // &.padded {
    //   border-radius: $s0;
    // }
  }

  // :global(section:has(> .no-media)) {
  //   text-align: center;
  // }
</style>