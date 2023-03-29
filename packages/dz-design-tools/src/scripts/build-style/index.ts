import { execSync } from 'child_process'
import path from 'path'

async function buildStyle() {
    execSync('pnpm run gulp', { cwd: process.cwd(), stdio: 'inherit' })
}

export default buildStyle