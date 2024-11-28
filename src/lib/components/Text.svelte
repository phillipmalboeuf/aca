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

<section class="flex flex--gapped flex--center" class:no-media={!item.fields.media} id={item.fields.id}>
  {#if item.fields.media}
  <div class="col col--9of12 col--mobile--12of12 media">
    <figure>
      <Media media={item.fields.media} rounded />
    </figure>
  </div>
  {/if}

  <div class="col col--12of12 flex flex--gapped">
    {#if item.fields.titre}
    <div class:col--4of12={!!item.fields.media} class="titre col col--mobile--12of12 flex flex--column flex--gapped">
      <!-- {#if item.fields.sousTitre}
        <small>{@html item.fields.sousTitre.replaceAll('\\n', '<br />')}</small>
      {/if} -->
      <h2>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h2>
    </div>
    {/if}

    {#if item.fields.corps}
    <div class:col--8of12={!!item.fields.media} class="flex corps col col--mobile--12of12 flex--column flex--gapped">
      <Rich body={item.fields.corps} />

      {#if item.fields.liens?.length}
      <ul class="list--nostyle">
        {#each item.fields.liens as link}
          <li><Link className="button button--muted" {link} /></li>
        {/each}
      </ul>
      {/if}
    </div>
    {/if}
  </div>
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
      height: 100%;
      justify-content: center;
      text-align: left;

      .corps {
        height: 100%;
      }
    }

    &:not(.no-media) {
      .titre {
        border-right: 1px solid $muted;
      }

      .corps {
        padding-bottom: $s4;
      }
    }

    .media {
      margin-bottom: $s2;
    }

    :global(hr) {
      margin: auto 0;
      background-color: transparent;
    }
  }

  // :global(section:has(> .no-media)) {
  //   text-align: center;
  // }
</style>