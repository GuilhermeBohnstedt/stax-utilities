<script lang="ts">
  import Grid from "svelte-grid";
  import { Spinner } from "flowbite-svelte";
  import type { GridCol, GridItem } from "svelte-grid";
  import gridHelp from "svelte-grid/build/helper";
  import Loadable from "svelte-loadable";
  import type { PackageConfiguration } from "src/models";

  const cols: GridCol[] = [[1280, 12]];
  let pkgs: PackageConfiguration[];

  const packagesPromise = new Promise<GridItem[]>(async (resolve, reject) => {
    window.packages
      .get<PackageConfiguration[]>()
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
    return import(`../../../packages/${findedPackage.identifier}/index.svelte`);
  };
</script>

{#await packagesPromise}
<div class="flex justify-center items-center h-full">
  <Spinner size="20" />
</div>
{:then items}
  <Grid {items} rowHeight={100} let:dataItem {cols}>
    <div class="h-full w-full bg-gray-100 dark:bg-gray-900">
      <Loadable loader={() => loadComponent(dataItem.id)} let:component>
        <svelte:component this={component} isPreview />
        <Spinner size="10" slot="loading" />
        <div slot="error" let:error>
          {error}
        </div>
      </Loadable>
    </div>
  </Grid>
{:catch error}
  <p style="color: red">{error}</p>
{/await}
