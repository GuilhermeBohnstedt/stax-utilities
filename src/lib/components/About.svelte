<script lang="ts">
  import { Modal, Img, P } from "flowbite-svelte";
  import Portal from "svelte-portal";

  export let open = false;
</script>

<Portal target="#modals">
  <Modal title="Sobre o Stax" bind:open size="sm" padding="sm">
    <Img
      src="/stax-logo.png"
      size="max-w-lg"
      alignment="mx-auto"
      alt="sample 1"
    />
    <P size="xs" align="center" opacity={1} space="normal">Versão: 0.0.0</P>
    <P size="base" height="relaxed" opacity={1} space="normal"
      >O Stax Utilities é uma aplicação que reune diversos utilitários para o
      dia a dia. No Dashboard é possível acompanhar dados importantes.</P
    >
  </Modal>
</Portal>
