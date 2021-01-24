# Cookie

有关 Cookie 安全的问题

有关 [SameSite](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite) 问题

## SameSite

三个属性：

- `Strict` (严格)

- `Lax` (松懈)

- `None` (无)

### `Strict`

将完全禁止第三方 `Cookie`，跨站点时候，不会发送 `Cookie`，只有当前网页 URL 与请求目标一致时才会带上 `Cookie`。

也就是 **`同站检查`** 的意思。

```
Set-cookie:CookieName=CookieValue; SameSite=Strict
```

这个 `Strict` 过于严格，导致很多子链接跳转都被不带 `cookie`

### `Lax`

大多数是否，不发送第三方 `Cookie`，除了导航到目标网站的 `Get` 请求。

```
 Set-cookie: CName=CValue; SameSite=Lax
```

导航到目标的 `Get` 请求，有三种情况，a 链接，预加载，get 表单。

| 请求类型   | 实例                                       | 正常情况 | Lax      |
| ---------- | ------------------------------------------ | -------- | -------- |
| a 标签连接 | `<a href="">...</a>`                       | 发送     | 发送     |
| 预加载     | `<link rel="prefetch" href="">/`           | 发送     | 发送     |
| GET 表单   | `from method="GET" actions="">...</from>`  | 发送     | 发送     |
| POST 表单  | `from method="POST" actions="">...</from>` | 发送     | 不发送   |
| iframe     | `<iframe src=""></iframe>`                 | 发送     | 不发送   |
| AJAX       | `$.get(...)`                               | 发送     | 不发送   |
| Image      | `<img src=""`                              | 发送     | 不发送   |
| Svg        | `<svg src=""`                              | （未知） | （未知） |

`Lax` 或 `Strict` 基本杜绝 `CSRF` 攻击

### None

无效设置

```
Set-Cookie: name=123;SameSite=None
```

有效的设置，即 Cookie 只能通过 HTTPS 协议发送。

```
Set-Cookie: name=123;SameSite=None;Secure
```

## 引用

- [阮一峰：Cookie 的 SameSite 属性](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
