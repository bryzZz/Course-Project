/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-default-export */

import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? "/Zettel/" : undefined,
  resolve: {
    alias: {
      pages: path.resolve(__dirname, "./src/pages"),
      components: path.resolve(__dirname, "./src/components"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      types: path.resolve(__dirname, "./src/types"),
      assets: path.resolve(__dirname, "./src/assets"),
      models: path.resolve(__dirname, "./src/models"),
      services: path.resolve(__dirname, "./src/services"),
      constants: path.resolve(__dirname, "./src/constants"),
      routes: path.resolve(__dirname, "./src/routes"),
      context: path.resolve(__dirname, "./src/context"),
      utils: path.resolve(__dirname, "./src/utils"),
      store: path.resolve(__dirname, "./src/store"),
    },
  },
}));
