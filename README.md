### [系统自带组件](https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html#codegroupitem)

### 自动注册组件
> pnpm i -D @vuepress/plugin-register-components@next

### 谷歌数据收集
> pnpm i -D @vuepress/plugin-google-analytics@next


### 引入本地目录
```js
"devDependencies": {
  "hisun-module1": "file:./custom-modules/module1",
  "hisun-module2": "file:./custom-modules/module2"
}
```
> 1. 当两个目录没有相互引用时
1. package.json 新增依赖的索引
2. 直接 pnpm install
> 2. custom-modules/module2 引入 custom-modules/module1 时
1. package.json 新增依赖的索引
2. cd custom-modules/module1  -> 创建软链 npm link
3. cd custom-modules/module1  -> 创建软链 npm link
4. cd 根目录 -> pnpm install
>`注意: 当 module1 下面有很多 js 时, 为避免耦合, 建议在 module1 根目录创建 index.js, 导出所有的需要导出的数据`