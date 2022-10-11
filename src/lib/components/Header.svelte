<script lang="ts">
  import { Navbar, NavBrand, Button, Dropdown } from "flowbite-svelte";
  import About from "./About.svelte";
  import IconApps from "~icons/ri/apps-2-fill";
  import IconPallete from "~icons/ri/palette-line";
  import IconInformation from "~icons/ri/information-line";

  import actionChangeTheme from "../actions/actionChangeTheme";

  let dropdownOpen = false;
  let aboutOpen = false;
  const listButtonClasses =
    "flex items-center space-x-2 font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left";

  const handleOpenAbout = () => {
    aboutOpen = true;
  };
</script>

<About bind:open={aboutOpen} />

<Navbar rounded color="form">
  <NavBrand>
    <img src="/stax-logo.png" class="mr-3 h-6 sm:h-9" alt="Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Stax Utilities</span
    >
  </NavBrand>

  <div class="flex md:order-2">
    <Button id="app-button" pill class="!p-2" color="alternative" size="xl">
      <IconApps />
    </Button>
    <Dropdown triggeredBy="#app-button" bind:open={dropdownOpen}>
      <li>
        <button class={listButtonClasses} on:click={handleOpenAbout}>
          <IconInformation />
          <span > Sobre </span>
        </button>
      </li>
      <li>
        <button class={listButtonClasses} use:actionChangeTheme>
          <IconPallete />
          <span > Alterar Tema </span>
        </button>
      </li>
    </Dropdown>
  </div>
</Navbar>
