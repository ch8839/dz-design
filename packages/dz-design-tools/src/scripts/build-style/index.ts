import fs from 'fs-extra'
import path from 'path'
import { build } from 'vite'

import { styleConfig, styleConfig2, themeConfig } from './config'

async function buildStyle() {
  // ensureDir
  await fs.ensureDir(path.resolve(process.cwd(), 'dist/style'))
  await fs.ensureDir(path.resolve(process.cwd(), 'es'))
  await fs.ensureDir(path.resolve(process.cwd(), 'lib'))

  await build(styleConfig)
  await build(styleConfig2)
  await build(themeConfig)
}

export default buildStyle
