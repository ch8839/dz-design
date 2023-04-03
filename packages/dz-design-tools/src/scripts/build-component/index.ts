import fs from 'fs-extra'
import path from 'path'
import { build } from 'vite'

import { esConfig, umdConfig } from './config'

async function runBuild() {
  await fs.emptyDir(path.resolve(process.cwd(), 'es'))
  await fs.emptyDir(path.resolve(process.cwd(), 'lib'))
  await fs.emptyDir(path.resolve(process.cwd(), 'dist'))
  await build(esConfig)
  await build(umdConfig)
}

export default runBuild
