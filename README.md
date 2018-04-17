# web-advanced-frond-end
进阶web高级前端知识体系
## vue 源码学习

[勾三股四 Vue.js 源码学习笔记](http://jiongks.name/blog/vue-code-review/)
[HcySunYang Vue2.1.7源码学习](http://hcysun.me/2017/03/03/Vue%E6%BA%90%E7%A0%81%E5%AD%A6%E4%B9%A0/)

### 启动
```js
	cnpm install -g karma (运行时test 是基于 Karma 的)
	cnpm install --save mime-db
	cnpm install (安装依赖)
	cnpm run dev:test 
```

### 项目结构 https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md#development-setup

- `scripts` 一般不需要关注，不过熟悉以下两个文件会更好
	- `scripts/alias.js`  所有源码和测试中使用模块导入的别名
	- `scripts/config.js` 包含生成`dist/`的所有文件的配置，查找入口文件，都在这个`dist`都在里面
- `dist` 包含用户发布的内置文件。此目录只会在发布的时候更新，并不能说明当前开发的最新特性变化。
	- 关于dist的信息请查看 [更多](https://github.com/vuejs/vue/blob/dev/dist/README.md)
- `flow` 包含flow 的类型声明。全局加载的，可以在普通源码中看到他们在注释中的使用
- `packages` 包含 vue ssr 和 vue 模板编译 包。vue的依赖包
- `test` 包含所有测试。单元测试是Jasmine写的，运行是用Karma。e2e 是Nighwatch.js 编写和运行的。
- `src` 包含源代码。基本代码是es2015编写的，并用flow 来做类型注释
	- `compiler` 编译器。包含模板转函数编译器的代码。
	
	parse 解析器（将字符串模板转为抽象语法树AST）
	optimizer 优化器（检测用于vdom呈现优化的静态树）
	code generator代码生成器（将抽象语法树生成渲染函数代码）。代码生成器直接从抽象语法树生成字符串，这样做的代码规格较小，因为编译器在独立构建中，发送给浏览器的
	- `core` 包含通用，无关平台运行时的代码

	vue2.0开始 core 就与平台无关。这意味着，你可以运行在浏览器、nodejs、或者嵌入式js里面。
		- `observer` 观察者。包含与响应式系统相关的代码。
		- `vdom` 虚拟dom。 包含虚拟dom 创建元素的相关代码和补丁。
		- `instance` 实例。包含Vue 实例构造函数和原型对象(prototype)方法。
		- `global-api` 顾名思义，就是全局的api
		- `components` 通过抽象组件，目前 keep-alive 是唯一的一个。
	- `server`　包含ｓｓｒ（服务端渲染）相关代码
	- `platforms` 包含特定平台的代码。	

	来自 `dist/build`的入口文件位于各自平台的目录中。
	每个平台模块包含三个部分：编译器compiler、运行时runtime、服务器server。对应上面的三个目录，每个部分都包含特定的平台的 模块/实用 程序，然后导出并注入到平台特定的目录文件中的core项中。例如，实现v-bind:class 背后的逻辑的核心就是在 `platforms/web/runtime/modules/class.js` ——这个入口是在`entries/web-runtime.js` ，用于创建特定浏览器的vdom的修补功能。
	- `sfc` 包含单文件组件(*.vue)解析逻辑。用到 package 中的 vue-template-compiler 依赖包。
	- 包含整个代码库中共享的实用程序。
	
## Vue 技术栈相关知识


### Vue 响应式原理分析

### 生命周期
#### created

### 组件通信
#### props 父传子
#### $emit 子传父
### 路由vue-router
### vue 相关面试题
- 为什么vue 的data 是一个函数?
```text

```
## 概念
### 作用域
### this
- this 总是指向函数的直接调用者（非间接）
- 有new 关键字，指new 出来的那个对象（构造函数的实例，一般）
- 事件中，指触发这个事件的对象。
- 特殊的。IE中的attachEvent 的this 总是指向全局的window

### window  对象
- 浏览器窗口
### document 对象
- document对象，文档，window的属性

## 继承
### 如何实现继承
- 构造继承 constructor
- 原型继承 prototype。原型继承，就是函数对象的原型= 构造函数
```js
	function PP(){
		this.pp='爷爷'
	}
	function AA(){
		this.aa='爸爸'
	}
	AA.prototype=new PP()
	console.info(AA.prototype.pp) //爷爷 。 

```
- 实例继承 instance
- 拷贝继承 copy
### js继承的几种方式？
- *构造函数继承 (http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
- *非构造函数继承 (http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)

### 对象之间“非构造函数方法”。 [非构造函数方法实现]
啥是非构造函数继承？因为两个都是普通对象，无法使用构造函数的方式继承
```js
	// 中国人对象
	var Chinese={
		nation:'中国'
	}
	// 一个医生对象
	var Doctor={
		career:'医生'
	}
```

#### object()方法
将子对象的prototype属性，指向父对象，从而子对象和父对象一起！！
！！！ 这™不是用函数的方式 new 一个构造函数嘛？？？
```js
	function object(o){
		function F(){}
		F.prototype=o;
		return new F()
	}

	var Doctor= object(Chinese);
	Doctor.career='医生' // 加子对象本身的属性？？
	console.info(Doctor.nation);//中国
```
#### 浅拷贝
将父对象属性，全部拷贝给子对象，实现继承。有问题的是，父对象有被褚篡改。
```js
	function extendCopy(p){
		var c = {};
		for(var i in p){
			c[i]=p[i];
		}
		c.uber=p;
		return c;
	}

	//usage
	var Doctor= extendCopy(chinese);
	Doctor.carret='医生'
	console.info(Doctor.nation); // 中国
```
#### 深拷贝 （JQuery当前使用的继承方式）
真正意义上的，对象和数组的拷贝。原理是递归调用“浅拷贝”
```js
	function extendDeep(p,c){
		var c=c||{};
		for(var i in p){
			if(type p[i] ==='object'){
				c[i]=(p[i].constructor===Array)?[]:{};
				extenDeep(p[i],c[i])
			}else{
				c[i]=p[i]
			}
		}
		return c
	
	} 
	//usage
	var Doctor= extenDeep(Chinese)

	// chinese.city=['北京']
	// Doctor.city.push('天津')
	console.info(Doctor.city) // 北京、天津
	console.info(Chinese.city) // 北京
```

### 对象之间 “继承的五种方法”。[构造函数实现]
- 构造函数绑定
- prototype模式
- 直接继承prototype
- 利用空对象作为中介
- 拷贝继承
#### 构造函数绑定
```js
	// 定义一个动画的函数对象
	function Animal(){
		this.type='动物'
	}
	// 定义一个Dog的函数对象
	function Dog(name,color){
		this.name=name	
		this.color=color
	}

	// ？ 如何让猫继承动物？？？？
	function Dog(name,color){
		Animal.apply(this,arguments) //此处的用意是什么? 将父对象的构造函数绑定在子对象上。
		this.name=name;
		this.color=color
	}
	var dog1 = new Dog('二哈','白色');
	console.info(dog1)
```
#### prototype 模式。
- 每一个prototype都有一个构造函数的属性constructor，并指向它的构造函数
- 每一个实例也有一个constructor
- 如果替换prototype之后，必须为prototype的构造函数constructor指向它本身，否则会导致紊乱
```js
	function Animal(){
		this.type='动物'
	}
	function Dog(name,color){
		this.name=name;
		this.color=color;
	}
	Dog.prototype=new Animal() // 将Dog 的原型对象【prototype】对象指向Animal 的实例，完全删除原先的值，并赋予新值。
	Dog.prototype.constructor=Dog;// 使得Dog 的原型对象的构造函数指向父级的animal
	var dog2 = new Dog('三哈','绿色')

```
#### 直接继承prototype
确定，Animal.prototype.constructor等于Dog
```js
	function Animal(){}
	Animal.prototype.type='动物'
	function Dog(name,color){
		this.name=name;
		this.color=color
	}
	Dog.prototype = Animal.prototype; //直接继承 Animal的对象对象
	Dog.prototype.constructor=Dog;
	var cat3= new Dog('四哈','黒色')
	console.info(cat3.type) // 动物

```
#### 利用空对象作为中介[略]
#### 拷贝继承
```js
	function Animal(){}
	Animal.prototyoe.type='动物'

	// 实现拷贝的函数。
	function extend(Child,Parent){
		var p= Parent.prototype;
		var c = Child.prototype;
		for(var i in p){
			c[i]=p[i]
		}
		c.uber.p
	}
	//将函数作用，就是将父对象的prototype对象中属性，拷贝给child对象的prototype对象
	extend(Dog,Animal);
	var dog4 = new Dog('五哈','棕色')
	console.info(dog4.type) ;// 动物

```
## 对象
### 创建对象的方式
- 自面量
- fucntion 模拟无参的构造函数
- function 模拟参构造函数实现（用this 定义构造函数的上下文属性）
- 工厂方式
- 原型的方式
- 混合方式


####  无参实现
```js
funciton Person(){}
var person = new Person()
person.name ='liao'
person.onClick=function(){
	console.info(person.name)
}
person.onClick()
```

#### 有参实现
```js
function Person(name){
	this.name=name ;//this作用域，指之前对象
	this.onDelete=fucnton()){
		console.info(this.name)
	}
}
var person = Person('卡布达')
person.onDelete()
```

#### 工厂方式创建（内置对象）
```js
	var ob =new  Object();
	ob.name='中国'
	ob.onPost=fucntion(){
		console.info(ob.name)
	}
	ob.onPost()
```

#### 原型方式
```js
	function D()){

	}
	D.prototype.name='狗狗'
	D.prototype.onName=function(){
		console.info(this.name)
	}
	var d= new D()
	d.onName()
```
#### 混合方式。函数对象在原型上，普通对象直接 赋值
```js
function A(name,p){
	this.name=name;
	this.p=p
}
A.prototype.onGet=fucntion(){
	console.info(this.name)
}
var a= new A('机器人')
a.onGet()

```
##原型与原型链(prototype，prototype chain)
	原型与原型链对于一个将走进高级web前端来讲，是一个门槛。
### 概念定义
### 构造函数
### JS原型继承的几种方法
### call
### apply
### bind
### call 与applye区别

### 闭包(closure)
闭包，是指有权访问另外一个函数作用域中变量的函数。a函数内，创建一个b函数，
```js
	function a(){
		function b(){
			
		}
	}
	
```

### 一些流行的技术题目
- ["1", "2", "3"].map(parseInt) 答案是多少？
	 详细解析：http://blog.csdn.net/justjavac/article/details/19473199
```js
	map:
	["1","2","3"].map(function(value,index){
		console.info(value,index)
	})
	结果：
	1 0
	2 1
	3 2
	于是，对于map后面加了一个方法parseInt，就相当于
	parseInt('1',0) // 1	此时radix 0以10位基础
	parseInt('2',1) // NaN  redix 为1，小于2，NaN
	parseInt('3',2) // NaN	redix 为2，小于2不成立，但2进制不满足3

	parseInt() 用法
	parseInt(string,radix) 
	parseInt('8','7') 
	string必填
	radix 2~36，如果 radix 为0，则以10为基础解析，如果0x， 0X开头，以16位基数，如果小于2,、大于36 则返回NaN
	parseInt("1", 0); 	// 十进制 1 
	parseInt("2", 1); 	// 第二个参数不在 2-36 直接
	parseInt("3", 2); 	// 二进制 NaN，因为二进制中，不存在3，所以报错
	parseInt("4", 3); 	// 三进制
	parseInt("5", 4); 	// 四进制
	parseInt("6", 5);	// 五进制
	parseInt("7", 6);	// 六进制
	parseInt("8", 7);	// 七进制
	parseInt("9", 8);	// 八进制 （0*8+9=17）9的八进制=11 因为八进制中，不存在9，所以报错

	parseInt("10", 9);  // 九进制 （1*9+0 = 9） 10的九进制=11
	parseInt("11", 10); // 十进制 （1*10+1 = 11）
	parseInt("12", 11); // 十一进制 （1*11+2 = 13）
	parseInt("13", 12); // 十二进制 （1*12+3 = 15）
	parseInt("14", 13); // 十三进制 （1*13+4 = 17）
	parseInt("15", 14); // 十四进制 （1*14+5 = 19）
	parseInt("16", 15); // 十五进制 （1*15+6 = 21）
	
```

- 如何阻止冒泡？ [*]
	e.stopPropagation()
	旧的IE e.cancelButton=true
- firfox 与 IE的事件机制
	IE 事件冒泡
	FF 同时支持捕获型事件、冒泡型事件

- js延迟加载
	defer、async，动态创建dom方式【最多】，按需异步加载
- ajax 异步传输 （html+js）	
- ajax 缓存问题
- 跨域问题
	jsonp
	iframe
	window.name
	window.postMessage
	服务商设置代码页面
- 模块化开发
	立即执行函数，不暴露私有成员

- AMD（异步模块定义，一开始写好，前置） https://github.com/amdjs/amdjs-api/wiki/AMD
- CMD （require.js就近模式）https://github.com/seajs/seajs/issues/242 。 http://annn.me/how-to-realize-cmd-loader/
- 异步加载js
	- defer {IE}
	- async
	- 创建script
- document.write
- document.innerHTML
































## 附 2018阿里资深web前端面试题
## 附 2018网易高级web前端面试题
## 附 一次中级/高web前端面试题
### 浏览器的100
- 101 websocket  (size 0B)
### 浏览器的200状态的区别
- 灰色的 200  from disk cache（来自磁盘缓存）
- 正常 200

### 浏览器的300状态
- 304 （意义：原来缓存的文档还可以使用）png document。依然会与服务器通信。如果cache-control:max-age>0 直接从浏览器提取。否则，向服务器发送http请求，确认该资源是否修改，有200，无修改304

### svg 与canvas

- svg 数量小，静态，不失真，dom绘制，类似图片，logo，简单
- canvas 数量大，密集，js绘制。像素级。可塑性高，可添加各类事件。处理处理重绘。效率高，复杂度高。

### base64 图片 与 src 引用图片
- base64 好处。小文件嵌入，不需要额外的请求。
- base64 坏处。浏览器不会缓存。

- 根据 base64AndSrcImage.html 测试结果来看
	width 1200px 下
	base 编译的代码 灰色200，从内存取缓存 from memory cache
	src ，正常200，从网络取 /304 产生7ms

	width 750px 下
	base 编译的代码 灰色200，从内存取缓存 from memory cache
	src，正常200.从网络取 /304 产生7ms

	得出的结论是，base占用内存，速度快。
	css 响应式，src 按需加载。base64 

### css 有间隙
- 当使用inline-block  父级设置font-size:0
- 或者letter-spacing:0
### css l v h f a 记忆方法 ，倒叙记忆
### css 纯css 无法实现父选择器
- 目前的实验上去测试了，发现以往的记忆是JQuery来实现的，纯css 无法实现该效果
### 二叉树

- 特殊的二叉树，满二叉树。深入k且含有2^k - 1的节点，深度3，节点为2^3-1=7。满二叉树，一定是完全二叉树。
		          ①
	          ②        ③
	        ④   ⑤    ⑥   ⑦
	       ⑧ ⑨ ⑩ ⑪  ⑫ ⑫	⑫ ⑫
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

### Number方法 （2018年4月10日 面试遇到该类型的题目，简直日了狗的难受）

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


-----toNumber 将值转为数字-------
	undefined  NaN
	null       0
	boolean    true/1 false/0
	number     无需转换
	string     由字符串解析为数组 '324' ->324
	[]		   0

-----toString 将值转为数字-------
	undefined  'undefined'
	null       'null'
	boolean    'true'/'false'
	number     数字做字符串
	string     无需转换
	function(){} 'function(){}'

```js
	1+1  //2 typeof number
	1+'1' // 11 typeof stirng
	'1'+1 // 11 typeof string
	1+'' // '1'
	''+1 // '1'
	1+undefined //NaN
	''+undefined //undefined
	true+undefined // NaN  Number(true)+Number(undefined)=NaN,String(true)+String(undefined)='trueundefined'
	false+undefined // NaN
	''+true // 'true'
	' ' + true // ' true'
	''+false//'false'
	' '+false//' false'
	1+function (){} //'1function(){}'
	1+Object()//'1[object Object]'
	'' +Object() // [object object]
	1+Array() // 1+Array().toString()=>1 +[].toString()
	1+Array //1 +Array.toString()= >1+function Array(){[native code]}
	1+NaN // NaN
	''+NaN //'NaN'
	'1'+NaN //'1+NaN'
	true+false //1
	true+true //2
	true+undefined //NaN
	true+NaN //NaN
	true+function(){} //'truefunction(){}'

```
### replace 理解
```js
let string='22dda';
$1   找到的
$2   找到所在的索引
$3   替换前的源码
string.replace('要替换的正则、字符等',function($1,$2,$3){
	return $2
})

'我是{{name}} ,年龄{{age}},性别{{sex}}'.replace(/\{{(.+?)\}}/g,function($1,$2,$3){
			console.info($1)
		})
// {{name}}{{age}}{{sex}}
```
### sort 理解
### typeof 常见类型
- typeof null						"object"
- typeof undefined					"undefined"
- typeof []							"object"
- typeof ['']						"object"
- typeof ['a']						"object"
- typeof {}							"object"
- typeof {a:['test']}				"object"	
- typeof NaN						"number"
- typeof true						"boolean"
- typeof false						"boolean"
- typeof new Date()					"object"
- typeof function(){alert('22')}	"function"
- typeof console.info('tt')			"tt" "undefined"
- typeof console					"object"
- typeof 1							"number"
- typeof '2'						"string"
- typeof ''							"string"

### 用一行代码将[1,2,3,4]随机打乱
```js
	[1,2,3,4].sort(function(){return  Math.round(Math.random())?1:-1})
```
### typeof null 
```js
	"object"
```
### let domList = document.querySelectorAll('div')，一句话将domlist转为数组
```js
	Array.from(domList)
```
### 哪个http response header 不会影响浏览器缓存行为
a.cache-control   b.etag   c.age     d.last-modified

通用首部字段（请求头报文+响应报文）
- Cache-Control  控制缓存的行为
- Pragma		http1.0 遗留，no-cache时禁用缓存
请求首部字段
- If-Match 		比较ETag是否一致
- IF-None-Match 同上
- If-Modified-Since	比较资源最后更新的时间是否一致
- IF-Unmodified-Since 比较资源最后更新的时间是否一致
响应首部字段
- ETag	资源的匹配信息
实体首部字段
- Expires http1.0的遗留物，实体主体过期的时间
- Last-Modified	资源的最后一次修改时间

[详见 浅谈浏览器http 的缓存机制](https://www.cnblogs.com/vajoy/p/5341664.html)


### 合理的前端项目结构分层

### 挑选自己活着公司项目，遇到的问题和解决的思路

### 全面解析一个任意url的所有参数为object，注意边界条件
let url = 'https://www.baidu.com/?user=admin&id=23&id=555&city=%E9%A2%9C%E8%89%B2&status=disabled'
=>ob={
	user:admin
	id:[23,555],//合并id相同的为数组
	city:'颜色'//中文编码
	enabled:true // 未指定的key约定值为true
}
### 实现一个最简单的模板渲染引擎(这是一道在杭州2018年4月16面试一家的笔试题，遗憾没写出来，今天用机器写了记下才写出来，加深了对replace的理解和正则，)

- 要点一 replace 的用法 第一个替换的，第二回调函数，回调函数有三个参数，第一个要找到的，第二个找到的索引，第三个原先的字符
- 对象key 转数组
- 正则 从什么到任意的什么 \{{(.+?)\}}
- 正则 这个或者那个 \{{|\}}
let template='我是{{name}} ,年龄{{age}},性别{{sex}}'
let data ={

	name:'姓名',
	age:18,
}
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


### 字符串查找
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

 ### 数据绑定基本实现(这是一道在杭州2018年4月16面试一家的笔试题，遗憾没写出来，今天用机器写了记下才写出来，加深了Vue 使用Object.defineProperty()这个方法，对对象修改并返回)
 [详见 MDN的 对象Object.defineProperty()方法的使用](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
 - 问题已 Object.defineProperty(obj,key,options)的使用
 - 其中 option 里面的选项以及主要的get 和set方法 
 ```js
	get:function(){
		return '你要改变的值'
	},
	set:fucntion(value){
		//set会返回一个value
		//这个value就是变更后的值，怎么处理
		obj.key= value
	}
 ```
 - bind()。【与此同类似的需要懂 call bind apply】其次是使用函数时候，怎么给另外一个对象绑定this，因为此题目用到一个返回并返回这个this，的key值，这时候需要处理
 ```js
	func.bind(obj)('你的参数') // func 是函数，里面有this， obj 就是要操作的函数的那个，
 ```
 let obj={
	 key_1:1,
	 key_2:2
 }
 function func(key){
	 console.info(key+'的值子发生变化'+this[key])
 }
 bindData(obj,func)
 obj.key_1=2;//此时自动输出 变化为2
 obje.key_2:1 //此时自动输出变化为1
```js
 let obj={
	 key_1:1,
	 key_2:2
 }
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
		}
	}
}
bindData(obj,func)
obj.key_1=2;//此时自动输出 变化为2
obj.key_2:1 //此时自动输出变化为1

```
 ###  数据结构处理
 输出有多个儿子的人的名字
 ```js
 let data={
	 name:'jack',
	 child:[
		 {name:'jack1'},
		 {name:'jack2',child:[
			 {name:'jack2_1',child:{name:'jack2-1-1'}},
			 {name:'jack2_2'}
		 ]}
		 {name:'jack3',child:{name:'jack3-1'}}
	 ]
 }
 ```

 ### 程序题1

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
console.info(a.name)
console.info(b.name)
console.info(c.name)
 ```

 ### 斐波那契数列(递归) *　ｊｓ　递归概念和思维方式有点模糊闲杂
 序列|值
 - | - | -
 0 | 1
 1 | 1
 2 | 2
 3 | 3
 4 | 5
 5 | 8
 6 | 13
 7 | 21
 8 | 33
 9 | 55 

 公式 f[n]=f[n-1]+f(n-2) 递归结束条件f[1]=1;f[2]=1

 ```js 
 //递归实现
var fib= function(n){
	if(n<2){
		return 1
	}
	return fib(n-1)+fib(n-2)
}
 console.info(fib(9))

 // for 循环实现
 var fibFor =function(n){
	 let n1=1,n2=1,n3=0
	 if(n<2){
		 return 1
	 }
	 for(let i =0;i<n-1;i++){
		 n3=n1+n2;
		 n1=n2;
		 n2=n3
	 }
	 return n3
 }
 console.info(fibFor(9))
 ```



——————————————————————-

`@1` AST ：抽象语法树。(abstract syntax tree)
