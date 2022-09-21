declare module 'svelte-grid';

export declare class Grid extends Component {
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$prop_def: {
    fillSpace: boolean;
    items: Array<Record<string, string>>;
    rowHeight: number;
    cols: Array<number>;
    gap: Array<number>;
    fastStart: boolean;
  };
}