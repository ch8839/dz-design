"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const token_json_1 = __importDefault(require("./token.json"));
const handleFunctionMap = {
    'base-scss': transformBaseTokenOfScss,
    'common-scss': transformCommonTokenOfScss,
    'base-js': transformBaseTokenOfJs,
    'common-js': transformCommonTokenOfJs,
    'base-dart': transformBaseTokenOfDart,
    'common-dart': transformCommonTokenOfDart,
};
function transformBaseTokenOfScss(tokenGroup) {
    let resultStr = '';
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem;
        const reg_num = /^[0-9]*$/;
        const reg_rgb = /^rgb|rgba/;
        if (!(reg_num.test(value) || reg_rgb.test(value)))
            value = `'${value}'`; // 非纯数字或非RGB颜色值的加上引号
        const content = `$${keyName}: ${value};\n`;
        resultStr += content;
    }
    return resultStr;
}
function transformCommonTokenOfScss(tokenGroup) {
    let resultStr = '';
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem;
        const content = `$${keyName}: $${value};\n`;
        resultStr += content;
    }
    return resultStr;
}
function transformBaseTokenOfJs(tokenGroup, type) {
    let tokenStrList = [];
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem;
        const reg = /^[0-9]*$/;
        if (!reg.test(value))
            value = `'${value}'`; // 非纯数字的加上引号
        tokenStrList.push(`'${keyName}': ${value}`);
    }
    let tokenString = tokenStrList.join(',\n    ') + ',';
    let resultStr = `const ${type} = {
    ${tokenString}
}
    `;
    return resultStr;
}
function transformCommonTokenOfJs(tokenGroup, type) {
    let tokenStrList = [];
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem;
        tokenStrList.push(`'${keyName}': ${type}['${value}']`);
    }
    let tokenString = tokenStrList.join(',\n    ') + ',';
    let resultStr = `const common_${type} = {
    ${tokenString}
}
    `;
    return resultStr;
}
function transformBaseTokenOfDart(tokenGroup, type) {
    let tokenStrList = [];
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem;
        const reg_num = /^[0-9]*$/;
        const reg_rgb = /^rgb|rgba/;
        if (!reg_num.test(value) && !reg_rgb.test(value))
            value = `'${value}'`; // 非纯数字和非RGB色值的加上引号
        else if (reg_rgb.test(value))
            value = `Color.fromRGBO${value.slice(4)}`;
        tokenStrList.push(`'${keyName}': ${value}`);
    }
    let tokenString = tokenStrList.join(',\n    ') + ',';
    let resultStr = `var ${type} = Map.from({
    ${tokenString}
})
    `;
    return resultStr;
}
function transformCommonTokenOfDart(tokenGroup, type) {
    let tokenStrList = [];
    for (let tokenItem of tokenGroup) {
        let { key: keyName, value } = tokenItem;
        tokenStrList.push(`'${keyName}': ${type}['${value}']`);
    }
    let tokenString = tokenStrList.join(',\n    ') + ',';
    let resultStr = `var common_${type} = Map.from({
    ${tokenString}
})
    `;
    return resultStr;
}
function getTokenMap(token) {
    let tokenMap = {};
    token.forEach((item) => {
        const type = item.type;
        if (!tokenMap[type]) {
            tokenMap[type] = [];
        }
        tokenMap[type].push({
            key: item.key,
            value: item.value,
        });
    });
    console.log('>>>tokenMap', tokenMap);
    return tokenMap;
}
function generateHead(fileType) {
    let result = '';
    if (fileType == 'dart') {
        result = `import 'dart:ui';\n\n`;
    }
    return result;
}
function generateTypeToken(token, fileType, tokenType) {
    let result = '';
    const tokenMap = getTokenMap(token);
    Object.entries(tokenMap).forEach(([key, tokenGroup]) => {
        const typeTips = `//${tokenType}-${key}\n`; // 某个属性的注释
        const functionType = `${tokenType}-${fileType}`;
        const handleFunciton = handleFunctionMap[functionType];
        result += typeTips;
        result += handleFunciton && handleFunciton(tokenGroup, key) || '';
        result += `\n`;
    });
    return result;
}
function generateToken(fileType) {
    return __awaiter(this, void 0, void 0, function* () {
        const headResult = generateHead(fileType);
        const baseResult = generateTypeToken(token_json_1.default.base || [], fileType, 'base');
        const commonResult = generateTypeToken(token_json_1.default.common || [], fileType, 'common');
        let result = headResult + baseResult + commonResult;
        const outputPath = path_1.default.resolve(process.cwd(), `./token-lib/`);
        if (!fs_extra_1.default.existsSync(outputPath))
            yield fs_extra_1.default.mkdir(outputPath);
        fs_extra_1.default.writeFile(path_1.default.join(outputPath, `output.${fileType}`), result);
    });
}
exports.default = generateToken;
// generateToken(token, 'scss')
// generateToken(token, 'js')
// generateToken(token, 'dart')
//# sourceMappingURL=gen-token.js.map