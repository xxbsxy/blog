---
title: Maven
categories: Java
tags: Java
cover: /img/post/16.png
abbrlink: 7273cdc
date: 2023-10-25 19:25:00
updated: 2023-10-25 19:25:00
---

## Maven 介绍

Maven 是一款为 Java 项目构建管理、依赖管理的工具（**软件**），使用 Maven 可以自动化构建、测试、打包和发布项目，大大提高了开发效率和质量。

1. 场景概念

   **场景 1：** 例如我们项目需要第三方库（依赖），如 Druid 连接池、MySQL 数据库驱动和 Jackson 等。那么我们可以将需要的依赖项的信息编写到 Maven 工程的配置文件，Maven 软件就会自动下载并复制这些依赖项到项目中，也会自动下载依赖需要的依赖！确保依赖版本正确无冲突和依赖完整！

   **场景 2：** 项目开发完成后，想要将项目打成.war 文件，并部署到服务器中运行，使用 Maven 软件，我们可以通过一行构建命令（mvn package）快速项目构建和打包！节省大量时间！

2. **依赖管理：**

   Maven 可以管理项目的依赖，包括自动下载所需依赖库、自动下载依赖需要的依赖并且保证版本没有冲突、依赖版本管理等。通过 Maven，我们可以方便地维护项目所依赖的外部库，而我们仅仅需要编写配置即可。

3. **构建管理：**

   项目构建是指将源代码、配置文件、资源文件等转化为能够运行或部署的应用程序或库的过程！

   Maven 可以管理项目的编译、测试、打包、部署等构建过程。通过实现标准的构建生命周期，Maven 可以确保每一个构建过程都遵循同样的规则和最佳实践。同时，Maven 的插件机制也使得开发者可以对构建过程进行扩展和定制。主动触发构建，只需要简单的命令操作即可。

## Maven 配置

我们需要需改**settings.xml**配置文件，来修改 maven 的一些默认配置。我们主要修改的有三个配置

1. 配置本地仓库地址

```xml
<!-- conf/settings.xml 55行 -->
<localRepository>D:\cache\maven</localRepository>
```

2. 配置国内阿里镜像

```xml
<!--在mirrors节点(标签)下添加中央仓库镜像 160行附近-->
<mirror>
    <id>alimaven</id>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
    <mirrorOf>central</mirrorOf>
</mirror>
```

3. 配置 jdk17 版本项目构建

```xml
<!--在profiles节点(标签)下添加jdk编译版本 190行附近-->
<profile>
    <id>jdk-17</id>
    <activation>
      <activeByDefault>true</activeByDefault>
      <jdk>17</jdk>
    </activation>
    <properties>
      <maven.compiler.source>17</maven.compiler.source>
      <maven.compiler.target>17</maven.compiler.target>
      <maven.compiler.compilerVersion>17</maven.compiler.compilerVersion>
    </properties>
</profile>
```

## MavenGAVP 属性

Maven 中的 GAVP 是指 GroupId、ArtifactId、Version、Packaging 等四个属性的缩写，其中前三个是必要的，而 Packaging 属性为可选项。这四个属性主要为每个项目在 maven 仓库总做一个标识。有了具体标识，方便 maven 软件对项目进行管理和互相引用！

**GAV 遵循以下规则：**

**GroupID 格式**：com.{公司/BU }.业务线.\[子业务线]，最多 4 级。

**ArtifactID 格式**：产品线名-模块名。语义不重复不遗漏，先到仓库中心去查证一下。

**Version 版本号格式推荐**：主版本号.次版本号.修订号 1.0.0

- 主版本号：当做了不兼容的 API 修改，或者增加了能改变产品方向的新功能。

- 次版本号：当做了向下兼容的功能性新增（新增类、接口等）。
- 修订号：修复 bug，没有修改方法签名的功能加强，保持 API 兼容性。

- 例如： 初始 →1.0.0 修改 bug → 1.0.1 功能调整 → 1.1.1 等

**Packaging 定义规则：**

- 指示将项目打包为什么类型的文件，idea 根据 packaging 值，识别 maven 项目类型！

- packaging 属性为 jar（默认值），代表普通的 Java 工程，打包以后是.jar 结尾的文件。

