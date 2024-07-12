---
title: React-TypeScript 项目搭建
categories: 前端
tags: React
cover: /img/post/react.png
abbrlink: ca14ac1a
date: 2022-11-13 12:00:00
updated: 2022-11-13 12:00:00
---

# React-TypeScript 项目搭建

### 1. 使用脚手架创建项目

```shell
create-react-app react_demo(项目名称) --template typescript
```

### 2. 安装 craco 配置项目路径别名

```shell
npm install @craco/craco@alpha -D

npm install craco-less@2.1.0-alpha.0
```

#### 2.1 新建 craco.config.js

```javascript
const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
```

#### 2.2 在 tsconfig.json 下新增配置

```js
 "baseUrl": ".",
  "paths": {
   "@/*": ["src/*"]
  }
```

#### 2.3 修改 package.json 的 scripts

```js
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
 }
```

### 3. 集成 editorconfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

```yaml
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

### 4. 使用 prettier 工具

#### 4.1 安装

```shell
npm install prettier -D
```

#### 4.2.配置.prettierrc 文件

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

### 5. css 样式重置

#### 5.1 安装 normalize.css 并引入

```shell
npm install normalize.css

import 'normalize.css'
```

#### 5.2 配置 reset.css

```
/* reset.css样式重置文件 */
/* margin/padding重置 */
body, h1, h2, h3, ul, ol, li, p, dl, dt, dd {
 padding: 0;
 margin: 0;
}

/* a元素重置 */
a {
 text-decoration: none;
 color: #333;
}

/* img的vertical-align重置 */
img {
 vertical-align: top;
}

/* ul, ol, li重置 */
ul, ol, li {
 list-style: none;
}

/* 对斜体元素重置 */
i, em {
 font-style: normal;
}
```

### 6. 配置路由

#### 6.1 安装

```shell
npm install react-router-dom
```

#### 6.2 在 router 文件夹下新建 index.tsx

```jsx
import React, { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@/views/home/Home"));
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export default routes;
```

#### 6.3 在 App.tsx 引入

```jsx
import { useRoutes } from "react-router-dom";
import routes from "./router";
const App = memo(() => {
  return (
    <div>
      <div className="app">{useRoutes(routes)}</div>
    </div>
  );
});
```

#### 6.4 在 index.tsx 中引入组件包裹 App 组件

```jsx
import React, { Suspense } from "react";
import { HashRouter } from "react-router-dom";

root.render(
  <Suspense fallback="">
    <HashRouter>
      <App />
    </HashRouter>
  </Suspense>
);
```

### 7. 集成 Redux

#### 7.1 安装

```shell
npm install @reduxjs/toolkit react-redux
```

#### 7.2 在 store 下新建 index.ts

```ts
import { configureStore } from "@reduxjs/toolkit";
import {
  shallowEqual,
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import countReducer from "./modules/counter";
const store = configureStore({
  reducer: {
    counter: countReducer,
  },
});

//二次封装 使state能自动推导类型
type GetStateFnType = typeof store.getState;
type IRootState = ReturnType<GetStateFnType>;
type DiapatchType = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch: () => DiapatchType = useDispatch;
export const shallowEqualApp = shallowEqual;
export default store;
```

#### 7.3 在 index.ts 下引入

```tsx
import store from "./store";
import { Provider } from "react-redux";

root.render(
  <Provider store={store}>
    <Suspense fallback="">
      <HashRouter>
        <App />
      </HashRouter>
    </Suspense>
  </Provider>
);
```

#### 7.4 创建 counter 试例

```tsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    count: 100,
  },
  reducers: {
    changeCounterAction(state, { payload }) {
      state.count = payload;
    },
  },
});

export const { changeCounterAction } = counterSlice.actions;

export default counterSlice.reducer;
```

#### 7.5 在组件中使用

```tsx
import { shallowEqualApp, useAppDispatch, useAppSelector } from "@/store";
import { changeCounterAction } from "@/store/modules/counter";
import React, { memo } from "react";

const Home = memo(() => {
  const { count } = useAppSelector(
    (state) => ({
      count: state.counter.count,
    }),
    shallowEqualApp
  );
  const dispatch = useAppDispatch();

  const add = () => {
    const newCount = count + 1;
    dispatch(changeCounterAction(newCount));
  };
  return (
    <div>
      <h1>当前计数: {count}</h1>
      <button onClick={add}>+1</button>
    </div>
  );
});

export default Home;
```

### 8.安装 antd 并导入

```shell
npm install antd --save

@import '~antd/dist/antd.css';
```

### 9.安装 css in js

```shell
npm install styled-components -D

npm i --save-dev @types/styled-components
```

### 10. 安装 axios

```shell
npm install axios
```
