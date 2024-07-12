---
title: RabbitMQ
categories: Java
tags: RabbitMQ
cover: /img/post/20.png
abbrlink: 51cleee
date: 2024-01-01 19:25:00
updated: 2024-01-01 19:25:00
---

## 安装

```
docker pull rabbitmq

docker run -d --hostname my-rabbit --name rabbit -p 15672:15672 -p 5672:5672 rabbitmq

docker exec -it 743be57d4a53 /bin/bash

rabbitmq-plugins enable rabbitmq_management

#测试 用户名和密码guest
http://47.98.243.65:15672
```

## 基本消息队列

**一个生产者一个消费者**

![](/img/java/mq/1.png)

### 生产者

#### 引入依赖

```
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

#### 编写 application.yml

```
spring:
  rabbitmq:
    host: 47.98.243.65
    port: 5672
    username: root
    password: 123456
    virtual-host: /
```

#### 编写测试方法

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessage() {
        String queueName = "text.queue";
        String message = "hello, world11111";
        rabbitTemplate.convertAndSend(queueName, message);
    }
}
```

### 消费者

#### 引入依赖

```
 <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

#### 编写 application.yml

```
spring:
  rabbitmq:
    host: 47.98.243.65
    port: 5672
    username: root
    password: 123456
    virtual-host: /
```

#### 编写监听类

```
@Component
public class SpringRabbitListener {
    @RabbitListener(queues = "text.queue")
    public void  listenTextQueue(String msg) {
        System.out.println("接收到消息" + msg);
    }
}
```

## **工作队列**

**一个生产者多个消费者**

![](/img/java/mq/2.png)

模拟 WorkQueue，实现一个队列绑定多个消费者

基本思路如下：

1.在 publisher 服务中定义测试方法，每秒产生 50 条消息，发送到 simple.queue

2.在 consumer 服务中定义两个消息监听者，都监听 simple.queue 队列

3.消费者 1 每秒处理 50 条消息，消费者 2 每秒处理 10 条消息

### 生产者

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessage() throws InterruptedException {
        String queueName = "text.queue";
        String message = "hello, world";
        for (int i = 1; i <= 50; i++) {
            rabbitTemplate.convertAndSend(queueName, message + i);
            Thread.sleep(20);
        }

    }
}
```

### 消费者

**application.yml**

```
logging:
  pattern:
    dateformat: MM-dd HH:mm:ss:SSS
spring:
  rabbitmq:
    host: 47.98.243.65
    port: 5672
    username: root
    password: 123456
    virtual-host: /
    listener:
      simple:
        prefetch: 1 #每次只能获取一条消息，处理完才能获取下一条消息

```

**监听类**

```
@Component
public class SpringRabbitListener {
    @RabbitListener(queues = "text.queue")
    public void  listenTextQueue(String msg) throws InterruptedException {
        System.out.println("消费者2接收到消息" + msg + LocalTime.now());
        Thread.sleep(200);
    }

    @RabbitListener(queues = "text.queue")
    public void  listenTextQueue(String msg) throws InterruptedException {
        System.out.println("消费者1接收到消息" + msg + LocalTime.now());
        Thread.sleep(20);
    }
}
```

## 发布订阅 Fanout Exchange

![](/img/java/mq/3.png)

实现思路如下：

1.在 consumer 服务中，利用代码声明队列、交换机，并将两者绑定

2.在 consumer 服务中，编写两个消费者方法，分别监听 fanout.queue1 和 fanout.queue2

3.在 publisher 中编写测试方法，向 itcast.fanout 发送消息

### 绑定交换机

```
@Configuration
public class FanoutConfig {

    // 交换机
    @Bean
    public FanoutExchange fanoutExchange() {
        return new FanoutExchange("text.fanout");
    }
    // 队列1
    @Bean
    public Queue fanoutQueue1() {
        return new Queue("fanout.queue1");
    }
    // 队列2
    @Bean
    public Queue fanoutQueue2() {
        return new Queue("fanout.queue2");
    }

    // 绑定队列1到交换机
    @Bean
    public Binding fanoutBinding1(Queue fanoutQueue1, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(fanoutQueue1).to(fanoutExchange);
    }

    // 绑定队列2到交换机
    @Bean
    public Binding fanoutBinding2(Queue fanoutQueue2, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(fanoutQueue2).to(fanoutExchange);
    }
}
```

### 生产者

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessageToExchange() throws InterruptedException {
        // 交换机名称
        String exchangeName = "text.fanout";
        // 消息
        String message = "hello, world";
        // 发送消息
        rabbitTemplate.convertAndSend(exchangeName, "", message);
    }
}
```

### 消费者

```
@Component
public class SpringRabbitListener {
    @RabbitListener(queues = "fanout.queue1")
    public void  listenTextQueue1(String msg) throws InterruptedException {
        System.out.println("fanout.queue1接收到消息" + msg + LocalTime.now());
    }

