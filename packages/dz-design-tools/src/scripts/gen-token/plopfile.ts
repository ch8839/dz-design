const tokenGenerator = require('../../plop-templates/index')
import generateToken from './gen-token'

export default function (plop: any) {
  plop.setGenerator('gen:token', tokenGenerator)
  plop.setActionType('startGenerate', async function (answers: any, config: any, plop: any) {
    const { fileType } = config
    generateToken(fileType)
  })
}
