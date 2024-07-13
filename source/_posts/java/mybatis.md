---
title: Mybatis
categories: Java
tags: Spring
cover: /img/post/mybatis.png
abbrlink: 51cloiu
date: 2023-11-05 22:25:00
updated: 2023-11-05 22:25:00
---

## 快速入门

**准备数据模型**

```
CREATE DATABASE `mybatis-example`;

USE `mybatis-example`;

CREATE TABLE `t_emp`(
  emp_id INT AUTO_INCREMENT,
  emp_name CHAR(100),
  emp_salary DOUBLE(10,5),
  PRIMARY KEY(emp_id)
);

INSERT INTO `t_emp`(emp_name,emp_salary) VALUES("tom",200.33);
INSERT INTO `t_emp`(emp_name,emp_salary) VALUES("jerry",666.66);
INSERT INTO `t_emp`(emp_name,emp_salary) VALUES("andy",777.77);
```

**导入依赖**

```
<dependencies>
  <!-- mybatis依赖 -->
  <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.11</version>
  </dependency>

  <!-- MySQL驱动 mybatis底层依赖jdbc驱动实现,本次不需要导入连接池,mybatis自带! -->
  <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.25</version>
  </dependency>

  <!--junit5测试-->
  <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter-api</artifactId>
      <version>5.3.1</version>
  </dependency>
</dependencies>
```

**编写实体类**

```
public class Employee {

    private Integer empId;

    private String empName;

    private Double empSalary;

    //getter | setter
}
```

定义 mapper 接口\*\*\*\*

```
package com.cgdcgd.cc.mapper;

import com.cgdcgd.cc.demo.Employee;

public interface EmployeeMapper {
    Employee getEmployeeById(int id);
}
```

**定义 mapper.xml\*\***

位置： resources/mappers/EmployeeMapper.xml

- 方法名和 SQL 的 id 一致
- 方法返回值和 resultType 一致
- 方法的参数和 SQL 的参数一致
- 接口的全类名和映射配置文件的名称空间一致

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!-- namespace等于mapper接口类的全限定名,这样实现对应 -->
<mapper namespace="com.cgdcgd.cc.mapper.EmployeeMapper">

    <!-- 查询使用 select标签
            id = 方法名
            resultType = 返回值类型
            标签内编写SQL语句
     -->
    <select id="getEmployeeById" resultType="com.cgdcgd.cc.demo.Employee">
        <!--
        #{key} : 占位符 + 赋值 emp_id = ?  ? = id
        ${key} : 字符串拼接 "emp_id = " + id
        推荐使用 #{key} 防止sql注入
        当容器名、列名为动态时 使用${key}
        -->
        select emp_id empId,emp_name empName, emp_salary empSalary from
        t_emp where emp_id = #{empId}
    </select>
</mapper>
```

**MyBatis 配置文件**

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!-- environments表示配置Mybatis的开发环境，可以配置多个环境，在众多具体环境中，使用default属性指定实际运行时使用的环境。default属性的取值是environment标签的id属性的值。 -->
    <environments default="development">
        <!-- environment表示配置Mybatis的一个具体的环境 -->
        <environment id="development">
            <!-- Mybatis的内置的事务管理器 -->
            <transactionManager type="JDBC"/>
            <!-- 配置数据源 -->
            <dataSource type="POOLED">
                <!-- 建立数据库连接的具体信息 -->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis-example"/>
                <property name="username" value="root"/>
                <property name="password" value="xxbsxy"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!-- Mapper注册：指定Mybatis映射文件的具体位置 -->
        <!-- mapper标签：配置一个具体的Mapper映射文件 -->
        <!-- resource属性：指定Mapper映射文件的实际存储位置，这里需要使用一个以类路径根目录为基准的相对路径 -->
        <!--    对Maven工程的目录结构来说，resources目录下的内容会直接放入类路径，所以这里我们可以以resources目录为基准 -->
        <mapper resource="mappers/EmployeeMapper.xml"/>
    </mappers>

</configuration><?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!-- environments表示配置Mybatis的开发环境，可以配置多个环境，在众多具体环境中，使用default属性指定实际运行时使用的环境。default属性的取值是environment标签的id属性的值。 -->
    <environments default="development">
        <!-- environment表示配置Mybatis的一个具体的环境 -->
        <environment id="development">
            <!-- Mybatis的内置的事务管理器 -->
            <transactionManager type="JDBC"/>
            <!-- 配置数据源 -->
            <dataSource type="POOLED">
                <!-- 建立数据库连接的具体信息 -->
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis-example"/>
                <property name="username" value="root"/>
                <property name="password" value="xxbsxy"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <!-- Mapper注册：指定Mybatis映射文件的具体位置 -->
        <!-- mapper标签：配置一个具体的Mapper映射文件 -->
        <!-- resource属性：指定Mapper映射文件的实际存储位置，这里需要使用一个以类路径根目录为基准的相对路径 -->
        <!--    对Maven工程的目录结构来说，resources目录下的内容会直接放入类路径，所以这里我们可以以resources目录为基准 -->
        <mapper resource="mappers/EmployeeMapper.xml"/>
    </mappers>

</configuration>
```

