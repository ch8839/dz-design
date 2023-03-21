import fs from 'fs-extra'
import path from 'path'

import token from './token.json'

interface TokenItem {
    "id": number,
    "type": string,
    "key": string,
    "value": any,
    "token_type": number
}

const handleFunctionMap = {
    'base-scss': transformBaseTokenOfScss,
    'common-scss': transformCommonTokenOfScss,
    'base-js': transformBaseTokenOfJs,
    'common-js': transformCommonTokenOfJs,
    'base-dart': transformBaseTokenOfDart,    
    'common-dart': transformCommonTokenOfDart,
}


function transformBaseTokenOfScss(tokenGroup) {
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

function transformCommonTokenOfScss(tokenGroup) {
    let resultStr = ''
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem
        const content = `$${keyName}: $${value};\n`
        resultStr += content
    }
    return resultStr
}

function transformBaseTokenOfJs(tokenGroup, type) {
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

function transformCommonTokenOfJs(tokenGroup, type) {
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

function transformBaseTokenOfDart(tokenGroup, type) {
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

function transformCommonTokenOfDart(tokenGroup, type) {
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



function getTokenMap(token) {
    const tokenMap = {}

    token.forEach((item) => {
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


function generateHead(fileType) {
    let result = ''
    if(fileType == 'dart') {
        result = `import 'dart:ui';\n\n`
    }

    return result
}

function generateTypeToken(token: Array<TokenItem>, fileType: , tokenType) {
    let result = ''
    const tokenMap = getTokenMap(token)

    Object.entries(tokenMap).forEach(([key, tokenGroup]) => {
        const typeTips = `//${tokenType}-${key}\n` // 某个属性的注释
        const functionType = `${tokenType}-${fileType}`
        const handleFunciton = handleFunctionMap[functionType]

        result += typeTips
        result += handleFunciton && handleFunciton(tokenGroup, key) || ''
        result += `\n`
    })

    return result
}

async function generateToken(fileType: any) {
    
    const headResult = generateHead(fileType)
    const baseResult = generateTypeToken(token.base || [], fileType, 'base')
    const commonResult = generateTypeToken(token.common || [], fileType, 'common')

    let result = headResult + baseResult + commonResult

    const outputPath = path.resolve(process.cwd(), `./token-lib/`)
    if(!fs.existsSync(outputPath)) await fs.mkdir(outputPath)

    fs.writeFile(path.join(outputPath, `output.${fileType}`), result)
}



export default generateToken

// generateToken(token, 'scss')
// generateToken(token, 'js')
// generateToken(token, 'dart')


