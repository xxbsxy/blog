---
title: Redis
categories: Java
tags: Redis
cover: /img/post/17.png
abbrlink: 51c234e
date: 2024-01-03 19:25:00
updated: 2024-01-04 19:25:00
---

## 安装

```
docker pull redis:7.0.12

docker run --restart=always \
-p 6379:6379 \
--name myredis \
-v /home/dj/redis/redis.conf:/etc/redis/redis.conf \
-v /home/dj/redis/data:/data \
-d redis:7.0.12 redis-server /etc/redis/redis.conf

docker exec -it 55a0b2d794ce /bin/bash

redis-cli
```

## 常用操作命令

| 命令             | 解释                                                          |
| ---------------- | ------------------------------------------------------------- |
| keys \*          | 查看当前库所有 key (匹配:keys \*1)                            |
| exists key       | 判断某个 key 是否存在                                         |
| type key         | 查看你的 key 是什么类型                                       |
| exists key       | 判断某个 key 是否存在                                         |
| del key          | 删除指定的可以数据                                            |
| unlink key       | 仅将 keys 从 keyspace 元数据中删除,真正的删除会在后续异步操作 |
| ttl key          | 查看还有多少秒过期,-1 表示永不过期,-2 表示已过期              |
| select[0, 15]    | 命令切换数据库                                                |
| move key dbindex | 将当前数据库的 key 移动到指定数据库中                         |
| dbsize           | 查看当前数据库的 key 的数量                                   |
| flushdb          | 清空当前库                                                    |
| flushall         | 通杀全部库                                                    |

## 数据类型

### String

- String 是 Redis 最基本的类型,一个 key 对应一个 value。
- String 类型是二进制安全的。意味着 Redis 的 string 可以包含任何数据。比如 jpg 图片或者序列化的对象
- String 类型是 Redis 最基本的数据类型,一个 Redis 中字符串 value 最多可以是 512M

#### set 语法

```
SET key value [NX | XX] [GET] [EX seconds | PX milliseconds |EXAT unix-time-seconds | PXAT unix-time-milliseconds | KEEPTTL]
```

1. `EX` seconds -- 设置指定的过期时间，以秒为单位（正整数）
2. `PX` 毫秒 -- 设置指定的过期时间，以毫秒为单位（正整数）。
3. `EXAT` timestamp-seconds -- 设置 key 过期的指定 Unix 时间，以秒为单位（正整数）。
4. `PXAT` timestamp-milliseconds -- 设置 key 过期的指定 Unix 时间，以毫秒为单位（正整数）。
5. `NX` -- 仅当 key 不存在时才设置该 key。
6. `XX` -- 仅设置已存在的 key。
7. `KEEPTTL` -- 保留 key 关联的生存时间。
8. `GET` -- 返回存储在 key 中的旧字符串，如果 key 不存在，则返回 nil。如果存储在键上的值不是字符串，则返回错误并 `SET` 中止错误。

```shell
# 基本使用
set k1 hello

# 重新设置值并返回上一次的值
set k1 hello1 get

# 已存在key 不会重新设置 返回nil
set k1 hello nx

# 存在key 重新赋值
set k1 hello nn

# 不存在key 不会设置 返回nil
set k2 hello nn

# 设置过期时间戳秒为单位
set k2 hello exat 1669278765

# 设置过期时间为10秒
set k2 hello ex 10

# 重新设置值并保留过期时间
set k2 hello1 keepttl

```

#### 其他命令

| 指令                           | 解释                                                                              |
| ------------------------------ | --------------------------------------------------------------------------------- |
| mset key1 value1 key2 value2   | 同时设置一个或多个 key-value 对                                                   |
| mget key1 key2 key3            | 同时获取一个或多个 value                                                          |
| msetnx key1 value1 key2 value2 | 同时设置一个或多个 key-value,当且仅当所有给定 key 都不存在,才会执行成功           |
| getrange key                   | 起始位置 结束位置 获得值的范围,类似 java 中的 substring,前包,后包                 |
| setrange key                   | 起始位置 value 用 value 覆写 key 所储存的字符串值,从起始位置开始(索引从 0 开始)。 |
| incr key                       | key 中储存的数字值增 1,只能对数字值操作,如果为空,新增值为 1                       |
| decr key                       | 将 key 中储存的数字值减 1,只能对数字值操作,如果为空,新增值为-1                    |
| incrby / decrby key            | 步长 将 key 中储存的数字值增减。自定义步长                                        |
| strlen key                     | 获得值的长度                                                                      |
| append key valu                | 将给定的 value 追加到原值的末尾                                                   |
| setnx key value                | 只有在 key 不存在时,设置 key 的值(分布式锁)                                       |
| setex key 过期时间 value       | 设置键值的同时,设置过期时间,单位秒                                                |
| getset key value               | 以新换旧,设置了新值同时获得旧值                                                   |

