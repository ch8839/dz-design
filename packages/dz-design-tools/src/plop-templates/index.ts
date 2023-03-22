export enum EFileType {
    scss = 'scss',
    js = 'js',
    dart = 'dart'
}

const fileTypeChoices = Object.keys(EFileType).map(key => {
    return {
        name: key,
        value: key
    }
})
console.log('>>>fileTypeChoices', fileTypeChoices)
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
    actions: (data: any) => {
        const fileType = data.fileType
        return [
            {
                type: 'startGenerate',
                fileType: fileType,
            },
        ]
    },
}
