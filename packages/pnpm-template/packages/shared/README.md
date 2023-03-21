# 平台公共资产包

> 例如沉淀一些 工具方法、VCA、通用组件 等

## 公共资产包引入
- 只需要一步，在需要使用的子包的 package.json 的 deps 中加入 'shared': 'workspace:0.1.0' 即可
- 打开任意文件，输入 import { xxx } from 'shared/src/lib/xx' 即可体验
