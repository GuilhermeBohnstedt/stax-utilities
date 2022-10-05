<script lang="ts">
  import { Navbar, NavBrand, NavLi, NavUl, DarkMode } from "flowbite-svelte";
</script>

<Navbar rounded color="form">
  <NavBrand href="/">
    <img
      src="src/assets/stax-logo.png"
      class="mr-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    />
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >Stax Utilities</span
    >
  </NavBrand>
  <NavUl class="order-1">
    <NavLi href="/" active={true}>Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/services">Services</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl>
  <div class="flex items-center md:order-2">
    <DarkMode
      btnClass="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    />
  </div>
</Navbar>
