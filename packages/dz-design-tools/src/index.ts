import path from 'path'
import fs from 'fs-extra'
import { Command } from 'commander'
// import { version } from './package.json'

import launchPlopOfGentoken from './scripts/gen-token'

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
    .action(function () {
      launchPlopOfGentoken()
    })

program.parse(process.argv)
