"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_extra_1 = __importDefault(require("fs-extra"));
const gulp_1 = require("gulp");
const gulp_sass_1 = __importDefault(require("gulp-sass"));
const sass_1 = __importDefault(require("sass"));
const gulp_autoprefixer_1 = __importDefault(require("gulp-autoprefixer"));
const gulp_clean_css_1 = __importDefault(require("gulp-clean-css"));
const { existsSync, emptyDir, mkdirSync } = fs_extra_1.default;
const componentsPath = (0, path_1.resolve)(__dirname, '../../../../dz-design-vue');
// const componentsPath = resolve(process.cwd())
const libCssDir = (0, path_1.resolve)(componentsPath, 'lib/theme');
const themesDir = (0, path_1.resolve)(__dirname, 'themes');
function buildStyle() {
    ensureEmptyDir(libCssDir);
    const sass = (0, gulp_sass_1.default)(sass_1.default);
    const filePath = [(0, path_1.resolve)(componentsPath, 'components', '**/index.scss'), (0, path_1.resolve)(componentsPath, 'components/index.scss')];
    return (0, gulp_1.src)(filePath)
        .pipe(sass.sync())
        .pipe((0, gulp_autoprefixer_1.default)({ cascade: false }))
        .pipe((0, gulp_clean_css_1.default)())
        .pipe((0, gulp_1.dest)(libCssDir));
}
function buildThemes() {
    ensureEmptyDir(themesDir);
    ensureEmptyDir((0, path_1.resolve)(themesDir, 'dark'));
    const sass = (0, gulp_sass_1.default)(sass_1.default);
    return (0, gulp_1.src)((0, path_1.resolve)(__dirname, 'style/dark/*.scss'))
        .pipe(sass.sync({
        includePaths: ['node_modules']
    }))
        .pipe((0, gulp_autoprefixer_1.default)({ cascade: false }))
        .pipe((0, gulp_clean_css_1.default)())
        .pipe((0, gulp_1.dest)((0, path_1.resolve)(themesDir, 'dark')));
}
exports.default = (0, gulp_1.parallel)(buildStyle);
function ensureEmptyDir(dir) {
    existsSync(dir) ? emptyDir(dir) : mkdirSync(dir);
}
//# sourceMappingURL=gulpfile.js.map