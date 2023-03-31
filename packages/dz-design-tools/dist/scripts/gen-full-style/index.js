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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const fast_glob_1 = __importDefault(require("fast-glob"));
function genFullStyle() {
    return __awaiter(this, void 0, void 0, function* () {
        let scssContent = '';
        const scssFiles = yield (0, fast_glob_1.default)(['**/index.scss'], {
            cwd: path_1.default.resolve(process.cwd(), './components'),
            ignore: ['./index.scss']
        });
        scssFiles.forEach(file => {
            scssContent += `@import './${file}';\n`;
        });
        fs_extra_1.default.writeFileSync(path_1.default.resolve(process.cwd(), './components/index.scss'), scssContent);
        console.log('generate index.scss success');
    });
}
exports.default = genFullStyle;
//# sourceMappingURL=index.js.map