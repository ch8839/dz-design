import path from 'path'
import fs from 'fs-extra'
import { Command } from 'commander'
// import { version } from './package.json'

import launchPlopOfGentoken from './scripts/gen-token'
import buildComponent from './scripts/build-component'
import genFullStyle from './scripts/gen-full-style'
import buildStyle from './scripts/build-style'

const packageContent = fs.readFileSync(
  path.resolve(__dirname, '../package.json'),
  'utf8'
)
const version: string = JSON.parse(packageContent).version

const program = new Command()

program.version(version).name('dz-design-tools').usage('command [options]')

program
  .command('gen:token')
  .description('生成design token')
  .action(() => {
    launchPlopOfGentoken()
  })

program
  .command('build:component')
  .description('构建组件')
  .action(async () => {
    await buildComponent()
  })

program
  .command('gen:style')
  .description('生成完整style文件')
  .action(async () => {
    await genFullStyle()
  })

program
  .command('build:style')
  .description('构建style文件')
  .action(async () => {
    await buildStyle()
  })

program.parse(process.argv)
