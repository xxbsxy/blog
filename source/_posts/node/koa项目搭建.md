---
title: koa项目搭建
categories: 后端
tags: node
cover: /img/post/koa.png
abbrlink: c386e9b7
date: 2022-12-03 12:00:00
updated: 2022-12-03 12:00:00
---

### 初始化

```shel
npm init -y
```

### 安装 koa

```shell
npm install koa
```

### 划分目录结构

### 安装路由

```shell
npm install koa-router
```

### 安装 koa-bodyparser

```shell
npm install koa-bodyparser
```

### 安装 jsonwebtoken 进行登录鉴权

```shell
npm install jsonwebtoken
```

### 安装 mysql2 连接数据库

```shell
npm install mysql2
```

```js
const mysql = require("mysql2");

const connections = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  database: "property",
  user: "root",
  password: "xxbsxy",
});

connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (!err) {
      console.log("连接数据库成功");
    } else {
      console.log("连接数据库失败");
    }
  });
});

module.exports = connections.promise();
```
