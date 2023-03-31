"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EFileType = void 0;
var EFileType;
(function (EFileType) {
    EFileType["scss"] = "scss";
    EFileType["js"] = "js";
    EFileType["dart"] = "dart";
})(EFileType = exports.EFileType || (exports.EFileType = {}));
const fileTypeChoices = Object.keys(EFileType).map(key => {
    return {
        name: key,
        value: key
    };
});
console.log('>>>fileTypeChoices', fileTypeChoices);
module.exports = {
    description: 'generate design token',
    prompts: [
        {
            type: 'list',
            name: 'fileType',
            message: '请选择导出文件类型',
            choices: fileTypeChoices,
        },
    ],
    actions: (data) => {
        const fileType = data.fileType;
        return [
            {
                type: 'startGenerate',
                fileType: fileType,
            },
        ];
    },
};
//# sourceMappingURL=index.js.map