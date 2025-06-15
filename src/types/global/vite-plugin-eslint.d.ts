/* eslint-disable */
declare module "vite-plugin-eslint" {
  import { Plugin } from "vite";
  interface Options {
    include?: string | string[];
    exclude?: string | string[];
    eslintPath?: string;
    cache?: boolean;
    fix?: boolean;
  }
  export default function eslintPlugin(options?: Options): Plugin;
}
