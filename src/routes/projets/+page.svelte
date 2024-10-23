<script lang="ts">
  import { onMount } from 'svelte'
  
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import type { PageData } from './$types'
  import { year } from '$lib/formatters';
  let { data, spaced, categories=true }: { data: PageData, spaced: boolean, categories: boolean } = $props()

  let open = $state(false)

  onMount(() => {
  })
</script>


<section class:spaced>
  {#if categories}
  <nav class="flex flex--middle flex--gapped">
    <h6>Catégorie</h6>
    <details {open} style:--length={data.categories.items.length}>
      <summary>{data.filter ? data.categories.items.find(c => c.fields.id === data.filter).fields.titre : 'Tous'}</summary>
      <ul class="list--nostyle">
        {#if data.filter}
        <li>
          <a href="/projets">Tous</a>
        </li>
        {/if}
        {#each data.categories.items.filter(c => c.fields.id !== data.filter) as categorie}
        <li id={categorie.fields.id}>
          <a href="/projets?categorie={categorie.fields.id}" onclick={() => { open = false }}>{categorie.fields.titre}</a>
        </li>
        {/each}    
      </ul>
    </details>
  </nav>
  {/if}

  <ol class="list--nostyle flex">
    {#each [...data.projets.items, ...data.projets.items, ...data.projets.items, ...data.projets.items] as projet}
    <li class:col--4of12={spaced} class="col col--1of5" id={projet.fields.id}>
      <a href="/projets/{projet.fields.id}">
        <figure>
          {#if projet.fields.thumbnail}
          <Media media={projet.fields.thumbnail} />
          {/if}

          <figcaption class="flex flex--gapped">
            {#if spaced}
            <time class="col col--3of12" datetime={projet.fields.date}>{year(projet.fields.date)}</time>
            {/if}
            <h6>
              {projet.fields.titre}<br>
              {projet.fields.region}
            </h6>
          </figcaption>
        </figure>
      </a>
    </li>
    {/each}
  </ol>
</section>




<style lang="scss">
  section {
    // padding: $s3 $s1;

    ol {
      align-items: stretch;

      li {
        padding: 0 $s-1;
        border-right: 1px solid $muted;

        figcaption {
          margin-top: $s-1;
          margin-bottom: $s3;
        }
      }
    }

    &:not(.spaced) li {

      &:nth-child(5n) {
        border-right-color: transparent;
      }
    }

    &.spaced li {

      &:nth-child(3n) {
        border-right-color: transparent;
      }

      &:nth-child(3n + 2) {
        padding-top: 50lvh;
      }
    }

    nav {
      padding: $s-1;

      details {
        min-width: 280px;
        border-radius: $s-1;
        padding: $s-2;
        background: rgba(255, 255, 255, 0.70);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);

        summary {
          cursor: pointer;
          opacity: 0.5;
        }

        &[open] {
          margin-bottom: calc(($s0 * -1.5 * var(--length)) - (1px * (var(--length))) - $s-2);

          summary {
            margin-bottom: $s-2;
          }
        }

        ul {
          li {
            border-top: 1px solid $muted;
            line-height: 1.5;
          }
        }
      }
    }
  }
</style>