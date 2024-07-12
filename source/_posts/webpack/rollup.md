---
title: rollup的基本使用
categories: 前端
tags: rollup
cover: /img/post/rollup.png
abbrlink: d21b8b7d
date: 2023-01-09 12:00:00
---

## 1. rollup 的基本使用

### 1.1 安装

```
npm install rollup -D
```

### 1.2 rollup 配置文件编写

```
module.exports = {
  // 入口
  input: './lib/index.js',
  // 出口
  // output: {
  //   format: 'umd',
  //   name: 'ysUtils',
  //   file: './build/bundle.umd.js'
  // }
  // 打包不同格式
  output: [
    {
      format: 'umd',
      name: 'ysUtils',
      file: './build/bundle.umd.js'
    },
    {
      format: 'amd',
      file: './build/bundle.amd.js'
    },
    {
      format: 'cjs',
      file: './build/bundle.cjs.js'
    },
    {
      format: 'iife',
      name: 'ysUtils',
      file: './build/bundle.browser.js'
    }
  ]
}
```

### 1.3 解决 commonjs 的问题

- rollup 默认情况下只会处理 es module,解决这个问题则需要安装对应插件

```shell
npm install @rollup/plugin-commonjs -D
```

- `rollup` 并不支持直接打包 `node-modules` 里面的内容，所以需要安装 `rollup-plugin-node-resolve` 插件

```
npm install @rollup/plugin-node-resolve -D
```

- 配置文件

```js
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
module.exports = {
  input: "./src/index.js",
  output: {
    format: "iife",
    name: "main",
    file: "./build/build.js",
  },
  plugins: [commonjs(), nodeResolve()],
};
```

## 2. rollup 使用 babel 转换 js 代码

1. 安装 babel 插件

```
npm install @rollup/plugin-babel @babel/preset-env -D
```

2. 编写 babel.config.js 文件

```
module.exports = {
  presets: ['@babel/preset-env']
}
```

3. 使用 terser 压缩代码

```
npm install @rollup/plugin-terser -D
```

4. 配置文件

```js
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
// 代码转化
const { babel } = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");
module.exports = {
  input: "./src/index.js",
  output: {
    format: "iife",
    name: "main",
    file: "./build/build.js",
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      // polyfill 转化promised等
      babelHelpers: "bundled",
      exclude: /node_modules/,
    }),
    terser(),
  ],
};
```

## 3. rollup 处理 css 文件

1. 处理 css 文件，可以使用 postcss

```
npm install rollup-plugin-postcss postcss postcss-preset-env -D
```

2. 配置文件

```js
const postcss = require("rollup-plugin-postcss");
module.exports = {
  input: "./src/index.js",
  output: {
    format: "iife",
    name: "main",
    file: "./build/build.js",
  },
  plugins: [postcss({ plugins: [require("postcss-preset-env")] })],
};
```

## 4. rollup 处理 vue 文件

1. 安装 rollup-plugin-vue 插件

```
npm install rollup-plugin-vue @vue/compiler-sfc -D
```

2. 在打包的 vue 代码中，用到 process.env.NODE_ENV，所以可以使用一个插件 rollup-plugin-replace 设置它对应的值：

```
npm install @rollup/plugin-replace -D
```

3. 配置文件

```js
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");

// 代码转换和压缩
const { babel } = require("@rollup/plugin-babel");
const terser = require("@rollup/plugin-terser");

const postcss = require("rollup-plugin-postcss");
const vue = require("rollup-plugin-vue");
// 注入变量
const replace = require("rollup-plugin-replace");

module.exports = {
  // ...
  plugins: [
    // 插件有先后顺序，vue()放到 postcss() 前面，否则后面修改css内容会报错
    vue(),
    commonjs(),
    nodeResolve(),
    babel({
      // polyfill
      babelHelpers: "bundled",
      exclude: /node_modules/,
    }),
    terser(),
    postcss({ plugins: [require("postcss-preset-env")] }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};
```

## 5.rollup 搭建本地服务器

1. 使用 rollup-plugin-serve 搭建服务

```
npm install rollup-plugin-serve -D
```

2. 当文件发生变化时，自动刷新浏览器

```
npm install rollup-plugin-livereload -D
```

3. 配置 package.json

```js
  "scripts": {
		"watch": "rollup -c -w",
    "build": "rollup -c"
  },
```

4. 配置文件

```js
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
module.exports = {
  // ...
  plugins: [
    serve({
      port: 8080,
      // 依赖的文件夹
      contentBase: "./build",
    }),
    livereload(),
  ],
};
```
