import{_ as a,c as s,o as e,aa as p}from"./chunks/framework.qnqjiyko.js";const h=JSON.parse('{"title":"Nginx","description":"","frontmatter":{"sidebar":"auto"},"headers":[],"relativePath":"backend/nginx/index.md","filePath":"backend/nginx/index.md"}'),i={name:"backend/nginx/index.md"};function l(t,n,o,c,r,u){return e(),s("div",null,n[0]||(n[0]=[p(`<h1 id="nginx" tabindex="-1">Nginx <a class="header-anchor" href="#nginx" aria-label="Permalink to &quot;Nginx&quot;">​</a></h1><blockquote><p><a href="https://blog.csdn.net/tsummerb/article/details/79248015" target="_blank" rel="noreferrer">https://blog.csdn.net/tsummerb/article/details/79248015</a> 对 nginx 正向、反向带来写的比较好的文章</p></blockquote><h2 id="nginx-的正向代理" tabindex="-1">nginx 的正向代理？ <a class="header-anchor" href="#nginx-的正向代理" aria-label="Permalink to &quot;nginx 的正向代理？&quot;">​</a></h2><blockquote><p>我忘记是 2018 年在哪一家公司面试了，面试官问我，你知道什么是 nginx 正向代理？我楞了下，说不知道，后面想一直知道这个知识点。直到我直到这个知识点后，傻楞了，我一个前端知道个锤子 nginx 正向代理啊，我去！算了，本着学习的心态，不想回忆起这个沙雕面试官了。</p></blockquote><ul><li>正向代理最大的特点是客户端非常明确要访问的服务器地址；服务器只清楚请求来自哪个代理服务器，而不清楚来自哪个具体的客户端；正向代理模式屏蔽或者隐藏了真实客户端信息。</li><li>内网服务主动要求请求外网的地址服务，内网服务-&gt;访问-&gt;外网。((⊙_⊙)？，所以我 ssh 到服务器 curl 百度，也算了)</li><li>(<code>应该可以本来按着a 页面返回给用户，结果我让百度页面返回给用户？恩？</code>)</li><li>以通过代理软件访问 facebook 这样的例子，比较形象</li></ul><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  server{</span></span>
<span class="line"><span>    resolver 8.8.8.8</span></span>
<span class="line"><span>  }</span></span></code></pre></div><h2 id="nginx-的反向代理" tabindex="-1">nginx 的反向代理？ <a class="header-anchor" href="#nginx-的反向代理" aria-label="Permalink to &quot;nginx 的反向代理？&quot;">​</a></h2><ul><li>proxy_pass</li><li>upstream</li><li>外网主动请求内网服务，外网-&gt;请求-&gt;内网服务</li><li>请求的来源也就是客户端是明确的，但是请求具体由哪台服务器处理的并不明确了，nginx 扮演的就是一个反向代理角色</li><li>用户去访问淘宝，但返回给用户的内容的服务器，可能来自浙江，可能来自北京</li></ul><h2 id="nginx-负载均衡" tabindex="-1">nginx 负载均衡 <a class="header-anchor" href="#nginx-负载均衡" aria-label="Permalink to &quot;nginx 负载均衡&quot;">​</a></h2><ul><li><p>硬件负载均衡</p></li><li><p>软件负载均衡</p><blockquote><p>与硬件主机实现一种消息队列分发机智</p></blockquote></li><li><p>负载均衡调度算法</p><ul><li>weight 轮询 <blockquote><p>皇帝翻牌子比较形象了！可以设定一些权重，来增加获得宠幸的几率，被打入冷宫的 out 出局。。。</p></blockquote></li><li>ip_hash <blockquote><p>客户端 ip 的 hash 匹配，一个固定 ip 从会访问到同一个后端，一定程度解决了集群下，session 共享问题</p></blockquote></li><li>fair <blockquote><p>智能调整算法调度？动态的根据后端服务器的请求处理处理的响应时间，进行均衡的分配，响应时间短的，分配到的几率高，长的，分配的少！需要安装 upstream_fair 模块</p></blockquote></li><li>url_hash <blockquote><p>根据 url+hash 结果，每次请求的 url 都指定到后端固定服务器，nginx 作为静态服务器下，提高缓存效率。需要安装 hash 软件包</p></blockquote></li></ul></li></ul><h2 id="一段基于-vue-项目-nginx-配置文件" tabindex="-1">一段基于 vue 项目 nginx 配置文件 <a class="header-anchor" href="#一段基于-vue-项目-nginx-配置文件" aria-label="Permalink to &quot;一段基于 vue 项目 nginx 配置文件&quot;">​</a></h2><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  worker_processes  1;</span></span>
<span class="line"><span>  events {</span></span>
<span class="line"><span>      worker_connections  1024;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  http {</span></span>
<span class="line"><span>      include       mime.types;</span></span>
<span class="line"><span>      default_type  application/octet-stream;</span></span>
<span class="line"><span>      sendfile        on;</span></span>
<span class="line"><span>      keepalive_timeout  65;</span></span>
<span class="line"><span>      server {</span></span>
<span class="line"><span>          listen       80;</span></span>
<span class="line"><span>          server_name  localhost;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      location / {</span></span>
<span class="line"><span>              root   F:\\baidu\\dist;</span></span>
<span class="line"><span>              try_files $uri $uri/ @router;</span></span>
<span class="line"><span>              index  index.html;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      location @router {</span></span>
<span class="line"><span>              rewrite ^.*$ /index.html last;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      location ^~/api/{</span></span>
<span class="line"><span>        proxy_pass http://www.baidu.com/;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="一段基于-nuxt-项目的-nginx-配置文件" tabindex="-1">一段基于 nuxt 项目的 nginx 配置文件 <a class="header-anchor" href="#一段基于-nuxt-项目的-nginx-配置文件" aria-label="Permalink to &quot;一段基于 nuxt 项目的 nginx 配置文件&quot;">​</a></h2>`,13)]))}const x=a(i,[["render",l]]);export{h as __pageData,x as default};
