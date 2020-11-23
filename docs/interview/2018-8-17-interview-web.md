---
sidebar: auto
---

# 2018年8月17日的面试题

1. 你了解http吗？讲一些http吧
2. http 和 https 的区别
3. http 有哪些方法？

[MDN http定义的请求方法](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods)

 - head
    - 与get相似，没有响应体
    - 请求头，放置参数
  - get
    - 应用请求指定资源，用于获取数据
    - 请求头，放置参数
  - post 
    - 将实体提交到指定资源，状态或服务器的副作用更改，通俗讲，提交数据，或发送，并得到结果
    - 请求体，放置参数
  - put (放的意思)
    - 请求有效载荷替换目标资源的所有当前表示
    - 传输文件，自身不带验证机制
    - 更新资源，幂等（多次提交更新 结果都和一次执行的一样）。
    - 类似post
    - 请求体，放置参数
  - patch (补丁)
    - 对资源应用部分修改
  - `*`delete
    - 删除指定资源。
    - 请求参数放在哪？*
    - 很少出现
  - `*`connect (链接)
    - 建立一个到由目标资源标识到服务器的隧道
    - 请求链接转换到tcp/ip 通道
  - `*`trace (追踪)
    - 沿着目标资源的路径执行一个消息环回测试  
  - options
    - 返回服务器支持的http方法
    
4. get和post的区别

|操作|get|post|
|---|---|---|
|后退/刷新|无害|重复提交|
|编码类型|application/x-www-form-urlencoded|application/x-www-form-urlencoded/multipart/form-data/二进制|
|历史|参数保留在浏览器history里|参数不会保留|
|数据类型限制|ASCII字符|没有限制|
|安全性|与post相比，比较差，敏感信息不要用get|post比get安全，参数不保留的缘故，在客户端和服务端|
|可见性|所有人在url可见|在url中不可见

5. put 和post 的区别 
	
|操作|put|post|
|---|---|---|
|特性|幂等|非幂等|
|场景|更新资源，修改密码（因为提交参数不同，但结果一样，重复结果，多次不同请求的场景）|注册账号|
	
6. 讲一下IE下碰到的那些内存泄露问题<sub>#IE内存泄漏问题总结</sub>

`参考@3`

|泄露描述|解决方案|
|---|---|
|动态刷新||
|页面f5反复刷新，内存biubiu||
|退出变量占用内存的页面,内存依然无法回收||
|退出变量占用内存iframe,内存依然无法回收||
|span/td/js 变量||
|同作用域内，js对象引用dom对象，dom又引用同作用域内的js对象，将发生泄露||
|同作用域内，dom对象应用一个在函数内的闭包函数，如事件绑定，且闭包又引用上层对象||

7. 讲一下 碰到的兼容性问题
8. 讲下闭包
  - 原理
  - 应用场景
  - 如何解决闭包
9. 跨域问题
10. 布局问题，css 选择器有哪些?
11. 布局问题，css左右布局，如何让右边自适应，左边固定？
  - 垂直居中有哪几种方式？分别怎么实现
12. vue 响应式原理
  - defineprotoperty 的get 和set 分别做了什么？
      - get 依赖收集
        - 处理哪些订阅者去做响应式变化处理，
      - set 派发更新
        - 数据发送变化中触发setter逻辑，把依赖过程中订阅的所有观察者也就是watcher都触发update 过程，优化队列，在nextTick后执行素有watcher 的run
  - 观察者
13. 如何用原生js+css 选择
```html
<div>
  <div></div>
  <p></p><!-- css 选择这个，用js 选择这个-->
  <p></p> 
</div>

```     
14. 原型链

15. 前端缓存问题(这是那个脸红的妹纸问题的，其实她想问的是localstorage、和sessionstorage 和cookie的知识，但其实有多种)
比较，彼此之间的异同。
- Storage 存储
  - cookie
  - sessionStorage
  - localstorage
 - indexedDB还有这个

- cache 缓存
  - application Cache 我也说道这个
  - cache storage
16. setTimeout 设置执行时间，一定会执行吗？
  - 属于EventLoop部分的问题，假如栈里面没有其他任务的话，就会执行。
  - 先执行stack 的普通console之类的
  - 碰到setTimeout会放到 web Api中，交给浏览器的timer模块
  - 执行引起处理其他之后，才会回来执行timer
  - 基本流程如下：
    1. 同步任务
      - console 之类 主逻辑线
    2. 微任务
      - process.nextTick(node)
      - promise
      - mutataionObserver
    3. 宏任务
      - script 全局
      - setTimeout
      - setInterval
      - setImmedidate
      - I/O
      - UI渲染


