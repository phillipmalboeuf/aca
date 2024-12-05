<script lang="ts">
  import Contenu from '$lib/components/Contenu.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>


<Contenu contenu={data.page.fields.contenu} />


<style lang="scss">
  section {
    // margin: $s1 0;
  }
</style>