**运行和测试**

```
public class test {

        @Test
        public void testSelectEmployee() throws IOException {

            // 1.创建SqlSessionFactory对象
            // ①声明Mybatis全局配置文件的路径
            String mybatisConfigFilePath = "mybatis-config.xml";

            // ②以输入流的形式加载Mybatis配置文件
            InputStream inputStream = Resources.getResourceAsStream(mybatisConfigFilePath);

            // ③基于读取Mybatis配置文件的输入流创建SqlSessionFactory对象
            SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(inputStream);

            // 2.使用SqlSessionFactory对象开启一个会话
            SqlSession session = sessionFactory.openSession();

            // 3.根据EmployeeMapper接口的Class对象获取Mapper接口类型的对象(动态代理技术)
            EmployeeMapper employeeMapper = session.getMapper(EmployeeMapper.class);

            // 4. 调用代理类方法既可以触发对应的SQL语句
            Employee employee = employeeMapper.getEmployeeById(1);

            System.out.println("employee = " + employee);

            // 4.关闭SqlSession
            session.commit(); //提交事务 [DQL不需要,其他需要]
            session.close(); //关闭会话

        }
}
```

## 数据输入

### 单个简单类型参数

单个简单类型参数，在#{}中可以随意命名，但是没有必要。通常还是使用和接口方法参数同名。

```
 public interface EmployeeMapper {
    Employee getEmployeeById(int id);
}

 <select id="getEmployeeById" resultType="com.cgdcgd.cc.demo.Employee">
    select emp_id empId,emp_name empName, emp_salary empSalary from
    t_emp where emp_id = #{abcd}
 </select>
```

### 传入单个实体对象

```
public interface EmployeeMapper {
    int insertEmployee(Employee employee);
}

    <insert id="insertEmployee">
        insert into t_emp (emp_name, emp_salary ) values (#{empName}, #{empSalary})
    </insert>
```

### 传入多个类型

```
//多个类型参数需要使用@Param注解指定名称
public interface EmployeeMapper {
     int updateEmployee(@Param("empId") Integer empId,@Param("empSalary") Double empSalary);
}

<update id="updateEmployee">
  update t_emp set emp_salary=#{empSalary} where emp_id=#{empId}
</update>
```

### 传入 Map 类型参数

```
//多个类型参数需要使用@Param注解指定名称
public interface EmployeeMapper {
     int updateEmployeeByMap(Map<String, Object> paramMap);
}

// 传入map的key即可
<update id="updateEmployeeByMap">
  update t_emp set emp_salary=#{empSalaryKey} where emp_id=#{empIdKey}
</update>
```

## 数据输出

### 输出单个简单类型

```
public interface EmployeeMapper {
    int selectEmpCount();
}

<select id="selectEmpCount" resultType="int">
  select count(*) from t_emp
</select>
```

select 标签，通过 resultType 指定查询返回值类型！

resultType = "全限定符 ｜ 别名 ｜ 如果是返回集合类型，写范型类型即可

类型别名可为 Java 类型设置一个缩写名字。 它仅用于 XML 配置，意在降低冗余的全限定类名书写。例如：

```xml
<typeAliases>
  <typeAlias alias="Author" type="domain.blog.Author"/>
  <typeAlias alias="Blog" type="domain.blog.Blog"/>
</typeAliases>
```

当这样配置时，`Blog` 可以用在任何使用 `domain.blog.Blog` 的地方。

也可以指定一个包名，MyBatis 会在包名下面搜索需要的 Java Bean，比如：

```xml
<typeAliases> <package name="domain.blog"/> </typeAliases>
```

