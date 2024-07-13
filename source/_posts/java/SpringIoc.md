---
title: Spring-IOC
categories: Java
tags: Spring
cover: /img/post/spring.png
abbrlink: 51cfb9c
date: 2023-10-27 19:25:00
updated: 2023-10-27 19:25:00
---

## 基于 XML 管理 Bean

准备项目

1. 创建 maven 工程（spring-ioc-xml-01）

2. 导入 SpringIoC 相关依赖

   pom.xml

   ```xml
   <dependencies>
       <!--spring context依赖-->
       <!--当你引入Spring Context依赖之后，表示将Spring的基础依赖引入了-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-context</artifactId>
           <version>6.0.6</version>
       </dependency>
       <!--junit5测试-->
       <dependency>
           <groupId>org.junit.jupiter</groupId>
           <artifactId>junit-jupiter-api</artifactId>
           <version>5.3.1</version>
       </dependency>
   </dependencies>
   ```

### 基于无参数构造函数

当通过构造函数方法创建一个 bean（组件对象） 时，所有普通类都可以由 Spring 使用并与之兼容。也就是说，正在开发的类不需要实现任何特定的接口或以特定的方式进行编码。只需指定 Bean 类信息就足够了。但是，默认情况下，我们需要一个默认（空）构造函数。\

**类文件**

```
package com.cgdcge.cc;
public class HelloCompoment {

    // 默认包含无参数构造函数
    public void sayHello() {
        System.out.println("HappyComponent.sayHello");
    }
}

```

**xml 文件**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--
        -   bean标签：通过配置bean标签告诉IOC容器需要创建对象的组件信息
        -   id属性：bean的唯一标识,方便后期获取Bean！
        -   class属性：组件类的全限定符！
        -   注意：要求当前组件类必须包含无参数构造函数！
    -->
    <bean id="helloCompoments" class="com.cgdcge.cc.HelloCompoment"/>
</beans>
```

### 基于静态工厂方法实例化

**类文件**

```
package com.cgdcge.cc;

public class ClientService {
    private static ClientService clientService = new ClientService();
    private ClientService() {}
    public static ClientService createInstance() {
        return clientService;
    }
}
```

**xml 文件**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--
    -   bean标签：通过配置bean标签告诉IOC容器需要创建对象的组件信息
    -   id属性：bean的唯一标识,方便后期获取Bean！
    -   class属性：组件类的全限定符！
    -   factory-method: 指定静态工厂方法，注意，该方法必须是static方法
    -->
    <bean id="clientService" class="com.cgdcge.cc.ClientService" factory-method="createInstance"/>
</beans>

```

### 基于实例工厂方法实例化

**类文件**

```
package com.cgdcge.cc;

public class DefaultServiceLocator {
    private static ClientServiceImpl clientService = new  ClientServiceImpl();

    public ClientServiceImpl createClientServiceInstance() {
        return clientService;
    }
}
```

**xml 文件**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 将工厂类进行ioc配置 -->
    <bean id="serviceLocator" class="com.cgdcge.cc.DefaultServiceLocator" />

    <!--
     根据工厂对象的实例工厂方法进行实例化组件对象
     factory-bean属性：指定当前容器中工厂Bean 的名称。
     factory-method:  指定实例工厂方法名。注意，实例方法必须是非static的
    -->
    <bean id="clientService" factory-bean="serviceLocator" factory-method="createClientServiceInstance"/>
</beans>

```

### 依赖注入配置（DI）

### 基于构造函数的依赖注入（单个构造参数）

**类文件**

```
package com.cgdcge.cc.xmlIo;
public class UserDao {}

package com.cgdcge.cc.xmlIo;
public class UserService {
        private UserDao userDao;
        public UserService(UserDao userDao) {
            this.userDao = userDao;
        }
}
```

**xml 文件**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.cgdcge.cc.xmlIo.UserDao"/>

    <bean id="userServeice" class="com.cgdcge.cc.xmlIo.UserService">
        <!--
            constructor-arg 构造函数传递参数的di配置
            value = 直接属性值 int age = 10
            ref = 引用其他bean beanId值
        -->
        <constructor-arg  ref="userDao"/>
    </bean>
</beans>
```