```shell
# 设置多个值
mset k1 text1 k2 text2 k3 100

# 获取多个值
mget k1 k2 k3

# 获得值的范围  tex
getrange k1 0 2

# 覆写key所储存的字符串值  tabcd
setrange k1 1 abcd

# 数字增加1 101
incr k3

# 数字增加指定值 201
incrby k3 100

# 获得值的长度 5
strlen k2

# 将给定的value 追加到原值的末尾 text2abc
append k2 abc
```

### List

- 列表 list 是一个单键多值的
- Redis 列表是简单的字符串列表,按照插入顺序排序。
- 你可以添加一个元素到列表的头部(左边)或者尾部(右边)
- 它的底层实际是个双向链表,对两端的操作性能很高,通过索引下标的操作中间的节点性能会较差

#### 常用命令

| 指令                                  | 解释                                             |
| ------------------------------------- | ------------------------------------------------ |
| lpush key value                       | 将元素加入列表左边                               |
| rpush key value                       | 将元素加入列表右边                               |
| del key                               | 删除 list                                        |
| lrange key start end(0 -1)            | 按照索引下标获得元素(从左到右)(0-1 表示获取所有) |
| lpop key                              | 删除列表最左边的元素,并将元素返回                |
| rpop key                              | 删除列表最右边的元素,并将元素返回                |
| rpoplpush key1 key2                   | 从 key1 列表右边吐出一个值,插到 key2 列表左边    |
| lrem key n value                      | 删除 n 个等于 value 的元素                       |
| lindex key index                      | 按照索引下标获得元素(从左到右)                   |
| llen key                              | 获得列表长度                                     |
| iset key index value                  | 给指定下标设置值                                 |
| linsert key before/after value value1 | 在 value 前/后插入新的值                         |

```
# 将元素加入列表左边
lpush list1 1 2 3 4 5 6

# 将元素加入列表右边
rpush list2 1 2 3 4 5 6

# 获得列表长度
llen list1

# 按照索引下标获得元素
lrange lis1 0 -1  # 6 5 4 3 2 1
lrange lis2 0 -1  # 1 2 3 4 5 6
lrange lis2 0 1  # 1 2

# 删除列表最左边的元素,并将元素返回
lpop list1

# 删除列表最右边的元素,并将元素返回
rpop list1

# 删除列表
del list1

# 删除3个等于2的元素
lpush list1 2 2 2 2 1 4 5
lrem list1 3 2
lrange list1 0 -1  # 2 1 4 5

# 给指定下标设置值
lpush list3 1 2 3
iset list3 0 hello
lrange list3 0 -1  # hello 2 3

# 在value前/后插入新的值
lpush list4 1 2 3
linsert list4 before 1 hello
lrange list4 0 -1  # hello 1 2 3
```

### Hash

#### 常用命令

| 指令                        | 解释                                                          |
| --------------------------- | ------------------------------------------------------------- |
| hset key field value        | 一次设置一个字段值                                            |
| hget key field              | 一次获取一个字段值                                            |
| hgetall key                 | 获取所有字段值                                                |
| hdel                        | 删除一个 key                                                  |
| hlen                        | 获取某个 key 内的全部数量                                     |
| hkeys key                   | 列出该 hash 集合的所有 field                                  |
| hvals key                   | 列出该 hash 集合的所有 value                                  |
| hexists key field           | 是否存在该字段                                                |
| hincrby key field increment | 为哈希表 key 中的域 field 的值加上增量 1 -1                   |
| hsetnx key field value      | 当 field 不存在时，将哈希表 key 中的域 field 的值设置为 value |

```
# 设置值
hset user:001 name jock age 18 address beijing

# 获取值
hget user:001 age
hget user:001 name

# 是否存在某个field
hexists user:001 age

# 增加或减少数量
hincrby user:001 age 5
hincrby user:001 age -2
```

### Set

set 是可以自动排重的,不允许元素重复

#### 常用命令

| 指令                           | 解释                                                                     |
| ------------------------------ | ------------------------------------------------------------------------ |
| sadd key value1 value2         | 将一个或多个 member 元素加入到集合 key 中,已经存在的 member 元素将被忽略 |
| smembers key                   | 取出该集合的所有值                                                       |
| srem key value1 value2         | 删除集合中的某个元素                                                     |
| sismember key value            | 判断集合 key 是否为含有该 value 值,有 1,没有 0                           |
| scard key                      | 返回该集合的元素个数                                                     |
| spop key                       | 随机从该集合中吐出一个值 ，会从集合中删除                                |
| srandmember key n              | 随机从该集合中取出 n 个值。不会从集合中删除                              |
| smove source destination value | 把集合中一个值从一个集合移动到另一个集合                                 |
| sinter key1 key2               | 返回两个集合的交集元素                                                   |
| sunion key1 key2               | 返回两个集合的并集元素                                                   |
| sdiff key1 key2                | 返回两个集合的差集元素(key1 中的,不包含 key2 中的)                       |

