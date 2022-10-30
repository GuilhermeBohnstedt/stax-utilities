import type { WindowDatabase } from "./database";

export type PluginsConfiguration = {
  name: string;
  version: string;
  path: string;
};

export interface WindowPlugin extends WindowDatabase {

}