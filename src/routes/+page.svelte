<script lang="ts">
  import { onMount } from 'svelte'
  // import Page from './[page]/+page.svelte'

	// import Apple from '$lib/components/Apple.svelte'
  // import Google from '$lib/components/Google.svelte'
  // import Phone from '$lib/components/Phone.svelte'
  // import Triangle from '$lib/components/Triangle.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  onMount(() => {
  })
</script>


<section class="padded">
  <!-- <h1>Hello</h1> -->
</section>


<style lang="scss">
</style>