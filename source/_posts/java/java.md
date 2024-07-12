---
title: Java基础
categories: Java
tags: Java
cover: /img/post/22.png
abbrlink: 7273rty
date: 2023-12-24 19:25:00
updated: 2023-12-24 19:25:00
---

## 数组

### 数组的静态初始化

```
public class Main {
    public static void main(String[] args) {
        // 数据类型[] 变量名 = new 数据类型[]{元素1,元素2,元素3};

        //定义数组，用来存储多个年龄
        int[] ages = new int[]{12, 24, 36};
    }
}
```

### 静态初始化简化格式

```java
public class Main {
    public static void main(String[] args) {
        // 数据类型[] 变量名 = {元素1,元素2,元素3};

        //定义数组，用来存储多个年龄
        int[] ages = {12, 24, 36};
    }
}
```

### 数组的动态初始化

```java
public class Main {
    public static void main(String[] args) {
      // 数据类型[]  数组名 = new 数据类型[长度]; 先定义后赋值
      // int char long byte short 默认值 0
      // double flot 默认值 0.0 boolean 默认值 false
      // 引用类型默认值 null
        int[] arr = new int[3];

        arr[0] = 0;
        arr[1] = 1;
        arr[2] = 2;
    }
}
```

### 数组最大值

```java
public class Main {
    public static void main(String[] args) {

        int[] arr = {100, 200, 300, 500, 600};

        int max = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if(arr[i] > max) {
                max = arr[i];
            }
        }
        System.out.println(max);

    }
}
```

### 反转数组

```java
public class Main {
    public static void main(String[] args) {

        int[] arr = {100, 200, 566, 34};

        for (int i = 0; i < arr.length / 2; i++) {
            int temp = arr[i];
            arr[i] = arr[arr.length - 1 - i];
            arr[arr.length - 1 - i] = temp;
        }
    }
}

```

## String

| 构造器                         | 说明                                   |
| ------------------------------ | -------------------------------------- |
| public String()                | 创建一个空白字符串对象，不含有任何内容 |
| public String(String original) | 根据传入的字符串内容，来创建字符串对象 |
| public String(char[] chars)    | 根据字符数组的内容，来创建字符串对象   |
| public String(byte[] bytes)    | 根据字节数组的内容，来创建字符串对象   |

```
public class Main {
    public static void main(String[] args) {
        // 直接创建字符串对象
        String name = "jock";

        // new创建字符串对象
        String name1 = new String("jock");

        char[] c = {'a', 'b', 'c'};
        String name2 = new String(c); // "abc"
    }
}
```

### 常用方法

| 方法名                                                               | 说明                                                     |
| -------------------------------------------------------------------- | -------------------------------------------------------- |
| public int length()                                                  | 获取字符串的长度返回（就是字符个数）                     |
| public char charAt(int index)                                        | 获取某个索引位置处的字符返回                             |
| public char[] toCharArray()：                                        | 将当前字符串转换成字符数组返回                           |
| public boolean equals(Object anObject)                               | 判断当前字符串与另一个字符串的内容一样，一样返回 true    |
| public boolean equalsIgnoreCase(String anotherString)                | 判断当前字符串与另一个字符串的内容是否一样(忽略大小写)   |
| public String substring(int beginIndex, int endIndex)                | 根据开始和结束索引进行截取，得到新的字符串（包前不包后） |
| public String substring(int beginIndex)                              | 从传入的索引处截取，截取到末尾，得到新的字符串返回       |
| public String replace(CharSequence target, CharSequence replacement) | 使用新值，将字符串中的旧值替换，得到新的字符串           |
| public boolean contains(CharSequence s)                              | 判断字符串中是否包含了某个字符串                         |
| public boolean startsWith(String prefix)                             | 判断字符串是否以某个字符串内容开头，开头返回 true，反之  |
| public String[] split(String regex)                                  | 把字符串按照某个字符串内容分割，并返回字符串数组回来     |

## ArrayList

```
public class Main {
    public static void main(String[] args) {
        // 创建集合对象
        ArrayList<Integer> list = new ArrayList<>();
        // 添加元素
        list.add(10);
        // 指定位置 添加元素
        list.add(1, 10);
        // 获取指定位置元素
        list.get(2);
        // 获取元素个数
        list.size();
        // 删除指定元素
        list.remove(2);
        // 修改元素
        list.set(1, 20);
    }
}
```

### 常用方法

| 常用方法名                           | 说明                                   |
| ------------------------------------ | -------------------------------------- |
| public boolean add(E e)              | 将指定的元素添加到此集合的末尾         |
| public void add(int index,E element) | 在此集合中的指定位置插入指定的元素     |
| public E get(int index)              | 返回指定索引处的元素                   |
| public int size()                    | 返回集合中的元素的个数                 |
| public E remove(int index)           | 删除指定索引处的元素，返回被删除的元素 |
| public boolean remove(Object o)      | 删除指定的元素，返回删除是否成功       |
| public E set(int index,E element)    | 修改指定索引处的元素，返回被修改的元素 |

## 面向对象基础

### 基本语法

```java
public class Person {
    String name;
    int age;
    public void text() {
        // this 指向当前对象
        System.out.println(this.name);
        System.out.println(this.age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.name = "jock";
        p.age = 18;
        p.text();
    }
}
```

### 构造器

```
public class Person {
    String name;
    int age;

    // 无参构造器 没有指定时java会自动生成一个无参构造器
    public Person() {

    }

   // 有参构造器 定义了有参构造器java不会生成无参构造器 需要手动实现无参构造器
    public Person(String name, int age) {
    this.name = name;
    this.age = age;
    }

    public void text() {
        // this 指向当前对象
        System.out.println(this.name);
        System.out.println(this.age);
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person("jock", 18);
        p.text();
    }
}
```

### 封装

```java
public class Person {
    String name;
    int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void text() {
        // this 指向当前对象
        System.out.println(this.getName());
        System.out.println(this.getAge());
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.setAge(18);
        p.setName("jock");
        p.text();
    }
}
```

### 实体 JavaBean

实体类只负责数据存取，而对数据的处理交给其他类来完成，以实现数据和数据业务处理相分离

实体类就是一种特殊的类，它需要满足下面的要求

1. 这个类中的成员变量都要私有，并且要对 外提供相应的 getXxx ，setXxx 方法。
2. 类中必须要有一个公共的无参的构造器。

```
public class Person {
    String name;
    int age;

    public Person() {}

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

## 面向对象高级

### Static 关键字

#### static 修饰成员变量

- 静态变量是属于类的，只需要通过类名就可以调用：**类名.静态变量**

- 实例变量是属于对象的，需要通过对象才能调用：**对象.实例变量**

```
public class Person {
    // 类变量 访问 Person.name
   static String name;
   // 实例变量 访问 p.age
    int age;
}
```

#### static 修饰成员方法

- 有 static 修饰的方法，是属于类的，称为**类方法**；调用时直接用类名调用即可
- 无 static 修饰的方法，是属于对象的，称为**实例方法**；调用时，需要使用对象调用

```
public class Person {
    String name;
    int age;

    // 类方法 访问 Person.text
    public static void text() {
        System.out.println("text");
    }

    // 成员方法 访问 p.text1
    public void text1() {
        System.out.println("text1");
    }
}
```

#### 注意事项

- 类方法中可以直接访问类的成员，不可以直接访问实例成员。
- 实例方法中既可以直接访问类成员，也可以直接访问实例成员。
- 实例方法中可以出现 this 关键字，类方法中不可以出现 this 关键字的。

#### **静态代码块**

- **格式**：static { }
- **特点**：类加载时自动执行，由于类只会加载一次，所以静态代码块也只会执行一次。
- **作用**：完成类的初始化，例如：对类变量的初始化赋值。

#### 实例代码块

- **格式**：{ }
- **特点**：每次创建对象时，执行实例代码块，并在构造器前执行。
- **作用：**和构造器一样，都是用来完成对象的初始化的，例如：对实例变量进行初始化赋值

#### 单例设计模式

- 确保一个类只有一个对象

- 把类的构造器私有。
- 定义一个类变量记住类的一个对象。
- 定义一个类方法，返回对象。

```
public class Person {
    // 定义一个类变量记住类的一个对象
    private static Person p = new Person();

    // 私有类的构造器
    private Person(){}

    // 定义一个类方法，返回对象
    public static Person getPerson() {
        return p;
    }
}
```

### 继承

- 继承就是用 extends 关键字，让一个类和另一个类建立起一种父子关系。
- 子类可以继承父类非私有的成员。

#### 权限修饰符

权限修饰符是用来限制类的成员（成员变量、成员方法、构造器...）能够被访问的范围。

| 修饰符        | 本类里 | 同一个包中的类 | 子孙类 | 任意类 |
| ------------- | ------ | -------------- | ------ | ------ |
| **private**   | √      |                |        |        |
| **缺省**      | √      | √              |        |        |
| **protected** | √      | √              | √      |        |
| **public**    | √      | √              | √      | √      |

#### **方法重写**

当子类觉得父类中的某个方法不好用，或者无法满足自己的需求时，子类可以重写一个方法名称、参数列表一样的方法，去覆盖父类的这个方法，这就是方法重写。

**方法重写的其它注意事项**

- 重写小技巧：使用 Override 注解，他可以指定 java 编译器，检查我们方法重写的格式是否正确，代码可读性也会更好。
- 子类重写父类方法时，访问权限必须大于或者等于父类该方法的权限（ public > protected > 缺省 ）。
- 重写的方法返回值类型，必须与被重写方法的返回值类型一样，或者范围更小。
- 私有方法、静态方法不能被重写，如果重写会报错的。

```
public class A {
    public void text() {
        System.out.println("text1");
    }
}

public class B extends A{
    @Override
    public void text() {
        super.text(); // 调用父类方法
        System.out.println("text1111");
    }
}

public class Main {
    public static void main(String[] args) {
        B b = new B();
        b.text();
    }
}
```

#### 子类构造器的特点

- 子类的全部构造器，都会先调用父类的构造器，再执行自己
- 默认情况下，子类全部构造器的第一行代码都是 super() （写不写都有） ，它会调用父类的无参数构造器。
- 如果父类没有无参数构造器，则我们必须在子类构造器的第一行手写 super(….)，指定去调用父类的有参数构造器

```
public class A {
    int age;

    public A(int age) {
        this.age = age;
    }
}

public class B extends A{
    String name;

    public B(String name,int age) {
        super(age);
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        B b = new B("jock",18);
    }
}
```

### final

- final 关键字是最终的意思，可以修饰（类、方法、变量）
- 修饰类：该类被称为最终类，特点是不能被继承了。
- 修饰方法：该方法被称为最终方法，特点是不能被重写了。
- 修饰变量：该变量只能被赋值一次。

使用了 static final 修饰的成员变量就被称为常量；

作用：通常用于记录系统的配置信息。

```java
public class Constant {
  public static final String PASSWORD_ERROR  = “密码错误";
}

```

### 抽象类

多个类中只要有重复代码（包括相同的方法签名），我们都应该抽取到父类中去，此时，父类中就有可能存在只有方法签名的方法，这时，父类必定是一个抽象类了，我们抽出这样的抽象类，就是为了更好的支持多态。

场景 有许多重复代码

```java
public class A {
    public void text() {
        System.out.println("开始");

        System.out.println("呵呵呵");

        System.out.println("结束");
    }
}

public class B {
    public void text() {
        System.out.println("开始");

        System.out.println("哈哈哈");

        System.out.println("结束");
    }
}
```

使用抽象类解决

```java
public abstract class C {
    // 模板方法 加上final 防止被子类重写
    public  void text() {
        System.out.println("开始");

        doText();

        System.out.println("结束");
    }

    public abstract void doText() ;
}

public class A extends C {
    @Override
    public void doText() {
        System.out.println("呵呵呵");
    }
}

public class B extends C {
    @Override
    public void doText() {
        System.out.println("哈哈哈");
    }
}

public class Main {
    public static void main(String[] args) {
        A a = new A();
        a.text();
        B b = new B();
        b.text();
    }
}
```

### 接口

- Java 提供了一个关键字 interface，用这个关键字我们可以定义出一个特殊的结构：接口
- 注意：接口不能创建对象；接口是用来被类实现（implements）的，实现接口的类称为实现类
- 一个类可以实现多个接口，实现类实现多个接口，必须重写完全部接口的全部抽象方法，否则实现类需要定义成抽象类。

#### 基本使用

```java
public interface Test {
    // 成员变量（常量）
    String name = "jock";

    // 成员方法（抽象方法）
    void test();
}

public class A implements Test{
    @Override
    public void test() {
        System.out.println("text");
    }
}
```

#### JDK8 新增功能

JDK 8 开始，接口新增了三种形式的方法

```java
public interface Test {

  // 默认方法（实例方法）：使用default修饰 只能使用接口的实现类对象调用
   default void test() {
       System.out.println("text");
       test1();
   };

   // 私有方法：必须用private修饰(JDK 9开始才支持)
   private void test1() {
       System.out.println("text1");
   }

   // 类方法（静态方法）：使用static修饰 只能用接口名来调用
    static void test2(){
        System.out.println("text2");
    }
}