### 基于构造函数的依赖注入（多个构造参数）

**类文件**

```
package com.cgdcge.cc.xmlIo;
public class UserDao {}

package com.cgdcge.cc.xmlIo;
public class UserService {
    private UserDao userDao;
    private int age;
    private String name;
    public UserService(int age , String name ,UserDao userDao) {
        this.userDao = userDao;
        this.age = age;
        this.name = name;
    }
}
```

**xml 文件**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.cgdcge.cc.xmlIo.UserDao"/>
    <!-- 方案一 按照顺序填写-->
    <bean id="userServeice" class="com.cgdcge.cc.xmlIo.UserService">
        <!--
            constructor-arg 构造函数传递参数的di配置
            value = 直接属性值 int age = 10
            ref = 引用其他bean beanId值
        -->
        <constructor-arg  value="18"/>
        <constructor-arg  value="张三"/>
        <constructor-arg  ref="userDao"/>
    </bean>

    <!-- 方案二 按照构造参数名称填写-->
    <bean id="userServeice1" class="com.cgdcge.cc.xmlIo.UserService">
        <constructor-arg name="age"  value="18"/>
        <constructor-arg name="userDao"   ref="userDao"/>
        <constructor-arg  name="name"  value="张三"/>
    </bean>
</beans>
```

### 基于 setter 方法的依赖注入

开发中，除了构造函数注入（DI）更多的使用的 Setter 方法进行注入！

**类文件**

```
package com.cgdcge.cc.xmlIo;
public class UserDao {}

package com.cgdcge.cc.xmlIo;
public class UserService {
    private UserDao userDao;
    private String name;
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }
    public void setName(String name) {
        this.name = name;
    }
}
```

**xml 文件**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.cgdcge.cc.xmlIo.UserDao"/>

    <bean id="userServeice" class="com.cgdcge.cc.xmlIo.UserService">
        <!--
       setter方法，注入movieFinder对象的标识id
       name = 属性名 去掉setter方法的set和首字母小写的值
       ref = 引用bean的id值
        -->
      <property name="name" value="rock " />
        <property name="userDao" ref="userDao" />
    </bean>
</beans>
```

### IoC 容器创建和使用

**基本类**

```
package com.cgdcge.cc;
public class HelloCompoment {

    // 默认包含无参数构造函数
    public void sayHello() {
        System.out.println("HappyComponent.sayHello");
    }
}
```

**xml 配置**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="helloCompoments" class="com.cgdcge.cc.HelloCompoment"/>
</beans>
```

**容器实例化**

```
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class springText {
    public void createIoC() {
        // 实例化并且指定配置文件
        // 参数：String...locations 传入一个或者多个配置文件
        ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
    }
}

```

**Bean 对象读取**

```
package com.cgdcgd.cc.test;
import com.cgdcge.cc.HelloCompoment;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class springText {
    @Test
    public void getBean() {
        // 1.获取ioc容器
        ApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");

        // 2.读取ioc容器
        // 方式1: 根据id获取指定类型,返回为Object,需要类型转化!
        HelloCompoment helloCompoments = (HelloCompoment) context.getBean("helloCompoment");
        // 方式2: 根据id获取指定类型,同时指定class
        HelloCompoment helloCompoments1 = context.getBean("helloCompoment",HelloCompoment.class);
        // 方式3: 根据class获取指定类型  但是同一个类在ioc容器中只能有一个bean
        HelloCompoment helloCompoments2 = context.getBean(HelloCompoment.class);
        //使用组件对象
        helloCompoments.sayHello();
    }
}
```

### 组件生命周期和作用域

**类文件**

```
package com.cgdcge.cc;

public class HelloCompoment {

