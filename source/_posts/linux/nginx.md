---
title: Nginx基础
categories: Linux
tags: Linux
swiper_index: 22
abbrlink: 3f9245yh
cover: /img/post/nginx.png
date: 2024-03-03 17:00:00
updated: 2024-03-03 17:00:00
---

## 1. 常用命令

```
# 查看 Nginx 版本
nginx -v

# 检查 Nginx 配置语法
nginx -t

# 启动 Nginx 服务
systemctl start nginx 或 service nginx start

# 开机自启动
systemctl enable nginx 或 sudo service nginx enable

# 重启 Nginx 服务
systemctl restart nginx 或 service nginx restart

# 查看 Nginx 服务状态
systemctl status nginx 或 service nginx status

# 重载 Nginx 服务 重新加载配置文件
systemctl reload nginx 或 service nginx reload

# 停止 Nginx 服务
systemctl stop nginx 或 service nginx stop
```

## 2. 基本配置

```
# 允许进程数量，建议设置为cpu核心数或者auto自动检测，注意Windows服务器上虽然可以启动多个processes，但是实际只会用其中一个
worker_processes  auto;

events {
    #单个进程最大连接数（最大连接数=连接数*进程数）
    #根据硬件调整，和前面工作进程配合起来用，尽量大，但是别把cpu跑到100%就行。
    worker_connections  1024;
}


http {
	# 文件扩展名与文件类型映射表(是conf目录下的一个文件)
    include       /etc/nginx/mime.types;

    # 默认文件类型，如果mime.types预先定义的类型没匹配上，默认使用二进制流的方式传输
    default_type  application/octet-stream;

 # sendfile指令指定nginx是否调用sendfile 函数来输出文件，对于普通应用，必须设为on。如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络IO处理速度。
    sendfile        on;

	# 长连接超时时间，单位是秒
    keepalive_timeout  65;

# 虚拟主机的配置
    server {
    	# 监听端口
        listen 80;

		 # 域名，可以有多个，用空格隔开
        server_name  localhost;

		# 配置根目录以及默认页面
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }

		# 出错页面配置
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}

```

## 3. 负载均衡

### 3.1 基本配置

```
http {
    include  /etc/nginx/mime.types;

    default_type  application/octet-stream;

    sendfile  on;

    keepalive_timeout  65;

    #定义一组服务器 名称需要和proxy_pass配置的http后的名称相同
    upstream httpds{
        server 192.168.8.102 weight=2;
        server 192.168.8.103 weight=10;
        # server 192.168.8.102 weight=10 down; #down表示不参与负载均衡
        # server 192.168.8.102 weight=10 backup; #backup表示是备用服务器，没有服务器可用的时候使用
    }

    server {
        listen 80;

        server_name  localhost;

        location / {
        	# 反向代理配置
			proxy_pass http://httpds;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
}
```

### 3.2 负载均衡策略

#### 3.2.1 轮询模式

```
upstream httpds{
    server 192.168.8.102;
    server 192.168.8.103;
}
```

#### 3.2.2 权重模式

- weight 默认值为 1， 值越高，访问率越高
- down 表示不参与负载均衡
- backup 表示是备用服务器，没有服务器可用的时候使用

```
upstream httpds{
    server 192.168.8.102 weight=2 down;
    server 192.168.8.103 weight=10 backup;
}
```

#### 3.2.3 其他模式（很少使用）

**ip_hash 模式**

根据客户端的 ip 地址转发同一台服务器，可以保持会话，但是很少用这种方式去保持会话，例如我们当前正在使用 wifi 访问，当切换成手机信号访问时，会话就不保持了。

**least_conn 模式**

最少连接访问，优先访问连接最少的那一台服务器，这种方式也很少使用，因为连接少，可能是由于该服务器配置较低，刚开始赋予的权重较低。

**url_hash 模式（需要第三方插件）**

根据用户访问的 url 定向转发请求，不同的 url 转发到不同的服务器进行处理（定向流量转发）

**fair 模式（需要第三方插件）**

根据后端服务器响应时间转发请求，这种方式也很少使用，因为容易造成流量倾斜，给某一台服务器压垮。

## 4. 动静分离

动静分离可通过 location 对请求 url 进行匹配，将网站静态资源（HTML，JavaScript，CSS，img 等文件）与后台应用分开部署，提高用户访问静态代码的速度，降低对后台应用访问。通常将静态资源放到 nginx 中，动态资源转发到 tomcat 服务器中。

```
server {
    listen 80;

    server_name  localhost;

    location / {
        proxy_pass http://cgdcgd.cc;
    }

    location /images {
        root   /www/resources;
        index  index.html index.htm;
    }

    location /css {
        root   /www/resources;
        index  index.html index.htm;
    }

    location /js {
        root   /www/resources;
        index  index.html index.htm;
    }

    # 基于正则表达式
    location ~*/(js|css|img) {
        root   /www/resources;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```