public class A implements Test{}

public class Main {
    public static void main(String[] args) {
        A a = new A();
        a.test();
        Test.test2();
    }
}
```

#### 注意事项

- 一个接口继承多个接口，如果多个接口中存在方法签名冲突，则此时不支持多继承。
- 一个类实现多个接口，如果多个接口中存在方法签名冲突，则此时不支持多实现。
- 一个类继承了父类，又同时实现了接口，父类中和接口中有同名的默认方法，实现类会优先用父类的。
- 一个类实现了多个接口，多个接口中存在同名的默认方法，可以不冲突，这个类重写该方法即可。

### 内部类

#### **成员内部类**

就是类中的一个普通成员，类似普通的成员变量、成员方法。

```
public class A {
    public class B {
        String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        A.B b = new A().new B();
        b.setName("jock");
        b.getName();
    }
}
```

#### **静态内部类**

```
public class A {
    // 可以直接访问外部类的静态成员，不可以直接访问外部类的实例成员
    public static class B {
        String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        A.B b = new A.B();
        b.setName("jock");
        b.getName();
    }
}
```

#### **匿名内部类**

就是一种特殊的局部内部类；所谓匿名：指的是程序员不需要为这个类声明名字。

```
public interface Test {

    void test();
}

public class Main {
    public static void main(String[] args) {
        Test t = new Test() {
            @Override
            public void test() {
                System.out.println("text111");
            }
        };
        t.test();

        new Test() {
            @Override
            public void test() {
                System.out.println("text222");
            }
        }.test();

    }
}
```

### 枚举

- 枚举类的第一行只能罗列一些名称，这些名称都是常量，并且每个常量记住的都是枚举类的一个对象。
- 枚举类的构造器都是私有的（写不写都只能是私有的），因此，枚举类对外不能创建对象。
- 枚举都是最终类，不可以被继承。
- 枚举类中，从第二行开始，可以定义类的其他各种成员。
- 编译器为枚举类新增了几个方法，并且枚举类都是继承：java.lang.Enum 类的，从 enum 类也会继承到一些方法。

```
public enum Test {
    BOY ,GIRL ;
}

public class Main {
    public static void main(String[] args) {
        text(Test.BOY);
    }

    public static void text(Test t) {
        switch (t) {
            case BOY:
                System.out.println("男");
                break;
            case GIRL:
                System.out.println("女");
                break;

        }
    }
}
```

## 常用 API

### Object 类

Object 类是 Java 中所有类的祖宗类，因此，Java 中所有类的对象都可以直接使用 Object 类中提供的一些方法。

**Object 类的常见方法**

| 方法名                          | 说明                       |
| ------------------------------- | -------------------------- |
| public String toString()        | 返回对象的字符串表示形式。 |
| public boolean equals(Object o) | 判断两个对象是否相等。     |
| protected Object clone()        | 对象克隆                   |

- toString 存在的意义：toString()方法存在的意义就是为了被子类重写，以便返回对象具体的内容。
- equals 存在的意义：直接比较两个对象的地址是否相同完全可以用“==”替代 equals，equals 存在的意义就是为了被子类重写，以便子类自己来定制比较规则（比如比较对象内容）。

```
public class A {
    String name;

    @Override
    public String toString() {
        return "A{" +
                "name='" + name + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        A a = (A) o;
        return Objects.equals(name, a.name);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
            this.name = name;
        }
}
```

### **Objects**类

Objects 是一个工具类，提供了很多操作对象的静态方法给我们使用。

**Objects 类的常见方法**

| 方法名                                           | 说明                                               |
| ------------------------------------------------ | -------------------------------------------------- |
| public static boolean equals(Object a, Object b) | 先做非空判断，再比较两个对象                       |
| public static boolean isNull(Object obj)         | 判断对象是否为 null，为 null 返回 true ,反之       |
| public static boolean nonNull(Object obj)        | 判断对象是否不为 null，不为 null 则返回 true, 反之 |

### **包装类**

包装类就是把基本类型的数据包装成对象

| **基本数据类型** | **对应的包装类（引用数据类型）** |
| ---------------- | -------------------------------- |
| byte             | Byte                             |
| short            | Short                            |
| int              | Integer                          |
| long             | Long                             |
| char             | Character                        |
| float            | Float                            |
| double           | Double                           |
| boolean          | Boolean                          |

**包装类的其他常见操作**

1. 可以把基本类型的数据转换成字符串类型

   - public static String toString(double d)

   - public String toString()

2. 可以把字符串类型的数值转换成数值本身对应的数据类型

   - public static int parseInt(String s)

   - public static Integer valueOf(String s)

```
public class Main {
    public static void main(String[] args) {
        // 自动装箱：基本数据类型可以自动转换为包装类型
        Integer i = 10;

        // 自动拆箱：包装类型可以自动转换为基本数据类型
        int a = i;

        // 基本类型转为字符串
        String res = i.toString();
        String res1 = Integer.toString(i);

        // 字符串类型的数值转为基本类型
        int age = Integer.parseInt("29");
        boolean b = Boolean.parseBoolean("true");

        // 推荐使用valueof方法
        int age1 = Integer.valueOf("29");
        boolean b1 = Boolean.valueOf("true");
    }
}
```

### **StringBuilder**

- StringBuilder 代表可变字符串对象，相当于是一个容器，它里面装的字符串是可以改变的，就是用来操作字符串的。
- 好处：StringBuilder 比 String 更适合做字符串的修改操作，效率会更高，代码也会更简洁。
- 对于字符串相关的操作，如频繁的拼接、修改等，建议用 StringBuidler，效率更高
- 如果操作字符串较少，或者不需要操作，以及定义字符串变量，还是建议用 String

| 方法名称                              | 说明                                                    |
| ------------------------------------- | ------------------------------------------------------- |
| public StringBuilder append(任意类型) | 添加数据并返回 StringBuilder 对象本身                   |
| public StringBuilder reverse()        | 将对象的内容反转                                        |
| public int length()                   | 返回对象内容长度                                        |
| public String toString()              | 通过 toString()就可以实现把 StringBuilder 转换为 String |

```
public class Main {
    public static void main(String[] args) {
        StringBuilder stringBuilder = new StringBuilder("jock");

        // 拼接内容
        stringBuilder.append("123");
        stringBuilder.append(123);

        // 反转操作
        stringBuilder.reverse();

        // 返回长度
        stringBuilder.length();

        // 转为String类型
        stringBuilder.toString();
    }
}
```

### StringJoiner

- JDK8 开始才有的，跟 StringBuilder 一样，也是用来操作字符串的，也可以看成是一个容器，创建之后里面的内容是可变的
- 好处：不仅能提高字符串的操作效率，并且在有些场景下使用它操作字符串，代码会更简洁

| 构造器                                             | 说明                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| public StringJoiner (间隔符号)                     | 创建一个 StringJoiner 对象，指定拼接时的间隔符号                     |
| public StringJoiner (间隔符号，开始符号，结束符号) | 创建一个 StringJoiner 对象，指定拼接时的间隔符号、开始符号、结束符号 |

| 方法名称                             | 说明                                         |
| ------------------------------------ | -------------------------------------------- |
| public StringJoiner add (添加的内容) | 添加数据，并返回对象本身                     |
| public int length()                  | 返回长度 ( 字符出现的个数)                   |
| public String toString()             | 返回一个字符串（该字符串就是拼接之后的结果） |

```
public class Main {
    public static void main(String[] args) {
        StringJoiner stringJoiner = new StringJoiner(",");
        stringJoiner.add("1");
        stringJoiner.add("2");
        System.out.println(stringJoiner); // 1, 2

        StringJoiner stringJoiner1 = new StringJoiner(",","[","]");
        stringJoiner.add("1");
        stringJoiner.add("2");
        System.out.println(stringJoiner1); // [1, 2]
    }
}
```

### **Math**

代表数学，是一个工具类，里面提供的都是对数据进行操作的一些静态方法

**Math 类提供的常见方法**

| 方法名                                      | 说明                                    |
| ------------------------------------------- | --------------------------------------- |
| public static int abs(int a)                | 获取参数绝对值                          |
| public static double ceil(double a)         | 向上取整                                |
| public static double floor(double a)        | 向下取整                                |
| public static int round(float a)            | 四舍五入                                |
| public static int max(int a,int b)          | 获取两个 int 值中的较大值               |
| public static double pow(double a,double b) | 返回 a 的 b 次幂的值                    |
| public static double random()               | 返回值为 double 的随机值，范围[0.0,1.0) |

### **System**

System 代表程序所在的系统，也是一个工具类

**System 类提供的常见方法**

| 方法名                                 | 说明                         |
| -------------------------------------- | ---------------------------- |
| public static void exit(int status)    | 终止当前运行的 Java 虚拟机。 |
| public static long currentTimeMillis() | 返回当前系统的时间毫秒值形式 |

### **Runtime**

- 代表程序所在的运行环境
- Runtime 是一个单例类

**Runtime 类提供的常见方法**

| 方法名                                                                                                                                                                                                                                                                       | 说明                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| public static [Runtime](mk:@MSITStore:D:\course\最新版Java基础入门教程\API文档\jdk-11中文api修订版.CHM::/java.base/java/lang/Runtime.html) getRuntime()                                                                                                                      | 返回与当前 Java 应用程序关联的运行时对象 |
| public void exit(int status)                                                                                                                                                                                                                                                 | 终止当前运行的虚拟机                     |
| public int availableProcessors()                                                                                                                                                                                                                                             | 返回 Java 虚拟机可用的处理器数。         |
| public long totalMemory()                                                                                                                                                                                                                                                    | 返回 Java 虚拟机中的内存总量             |
| public long freeMemory()                                                                                                                                                                                                                                                     | 返回 Java 虚拟机中的可用内存             |
| public [Process](mk:@MSITStore:D:\course\最新版Java基础入门教程\API文档\jdk-11中文api修订版.CHM::/java.base/java/lang/Process.html) exec([String](mk:@MSITStore:D:\course\最新版Java基础入门教程\API文档\jdk-11中文api修订版.CHM::/java.base/java/lang/String.html) command) | 启动某个程序，并返回代表该程序的对象     |

### **BigDecimal**

用于解决浮点型运算时，出现结果失真的问题。

**BigDecima 的常见构造器、常用方法**

| **构造器**                                         | **说明**                    |
| -------------------------------------------------- | --------------------------- |
| public BigDecimal(double val) 注意：不推荐使用这个 | 将 double 转换为 BigDecimal |
| public BigDecimal(String val)                      | 把 String 转成 BigDecimal   |

| **方法名**                                                            | **说明**                      |
| --------------------------------------------------------------------- | ----------------------------- |
| public static BigDecimal valueOf(double val)                          | 转换一个 double 成 BigDecimal |
| public BigDecimal add(BigDecimal b)                                   | 加法                          |
| public BigDecimal subtract(BigDecimal b)                              | 减法                          |
| public BigDecimal multiply(BigDecimal b)                              | 乘法                          |
| public BigDecimal divide(BigDecimal b)                                | 除法                          |
| public BigDecimal divide (另一个 BigDecimal 对象，精确几位，舍入模式) | 除法、可以控制精确到小数几位  |
| public double doubleValue()                                           | 将 BigDecimal 转换为 double   |

```
public class Main {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2); // 0.30000000000000004

        BigDecimal a = new BigDecimal("0.1");
        BigDecimal b = new BigDecimal("0.2");
        System.out.println(a.add(b)); // 0.3


        BigDecimal a1 =  BigDecimal.valueOf(0.1);
        BigDecimal b1 =  BigDecimal.valueOf(0.2);
        System.out.println(a.add(b)); // 0.3
    }
}
```

### JDK8 之前日期

#### **Date**

代表的是日期和时间

| 构造器                 | 说明                                               |
| ---------------------- | -------------------------------------------------- |
| public Date()          | 创建一个 Date 对象，代表的是系统当前此刻日期时间。 |
| public Date(long time) | 把时间毫秒值转换成 Date 日期对象。                 |

| 常见方法                       | 说明                                                   |
| ------------------------------ | ------------------------------------------------------ |
| public long getTime()          | 返回从 1970 年 1 月 1 日 00:00:00 走到此刻的总的毫秒数 |
| public void setTime(long time) | 设置日期对象的时间为当前时间毫秒值对应的时间           |

#### **SimpleDateFormat**

代表简单日期格式化，可以用来把日期对象、时间毫秒值格式化成我们想要的形式。

| 常见构造器                              | 说明                                     |
| --------------------------------------- | ---------------------------------------- |
| public SimpleDateFormat(String pattern) | 创建简单日期格式化对象，并封装时间的格式 |

| 格式化时间的方法                        | 说明                              |
| --------------------------------------- | --------------------------------- |
| public final String format(Date date)   | 将日期格式化成日期/时间字符串     |
| public final String format(Object time) | 将时间毫秒值式化成日期/时间字符串 |

```
public class Main {
    public static void main(String[] args) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyy-MM-dd HH:mm:ss");
        System.out.println(simpleDateFormat.format(new Date().getTime())); // 2023-12-24 10:57:35
    }
}
```

#### **Calendar**

- 代表的是系统此刻时间对应的日历，通过它可以单独获取、修改时间中的年、月、日、时、分、秒等
- calendar 是可变对象，一旦修改后其对象本身表示的时间将产生变化

| 方法名                                | 说明                        |
| ------------------------------------- | --------------------------- |
| public static Calendar getInstance()  | 获取当前日历对象            |
| public int get(int field)             | 获取日历中的某个信息。      |
| public final Date getTime()           | 获取日期对象。              |
| public long getTimeInMillis()         | 获取时间毫秒值              |
| public void set(int field,int value)  | 修改日历的某个信息。        |
| public void add(int field,int amount) | 为某个信息增加/减少指定的值 |

### JDK8 新增的日期类

- 设计更合理，功能丰富，使用更方便。
- 都是不可变对象，修改后会返回新的时间对象，不会丢失最开始的时间。
- 线程安全。
- 能精确到毫秒、纳秒。

#### LocalDate

LocalDate：代表本地日期(年、月、日、星期)

**LocalDate 的常用 API（都是处理年、月、日、星期相关的）**

| **方法名**                      | **说明**                                 |
| ------------------------------- | ---------------------------------------- |
| public int geYear()             | 获取年                                   |
| public int getMonthValue()      | 获取月份（1-12）                         |
| public int getDayOfMonth()      | 获取日                                   |
| public int getDayOfYear()       | 获取当前是一年中的第几天                 |
| Public DayOfWeek getDayOfWeek() | 获取星期几：ld.getDayOfWeek().getValue() |

| **方法名**                                         | **说明**                                 |
| -------------------------------------------------- | ---------------------------------------- |
| withYear、withMonth、withDayOfMonth、withDayOfYear | 直接修改某个信息，返回新日期对象         |
| plusYears、plusMonths、plusDays、plusWeeks         | 把某个信息加多少，返回新日期对象         |
| minusYears、minusMonths、minusDays，minusWeeks     | 把某个信息减多少，返回新日期对象         |
| equals isBefore isAfter                            | 判断两个日期对象，是否相等，在前还是在后 |

#### LocalTimeDate

**LocalTime 的常用 API （都是处理时、分、秒、纳秒相关的）**

| **方法名**             | **说明** |
| ---------------------- | -------- |
| public int getHour()   | 获取小时 |
| public int getMinute() | 获取分   |
| public int getSecond() | 获取秒   |
| public int getNano()   | 获取纳秒 |

| **方法名**                                         | **说明**                                  |
| -------------------------------------------------- | ----------------------------------------- |
| withHour、withMinute、withSecond、withNano         | 修改时间，返回新时间对象                  |
| plusHours、plusMinutes、plusSeconds、plusNanos     | 把某个信息加多少，返回新时间对象          |
| minusHours、minusMinutes、minusSeconds、minusNanos | 把某个信息减多少，返回新时间对象          |
| equals isBefore isAfter                            | 判断 2 个时间对象，是否相等，在前还是在后 |

#### **LocalDateTime**

**LocalDateTime 的常用 API（可以处理年、月、日、星期、时、分、秒、纳秒等信息)**

| **方法名**                                                                                               | **说明**                                  |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| getYear、getMonthValue、getDayOfMonth、getDayOfYear getDayOfWeek、getHour、getMinute、getSecond、getNano | 获取年月日、时分秒、纳秒等                |
| withYear、withMonth、withDayOfMonth、withDayOfYear withHour、withMinute、withSecond、withNano            | 修改某个信息，返回新日期时间对象          |
| plusYears、plusMonths、plusDays、plusWeeks plusHours、plusMinutes、plusSeconds、plusNanos                | 把某个信息加多少，返回新日期时间对象      |
| minusYears、minusMonths、minusDays、minusWeeks minusHours、minusMinutes、minusSeconds、minusNanos        | 把某个信息减多少，返回新日期时间对象      |
| equals isBefore isAfter                                                                                  | 判断 2 个时间对象，是否相等，在前还是在后 |

**LocalDateTime 的转换成 LocalDate、LocalTime**

| 方法名                         | 说明                      |
| ------------------------------ | ------------------------- |
| public LocalDate toLocalDate() | 转换成一个 LocalDate 对象 |
| public LocalTime toLocalTime() | 转换成一个 LocalTime 对象 |

```
public class Main {
    public static void main(String[] args) {
        // 获取此刻时间对象
        LocalDateTime localDateTime =  LocalDateTime.now();
        // 获取指定时间对象
        LocalDateTime localDateTime1 =  LocalDateTime.of(2024,12,11,10,23);

        // 获取
        System.out.println(localDateTime.getHour());

        // 修改
        LocalDateTime l = localDateTime.withYear(2099);

        // 增加
        LocalDateTime l1 = localDateTime.plusYears(2);

        // 减少
        LocalDateTime l2= localDateTime.minusYears(2);
    }
}
```

#### ZoneId ZonedDateTime

ZoneId 时区的常见方法

| 方法名                                          | 说明                       |
| ----------------------------------------------- | -------------------------- |
| public static Set<String> getAvailableZoneIds() | 获取 Java 中支持的所有时区 |
| public static ZoneId systemDefault()            | 获取系统默认时区           |
| public static ZoneId of(String zoneId)          | 获取一个指定时区           |

ZonedDateTime 带时区时间的常见方法

| 方法名                                                                                                  | 说明                              |
| ------------------------------------------------------------------------------------------------------- | --------------------------------- |
| public static ZonedDateTime now()                                                                       | 获取当前时区的 ZonedDateTime 对象 |
| public static ZonedDateTime now(ZoneId zone)                                                            | 获取指定时区的 ZonedDateTime 对象 |
| getYear、getMonthValue、getDayOfMonth、getDayOfYeargetDayOfWeek、getHour、getMinute、getSecond、getNano | 获取年月日、时分秒、纳秒等        |
| public ZonedDateTime withXxx(时间)                                                                      | 修改时间系列的方法                |
| public ZonedDateTime minusXxx(时间)                                                                     | 减少时间系列的方法                |
| public ZonedDateTime plusXxx(时间)                                                                      | 增加时间系列的方法                |

#### Instant

- 通过获取 Instant 的对象可以拿到此刻的时间，该时间由两部分组成：从 1970-01-01 00:00:00 开始走到此刻的总秒数 + 不够 1 秒的纳秒
- 可以用来记录代码的执行时间，或用于记录用户操作某个事件的时间点。
- 传统的 Date 类，只能精确到毫秒，并且是可变对象。
- 新增的 Instant 类，可以精确到纳秒，并且是不可变对象，推荐用 Instant 代替 Date。

| 方法名                              | 说明                                          |
| ----------------------------------- | --------------------------------------------- |
| public static Instant now()         | 获取当前时间的 Instant 对象（标准时间）       |
| public long getEpochSecond()        | 获取从 1970-01-01T00：00：00 开始记录的秒数。 |
| public int getNano()                | 从时间线开始，获取从第二个开始的纳秒数        |
| plusMillis plusSeconds plusNanos    | 判断系列的方法                                |
| minusMillis minusSeconds minusNanos | 减少时间系列的方法                            |
| equals、isBefore、isAfter           | 增加时间系列的方法                            |

#### **DateTimeFormatter**

| 方法名                                              | 说明             |
| --------------------------------------------------- | ---------------- |
| public static DateTimeFormatter ofPattern(时间格式) | 获取格式化器对象 |
| public String format(时间对象)                      | 格式化时间       |

| 方法名                                                                            | 说明       |
| --------------------------------------------------------------------------------- | ---------- |
| public String format(DateTimeFormatter formatter)                                 | 格式化时间 |
| public static LocalDateTime parse(CharSequence text, DateTimeFormatter formatter) | 解析时间   |

```
public class Main {
    public static void main(String[] args) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 对时间格式化
        System.out.println(formatter.format(LocalDateTime.now()));

