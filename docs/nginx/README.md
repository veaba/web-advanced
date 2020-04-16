# Nginx
> https://blog.csdn.net/tsummerb/article/details/79248015 对nginx 正向、反向带来写的比较好的文章
## nginx 的正向代理？
> 我忘记是2018年在哪一家公司面试了，面试官问我，你知道什么是nginx 正向代理？我楞了下，说不知道，后面想一直知道这个知识点。直到我直到这个知识点后，傻楞了，我一个前端知道个锤子nginx 正向代理啊，我去！ 算了，本着学习的心态，不想回忆起这个沙雕面试官了。
- 正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。
-  内网服务 主动要求请求外网的地址服务， 内网服务->访问->外网 。（(⊙_⊙)?，所以我ssh 到服务器 curl 百度 ，也算了）
- (`应该可以本来按着a 页面返回给用户，结果我让百度页面返回给用户？恩？`)
- 以 通过代理软件访问facebook 这样的例子，比较形象
```txt
  server{
    resolver 8.8.8.8
  }
```
## nginx 的反向代理？
- proxy_pass
- upstream
- 外网 主动请求内网服务， 外网->请求->内网服务
- 请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，nginx扮演的就是一个反向代理角色
- 用户去访问淘宝，但返回给用户的内容的服务器，可能来自浙江，可能来自北京
## nginx负载均衡
- 硬件负载均衡
- 软件负载均衡
> 与硬件主机实现一种消息队列分发机智

- 负载均衡调度算法
  - weight轮询
  > 皇帝翻牌子比较形象了！可以设定一些权重，来增加获得宠幸的几率，被打入冷宫的out 出局。。。
  - ip_hash
  > 客户端ip的hash匹配，一个固定ip从会访问到同一个后端，一定程度解决了集群下，session共享问题
  - fair
  > 智能调整算法调度？动态的 根据后端服务器的请求处理处理的响应时间，进行均衡的分配，响应时间短的，分配到的几率高，长的，分配的少！需要安装upstream_fair 模块
  - url_hash 
  > 根据url+hash 结果，每次请求的url都指定到后端固定服务器，nginx作为静态服务器下，提高缓存效率。需要安装hash 软件包
## 一段基于vue项目nginx 配置文件
```txt
{
  worker_processes  1;
  events {
      worker_connections  1024;
  }
  http {
      include       mime.types;
      default_type  application/octet-stream;
      sendfile        on;
      keepalive_timeout  65;
      server {
          listen       80;
          server_name  localhost;
        
      location / {
              root   F:\baidu\dist;
              try_files $uri $uri/ @router;
              index  index.html;
      }
    
      location @router {
              rewrite ^.*$ /index.html last;
      }
      location ^~/api/{
        proxy_pass http://www.baidu.com/;
        }
      }
  }
}

```
## 一段基于nuxt项目的nginx 配置文件
