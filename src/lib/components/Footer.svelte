<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  import Logo from './Logo.svelte'

  let { contact, footer }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    contact: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="padded flex flex--gapped">
  <div class="col col--4of12">
    <a href="/" class="logo">
      <h2>Anne Carrier Architectures</h2>
    </a>
  </div>
  
  <div class="col col--4of12">
    {#if contact?.fields.links?.length}
      <nav class="flex flex--column flex--gapped">
        {#each contact.fields.links as link}
        <div class="flex flex--gapped {link.fields.sousTitre?.replace(' ', '-')}">
          <div class="col col--5of12">
            <em>{link.fields.sousTitre}</em>
          </div>

          <div class="col col--7of12">
            <Link {link} />
          </div>
        </div>
        {/each}
      </nav>
    {/if}
  </div>

  <div class="col col--4of12 flex flex--gapped flex--end">
    <svg width="304" height="351" viewBox="0 0 304 351" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M62.8433 2.85608L0.964844 170.603H15.0477L32.5276 122.614H112.703L130.419 170.603H145.083L82.6452 2.85608H62.8433ZM36.9567 110.488L72.626 11.8863L108.295 110.488H36.9567Z" fill="white"/>
    <path d="M216.763 183.253L154.885 351H168.968L186.447 303.011H266.623L284.339 351H299.003L236.544 183.253H216.742H216.763ZM190.877 290.885L226.546 192.283L262.215 290.885H190.898H190.877Z" fill="white"/>
    <path d="M226.846 161.877C189.65 161.877 163.484 132.336 163.484 86.7115C163.484 41.0875 189.65 11.3738 226.846 11.3738C256.947 11.3738 282.468 29.0042 288.101 60.6099H303.797C297.432 23.0485 264.773 0 226.846 0C180.835 0 147.811 34.9383 147.811 86.733C147.811 138.528 180.835 173.466 226.846 173.466C264.773 173.466 296.938 150.181 303.797 111.695H288.101C282.468 144.483 257.442 161.899 226.846 161.899V161.877Z" fill="white"/>
    </svg>
  </div>

  <div class="col col--4of12">
    <small>© Anne Carrier Architectures 2024</small>
  </div>

  <div class="col col--4of12">
    {#if footer?.fields.links?.length}
      <nav class="flex flex--gapped">
        {#each footer.fields.links.slice(0, -1) as link}
          <small><Link {link} /></small>
        {/each}
      </nav>
    {/if}
  </div>
  <div class="col col--4of12">
    {#if footer?.fields.links?.length > 1}
      <nav>
        <small><Link link={footer.fields.links[footer.fields.links.length - 1]} /></small>
      </nav>
    {/if}
  </div>
</footer>

<style lang="scss">
  footer {
    padding: $s1 $s0 $s0;
    color: $dark;
    background-color: rgba($light, 0.25);

    .logo {
    }

    nav {
      em {
        font-style: normal;
        color: rgba($dark, 0.5);
      }

      div {
        &.Courriel,
        &.Média-Sociaux {
          margin-bottom: calc($s0 * -1);
        }
      }
    }
  }
</style>