```
# 添加元素 1 2 3 4
sadd set1 1 2 3 4 4 4 4

# 遍历
smembers set1

# 删除
srem set1 1 2

# 是否存在某个值
sismember set1 1

# 元素个数
scard set1

# 把集合中一个值从一个集合移动到另一个集合
sadd set2 a b c
smove set1 set2 3
sismember set1 # 4
sismember set2 # a b c 3
```

### Zset

Redis 有序集合 zset 与普通集合 set 非常相似,是一个没有重复元素的字符串集合。不同之处是有序集合的每个成员都关联了一个评分(score),这个评分(score)被用来按照从最低分到最高分的方式排序集合中的成员。集合的成员是唯一的,但是评分可以是重复了

#### 常用命令

| 指令                                     | 解释                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| zadd key score1 value1 score2 value2…    | 将一个或多个 member 元素及其 score 值加入到有序集 key 当中                                     |
| zrange key start stop[WITHSCORES]        | 返回有序集 key 中,下标在 startstop 之间的元素 带 WITHSCORES,可以让分数一起和值返回到结果集     |
| zrem key value                           | 删除该集合下,指定值的元素                                                                      |
| zrangebyscore key min max[WITHSCORES]    | 返回有序集 key 中,所有 score 值介于 min 和 max 之间(包括等于 min 或 max)的成员。(从小到大排列) |
| zrevrangebyscore key max min[WITHSCORES] | 同上,改为从大到小排列                                                                          |
| zcard key                                | 获取元素数量                                                                                   |
| zscore key menber                        | 获取元素分数                                                                                   |
| zincrby key increment value              | 为元素的 score 加上增量                                                                        |
| zcount key min max                       | 统计该集合,分数区间内的元素个数                                                                |
| zrank key value                          | 返回该值在集合中的排名,从 0 开始                                                               |

```
# 添加
zadd zset1 60 z1 70 z2 80 z3

# 遍历
zrange zset1 0 -1

# 删除
zrem zset1 z1

# 获取元素分数
zscore zset1 z1

# 筛选分数为60-90之间
zrangebyscore zset1 60 90

# 筛选分数为60-90之间 不包含60 且只返回两个符合数据
zrangebyscore zset1 (60 90 limit 0 2
```

### Bitmap

#### 常用命令

| 指令                        | 解释                                               | 时间复杂度 |
| --------------------------- | -------------------------------------------------- | ---------- |
| setbit key offset value     | 给指定 key 值的第 offset 赋值                      | 0(1)       |
| strlen key                  | 返回占用字节大小                                   |            |
| getbit key offset           | 获取 key 值的第 offset 位                          | 0(1)       |
| bitcount ket start end      | 返回指定 key 中[start, end]中为 1 的数量           | 0(n)       |
| bitop operation destkey key | 对不同的二进制存储数据进行位运算（AND OR NOT XOR） | 0(n)       |

### HyperLogLog

作用

- 用户搜索网站关键词的数量
- 统计用户每天搜索不同词条个数
- 统计某个网站的 UV、统计某个文章的 UV

- 去重复统计功能的基数估计算法-就是 HyperLogLog

```
(全集)={2,4,6,8,77,39,4,8,10}
去掉重复的内容
基数={2,4,6,8,77,39,10} = 7
```

基数统计：用于统计一个集合中不重复的元素个数，就是对集合去重复后剩余元素的计算。

#### 常用命令

| 指令                                | 解释                          |
| ----------------------------------- | ----------------------------- |
| pfadd key element                   | 添加指定元素                  |
| pfcount key                         | 返回基础估算值                |
| pfmerge destkey sourcekey sourcekey | 将多个 HyperLogLog 合并为一个 |

```
# 添加指定元素
pfadd pf1 1 2 3 4 5 6 6 6

# 返回基础估算值 6
pfcount pf1

# 将多个HyperLogLog合并为一个
pfadd pf2 1 2 7 8 9
pfmerge pf3 pf2 pf1
pfcount pf3
```

### GEO

地理空间，用于存放经纬度

#### 常用命令

| 指令                                        | 解释                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------- |
| geoadd key longitude latitude member        | 多个经度(longitude)、纬度(latitude)、位置名称(member)添加到指定的 key 中  |
| geopos key member [member]                  | 从键里面返回所有指定名称(member )元素的位置（经度和纬度），不存在返回 nil |
| geohash key member [member]                 | 以 hash 加密的数据返回                                                    |
| geodist key member1 member2 [M\|KM\|FT\|MI] | 返回两个给定位置之间的距离 m-米 KM - 千米 FT - 英寸 MI - 英里             |

```
# 添加
geoadd city 116.403963 39.915119 "天安门" 116.403414 39.924091 "故宫" 116.024067 40.362639 "长城"

# 获取
geopos city 天安门 故宫 长城

# hash加密返回
geohash city 天安门 故宫 长城

# 返回两个给定位置之间的距离
geodist  city 天安门 故宫 km
```

## 持久化
