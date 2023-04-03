import path from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'

async function genFullStyle() {
  let scssContent = ''
  const scssFiles = await glob(['**/index.scss'], {
    cwd: path.resolve(process.cwd(), './components'),
    ignore: ['./index.scss'],
  })
  scssFiles.forEach((file) => {
    scssContent += `@import './${file}';\n`
  })

  fs.writeFileSync(path.resolve(process.cwd(), './components/index.scss'), scssContent)
  console.log('generate index.scss success')
}

export default genFullStyle
