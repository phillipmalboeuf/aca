<script lang="ts">
  import { type TypeListSkeleton, type TypeTextSkeleton, isTypeArticle, isTypeProjet, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'
  
  import Text from './Text.svelte'
  import Article from './Article.svelte'
  import Link from './Link.svelte'
  import Projet from './Projet.svelte'
  import Rich from './Rich.svelte';
  // import Question from './Question.svelte'

  let { item }: {
    item: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let embla: EmblaCarouselType

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    align: 'start'
  }
  const plugins: EmblaPluginType[] = [
    // Autoplay({
    //   delay: 0,
    //   stopOnInteraction: false,
    // })
  ]
</script>

<section class="list flex {item.fields.type}" id={item.fields.id}>
  {#if item.fields.titre}
  <h3 class="col col--4of12" class:hideonmobile={item.fields.titre === 'Anne Carrier Architectes'} class:col--mobile--9of12={item.fields.type === 'Slider'} class:col--mobile--12of12={item.fields.type !== 'Slider'}>{@html item.fields.titre.replaceAll('\\n', '<br />')}</h3>
  {/if}

  {#if item.fields.type === 'Slider'}
  <div class="col col--mobile--3of12 buttons">
    <div class="flex flex--tight_gapped flex--end">
      <button class="button button--grey" aria-label="Précédent" onclick={() => embla?.scrollPrev()}>
        <svg width="14" height="14" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2.68195 6.53073L6.29001 10.1388L5.42881 11L0.347317 5.91851L5.42881 0.837015L6.29001 1.7023L2.68195 5.30628L14 5.30628L14 6.53482L2.68195 6.53482L2.68195 6.53073Z" fill="white"/> </svg>
      </button>
      <button class="button button--grey" aria-label="Suivant" onclick={() => embla?.scrollNext()}>
        <svg width="14" height="14" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.3181 4.46926L7.70999 0.861201L8.57119 0L13.6527 5.08149L8.57119 10.163L7.70999 9.2977L11.3181 5.69372H0V4.46518H11.3181V4.46926Z" fill="white"/> </svg>
      </button>
    </div>
  </div>
  {/if}

  {#if item.fields.corps}
  <div class="col col--4of12 col--mobile--12of12"></div>
  <div class="col col--4of12 col--mobile--12of12">
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.corps} />
    </div>
  </div>
  {/if}

  {#if item.fields.items && item.fields.items.length > 0}
    {#if item.fields.type === 'Slider'}
    <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="list--nostyle embla__container">
        {#each item.fields.items as listItem, index}
        <li class="embla__slide" style:--slide-width={'33.33%'}>
          {#if isTypeText(listItem)}
            <Text item={listItem} first={index === 0} />
          {:else if isTypeArticle(listItem)}
            <Article article={listItem} />
          {:else if isTypeProjet(listItem)}
            <Projet item={listItem} />
          {/if}
        </li>
        {/each}
      </ul>
    </div>
    {:else}
    <ul class="list--nostyle flex">
      {#each item.fields.items as listItem, index}
      <li class="col col--4of12" class:col--mobile--6of12={isTypeProjet(listItem)} class:col--mobile--12of12={!isTypeProjet(listItem)}>
      {#if isTypeText(listItem)}
        <Text item={listItem} first={index === 0} />
      {:else if isTypeArticle(listItem)}
        <Article article={listItem} />
      {:else if isTypeProjet(listItem)}
        <Projet item={listItem} />
      {/if}
      </li>
      {/each}
    {#if item.fields.type === 'Colonnes' && item.fields.items.length % 3 !== 0}
      {#each Array(item.fields.items.length % 3) as _}
      <li class="col col--4of12 col--mobile--12of12"></li>
      {/each}
    {/if}
    </ul>
    {/if}
  {/if}
</section>

<style lang="scss">
  .list {
    &.Colonnes {
      row-gap: 0;

      width: calc(100% + (2 * $s-1));
      margin-left: calc(-1 * $s-1);
      margin-right: calc(-1 * $s-1);

      ul {
        row-gap: 0;
        
      }
      
      > .col,
      ul > .col {
        border-right: 1px solid $muted;
        padding: 0 $s-1;
        padding-bottom: $s4;

        &:nth-child(3n) {
          border-right-color: transparent;
        }

        @media (max-width: $mobile) {
          &.col--mobile--6of12 {
            padding-bottom: $s1;

            // &:not(:nth-child(3n)) {
            //   padding-right: 0;
            // }

            &:nth-child(3n) {
              border-right-color: $muted;
            }

            // &:not(:nth-child(2n)) {
            //   padding-right: $s-1;
            // }

            &:nth-child(2n) {
              border-right-color: transparent;
            }
          }

          &.col--mobile--12of12 {
            padding-right: 0;
            border-right-color: transparent;

            :global(h3) {
              border-top: 1px solid $muted;
              padding-top: $s0;
              margin-right: $s-1;
            }
          }
        }
      }

      &#projets-accueil ul > .col {
        &:nth-child(3n - 1) {
          padding-top: 25vw;
        }

        @media (max-width: $mobile) {
          &:nth-child(3n - 1) {
            padding-top: 0;
          }

          &:nth-child(2n - 1) {
            padding-top: 25vh;
          }
        }
      }

      &#tables {
        ul {
          li:first-child {
            :global(table td:first-child) {
              width: 49%;

              @media (min-width: $mobile) {
                width: 50%;
              }
            }
          }
        }
      }
    }
    
  }

  .hideonmobile {
    @media (max-width: $mobile) {
      display: none;
    }
  }

  .buttons {
    margin-left: auto;

    .button {
      padding: $s-2;
    }
  }

  .list.Slider {
    h3 {
      margin-bottom: $s0;
    }
  }

  .embla {
    overflow: hidden;
    margin: 0 calc(-1 * $s-1);

    .embla__container {
      display: flex;
      
    }

    .embla__slide {
      flex: 0 0 var(--slide-width);
      min-width: 0;
      max-width: none;
      width: var(--slide-width);
      padding: 0 $s-1;

      border-right: 1px solid $muted;

      @media (max-width: $mobile) {
        --slide-width: 100% !important;
      }
    }
  }
</style>