        // 另一种方法
        System.out.println(LocalDateTime.now().format(formatter));
    }
}
```

#### **Period**

可以用于计算两个 LocalDate 对象 相差的年数、月数、天数

| 方法名                                                       | 说明                                |
| ------------------------------------------------------------ | ----------------------------------- |
| public static Period between(LocalDate start, LocalDate end) | 传入 2 个日期对象，得到 Period 对象 |
| public int getYears()                                        | 计算隔几年，并返回                  |
| public int getMonths()                                       | 计算隔几个月，年返回                |
| public int getDays()                                         | 计算隔多少天，并返回                |

#### **Duration**

可以用于计算两个时间对象相差的天数、小时数、分数、秒数、纳秒数；支持 LocalTime、LocalDateTime、Instant 等时间

| 方法名                                                        | 说明                                  |
| ------------------------------------------------------------- | ------------------------------------- |
| public static Duration between(开始时间对象 1,截止时间对象 2) | 传入 2 个时间对象，得到 Duration 对象 |
| public long toDays()                                          | 计算隔多少天，并返回                  |
| public long toHours()                                         | 计算隔多少小时，并返回                |
| public long toMinutes()                                       | 计算隔多少分，并返回                  |
| public long toSeconds()                                       | 计算隔多少秒，并返回                  |
| public long toMillis()                                        | 计算隔多少毫秒，并返回                |
| public long toNanos()                                         | 计算隔多少纳秒，并返回                |

### Arrays 类

用来操作数组的一个工具类。

| **方法名**                                                                                                                                                                               | **说明**                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| public static [String](mk:@MSITStore:C:\course\API文档\jdk-9_google.CHM::/java/lang/String.html) toString(类型[] arr)                                                                    | 返回数组的内容                 |
| public static int[] copyOfRange(类型[] arr, 起始索引, 结束索引)                                                                                                                          | 拷贝数组（指定范围）           |
| public static copyOf(类型[] arr, int newLength)                                                                                                                                          | 拷贝数组                       |
| public static setAll(double[] array, [IntToDoubleFunction](mk:@MSITStore:C:\双元视频\API文档\jdk-11中文api修订版.CHM::/java.base/java/util/function/IntToDoubleFunction.html) generator) | 把数组中的原数据改为新数据     |
| public static void sort(类型[] arr)                                                                                                                                                      | 对数组进行排序(默认是升序排序) |

### **JDK8 新特性**

#### Lambda 表达式

- Lambda 表达式是 JDK 8 开始新增的一种语法形式；
- 作用：用于简化匿名内部类的代码写法

Lambda 表达式只能简化函数式接口的匿名内部

**什么是函数式接口？**

- 有且仅有一个抽象方法的接口。
- 将来我们见到的大部分函数式接口，上面都可能会有一个@FunctionalInterface 的注解，有该注解的接口就必定是函数式接口。

```
public class Main {
    public static void main(String[] args) {
        // 之前写法
        Text t = new Text() {
            @Override
            public void text() {
                System.out.println("test");
            }
        };
        // Lambda表达式只能简化函数式接口的匿名内部类
        Text t1 = () -> {
            System.out.println("text111");
        };
        t1.text();
    }
}
```

**Lambda 表达式的省略写法(进一步简化 Lambda 表达式的写法**

- 参数类型可以省略不写
- 如果只有一个参数，参数类型可以省略，同时()也可以省略
- 如果 Lambda 表达式中的方法体代码只有一行代码，可以省略大括号不写，同时要省略分号！此时，如果这行代码是 return 语句，也必须去掉 return 不写。

```
public interface Text {
     int text(int a);
}

public class Main {
    public static void main(String[] args) {

        // Lambda表达式只能简化函数式接口的匿名内部类
        Text t1 = (int a) -> {
            return a;
        };
        // 省略写法
        Text t2 =  a -> a;
    }
}
```

#### 方法引用

**实例、静态方法的引用**

- 如果某个 Lambda 表达式里只是调用一个静态方法，并且前后参数的形式一致，就可以使用静态方法引用。
- 如果某个 Lambda 表达式里只是调用一个实例方法，并且前后参数的形式一致，就可以使用实例方法引用。

```
public class Demo {
    public  static int delNumber(int a, int b) {
        return a - b;
    }

    public int delNumber1(int a, int b) {
        return a - b;
    }
}

