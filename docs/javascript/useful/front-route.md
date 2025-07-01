# 前端路由

> API，利用两个 API 修改 URL，而不会引起页面的刷新

- 方式一 pushState ajax
  - history.pushState 增加一条新的记录
  - history.replaceState 替换当前的历史记录
- 方式二 hash+ajax
  - “#” 锚点，web 不会解析 hash，“#” 后面，web 服务会被自动忽略
  - js 可以通过 location.hash 读取，解析后可以实现响应不同的路径逻辑
  - hashchange 监听 hash 变化触发事件