    //周期方法要求： 方法命名随意，但是要求方法必须是 public void 无形参列表
    public void init() {
        // 初始化逻辑
        System.out.println("init");
    }
    public void cleanup() {
        // 释放资源逻辑
        System.out.println("cleanup");
    }
}
```

**xml 文件**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
        <!--
             scope  = singleton时为单例模式（默认推荐）创建的是同一个一个对象
             scope  = prototype时为多例模式，每次getBean都会创建一个新对象
        -->
    <bean id="helloCompoment" class="com.cgdcge.cc.HelloCompoment" init-method="init" destroy-method="cleanup"/>
</beans>
```

**使用**

```
package com.cgdcgd.cc.test;
import org.junit.jupiter.api.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;
public class springText {
    @Test
    public void getBean() {
        // 1.创建ioc容器就会调用组件的init方法
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("spring.xml");
        // 手动结束调用destroy方法
        context.close();
    }
}
```

## 基于注解方式管理 Bean

pring 提供了以下多个注解，这些注解可以直接标注在 Java 类上，将它们定义成 Spring Bean。

| 注解        | 说明                                                                                                                                                                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| @Component  | 该注解用于描述 Spring 中的 Bean，它是一个泛化的概念，仅仅表示容器中的一个组件（Bean），并且可以作用在应用的任何层次，例如 Service 层、Dao 层等。 使用时只需将该注解标注在相应类上即可。 |
| @Repository | 该注解用于将数据访问层（Dao 层）的类标识为 Spring 中的 Bean，其功能与 @Component 相同。                                                                                                 |
| @Service    | 该注解通常作用在业务层（Service 层），用于将业务层的类标识为 Spring 中的 Bean，其功能与 @Component 相同。                                                                               |
| @Controller | 该注解通常作用在控制层（如 SpringMVC 的 Controller），用于将控制层的类标识为 Spring 中的 Bean，其功能与 @Component 相同。                                                               |

**类文件**

```
package com.cgdcge.cc;
import org.springframework.stereotype.Component;

@Component
public class HelloComponent {
    public void sayHello() {
        System.out.println("sayHello");
    }
}
```

**xml 文件**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!-- 配置自动扫描的包 -->
    <!-- 1.包要精准,提高性能!
         2.会扫描指定的包和子包内容
         3.多个包可以使用,分割 例如: com.cgdcge.controller,com.cgdcge.service等
    -->
    <context:component-scan base-package="com.cgdcge.cc" />
</beans>
```

### 作用域和周期方法注解

**类文件**

```
package com.cgdcge.cc;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

// @Scope(scopeName = ConfigurableBeanFactory.SCOPE_SINGLETON) //单例,默认值
@Scope(scopeName = ConfigurableBeanFactory.SCOPE_PROTOTYPE) //多例  二选一
@Component
public class HelloComponent {

    @PostConstruct  //注解制指定初始化方法
    public void init() {
        // 初始化逻辑
        System.out.println("init");
    }
    @PreDestroy //注解指定销毁方法
    public void cleanup() {
        // 释放资源逻辑
        System.out.println("cleanup");
    }
}
```

### 引用类型自动装配

**类文件**

```
// UserController
package com.cgdcge.cc.xmlIo;
public class UserController {
    private UserServiceImpl userService;
    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }
    public void show() {
        userService.show();
    }
}

// UserService
package com.cgdcge.cc.xmlIo;
public interface UserService {
    public void show();
}

// UserServiceImpl
package com.cgdcge.cc.xmlIo;
public class UserServiceImpl implements  UserService {
    @Override
    public void show() {
        System.out.println("show");
    }
}
```

**基于 xml 方式配置**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userServiceImpl" class="com.cgdcge.cc.xmlIo.UserServiceImpl"/>

    <bean id="userServeice" class="com.cgdcge.cc.xmlIo.UserController">
        <property name="userService" ref="userServiceImpl"/>
    </bean>
</beans>
```

**基于注解方式配置**

```
// UserController
package com.cgdcge.cc.xmlIo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
@Controller
public class UserController {
    // 自动装配注解
    @Autowired
    private UserServiceImpl userService;

    public void show() {
        userService.show();
    }
}

// UserService
package com.cgdcge.cc.xmlIo;
public interface UserService {
    public void show();
}

// UserServiceImpl
package com.cgdcge.cc.xmlIo;
import org.springframework.stereotype.Service;
@Service
public class UserServiceImpl implements  UserService {
    @Override
    public void show() {
        System.out.println("show");
    }
}
```

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
    <context:component-scan base-package="com.cgdcge.cc.xmlIo" />