每一个在包 `domain.blog` 中的 Java Bean，在没有注解的情况下，会使用 Bean 的首字母小写的非限定类名来作为它的别名。 比如 `domain.blog.Author` 的别名为 `author`；若有注解，则别名为其注解值。见下面的例子：

```java
@Alias("author")
public class Author {
    ...
}
```

下面是 Mybatis 为常见的 Java 类型内建的类型别名。它们都是不区分大小写的，注意，为了应对原始类型的命名重复，采取了特殊的命名风格。

| 别名                       | 映射的类型 |
| -------------------------- | ---------- |
| \_byte                     | byte       |
| \_char (since 3.5.10)      | char       |
| \_character (since 3.5.10) | char       |
| \_long                     | long       |
| \_short                    | short      |
| \_int                      | int        |
| \_integer                  | int        |
| \_double                   | double     |
| \_float                    | float      |
| \_boolean                  | boolean    |
| string                     | String     |
| byte                       | Byte       |
| char (since 3.5.10)        | Character  |
| character (since 3.5.10)   | Character  |
| long                       | Long       |
| short                      | Short      |
| int                        | Integer    |
| integer                    | Integer    |
| double                     | Double     |
| float                      | Float      |
| boolean                    | Boolean    |
| date                       | Date       |
| decimal                    | BigDecimal |
| bigdecimal                 | BigDecimal |
| biginteger                 | BigInteger |
| object                     | Object     |
| object\[]                  | Object\[]  |
| map                        | Map        |
| hashmap                    | HashMap    |
| list                       | List       |
| arraylist                  | ArrayList  |
| collection                 | Collection |

### 输出单个实体类型

```
public interface EmployeeMapper {
    Employee selectEmployee(Integer empId);
}

<select id="selectEmployee" resultType="com.cgdcgd.cc.demo.Employee">
    select emp_id empId,emp_name empName,emp_salary empSalary from t_emp where emp_id=#{id}
</select>
```

通过给数据库表字段加别名，让查询结果的每一列都和 Java 实体类中属性对应起来。

增加全局配置自动识别对应关系

在 Mybatis 全局配置文件中，做了下面的配置，select 语句中可以不给字段设置别名

```xml
<!-- 在全局范围内对Mybatis进行配置 -->
<settings>

  <!-- 具体配置 -->
  <!-- 从org.apache.ibatis.session.Configuration类中可以查看能使用的配置项 -->
  <!-- 将mapUnderscoreToCamelCase属性配置为true，表示开启自动映射驼峰式命名规则 -->
  <!-- 规则要求数据库表字段命名方式：单词_单词 -->
  <!-- 规则要求Java实体类属性名命名方式：首字母小写的驼峰式命名 -->
  <setting name="mapUnderscoreToCamelCase" value="true"/>

</settings>
```

### 输出 Map 类型

```
public interface EmployeeMapper {
    Map<String,Object> selectEmpNameAndMaxSalary();
}

<!-- Map<String,Object> selectEmpNameAndMaxSalary(); -->
<!-- 返回工资最高的员工的姓名和他的工资 -->
<select id="selectEmpNameAndMaxSalary" resultType="map">
  SELECT
    emp_name 员工姓名,
    emp_salary 员工工资,
    (SELECT AVG(emp_salary) FROM t_emp) 部门平均工资
  FROM t_emp WHERE emp_salary=(
    SELECT MAX(emp_salary) FROM t_emp
  )
</select>
```

### 输出 List 类型

```
public interface EmployeeMapper {
    List<Employee> selectAll();
}

// resultType为List的泛型参数 不需要写List
<select id="selectAll" resultType="com.atguigu.mybatis.entity.Employee">
  select emp_id empId,emp_name empName,emp_salary empSalary
  from t_emp
</select>
```

### 输出**自增长类型主键**

```
public interface EmployeeMapper {
  int insertEmployee(Employee employee);
}

<!-- int insertEmployee(Employee employee); -->
<!-- useGeneratedKeys属性字面意思就是“使用生成的主键” -->
<!-- keyProperty属性可以指定主键在实体类对象中对应的属性名，Mybatis会将拿到的主键值存入这个属性 -->
<insert id="insertEmployee" useGeneratedKeys="true" keyProperty="empId">
  insert into t_emp(emp_name,emp_salary)
  values(#{empName},#{empSalary})
</insert>
```

### 非自增长类型主键

