---
title: Docker基础
categories: Linux
tags: Linux
swiper_index: 10
abbrlink: 3f924cb1
cover: /img/post/docker.png
date: 2023-08-12 17:00:00
updated: 2024-02-29 17:00:00
sticky: 98
---

## 1. 帮助启动类命令

```dockerfile
# 启动docker
systemctl start docker

# 停止docker
systemctl stop docker

# 重启docker
systemctl restart docker

# 查看docker状态
systemctl status docker

# 开机启动：
systemctl enable docker

# 查看docker概要信息
docker info

# 查看docker总体帮助文档
docker --help

# 查看docker命令帮助文档
docker 具体命令 --help
```

## 2. 镜像命令

```dockerfile
# 查看docker镜像
docker images [options]  -a(列出本地所有镜像) -p(只显示镜像id)
# 查看指定名称镜像
docker images nginx

# 搜索docker镜像
docker search xxx [options] --limit(限制镜像数量)
docker search node  --limit 5 (搜索前五条node镜像)

# 下载docker镜像
docker pull node (下载最新版本node)
docker pull mysql:18.17.0 (下载指定版本node)

# 查看docker中镜像、容器、数据卷所占空间
docker system df

# 删除docker镜像
docker rmi -f hello-world (根据镜像名称删除)
docker rmi -f 9c7a54a9a43c (根据镜像id删除)
docker rmi -f 9c7a54a9a43c d9ad63743e72 (删除多个镜像)
docker rmi -f ${docker images -qa} (删除所有镜像)
```

## 3. 容器命令

### 3.1 新建并运行容器

```
# 命令格式
docker run [options] images [command] [arg...]
```

常用参数

| 参数   | 说明                                  |
| ------ | ------------------------------------- |
| --name | 为容器指定一个名称                    |
| -d     | 后台运行容器并返回容器 ID             |
| -i     | 以交互模式运行容器，通常与-t 同时使用 |
| -t     | 分配一个终端，通常与-i 同时使用       |
| -P     | 随机端口映射                          |
| -p     | 指定端口映射                          |

参考实例

```
# 新建并运行node容器 指定容器名称为docker-node 操作终端为bash
docker run -it --name docker-node node:18.17.0 /bin/bash

# 新建并运行mysql容器 在后台默默运行
docker run -itd mysql
```

### 3.2 查看正在运行容器

```
# 查看正在运行容器
docker ps [optongs]
```

常用参数

| 参数 | 说明                                  |
| ---- | ------------------------------------- |
| -a   | 列出正在运行的容器 + 历史运行过的容器 |
| -l   | 显示最近创建过的容器                  |
| -n   | 显示最近 n 个创建的容器               |
| -q   | 只显示容器编号                        |

### 3.3 退出、停止、启动容器

```
# 退出容器并关闭容器
exit

# 退出容器不关闭容器
按下ctrl + q + p

# 进入正在运行的容器
docker exec -it 9c7a54a9a43c /bin/bash (本质是打开一个新shell 再次使用exit退出时 容器不会停止)
docker attach 9c7a54a9a43c (使用exit退出时 容器会停止)

# 启动以停止容器
docker start docker-node (容器名称或id)

# 重启容器
docker restart docker-node (容器名称或id)

# 停止容器
docker stop docker-node (容器名称或id)

# 强制停止容器
docker kill docker-node (容器名称或id)
```

### 3.4 删除容器

```
# 删除已停止容器
docker rm docker-node (容器名称或id)

# 删除运行中容器
docker rm -f docker-node (容器名称或id)

# 删除所有容器
docker rm -f ${docker ps -aq}
```

### 3.5 其他命令

```
# 查看容器运行日志
docker log 9c7a54a9a43c (容器id)

# 查看容器内运行进程
docker top 9c7a54a9a43c (容器id)

# 查看容器内部细节
docker inspect 9c7a54a9a43c (容器id)

# 拷贝容器内的文件到主机 将容器内a.txt文件拷贝到主机
docker cp 9c7a54a9a43c:/tmp/a.txt /tmp/c.txt

# 导出容器 将指定容器导出为.tar文件
docker export ecb0f809e276 > node.tar

# 导入容器 将指定容器导出为.tar文件
cat [文件名].tar | docker import [镜像用户]/[镜像名]:[版本号]
cat node.tar | docker import - zs/node:6.6
```

### 3.6 commit 命令