    @RabbitListener(queues = "fanout.queue2")
    public void  listenTextQueue2(String msg) throws InterruptedException {
        System.out.println("fanout.queue2接收到消息" + msg + LocalTime.now());
    }
}
```

## 发布订阅 Direct Exchange

![](/img/java/mq/4.png)

Direct Exchange 会将接收到的消息根据规则路由到指定的 Queue，因此称为路由模式（routes）。

- 每一个 Queue 都与 Exchange 设置一个 BindingKey
- 发布者发送消息时，指定消息的 RoutingKey
- Exchange 将消息路由到 BindingKey 与消息 RoutingKey 一致的队列

实现思路如下：

1.利用@RabbitListener 声明 Exchange、Queue、RoutingKey

2.在 consumer 服务中，编写两个消费者方法，分别监听 direct.queue1 和 direct.queue2

3.在 publisher 中编写测试方法，向 itcast. direct 发送消息

### 生产者

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessageToExchange() throws InterruptedException {
        // 交换机名称
        String exchangeName = "direct.fanout";
        // 消息
        String message = "hello, world";
        // 发送消息给指定key
        rabbitTemplate.convertAndSend(exchangeName, "red", message);
    }
}
```

### 消费者

```
@Component
public class SpringRabbitListener {
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "direct.queue1"),
            exchange = @Exchange(name = "direct.fanout",type = ExchangeTypes.DIRECT),
            key = {"red", "blue"}
    ))
    public void  listenTextQueue1(String msg) throws InterruptedException {
        System.out.println("direct.queue1接收到消息" + msg + LocalTime.now());
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "direct.queue2"),
            exchange = @Exchange(name = "direct.fanout",type = ExchangeTypes.DIRECT),
            key = {"red", "yellow"}
    ))
    public void  listenTextQueue2(String msg) throws InterruptedException {
        System.out.println("direct.queue2接收到消息" + msg + LocalTime.now());
    }

}
```

## 发布订阅 TopicExchange

![](/img/java/mq/5.png)

TopicExchange 与 DirectExchange 类似，区别在于 routingKey 可以是多个单词的列表，并且以 **.** 分割。

Queue 与 Exchange 指定 BindingKey 时可以使用通配符：

\#：代指 0 个或多个单词

\*：代指一个单词

- china.news 代表有中国的新闻消息；
- china.weather 代表中国的天气消息；
- japan.news 则代表日本新闻
- japan.weather 代表日本的天气消息；

### 生产者

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessageToExchange() throws InterruptedException {
        // 交换机名称
        String exchangeName = "topic.fanout";
        // 消息
        String message = "hello, world";
        // 发送消息给指定key
        rabbitTemplate.convertAndSend(exchangeName, "china.text", message);
    }
}
```

### 消费者

```
@Component
public class SpringRabbitListener {
    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue1"),
            exchange = @Exchange(name = "topic.fanout",type = ExchangeTypes.TOPIC),
            key = "china.#"
    ))
    public void  listenTextQueue1(String msg) throws InterruptedException {
        System.out.println("topic.queue1接收到消息" + msg + LocalTime.now());
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue(name = "topic.queue2"),
            exchange = @Exchange(name = "topic.fanout",type = ExchangeTypes.TOPIC),
            key = "news.#"
    ))
    public void  listenTextQueue2(String msg) throws InterruptedException {
        System.out.println("topic.queue2接收到消息" + msg + LocalTime.now());
    }
}
```

## **消息转换器**

Spring 的对消息对象的处理是由 org.springframework.amqp.support.converter.MessageConverter 来处理的。而默认实现是 SimpleMessageConverter，基于 JDK 的 ObjectOutputStream 完成序列化。

### 导入依赖

```
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
</dependency>
```

### 配置类

```
package com.cgdcgd.cc.config;

import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BaiscConfig {
    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}

```

### 生产者

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessageToExchange() throws InterruptedException {

        String queueName = "text.queue";

        Map<String, Integer> map = new HashMap<>();
        map.put("age", 1);
        map.put("num", 10);

        rabbitTemplate.convertAndSend(queueName,  map);
    }
}
```

### 消费者

```
@Component
public class SpringRabbitListener {
    @RabbitListener(queues = "text.queue")
    public void  listenTextQueue(Map<String,Integer> map)  {
        System.out.println("demo.queue接收到消息");
        map.forEach((k, v) -> {
            System.out.println(k + "-" + v);
        });
    }
}
```

## 消息可靠性问题

消息从生产者发送到 exchange，再到 queue，再到消费者，有哪些导致消息丢失的可能性？

- 发送时丢失：

  - 生产者发送的消息未送达 exchange
  - 消息到达 exchange 后未到达 queue

