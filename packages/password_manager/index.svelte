<script lang="ts">
  import InputDatabaseFile from "./components/InputDatabaseFile.svelte";

  export let isPreview: boolean;
</script>

{#if isPreview}
  <div class="w-full h-full p-3">
    <InputDatabaseFile />
  </div>
{/if}
