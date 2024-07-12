---
title: Set、Map的使用
categories: 前端
tags: JavaScript
cover: /img/post/javascript.png
abbrlink: 626b2f82
date: 2022-11-20 12:00:00
updated: 2022-11-20 12:00:00
---

## Set

```js
// 创建Set  可以传入可迭代对象
// set里的数据是不能重复的 set支持foreach和for..of等遍历方式
const set = new Set();

//添加元素
set.add(1);
set.add({ count: 1 });
set.add(["aaa", "bbb"]);

//删除元素
set.delete(1);

//判断是否存在某个元素
set.has(1);

//获取元素个数
set.size;

//清空set
set.clear();

//数据去重
const nums = [1, 21, 142, 123, 21, 32, 142];
const newNums = [];

// 1.普通方式
for (let item of nums) {
  if (!newNums.includes(item)) {
    newNums.push(item);
  }
}
// 2.使用set
const newNumsSet = new Set(nums);
const numNums1 = [...newNumsSet]; //将set转化为数组

//求交集和并集
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter((x) => b.has(x)));
// set {2, 3}
```

## WeakSet

```js
// WeakSet是弱引用, 标记清除法不会标记这个引用,不能使用forEach for..of遍历
// WeakSet只能存放Object类型,不能存放基本数据类型

const w = new WeakSet();

const nums = [1, 2, 3];
const obj = { count: 1 };

// 添加元素
w.add(obj);
w.add(nums);

//删除元素
w.delete(obj);

//判断是否存在元素
w.has(obj);
```

## map

```js
//Map的key可以是任何类型
const map = new Map();

const obj = { count: 1 };

//添加元素 传入key-value
map.set("name", "aaa");
map.set(obj, { num: 1 });

//获取元素
map.get(obj);

//删除元素
map.delete(obj);

//判断是否有元素
map.has(obj);

//获取元素个数
map.size;

//清空map
map.clear();

//支持forEach for..of遍历

map.forEach((item) => console.log(item));

for (let item of map) {
  console.log(item); //得到数组 ['name', 'aaa']
}
```

## WeakMap

```js
//WeakMap的key只能是任何类型
//WeakMap是弱引用 不能使用forEach for..of遍历

const w = new WeakMap();

const obj = { count: 1 };
const foo = { num: 1 };

//添加元素 传入key-value
w.set(foo, "aaa");
w.set(obj, "bbb");

//获取元素
w.get(obj);

//删除元素
w.delete(obj);

//判断是否有元素
w.has(obj);
```
