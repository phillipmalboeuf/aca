<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  let show = $state(false)
  let hide = $state(false)

  const speed = 666
  
  onMount(() => {
    show = true

    setTimeout(() => {
      hide = true
    }, speed * 3)
  })
</script>

{#if !hide}
<figure transition:fade={{
  duration: speed
}}>
  <h1>
    {#if show}
    <span transition:fade={{
      duration: speed,
      delay: speed * 0
    }}><svg viewBox="0 0 368 429"><path d="M157.895 0L0 428.698H35.9352L80.5387 306.056H285.123L330.33 428.698H367.746L208.424 0H157.895ZM91.8405 275.066L182.858 23.0778L273.876 275.066H91.8405Z" /></svg></span>
    <span transition:fade={{
      duration: speed,
      delay: speed * 1
    }}><svg viewBox="0 0 400 443"><path d="M202.726 413.33C107.768 413.33 40.9674 337.9 40.9674 221.405C40.9674 104.911 107.768 29.0413 202.726 29.0413C279.571 29.0413 344.725 74.058 359.106 154.759H399.175C382.928 58.8511 299.551 0 202.726 0C85.2631 0 0.953125 89.21 0.953125 221.46C0.953125 353.711 85.2631 442.921 202.726 442.921C299.551 442.921 381.666 383.466 399.175 285.197H359.106C344.725 368.918 280.834 413.385 202.726 413.385V413.33Z"/></svg></span>
    <span transition:fade={{
      duration: speed,
      delay: speed * 2
    }}><svg viewBox="0 0 368 429"><path d="M157.895 0L0 428.698H35.9352L80.5387 306.056H285.123L330.33 428.698H367.746L208.424 0H157.895ZM91.8405 275.066L182.858 23.0778L273.876 275.066H91.8405Z" /></svg></span>
    {/if}
  </h1>
</figure>
{/if}

<style lang="scss">
  figure {
    position: fixed;
    z-index: 50;
    inset: 0;
    background-color: $beige;
    padding: $s-1;

    h1 {
      display: flex;
      flex-wrap: wrap;
      gap: $s-1;
      // font-size: 50vh;
      // line-height: 1;
      color: $light;

      span {
        &:last-child {
          width: 100%;
        }
      }

      svg {
        height: calc(50vh - ($s-1 * 2));
        width: auto;
      }
    }
  }
</style>