<script lang="ts">
  import Grid from "svelte-grid";
  import type { GridCol, GridItem } from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper";

  const id = () => "_" + Math.random().toString(36).substr(2, 9);

  let items: GridItem[] = [
    {
      12: gridHelp.item({
        x: 0,
        y: 0,
        w: 2,
        h: 2,
      }),
      id: id(),
    },
    {
      12: gridHelp.item({
        x: 2,
        y: 0,
        w: 2,
        h: 2,
      }),
      id: id(),
    },
  ];

  const cols: GridCol[] = [[1280, 12]];
</script>

<div class="container">
  <Grid bind:items rowHeight={100} let:item {cols}>
    <div class="widget content">
      {JSON.stringify(item)}
    </div>
  </Grid>
</div>

<style>
  .widget {
    background: #f1f1f1;
    height: 100%;
    width: 100%;
  }

  .container {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
  }
</style>
