"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const plop_1 = require("plop");
function default_1() {
  plop_1.Plop.launch(
    {
      configPath: path_1.default.resolve(__dirname, "./plopfile.js"), // 当前依赖包文件路径下的plopfile.js文件
    },
    plop_1.run
  );
}
exports.default = default_1;
//# sourceMappingURL=index.js.map
