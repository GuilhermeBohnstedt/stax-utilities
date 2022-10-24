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
    },
    {
      default: {
        movePointerDown: string;
        resizePointerDown: string;
        dataItem: Item;
        item: Item;
        index: number;
      };
    }
  > {}
}

declare module "svelte-grid/build/helper" {
  interface GridHelp {
    normalize: (items: Array<Item>, col: Array<Array<number>>) => Array<ItemComputedColunm>;

    adjust: (items: Array<Item>, col: Array<Array<number>>) => Array<ItemComputedColunm>;

    item: (obj: Position & Dimension) => ItemComputedColunm;

    findSpace: (
      item: ItemComputedColunm,
      items: Array<ItemComputedColunm>,
      col: Array<Array<number>>
    ) => Position;
  }
  const gridHelp: GridHelp;
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

type ItemComputedColunm = Partial<{
  fixed: boolean;
  resizable: boolean;
  draggable: boolean;
  customDragger: boolean;
  customResizer: boolean;
  min: Dimension;
  max: Partial<Dimension>;
}>;

type Item = { id: string; [col: number]: ItemComputedColunm, dataItem: Record<string, any> };

type Col = Array<number>;
