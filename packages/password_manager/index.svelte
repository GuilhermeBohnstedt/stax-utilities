<script lang="ts">
  import { Fileupload, Label } from "flowbite-svelte";

  export let isPreview: boolean;
</script>

{#if isPreview}
  <div class="w-full h-full p-3">
    <Label class="pb-2">Upload file</Label>
    <Fileupload />
  </div>
{/if}