17. setTimeout 会引起内存泄露吗？

```js
/*1 反复点击的代码~~*/
function leap(){
  var li = document.getElementsByClassName('li');
  console.log('li');
  for(var i=0;i<li.length;i++){
    li[i].onclick=function(){
      console.log('leap boooooooom')
    }
  }
}

/*2 避免乱用，以下代码可以保证不重复引用或者死循环*/
var test = function(){
		setTimeout(function(){
			test();
		},1000);
	};
	test();
```
## css 部分
<!-- todo -->
- 什么是标准盒子模型？
  - 即对doctype 定义时，默认是标准盒子模型，content不包含 padding + border
  - 总宽度：
  - 总高度：content
- 什么是IE盒子模型？
  - 即不对doctype定义时，是
  - 总高度：width = content
  - 总宽度：content + padding + border
- 如何将标准模型改为IE盒子模型？
  - box-sizing:content-box 采。用标准模型解析计算，默认的
  - box-sizing:border-box，采用怪异模型
- 如何实现垂直居中?
  - https://www.cnblogs.com/hutuzhu/p/4450850.html  稍后验证下这部分
- 如果加一个背景，会影响盒子模型的哪部分?

- absolute 和relative（仔细一看，突然了解了relative 的用法！！）
  - absolute 绝对定位，相对于static定位以外的第一个父元素定定位，如果没有，那会是html？有left top right bottom 值。会超越overflow
  - fixed 相对于窗口定位 类似absolute
  - relative 相对定位，相对于自身的基础位置进行定位，left、top、right、bottom相对于其正常位置定位，left: 20  则向元素left 位置添加20。【尽量避免用relative】
  - static，默认值，没有定位 忽略top left right bottom z-index
  - inherit 继承 




## js 部分

- js 基础类型与引用类型

> typeof 操作符区分 基本类型

> instanceof 操作符区分 引用类型


- 基本类型
什么叫堆内存？自己买菜做饭，就是堆，主动的
 - 有undefined、boolean、number、string、null。按值访问的意思。
 - 任何方法都无法改变基本类型的值，比如一个字符串

```js
var name ='Veaba';
name.toUpperCase();
console.log(name)/*Veaba ，说明无法改变原始变量里面的值 */ 
```

- 不能给基本类型添加属性和方法
- 基本类型的比较是值的比较，只有他们的值相同的比较，最好使用三等号符
- 基本类型的变量是存放在栈区，内存里面的栈内存（那堆呢？）
- 赋值不影响

- 引用类型
> 去菜馆吃饭，叫栈，被动

- 对象。属性和方法的集合
- 引用类型可以拥有属性和方法，属性又可以包含基本类型和引用类型
- 引用类型的值是可以变的。
- 引用类型的值是同时保存在栈内存和堆内存的对象
  - 操作对象的引用
  - 栈区内存保存变量和标识符 和 指向堆内存中该对象的指针(该对象在对内存的地址)
- 引用类型的比较是引用的比较。
- 赋值会影响指向同一个对象

- typeof null ？object
- typeof array？ object
- 如何判断array 的方法？
  - Array.prototype.isPrototypeOf(obj) 原型
    - Array.prototype.isPrototypeOf([])
    - Array.prototype.isPrototypeOf({})
  - obj instanceof Array 构造函数
    - 'ff' instanceof Array
    - [] instanceof Array
  - class 属性，跨原型链调用toString()
    - Object.prototype.toString.call([]) '[object Array]'
    - Object.prototype.toString.call({}) '[object Object]'
    - Object.prototype.toString.call(null) '[object Null]'
  - Array.isArray()//es6提供的
  
## js 的异步机制

- js 是单线程的

- 任务队列 和事件循环(queue、eventLoop)
- 定时器t
- 异步机制
- 总结

JavaScript单线程和其异步机制就如上所述。所谓的单线程并不孤单，它的背后有浏览器的其他线程为其服务，其异步也得靠其他线程来监听事件的响应，并将回调函数推入到任务队列等待执行。
单线程所做的就是执行栈中的同步任务，执行完毕后，再从任务队列中取出一个事件（没有事件的话，就等待事件），然后开始执行栈中相关的同步任务，不断的这样循环。

