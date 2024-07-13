---
title: Spring-AOP
categories: Java
tags: Spring
cover: /img/post/spring.png
abbrlink: 51cll9c
date: 2023-11-01 19:25:00
updated: 2023-11-01 19:25:00
---

## Spring AOP 基于注解方式实现

1.  AOP 一种区别于 OOP 的编程思维，用来完善和解决 OOP 的非核心代码冗余和不方便统一维护问题！
2.  代理技术（动态代理|静态代理）是实现 AOP 思维编程的具体技术，但是自己使用动态代理实现代码比较繁琐！
3.  Spring AOP 框架，基于 AOP 编程思维，封装动态代理技术，简化动态代理技术实现的框架！SpringAOP 内部帮助我们实现动态代理，我们只需写少量的配置，指定生效范围即可,即可完成面向切面思维编程的实现！

**导入依赖**

```
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>6.0.6</version>
</dependency>

<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>6.0.6</version>
</dependency>
```

**接口**

```
public interface Calculator {
    int add(int i, int j);
    int sub(int i, int j);
    int mul(int i, int j);
    int div(int i, int j);
}
```

**实现类**

```
package com.cgdcge.cc;
import org.springframework.stereotype.Component;

@Component
public class CalculatorPureImpl implements Calculator {
    @Override
    public int add(int i, int j) {
        int result = i + j;
        return result;
    }
    @Override
    public int sub(int i, int j) {
        int result = i - j;
        return result;
    }
    @Override
    public int mul(int i, int j) {
        int result = i * j;
        return result;
    }
    @Override
    public int div(int i, int j) {
        int result = i / j;
        return result;
    }
}
```

**切面类**

```
package com.cgdcge.cc.advice;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

/*
    1.定义方法存储增强代码
    2.使用注解配置 指定插入目标方法的位置
         前置 @Before
         后置 @AfterReturn
         异常 @AfterThrowing
         前置 @Aafte
         后置 @Around

         try {
             前置
             目标方法
             后置
         } catch(){
           异常
         } finall {
            最后
         }
    3.配置切点表达式
    4.添加@Aspect @Component注解
 */
@Component
@Aspect
public class LogAspect {
    // value属性：指定切入点表达式，由切入点表达式控制当前通知方法要作用在哪一个目标方法上
    @Before(value = "execution(* com.cgdcge.cc.*.*(..))")
    public void start() {
        System.out.println("方法开始了");
    }
    @AfterReturning(value = "execution(* com.cgdcge.cc.*.*(..))")
    public void after() {
        System.out.println("方法结束了");
    }
    @AfterThrowing(value = "execution(* com.cgdcge.cc.*.*(..))")
    public void error() {
        System.out.println("方法报错了");
    }
}

```

**开启 aspectj 注解支持**

```
package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@ComponentScan(basePackages = {"com.cgdcge.cc"})
@EnableAspectJAutoProxy //作用等于 <aop:aspectj-autoproxy /> 配置类上开启 Aspectj注解支持!
public class Config {
}

```

**测试类**

```
import com.cgdcge.cc.Calculator;
import config.Config;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

@SpringJUnitConfig(value = {Config.class}) // 指定配置类
public class MyTest {

    // 这里使用接口而不是类
    @Autowired
    private Calculator cal;

    @Test
    public void test() {
        cal.add(2,3);
    }
}
```

## 获取通知细节信息

**JointPoint 接口**

需要获取方法签名、传入的实参等信息时，可以在通知方法声明 JoinPoint 类型的形参。

1. JoinPoint 接口通过 getSignature() 方法获取目标方法的签名（方法声明时的完整信息）
2. 通过目标方法签名对象获取方法名
3. 通过 JoinPoint 对象获取外界调用目标方法时传入的实参列表组成的数组

