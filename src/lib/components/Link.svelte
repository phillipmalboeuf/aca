<script lang="ts">
  import type { TypeNavigationLinkSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import type { Snippet } from 'svelte'

  // import { openDialog } from '$lib/helpers'

  let { link, className = undefined, more = undefined, hide = undefined }: {
    link: Entry<TypeNavigationLinkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    more?: Snippet
    className?: string
    hide?: () => void
  } = $props()
</script>

<a class={className} onclick={hide} class:anchor={link.fields.destination?.includes('#')} href={link.fields.destination} {...link.fields.external && { target: '_blank', rel: 'external' }}>{link.fields.label}{#if more}{@render more()}{/if}</a>


<style lang="scss">
  // a {
  //   &.anchor {
  //     :global(svg) {
  //       transform: rotate(90deg);
  //     }
  //   }
  // }
</style>