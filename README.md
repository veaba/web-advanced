# web-advanced-frond-end
进阶web高级前端知识体系
##原型与原型链(prototype，prototype chain)
	原型与原型链对于一个将走进高级web前端来讲，是一个门槛。
### 概念定义
### 构造函数
### JS原型继承的几种方法
#### 原型链继承

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
	parseInt("9", 8);	// 八进制 （0*8+9=17）9的八进制=11？？ 因为八进制中，不存在9，所以报错

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





































## 附 2018阿里资深web前端面试题
## 附 2018网易高级web前端面试题
## 附 一次中级/高web前端面试题