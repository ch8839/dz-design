import { resolve } from 'path'
import fs from 'fs-extra'
import { dest, src, parallel, run } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'

const { existsSync, emptyDir, mkdirSync } = fs
const componentsPath = resolve(__dirname, '../../../../dz-design-vue')

const esCssDir = resolve(componentsPath, 'es/css')
const libCssDir = resolve(componentsPath, 'lib/css')
const themesDir = resolve(__dirname, 'themes')

function buildStyle() {
  ensureEmptyDir(esCssDir)
  ensureEmptyDir(libCssDir)

  const sass = gulpSass(dartSass)

  const filePath = [resolve(componentsPath, 'components', '**/index.scss'), resolve(componentsPath, 'components/index.scss')]
  console.log('>>>filePath', filePath)
  return src(filePath)
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(esCssDir))
    .pipe(dest(libCssDir))
}

function buildThemes() {
  ensureEmptyDir(themesDir)
  ensureEmptyDir(resolve(themesDir, 'dark'))

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/dark/*.scss'))
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(resolve(themesDir, 'dark')))
}

export default parallel(buildStyle)

function ensureEmptyDir(dir: string) {
  existsSync(dir) ? emptyDir(dir) : mkdirSync(dir)
}
