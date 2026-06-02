import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: "./index.html",
  },
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  output: {
    distPath: {
      root: "dist",
    },
    assetPrefix: "/ecuaciones-react/",
    overrideBrowserslist: ["> 0.5%", "last 2 versions", "not dead"],
  },
  server: {
    port: 3000,
  },
  tools: {
    rspack: {
      output: {
        chunkLoadingGlobal: "webpackChunk",
      },
      optimization: {
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            plotly: {
              test: /[\\/]node_modules[\\/](plotly|react-plotly)/,
              name: "plotly",
              chunks: "all",
              priority: 20,
            },
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)/,
              name: "react",
              chunks: "all",
              priority: 10,
            },
          },
        },
      },
    },
  },
});
