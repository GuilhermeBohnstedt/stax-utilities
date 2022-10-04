<script lang="ts">
  import { Button, Card } from "flowbite-svelte";

  export let isPreview: boolean;

  const getNow = () => new Date().getTime();

  let elapsed = 0;
  let lastStartTime = getNow();
  let frame: number;

  const getElapsed = () => getNow() - lastStartTime;

  const handleReset = () => {
    lastStartTime = getNow();
    elapsed = getElapsed();
  };

  const handleStop = () => {
    cancelAnimationFrame(frame);
  };

  const handleStart = () => {
    lastStartTime = getNow() - elapsed;

    frame = requestAnimationFrame(function update() {
      elapsed = getElapsed();
      frame = requestAnimationFrame(update);
    });
  };

  $: clockString = new Date(elapsed)
    .toISOString()
    .slice(14, 23)
    .replace(".", ":");
</script>

{#if isPreview}
  <div class="w-full h-full p-10">
    <Card class="justify-center text-center w-full h-full max-w-full" size="lg" padding="lg">
      <p class="text-9xl tracking-wide dark:text-white">{clockString}</p>

      <div
        class="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"
      >
        <Button size="xl" color="alternative" on:click={handleReset}
          >Reiniciar</Button
        >
        <Button size="xl" color="red" on:click={handleStop}>Parar</Button>
        <Button size="xl" color="green" on:click={handleStart}>Iniciar</Button>
      </div>
    </Card>
  </div>
{/if}
