<script lang="ts">
  import { page } from '$app/stores';
  import { i18n } from '$lib/i18n';
  import { languageTag } from '$lib/paraglide/runtime';
</script>

<a href={i18n.route($page.url.pathname)}
  data-sveltekit-reload
  hreflang={'en'}
  aria-current={languageTag() === 'en' ? "page" : undefined}>English</a>

<a href={i18n.route($page.url.pathname)}
  data-sveltekit-reload
  hreflang={'fr'}
  aria-current={languageTag() === 'fr' ? "page" : undefined}>Français</a>


<style lang="scss">
  a {
    &[aria-current="page"] {
      opacity: 0.5;
    }
  }
</style>
