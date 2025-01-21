<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'
  import Locales from './Locales.svelte'
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

<header class="padded flex flex--spaced" class:scrolled={scrollY > 0}>
  <a href="/" class="logo" onclick={() => visible = false}>
    <Logo />
  </a>
  <button class:visible class="button--none h1 col col--4of12" onclick={() => visible = true}>
    <svg width="20" height="22" viewBox="0 0 20 22">
      <line y1="11" x2="20" y2="11" stroke="currentColor" stroke-width="2"/>
      <line y1="21" x2="20" y2="21" stroke="currentColor" stroke-width="2"/>
      <line y1="1" x2="20" y2="1" stroke="currentColor" stroke-width="2"/>
    </svg>
    <span class="initial">M</span><span>enu</span>
  </button>
  <nav class:visible class="padded flex flex--column h1">
    {#each navigation.fields.links as link}
    <Link {link} className={$page.url.pathname.includes(link.fields.destination) ? 'active' : undefined} hide={() => visible = false} />
    {/each}

    <aside class="flex flex--gapped">
      <span>Anne Carrier Architectures</span>
      <Locales />
    </aside>

    <button class="button--none" onclick={() => visible = false} aria-label="Fermer le menu">
      <svg width="30" height="30" viewBox="0 0 30 30"><line x1="1.06066" y1="1.0995" x2="28.0607" y2="28.0995" stroke="currentColor" stroke-width="3"/><line x1="28.0607" y1="1.06066" x2="1.06066" y2="28.0607" stroke="currentColor" stroke-width="3"/></svg>
    </button>
  </nav>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    z-index: 88;

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

      @media (max-width: $mobile) {
        width: 75%;
        :global(svg) {
          width: 100%;
        }
      }
    }

    > button {
      justify-content: flex-start;
      gap: 0;
      transition: opacity 666ms;
      line-height: 0;

      @media (max-width: $mobile) {
        width: auto !important;
      }

      @media (min-width: $mobile) {
        :global(svg) {
          display: none;
        }
      }
      
      span {
        opacity: 0;
        transition: opacity 666ms;

        &.initial {
          opacity: 1;
        }

        @media (max-width: $mobile) {
          display: none;
        }
      }

      &:hover,
      &:focus {
        span {
          opacity: 1;
        }
      }

      &.visible {
        opacity: 0;
      }
    }

    nav {
      position: fixed;
      z-index: 88;
      top: 0;
      right: 0;
      height: 100lvh;
      width: calc(33vw + $s1);
      color: $dark;
      background-color: fade-out($color: $light, $amount: 0.3);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      transition: transform 666ms;
      transform: translateX(100%);
      will-change: transform;

      @media (max-width: $mobile) {
        width: 100%;
      }

      > button {
        position: absolute;
        top: $s0;
        right: $s0;
      }

      &.visible {
        transform: translateX(0);
      }

      aside {
        font-size: $s0;
        margin-top: auto;
        column-gap: $s2;

        span {
          flex: 1;
        }
      }
    }
  }
</style>