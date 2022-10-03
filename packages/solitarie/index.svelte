<script lang="ts">
  import { Button } from "flowbite-svelte";

  export let isPreview: boolean;

  const handleClick = () => window.open("https://solitaired.com");
</script>

{#if isPreview}
  <div
    class="w-full h-full bg-[url('packages/solitarie/assets/banner_solitaire.jpg')] bg-center bg-cover"
  >
    <div class="absolute bottom-5 right-5">
      <Button
        shadow="lime"
        gradient
        color="tealToLime"
        size="xl"
        on:click={handleClick}>Jogar</Button
      >
    </div>
  </div>
{/if}
