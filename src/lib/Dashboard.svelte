<script lang="ts">
  import Grid from "svelte-grid";
  import type { GridCol, GridItem } from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper";
  import type { PackageConfiguration } from "src/models";
  import SpinnerLoader from "./SpinnerLoader.svelte";

  const cols: GridCol[] = [[1280, 12]];
  let pkgs: PackageConfiguration[];

  const packagesPromise = new Promise<GridItem[]>(async (resolve, reject) => {
    window.api
      .get<PackageConfiguration[]>("packages")
      .then((response) => {
        const items: GridItem[] = response.data.map((pkg, index) => ({
          12: gridHelp.item({
            x: index * 4,
            y: 0,
            w: 4,
            h: 3,
          }),
          id: pkg.identifier,
        }));
        pkgs = response.data;
        resolve(items);
      })
      .catch(reject);
  });

  const getComponent = async (id: string) => {
    const findedPackage = pkgs.find((pkg) => pkg.identifier === id);
    return (
      await import(`../../packages/${findedPackage.identifier}/preview.svelte`)
    ).default;
  };
</script>

{#await packagesPromise}
  <SpinnerLoader />
{:then items}
  <div class="container">
    <Grid {items} rowHeight={100} let:dataItem {cols}>
      <div class="widget content">
        {#await getComponent(dataItem.id)}
          <SpinnerLoader />
        {:then component}
          <svelte:component this={component} />
        {:catch error}
          <p style="color: red">{error}</p>
        {/await}
      </div>
    </Grid>
  </div>
{:catch error}
  <p style="color: red">{error}</p>
{/await}

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