```
package com.cgdcge.cc.advice;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.List;
@Component
@Aspect
public class LogAspect {
    @Before(value = "execution(* com.cgdcge.cc.*.*(..))")
    public void start(JoinPoint joinPoint) {
        // 1.通过JoinPoint对象获取目标方法签名对象
        // 方法的签名：一个方法的全部声明信息
        Signature signature = joinPoint.getSignature();

        // 2.通过方法的签名对象获取目标方法的详细信息
        String methodName = signature.getName();
        System.out.println("methodName = " + methodName);

        int modifiers = signature.getModifiers();
        System.out.println("modifiers = " + modifiers);

        String declaringTypeName = signature.getDeclaringTypeName();
        System.out.println("declaringTypeName = " + declaringTypeName);

        // 3.通过JoinPoint对象获取外界调用目标方法时传入的实参列表
        Object[] args = joinPoint.getArgs();

        // 4.由于数组直接打印看不到具体数据，所以转换为List集合
        List<Object> argList = Arrays.asList(args);

        System.out.println("[AOP前置通知] " + methodName + "方法开始了，参数列表：" + argList);
    }

    // @AfterReturning注解标记返回通知方法
    // 在返回通知中获取目标方法返回值分两步：
    // 第一步：在@AfterReturning注解中通过returning属性设置一个名称
    // 第二步：使用returning属性设置的名称在通知方法中声明一个对应的形参
    @AfterReturning(value = "execution(* com.cgdcge.cc.*.*(..))", returning = "returnObj")
    public void after(JoinPoint joinPoint, Object returnObj) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("[AOP返回通知] "+methodName+"方法成功结束了，返回值是：" + returnObj);
    }

    // @AfterThrowing注解标记异常通知方法
    // 在异常通知中获取目标方法抛出的异常分两步：
    // 第一步：在@AfterThrowing注解中声明一个throwing属性设定形参名称
    // 第二步：使用throwing属性指定的名称在通知方法声明形参，Spring会将目标方法抛出的异常对象从这里传给我们
    @AfterThrowing(value = "execution(* com.cgdcge.cc.*.*(..))",throwing = "throwingObj")
    public void error(JoinPoint joinPoint, Throwable throwingObj) {
        String methodName = joinPoint.getSignature().getName();
        System.out.println("[AOP异常通知] "+methodName+"方法抛异常了，异常类型是：" + throwingObj.getClass().getName());
    }
}
```

## 切点表达式语法

![](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img011.dde1a79a.png)

1. 语法细节

   - 第一位：execution( ) 固定开头

   - 第二位：方法访问修饰符

     ```java
     public private 直接描述对应修饰符即可
     ```

   - 第三位：方法返回值

     ```java
     int String void 直接描述返回值类型

     ```

     注意：

     特殊情况   不考虑   访问修饰符和返回值

     execution(\* \* )  这是错误语法

     execution( \*) == 你只要考虑返回值 或者 不考虑访问修饰符 相当于全部不考虑了

   - 第四位：指定包的地址

     ```java
      固定的包: com.atguigu.api | service | dao
      单层的任意命名: com.atguigu.*  = com.atguigu.api  com.atguigu.dao  * = 任意一层的任意命名
      任意层任意命名: com.. = com.atguigu.api.erdaye com.a.a.a.a.a.a.a  ..任意层,任意命名 用在包上!
      注意: ..不能用作包开头   public int .. 错误语法  com..
      找到任何包下: *..
     ```

   - 第五位：指定类名称

     ```java
     固定名称: UserService
     任意类名: *
     部分任意: com..service.impl.*Impl
     任意包任意类: *..*

     ```

   - 第六位：指定方法名称

     ```java
     语法和类名一致
     任意访问修饰符,任意类的任意方法: * *..*.*
     ```

   - 第七位：方法参数

     ```java
     第七位: 方法的参数描述
            具体值: (String,int) != (int,String) 没有参数 ()
            模糊值: 任意参数 有 或者 没有 (..)  ..任意参数的意识
            部分具体和模糊:
              第一个参数是字符串的方法 (String..)
              最后一个参数是字符串 (..String)
              字符串开头,int结尾 (String..int)
              包含int类型(..int..)
     ```

   切点表达式案例

   ```java
   1.查询某包某类下，访问修饰符是公有，返回值是int的全部方法
       public int xx.xx.jj.*(..)
   2.查询某包下类中第一个参数是String的方法
       * xx.xx.jj.*(Strin..)
   3.查询全部包下，无参数的方法！
       * *..*.*(..int)
   4.查询com包下，以int参数类型结尾的方法
       * com..*.*(..int)
   5.查询指定包下，Service开头类的私有返回值int的无参数方法
       private int xx.xx.Service*.*()

   ```

## 环绕通知

环绕通知对应整个 try...catch...finally 结构，包括前面四种通知的所有功能。

```java
public class LogAspect {
    // 使用@Around注解标明环绕通知方法
    @Around(value = "execution(* com.cgdcge.cc.*.*(..))")
    public Object around(ProceedingJoinPoint joinPoint) {
        // 通过ProceedingJoinPoint对象获取外界调用目标方法时传入的实参数组
        Object[] args = joinPoint.getArgs();
        Object result = null;
        try {
            System.out.println("satrt");
            result = joinPoint.proceed(args);
            System.out.println("end");
        } catch (Throwable e) {
            System.out.println("error");
            throw new RuntimeException(e);
        } finally {

        }
        return result;
    }
}
```
