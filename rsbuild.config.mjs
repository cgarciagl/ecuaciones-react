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
  performance: {
    preload: ({ type, path }) => {
      if (type === "js" && path.startsWith("static/js/async/")) {
        return { as: "script", fetchPriority: "low" };
      }
      return false;
    },
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
            echarts: {
              test: /[\\/]node_modules[\\/](echarts|echarts-gl|zrender)/,
              name: "echarts",
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
