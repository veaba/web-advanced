# CSRF

Cross site request forgery (跨站请求伪造)。

例如，登录微博账号后，copy 某个 xhr 请求的 `curl`，丢到控制台或是复制所有 cookie 之类的数据丢到 `Postman` 中，这就是跨站请求伪造 (`CSRF`)。

第三方引导发出的 `cookie`，称为第三方 `cookie`，可用于 `CSRF` 攻击，还可以用于用户追踪等营销行为

## 例子

1. facebook 在第三方网站插入一张看不见的图片

```html
<img src="facebook.com" style="visibility:hidden" />
```

这时候访问这个图片，就会带上 cookie，facebook 知道你的 `ip` 等等数据

## 原理

大多数情况下，被第三方网站或者 `js` 脚本获取到 `cookie`，所以防御的手段之一就是防止 `cookie` 被获取。

## 防御

### 敏感信息都是用 `POST`

- 就算是 copy 参数也很多，步骤比 get 还多
- 如果网站存在 `xss` 漏洞，都很费劲

比如构造一个 `from` 表单

```html
<from id="foo" action="/api/" method="POST">
  <input type="text" value="name" />
</from>
<script>
  document.forms('foo')[0].submit();
</script>
```

在 console 执行 script 部分代码，如果有 from，会直接跳到百度 (或许与 Chrome) 设置默认引擎有关系。

尝试在 firefox 中打开阮老师 blog，会网页提示：`留言提交失败。原因：Invalid request`

### 将 Cookie 设置为 `HttpOnly`

对应 header 是：`Set-Cookie: hello=world;httponly`

- `JavaScript` 脚本将无法读取 `cookie` 信息

### 将 Cookie 设置为 `SameHttp`

### 增加 token

原理：增加攻击者所不能伪造的信息，且不中存在于 `cookie` 中，重点是 `token` 的保密性、随机性。

- 比如放在 `Token-Csrf: abcdef`

- token 服务端生成，有一定的有效期

::: info
但这种方式，实际上，也躲不过直接复制信息到 `postman`
:::

### 根据 `referer` 判断

- 用于验证发起请求是否是合法的网站
