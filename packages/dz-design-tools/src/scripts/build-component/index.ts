import fs from 'fs-extra'
import path from 'path'
import { build, InlineConfig } from 'vite'

import { config } from './config'

async function runBuild() {
	await fs.emptyDir(path.resolve(process.cwd(), 'es'))
	await fs.emptyDir(path.resolve(process.cwd(), 'lib'))
	await build(config);
}

export default runBuild