<script lang="ts">
  import { type TypeCarouselSkeleton, isTypeProjet, isTypeText } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import emblaCarouselSvelte from 'embla-carousel-svelte'
  import Autoplay from 'embla-carousel-autoplay'
  import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'
  
  import Text from './Text.svelte'
  import Projet from './Projet.svelte'
  import Rich from './Rich.svelte'
  import Media from './Media.svelte';

  let { item }: {
    item: Entry<TypeCarouselSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let embla: EmblaCarouselType

  const options: EmblaOptionsType = {
    loop: true,
    dragFree: false,
    align: 'start'
  }
  const plugins: EmblaPluginType[] = [
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  ]
</script>

<section class="carousel" id={item.fields.id}>
  {#if item.fields.items && item.fields.items.length > 0}
    <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="list--nostyle embla__container">
        {#each item.fields.items as listItem, index}
        <li class="embla__slide" style:--slide-width={'100%'}>
          {#if isTypeText(listItem)}
          <figure>
            <Media media={listItem.fields.media} />
            <figcaption>
              <h4>{listItem.fields.titre}</h4>
            </figcaption>
          </figure>
            <!-- <Text item={listItem} first={index === 0} inside /> -->
          {:else if isTypeProjet(listItem)}
            <Projet item={listItem} hero />
          {/if}
        </li>
        {/each}
      </ul>
    </div>
  {/if}
</section>

<style lang="scss">
  .embla {
    overflow: hidden;
    // margin: 0 calc(-1 * $s-1);

    .embla__container {
      display: flex;
    }

    .embla__slide {
      flex: 0 0 var(--slide-width);
      min-width: 0;
      max-width: none;
      width: var(--slide-width);
      // padding: 0 $s-1;

      @media (max-width: $mobile) {
        --slide-width: 100% !important;
      }

      figure {
        height: 100lvh;

        @media (max-width: $mobile) {
          height: 50lvh;
        }

        figcaption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: $s-1;
          color: $light;
        }

        :global(img) {
          width: 100%;
          height: 100lvh;
          object-fit: cover;

          @media (max-width: $mobile) {
            height: 50lvh;
          }
        }
      }
    }
  }
</style>