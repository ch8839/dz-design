const fileTypeChoices = [
    {
        name: 'scss',
        value: 'scss',
    },
    {
        name: 'js',
        value: 'js',
    },
    {
        name: 'dart',
        value: 'dart',
    },
]

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
        const fileType = data.fileType
        return [
            {
                type: 'startGenerate',
                fileType: fileType,
            },
        ]
    },
}
