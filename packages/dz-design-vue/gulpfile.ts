import { resolve } from 'path'
import fs from 'fs-extra'
import { dest, src, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'

const { existsSync, emptyDir, mkdirSync } = fs
// const componentsPath = resolve(__dirname, '../../../../dz-design-vue')
const componentsPath = resolve(process.cwd())

const cssDir = resolve(componentsPath, 'dist/theme')
const themesDir = resolve(__dirname, 'themes')

function buildStyle() {
  ensureEmptyDir(cssDir)

  const sass = gulpSass(dartSass)

  const filePath = [
    resolve(componentsPath, 'components', '**/index.scss'),
    resolve(componentsPath, 'components/index.scss'),
  ]

  return src(filePath)
    .pipe(
      sass.sync({
        includePaths: ['node_modules'],
      })
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(cssDir))
}

function buildThemes() {
  ensureEmptyDir(themesDir)
  ensureEmptyDir(resolve(themesDir, 'dark'))

  const sass = gulpSass(dartSass)

  return src(resolve(__dirname, 'style/dark/*.scss'))
    .pipe(
      sass.sync({
        includePaths: ['node_modules'],
      })
    )
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS())
    .pipe(dest(resolve(themesDir, 'dark')))
}

export default parallel(buildStyle)

function ensureEmptyDir(dir: string) {
  existsSync(dir) && mkdirSync(dir)
}
