<script lang="ts">
  export let isPreview: boolean;

  const handleClick = () => window.open("https://solitaired.com");
</script>

{#if isPreview}
  <div
    class="w-full h-full bg-[url('packages/solitarie/assets/banner_solitaire.jpg')] bg-center bg-cover"
  >
    <button
      class="btn btn-wide glass absolute bottom-5 right-5"
      on:click={handleClick}>Jogar</button
    >
  </div>
{/if}
