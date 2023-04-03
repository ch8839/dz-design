const fs = require('fs')
const msg = fs.readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim()

console.log('>>>msg', msg)
