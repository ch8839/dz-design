import fs from 'fs-extra'
import path from 'path'

import { EFileType } from '../../plop-templates/index'
import token from './token.json'

interface IOriginTokenItem {
    'id': number,
    'type': string,
    'key': string,
    'value': any,
    'token_type': number
}

interface ITokenItem {
    'key': string,
    'value': any,
}

type ITokenGroup = Array<ITokenItem>

type TTransformFunction = (tokenGroup: ITokenGroup, type: string) => string
interface IHandleFunctionMap {
    'base-scss': TTransformFunction,
    'common-scss': TTransformFunction,
    'base-js': TTransformFunction,
    'common-js': TTransformFunction,
    'base-dart': TTransformFunction,
    'common-dart': TTransformFunction,
}

type TFunctionType = keyof IHandleFunctionMap

const handleFunctionMap: IHandleFunctionMap = {
    'base-scss': transformBaseTokenOfScss,
    'common-scss': transformCommonTokenOfScss,
    'base-js': transformBaseTokenOfJs,
    'common-js': transformCommonTokenOfJs,
    'base-dart': transformBaseTokenOfDart,
    'common-dart': transformCommonTokenOfDart,
}


function transformBaseTokenOfScss(tokenGroup: ITokenGroup) {
    let resultStr = ''
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem

        const reg_num = /^[0-9]*$/
        const reg_rgb = /^rgb|rgba/
        if (!(reg_num.test(value) || reg_rgb.test(value))) value = `'${value}'` // 非纯数字或非RGB颜色值的加上引号
        const content = `$${keyName}: ${value};\n`
        resultStr += content
    }
    return resultStr
}

function transformCommonTokenOfScss(tokenGroup: ITokenGroup) {
    let resultStr = ''
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem
        const content = `$${keyName}: $${value};\n`
        resultStr += content
    }
    return resultStr
}

function transformBaseTokenOfJs(tokenGroup: ITokenGroup, type: string) {
    let tokenStrList = []
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem
        const reg = /^[0-9]*$/
        if (!reg.test(value)) value = `'${value}'` // 非纯数字的加上引号
        tokenStrList.push(`'${keyName}': ${value}`)
    }
    let tokenString = tokenStrList.join(',\n    ') + ','

    let resultStr = `const ${type} = {
    ${tokenString}
}
    `
    return resultStr
}

function transformCommonTokenOfJs(tokenGroup: ITokenGroup, type: string) {
    let tokenStrList = []
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem
        tokenStrList.push(`'${keyName}': ${type}['${value}']`)
    }
    let tokenString = tokenStrList.join(',\n    ') + ','

    let resultStr = `const common_${type} = {
    ${tokenString}
}
    `
    return resultStr
}

function transformBaseTokenOfDart(tokenGroup: ITokenGroup, type: string) {
    let tokenStrList = []
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem
        const reg_num = /^[0-9]*$/
        const reg_rgb = /^rgb|rgba/
        if (!reg_num.test(value) && !reg_rgb.test(value)) value = `'${value}'` // 非纯数字和非RGB色值的加上引号
        else if (reg_rgb.test(value)) value = `Color.fromRGBO${value.slice(4)}`
        tokenStrList.push(`'${keyName}': ${value}`)
    }
    let tokenString = tokenStrList.join(',\n    ') + ','

    let resultStr = `var ${type} = Map.from({
    ${tokenString}
})
    `
    return resultStr
}

function transformCommonTokenOfDart(tokenGroup: ITokenGroup, type: string) {
    let tokenStrList = []
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem
        tokenStrList.push(`'${keyName}': ${type}['${value}']`)
    }
    let tokenString = tokenStrList.join(',\n    ') + ','

    let resultStr = `var common_${type} = Map.from({
    ${tokenString}
})
    `
    return resultStr
}



function getTokenMap(token: Array<IOriginTokenItem>): any {
    let tokenMap: any = {}

    token.forEach((item: IOriginTokenItem) => {
        const type = item.type
        if (!tokenMap[type]) {
            tokenMap[type] = []
        }
        tokenMap[type].push({
            key: item.key,
            value: item.value,
        })
    })
    console.log('>>>tokenMap', tokenMap)
    return tokenMap
}


function generateHead(fileType: EFileType) {
    let result = ''
    if (fileType == 'dart') {
        result = `import 'dart:ui';\n\n`
    }

    return result
}

function generateTypeToken(token: Array<IOriginTokenItem>, fileType: EFileType, tokenType: 'base' | 'common') {
    let result = ''
    const tokenMap = getTokenMap(token)

    Object.entries(tokenMap).forEach(([key, tokenGroup]) => {
        const typeTips = `//${tokenType}-${key}\n` // 某个属性的注释
        const functionType = `${tokenType}-${fileType}`
        const handleFunciton = handleFunctionMap[functionType as TFunctionType]

        result += typeTips
        result += handleFunciton && handleFunciton(tokenGroup as ITokenGroup, key) || ''
        result += `\n`
    })

    return result
}

async function generateToken(fileType: EFileType) {

    const headResult = generateHead(fileType)
    const baseResult = generateTypeToken(token.base || [], fileType, 'base')
    const commonResult = generateTypeToken(token.common || [], fileType, 'common')

    let result = headResult + baseResult + commonResult

    const outputPath = path.resolve(process.cwd(), `./token-lib/`)
    if (!fs.existsSync(outputPath)) await fs.mkdir(outputPath)

    fs.writeFile(path.join(outputPath, `output.${fileType}`), result)
}



export default generateToken

// generateToken(token, 'scss')
// generateToken(token, 'js')
// generateToken(token, 'dart')


