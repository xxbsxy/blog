---
title: Class的基本使用
categories: 前端
tags: JavaScript
cover: /img/post/javascript.png
abbrlink: e45e0f32
date: 2022-11-22 12:00:00
updated: 2022-11-22 12:00:00
---

### 1. 类的基本使用

```js
// class中自动开启严格模式, new命令生成对象实例会自动调用constructor方法
// class创建的类只能使用new来调用,不能直接调用

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // class中的方法会加入到Person的显示原型上
  running() {
    console.log("running");
  }
}

const p = new Person("aaa", 18);
p.running();
console.log(typeof Person); // function
```

### 2. 类的访问器方法

```js
class Person {
  constructor(name, age) {
    // 以_定义的变量在外界最好不要访问
    this._name = name;
    this.age = age;
  }

  // 定义_name的构造器
  set name(value) {
    console.log("设置_name");
    this._name = value;
  }
  get name() {
    console.log("获取_name");
    return this._name;
  }
}

const p = new Person("aaa", 18);
console.log(p.name); // 直接以属性的方式调用
```

### 3. 类的静态方法

```js
class Person {
  // static后面的方法或者属性是直接添加到类上
  static count = 1;

  // 没有static则是加在实例属性上
  num = 100;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  running() {
    console.log(this);
    console.log("running");
  }
  static eating() {
    console.log("eating");
  }
}

const p = new Person("aaa", 18);

p.num; // 100
p.count; // undefind
p.eating(); // error
p.running();

Person.num; // undefind
Person.count; // 1
Person.running(); // error
Person.eating();
```

### 4. 类的继承

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  running() {
    console.log("running");
  }
  eating() {
    console.log("eating");
  }
}

class Student extends Person {
  constructor(name, age, sno, score) {
    // super代表调用父类的构造方法,必须在顶部调用
    super(name, age);
    this.sno = sno;
    this.score = score;
  }

  // 重写父类函数
  running() {
    // 调用父类方法 super可以在任何位置
    console.log("哈哈哈");
    super.running();
  }
  studying() {
    console.log("studying");
  }
}

const stu = new Student("aaa", 18, 1, 90);

stu.running();
stu.eating();
stu.studying();
```