public class Main {
    public static void main(String[] args) {

        // Lambda表达式只能简化函数式接口的匿名内部类
        Text t1 = (int a, int b) -> {
            return a - b;
        };
        // 省略写法
        Text t2 =  (a, b) -> a - b;

        // 调用方法
        Text t3 =  (a, b) -> Demo.delNumber(a, b);

        // 静态方法引用
        Text t4 =  Demo::delNumber;

        // 实例方法引用
        Demo demo = new Demo();
        Text t5 =  demo::delNumber1;
    }
}
```

## Collection 集合

Collection 是单列集合的祖宗，它规定的方法（功能）是全部单列集合都会继承的。

**List 系列集合**：添加的元素是有序、可重复、有索引。

- ArrayList、LinekdList ：有序、可重复、有索引。

**Set 系列集合**：添加的元素是无序、不重复、无索引。

- HashSet: 无序、不重复、无索引；
- LinkedHashSet: **有序**、不重复、无索引。
- TreeSet：**按照大小默认升序排序、**不重复、无索引。

### **常见方法**

| **方法名**                          | **说明**                         |
| ----------------------------------- | -------------------------------- |
| public boolean add(E e)             | 把给定的对象添加到当前集合中     |
| public void clear()                 | 清空集合中所有的元素             |
| public boolean remove(E e)          | 把给定的对象在当前集合中删除     |
| public boolean contains(Object obj) | 判断当前集合中是否包含给定的对象 |
| public boolean isEmpty()            | 判断当前集合是否为空             |
| public int size()                   | 返回集合中元素的个数。           |
| public Object[] toArray()           | 把集合中的元素，存储到数组中     |

```
public class Main {
    public static void main(String[] args) {

       Collection<Integer> c = new ArrayList<>(); // 多态写法

        // 添加元素
        c.add(10);

        // 清空集合
        c.clear();

        // 判断是否为空
        c.isEmpty();

        // 获取元素个数
        c.size();

        // 删除元素 只会删除第一个出现的元素
        c.remove(10);

        // 集合转数组
        c.toArray();

        // 一个集合的数据倒入另一个集合
        Collection<Integer> c1 = new ArrayList<>();

        c1.addAll(c);
    }
}
```

### 遍历

#### 迭代器遍历

| **方法名称**               | **说明**                                                         |
| -------------------------- | ---------------------------------------------------------------- |
| Iterator<E> **iterator()** | 返回集合中的迭代器对象，该迭代器对象默认指向当前集合的第一个元素 |

| **方法名称**      | **说明**                                                    |
| ----------------- | ----------------------------------------------------------- |
| boolean hasNext() | 询问当前位置是否有元素存在，存在返回 true ,不存在返回 false |
| E next()          | 获取当前位置的元素，并同时将迭代器对象指向下一个元素处。    |

```
public class Main {
    public static void main(String[] args) {

       Collection<Integer> c = new ArrayList<>();
        // 添加元素
        c.add(10);
        c.add(20);
        c.add(30);
        c.add(40);

        Iterator<Integer> it =  c.iterator();

        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}
```

#### 增强 for 循环

- 增强 for 可以用来遍历集合或者数组
- 增强 for 遍历集合，本质就是迭代器遍历集合的简化写法
- 格式：for (元素的数据类型 变量名 : 数组或者集合) {}

```
public class Main {
    public static void main(String[] args) {

       Collection<Integer> c = new ArrayList<>();
        // 添加元素
        c.add(10);
        c.add(20);
        c.add(30);
        c.add(40);

        Iterator<Integer> it =  c.iterator();

        for (Integer element : c) {
            System.out.println(element);
        }
    }
}
```

#### Lambda 表达式遍历集合

| **方法名称**                                     | **说明**             |
| ------------------------------------------------ | -------------------- |
| default void forEach(Consumer<? super T> action) | 结合 lambda 遍历集合 |

```
public class Main {
    public static void main(String[] args) {

       Collection<Integer> c = new ArrayList<>();
        // 添加元素
        c.add(10);
        c.add(20);
        c.add(30);
        c.add(40);

        Iterator<Integer> it =  c.iterator();

        c.forEach(new Consumer<Integer>() {
            @Override
            public void accept(Integer integer) {
                System.out.println(integer);
            }
        });

        // 简化
        c.forEach(integer ->  System.out.println(integer));

        c.forEach( System.out::println);
    }
}
```

### List 集合

List 集合因为支持索引，所以多了很多与索引相关的方法，当然，Collection 的功能 List 也都继承了。

#### 常用方法

| **方法名称**                  | **说明**                               |
| ----------------------------- | -------------------------------------- |
| void add(int index,E element) | 在此集合中的指定位置插入指定的元素     |
| E remove(int index)           | 删除指定索引处的元素，返回被删除的元素 |
| E set(int index,E element)    | 修改指定索引处的元素，返回被修改的元素 |
| E get(int index)              | 返回指定索引处的元素                   |

#### ArrayList 底层原理

1. 利用无参构造器创建的集合，会在底层创建一个默认长度为 0 的数组
2. 添加第一个元素时，底层会创建一个新的长度为 10 的数组
3. 存满时，会扩容 1.5 倍
4. 如果一次添加多个元素，1.5 倍还放不下，则新创建数组的长度以实际为准

**特点**

- **查询速度快**：查询数据通过地址值和索引定位，查询任意数据耗时相同
- **删除效率低**：可能需要把后面很多的数据进行前移
- **添加效率极低**：可能需要把后面很多的数据后移，再添加元素；或者也可能需要进行数组的扩容。

#### LinkedList 集合的底层原理

- 基于双链表实现的。
- 特点：查询慢，增删相对较快，但对首尾元素进行增删改查的速度是极快的。

LinkedList 新增了：很多首尾操作的特有方法

| **方法名称**              | **说明**                         |
| ------------------------- | -------------------------------- |
| public void addFirst(E e) | 在该列表开头插入指定的元素       |
| public void addLast(E e)  | 将指定的元素追加到此列表的末尾   |
| public E getFirst()       | 返回此列表中的第一个元素         |
| public E getLast()        | 返回此列表中的最后一个元素       |
| public E removeFirst()    | 从此列表中删除并返回第一个元素   |
| public E removeLast()     | 从此列表中删除并返回最后一个元素 |

### Set 集合

Set 要用到的常用方法，基本上就是 Collection 提供的

- HashSet 无序、不重复、无索引。
- LinkedHashSet 有序、不重复、无索引。
- TreeSet 可排序、不重复、无索引

### 集合并发修改问题

- 使用迭代器遍历集合时，又同时在删除集合中的数据，程序就会出现并发修改异常的错误。
- 由于增强 for 循环遍历集合就是迭代器遍历集合的简化写法，因此，使用增强 for 循环遍历集合，又在同时删除集合中的数据时，程序也会出现并发修改异常的错误

```
public class Main {
    public static void main(String[] args) {

       Collection<Integer> c = new ArrayList<>();
        c.add(10);
        c.add(20);

        Iterator<Integer> it =  c.iterator();

        while (it.hasNext()) {
            System.out.println(it.next());
            if(it.next() == 10) {
                // c.remove(element);  并发修改错误
                it.remove(); // 删除迭代器数据 并在底层做了i--操作
            }
        }

        // for遍历不能解决并发修改错误
        for (Integer element : c) {
            System.out.println(element);
            if(element == 10) {
                // c.remove(element);
            }
        }
    }
}
```

### 可变参数

- 就是一种特殊形参，定义在方法、构造器的形参列表里，格式是：数据类型...参数名称；
- 可以不传数据给它；可以传一个或者同时传多个数据给它；也可以传一个数组给它

**注意事项：**

- 可变参数在方法内部就是一个数组。
- 一个形参列表中可变参数只能有一个
- 可变参数必须放在形参列表的最后面

```
public class Main {
    public static void main(String[] args) {
        test(10);
        test(10, 20);
        test(new int[]{10, 20, 30});
    }

    public static void test(int...num){
        System.out.println(num.length);
    }
}
```

### **Collections**类

是一个用来操作集合的工具类

**Collections 提供的常用静态方法**

| **方法名称**                                                                 | **说明**                                             |
| ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| public static <T> boolean **addAll(Collection<? super T> c, T... elements)** | 给集合批量添加元素                                   |
| public static void **shuffle(List<?> list)**                                 | 打乱 List 集合中的元素顺序                           |
| public static <T> void **sort(List<T> list)**                                | 对 List 集合中的元素进行升序排序                     |
| public static <T> void **sort(List<T> list，Comparator<? super T> c)**       | 对 List 集合中元素，按照比较器对象指定的规则进行排序 |

## **Map**集合

- Map 集合称为双列集合，格式：{key1=value1 , key2=value2 , key3=value3 , ...}， 一次需要存一对数据做为一个元素.
- Map 集合的每个元素“key=value”称为一个键值对/键值对对象/一个 Entry 对象，Map 集合也被叫做“键值对集合”
- Map 集合的所有键是不允许重复的，但值可以重复，键和值是一一对应的，每一个键只能找到自己对应的值

- Map 是双列集合的祖宗，它的功能是全部双列集合都可以继承过来使用的。

### 常用方法

| **方法名称**                               | **说明**                               |
| ------------------------------------------ | -------------------------------------- |
| public V put(K key,V value)                | 添加元素                               |
| public int size()                          | 获取集合的大小                         |
| public void clear()                        | 清空集合                               |
| public boolean isEmpty()                   | 判断集合是否为空，为空返回 true , 反之 |
| public V get(Object key)                   | 根据键获取对应值                       |
| public V remove(Object key)                | 根据键删除整个元素                     |
| public boolean containsKey(Object key)     | 判断是否包含某个键                     |
| public boolean containsValue(Object value) | 判断是否包含某个值                     |
| public Set<K> keySet()                     | 获取全部键的集合                       |
| public Collection<V> values()              | 获取 Map 集合的全部值                  |

```
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        // 添加
        map.put("age", 18);

        // 清空
        map.clear();

        // 获取大小
        map.size();

        // 获取值
        map.get("age");

        // 是否为空
        map.isEmpty();

        // 删除元素
        map.remove("age");

        // 判断是否包含某个键
        map.containsKey("age");

        // 判断是否包含某个值
        map.containsValue(40);

        // 获取全部键
        map.keySet();

        // 获取全部值
        map.values();
    }

}
```

### 遍历

#### **键找值遍历**

先获取 Map 集合全部的键，再通过遍历键来找值

```
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        map.put("age", 18);
        map.put("age1", 17);
        map.put("age2", 19);

        // 获取所有键集合
        Set<String> set =  map.keySet();

        for (String s : set) {
            System.out.println(map.get(s));
        }
    }

}
```

#### **键值对**遍历

| Map 提供的方法                  | **说明**               |
| ------------------------------- | ---------------------- |
| Set<Map.Entry<K, V>> entrySet() | 获取所有“键值对”的集合 |

| Map.Entry 提供的方法 | **说明** |
| -------------------- | -------- |
| K getKey()           | 获取键   |
| V getValue()         | 获取值   |

把“键值对“看成一个整体进行遍历

```
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        map.put("age", 18);
        map.put("age1", 17);
        map.put("age2", 19);


        Set<Map.Entry<String, Integer>> set =  map.entrySet();

        for (Map.Entry<String, Integer> s : set) {
            System.out.println(map.get(s.getKey()));
        }
    }

}
```

#### 使用 Lambda 表达式遍历

```
public class Main {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<>();

        map.put("age", 18);
        map.put("age1", 17);
        map.put("age2", 19);

