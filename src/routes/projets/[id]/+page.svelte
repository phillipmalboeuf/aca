<script lang="ts">
  import { onMount } from 'svelte'
  
  import Rich from '$lib/components/Rich.svelte'
  import Media from '$lib/components/Media.svelte'
  import Contenu from '$lib/components/Contenu.svelte'

  import { year } from '$lib/formatters'

  import type { PageData } from './$types'
  import { onNavigate } from '$app/navigation';
  let { data }: { data: PageData } = $props()

  let description_wrapper: HTMLDivElement
  let details_wrapper: HTMLDivElement
  let description: HTMLDivElement
  let details: HTMLDivElement

  let overflowing = $state(false)
  let show = $state(false)
  let height = $state(0)

  function setHeight() {
    if (description?.clientHeight && description.clientHeight > details.clientHeight) {
      overflowing = true
      const paragraph = description.querySelector('p')
      description_wrapper.style.height = `calc(${paragraph.clientHeight + 30}px)`
      height = description.clientHeight
    }
  }

  onMount(() => {
    setHeight()
  })

  onNavigate(() => {
    return () => setHeight()
  })
</script>


<section class="flex" id={data.item.fields.id}>
  {#if data.item.fields.cover}
  <figure class="col col--12of12 cover">
    <Media media={data.item.fields.cover} />
  </figure>
  {:else if data.item.fields.thumbnail}
  <figure class="col col--12of12 cover">
    <Media media={data.item.fields.thumbnail} />
  </figure>
  {/if}

  <div class="col col--4of12 col--mobile--12of12 flex flex--column">
    {#if data.item.fields.titre}
    <h1 class="h2">{data.item.fields.titre}</h1>
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
      <button class="button button--none" onclick={() => show = !show}>Lire {#if show}moins{:else}plus{/if}</button>
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

  <Contenu contenu={data.item.fields.contenu} />

  {#if data.item.fields.footer}
  <footer class="padded col col--4of12 col--tablet--8of12 col--mobile--12of12">
    <Rich body={data.item.fields.footer} />
  </footer>
  {/if}

  <nav class="col col--12of12 flex flex--gapped" class:flex--center={!data.item.fields.similaires?.length}>
    {#if data.item.fields.similaires?.length}
    <h3>Projets similaires</h3>
    {/if}
    <a href="/projets" class="button button--grey">Voir tous les projets</a>
    {#if data.item.fields.similaires?.length}
    <ol class="list--nostyle flex">
      {#each [...data.item.fields.similaires] as projet}
      <li class="col col--2of12 col--landscape--4of12 col--mobile--6of12" id={projet.fields.id}>
        <a href="/projets/{projet.fields.id}">
          <figure>
            {#if projet.fields.thumbnail}
            <Media media={projet.fields.thumbnail} rounded width={1000} />
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
      {#if data.item.fields.similaires.length > 6}
      {#each Array(data.item.fields.similaires.length % 6) as _}
      <li class="col col--2of12 col--landscape--4of12 col--mobile--12of12"></li>
      {/each}
      {/if}
    </ol>
    {/if}
  </nav>
</section>




<style lang="scss">
  section {
    padding: $s4 0;

    .cover {
      margin-top: calc($s4 * -1);
      margin-bottom: $s2;
    }

    @media (max-width: $mobile) {
      h1 {
        margin-bottom: $s1;
      }

      .cover {
        // margin-left: $s-1;
        // margin-right: $s-1;
        // margin-bottom: calc($s0 *1);

        // :global(img) {
        //   border-radius: 2px;
        // }
      }
    }

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

      // h1 + h2 {
      //   margin-top: auto;

      //   @media (max-width: $mobile) {
      //     margin-top: $s1;
      //   }
      // }
    }

    .details :global(table:first-child tr:first-child td) {
      border-top: none;
      padding-top: 0;
    }

    :global(table td:first-child) {
      width: 33%;

      @media (max-width: $mobile) {
        width: 49%;
      }
    }

    :global(td),
    :global(th) {
      border-top: 1px solid $muted;
    }

    nav {
      padding: 0 $s-1;
      margin-top: $s3;

      h3 + .button {
        margin-left: auto;
      }

      ol {
        width: calc(100% + (2 * $s-1));
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
      }
    }

    footer {
      border-left: 1px solid $muted;

      :global(table:first-child tr:first-child td) {
        border-top: none;
        padding-top: 0;
      }

      @media (min-width: $mobile) {
        margin-left: auto;
      }
    }
  }
</style>