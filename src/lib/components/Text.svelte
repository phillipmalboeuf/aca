<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry, Asset } from 'contentful'
  import { onMount, type Snippet } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Link from './Link.svelte'

  let { item, inside, small, first }: {
    item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    first?: boolean
    inside?: boolean
    small?: boolean
  } = $props()

  let body_wrapper: HTMLDivElement = $state()
  let body: HTMLElement = $state()

  let overflowing = $state(false)
  let show = $state(false)
  let height = $state(0)

  function setHeight() {
    const windowHeight = window.innerHeight * 0.75
    if (body?.clientHeight && body.clientHeight > windowHeight) {
      overflowing = true

      const bottoms = Array.from(body.querySelectorAll('*')).map((el: HTMLElement) => el.offsetTop + el.offsetHeight)
      const closestBottom = bottoms.sort((a, b) => a - b).find(bottom => bottom > windowHeight) || bottoms[bottoms.length - 1]
      
      body_wrapper.style.height = `calc(${closestBottom + 30}px)`
      height = body.clientHeight
    }
  }

  onMount(() => {
    if (item.fields.maxPlus) {
      setHeight()
    }
  })

  // let desktop = $state(false)

  // onMount(() => {
  //   if (window.innerWidth > 888) {
  //     desktop = true
  //   }
  // })
</script>

<section class:no-media={!item.fields.media} class:inside id={item.fields.id}>
  {#if item.fields.media}
  <div class="flex media">
    <div class="col col--8of12 col--mobile--12of12">
      <figure>
        <Media media={item.fields.media} rounded />
      </figure>
    </div>
  </div>
  {/if}

  <div class="col col--12of12 flex">
    {#if item.fields.titre}
    <div class:col--4of12={!!item.fields.media} class:hideonmobile={item.fields.titre === 'Anne Carrier Architectes'} class="titre col col--mobile--12of12">
      <h3>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h3>
    </div>
    {/if}

    {#if item.fields.corps || item.fields.liens?.length}
    <div class:col--8of12={!!item.fields.media && !item.fields.secondMedia} class:col--4of12={!!item.fields.secondMedia} class="corps col col--mobile--12of12" class:overflowing class:show style:--height={height} bind:this={body_wrapper}>
      <article class="flex flex--column flex--gapped" bind:this={body}>
        {#if item.fields.corps}
          <Rich body={item.fields.corps} />
        {/if}

        {#if item.fields.liens?.length}
        <ul class="list--nostyle">
          {#each item.fields.liens as link}
            <li><Link className="button button--muted" {link} /></li>
          {/each}
        </ul>
        {/if}
      </article>

      {#if overflowing}
      <div class="overflowing_indicator">
        <button class="button button--none" onclick={() => show = !show}>Lire {#if show}moins{:else}plus{/if}</button>
      </div>
      {/if}
    </div>
    {/if}

    {#if item.fields.secondMedia}
    <div class="col col--4of12 col--mobile--12of12 second">
      <figure>
        <Media media={item.fields.secondMedia} rounded />
      </figure>
    </div>
    {/if}
  </div>
</section>

<style lang="scss">
  section {
    margin-bottom: $s1;
    // text-align: center;
    // min-height: 50lvh;
    
    // div {
    //   align-items: center;
    //   margin: 0 auto;
    // }

    .media {
      margin-bottom: $s2;

      @media (max-width: $mobile) {
        margin-bottom: $s0;
      }

      @media (min-width: $mobile) {
        width: calc(100% + ($s-1 * 2));
      }
    }

    &.inside .titre {
      width: 100%;
    }

    &:not(.inside) {
      @media (min-width: $mobile) {
        .col--8of12 {
          padding: 0 $s-1;
          margin-left: calc($s-1 * -1);
          margin-right: calc($s-1 * -1);
          border-right: 1px solid $muted;
        }

        .col--12of12 {
          margin: 0 calc($s-1 * -1);
          width: calc(100% + ($s-1 * 2));

          > .col {
            border-right: 1px solid $muted;
            padding: 0 $s-1 $s3;
          }
        }
      }

      @media (max-width: $mobile) {
        .col--12of12 {
          > .col {
            border-top: 1px solid $muted;
            padding: $s0 0 $s3;
          }
        }
      }
    }


    .hideonmobile {
      @media (max-width: $mobile) {
        display: none;
      }
    }

    :global(h3) {
      margin-bottom: $s0;
    }

    :global(hr) {
      margin: auto 0;
      background-color: transparent;

      @media (max-width: $mobile) {
        margin: $s2 0;
      }
    }

    :global(hr + h3) {
      margin-top: $s0;
    }

    .corps {
      :global(h2 + table td),
      :global(h3 + table td),
      :global(h4 + table td),
      :global(h5 + table td),
      :global(h6 + table td) {
        padding: 0;
      }
    }
  }

  // :global(section:has(> .no-media)) {
  //   text-align: center;
  // }
</style>