```
# 安装一个ubuntu镜像
docker pull ubuntu

# docker安装的ubuntu镜像是不带有vim命令的 假如我们日后的项目中都需要使用vim命令
# 那么每次使用一个新项目都需要安装一次vim 所以为了方便我们在原来的基础上构建一个含vim命令的新镜像

# 新建并启动ubuntu容器 安装vim命令
docker run -it ubuntu /bin/bash
apt update
apt -y install vim

# commit命令提交一个副本形成新镜像
docker commit -m="描述信息" -a=“作者” 容器ID 要创建的镜像名:[标签]
docker commit -m="ubuntu-vim" -a=“aaa” 9ffcc080e573 ubuntu/vim:1.1
```

## 4. 本地镜像发布到阿里云镜像

```
# 登录阿里云Docker Registry
docker login --username=xxbsxy registry.cn-hangzhou.aliyuncs.com

# 从Registry中拉取镜像
docker pull registry.cn-hangzhou.aliyuncs.com/cgdcgd/text_docker:[镜像版本号]

# 将镜像推送到Registry
docker login --username=xxbsxy registry.cn-hangzhou.aliyuncs.com
docker tag [ImageId] registry.cn-hangzhou.aliyuncs.com/cgdcgd/text_docker:[镜像版本号]
docker push registry.cn-hangzhou.aliyuncs.com/cgdcgd/text_docker:[镜像版本号]
```

## 5. 容器卷

主要作用： 映射，将容器内的文件与主机内的文件关联，将容器内的数据备份 + 持久化到本地主机目录。即使删除容器，之前的数据不会丢失

### 5.1 Bind Mount 绑定(常用)

```
# 添加容器卷   (--privileged=ture为开放root权限)
docker run -it --privileged=true -v /宿主机绝对路径:/容器内路径 镜像名
docker run -it --privileged=true -v /tmp/host:/tmp/docker ubuntu

# 将容器内的设置为只读 默认为可读写rw ro为只读
docker run -it --privileged=true -v /tmp/host:/tmp/docker:ro ubuntu
```

### 5.2 具名绑定

具名绑定 当容器删除时或停止时容器卷不会删除

```
# 添加容器卷   (--privileged=ture为开放root权限)
docker run -it --privileged=true -v 容器卷名称:/容器内路径 镜像名
docker run -it --privileged=true -v ubuntu-volume:/tmp/docker ubuntu
```

### 5.3 匿名绑定

匿名绑定 当容器删除时容器卷也会删除

```
# 添加容器卷   (--privileged=ture为开放root权限)
docker run -it --privileged=true -v /容器内路径 镜像名
docker run -it --privileged=true -v /tmp/docker ubuntu
```

### 5.4 管理容器卷命令

```
# 查看容器卷相关命令
docker volume

# 查看所有容器卷
docker volume ls

# 查看单个容器卷
docker volume inspect [容器卷名称]

# 删除单个容器卷
docker volume rm [容器卷名称]

# 删除所有未使用容器卷
docker volume prune
```

## 6. Docker 网络

### 6.1 桥接模式

在主机中会创建一个 Docker0 的虚拟网桥，在 Docker0 创建一对虚拟网卡，有一半在主机上为 vethxxx，有一半在容器内为 eth0

![](/img/linux/1.png)

### 6.2 Host 模式

容器不在拥有网络空间，而是与主机共享一个网络，ip 就是主机对应的子网

![](/img/linux/2.png)

### 6.3 None 模式

容器与主机网络隔离，容器将不会被分配 ip、网卡等信息，与外部完全隔离

### 6.4 自定义网络模式（推荐）

通过 docker network create 命令可以创建自定义网络模式

```
docker network create custom_network
```

### 6.5 常用命令

```
# 查看网络相关命令
docker network

# 查看所有网络模式
docker network ls

# 查看单个网络
docker network inspect [网络名称]

# 删除单个网络
docker network rm [网络名称]

# 删除所有未使用网络
docker network prune

# 连接网络
docker network connect 网络名称 容器名称

# 断开网络
docker network disconnect 网络名称 容器名称
```

## 7. DockerFile

### 7.1 常见命令

