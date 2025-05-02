<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'

  import Link from './Link.svelte'
  // import Logo from './Logo.svelte'

  let { contact, footer }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    contact: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<footer class="padded flex flex--gapped">
  <div class="col col--4of12 col--mobile--12of12">
    <a href="/" class="logo">
      <h3>Anne Carrier Architectes</h3>
    </a>
  </div>
  
  <div class="col col--4of12 col--mobile--12of12">
    {#if contact?.fields.links?.length}
      <nav class="flex flex--column flex--gapped contact">
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

  <div class="col col--4of12 col--mobile--12of12 flex flex--gapped flex--end">
    <svg viewBox="0 0 304 351">
    <path d="M62.8433 2.85608L0.964844 170.603H15.0477L32.5276 122.614H112.703L130.419 170.603H145.083L82.6452 2.85608H62.8433ZM36.9567 110.488L72.626 11.8863L108.295 110.488H36.9567Z" fill="white"/>
    <path d="M216.763 183.253L154.885 351H168.968L186.447 303.011H266.623L284.339 351H299.003L236.544 183.253H216.742H216.763ZM190.877 290.885L226.546 192.283L262.215 290.885H190.898H190.877Z" fill="white"/>
    <path d="M226.846 161.877C189.65 161.877 163.484 132.336 163.484 86.7115C163.484 41.0875 189.65 11.3738 226.846 11.3738C256.947 11.3738 282.468 29.0042 288.101 60.6099H303.797C297.432 23.0485 264.773 0 226.846 0C180.835 0 147.811 34.9383 147.811 86.733C147.811 138.528 180.835 173.466 226.846 173.466C264.773 173.466 296.938 150.181 303.797 111.695H288.101C282.468 144.483 257.442 161.899 226.846 161.899V161.877Z" fill="white"/>
    </svg>
  </div>

  <div class="col col--4of12 col--mobile--6of12">
    <nav class="flex flex--gapped flex--bottom">
      <small>© Anne Carrier Architectes 2024</small>
    </nav>
  </div>

  <div class="col col--4of12 col--mobile--6of12">
    {#if footer?.fields.links?.length === 1}
      <nav class="flex flex--gapped flex--bottom">
        <small><Link link={footer.fields.links[footer.fields.links.length - 1]} /></small>
      </nav>
    {:else if footer?.fields.links?.length}
      <nav class="flex flex--gapped flex--bottom">
        {#each footer.fields.links.slice(0, -1) as link}
          <small class="col col--5of12 col--mobile--12of12"><Link {link} /></small>
        {/each}
      </nav>
    {/if}
  </div>
  <div class="col col--4of12 col--mobile--12of12 last">
    {#if footer?.fields.links?.length > 1}
      <nav class="flex flex--gapped flex--bottom">
        <small><Link link={footer.fields.links[footer.fields.links.length - 1]} /></small>
      </nav>
    {/if}
  </div>
</footer>

<style lang="scss">
  footer {
    color: $dark;
    background-color: rgba($light, 0.25);
    row-gap: 0;

    :global(.dark) & {
      background-color: rgba($light, 0.35);
    }

    @media (min-width: $mobile) {
      padding: $s0 0;
    }

    @media (max-width: $mobile) {
      row-gap: $s2;
      padding-bottom: $s1;
    }

    .logo {
    }

    svg {
      width: 300px;
      height: auto;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }

    nav {
      @media (max-width: $mobile) {
        flex-direction: column;
        align-items: flex-start !important;
        // row-gap: 0;
      }

      em {
        font-style: normal;
        color: rgba($dark, 0.5);
      }

      div {
        &.Adresse,
        &.Téléphone {
          margin-bottom: calc($s-1 * 1);
        }
      }

      &.contact {
        row-gap: 0;
      }

      &.flex--bottom {
        @media (max-width: $mobile) {
          gap: 0;
        }
      }
    }

    .last {
      @media (max-width: $mobile) {
        margin-top: calc($s2 * -1);
        
        small:first-child:last-child {
          margin-left: calc(50% + $s-2 - 1px);
        }
      }
    }

    > .col {
      @media (min-width: $mobile) {
        padding: 0 $s-1;
        border-right: 1px solid $muted;

        &:nth-child(3n) {
          border-right-color: transparent;
        }
      }
    }
  }
</style>