        map.forEach((k, v) -> {
            System.out.println(k + "-" + v);
        });
    }

}
```

### **HashMap**

- HashMap 集合是一种增删改查数据，性能都较好的集合
- 但是它是无序，不能重复，没有索引支持的（由键决定特点）
- lHashMap 的键依赖 hashCode 方法和 equals 方法保证**键的唯一**

- HashMap 跟 HashSet 的底层原理是一模一样的，都是基于哈希表实现的
- 如果键存储的是自定义类型的对象，可以通过重写 hashCode 和 equals 方法，这样可以保证多个对象内容一样时，HashMap 集合就能认为是重复的。

### **LinkedHashMap**

- 特点: 有序、不重复、无索引。
- 底层数据结构依然是基于哈希表实现的，只是每个键值对元素又额外的多了一个双链表的机制记录元素顺序(保证有序)。

### **TreeMap**

- 特点：不重复、无索引、可排序(按照键的大小默认升序排序，**只能对键排序**)
- 原理：TreeMap 跟 TreeSet 集合的底层原理是一样的，都是基于红黑树实现的排序。

## Stream 流

### 获取 Stream 流

获取 集合 的 Stream 流

| \*\*Collection 提供的如下方法  | **说明**                     |
| ------------------------------ | ---------------------------- |
| default **Stream<E> stream()** | 获取当前集合对象的 Stream 流 |

获取 数组 的 Stream 流

| Arrays 类提供的如下 方法                          | **说明**                 |
| ------------------------------------------------- | ------------------------ |
| public static <T> Stream<T> **stream(T[] array)** | 获取当前数组的 Stream 流 |

| Stream 类提供的如下 方法                       | **说明**                     |
| ---------------------------------------------- | ---------------------------- |
| public static<T> Stream<T> **of(T... values)** | 获取当前接收数据的 Stream 流 |

```
public class Main {
    public static void main(String[] args) {
        // 获取List Stream流
        List<Integer> list = new ArrayList<>();
        Collections.addAll(list,10,20,30,40);
        Stream<Integer> stream = list.stream();

        // 获取set Stream流
        Set<Integer> set = new HashSet<>();
        Collections.addAll(set,10,20,30,40);
        Stream<Integer> stream1 = list.stream();
        stream1.filter(v -> v > 20);

        // 获取map Stream流
        Map<String, Integer> map = new HashMap<>();
        map.put("age", 18);
        map.put("age1", 17);
        map.put("age2", 19);

        Set<Map.Entry<String, Integer>> entries = map.entrySet();
        Stream<Map.Entry<String, Integer>> stream2 = entries.stream();
        stream2.filter(e -> e.getKey() == "age");

        // 获取数组Stream流
        Integer[] num = {10,20,30};
        Stream<Integer> num2 = Arrays.stream(num);
        Stream<Integer> num1 = Stream.of(num);
    }

}
```

### Stream 流中间方法

| **Stream**提供的常用中间方法                                                                                                                                 | **说明**                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| Stream<T> **filter**(Predicate<? super T> predicate)                                                                                                         | 用于对流中的数据进行过滤。       |
| Stream<T> **sorted**()                                                                                                                                       | 对元素进行升序排序               |
| Stream<T> **sorted**(Comparator<? super [T](mk:@MSITStore:C:\双元视频\API文档\jdk-11中文api修订版.CHM::/java.base/java/util/stream/Stream.html)> comparator) | 按照指定规则排序                 |
| Stream<T> **limit**(long maxSize)                                                                                                                            | 获取前几个元素                   |
| Stream<T> **skip**(long n)                                                                                                                                   | 跳过前几个元素                   |
| Stream<T> **distinct**()                                                                                                                                     | 去除流中重复的元素。             |
| <R> Stream<R> **map**(Function<? super T,? extends R> mapper)                                                                                                | 对元素进行加工，并返回对应的新流 |
| static <T> Stream<T> **concat**(Stream a, Stream b)                                                                                                          | 合并 a 和 b 两个流为一个流       |

### Stream 流终结方法

终结方法指的是调用完成后，不会返回新 Stream 了，没法继续使用流了

| **Stream**提供的常用终结方法                      | **说明**                   |
| ------------------------------------------------- | -------------------------- |
| void forEach(Consumer action)                     | 对此流运算后的元素执行遍历 |
| long count()                                      | 统计此流运算后的元素个数   |
| Optonal<T> max (Comparator<? super T> comparator) | 获取此流运算后的最大值元素 |
| Optonal<T> min (Comparator<? super T> comparator) | 获取此流运算后的最小值元素 |

l**收集 Stream 流**：就是把 Stream 流操作后的结果转回到集合或者数组中去返回。

| Stream 提供的常用终结方法      | **说明**                                 |
| ------------------------------ | ---------------------------------------- |
| R collect(Collector collector) | 把流处理后的结果收集到一个指定的集合中去 |
| Object[] toArray()             | 把流处理后的结果收集到一个数组中去       |

| Collectors 工具类提供了具体的收集方式                                    | 说明                     |
| ------------------------------------------------------------------------ | ------------------------ |
| public static <T> Collector toList()                                     | 把元素收集到 List 集合中 |
| public static <T> Collector toSet()                                      | 把元素收集到 Set 集合中  |
| public static Collector toMap(Function keyMapper , Function valueMapper) | 把元素收集到 Map 集合中  |

## 异常

**异常是代码在编译或者执行的过程中可能出现的错误**

- 编译时异常：没有继承 RuntimeExcpetion 的异常，编译阶段就会出错。
- 运行时异常：继承自 RuntimeException 的异常或其子类，编译阶段不报错，运行时出现的。

### 自定义运行时异常

```
// 需要继承RuntimeException
public class AgeErrorRuntimeException extends  RuntimeException{
    public AgeErrorRuntimeException() {
    }

    public AgeErrorRuntimeException(String message) {
        super(message);
    }
}