1. 而对于不支持自增型主键的数据库（例如 Oracle）或者字符串类型主键，则可以使用 selectKey 子元素：selectKey 元素将会首先运行，id 会被设置，然后插入语句会被调用！

   使用 `selectKey` 帮助插入 UUID 作为字符串类型主键示例：

   ```xml
   <insert id="insertUser" parameterType="User">
       <selectKey keyProperty="id" resultType="java.lang.String"
           order="BEFORE">
           SELECT UUID() as id
       </selectKey>
       INSERT INTO user (id, username, password)
       VALUES (
           #{id},
           #{username},
           #{password}
       )
   </insert>

   ```

   在上例中，我们定义了一个 `insertUser` 的插入语句来将 `User` 对象插入到 `user` 表中。我们使用 `selectKey` 来查询 UUID 并设置到 `id` 字段中。

   通过 `keyProperty` 属性来指定查询到的 UUID 赋值给对象中的 `id` 属性，而 `resultType` 属性指定了 UUID 的类型为 `java.lang.String`。

   需要注意的是，我们将 `selectKey` 放在了插入语句的前面，这是因为 MySQL 在 `insert` 语句中只支持一个 `select` 子句，而 `selectKey` 中查询 UUID 的语句就是一个 `select` 子句，因此我们需要将其放在前面。

   最后，在将 `User` 对象插入到 `user` 表中时，我们直接使用对象中的 `id` 属性来插入主键值。

   使用这种方式，我们可以方便地插入 UUID 作为字符串类型主键。当然，还有其他插入方式可以使用，如使用 Java 代码生成 UUID 并在类中显式设置值等。需要根据具体应用场景和需求选择合适的插入方式。

## 多表映射

多表关系回顾：（双向查看）

- 一对一

  夫妻关系，人和身份证号

- 一对多| 多对一

  用户和用户的订单，锁和钥匙

- 多对多

  老师和学生，部门和员工
  实体类设计关系(查询)：（单向查看）

- 对一 ： 夫妻一方对应另一方，订单对应用户都是对一关系

  实体类设计：对一关系下，类中只要包含单个对方对象类型属性即可！

  例如：

  ```java
  public class Customer {

    private Integer customerId;
    private String customerName;

  }

  public class Order {

    private Integer orderId;
    private String orderName;
    private Customer customer;// 体现的是对一的关系

  }

  ```

- 对多: 用户对应的订单，讲师对应的学生或者学生对应的讲师都是对多关系：

  实体类设计：对多关系下，类中只要包含对方类型集合属性即可！

  ```java
  public class Customer {

    private Integer customerId;
    private String customerName;
    private List<Order> orderList;// 体现的是对多的关系
  }

  public class Order {

    private Integer orderId;
    private String orderName;
    private Customer customer;// 体现的是对一的关系

  }

  //查询客户和客户对应的订单集合  不要管!
  ```

  多表结果实体类设计小技巧：

- 对一，属性中包含对方对象

- 对多，属性中包含对方对象集合

- 只有真实发生多表查询时，才需要设计和修改实体类，否则不提前设计和修改实体类！

- 无论多少张表联查，实体类设计都是两两考虑!

- 在查询映射的时候，只需要关注本次查询相关的属性！例如：查询订单和对应的客户，就不要关注客户中的订单集合！

### 对一映射

```
  <!-- 创建resultMap实现“对一”关联关系映射 -->
    <!-- id属性：通常设置为这个resultMap所服务的那条SQL语句的id加上“ResultMap” -->
    <!-- type属性：要设置为这个resultMap所服务的那条SQL语句最终要返回的类型 -->
    <resultMap id="selectOrderWithCustomerResultMap" type="order">
        <!-- 先设置Order自身属性和字段的对应关系 -->
        <id column="order_id" property="orderId"/>
        <result column="order_name" property="orderName"/>
        <!-- 使用association标签配置“对一”关联关系 -->
        <!-- property属性：在Order类中对一的一端进行引用时使用的属性名 -->
        <!-- javaType属性：一的一端类的全类名 -->
        <association property="customer" javaType="customer">
            <!-- 配置Customer类的属性和字段名之间的对应关系 -->
            <id column="customer_id" property="customerId"/>
            <result column="customer_name" property="customerName"/>
        </association>
    </resultMap>

    <select id="selectOrderWithCustomer" resultMap="selectOrderWithCustomerResultMap">
        SELECT order_id,order_name,c.customer_id,customer_name
        FROM t_order o
        LEFT JOIN t_customer c
        ON o.customer_id=c.customer_id
        WHERE o.order_id=#{orderId}
    </select>
```

