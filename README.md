# web-advanced-frond-end
进阶web高级前端知识体系
## Vue 技术栈相关知识

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