- lMQ 宕机，queue 将消息丢失
- consumer 接收到消息后未消费就宕机

### 生产者消息确认

RabbitMQ 提供了 publisher confirm 机制来避免消息发送到 MQ 过程中丢失。消息发送到 MQ 以后，会返回一个结果给发送者，表示消息是否处理成功。结果有两种请求：

- publisher-confirm，发送者确认
  - 消息成功投递到交换机，返回 ack
  - 消息未投递到交换机，返回 nack
- publisher-return，发送者回执
  - 消息投递到交换机了，但是没有路由到队列。返回 ACK，及路由失败原因。

**确认机制发送消息时，需要给每个消息设置一个全局唯一 id，以区分不同消息，避免 ack 冲突**

#### 配置文件

- publish-confirm-type：开启 publisher-confirm，这里支持两种类型：
  - simple：同步等待 confirm 结果，直到超时
  - correlated：异步回调，定义 ConfirmCallback，MQ 返回结果时会回调这个 ConfirmCallback
- publish-returns：开启 publish-return 功能，同样是基于 callback 机制，不过是定义 ReturnCallback
- template.mandatory：定义消息路由失败时的策略。true，则调用 ReturnCallback；false：则直接丢弃消息

```
spring:
  rabbitmq:
    host: 47.98.243.65
    port: 5672
    username: root
    password: 123456
    virtual-host: /
    publisher-confirm-type: correlated
    publisher-returns: true
    template:
      mandatory: true
```

**每个 RabbitTemplate 只能配置一个 ReturnCallback**，**因此需要在项目启动过程中配置**

#### 配置类

```
public class BaiscConfig  {
    @Resource
    private CachingConnectionFactory cachingConnectionFactory;

    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(cachingConnectionFactory);
        // 当mandatory设置为true时，若exchange根据自身类型和消息routingKey无法找到一个合适的queue存储消息，
        //那么broker会调用basic.return方法将消息返还给生产者。
        // 当mandatory设置为false时，出现上述情况broker会直接将消息丢弃。
        rabbitTemplate.setMandatory(true);

        /**
         * TODO RabbitMQ生产者发送消息确认回调，解决消息可靠性问题
         * 消息确认回调，确认消息是否到达broker
         * data：消息唯一标识
         * ack：确认结果
         * cause：失败原因
         */
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                //消息发送成功后，更新数据库消息状态等逻辑
                log.info("------生产者发送消息至exchange成功,消息唯一标识: {}, 确认状态: {}, 造成原因: {}-----",correlationData, ack, cause);
            } else {
                //信息发送失败，打印日志后，可以根据业务选择是否重发消息
                log.info("------生产者发送消息至exchange失败,消息唯一标识: {}, 确认状态: {}, 造成原因: {}-----", correlationData, ack, cause);
            }
        });

        /**
         * TODO RabbitMQ生产者发送消息失败回调，解决消息可靠性问题
         * message      消息
         * replyCode    回应码
         * replyText    回应信息
         * exchange     交换机
         * routingKey   路由键
         */
        rabbitTemplate.setReturnsCallback((res) -> {
            //若发送失败，打印错误信息，然后可以根据业务选择重发消息
            log.error("------exchange发送消息至queue失败,res: {}---------------");
        });
        return rabbitTemplate;
    }

}

```

#### 生产者

```
@SpringBootTest
public class Text {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @Test
    public void testSendMessageToExchange() throws InterruptedException {
        String exchangeName = "direct.fanout";
        String message = "hello, world1111111";
        // 消息ID
        CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
        // 发送消息给指定key
        rabbitTemplate.convertAndSend(exchangeName, "red", message, correlationData);
        Thread.sleep(2000);
    }
}
```

### 消费者消息确认

RabbitMQ 支持消费者确认机制，即：消费者处理消息后可以向 MQ 发送 ack 回执，MQ 收到 ack 回执后才会删除该消息。而 SpringAMQP 则允许配置三种确认模式：

- manual：手动 ack，需要在业务代码结束后，调用 api 发送 ack。
- auto：自动 ack，由 spring 监测 listener 代码是否出现异常，没有异常则返回 ack；抛出异常则返回 nack
- none：关闭 ack，MQ 假定消费者获取消息后会成功处理，因此消息投递后立即被删除

#### 配置文件

```
spring:
  rabbitmq:
    host: 47.98.243.65
    port: 5672
    username: root
    password: 123456
    virtual-host: /
    listener:
      simple:
        prefetch: 1 #每次只能获取一条消息，处理完才能获取下一条消息
        acknowledge-mode: auto
```

### 消费者失败重试

当消费者出现异常后，消息会不断 requeue（重新入队）到队列，再重新发送给消费者，然后再次异常，再次 requeue，无限循环，导致 mq 的消息处理飙升，带来不必要的压力：