</beans>
```

### 基本类型属性赋值

`@Value` 通常用于注入外部化属性

```
package com.cgdcge.cc.xmlIo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

@Controller
public class UserController {
    @Value("19")
    private int age;
    // 自动装配注解
    @Autowired
    private UserServiceImpl userService;

    public void show() {
        System.out.println(age);
        userService.show();
    }
}
```

## 基于配置类方式管理 Bean

**配置类**

```
package com.cgdcge.cc.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
//标注当前类是配置类，替代application.xml
@Configuration

//使用@ComponentScan注解,可以配置扫描包,替代<context:component-scan标签
@ComponentScan(basePackages = {"com.cgdcge.cc"})

//使用注解读取外部配置，替代 <context:property-placeholder标签
//@PropertySource("classpath:application.properties")
public class MyConfig {
}
```

**获取容器**

```
package com.cgdcgd.cc.test;
import com.cgdcge.cc.config.MyConfig;
import com.cgdcge.cc.xmlIo.UserController;
import org.junit.jupiter.api.Test;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class springText {
    @Test
    public void getBeanBy() {

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(MyConfig.class);

        UserController user =  context.getBean(UserController.class);
        user.show();
    }
}
```

## 整合 Spring 搭建测试环境

整合测试环境作用

好处 1：不需要自己创建 IOC 容器对象了

好处 2：任何需要的 bean 都可以在测试类中直接享受自动装配

1. 导入相关依赖

   ```xml
   <!--junit5测试-->
   <dependency>
       <groupId>org.junit.jupiter</groupId>
       <artifactId>junit-jupiter-api</artifactId>
       <version>5.3.1</version>
   </dependency>
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-test</artifactId>
       <version>6.0.6</version>
       <scope>test</scope>
   </dependency>
   ```

2. 整合测试注解使用

   ```java
   //@SpringJUnitConfig(locations = {"classpath:spring-context.xml"})  //指定配置文件xml
   @SpringJUnitConfig(value = {BeanConfig.class})  //指定配置类
   public class Junit5IntegrationTest {

       @Autowired
       private User user;

       @Test
       public void testJunit5() {
           System.out.println(user);
       }
   }
   ```

## 三种配置方式总结

### XML 方式配置总结

1.  所有内容写到 xml 格式配置文件中
2.  声明 bean 通过\<bean 标签
3.  \<bean 标签包含基本信息（id,class）和属性信息 \<property name value / ref
4.  引入外部的 properties 文件可以通过\<context:property-placeholder
5.  IoC 具体容器实现选择 ClassPathXmlApplicationContext 对象

### XML+注解方式配置总结

1.  注解负责标记 IoC 的类和进行属性装配
2.  xml 文件依然需要，需要通过\<context:component-scan 标签指定注解范围
3.  标记 IoC 注解：@Component,@Service,@Controller,@Repository&#x20;
4.  标记 DI 注解：@Autowired @Qualifier @Resource @Value
5.  IoC 具体容器实现选择 ClassPathXmlApplicationContext 对象

### 完全注解方式配置总结

1.  完全注解方式指的是去掉 xml 文件，使用配置类 + 注解实现
2.  xml 文件替换成使用@Configuration 注解标记的类
3.  标记 IoC 注解：@Component,@Service,@Controller,@Repository&#x20;
4.  标记 DI 注解：@Autowired @Qualifier @Resource @Value
5.  \<context:component-scan 标签指定注解范围使用@ComponentScan(basePackages = {"com.atguigu.components"})替代
6.  \<context:property-placeholder 引入外部配置文件使用@PropertySource({"classpath:application.properties","classpath:jdbc.properties"})替代
7.  \<bean 标签使用@Bean 注解和方法实现
8.  IoC 具体容器实现选择 AnnotationConfigApplicationContext 对象