```
# 1.指定基础镜像
FROM openjdk:8

# 2.指定镜像作者(可选)
MAINTAINER cgd<xxx.@163.com>

# 3.指定镜像描述信息(可选)
LABEL version="1.0"
LABEL xxx="xxx"

# 4.配置环境变量信息
ENV JAVA_EVN dev
ENV APP_NAME dev

# 5.构建镜像时需要执行的shell脚本
RUN ls -al
RUN mkadi /www/test

# 6.将主机的指定文件复制到容器的目标位置
ADD /etc/hosts /etc/hosts

# 7.设置容器中的工作目录，如果该目录不存在自动创建,并进入到该目录
WORKDIR /app
# 打印的目录时 /app
RUN pwd

# 8.绑定数据卷 将主机中的指定目录挂载到容器中
VOLUME /www/test/index.html

# 9.启动容器后要暴露的端口 并不会和主机关联
EXPOSE 8080/tcp

# 10.容器启动后默认执行的命令 CMD ENTRYPOINT选择其一
CMD ping 127.0.0.1 或者
ENTRYPOINT ping 127.0.0.1

# 11.设置动态值
ARG jdk=17
FROM openjdk:$jdk

# 12.设置操作用户 后续执行的命令由指定用户完成
USER test
```

### 7.2 SpringBoot 项目构建

1. 编写 DockerFile 文件

```
# 指定基础镜像
FROM openjdk:8

# 将项目拷贝到容器中
ADD *.jar app.jar

# 配置环境变量
ENV APP_OPES=""
ENV JVM_OPTS="-Xms128m -Xmx128m"

# 暴露端口
EXPOSE 8888

# 设置启动时命令
ENTRYPOINT ["sh","-c","java $JVM_OPTS -jar /app.jar $APP_OPES" ]
```

2. 构建镜像

```
docker build -t springbot-docker:1.0.0 ./
```

3. 构建容器

```
docker run -d -p 8888:8888 springbot-docker:1.0.0
```

### 7.3 JavaWeb 项目构建

1. 编写 DockerFile 文件

```
FROM tomcat:9.0

WORKDIR /user/local/tomcat/webapps

ADD *.war ROOT.war

ENTRYPOINT ["sh","-c","../bin/catalina.sh run" ]
```

2. 构建镜像

```
docker build -t javaweb:1.0.0 ./
```

3. 构建容器

```
docker run -d javaweb:1.0.0
```

## 8. DockerCompose

### 8.1 基础使用

```
# 命令行运行 docker run -it -d -name mynginx --restart=always --net xxx -v /www/index.html:/user/index.html -e APP_ENV=dev -nginx


# 创建docker-compose.yml文件
# 指定版本
version: "2.1"
services:
  nginx-demo:
    image: "nginx"
    restart: "always"
    networks:
      - net_demo
    volumes:
      - /www/index.html:/user/index.html
    environment:
      APP_ENV: dev
    ports
      - 80:80

networks:
  net_demo:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 192.168.3.40/16   # 指定子网
          gateway: 192.168.3.254   # 指定网关
```

### 8.2 常见命令

```
# 判断docker-compose.yml语法和书写是否正确
docker-compose config [docker-compose.yml文件所在路径 当前路径则不用指定]

# 查看服务
docker-compose ps

# 创建yml文件中单个服务
docker-compose create nginx_demo

# 创建yml文件所有服务
docker-compose create

# 运行yml文件中单个服务
docker-compose up -d nginx_demo

# 运行yml文件所有服务
docker-compose up -d

# 运行多个相同服务
docker-compose scale nginx_demo=3

# 查看日志
docker-compose logs

# 停止
docker-compose stop nginx_demo

# 启动
docker-compose start nginx_demo
```

## 9. 可视化工具安装

```
# 拉取portainer镜像
docker pull portainer/portainer-ce

# 启动镜像
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /dockerData/portainer:/data --restart=always --name portainer portainer/portainer-ce:latest
```

## 10. 安装 Docker

```
# 安装前更新系统
sudo apt update
# 安装 Docker 的依赖包
sudo apt install curl vim wget gnupg dpkg apt-transport-https lsb-release ca-certificates
# 添加清华 Docker 镜像源 GPG 密钥
curl -sS https://download.docker.com/linux/debian/gpg | gpg --dearmor > /usr/share/keyrings/docker-ce.gpg
# 添加清华 Docker 镜像源
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-ce.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu $(lsb_release -sc) stable" > /etc/apt/sources.list.d/docker.list
# 更新 apt 缓存
sudo apt update
# 安装 Docker
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
# 查看docker版本
sudo docker version
```