- packaging 属性为 war，代表 Java 的 web 工程，打包以后.war 结尾的文件。

- packaging 属性为 pom，代表不会打包，用来做继承的父工程。

## Maven 依赖管理

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

  <!-- gavp属性 不会改变-->
    <groupId>cc.cgdcgd</groupId>
    <artifactId>maven_demo</artifactId>
    <version>1.0-0</version>
  <!-- 打包方式 jar(默认值) web war pom(不打包)-->
    <packaging>jar</packaging>

    <properties>
  <!--  统一管理版本号-->
        <jackson.version>2.15.3</jackson.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

      <!--
        dependencies  项目依赖信息集合
        dependency  每个依赖项
        [gav]  依赖的信息 就是其他maven的工程
        https://mvnrepository.com
        maven-search插件
      -->
    <dependencies>
         <dependency>
             <groupId>com.fasterxml.jackson.core</groupId>
             <artifactId>jackson-core</artifactId>
             <version>2.15.3</version>
          </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        <!--  使用统一版本号-->
            <version>${jackson.version}</version>
        <!--
            引入依赖的作用域 生效范围
            - compile ：main目录 test目录  打包打包 [默认]
            - provided：main目录 test目录  Servlet
            - runtime： 打包运行           MySQL
            - test:    test目录           junit
        -->
            <scope>test</scope>
        </dependency>
    </dependencies>

  <build>
   <!-- 导入插件 -->
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-war-plugin</artifactId>
            <version>3.2.2</version>
        </plugin>
    </plugins>
</build>
</project>
```

## 依赖传递和冲突

**依赖传递**指的是当一个模块或库 A 依赖于另一个模块或库 B，而 B 又依赖于模块或库 C，那么 A 会间接依赖于 C。这种依赖传递结构可以形成一个依赖树。当我们引入一个库或框架时，构建工具（如 Maven、Gradle）会自动解析和加载其所有的直接和间接依赖，确保这些依赖都可用。

依赖传递的作用是：

1.  减少重复依赖：当多个项目依赖同一个库时，Maven 可以自动下载并且只下载一次该库。这样可以减少项目的构建时间和磁盘空间。
2.  自动管理依赖: Maven 可以自动管理依赖项，使用依赖传递，简化了依赖项的管理，使项目构建更加可靠和一致。
3.  确保依赖版本正确性：通过依赖传递的依赖，之间都不会存在版本兼容性问题，确实依赖的版本正确性！

**依赖冲突**当直接引用或者间接引用出现了相同的 jar 包! 这时呢，一个项目就会出现相同的重复 jar 包，这就算作冲突！依赖冲突避免出现重复依赖，并且终止依赖传递！maven 自动解决依赖冲突问题能力，会按照自己的原则，进行重复依赖选择。同时也提供了手动解决的冲突的方式，不过不推荐！

解决依赖冲突（如何选择重复依赖）方式：

- 短路优先原则（第一原则）

  A—>B—>C—>D—>E—>X(version 0.0.1)

  A—>F—>X(version 0.0.2)

  则 A 依赖于 X(version 0.0.2)。

- 依赖路径长度相同情况下，则“先声明优先”（第二原则）

  A—>E—>X(version 0.0.1)

  A—>F—>X(version 0.0.2)

  在\<depencies>\</depencies>中，先声明的，路径相同，会优先选择！

## 依赖导入失败场景和解决方案

在使用 Maven 构建项目时，可能会发生依赖项下载错误的情况，主要原因有以下几种：

1.  下载依赖时出现网络故障或仓库服务器宕机等原因，导致无法连接至 Maven 仓库，从而无法下载依赖。
2.  依赖项的版本号或配置文件中的版本号错误，或者依赖项没有正确定义，导致 Maven 下载的依赖项与实际需要的不一致，从而引发错误。
3.  本地 Maven 仓库或缓存被污染或损坏，导致 Maven 无法正确地使用现有的依赖项，并且也无法重新下载！

解决方案：

1.  检查网络连接和 Maven 仓库服务器状态。
2.  确保依赖项的版本号与项目对应的版本号匹配，并检查 POM 文件中的依赖项是否正确。
3.  清除本地 Maven 仓库缓存（lastUpdated 文件），因为只要存在 lastupdated 缓存文件，刷新也不会重新下载。本地仓库中，根据依赖的 gav 属性依次向下查找文件夹，最终删除内部的文件，刷新重新下载即可！

## Maven 构建

**命令方式构建:**

语法: mvn 构建命令 构建命令....

| 命令        | 描述                                          |
| ----------- | --------------------------------------------- |
| mvn clean   | 清理编译或打包后的项目结构,删除 target 文件夹 |
| mvn compile | 编译项目，生成 target 文件                    |
| mvn test    | 执行测试源码 (测试)                           |
| mvn site    | 生成一个项目依赖信息的展示页面                |
| mvn package | 打包项目，生成 war / jar 文件                 |
| mvn install | 打包后上传到 maven 本地仓库(本地部署)         |
| mvn deploy  | 只打包，上传到 maven 私服仓库(私服部署)       |

**构建命令周期:**

构建生命周期可以理解成是一组固定构建命令的有序集合，触发周期后的命令，会自动触发周期前的命令！也是一种简化构建的思路!

- 清理周期：主要是对项目编译生成文件进行清理

  包含命令：clean

- 默认周期：定义了真正构件时所需要执行的所有步骤，它是生命周期中最核心的部分

  包含命令：compile - test - package - install / deploy

- 报告周期

  包含命令：site

  打包: mvn clean package 本地仓库: mvn clean install

**最佳使用方案:**

```纯文本
打包: mvn clean package
重新编译: mvn clean compile
本地部署: mvn clean install
```

## Maven 继承

**继承作用**

作用：在父工程中统一管理项目中的依赖信息,进行统一版本管理!

它的背景是：

- 对一个比较大型的项目进行了模块拆分。
- 一个 project 下面，创建了很多个 module。
- 每一个 module 都需要配置自己的依赖信息。
  它背后的需求是：
- 多个模块要使用同一个框架，它们应该是同一个版本，所以整个项目中使用的框架版本需要统一管理。
- 使用框架时所需要的 jar 包组合（或者说依赖信息组合）需要经过长期摸索和反复调试，最终确定一个可用组合。这个耗费很大精力总结出来的方案不应该在新的项目中重新摸索。
  通过在父工程中为整个项目维护依赖信息的组合既保证了整个项目使用规范、准确的 jar 包；又能够将以往的经验沉淀下来，节约时间和精力。

**父工程**

```xml
<groupId>com.atguigu.maven</groupId>
<artifactId>pro03-maven-parent</artifactId>
<version>1.0-SNAPSHOT</version>
<!-- 当前工程作为父工程，它要去管理子工程，所以打包方式必须是 pom -->
<packaging>pom</packaging>

