import path from 'path'
import { Plop, run } from 'plop'

export default function () {
  Plop.launch(
    {
      configPath: path.resolve(__dirname, './plopfile.js'), // 当前依赖包文件路径下的plopfile.js文件
    },
    run as any
  )
}
