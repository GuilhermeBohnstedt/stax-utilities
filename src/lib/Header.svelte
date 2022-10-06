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
</script>

<Navbar rounded color="form">
  <NavBrand>
    <img src="src/assets/stax-logo.png" class="mr-3 h-6 sm:h-9" alt="Logo" />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Stax Utilities</span
    >
  </NavBrand>

  <div class="flex md:order-2">
    <Button pill={true} class="!p-2" color="alternative" size="xl"><IconApps /></Button>
    <Dropdown>
      <About let:onClick>
        <DropdownItem on:click={onClick}>Sobre</DropdownItem>
      </About>
      <AppDarkMode let:isDark let:toggleTheme>
        <DropdownItem on:click={toggleTheme}>
          Tema: {isDark ? "Escuro" : "Claro"}
        </DropdownItem>
      </AppDarkMode>
    </Dropdown>
  </div>
</Navbar>
