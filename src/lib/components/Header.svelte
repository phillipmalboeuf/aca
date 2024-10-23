<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  // import NoScroll from './NoScroll.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let visible = $state(false)
  let scrollY = $state<number>(0)
</script>

<!-- <svelte:window bind:scrollY /> -->

<!-- {#if visible}
<NoScroll />
{/if} -->

<header class="padded flex flex--gapped flex--spaced" class:scrolled={scrollY > 0}>
  <a href="/" class="logo" onclick={() => visible = false}>
    <Logo />
  </a>
  <button class:visible class="button--none h1 col col--4of12" onclick={() => visible = true}>Menu</button>
  <nav class:visible class="padded flex flex--column h1">
    {#each navigation.fields.links as link}
    <Link {link} className={$page.url.pathname.includes(link.fields.destination) ? 'active' : undefined} />
    {/each}

    <button class="button--none" onclick={() => visible = false}>
      <svg width="30" height="30" viewBox="0 0 30 30"><line x1="1.06066" y1="1.0995" x2="28.0607" y2="28.0995" stroke="currentColor" stroke-width="3"/><line x1="28.0607" y1="1.06066" x2="1.06066" y2="28.0607" stroke="currentColor" stroke-width="3"/></svg>
    </button>
  </nav>
</header>

<style lang="scss">
  header {

    .logo {
      :global(path:not(.initial)) {
        opacity: 0;
      }

      &:hover,
      &:focus {
        :global(path:not(.initial)) {
          opacity: 1;
        }
      }
    }

    > button {
      justify-content: flex-start;
      transition: opacity 666ms;

      &.visible {
        opacity: 0;
      }
    }

    nav {
      position: fixed;
      top: 0;
      right: 0;
      height: 100lvh;
      width: 33vw;
      background-color: fade-out($color: $light, $amount: 0.3);
      transition: transform 666ms;
      transform: translateX(100%);
      will-change: transform;

      > button {
        position: absolute;
        top: $s0;
        right: $s0;
      }

      &.visible {
        transform: translateX(0);
      }
    }
  }
</style>