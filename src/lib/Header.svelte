<script lang="ts">
  import {
    Navbar,
    NavBrand,
    Button,
    Dropdown,
    DropdownItem,
  } from "flowbite-svelte";
  import About from "./About.svelte";
  import AppDarkMode from "./AppDarkMode.svelte";
  import IconApps from "~icons/ri/apps-2-fill";

  let dropdownOpen = false;
  let aboutOpen = false;

  const handleOpenAbout = () => {
    aboutOpen = true;
  };
</script>

<About bind:open={aboutOpen} />

<Navbar rounded color="form">
  <NavBrand>
    <img src="src/assets/stax-logo.png" class="mr-3 h-6 sm:h-9" alt="Logo" />
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
      <DropdownItem on:click={handleOpenAbout}>Sobre</DropdownItem>
      <AppDarkMode let:isDark let:toggleTheme>
        <DropdownItem on:click={toggleTheme}>
          Tema: {isDark ? "Escuro" : "Claro"}
        </DropdownItem>
      </AppDarkMode>
    </Dropdown>
  </div>
</Navbar>
