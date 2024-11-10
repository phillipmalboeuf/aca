<script lang="ts">
	import '../styles/styles.scss'

	import Intro from '$lib/components/Intro.svelte'
	// import Dialog from '$lib/components/Dialog.svelte'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'

	import { page } from '$app/stores'
	import type { Snippet } from 'svelte'

	import type { LayoutData } from './$types'
  let { data, children }: {
		data: LayoutData,
		children: Snippet
	} = $props()
</script>

<svelte:head>
	{#if $page.data.page?.fields}
	<title>{$page.data.page.fields.titre}</title>
	<meta name="description" content={$page.data.page.fields.description} />
	{/if}
</svelte:head>

<div class="{$page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {$page.url.pathname.replaceAll('/', '-')} {$page.data.page?.fields.dark ? 'dark' : ''}">
	<!-- <Dialog /> -->

	<!-- <Intro /> -->
	<Header navigation={data.navigations['menu']} />

	<main>
		{@render children()}
	</main>

	<Footer navigation={data.navigations['navigation']}
		footer={data.navigations['footer']}
		contact={data.navigations['contact']} />
</div>

<style lang="scss">
	div {
	}

	main {
	}
</style>
