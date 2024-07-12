---
title: 实现call、apply、bind
categories: 前端
tags: JavaScript
cover: /img/post/javascript.png
abbrlink: 11fce9a5
date: 2022-11-22 12:00:00
updated: 2022-11-22 12:00:00
---

### 1. call 函数的实现

```js
Function.prototype.myCall = function (target, ...arg) {
  // 如果是null或者undfined 则指向window 不是对象类型则转化为包装类
  target = target === null || target === undefined ? window : Object(target);

  Reflect.defineProperty(target, "fn", {
    configurable: true,
    writable: false,
    enumerable: false,
    value: this,
  });

  // 隐式绑定
  target.fn(...arg);

  // 删除fn
  Reflect.deleteProperty(target, "fn");
};
```

### 2. apply 函数的实现

```js
Function.prototype.myApply = function (target, arg) {
  // 如果是null或者undfined 则指向window 不是对象类型则转化为包装类
  target = target === null || target === undefined ? window : Object(target);

  Reflect.defineProperty(target, "fn", {
    configurable: true,
    writable: false,
    enumerable: false,
    value: this,
  });

  // 隐式绑定
  target.fn(...arg);

  // 删除fn
  Reflect.deleteProperty(target, "fn");
};
```

### 3. bind 函数的实现

​

```JS
Function.prototype.myBind = function (target, ...arg) {
  // 如果是null或者undfined 则指向window 不是对象类型则转化为包装类
  target = target === null || target === undefined ? window : Object(target)

  target.fn = this

  return (...rest) => {
    target.fn(...arg, ...rest)
  }
}

```
