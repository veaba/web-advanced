# V8 垃圾回收机制

## keyword

- `堆`
- `栈`
- `基本类型`
- `引用类型`
- `新生代`
- `老生代`
- `生存时间长`
- `生存时间短`
- `Scavenge`
- `Mark sweep & Mark Compact`
- `from-space`
- `to-space`
- `root set`
- `对象可达性`
- `标记阶段`
- `清理阶段`
- `内存碎片`
- `全停顿`
- `Stop The World`
- `Orinoco`
- `Incremental marking`
- `增量标记`
- `lazy  sweeping`
- `懒性清理`
- `Concurrent`
- `并发`
- `并行`
- `Parallel`
- `副垃圾回收器`
- `主垃圾回收器`
- ``

## 引用

- [深入理解 Chrome V8 垃圾回收机制](https://juejin.cn/post/6876638765025067015)

## 基本类型和引用类型在内存中

```
+------------+          +--------------+
|    栈      |   ----   |     堆        |
+------------+          +--------------+
```
