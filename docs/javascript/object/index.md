## js 三大对象

[SegmentFault 查看更多，作者 Adrain`](https://segmentfault.com/a/1190000011467723)

## 本地对象

- 与宿主无关，独立于宿主环境的 ECMAScript 实现提供的对象
- ECMA-262 定义的类 (引用类型)
- 该类引用类型在运行过程中需要通过 new 创建所需的实例对象
- 包含 `Object`、`Array`、`Date`、`RegExp`、`Function`、`Boolean`、`Number`、`String` 等

## 宿主对象

- 由 ECMAScript 实现的宿主环境提供的对象，包含两个大类，一个是宿主提供，一个是自定义类对象
- 所有非本地对象都是宿主对象
- 嵌入网页的 js 来讲，宿主就是浏览器提供的对象，包括 `window` 和 `Document`
- 所有 DOM 和 BOM 对象都属于宿主对象

## 内置对象

- 与宿主无关，独立于宿主环境的 ECMAScript 实现提供的对象
- ECMAScript 程序开始执行前就存在，本身就是实例化内置对象，无需实例化
- 内置对象是本地对象的子集
- 包含 `Global` 和 `Math`
- ECMAScript 5 中新增了 `JSON` 这个存在于全局的内置对象
