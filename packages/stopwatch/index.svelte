<script lang="ts">
  import { Button, Card } from "flowbite-svelte";

  export let isPreview: boolean;

  const getNow = () => new Date().getTime();

  let elapsed = 0;
  let lastStartTime = getNow();
  let frame: number;
  let isStarted = false;

  const getElapsed = () => getNow() - lastStartTime;

  const updateTime = () => {
    elapsed = getElapsed();
    frame = requestAnimationFrame(updateTime);
  };

  const handleReset = () => {
    lastStartTime = getNow();
    elapsed = getElapsed();
  };

  const handlePause = () => {
    cancelAnimationFrame(frame);
    isStarted = false;
  };

  const handleStart = () => {
    lastStartTime = getNow() - elapsed;
    frame = requestAnimationFrame(updateTime);
    isStarted = true;
  };

  $: clockString = new Date(elapsed)
    .toISOString()
    .slice(14, 23)
    .replace(".", ":");
</script>

{#if isPreview}
  <div class="w-full h-full p-10 flex justify-center align-middle">
    <Card class="justify-center text-center" size="lg" padding="lg">
      <span class="flex text-8xl dark:text-white font-bold tabular-nums">
        {clockString}
      </span>
      <div
        class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
      >
        <Button size="xl" color="alternative" on:click={handleReset}
          >Reiniciar</Button
        >
        {#if isStarted}
          <Button size="xl" color="red" on:click={handlePause}>Pausar</Button>
        {:else}
          <Button size="xl" color="green" on:click={handleStart}>Iniciar</Button
          >
        {/if}
      </div>
    </Card>
  </div>
{/if}
