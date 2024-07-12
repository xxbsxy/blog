---
title: this绑定规则
categories: 前端
tags: JavaScript
cover: /img/post/javascript.png
abbrlink: 2a75657e
date: 2022-11-21 12:00:00
updated: 2022-11-21 12:00:00
---

## this 的绑定规则

### 1. 默认绑定

```js
//独立函数调用,this指向window
//严格模式下独立函数调用,this指向undefind

function foo() {
  console.log(this); //window
}
//独立函数调用
foo();

const obj = {
  name: "aaa",
  foo() {
    console.log(this); //obj
  },
};
//对象调起函数
obj.foo();
```

### 2. 隐式绑定

```js
function foo() {
  console.log(this); //obj
}
const obj = {
  bar: foo,
};
//隐式绑定
obj.bar();
```

### 3. 显示绑定

```js
const obj = {
  name: "zzz",
};
function foo() {
  console.log(this);
}

// 显示绑定,使foo的this显示绑定为obj对象
// call函数传入的类型不是对象则会创建对应的包装类型,传入类型没有包装类则会指向window

foo.call(obj); //obj
foo.call(123); //{ 123 }
foo.call("aaa"); //{ 'aaa' }
foo.call(undefined); // window
foo.call(null); // window

// apply函数和call函数一样,只是参数传递方式的差别

function bar(name, age) {
  console.log(this);
  console.log(name, age);
}

bar.call(obj, "aaa", 18);
bar.apply(obj, ["aaa", 18]);

// bind函数返回一个绑定了this函数,参数传递和call一样
const foo1 = foo.bind(obj);

foo1(); //obj
foo1(); //obj
foo1(); //obj
```

### 4. new 绑定

```js
function foo() {
  console.log(this); // foo: {}
}

// new绑定的操作
// 1.创建一个新的空对象
// 2.使这个对象的__proto等于函数的prototype
// 3.使函数内的this绑定到这个对象
// 4.如果函数没有返回其他值,则默认返回这个新对象

new foo();
```

### 5. this 绑定的优先级

==**new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定**==

==在显示绑定中 bind 的优先级高于 apply 和 call==

### 6. 箭头函数中的 this

```js
// 箭头函数不绑定this, this需要向外层作用域里查找
// 箭头函数不能使用new绑定, 没有arguments对象, 不能当成生成器函数

const foo = () => {
  console.log(this);
};

const obj = {
  bar: foo,
  getData() {
    setTimeout(() => {
      console.log(this);
    }, 0);
  },
};

foo(); //window
foo.call({ count: 1 }); //window
obj.bar(); //window
obj.getData(); //obj
```

## this 练习题

### 1. 题一

```js
var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  },
};
function sayName() {
  var sss = person.sayName;
  sss();
  person.sayName()(person.sayName)();
}
sayName();
```

### 2. 题二

```js
var name = "window";
var person1 = {
  name: "person1",
  foo1: function () {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3: function () {
    return function () {
      console.log(this.name);
    };
  },
  foo4: function () {
    return () => {
      console.log(this.name);
    };
  },
};

var person2 = { name: "person2" };

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);
```

### 3. 题三

```js
var name = "window";
function Person(name) {
  this.name = name;
  (this.foo1 = function () {
    console.log(this.name);
  }),
    (this.foo2 = () => console.log(this.name)),
    (this.foo3 = function () {
      return function () {
        console.log(this.name);
      };
    }),
    (this.foo4 = function () {
      return () => {
        console.log(this.name);
      };
    });
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.foo1();
person1.foo1.call(person2);

person1.foo2();
person1.foo2.call(person2);

person1.foo3()();
person1.foo3.call(person2)();
person1.foo3().call(person2);

person1.foo4()();
person1.foo4.call(person2)();
person1.foo4().call(person2);
```

### 4. 题四

```js
var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1: function () {
      return function () {
        console.log(this.name);
      };
    },
    foo2: function () {
      return () => {
        console.log(this.name);
      };
    },
  };
}
var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()();
person1.obj.foo1.call(person2)();
person1.obj.foo1().call(person2);

person1.obj.foo2()();
person1.obj.foo2.call(person2)();
person1.obj.foo2().call(person2);
```
