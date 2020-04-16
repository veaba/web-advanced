## BOM对象

### window对象
- 浏览器窗口
### location对象
> 是window 对象也是document对象。其中search不实用，需要改造函数来实现

>  可以去往这个对象增加新属性，但无法对原来的属性值作出随意变更赋值

|属性|方法|值|描述|
|----|----|----|----|
|ancestorOrigins||||
|hash||||
|hostname||`www.baidu.com`||
|href||`https://www.baidu.com/#dsad?dsd=dsd`||
|origin||`https://www.baidu.com`||
|pathname||`/`||
|protocol||`https`||
|search||||
||assign(url)||`生成一个location并跳转`|
||reload()|||
||replace()||`传递true，则强制刷新`|
||toString()|||
### Navigator对象
> 可以去往这个对象增加新属性，但无法对原来的属性值作出随意变更赋值。可以使用 `Object.defineProperty(navigator,'userAgent',{value:'xxoo'})` 来修改
- chrome 和firefox 参数都有自己的，相同的属性或者同属性的值挺少的。

- TODO 制作node去判断用户代理字段的特征值

- 红宝石书中有一段检查浏览器、厂商、平台、操作系统的完全代码

### Screen 对象
> 用处不大，表明客户端的能力，DPI之类 屏幕像素宽高等

### History 对象
> 无法得知浏览过的url，但可以通过实现前进和后退
- go(-)

|属性|方法|值|描述|
|----|-----|----|----|
||go(1)|整数|整数，前进，负数，后退|
||back()||等同于go(负数)|
||forward()||等同于go(正数)|
|length||整数，0就是第一个目标页面|表示历史记录有几条|
|||||

### 存储对象-seesionStorage 回话存储 localStorage 本地存储

|属性|方法|描述|实例|
|----|----|----|----|
|length||||
||key(n)|||
||getItem(keyname)|||
||setItem(keyname,value)|||
||removeItem(keyname)|||
||clear()|||
|||||
