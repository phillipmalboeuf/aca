<script lang="ts">
  import { onMount } from 'svelte'
  
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'
  import Contenu from '$lib/components/Contenu.svelte'

  import { year } from '$lib/formatters'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let description_wrapper: HTMLDivElement
  let details_wrapper: HTMLDivElement
  let description: HTMLDivElement
  let details: HTMLDivElement

  let overflowing = $state(false)
  let show = $state(false)
  let height = $state(0)

  onMount(() => {
    if (description.clientHeight > details.clientHeight) {
      overflowing = true
      description_wrapper.style.height = `${details.clientHeight}px`
      height = description.clientHeight
    }
  })
</script>


<section class="flex" id={data.item.fields.id}>
  <div class="col col--4of12 col--mobile--12of12 flex flex--column">
    {#if data.item.fields.titre}
    <h1 class="h2">{data.item.fields.titre}<br>{data.item.fields.region}</h1>
    {/if}
    <!-- {#if data.item.fields.date}
    <h2>{year(data.item.fields.date)}</h2>
    {/if} -->
  </div>
  <div class="col col--4of12 col--mobile--12of12 description_wrapper" class:overflowing class:show style:--height={height} bind:this={description_wrapper}>
    <div class="flex flex--column flex--gapped description" bind:this={description}>
      {#if data.item.fields.description}
      <Rich body={data.item.fields.description} />
      {/if}
    </div>

    {#if overflowing}
    <div class="overflowing_indicator">
      <button onclick={() => show = !show}>Lire {#if show}moins{:else}plus{/if}</button>
    </div>
    {/if}
  </div>
  <div class="col col--4of12 col--mobile--12of12 details_wrapper" bind:this={details_wrapper}>
    <div class="flex flex--column flex--gapped details" bind:this={details}>
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

      padding: 0 $s-1;
      margin-bottom: $s0;

      @media (min-width: $mobile) {
        border-right: 1px solid $muted;

        &.description_wrapper {
          border-right: none;
        }

        &.details_wrapper {
          border-left: 1px solid $muted;
          border-right: none;
        }
      }

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

    .description_wrapper.overflowing {
      position: relative;
      height: 0px;
      overflow: hidden;
      transition: height 0.666s;

      .overflowing_indicator {
        position: absolute;
        z-index: 1;
        bottom: 0;
        width: 100%;
        height: 100%;
        transition: background 0.666s;
        background: linear-gradient(to bottom, rgba($beige, 0), rgba($beige, 1) 75%);
        display: flex;
        align-items: flex-end;

        pointer-events: none;

        button {
          pointer-events: auto;
        }
      }

      &.show {
        height: calc((var(--height) * 1px) + $s3) !important;
        
        .overflowing_indicator {
          background: linear-gradient(to bottom, rgba($beige, 0), rgba($beige, 0) 75%);
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