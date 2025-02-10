<script lang="ts">
  import { onMount } from 'svelte'
  
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'
  import Contenu from '$lib/components/Contenu.svelte'

  import { year } from '$lib/formatters'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  // onMount(() => {
  // })
</script>


<section class="flex" id={data.item.fields.id}>
  <div class="col col--4of12 col--mobile--12of12 flex flex--column">
    {#if data.item.fields.titre}
    <h1 class="h2">{data.item.fields.titre}<br>{data.item.fields.region}</h1>
    {/if}
    {#if data.item.fields.date}
    <h2>{year(data.item.fields.date)}</h2>
    {/if}
  </div>
  <div class="col col--4of12 col--mobile--12of12">
    <div class="flex flex--column flex--gapped description">
      {#if data.item.fields.description}
      <Rich body={data.item.fields.description} />
      {/if}
    </div>
  </div>
  <div class="col col--4of12 col--mobile--12of12">
    <div class="flex flex--column flex--gapped details">
      {#if data.item.fields.details}
      <Rich body={data.item.fields.details} />
      {/if}
    </div>
  </div>


  {#if data.item.fields.thumbnail}
  <figure class="col col--12of12">
    <Media media={data.item.fields.thumbnail} />
  </figure>
  {/if}

  <Contenu contenu={data.item.fields.contenu} />

  <nav class="col col--12of12 flex flex--gapped" class:flex--center={!data.item.fields.similaires?.length}>
    {#if data.item.fields.similaires?.length}
    <h3>Projets similaires</h3>
    {/if}
    <a href="/projets" class="button button--grey">Voir tous les projets</a>
    {#if data.item.fields.similaires?.length}
    <ol class="list--nostyle flex">
      {#each [...data.item.fields.similaires] as projet}
      <li class="col col--1of5 col--mobile--6of12" id={projet.fields.id}>
        <a href="/projets/{projet.fields.id}">
          <figure>
            {#if projet.fields.thumbnail}
            <Media media={projet.fields.thumbnail} />
            {/if}

            <figcaption class="flex flex--gapped">
              <h6>
                {projet.fields.titre}<br>
                {projet.fields.region}
              </h6>
            </figcaption>
          </figure>
        </a>
      </li>
      {/each}
      {#each Array(data.item.fields.similaires.length % 5) as _}
      <li class="col col--1of5 col--mobile--12of12"></li>
      {/each}
    </ol>
    {/if}
  </nav>
</section>




<style lang="scss">
  section {
    padding: $s3 0;

    > div {
      border-right: 1px solid $muted;

      padding: 0 $s-1;
      margin-bottom: $s0;

      :global(td),
      :global(th) {
        border-top: 1px solid $muted;
      }

      h1 + h2 {
        margin-top: auto;

        @media (max-width: $mobile) {
          margin-top: $s1;
        }
      }
    }

    nav {
      padding: 0 $s-1;
      margin-top: $s3;

      h3 + .button {
        margin-left: auto;
      }

      ol {
        margin: $s-1 calc(-1 * $s-1) 0;
        align-items: stretch;

        li {
          padding: 0 $s-1;
          border-right: 1px solid $muted;

          figcaption {
            margin-top: $s-1;
            margin-bottom: $s3;
          }
        }

        li {

          &:nth-child(5n) {
            border-right-color: transparent;
          }

          @media (max-width: $mobile) {
            &:nth-child(5n) {
              border-right-color: $muted;
            }

            &:nth-child(2n) {
              border-right-color: transparent;
            }
          }
        }
      }
    }
  }
</style>