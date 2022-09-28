<script lang="ts">
  import Grid from "svelte-grid";
  import type { GridCol, GridItem } from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper";
  import Loadable from "svelte-loadable";
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

  const loadComponent = (id: string) => {
    const findedPackage = pkgs.find((pkg) => pkg.identifier === id);
    return import(`../../packages/${findedPackage.identifier}/index.svelte`);
  };
</script>

{#await packagesPromise}
  <SpinnerLoader />
{:then items}
  <div class="container">
    <Grid {items} rowHeight={100} let:dataItem {cols}>
      <div class="widget content">
        <Loadable loader={() => loadComponent(dataItem.id)} let:component>
          <svelte:component this={component} isPreview />
          <SpinnerLoader slot="loading" />
          <div slot="error" let:error>
            {error}
          </div>
        </Loadable>
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
