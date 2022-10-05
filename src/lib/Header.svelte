<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, DarkMode, NavHamburger } from "flowbite-svelte";
  import About from "./About.svelte";
</script>

<Navbar let:hidden let:toggle rounded color="form">
  <NavBrand>
    <img src="src/assets/stax-logo.png" class="mr-3 h-6 sm:h-9" alt="Logo"/>
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Stax Utilities</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    <NavLi href="/" active={true}>Home</NavLi>
    <About />
  </NavUl>
</Navbar>
