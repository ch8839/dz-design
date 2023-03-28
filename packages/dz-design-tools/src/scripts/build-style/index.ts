import { execSync } from 'child_process'
import path from 'path'

async function buildStyle() {
    execSync('pnpm run gulp', { cwd: path.resolve(__dirname), stdio: 'inherit' })
}

export default buildStyle