对应关系可以参考下图：

![](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img018.6c3cfc17.png)

### 对多映射

```
<!-- 配置resultMap实现从Customer到OrderList的“对多”关联关系 -->
<resultMap id="selectCustomerWithOrderListResultMap"

  type="customer">

  <!-- 映射Customer本身的属性 -->
  <id column="customer_id" property="customerId"/>

  <result column="customer_name" property="customerName"/>

  <!-- collection标签：映射“对多”的关联关系 -->
  <!-- property属性：在Customer类中，关联“多”的一端的属性名 -->
  <!-- ofType属性：集合属性中元素的类型 -->
  <collection property="orderList" ofType="order">

    <!-- 映射Order的属性 -->
    <id column="order_id" property="orderId"/>

    <result column="order_name" property="orderName"/>

  </collection>

</resultMap>

<!-- Customer selectCustomerWithOrderList(Integer customerId); -->
<select id="selectCustomerWithOrderList" resultMap="selectCustomerWithOrderListResultMap">
  SELECT c.customer_id,c.customer_name,o.order_id,o.order_name
  FROM t_customer c
  LEFT JOIN t_order o
  ON c.customer_id=o.customer_id
  WHERE c.customer_id=#{customerId}
</select>
```

对应关系可以参考下图：

![](http://heavy_code_industry.gitee.io/code_heavy_industry/assets/img/img019.dba418c1.png)

### 多表映射优化

| setting 属性        | 属性含义                                                                                                                                                              | 可选值              | 默认值  |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------- |
| autoMappingBehavior | 指定 MyBatis 应如何自动映射列到字段或属性。 NONE 表示关闭自动映射；PARTIAL 只会自动映射没有定义嵌套结果映射的字段。 FULL 会自动映射任何复杂的结果集（无论是否嵌套）。 | NONE, PARTIAL, FULL | PARTIAL |

我们可以将 autoMappingBehavior 设置为 full,进行多表 resultMap 映射的时候，可以省略符合列和属性命名映射规则（列名=属性名，或者开启驼峰映射也可以自定映射）的 result 标签！

修改 mybati-sconfig.xml:

```xml
<!--开启resultMap自动映射 -->
<setting name="autoMappingBehavior" value="FULL"/>
```

修改 teacherMapper.xml

```xml
<resultMap id="teacherMap" type="teacher">
    <id property="tId" column="t_id" />
    <!-- 开启自动映射,并且开启驼峰式支持!可以省略 result!-->
<!--        <result property="tName" column="t_name" />-->
    <collection property="students" ofType="student" >
        <id property="sId" column="s_id" />
<!--            <result property="sName" column="s_name" />-->
    </collection>
</resultMap>
```

### 多表映射总结

| 关联关系 | 配置项关键词                                 | 所在配置文件和具体位置               |
| -------- | -------------------------------------------- | ------------------------------------ |
| 对一     | association 标签/javaType 属性/property 属性 | Mapper 配置文件中的 resultMap 标签内 |
| 对多     | collection 标签/ofType 属性/property 属性    | Mapper 配置文件中的 resultMap 标签内 |

## 动态语句

### where 和 if 标签

```xml
<!-- List<Employee> selectEmployeeByCondition(Employee employee); -->
<select id="selectEmployeeByCondition" resultType="employee">
    select emp_id,emp_name,emp_salary from t_emp
    <!-- where标签会自动去掉“标签体内前面多余的and/or” -->
    <where>
        <!-- 使用if标签，让我们可以有选择的加入SQL语句的片段。这个SQL语句片段是否要加入整个SQL语句，就看if标签判断的结果是否为true -->
        <!-- 在if标签的test属性中，可以访问实体类的属性，不可以访问数据库表的字段 -->
        <if test="empName != null">
            <!-- 在if标签内部，需要访问接口的参数时还是正常写#{} -->
            or emp_name=#{empName}
        </if>
        <if test="empSalary &gt; 2000">
            or emp_salary>#{empSalary}
        </if>
        <!--
         第一种情况：所有条件都满足 WHERE emp_name=? or emp_salary>?
         第二种情况：部分条件满足 WHERE emp_salary>?
         第三种情况：所有条件都不满足 没有where子句
         -->
    </where>
</select>
```

### set 标签

```xml
<!-- void updateEmployeeDynamic(Employee employee) -->
<update id="updateEmployeeDynamic">
    update t_emp
    <!-- set emp_name=#{empName},emp_salary=#{empSalary} -->
    <!-- 使用set标签动态管理set子句，并且动态去掉两端多余的逗号 -->
    <set>
        <if test="empName != null">
            emp_name=#{empName},
        </if>
        <if test="empSalary &lt; 3000">
            emp_salary=#{empSalary},
        </if>
    </set>
    where emp_id=#{empId}
    <!--
         第一种情况：所有条件都满足 SET emp_name=?, emp_salary=?
         第二种情况：部分条件满足 SET emp_salary=?
         第三种情况：所有条件都不满足 update t_emp where emp_id=?
            没有set子句的update语句会导致SQL语法错误
     -->
</update>
```

### choose/when/otherwise 标签

在多个分支条件中，仅执行一个。

- 从上到下依次执行条件判断
- 遇到的第一个满足条件的分支会被采纳
- 被采纳分支后面的分支都将不被考虑
- 如果所有的 when 分支都不满足，那么就执行 otherwise 分支

```xml
<!-- List<Employee> selectEmployeeByConditionByChoose(Employee employee) -->
<select id="selectEmployeeByConditionByChoose" resultType="com.cgdcgd.mybatis.entity.Employee">
    select emp_id,emp_name,emp_salary from t_emp
    where
    <choose>
        <when test="empName != null">emp_name=#{empName}</when>
        <when test="empSalary &lt; 3000">emp_salary &lt; 3000</when>
        <otherwise>1=1</otherwise>
    </choose>

    <!--
     第一种情况：第一个when满足条件 where emp_name=?
     第二种情况：第二个when满足条件 where emp_salary < 3000
     第三种情况：两个when都不满足 where 1=1 执行了otherwise
     -->
</select>
```

### foreach 标签

**基本用法**

批量插入

```xml
<!--
    collection属性：要遍历的集合
    item属性：遍历集合的过程中能得到每一个具体对象，在item属性中设置一个名字，将来通过这个名字引用遍历出来的对象
    separator属性：指定当foreach标签的标签体重复拼接字符串时，各个标签体字符串之间的分隔符
    open属性：指定整个循环把字符串拼好后，字符串整体的前面要添加的字符串
    close属性：指定整个循环把字符串拼好后，字符串整体的后面要添加的字符串
    index属性：这里起一个名字，便于后面引用
        遍历List集合，这里能够得到List集合的索引值
        遍历Map集合，这里能够得到Map集合的key
 -->
<foreach collection="empList" item="emp" separator="," open="values" index="myIndex">
    <!-- 在foreach标签内部如果需要引用遍历得到的具体的一个对象，需要使用item属性声明的名称 -->
    (#{emp.empName},#{myIndex},#{emp.empSalary},#{emp.empGender})
</foreach>
```

**批量删除**

```
int deleteBatch(@Param("ids") List<Integer> ids)
<delete id="deleteBatch">
	delete from t_emp where id in
  <foreach collection="ids" item="id" separator="," open="(" close=")">
    #{id}
  </foreach>
</delete>

```

**批量更新时需要注意**

上面批量插入的例子本质上是一条 SQL 语句，而实现批量更新则需要多条 SQL 语句拼起来，用分号分开。也就是一次性发送多条 SQL 语句让数据库执行。此时需要在数据库连接信息的 URL 地址中设置：

```.properties
cgdcdg.dev.url=jdbc:mysql:///mybatis-example?allowMultiQueries=true
```

对应的 foreach 标签如下：

```xml
<!-- int updateEmployeeBatch(@Param("empList") List<Employee> empList) -->
<update id="updateEmployeeBatch">
    <foreach collection="empList" item="emp" separator=";">
        update t_emp set emp_name=#{emp.empName} where emp_id=#{emp.empId}
    </foreach>
</update>
```

**关于 foreach 标签的 collection 属性**

如果没有给接口中 List 类型的参数使用@Param 注解指定一个具体的名字，那么在 collection 属性中默认可以使用 collection 或 list 来引用这个 list 集合。这一点可以通过异常信息看出来：

```xml
Parameter 'empList' not found. Available parameters are [arg0, collection, list]
```

在实际开发中，为了避免隐晦的表达造成一定的误会，建议使用@Param 注解明确声明变量的名称，然后在 foreach 标签的 collection 属性中按照@Param 注解指定的名称来引用传入的参数。
