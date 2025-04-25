<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import type { TypeProjet } from '$lib/clients/content_types'
  
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'

  import { year } from '$lib/formatters'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import type { PageData } from './$types'
  let { data, spaced, categories=true }: { data: PageData, spaced: boolean, categories: boolean } = $props()

  let open = $state(false)
  let format = $derived($page.url.searchParams.get('format') || 'images')

  let active = $state<TypeProjet<"WITHOUT_UNRESOLVABLE_LINKS">>()

  onMount(() => {
  })
</script>


<section class:spaced>
  {#if categories}
  <nav class="flex flex--middle flex--gapped">
    <h3 class="flex flex--gapped flex--middle">{data.filter ? data.categories.items.find(c => c.fields.id === data.filter).fields.titre : 'Catégorie'} <svg width="18" height="9" viewBox="0 0 14 7"><path d="M1 1L7 6L13 1" stroke="currentColor"/></svg></h3>
    <details {open} style:--length={data.categories.items.length}>
      <summary class="h3">Catégories</summary>
      <ul class="list--nostyle">
        <li>
          <a class="h3" class:active={!data.filter} href="/projets">Tous</a>
        </li>
        {#each data.categories.items as categorie}
        <li id={categorie.fields.id}>
          <a class="h3" class:active={data.filter === categorie.fields.id} href="/projets?categorie={categorie.fields.id}{format === 'liste' ? '&format=liste' : ''}" onclick={() => { open = false }}>{categorie.fields.titre}</a>
        </li>
        {/each}    
      </ul>
    </details>

    <div class="flex flex--gapped col col--4of12 col--mobile--6of12 formats">
      <a href="/projets{data.filter ? `?categorie=${data.filter}` : ''}" class="h3" class:active={format === 'images'}>Images</a>
      <a href="/projets{data.filter ? `?categorie=${data.filter}&format=liste` : '?format=liste'}" class="h3" class:active={format === 'liste'}>Liste</a>
    </div>
  </nav>
  {/if}

  {#if format === 'images'}
  <ol class="list--nostyle flex">
    {#each [...data.projets.items] as projet}
    <li class:col--4of12={spaced} class="col col--2of12 col--landscape--4of12 col--mobile--6of12" id={projet.fields.id}>
      <a href="/projets/{projet.fields.id}">
        <figure>
          {#if projet.fields.thumbnail}
          <Media media={projet.fields.thumbnail} rounded width={1000} />
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
    {#if data.projets.items.length > 6}
    {#each Array(data.projets.items.length % 6) as _}
    <li class="col col--2of12 col--landscape--4of12 col--mobile--12of12"></li>
    {/each}
    {/if}
  </ol>
  {:else}
  <table>
    <tbody>
      {#each data.projets.items as projet}
      <tr class="clickable-row" onclick={() => goto(`/projets/${projet.fields.id}`)} onmouseenter={() => active = projet} onmouseleave={() => active = undefined}>
        <td>{projet.fields.titre}</td>
        {#if projet.fields.region}<td>{projet.fields.region}</td>{/if}
        <td>{projet.fields.catgorie?.fields.titre}</td>
        <td>{year(projet.fields.date)}</td>
      </tr>
      {/each}
    </tbody>
  </table>

  {#if active}
  <figure transition:fade class="thumbnail">
    {#if active.fields.thumbnail}
    <Media media={active.fields.thumbnail} width={400} rounded />
    {/if}
  </figure>
  {/if}
  {/if}
</section>




<style lang="scss">
  section {
    padding: $s4 0;

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

      &:nth-child(6n) {
        border-right-color: transparent;
      }

      @media (max-width: $mobile) {
        &:nth-child(6n) {
          border-right-color: $muted;
        }

        &:nth-child(2n) {
          border-right-color: transparent;
        }
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

    table {
      width: 100%;
      padding: $s-1;
      
      td {
        border-top: 1px solid $muted;
        min-width: 0;
        padding-right: $s0;

        &:first-child {
          width: calc(((100% / 3) * 2));

          @media (max-width: $mobile) {
            width: calc(50%);
          }
        }

        &:nth-child(2) {
          @media (min-width: $mobile) {
            padding-left: calc($s-1 + 2px);
          }
        }

        &:last-child {
          text-align: right;
          padding-right: 0;
        }

        // @media (max-width: $mobile) {
        //   &:nth-child(3) {
        //     display: none;
        //   }
        // }
      }
    } 

    nav {
      position: relative;
      padding: $s-1;
      margin-bottom: $s1;
      flex-wrap: nowrap;

      @media (max-width: $mobile) {
        // justify-content: space-between;
        // margin-bottom: $s0;
      }

      > h3 {
        width: auto;
      }

      .formats {
        position: relative;
        z-index: 1;
        --gap: #{$s1};
        margin-left: auto;

        @media (min-width: $mobile) {
          margin-right: calc($s-1 * 0.5);
        }


        @media (max-width: $mobile) {
          // order: -1;
          // margin-bottom: $s1;
          // justify-content: flex-end;
        }

        a {
          opacity: 0.5;
          transition: opacity 333ms;

          &.active,
          &:hover,
          &:focus {
            opacity: 1;
          }
        }
      }

      // &:has(details[open]) {
        
      // }

      details {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 0;
        max-width: 340px;
        border-radius: $radius;
        padding: $s-2 $s-1;
        // backdrop-filter: blur(12px);
        // -webkit-backdrop-filter: blur(12px);

        // @media (max-width: $mobile) {
        //   min-width: 0;
        //   width: 50%;
        // }

        summary {
          cursor: pointer;
          opacity: 0;
          display: flex;
          align-items: center;

          // svg {
          //   margin-left: auto;
          //   transition: transform 333ms;
          // }
        }

        &[open] {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          // margin-bottom: calc(($s0 * -1.5 * var(--length)) - (0px * (var(--length))) - $s-2);

          summary {
            // margin-bottom: $s-2;

            // svg {
            //   transform: rotate(-180deg);
            // }
          }
        }

        ul {
          position: absolute;
          top: 0;
          left: $s-1;
          width: 100%;
          max-width: 340px;
          background: rgba(255, 255, 255, 0.70);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: $s-2 $s-1;
          border-radius: $radius;
          
          li {
            border-top: 1px solid $muted;
            line-height: 1.5;

            &:first-child {
              border-top: none;
            }

            a {
              opacity: 0.5;
              transition: opacity 333ms;

              &.active {
                opacity: 1;
              }

              &:hover,
              &:focus {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }

  .thumbnail {
    position: fixed;
    top: $s-1;
    right: $s-1;
    width: auto;
    z-index: 100;

    :global(img) {
      height: calc($s0 * 10);
      width: auto;
    }
  }

  .clickable-row {
    cursor: pointer;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
</style>