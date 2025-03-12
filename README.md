## Hisun 个人博客文档 (学习笔记)


```js
$ pnpm install
$ pnpm dev
$ pnpm build
```
### 自动加载 .env.xxx 文件的变量, 添加至 `import.meta.env`
* pnpm add -D dotenv dotenv-cli
* 注意: 变量必须以 VITE_开头
* 方式一: dotenv-cli -> package.json -> dotenv -e .env.development
```js
// 方式一
"scripts": {
    "dev": "dotenv -e .env.development vuepress dev docs",
    "dev:clean": "dotenv -e .env.development vuepress dev docs --clean-cache",
    "build": "dotenv -e .env.production vuepress build docs",
  }
```
* 方式二: dotenv -> 调用 dotenv.config
```js
// 方式二
const customProcessEnv = {}
function extendEnvVars () {
  const envConfig = dotenv.config({
    processEnv: customProcessEnv,
    encoding: 'utf8'
  }).parsed;
  console.log('......envConfig', envConfig);
}
extendEnvVars()
```

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