<script lang="ts">
  import { type TypeGallerieSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  // import emblaCarouselSvelte from 'embla-carousel-svelte'
  // import Autoplay from 'embla-carousel-autoplay'
  // import type { EmblaOptionsType, EmblaPluginType, EmblaCarouselType } from 'embla-carousel'
  
  // import Text from './Text.svelte'
  // import Article from './Article.svelte'
  import Link from './Link.svelte'
  import Media from './Media.svelte'

  let { item }: {
    item: Entry<TypeGallerieSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  // let embla: EmblaCarouselType

  // const options: EmblaOptionsType = {
  //   loop: true,
  //   dragFree: false,
  //   align: 'start'
  // }
  // const plugins: EmblaPluginType[] = [
  //   // Autoplay({
  //   //   delay: 0,
  //   //   stopOnInteraction: false,
  //   // })
  // ]
</script>

<section class="gallerie" id={item.fields.id}>
  <!-- {#if item.fields.titre}
    <div class="flex flex--gapped">
      <h4 class="col col--6of12">{@html item.fields.titre.replaceAll('\\n', '<br />')}</h4>
    </div>
  {/if} -->

  {#if item.fields.media && item.fields.media.length > 0}
    <!-- {#if item.fields.type === 'Slider'}
    <div class="embla" use:emblaCarouselSvelte={{ options: { ...options }, plugins, }} onemblaInit={e => embla = e.detail}>
      <ul class="list--nostyle embla__container">
        {#each [...item.fields.media, ...item.fields.media] as media}
        <li class="embla__slide" class:description={media.fields.description}>
          <figure style:--ar={`${media.fields.file.details.image.width} / ${media.fields.file.details.image.height}`}>
            <Media {media} dialog />
            {#if media.fields.description}
              <figcaption>{@html media.fields.description.replaceAll('\\n', '<br />')}</figcaption>
            {/if}
          </figure>
        </li>
        {/each}
      </ul>

      <button class="embla__prev button--none" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" fill="white" opacity="0.5"/><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="currentColor" stroke-width="1.41198"/></svg></button>
      <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" transform="rotate(-180 16 16.7502)" fill="white" opacity="0.5"/><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="currentColor" stroke-width="1.41198"/></svg></button>
    </div>
    {:else} -->
    <ul class="list--nostyle flex flex--gapped flex--spaced">
      {#each item.fields.media as media, index}
        {@const tags = media.metadata.tags.map(tag => tag.sys.id)}
        {@const tagged = !!media.metadata.tags.find(tag => tag.sys.id.startsWith('col'))}

        {#if tags.includes('seul')}
        <li class="col col--12of12 seul"></li>
        {/if}

        <li class:col--5of15={(!tagged && media.fields.file.details.image.width <= media.fields.file.details.image.height) || tags.includes('col5')} class:col--7of15={(!tagged && media.fields.file.details.image.width > media.fields.file.details.image.height) || tags.includes('col7')} class:col--10of15={(!tagged && media.fields.file.details.image.width > media.fields.file.details.image.height && !((index + 1) % 3)) || tags.includes('col10')} class:description={media.fields.description} class="media-item col col--mobile--12of12 {tags.map(tag => tag.startsWith('col') ? `${tag.replace('col', 'col--')}of15` : `tag--${tag}`).join(' ')}">
          <figure>
            <Media {media} rounded />
            <figcaption class="flex flex--column flex--gapped">
              <!-- {#if media.fields.title}<p>{@html media.fields.title.replaceAll('\\n', '<br />')}</p>{/if} -->
              {#if media.fields.description}<p>{@html media.fields.description.replaceAll('\\n', '<br />')}</p>{/if}
            </figcaption>
          </figure>
        </li>
      {/each}
    </ul>
    <!-- {/if} -->
  {/if}
</section>

<style lang="scss">
  .gallerie {
    padding: $s1 0;

    // h4 {
    //   margin-bottom: $s2;
    // }

    // .embla {
    //   overflow: hidden;
    //   margin: 0 calc(-1 * $s1);
    //   position: relative;

    //   .embla__container {
    //     display: flex;
    //   }

    //   .embla__slide {
    //     flex: 0 0 auto;
    //     min-width: 0;
    //     max-width: none;
    //     width: auto;
    //     // height: 50lvh;
        
    //     padding: 0 calc($s0 / 2);

    //     figure {
    //       aspect-ratio: var(--ar);
    //       height: 50lvh;
    //     }

    //     &.description {
    //       figure {
    //         height: calc(50lvh - $s2);
    //       }
    //     }

    //     :global(img),
    //     :global(video),
    //     :global(picture) {
    //       width: auto;
    //       height: 100%;
    //     }

    //     &:nth-child(2n) {
    //       margin-top: $s5;
    //     }
    //   }

    //   > button {
    //     position: absolute;
    //     top: 50%;
    //     transform: translateY(-50%);

    //     &.embla__prev {
    //       left: calc(1 * $s1);
    //     }

    //     &.embla__next {
    //       right: calc(1 * $s1);
    //     }
    //   }
    // }

    ul {
      row-gap: 0;
      // @media (min-width: $mobile) {
      //   row-gap: $s3;
      // }

      // .seul {
      //   display: block;
      //   height: 0;
      // }
    }

    .media-item {
      margin-bottom: $s3;

      @media (max-width: $mobile) {
        margin-bottom: $s-1;
      }

      figcaption {
        margin-top: $s-2;
      }

      &.tag--plein {
        width: 100%;
      }

      &.tag--droite {
        margin-left: auto;
      }

      &.tag--seul {
        // margin-right: 100%;
      }

      // flex: 1;
      // :global(img),
      // :global(video),
      // :global(picture) {
      //   width: auto;
      //   max-width: 33vw;
      //   max-height: 75lvh;

      //   @media (max-width: $mobile) {
      //     max-width: 100% !important;
      //   }
      // }

      // &:nth-child(3n + 1) {
      //   :global(img),
      //   :global(video),
      //   :global(picture) {
      //     max-width: 50vw;
      //   }
      // }

      // @media (max-width: $mobile) {
      //   &:nth-child(3n + 1) {
      //     margin-left: auto;
      //   }
      // }
    }

    // .descriptions {
    //   li {
    //     border-radius: $s-1;
    //     overflow: hidden;
    //   }
    // }
  }
</style>