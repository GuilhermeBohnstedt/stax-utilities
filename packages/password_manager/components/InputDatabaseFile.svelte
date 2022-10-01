<script lang="ts">
  import IconDatabase from "~icons/ri/database-2-line";
</script>

<div class="flex items-center">
  <div class="relative w-full">
    <input
      type="file"
      placeholder="Selecionar arquivo"
      class="input input-bordered w-full block pr-10 pl-0 rounded-lg file:mr-4 file:py-2.5 file:px-4 file:rounded-btn file:border-0 file:font-semibold file:bg-gray-700 file:text-gray-300"
      required
    />

    <div
      class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none "
    >
      <IconDatabase />
    </div>
  </div>
</div>
