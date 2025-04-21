<script lang="ts">
  import { onMount } from 'svelte'
  import type { TypeArticleSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { date } from '$lib/formatters'
  
  import Media from './Media.svelte'
  import Rich from './Rich.svelte'

  const { article } : { article: Entry<TypeArticleSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string> } = $props()

  let overflowing = $state(false)
  let show = $state(false)
  let height = $state(0)

  let corps_wrapper: HTMLDivElement
  let corps: HTMLDivElement
  let media: HTMLElement

  onMount(() => {
    if (corps.clientHeight > media.clientHeight) {
      overflowing = true
      const paragraph = corps.querySelector('p')
      corps_wrapper.style.height = `calc(${paragraph.clientHeight + 30}px)`
      height = corps.clientHeight
    }
  })
</script>


<div class="flex flex--gapped article_wrapper">
  <hr class="col col--12of12" />  

  <figure class="col col--4of12 col--mobile--12of12 media" bind:this={media}>
    <Media media={article.fields.thumbnail} rounded />
  </figure>

  <article class="flex flex--gapped flex--column col col--4of12 col--mobile--12of12">
    <date>{date(article.fields.date)}</date>
    <h3>{article.fields.titre}</h3>
  </article>

  <div class="col col--4of12 col--mobile--12of12 corps_wrapper" class:overflowing class:show style:--height={height} bind:this={corps_wrapper}>
    <div class="flex flex--column flex--gapped corps" bind:this={corps}>
      <Rich body={article.fields.corps} />
    </div>

    {#if overflowing}
    <div class="overflowing_indicator">
      <button class="button button--none" onclick={() => show = !show}>Lire {#if show}moins{:else}plus{/if}</button>
    </div>
    {/if}
  </div>
</div>


<style lang="scss">
  .article_wrapper {
    padding-bottom: $s2;
    align-items: flex-start;
  }

  hr {
    margin: $s-2 0;
    color: rgba($light, 0.25);
  }

  article {
    h3 {
      max-width: 420px;

      @media (max-width: $mobile) {
        margin-bottom: $s1;
      }
    }
  }

  .overflowing_indicator {
    background: rgba($grey, 1);
  }
</style>