<!-- 使用dependencyManagement标签配置对依赖的管理 -->
<!-- 被管理的依赖并没有真正被引入到工程 -->
<dependencyManagement>
  <dependencies>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-beans</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-expression</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aop</artifactId>
      <version>4.0.0.RELEASE</version>
    </dependency>
  </dependencies>
</dependencyManagement>
```

**子工程**

```xml
<!-- 子工程引用父工程中的依赖信息时，可以把版本号去掉。  -->
<!-- 把版本号去掉就表示子工程中这个依赖的版本由父工程决定。 -->
<!-- 具体来说是由父工程的dependencyManagement来决定。 -->
<dependencies>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-core</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-beans</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-expression</artifactId>
  </dependency>
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
  </dependency>
</dependencies>
```

## Maven 聚合

1. 聚合概念

   Maven 聚合是指将多个项目组织到一个父级项目中，通过触发父工程的构建,统一按顺序触发子工程构建的过程!!

2. 聚合作用

   1. 统一管理子项目构建：通过聚合，可以将多个子项目组织在一起，方便管理和维护。
   2. 优化构建顺序：通过聚合，可以对多个项目进行顺序控制，避免出现构建依赖混乱导致构建失败的情况。

3. 聚合语法

   父项目中包含的子项目列表。

```xml
<project>
  <groupId>com.example</groupId>
  <artifactId>parent-project</artifactId>
  <packaging>pom</packaging>
  <version>1.0.0</version>
  <modules>
    <module>child-project1</module>
    <module>child-project2</module>
  </modules>
</project>
```
