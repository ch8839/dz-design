"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.umdConfig = exports.esConfig = void 0;
const path_1 = __importDefault(require("path"));
const vite_1 = require("vite");
const vite_plugin_vue2_1 = require("vite-plugin-vue2");
const baseConfig = {
  build: {
    target: "modules",
    // emptyOutDir: false,
    minify: false,
    // minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      external: ["vue", "vue-demi", "@ss/mtd-vue2", "@vue/composition-api"],
    },
  },
  plugins: [(0, vite_plugin_vue2_1.createVuePlugin)({ jsx: true })],
};
const name = "dz-design-vue";
const esEntry = path_1.default.resolve(process.cwd(), "components/index.ts");
const esConfig = (0, vite_1.mergeConfig)(baseConfig, {
  build: {
    lib: {
      entry: esEntry,
      formats: ["es", "cjs"],
      name: name,
    },
    rollupOptions: {
      output: [
        {
          format: "es",
          dir: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "components",
        },
        {
          format: "cjs",
          dir: "lib",
          entryFileNames: "[name].js",
          preserveModules: true,
          preserveModulesRoot: "components",
        },
      ],
    },
  },
});
exports.esConfig = esConfig;
const umdEntry = path_1.default.resolve(process.cwd(), "index.ts");
const umdConfig = (0, vite_1.mergeConfig)(baseConfig, {
  build: {
    lib: {
      entry: umdEntry,
      formats: ["umd"],
      name: name,
    },
    rollupOptions: {
      output: [
        {
          format: "umd",
          dir: "dist",
          name: name,
          entryFileNames: "[name].js",
          globals: {
            vue: "Vue",
            "vue-demi": "vueDemi",
            "@ss/mtd-vue2": "mtdVue2",
          },
          // preserveModules: true,
          // preserveModulesRoot: 'components',
        },
      ],
    },
  },
});
exports.umdConfig = umdConfig;
//# sourceMappingURL=config.js.map
