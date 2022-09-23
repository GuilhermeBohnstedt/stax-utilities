declare module "svelte-grid" {
  import type { SvelteComponentTyped } from "svelte";

  export type GridItem = Item;
  /**
   * Position 0 - Window Breakpoint
   * Position 1 - Number of Columns
   */
  export type GridCol = Col;

  export default class Grid extends SvelteComponentTyped<
    {
      fillSpace?: boolean;
      items: Array<Item>;
      rowHeight?: number;
      cols: Array<Array<number>>;
      gap?: Array<number>;
      fastStart?: boolean;
      throttleUpdate?: number;
      throttleResize?: number;
      sensor?: number;
      scroller?: Element;
    },
    {
      resize: () => void;
      change: () => void;
      mount: () => void;
      pointerup: () => void;
    }
  > {}
}

declare module "svelte-grid/build/helper" {
  interface GridHelp {
    normalize: (items: Array<Item>, col: Array<Array<number>>) => Array<Item>;

    adjust: (items: Array<Item>, col: Array<Array<number>>) => Array<Item>;

    item: (obj: Position & Dimension) => Item;

    findSpace: (
      item: Item,
      items: Array<Item>,
      col: Array<Array<number>>
    ) => Position;
  }
  const gridHelp: GridHelp = {};
  export default gridHelp;
}

type Position = {
  x: number;
  y: number;
};

type Dimension = {
  w: number;
  h: number;
};

type Item = Partial<{
  fixed: boolean;
  resizable: boolean;
  draggable: boolean;
  customDragger: boolean;
  customResizer: boolean;
  min: Dimension;
  max: Partial<Dimension>;
}> & { id: string; [col: number]: Item };

type Col = Array<number>;