我们可以利用 Spring 的 retry 机制，在消费者出现异常时利用本地重试，而不是无限制的 requeue 到 mq 队列。

#### 配置文件

```
spring:
  rabbitmq:
    host: 47.98.243.65
    port: 5672
    username: root
    password: 123456
    virtual-host: /
    listener:
      simple:
        prefetch: 1 #每次只能获取一条消息，处理完才能获取下一条消息
        acknowledge-mode: auto # none，关闭ack；manual，手动ack；auto：自动ack
        retry:
          enabled: true # 开启消费者失败重试
          initial-interval: 1000 # 初始的失败等待时长为1秒
          multiplier: 1 # 下次失败的等待时长倍数，下次等待时长 = multiplier * last-interval
          max-attempts: 3 # 最大重试次数
          stateless: true # true无状态；false有状态。如果业务中包含事务，这里改为false
```

### 失败消息处理策略

在开启重试模式后，重试次数耗尽，如果消息依然失败，则需要有 MessageRecoverer 接口来处理，它包含三种不同的实现：

- RejectAndDontRequeueRecoverer：重试耗尽后，直接 reject，丢弃消息。默认就是这种方式
- ImmediateRequeueMessageRecoverer：重试耗尽后，返回 nack，消息重新入队
- RepublishMessageRecoverer：重试耗尽后，将失败消息投递到指定的交换机

#### 配置类

```
@Configuration
public class ErrorMessageConfig {
    @Bean
    public MessageRecoverer republishMessageRecoverer(RabbitTemplate rabbitTemplate) {
        // 参数 交换机名称 交换机key
        return new RepublishMessageRecoverer(rabbitTemplate, "error.direct","error");
    }
}
```

## 死信交换机

当一个队列中的消息满足下列情况之一时，可以成为死信（dead letter）：

- 消费者使用basic.reject或 basic.nack声明消费失败，并且消息的requeue参数设置为false
- 消息是一个过期消息，超时无人消费
- 要投递的队列消息堆积满了，最早的消息可能成为死信

如果该队列配置了dead-letter-exchange属性，指定了一个交换机，那么队列中的死信就会投递到这个交换机中，而这个交换机称为死信交换机（Dead Letter Exchange，简称DLX）。

### TTL

TTL，也就是Time-To-Live。如果一个队列中的消息TTL结束仍未消费，则会变为死信，ttl超时分为两种情况：

- 消息所在的队列设置了存活时间
- 消息本身设置了存活时间

要给队列设置超时时间，需要在声明队列时配置x-message-ttl属性：

```java
@Bean
public Queue ttlQueue(){
    return QueueBuilder.durable("ttl.queue") // 指定队列名称，并持久化
        .ttl(10000) // 设置队列的超时时间，10秒
        .deadLetterExchange("dl.ttl.direct") // 指定死信交换机
        .build();
}
```

注意，这个队列设定了死信交换机为`dl.ttl.direct`

声明交换机，将ttl与交换机绑定：

```java
@Bean
public DirectExchange ttlExchange(){
    return new DirectExchange("ttl.direct");
}
@Bean
public Binding ttlBinding(){
    return BindingBuilder.bind(ttlQueue()).to(ttlExchange()).with("ttl");
}
```

发送消息，但是不要指定TTL：

```java
@Test
public void testTTLQueue() {
    // 创建消息
    String message = "hello, ttl queue";
    // 消息ID，需要封装到CorrelationData中
    CorrelationData correlationData = new CorrelationData(UUID.randomUUID().toString());
    // 发送消息
    rabbitTemplate.convertAndSend("ttl.direct", "ttl", message, correlationData);
    // 记录日志
    log.debug("发送消息成功");
}
```

### 延迟队列

利用TTL结合死信交换机，我们实现了消息发出后，消费者延迟收到消息的效果。这种消息模式就称为延迟队列（Delay Queue）模式。

延迟队列的使用场景包括：

- 延迟发送短信
- 用户下单，如果用户在15 分钟内未支付，则自动取消
- 预约工作会议，20分钟后自动通知所有参会人员

### 惰性队列

从RabbitMQ的3.6.0版本开始，就增加了Lazy Queues的概念，也就是惰性队列。

惰性队列的特征如下：

- 接收到消息后直接存入磁盘而非内存
- 消费者要消费消息时才会从磁盘中读取并加载到内存
- 支持数百万条的消息存储

```
   // 基于Bean
   @Bean
    public Queue ttlQueue(){
        return  QueueBuilder
                .durable("ttl.queue")
                .lazy()
                .build();
    }
    // 基于注解
        @RabbitListener(bindings = @QueueBinding(
        value = @Queue(name = "dl.queue", durable = "true"),
        exchange = @Exchange(name = "dl.direct"),
        key = "dl",
        arguments = @Argument(name = "x-queue-mode",value = "lazy")
      )
    )
```

