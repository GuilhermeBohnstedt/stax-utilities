<script lang="ts">
  import Grid from "svelte-grid";
  import type { GridCol, GridItem } from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper";
  import { onMount } from "svelte";
  import type { PackageConfiguration } from "src/models";

  let items: GridItem[] = [];

  const cols: GridCol[] = [[1280, 12]];

  onMount(() => {
    window.api.get<PackageConfiguration[]>("packages").then((response) => {
      items = response.data.map((pkg, index) => ({
        12: gridHelp.item({
          x: index * 2,
          y: 0,
          w: 2,
          h: 2,
        }),
        id: pkg.identifier,
      }));
    });
  });
</script>

<div class="container">
  <Grid bind:items rowHeight={100} let:item {cols}>
    <div class="widget content">
      {item.id}
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
