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

<section class="list flex flex--gapped {item.fields.type}" id={item.fields.id}>
  {#if item.fields.titre}
  <h4 class="col col--4of12">{@html item.fields.titre.replaceAll('\\n', '<br />')}</h4>
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
    <ul class="list--nostyle flex flex--gapped">
      {#each item.fields.items as listItem, index}
      <li class="col col--4of12">
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
    {/if}
  {/if}
  <!-- {#if item.fields.titre}
    <hr />
    <div class="flex flex--gapped">
      <h4 class:h1={item.fields.type === 'Colonnes'} class="col col--6of12">{@html item.fields.titre.replaceAll('\\n', '<br />')}</h4>
      {#if item.fields.liens && item.fields.liens.length > 0}
        <nav class="col col--6of12 flex flex--gapped flex--end">
          {#each item.fields.liens as link}
            <Link className="button button--grey" link={link} />
          {/each}
          {#if item.fields.type === 'Slider'}
            <button class="embla__prev button--none" onclick={() => embla?.scrollPrev()} aria-label="Précédent"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" fill="#1C4526"/><path d="M17.9453 11.0988L12.4813 16.836L17.9453 22.5733" stroke="white" stroke-width="1.41198"/></svg></button>
            <button class="embla__next button--none" onclick={() => embla?.scrollNext()} aria-label="Suivant"><svg width="32" height="33" viewBox="0 0 32 33"><circle cx="16" cy="16.7502" r="16" transform="rotate(-180 16 16.7502)" fill="#1C4526"/><path d="M14.0547 22.4016L19.5187 16.6643L14.0547 10.9271" stroke="white" stroke-width="1.41198"/></svg></button>
          {/if}
        </nav>
      {/if}
    </div>
  {/if}

  
    {:else}
    <ul class="list--nostyle flex flex--gapped" class:flex--thick_gapped={item.fields.type === 'Colonnes'}>
      {#each item.fields.items as listItem, index}
        {#if item.fields.type === 'Pilules' || item.fields.type === 'Italics' || item.fields.type === 'Accordeon'}
          <li>
            <details class={item.fields.type} name={item.sys.id} open={item.fields.type !== 'Accordeon' &&index === 0}>
              <summary class="{isTypeText(listItem) ? listItem.fields.couleur : ''} h3"
               class:h4={item.fields.type === 'Accordeon'}>
                {listItem.fields.titre}
                {#if item.fields.type === 'Accordeon'}
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="13.25" y1="0.525635" x2="13.25" y2="25.5256" stroke="currentColor" stroke-width="1.5"/>
                  <line x1="25" y1="13.7756" x2="-6.55671e-08" y2="13.7756" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                {/if}
              </summary>
              <article>
                {#if isTypeText(listItem)}
                  <Text item={listItem} first={index === 0} />
                {:else if isTypeArticle(listItem)}
                  <Article article={listItem} />
                {:else if isTypeQuestion(listItem)}
                  <Question item={listItem} id={item.sys.id} />
                {/if}
              </article>

              {#if item.fields.type === 'Pilules'}
                <Ecole type="two" />
              {/if}
            </details>
          </li>
        {:else}
          {#if isTypeText(listItem)}
          <li class="col" class:col--6of12={(item.fields.type === 'Colonnes' && item.fields.items.length < 3) || item.fields.type === 'Timeline'} class:col--4of12={item.fields.type === 'Colonnes' && item.fields.items.length === 3} class:col--3of12={item.fields.type === 'Colonnes' && item.fields.items.length > 3}>
            <Text item={listItem} first={index === 0} />
          </li>
          {:else if isTypeArticle(listItem)}
            <Article article={listItem} />
          {:else if isTypeQuestion(listItem)}
          <li class="col col--3of12 question">
            <Question item={listItem} id={item.sys.id} />
          </li>
          {/if}
        {/if}
      {/each}
    </ul>
    {/if}
  {/if} -->
</section>

<style lang="scss">
  .list {
    
  }

  .embla {
    overflow: hidden;
    // margin: 0 calc(-1 * $s1);

    .embla__container {
      display: flex;
      
    }

    .embla__slide {
      flex: 0 0 var(--slide-width);
      min-width: 0;
      max-width: none;
      width: var(--slide-width);
      padding-left: $s0;
    }
  }
</style>