## 浏览器的100

- 101 webSocket  (size 0B)

## 浏览器的200状态的区别

- 灰色的 200  from disk cache（来自磁盘缓存），比如f5百度之后的，某个js，或者 (from memory cache) （使用该功能，必须在chrome里面 Network取消勾选Disable cache）
- 正常 200

## 了解chrome 控制台工具

- Elements 元素
- Console  控制台
- Sources  源
- Network 网络
- Performance 性能
- Memory内存
- Application 应用程序
- Security 安全
- Audits 审计/审查

## 浏览器的300状态

- 304 （意义：原来缓存的文档还可以使用）png document。依然会与服务器通信。如果cache-control:max-age>0 直接从浏览器提取。否则，向服务器发送http请求，确认该资源是否修改，有200，无修改304

## svg 与canvas

- svg 数量小，静态，不失真，dom绘制，类似图片，logo，简单
- canvas 数量大，密集，js绘制。像素级。可塑性高，可添加各类事件。处理处理重绘。效率高，复杂度高。

## base64 图片 与 src 引用图片

- base64 好处。小文件嵌入，不需要额外的请求。
- base64 坏处。浏览器不会缓存。

- 根据 base64AndSrcImage.html 测试结果来看
  - width 1200px 下
  - base 编译的代码 灰色200，从内存取缓存 from memory cache
  - src ，正常200，从网络取 /304 产生7ms

  - width 750px 下
  - base 编译的代码 灰色200，从内存取缓存 from memory cache
  - src，正常200.从网络取 /304 产生7ms

- 得出的结论是，base占用内存，速度快。
  - css 响应式，src 按需加载。base64


## css 有间隙

- 当使用inline-block  父级设置font-size:0
- 或者letter-spacing:0

## css lvhfa 记忆方法 ，倒叙记忆

## css 纯css 无法实现父选择器

- 目前的实验上去测试了，发现以往的记忆是JQuery来实现的，纯css 无法实现该效果

## 二叉树

- 特殊的二叉树，满二叉树。深入k且含有2^k - 1的节点，深度3，节点为2^3-1=7。满二叉树，一定是完全二叉树。
            ①
            ②        ③
          ④   ⑤    ⑥  ⑦
        ⑧ ⑨ ⑩ ⑪  ⑫ ⑫ ⑫ ⑫
- 完全二叉树。 最后一层左边是满的，右边可能满或不满，其余层是满的。
                ①
            ②       ③
          ④   ⑤    ⑥  ⑦
        ⑧ ⑨ ⑩ ⑪  ⑫
- 二叉树第i层最多有2^(i-1) 个节点，i>=1
- 二叉树 深度为k 最多有 2^k-1个节点kk>=1

- 遍历。 前序遍历(DLR)，D根L左R右。
- 遍历。 中序遍历(LDR)，L左D根R右
- 遍历。 后序遍历(LRD)，L左R右D根

## Number方法 （2018年4月10日 面试遇到该类型的题目，简直日了狗的难受）

- 原始值 NaN （not a number）
- 原始值 undefined
- 原始值 null
- 原始值 boolean
- 原始值 string
- 原始值 number

- 如果对象的值无法转为数字，则Number的函数返回NaN
- 加法有两种情况，数字与数字相加；字符串与字符串相加。
- 加法会触发三种类型转换，转换为原始值；转为数字；转为字符串
- 结论1、先两个两个操作数，转为原始值
- 结论2、如果存在一个任意字符串，则也将另外一个也转为字符串，然后返回两个字符串链接结果
- 结论3、否则将两个值转为数字类型，并返回和
- 结论4、任何数字与NaN 相加都是NaN

|toNumber|将值转为数字|
|----|----|
undefined   | NaN
null        | 0
boolean     | true/1 false/0
number      | 无需转换
string      | 由字符串解析为数组 '324' ->324
[]          | 0

|toString|将值转为数字|
|----|----|
undefined   | 'undefined'
null        | 'null'
boolean     | 'true'/'false'
number      | 数字转字符串
string      | 无需转换
function(){}| 'function(){}'

