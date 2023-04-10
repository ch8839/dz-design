"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const vite_1 = require("vite");
const config_1 = require("./config");
function runBuild() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_extra_1.default.emptyDir(path_1.default.resolve(process.cwd(), 'es'));
        yield fs_extra_1.default.emptyDir(path_1.default.resolve(process.cwd(), 'lib'));
        yield fs_extra_1.default.emptyDir(path_1.default.resolve(process.cwd(), 'dist'));
        // await build(esConfig)
        // await build(umdConfig)
        yield (0, vite_1.build)(config_1.themeConfig);
        yield (0, vite_1.build)(config_1.themeConfig2);
    });
}
exports.default = runBuild;
//# sourceMappingURL=index.js.map