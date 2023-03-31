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
const commander_1 = require("commander");
// import { version } from './package.json'
const gen_token_1 = __importDefault(require("./scripts/gen-token"));
const build_component_1 = __importDefault(require("./scripts/build-component"));
const gen_full_style_1 = __importDefault(require("./scripts/gen-full-style"));
const build_style_1 = __importDefault(require("./scripts/build-style"));
const packageContent = fs_extra_1.default.readFileSync(path_1.default.resolve(__dirname, '../package.json'), 'utf8');
const version = JSON.parse(packageContent).version;
const program = new commander_1.Command();
program.version(version).name('dz-design-tools').usage('command [options]');
program
    .command('gen:token')
    .description('生成design token')
    .action(() => {
    (0, gen_token_1.default)();
});
program
    .command('build:component')
    .description('构建组件')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, build_component_1.default)();
}));
program
    .command('gen:style')
    .description('生成完整style文件')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, gen_full_style_1.default)();
}));
program
    .command('build:style')
    .description('构建style文件')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, build_style_1.default)();
}));
program.parse(process.argv);
//# sourceMappingURL=index.js.map