public class Main {
    public static void main(String[] args) {
        try {
            saveAge(153);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

     private static void saveAge(int age) {
        if(age > 0 && age < 150) {
            System.out.println("年龄保存成功");
        } else {
            throw new AgeErrorRuntimeException("年龄非法");
        }
     }
 }
```

### 自定义编译时异常

```
public class AgeErrorException extends  Exception{
    public AgeErrorException() {
    }

    public AgeErrorException(String message) {
        super(message);
    }
}

 public class Main {
    public static void main(String[] args) {
        try {
            saveAge(153);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

     private static void saveAge(int age) throws AgeErrorException{
        if(age > 0 && age < 150) {
            System.out.println("年龄保存成功");
        } else {
            throw new AgeErrorException("年龄非法");
        }
     }
 }
```

## File

- File 对象既可以代表文件、也可以代表文件夹。
- File 封装的对象仅仅是一个路径名，这个路径可以是存在的，也允许是不存在的。

创建 File 类的对象

| **构造器**                               | **说明**                                       |
| ---------------------------------------- | ---------------------------------------------- |
| public **File(String pathname)**         | 根据文件路径创建文件对象                       |
| public File(String parent, String child) | 根据父路径和子路径名字创建文件对象             |
| public File(File parent, String child)   | 根据父路径对应文件对象和子路径名字创建文件对象 |

### **文件信息**常用方法

| **方法名称**                    | **说明**                                                      |
| ------------------------------- | ------------------------------------------------------------- |
| public boolean exists()         | 判断当前文件对象，对应的文件路径是否存在，存在返回 true       |
| public boolean isFile()         | 判断当前文件对象指代的是否是文件，是文件返回 true，反之。     |
| public boolean isDirectory()    | 判断当前文件对象指代的是否是文件夹，是文件夹返回 true，反之。 |
| public String getName()         | 获取文件的名称（包含后缀）                                    |
| public long length()            | 获取文件的大小，返回字节个数                                  |
| public long lastModified()      | 获取文件的最后修改时间。                                      |
| public String getPath()         | 获取创建文件对象时，使用的路径                                |
| public String getAbsolutePath() | 获取绝对路径                                                  |

### 创建、删除文件

| 方法名称                       | 说明                 |
| ------------------------------ | -------------------- |
| public boolean createNewFile() | 创建一个新的空的文件 |
| public boolean mkdir()         | 只能创建一级文件夹   |
| public boolean mkdirs()        | 可以创建多级文件夹   |
| public boolean delete()        | 删除文件、空文件夹   |

### **遍历文件夹**

- 当主调是文件，或者路径不存在时，返回 null
- 当主调是空文件夹时，返回一个长度为 0 的数组
- 当主调是一个有内容的文件夹时，将里面所有一级文件和文件夹的路径放在 File 数组中返回
- 当主调是一个文件夹，且里面有隐藏文件时，将里面所有文件和文件夹的路径放在 File 数组中返回，包含隐藏文件
- 当主调是一个文件夹，但是没有权限访问该文件夹时，返回 null

| **方法名称**              | **说明**                                                             |
| ------------------------- | -------------------------------------------------------------------- |
| public String[] list()    | 获取当前目录下所有的"一级文件名称"到一个字符串数组中去返回。         |
| public File[] listFiles() | 获取当前目录下所有的"一级文件对象"到一个文件对象数组中去返回（重点） |

```
public class Main {
    public static void main(String[] args) throws IOException {
        // 创建File对象
        File f = new File("D:\\a.txt");

        // 新建文件
        f.createNewFile();

        // 获取文件大小
        f.length();

        // 删除文件
        f.delete();

        File f1 = new File("D:\\a");
        // 创建文件夹
        f1.mkdir();

        // 遍历文件
        File[] files = f1.listFiles();
        for (File file : files) {
            System.out.println(file);
        }
    }

 }
```

## 字符集

- ASCII 字符集：只有英文、数字、符号等，占 1 个字节。
- GBK 字符集：汉字占 2 个字节，英文、数字占 1 个字节。
- UTF-8 字符集：汉字占 3 个字节，英文、数字占 1 个字节。
- UTF-8 是 Unicode 字符集的一种编码方案，采取可变长编码方案，共分四个长度区：1 个字节，2 个字节，3 个字节，4 个字节

### 编码解码

| **String**提供了如下方法            | 说明                                                                         |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| byte[] getBytes()                   | 使用平台的默认字符集将该 String 编码为一系列字节，将结果存储到新的字节数组中 |
| byte[] getBytes(String charsetName) | 使用指定的字符集将该 String 编码为一系列字节，将结果存储到新的字节数组中     |

| String 提供了如下方法                    | 说明                                                        |
| ---------------------------------------- | ----------------------------------------------------------- |
| String(byte[] bytes)                     | 通过使用平台的默认字符集解码指定的字节数组来构造新的 String |
| String(byte[] bytes, String charsetName) | 通过指定的字符集解码指定的字节数组来构造新的 String         |

```
 public class Main {
    public static void main(String[] args) throws IOException {

        // 编码
        String data = "abc";
        byte[] bytes = data.getBytes();

        // 解码
        String data1 = new String(data);
    }
 }
```

## IO 流

### **字符流**

- 字节输入流：以内存为基准，来自磁盘文件/网络中的数据以字节的形式读入到内存中去的流
- 字节输出流：以内存为基准，把内存中的数据以字节写出到磁盘文件或者网络中去的流。
- 字符输入流：以内存为基准，来自磁盘文件/网络中的数据以字符的形式读入到内存中去的流。
- 字符输出流：以内存为基准，把内存中的数据以字符写出到磁盘文件或者网络介质中去的流。

#### **文件字节输入流**

| **构造器**                                  | **说明**                       |
| ------------------------------------------- | ------------------------------ |
| public **FileInputStream(File file)**       | 创建字节输入流管道与源文件接通 |
| public **FileInputStream(String pathname)** | 创建字节输入流管道与源文件接通 |

| **方法名称**                       | **说明**                                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| public int **read()**              | 每次读取一个字节返回，如果发现没有数据可读会返回-1.                                       |
| public int **read**(byte[] buffer) | 每次用一个字节数组去读取数据，返回字节数组读取了多少个字节，如果发现没有数据可读会返回-1. |
| public int **read(**byte[] buffer) | 每次用一个字节数组去读取数据，返回字节数组读取了多少个字节，如果发现没有数据可读会返回-1. |

```
 public class Main {
    public static void main(String[] args) throws Exception {

        // 创建输入流管道
        InputStream is = new FileInputStream("D:\\text.txt");

        // 读取一个字节数据
        int b = is.read();
        System.out.println((char) b);

        // 读取全部字节
        byte[] buffer = is.readAllBytes();
        System.out.println(new String(buffer));

        // 释放资源
        is.close();
    }
 }
```

#### **文件字节输出流**

| **构造器**                                               | **说明**                                       |
| -------------------------------------------------------- | ---------------------------------------------- |
| public FileOutputStream(File file)                       | 创建字节输出流管道与源文件对象接通             |
| public FileOutputStream(String filepath)                 | 创建字节输出流管道与源文件路径接通             |
| public FileOutputStream(File file，boolean append)       | 创建字节输出流管道与源文件对象接通，可追加数据 |
| public FileOutputStream(String filepath，boolean append) | 创建字节输出流管道与源文件路径接通，可追加数据 |

| **方法名称**                                         | **说明**                     |
| ---------------------------------------------------- | ---------------------------- |
| public void write(int a)                             | 写一个字节出去               |
| public void write(byte[] buffer)                     | 写一个字节数组出去           |
| public void write(byte[] buffer , int pos , int len) | 写一个字节数组的一部分出去。 |
| public void close() throws IOException               | 关闭流。                     |

```
 public class Main {
    public static void main(String[] args) throws Exception {

        // 创建输出流管道
        OutputStream os = new FileOutputStream("D:\\text.txt");

        // 写入一个字节
        os.write(97);

        // 写入多个字节
        String s = "哈哈哈";
        os.write(s.getBytes());

        // 释放资源
        os.close();
    }
 }
```

#### 复制文件

```
public class Main {
    public static void main(String[] args) throws Exception {

        InputStream is = new FileInputStream("D:\\1.png");
        OutputStream os = new FileOutputStream("D:\\2.png");

        byte[] buffer = new byte[1024];

        int len;

        while((len = is.read(buffer)) != -1) {
            os.write(buffer, 0 , len);
        }

        os.close();
        is.close();
    }
 }
```

#### 释放资源

**try-catch-finally**

```
 public class Main {
    public static void main(String[] args) throws Exception {
        InputStream is = new FileInputStream("D:\\1.png");
        OutputStream os = new FileOutputStream("D:\\2.png");
        try {
            byte[] buffer = new byte[1024];
            int len;
            while((len = is.read(buffer)) != -1) {
                os.write(buffer, 0 , len);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } finally {
            os.close();
            is.close();
        }
    }
 }
```

**try-with-resource**

```
public class Main {
    public static void main(String[] args) throws Exception {

        try (
                // 该资源使用完毕后，会自动调用其close()方法，完成对资源的释放
                // () 中只能放置资源，否则报错
                InputStream is = new FileInputStream("D:\\1.png");
                OutputStream os = new FileOutputStream("D:\\2.png");
        ) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = is.read(buffer)) != -1) {
                os.write(buffer, 0, len);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

#### **文件字符输入流**

| **构造器**                             | **说明**                       |
| -------------------------------------- | ------------------------------ |
| public **FileReader**(File file)       | 创建字符输入流管道与源文件接通 |
| public **FileReader**(String pathname) | 创建字符输入流管道与源文件接通 |

| **方法名称**                       | **说明**                                                                                  |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| public int **read()**              | 每次读取一个字符返回，如果发现没有数据可读会返回-1.                                       |
| public int **read**(char[] buffer) | 每次用一个字符数组去读取数据，返回字符数组读取了多少个字符，如果发现没有数据可读会返回-1. |

```
public class Main {
    public static void main(String[] args) throws Exception {
        try (
                Reader fileReader = new FileReader("D:\\text.txt");
        ) {
           //  读取一个字符
            int c;

            while ((c = fileReader.read()) != -1) {
                System.out.println((char) c);
            }

            // 读取多个字符
            char[] buffer = new char[3];

            int len;
            while ((len = fileReader.read(buffer)) != -1) {
                System.out.println(new String(buffer,0, len));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

#### 文件字符输出流

| **构造器**                                         | **说明**                                       |
| -------------------------------------------------- | ---------------------------------------------- |
| public FileWriter(File file)                       | 创建字节输出流管道与源文件对象接通             |
| public FileWriter(String filepath)                 | 创建字节输出流管道与源文件路径接通             |
| public FileWriter(File file，boolean append)       | 创建字节输出流管道与源文件对象接通，可追加数据 |
| public FileWriter(String filepath，boolean append) | 创建字节输出流管道与源文件路径接通，可追加数据 |

| **方法名称**                              | **说明**             |
| ----------------------------------------- | -------------------- |
| void write(int c)                         | 写一个字符           |
| void write(String str)                    | 写一个字符串         |
| void write(String str, int off, int len)  | 写一个字符串的一部分 |
| void write(char[] cbuf)                   | 写入一个字符数组     |
| void write(char[] cbuf, int off, int len) | 写入字符数组的一部分 |

### **缓冲流**

#### **字节缓冲流**

| **构造器**                                   | **说明**                                                               |
| -------------------------------------------- | ---------------------------------------------------------------------- |
| public BufferedInputStream(InputStream is)   | 把低级的字节输入流包装成一个高级的缓冲字节输入流，从而提高读数据的性能 |
| public BufferedOutputStream(OutputStream os) | 把低级的字节输出流包装成一个高级的缓冲字节输出流，从而提高写数据的性能 |

```
public class Main {
    public static void main(String[] args) throws Exception {

        try (
                InputStream is = new FileInputStream("D:\\1.png");
                // 定义字节缓冲输入流包装原始的字节流 默认缓冲区为8kb
                InputStream bis = new BufferedInputStream(is);

                OutputStream os = new FileOutputStream("D:\\2.png");
                // 定义字节缓冲输出流包装原始的字节流 默认缓冲区为8kb
                OutputStream bos = new BufferedOutputStream(os);
        ) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = bis.read(buffer)) != -1) {
                bos.write(buffer, 0, len);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
```

#### **字符缓冲输入流**

带 8Kb（8192）的字符缓冲池，可以提高字符输入流读取字符数据的性能

| **构造器**                      | **说明**                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------ |
| public BufferedReader(Reader r) | 把低级的字符输入流包装成字符缓冲输入流管道，从而提高字符输入流读字符数据的性能 |

**字符缓冲输入流新增的功能：按照行读取字符**

| **方法**                 | **说明**                                          |
| ------------------------ | ------------------------------------------------- |
| public String readLine() | 读取一行数据返回，如果没有数据可读了，会返回 null |

```
public class Main {
    public static void main(String[] args) throws Exception {
        try (
                Reader fileReader = new FileReader("D:\\text.txt");

                BufferedReader bufferedReader = new BufferedReader(fileReader);
        ) {
            // 按行读取
            String len;
            while ((len =  bufferedReader.readLine()) != null) {
                System.out.println(len);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

#### **字符缓冲输出流**

作用：自带 8Kb 的字符缓冲池，可以提高字符输出流写字符数据的性能

| **构造器**                      | **说明**                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| public BufferedWriter(Writer r) | 把低级的字符输出流包装成一个高级的缓冲字符输出流管道，从而提高字符输出流写数据的性能 |

**字符缓冲输出流新增的功能：换行**

| **方法**              | **说明** |
| --------------------- | -------- |
| public void newLine() | 换行     |

```
public class Main {
    public static void main(String[] args) throws Exception {
        try (
                Writer fileWriter = new FileWriter("D:\\text.txt");

                BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
        ) {

            bufferedWriter.write("哈哈哈哈");
            // 换行
            bufferedWriter.newLine();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

### 其他流

#### **转换流**

**字符输入转换流**

- 解决不同编码时，字符流读取文本内容乱码的问题
- 解决思路：先获取文件的原始字节流，再将其按真实的字符集编码转成字符输入流，这样字符输入流中的字符就不乱码了

| **构造器**                                                        | **说明**                                                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| public InputStreamReader(InputStream is)                          | 把原始的字节输入流，按照代码默认编码转成字符输入流（与直接用 FileReader 的效果一样） |
| public **InputStreamReader**(InputStream **is** ，String charset) | 把原始的字节输入流，按照指定字符集编码转成字符输入流(重点)                           |

```
public class Main {
    public static void main(String[] args) throws Exception {
        try (
                // 获取文件原始字节流 GBK格式
                InputStream inputStream = new FileInputStream("D:\\text.txt");

                // 把原始字节输入流按照指定格式转换为字符输入流
                Reader isr = new InputStreamReader(inputStream,"GBK");

                // 包装为缓存字符输入流
                BufferedReader bufferedReader = new BufferedReader(isr);
        ) {

            String len;
            while ((len =  bufferedReader.readLine()) != null) {
                System.out.println(len);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

**字符输出转换流**

作用：可以控制写出去的字符使用什么字符集编码

解决思路：获取字节输出流，再按照指定的字符集编码将其转换成字符输出流，以后写出去的字符就会用该字符集编码了

| 构造器                                                             | 说明                                                       |
| ------------------------------------------------------------------ | ---------------------------------------------------------- |
| public OutputStreamWriter(OutputStream os)                         | 可以把原始的字节输出流，按照代码默认编码转换成字符输出流。 |
| public **OutputStreamWriter(OutputStream** **os**，String charset) | 可以把原始的字节输出流，按照指定编码转换成字符输出流(重点) |

```da
public class Main {
    public static void main(String[] args) throws Exception {
        try (
                // 获取文件原始字节流
                OutputStream fileOutputStream = new FileOutputStream("D:\\text.txt");

                // 把原始字节输出流按照指定格式转换为字符输出流
                Writer ows = new OutputStreamWriter(fileOutputStream, "GBK");

                // 包装为缓存字符输出流
                BufferedWriter bufferedWriter = new BufferedWriter(ows);
        ) {

            bufferedWriter.write("hhh");

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

#### 打印流

**PrintStream**

打印流可以实现更方便、更高效的打印数据出去（可以替代输出流）

| **构造器**                                                               | **说明**                                 |
| ------------------------------------------------------------------------ | ---------------------------------------- |
| public PrintStream(OutputStream/File/String)                             | 打印流直接通向字节输出流/文件/文件路径   |
| public PrintStream(String fileName, Charset charset)                     | 可以指定写出去的字符编码                 |
| public PrintStream(OutputStream out, boolean autoFlush)                  | 可以指定实现自动刷新                     |
| public PrintStream(OutputStream out, boolean autoFlush, String encoding) | 可以指定实现自动刷新，并可指定字符的编码 |

| **方法**                                   | **说明**                   |
| ------------------------------------------ | -------------------------- |
| public void println( x)                    | 打印任意类型的数据出去     |
| public void write(int/byte[]/byte[]一部分) | 可以支持写**字节**数据出去 |

```
public class Main {
    public static void main(String[] args) throws Exception {
        try (
                // 创建打印流
              PrintStream printStream =  new PrintStream("D:\\text.txt")

        ) {
            printStream.println(97);
            printStream.println("哈哈哈");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
```

**PrintWriter**

| **构造器**                                                               | **说明**                                 |
| ------------------------------------------------------------------------ | ---------------------------------------- |
| public PrintWriter(OutputStream/File/String)                             | 打印流直接通向字节输出流/文件/文件路径   |
| public PrintWriter(String fileName, Charset charset)                     | 可以指定写出去的字符编码                 |
| public PrintWriter(OutputStream out/Writer, boolean autoFlush)           | 可以指定实现自动刷新                     |
| public PrintWriter(OutputStream out, boolean autoFlush, String encoding) | 可以指定实现自动刷新，并可指定字符的编码 |

| **方法**                                | **说明**               |
| --------------------------------------- | ---------------------- |
| public void println( x)                 | 打印任意类型的数据出去 |
| public void write(int/String/char[]/..) | 可以支持写字符数据出去 |

**PrintStream 和 PrintWriter 的区别**

- 打印数据的功能上是一模一样的：都是使用方便，性能高效（核心优势）
- lPrintStream 继承自字节输出流 OutputStream，因此支持写字节数据的方法。
- PrintWriter 继承自字符输出流 Writer，因此支持写字符数据出去

#### 数据流

**DataOutputStream(数据输出流)**

允许把数据和其类型一并写出去。

| **构造器**                                    | **说明**                             |
| --------------------------------------------- | ------------------------------------ |
| public **DataOutputStream**(OutputStream out) | 创建新数据输出流包装基础的字节输出流 |

| **方法**                                                      | **说明**                                            |
| ------------------------------------------------------------- | --------------------------------------------------- |
| public final void writeByte(int v) throws IOException         | 将 byte 类型的数据写入基础的字节输出流              |
| public final void **writeIn (int v)** throws IOException      | 将 int 类型的数据写入基础的字节输出流               |
| public final void writeDouble(Double v) throws IOException    | 将 double 类型的数据写入基础的字节输出流            |
| public final void **writeUTF**(String str) throws IOException | 将字符串数据以 UTF-8 编码成字节写入基础的字节输出流 |
| public void write(int/byte[]/byte[]一部分)                    | 支持写字节数据出去                                  |

**DataInputStream（数据输入流）**

用于读取数据输出流写出去的数据

| **构造器**                                     | **说明**                             |
| ---------------------------------------------- | ------------------------------------ |
| public **DataInputStream**(InputStream **is)** | 创建新数据输入流包装基础的字节输入流 |

| **方法**                                                | **说明**                    |
| ------------------------------------------------------- | --------------------------- |
| Public final byte readByte() throws IOException         | 读取字节数据返回            |
| public final int **readInt**() throws IOException       | 读取 int 类型的数据返回     |
| public final double **readDouble**() throws IOException | 读取 double 类型的数据返回  |
| public final String **read**UTF() throws IOException    | 读取字符串数（UTF-8）据返回 |
| public int readInt()/read(byte[])                       | 支持读字节数据进来          |

#### **序列化流**

**ObjectOutputStream(对象字节输出流)**

**对象如果要参与序列化，必须实现序列化接口（**java.io.Serializable）

| **构造器**                                          | **说明**                                 |
| --------------------------------------------------- | ---------------------------------------- |
| public **ObjectOutputStream**(OutputStream **out)** | 创建对象字节输出流，包装基础的字节输出流 |

| **方法**                                                       | **说明**     |
| -------------------------------------------------------------- | ------------ |
| public final void **writeObject**(Object o) throws IOException | 把对象写出去 |

**ObjectInputStream(对象字节输入流)**

| **构造器**                                       | **说明**                                 |
| ------------------------------------------------ | ---------------------------------------- |
| public **ObjectInputStream**(InputStream **is)** | 创建对象字节输入流，包装基础的字节输入流 |

| **方法**                         | **说明**                         |
| -------------------------------- | -------------------------------- |
| public final Object readObject() | 把存储在文件中的 Java 对象读出来 |

```
public class A implements Serializable {
    String name;


    public String getName() {
        return name;
    }


    public void setName(String name) {
            this.name = name;
        }
}

public class Main {
    public static void main(String[] args) throws Exception {
        try (
              ObjectOutputStream objectOutputStream =  new ObjectOutputStream(new FileOutputStream("D:\\text.txt"));
              ObjectInputStream objectInputStream =  new ObjectInputStream(new FileInputStream("D:\\text.txt"));
        ) {
            A a = new A();
            // 序列化
            objectOutputStream.writeObject(a);
            // 反序列化
           A a1 = (A) objectInputStream.readObject();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## **特殊文件**

### **Properties**属性文件

**1**、都只能是键值对

**2**、键不能重复

**3**、文件后缀一般是.properties 结尾

- 是一个 Map 集合（键值对集合），但是我们一般不会当集合使用。
- 核心作用：Properties 是用来代表属性文件的，通过 Properties 可以读写属性文件里的内容

| **构造器**          | **说明**                               |
| ------------------- | -------------------------------------- |
| public Properties() | 用于构建 Properties 集合对象（空容器） |

| **常用方法**                             | **说明**                                       |
| ---------------------------------------- | ---------------------------------------------- |
| public void load(InputStream is)         | 通过字节输入流，读取属性文件里的键值对数据     |
| public void load(Reader reader)          | 通过字符输入流，读取属性文件里的键值对数据     |
| public String getProperty(String key)    | 根据键获取值(其实就是 get 方法的效果)          |
| public Set<String> stringPropertyNames() | 获取全部键的集合（其实就是 ketSet 方法的效果） |

```
public class Main {
    public static void main(String[] args) throws Exception {
            Properties properties = new Properties();

            // 加载文件到对象
            properties.load(new FileReader("C:\\Users\\user.properties"));

            System.out.println(properties);
    }
}
```

**使用 Properties 把键值对数据写出到属性文件里去**

| **构造器**          | **说明**                               |
| ------------------- | -------------------------------------- |
| public Properties() | 用于构建 Properties 集合对象（空容器） |

| **常用方法**                                        | **说明**                                       |
| --------------------------------------------------- | ---------------------------------------------- |
| public Object setProperty(String key, String value) | 保存键值对数据到 Properties 对象中去。         |
| public void store(OutputStream os, String comments) | 把键值对数据，通过字节输出流写出到属性文件里去 |
| public void store(Writer w, String comments)        | 把键值对数据，通过字符输出流写出到属性文件里去 |

```
public class Main {
    public static void main(String[] args) throws Exception {
            Properties properties = new Properties();

            properties.setProperty("name","jock");
            properties.setProperty("password","123456");

            properties.store(new FileWriter("D:\\user.properties"),"hhh");

    }
}
```

### **XML**文件

本质是一种数据的格式，可以用来存储复杂的数据结构，和数据关系。

- XML 中的“<标签名>” 称为一个标签或一个元素，一般是成对出现的。
- XML 中的标签名可以自己定义（可扩展），但必须要正确的嵌套。
- XML 中只能有一个根标签。
- XML 中的标签可以有属性。
- 如果一个文件中放置的是 XML 格式的数据，这个文件就是 XML 文件，后缀一般要写成.xml。

## 多线程

多线程是指从软硬件上实现的多条执行流程的技术（多条线程由 CPU 负责调度执行）

### 方式一：继承 Thread 类

- 优点：编码简单
- 缺点：线程类已经继承 Thread，无法继承其他类，不利于功能的扩展。

1. 定义一个子类 MyThread 继承线程类 java.lang.Thread，重写 run()方法
2. 创建 MyThread 类的对象
3. 调用线程对象的 start()方法启动线程（启动后还是执行 run 方法的）

```
// 继承Thread类
public class MyThread extends Thread {
    // 重写run方法
    @Override
    public void run() {
        System.out.println("Thread");
    }
}


public class Main {
    public static void main(String[] args) throws Exception {

        MyThread myThread = new MyThread();

        // 启动线程必须是调用start方法，不是调用run方法。
        // 不要把主线程任务放在启动子线程之前。
        myThread.start();
    }
}
```

### 方式二：实现 Runnable 接口

- 优点：任务类只是实现接口，可以继续继承其他类、实现其他接口，扩展性强。
- 缺点：需要多一个 Runnable 对象。

1. 定义一个线程任务类 MyRunnable 实现 Runnable 接口，重写 run()方法
2. 创建 MyRunnable 任务对象
3. 把 MyRunnable 任务对象交给 Thread 处理。
4. 调用线程对象的 start()方法启动线程

| **Thread**类提供的构造器       | **说明**                     |
| ------------------------------ | ---------------------------- |
| public Thread(Runnable target) | 封装 Runnable 对象成为线程对 |

```
// 实现Runnable接口
public class MyThread implements Runnable {
    // 重写run方法
    @Override
    public void run() {
        System.out.println("Runnable");
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Runnable taeget = new MyThread();

        // 任务对象交给线程对象
        new Thread(taeget).start();


    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // 创建匿名内部类 + Lambda 表达式写法
        new Thread(() -> {System.out.println("111");}).start();
    }
}

```

### 方式三：实现 Callable 接口

- 创建任务对象
  - 定义一个类实现 Callable 接口，重写 call 方法，封装要做的事情，和要返回的数据。
  - 把 Callable 类型的对象封装成 FutureTask（线程任务对象）。
- 把线程任务对象交给 Thread 对象。
- 调用 Thread 对象的 start 方法启动线程。
- 线程执行完毕后、通过 FutureTask 对象的的 get 方法去获取线程任务执行的结果。

```
public class MyThread implements Callable<String> {
    @Override
    public String call() throws Exception {
        return "123";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        Callable<String> callable = new MyThread();

        // Callable对象封装为FutureTask对象
        FutureTask<String> futureTask = new FutureTask(callable);

        new Thread(futureTask).start();

        // 获取线程执行完毕的结构
       String res =  futureTask.get();

        System.out.println(res);
    }
}
```

### 常用方法

| **Thread**提供的常见构造器                  | **说明**                                       |
| ------------------------------------------- | ---------------------------------------------- |
| public Thread(String name)                  | 可以为当前线程指定名称                         |
| public Thread(Runnable target)              | 封装 Runnable 对象成为线程对象                 |
| public Thread(Runnable target, String name) | 封装 Runnable 对象成为线程对象，并指定线程名称 |

| **Thread**提供的常用方法                     | **说明**                                       |
| -------------------------------------------- | ---------------------------------------------- |
| public void run()                            | 线程的任务方法                                 |
| public void start()                          | 启动线程                                       |
| public String **getName**()                  | 获取当前线程的名称，线程名称默认是 Thread-索引 |
| public void **setName**(String name)         | 为线程设置名称                                 |
| public **static** Thread **currentThread**() | 获取当前执行的线程对象                         |
| public **static** void **sleep(long time)**  | 让当前执行的线程休眠多少毫秒后，再继续执行     |
| public final void join()...                  | 让调用当前这个方法的线程先执行完！             |

## 线程同步

- 解决线程安全问题的方案。多个线程，同时操作同一个共享资源的时候，可能会出现业务安全问题
- 每次只允许一个线程加锁，加锁后才能进入访问，访问完毕后自动解锁，然后其他线程才能再加锁进来

### 方式一：同步代码块

- synchronized(同步锁) {访问共享资源的核心代码 }
- 每次只允许一个线程加锁后进入，执行完毕后自动解锁，其他线程才可以进来执行
- 对于当前同时执行的线程来说，同步锁必须是同一把（同一个对象），否则会出 bug
- 建议使用共享资源作为锁对象，对于实例方法建议使用 this 作为锁对象。
- 对于静态方法建议使用字节码（类名.class）对象作为锁对象。

```
    public void getPrice(String name) {
        synchronized (this) {
            if(this.price > 0) {
                this.price = this.price - 100000.00;
                System.out.println("余额充足" + name + "取走了10000.00元余额" + this.price);
            } else {
                System.out.println("余额不足" );
            }
        }
    }
```

### 方式二：同步方法

- 把访问共享资源的核心方法给上锁，以此保证线程安全。
- 修饰符 synchronized 返回值类型 方法名称(形参列表) {操作共享资源的代码}
- 同步方法其实底层也是有隐式锁对象的，只是锁的范围是整个方法代码。
- 如果方法是实例方法：同步方法默认用 this 作为的锁对象。
- 如果方法是静态方法：同步方法默认用类名.class 作为的锁对象。

```
    public synchronized void getPrice(String name) {
        if (this.price > 0) {
            this.price = this.price - 100000.00;
            System.out.println("余额充足" + name + "取走了10000.00元余额" + this.price);
        } else {
            System.out.println("余额不足");
        }
    }
```

### 方式三：Lock 锁

- Lock 锁是 JDK5 开始提供的一个新的锁定操作，通过它可以创建出锁对象进行加锁和解锁，更灵活、更方便、更强大
- Lock 是接口，不能直接实例化，可以采用它的实现类 ReentrantLock 来构建 Lock 锁对象。

| **构造器**             | **说明**                 |
| ---------------------- | ------------------------ |
| public ReentrantLock() | 获得 Lock 锁的实现类对象 |

| **方法名称**  | **说明** |
| ------------- | -------- |
| void lock()   | 获得锁   |
| void unlock() | 释放锁   |

```
public class Account {
    String name;
    double price;

    // 创建锁对象
    private Lock lk = new ReentrantLock();

    public Account(String name, double price) {
        this.name = name;
        this.price = price;
    }
    public synchronized void getPrice(String name) {
        try {
        	// 加锁
            lk.lock();
            if (this.price > 0) {
                this.price = this.price - 100000.00;
                System.out.println("余额充足" + name + "取走了10000.00元余额" + this.price);
            } else {
                System.out.println("余额不足");
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
        	// 解锁
            lk.unlock();
        }
    }

}
```

## 线程池

### 创建线程池

线程池就是一个可以复用线程的技术

- 方式一：使用 ExecutorService 的实现类 ThreadPoolExecutor 自创建一个线程池对象。
- 方式二：使用 Executors（线程池的工具类）调用方法返回不同特点的线程池对象。

```
public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit,
              BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory,
              RejectedExecutionHandler handler)
```

- 参数一：corePoolSize : 指定线程池的核心线程的数量。
- 参数二：maximumPoolSize：指定线程池的最大线程数量。
- 参数三：keepAliveTime ：指定临时线程的存活时间。
- 参数四：unit：指定临时线程存活的时间单位(秒、分、时、天）
- 参数五：workQueue：指定线程池的任务队列。
- 参数六：threadFactory：指定线程池的线程工厂。
- 参数七：handler：指定线程池的任务拒绝策略（线程都在忙，任务队列也满了的时候，新任务来了该怎么处理

```
public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService service = new ThreadPoolExecutor(3, 5, 8,
                TimeUnit.DAYS,new ArrayBlockingQueue<>(4),Executors.defaultThreadFactory(),new     ThreadPoolExecutor.AbortPolicy());
    }
}
```

### 处理 Runnable 任务

| 方法名称                           | 说明                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| void execute(Runnable command)     | 执行 Runnable 任务                                           |
| Future<T> submit(Callable<T> task) | 执行 Callable 任务，返回未来任务对象，用于获取线程返回的结果 |
| void shutdown()                    | 等全部任务执行完毕后，再关闭线程池！                         |
| List<Runnable> shutdownNow()       | 立刻关闭线程池，停止正在执行的任务，并返回队列中未执行的任务 |

```
public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = new ThreadPoolExecutor(3, 5, 8,
                TimeUnit.DAYS,new ArrayBlockingQueue<>(4),Executors.defaultThreadFactory(),new ThreadPoolExecutor.AbortPolicy());

        Runnable target = new MyRunnable();

        pool.execute(target);
        pool.execute(target);
        pool.execute(target);

        pool.shutdown();
    }
}
```

### 处理 Callable 任务

| 方法名称                               | 说明                                                               |
| -------------------------------------- | ------------------------------------------------------------------ |
| void execute(Runnable command)         | 执行任务/命令，没有返回值，一般用来执行 Runnable 任务              |
| **Future<T> submit(Callable<T> task)** | 执行任务，返回未来任务对象获取线程结果，一般拿来执行 Callable 任务 |
| void shutdown()                        | 等任务执行完毕后关闭线程池                                         |
| List<Runnable> shutdownNow()           | 立刻关闭，停止正在执行的任务，并返回队列中未执行的任务             |

```
public class MyCallable implements Callable<String> {

    @Override
    public String call() throws Exception {
        return "123";
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        ExecutorService pool = new ThreadPoolExecutor(3, 5, 8,
                TimeUnit.DAYS,new ArrayBlockingQueue<>(4),Executors.defaultThreadFactory(),new ThreadPoolExecutor.AbortPolicy());

        Future<String> f1 = pool.submit(new MyCallable());

        System.out.println(f1.get());

        pool.shutdown();

    }
}
```

### Executors 工具类实现线程池

一个线程池的工具类，提供了很多静态方法用于返回不同特点的线程池对象。

| **方法名称**                                                                     | **说明**                                                                                     |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| public static ExecutorService newFixedThreadPool(int nThreads)                   | 创建固定线程数量的线程池，如果某个线程因为执行异常而结束，那么线程池会补充一个新线程替代它。 |
| public static ExecutorService newSingleThreadExecutor()                          | 创建只有一个线程的线程池对象，如果该线程出现异常而结束，那么线程池会补充一个新线程。         |
| public static ExecutorService newCachedThreadPool()                              | 线程数量随着任务增加而增加，如果线程任务执行完毕且空闲了 60s 则会被回收掉。                  |
| public static Scheduled ExecutorService newScheduledThreadPool(int corePoolSize) | 创建一个线程池，可以实现在给定的延迟后运行任务，或者定期执行任务。                           |

## 网络通信

| 名称                                             | 说明                                               |
| ------------------------------------------------ | -------------------------------------------------- |
| public static InetAddress getLocalHost()         | 获取本机 IP，会以一个 inetAddress 的对象返回       |
| public static InetAddress getByName(String host) | 根据 ip 地址或者域名，返回一个 inetAdress 对象     |
| public String getHostName()                      | 获取该 ip 地址对象对应的主机名。                   |
| public String getHostAddress()                   | 获取该 ip 地址对象中的 ip 地址信息。               |
| public boolean isReachable(int timeout)          | 在指定毫秒内，判断主机与该 ip 对应的主机是否能连通 |

### **InetAddress**

```
public class Main {
    public static void main(String[] args) throws Exception {
        InetAddress ip = InetAddress.getLocalHost();
        System.out.println(ip.getHostName());

        InetAddress ip1 = InetAddress.getByName("cgdcgd.cc");
        System.out.println(ip1.getHostName());
        System.out.println(ip1.getHostAddress());

        System.out.println(ip1.isReachable(2000));
    }
}
```

### **UDP 通信**

- 特点：无连接、不可靠通信。
- 不事先建立连接，数据按照包发，一包数据包含：自己的 IP、程序端口，目的地 IP、程序端口和数据（限制在 64KB 内）等。
- 发送方不管对方是否在线，数据在中间丢失也不管，如果接收方收到数据也不返回确认，故是不可靠的 。

**DatagramSocket 用于创建客户端、服务端**

| **构造器**                      | **说明**                                                 |
| ------------------------------- | -------------------------------------------------------- |
| public DatagramSocket()         | 创建**客户端**的 Socket 对象, 系统会随机分配一个端口号。 |
| public DatagramSocket(int port) | 创建**服务端**的 Socket 对象, 并指定端口号               |

| **方法**                                      | **说明**           |
| --------------------------------------------- | ------------------ |
| public void **send(**DatagramPacket**dp**)    | 发送数据包         |
| public void **receive(**DatagramPacket **p)** | 使用数据包接收数据 |

**DatagramPacket**：**创建数据包**

| **构造器**                                                                   | **说明**                 |
| ---------------------------------------------------------------------------- | ------------------------ |
| public DatagramPacket(byte[] buf, int length, InetAddress address, int port) | 创建发出去的数据包对象   |
| public DatagramPacket(byte[] buf, int length)                                | 创建用来接收数据的数据包 |

| **方法**                   | **说明**                         |
| -------------------------- | -------------------------------- |
| public int **getLength**() | 获取数据包，实际接收到的字节个数 |

```
public class Server {

    public static void main(String[] args) throws Exception {
        // 创建服务端对象指定端口
        DatagramSocket socket = new DatagramSocket(8080);

        // 创建接收数据包 参数: 接收的字节数组 接收的字节数组大小
        byte[] bytes = new byte[1024 * 64];
        DatagramPacket packet = new DatagramPacket(bytes, bytes.length);

        // 接收数据包数据
        socket.receive(packet);

        // 获取本次接收数据大小
        int len = packet.getLength();

        String rs = new String(bytes,0, len);

        System.out.println(rs);
    }
}

public class Client {
    public static void main(String[] args) throws Exception {
        // 创建客户端对象
        DatagramSocket socket = new DatagramSocket();

        // 创建发出去的数据包 参数: 发出去的数据 发出去数据的大小 服务器IP 端口
        byte[] bytes = "我是客户端".getBytes();

        DatagramPacket packet = new DatagramPacket(bytes, bytes.length, InetAddress.getLocalHost(),8080);

        // 发送数据包数据
        socket.send(packet);

        // 释放资源
        socket.close();
    }
}
```

### TCP 通信

**TCP 协议**

- 特点：面向连接、可靠通信。
- TCP 的最终目的：要保证在不可靠的信道上实现可靠的传输。
- TCP 主要有三个步骤实现可靠传输：三次握手建立连接，传输数据进行确认，四次挥手断开连接。

**客户端**

- 创建客户端的 Socket 对象，请求与服务端的连接。
- 使用 socket 对象调用 getOutputStream()方法得到字节输出流。
- 使用字节输出流完成数据的发送。
- 释放资源：关闭 socket 管道。

| **构造器**                            | **说明**                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| public Socket(String host , int port) | 根据指定的服务器 ip、端口号请求与服务端建立连接，连接通过，就获得了客户端 socket |

| **方法**                              | **说明**           |
| ------------------------------------- | ------------------ |
| public OutputStream getOutputStream() | 获得字节输出流对象 |
| public InputStream getInputStream()   | 获得字节输入流对象 |

**服务端**

- 创建 ServerSocket 对象，注册服务端端口。
- 调用 ServerSocket 对象的 accept()方法，等待客户端的连接，并得到 Socket 管道对象。
- 通过 Socket 对象调用 getInputStream()方法得到字节输入流、完成数据的接收。
- 释放资源：关闭 socket 管道

| **构造器**                    | **说明**             |
| ----------------------------- | -------------------- |
| public ServerSocket(int port) | 为服务端程序注册端口 |

| **方法**               | **说明**                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------ |
| public Socket accept() | 阻塞等待客户端的连接请求，一旦与某个客户端成功连接，则返回服务端这边的 Socket 对象。 |

```
public class Server {

    public static void main(String[] args) throws Exception {
        // 创建ServerSocket对象
        ServerSocket serverSocket = new ServerSocket( 8080);

        // 使用serverSocket调用accet方法等待客户端连接请求
       Socket socket =  serverSocket.accept();

        // 从socket获取数据输入流
        InputStream is = socket.getInputStream();

        // 包装为数据输入流
        DataInputStream dis = new DataInputStream(is);

        // 获取数据
        String rs = dis.readUTF();

        System.out.println(rs);
    }
}

public class Client {
    public static void main(String[] args) throws Exception {
        // 创建Socket对象 同时请求与服务端连接
        Socket socket = new Socket("127.0.0.1", 8080);

        // 从socket管道中得到字节输出流
        OutputStream os = socket.getOutputStream();

        // 字节输出流包装为数据输出流
        DataOutputStream dos =  new DataOutputStream(os);

        // 写数据
        dos.writeUTF("哈哈哈");

        // 释放资源
        dos.close();
        socket.close();
    }
}
```

## 反射

### 获取类

反射第一步：加载类，获取类的字节码：Class 对象

- Class c1 = 类名.class
- 调用 Class 提供方法：public static Class forName(String package)；
- Object 提供的方法： public Class getClass()； Class c3 = 对象.getClass();

```
public class Main {
    public static void main(String[] args) throws Exception {
        Class c = Person.class;

        Person p = new Person();
        Class c1 = p.getClass();

        System.out.println(c.getName());
        System.out.println(c.getSimpleName());
    }
}
```

### 获取类的构造器

Class 提供了从类中获取构造器的方法

| **方法**                                                          | **说明**                                 |
| ----------------------------------------------------------------- | ---------------------------------------- |
| Constructor<?>[] getConstructors()                                | 获取全部构造器（只能获取 public 修饰的） |
| Constructor<?>[] getDeclaredConstructors()                        | 获取全部构造器（只要存在就能拿到）       |
| Constructor<T> getConstructor(Class<?>... parameterTypes)         | 获取某个构造器（只能获取 public 修饰的） |
| Constructor<T> getDeclaredConstructor(Class<?>... parameterTypes) | 获取某个构造器（只要存在就能拿到）       |

| **Constructor**提供的方法               | **说明**                                                         |
| --------------------------------------- | ---------------------------------------------------------------- |
| T newInstance(Object... initargs)       | 调用此构造器对象表示的构造器，并传入参数，完成对象的初始化并返回 |
| public void setAccessible(boolean flag) | 设置为 true，表示禁止检查访问控制（暴力反射）                    |

```
public class Main {
    public static void main(String[] args) throws Exception {
        Class c = Person.class;

        Constructor[] constructors = c.getDeclaredConstructors();

        for (Constructor constructor : constructors) {
            System.out.println(constructor.getParameters());
            constructor.newInstance("name");
        }
    }
}
```

### **获取类的成员变量**

| **方法**                                   | **说明**                                       |
| ------------------------------------------ | ---------------------------------------------- |
| public Field[] getFields()                 | 获取类的全部成员变量（只能获取 public 修饰的） |
| public Field[] getDeclaredFields()         | 获取类的全部成员变量（只要存在就能拿到）       |
| public Field getField(String name)         | 获取类的某个成员变量（只能获取 public 修饰的） |
| public Field getDeclaredField(String name) | 获取类的某个成员变量（只要存在就能拿到）       |

| **方法**                                | **说明**                                      |
| --------------------------------------- | --------------------------------------------- |
| void set(Object obj, Object value)：    | 赋值                                          |
| Object get(Object obj)                  | 取值                                          |
| public void setAccessible(boolean flag) | 设置为 true，表示禁止检查访问控制（暴力反射） |

```
public class Main {
    public static void main(String[] args) throws Exception {
        Class c = Person.class;

       Field[] fields =  c.getDeclaredFields();

        for (Field field : fields) {
            System.out.println(field.getType());
            System.out.println(field.getName());
        }
        Field fName = c.getDeclaredField("name");


        Person p = new Person();

        // 赋值
        fName.setAccessible(true);
        fName.set(p, "jock");
        System.out.println(p.getName());

        // 取值
        System.out.println(fName.get(p));
    }
}
```

### 获取类的成员方法

| **方法**                                                          | **说明**                                       |
| ----------------------------------------------------------------- | ---------------------------------------------- |
| Method[] getMethods()                                             | 获取类的全部成员方法（只能获取 public 修饰的） |
| Method[] getDeclaredMethods()                                     | 获取类的全部成员方法（只要存在就能拿到）       |
| Method getMethod(String name, Class<?>... parameterTypes)         | 获取类的某个成员方法（只能获取 public 修饰的） |
| Method getDeclaredMethod(String name, Class<?>... parameterTypes) | 获取类的某个成员方法（只要存在就能拿到）       |

| **Method**提供的方法                             | **说明**                                      |
| ------------------------------------------------ | --------------------------------------------- |
| public Object invoke(Object obj, Object... args) | 触发某个对象的该方法执行。                    |
| public void setAccessible(boolean flag)          | 设置为 true，表示禁止检查访问控制（暴力反射） |

```
public class Main {
    public static void main(String[] args) throws Exception {
        Class c = Person.class;

       Method[] methods =  c.getDeclaredMethods();

        for (Method m : methods) {
            System.out.println(m.getReturnType());
            System.out.println(m.getName());
        }

        Method method =  c.getDeclaredMethod("getName");
        Person p = new Person();
        // 执行方法
        Object rs = method.invoke(p);
        System.out.println(rs);
    }
}
```

## 注解

- 就是 Java 代码里的特殊标记，比如：@Override、@Test 等，作用是：让其他程序根据注解信息来决定怎么执行该程序。
- 注意：注解可以用在类上、构造器上、方法上、成员变量上、参数上、等位置处。

**自定义注解**

- **public** @**interface** 注解名称 { **public** 属性类型 属性名() **default** 默认值 ; }
- 如果注解中只有一个 value 属性，使用注解时，value 名称可以不写!

```
public @interface Demo {
    String name();
    boolean flag() default true;
}

@Demo(name = "jock")
   public class Text {}
```

### **元注解**

指的是：修饰注解的注解。

#### **@Target **

声明被修饰的注解只能在哪些位置使用

1.TYPE，类，接口

2.FIELD, 成员变量

3.METHOD, 成员方法

4.PARAMETER, 方法参数

5.CONSTRUCTOR, 构造器

6.LOCAL_VARIABLE, 局部变量

```
@Target({ElementType.TYPE, ElementType.FIELD})
public @interface Demo {
    String name();
    boolean flag() default true;
}

```

#### **@**Retention

声明注解的保留周期。

_1._ _SOURCE_

只作用在源码阶段，字节码文件中不存在。

_2._ CLASS（默认值）

保留到字节码文件阶段，运行阶段不存在.

_3._ _RUNTIME（开发常用）_

一直保留到运行阶段。

```
@Target({ElementType.TYPE, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Demo {
    String name();
    boolean flag() default true;
}
```

### 注解的解析

就是判断类上、方法上、成员变量上是否存在注解，并把注解里的内容给解析出来。

**如何解析注解？**

- 指导思想：要解析谁上面的注解，就应该先拿到谁。
- 比如要解析类上面的注解，则应该先获取该类的 Class 对象，再通过 Class 对象解析其上面的注解。
- 比如要解析成员方法上的注解，则应该获取到该成员方法的 Method 对象，再通过 Method 对象解析其上面的注解。
- Class 、 Method 、 Field , Constructor、都实现了 AnnotatedElement 接口，它们都拥有解析注解的能力。

| **AnnotatedElement**接口提供了解析注解的方法                          | 说明                           |
| --------------------------------------------------------------------- | ------------------------------ |
| public Annotation[] getDeclaredAnnotations()                          | 获取当前对象上面的注解。       |
| public T getDeclaredAnnotation(Class<T> annotationClass)              | 获取指定的注解对象             |
| public boolean isAnnotationPresent(Class<Annotation> annotationClass) | 判断当前对象上是否存在某个注解 |

```
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface Demo {
    boolean flag() default true;
    String[] s();
}

@Demo(s = {"10", "20"}, flag = false)
public class Text {
    @Demo(s = {"10", "20"}, flag = true)
    public void text() {
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // 获取类对象
        Class c = Text.class;

        // 解析类上的注解
        if(c.isAnnotationPresent(Demo.class)) {
          Demo demo = (Demo) c.getDeclaredAnnotation(Demo.class);
          // 获取注解数据
            System.out.println(demo.flag());
        }

        // 获取方法对象
        Method method = c.getMethod("text");

        // 解析方法上的注解
        if(method.isAnnotationPresent(Demo.class)) {
            Demo demo = (Demo) method.getDeclaredAnnotation(Demo.class);
            // 获取注解数据
            System.out.println(demo.flag());
        }
    }
}
```

### 自定义@MyText 注解

```
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyText {
}

public class Text {

    @MyText
    public void text1() {
        System.out.println("text1");
    }

    public void text2() {
        System.out.println("text2");
    }

    public static void main(String[] args) throws Exception {
        Class c = Text.class;

        Method[] methods = c.getDeclaredMethods();

        for (Method method : methods) {
            // 存在@MyText注解则执行
            if(method.isAnnotationPresent(MyText.class)) {
                method.invoke(new Text());
            }
        }
    }
}
```