```js
console.info(1+1); //2 typeof number
console.info(1+'1'); // 11 typeof stirng
console.info('1'+1); // 11 typeof string
console.info(1+''); // '1'
console.info(''+1); // '1'
console.info(1+undefined); //NaN
console.info(''+undefined); //undefined
console.info(true+undefined); // NaN  Number(true)+Number(undefined)=NaN,String(true)+String(undefined)='trueundefined'
console.info(false+undefined); // NaN
console.info(''+true); // 'true'
console.info(' ' + true); // ' true'
console.info(''+false);//'false'
console.info(' '+false);//' false'
console.info(1+function (){}); //'1function(){}'
console.info(1+Object());//'1[object Object]'
console.info('' +Object()); // [object object]
console.info(1+Array()); // 1+Array().toString()=>1 +[].toString()
console.info(1+Array); //1 +Array.toString()= >1+function Array(){[native code]}
console.info(1+NaN); // NaN
console.info(''+NaN); //'NaN'
console.info('1'+NaN); //'1+NaN'
console.info(true+false); //1
console.info(true+true); //2
console.info(true+undefined); //NaN
console.info(true+NaN); //NaN
console.info(true+function(){}); //'truefunction(){}'

```



## replace 理解

```js
let string='22dda';
// $1   找到的
// $2   找到所在的索引
// $3   替换前的源码
string.replace('要替换的正则、字符等',function($1,$2,$3){
  return $2
});

'我是{{name}} ,年龄{{age}},性别{{sex}}'.replace(/\{{(.+?)\}}/g,function($1,$2,$3){
  console.info($1)
})
// {{name}}{{age}}{{sex}}
```

## sort 理解

- sort 数组元素排序，排序可以使字母或者数字，并按升续降序
- 默认是字母升序
- 【注意】：数字是按字母顺序排序时 40 在 5前面
- 【注意】：使用数字排序，必须通过一个函数作为参数调用
- 函数是指定数字是升序还是降序
- 会改变原始数组

语法

```js
let array=[];
array.sort(sortFunction); //可选，但排序顺序，必须是函数
function  sortFunction() {
  return Math.round(Math.random())?1:-1
}
// Math.round(0)// 0  四舍五入，向上取舍
// Math.round(0.49)// 0  
// Math.round(0.2)// 0
// Math.round(0.5)// 1
// 返回值
// Array 对数组的引用，数组在原数组进行排序，不生成副本
```

## 冒泡算法

- 有几种冒泡算法？
- 分别实现冒泡算法?

## typeof 常见类型

|typeof|值|
| ----- | ---- |
typeof null | "object"
typeof undefined|"undefined"
typeof [] |"object"
typeof [''] |"object"
typeof ['a']|"object"
typeof {} | "object"
typeof {a:['test']}|"object“
typeof NaN | "number"
typeof true | "boolean"
typeof false | "boolean"
typeof new Date()|"object"
typeof function(){alert('22')} |"function"
typeof console.info('tt')|"tt" "undefined"
typeof console|"object"
typeof 1|"number"
typeof '2'|"string"
typeof ''|"string"

## 用一行代码将[1,2,3,4]随机打乱

```js
[1,2,3,4].sort(function(){return  Math.round(Math.random())?1:-1})
```

## typeof null

```js
"object"
```



## let domList = document.querySelectorAll('div')，一句话将domlist转为数组

```js
Array.from(domList)
```

### 哪个http response header 不会影响浏览器缓存行为

a.cache-control   b.etag   c.age     d.last-modified

通用首部字段（请求头报文+响应报文）

- Cache-Control  控制缓存的行为
- Pragma http1.0 遗留，no-cache时禁用缓存

请求首部字段

- If-Match 比较ETag是否一致
- IF-None-Match 同上
- If-Modified-Since 比较资源最后更新的时间是否一致
- IF-Unmodified-Since 比较资源最后更新的时间是否一致

响应首部字段

- ETag 资源的匹配信息

实体首部字段

- Expires http1.0的遗留物，实体主体过期的时间
- Last-Modified 资源的最后一次修改时间

