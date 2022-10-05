<script lang="ts">
  import { NavLi, Modal, Img, P } from "flowbite-svelte";

  let open = false;

  const handleClick = () => (open = true);
</script>

<NavLi on:click={handleClick}>Sobre</NavLi>

<Modal title="Sobre o Stax" bind:open size="sm" padding="sm">
  <Img
    src="src/assets/stax-logo.png"
    size="max-w-lg"
    alignment="mx-auto"
    alt="sample 1"
  />
  <P size="xs" align="center">Versão: 0.0.0</P>
  <P size="base" height="relaxed" 
    >O Stax Utilities é uma aplicação que reune diversos utilitários para o dia
    a dia. No Dashboard é possível acompanhar dados importantes.</P
  >
</Modal>
