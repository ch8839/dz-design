import { spawn, execSync } from 'child_process'
import path from 'path'
async function buildStyle() {
    // spawn('gulp -f ./gulpfile.ts')
    execSync('pnpm run gulp', { cwd: path.resolve(__dirname), stdio: 'inherit' })
}

export default buildStyle