[详见 浅谈浏览器http 的缓存机制](https://www.cnblogs.com/vajoy/p/5341664.html)

## 合理的前端项目结构分层

## 挑选自己或者公司项目，遇到的问题、解决的思路简单阐述下



## 全面解析一个任意url的所有参数为object，注意边界条件

```js
var url = 'https://www.baidu.com/?user=admin&id=23&id=555&city=%E9%A2%9C%E8%89%B2&status=disabled';
var newUrl  = url.replace(/^.+(\?)/,'');
var url1 = newUrl.split('&');
var ob={}
var keys =[]
var values =[]
url1.map((item,index)=>{
  var temp=[];
  temp = item.split('=');
  keys.push(temp[0]);
  values.push(temp[1])
  if(ob[temp[0]]){
    ob[temp[0]]=[ob[temp[0]]].concat(temp[1]) //如果存在 则合并成为数组
  }else{
    ob[temp[0]]=decodeURIComponent(temp[1]);
  }
});
console.info(ob)
```

```js
ob={
  user:'admin',
  id:[23,555],//合并id相同的为数组
  city:'颜色', //中文编码
  enabled:true // 未指定的key约定值为true
}
```


## 实现一个最简单的模板渲染引擎

- 要点一 replace 的用法 

第一个替换的，第二回调函数，回调函数有三个参数，第一个要找到的，第二个找到的索引，第三个原先的字符

- 对象key 转数组

- 正则 从什么到任意的什么 `{{(.` `+?)}}` （左边这两个字符是连起来的，由于vuepress无法识别这个字符，导致build错误了，这里才暂时隔离开）

- 正则 这个或者那个 `{{|}}`

结果：我是姓名，年龄18，性别 undefined

```js 
let template='我是{{name}} ,年龄{{age}},性别{{sex}}'
let data ={
  name:'姓名',
  age:18,
}
function cover(template,data){
  let arr = Object.keys(data)
  let temp= template.replace(/\{{(.+?)\}}/g,function($1){
    for(let i=0;i<arr.length;i++){
      if($1.indexOf(arr[i])>-1){
        return $1.replace(arr[i],arr[i]).replace(/\{{|\}}/g,'')
      }
    }
  })
  return temp
}
cover(template,data)
```


## 字符串查找

使用最基本遍历实现查找字符串，并返回第一次出现的问题，找不到返回-1
 a='34'  b='1234567'  返回2
 a='35'  b='1234567'  返回-1
 a='355' b=''12354355 返回5

```js
 function compare(a,b){
  return b.indexof(a)
 }
 compare(a,b)
```

## 数据绑定基本实现

 [详见 MDN的 对象Object.defineProperty()方法的使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

- 问题一  Object.defineProperty(obj,key,options)的使用
- 其中 option 里面的选项以及主要的get 和set方法

```js
 {
	get:function name(){
      return '你要改变的值'
    }
    set:function value (value){
      //set会返回一个value
      //这个value就是变更后的值，怎么处理
      obj.key= value
    }
 }

```

- bind()。【与此同类似的需要懂 call bind apply】其次是使用函数时候，怎么给另外一个对象绑定this，因为此题目用到一个返回并返回这个this，的key值，这时候需要处理

```js
func.bind(obj)('你的参数'); // func 是函数，里面有this， obj 就是要操作的函数的那个
let obj={
  key_1:1,
  key_2:2
};
function func(key){
  console.info(key+'的值子发生变化'+this[key])
}
 bindData(obj,func);
 obj.key_1=2;//此时自动输出 变化为2
 obje.key_2=1; //此时自动输出变化为1

 let obj={
  key_1:1,
  key_2:2
 };
 function func(key){
  console.info(key+'的值子发生变化'+this[key])
 }

function bindData(obj,func){
  for(let item in obj){
    Object.defineProperty(obj,item,{
      get:function(){
        return obj.item;
      },
      set:function(value){
        obj.item=value;
        func.bind(obj)(item);
      }
    })
  }
}
bindData(obj,func);
obj.key_1=2;//此时自动输出 变化为2
obj.key_2=1 //此时自动输出变化为1

```

## 数据结构处理

输出有多个儿子的人的名字

```js
let data={
  name:'jack',
  child:[
    {name:'jack1'},
    {name:'jack2',child:[
      {name:'jack2_1',child:{name:'jack2-1-1'}},
      {name:'jack2_2'}
    ]},
    {name:'jack3',child:{name:'jack3-1'}}
  ]
}
```

## 程序题1

```js
for(var i=0;i<5;i++){
    setTimeout(function(){
      console.info(new Date,i)
    },1000)
};
console.info(new Date,i)
```

```js
function Person(name){
  this.name=name
}
var a =  Person('a');
var b = new Person('b');
var c = Person;
console.info(a.name);
console.info(b.name);
console.info(c.name)
```
