---
sidebar: auto
---

# 基础

> JavaScript 是起初是运行在浏览器网页里面的代码，后发展为可以跨平台的编程语言。
  
## 概念
- JavaScript 组成
  - ECMAScript  语法核心
  - DOM         文档模型对象
  - BOM         浏览器模型对象

## 关键字
  - 如果使用关键字name 声明一个值，只能是string 类型！！！

### 关键字、保留字分类

- 操作符关键字
  - `instanceof`
  - `typeof`
  - `delete`
- 类型关键字
- 语法关键字
  - `break` 
  - `do` 
  - `case`
  - `else`
  - `new`
  - `catch`
  - `finally`
  - `return`
  - `countinue`
  - `for`
  - `switch`
  - `while`
  - `debbugger *`
  - `this`
  - `with`             设置特定对象中的作用域
  - `in`
  - `try`

  ```js
  const s = "Hello"
  with(s){
    console.log(length)
  }
  // with 语句是运行缓慢的代码块，尤其是在已设置了属性值时。大多数情况下，如果可能，最好避免使用它。
  ```
  - `default`
  - `if`
  - `throw`
- 声明关键字
  - `function`
  - `void`
  - `var`

- 算术操作符 


### ECMA-262 保留字

- `abstract`
- `enum`
- `int`
- `short`
- `boolean`
- `export`
- `interface`
- `static`
- `byte`
- `extends`
- `long`
- `super`
- `char`
- `final`
- `native`
- `synchronized`
- `class`
- `float`
- `package`
- `throws`
- `const`
- `goto`
- `private`
- `transient`
- `debugger`
- `implements`
- `protected`
- `volatile`
- `double`
- `import`
- `public`

### 第五版非严格模式下缩减为

- `class`
- `enum`
- `extends`
- `super`
- `const`
- `export`
- `import`

### 严格模式下，保留字限制

- `implements`
- `package`
- `public`
- `interface`
- `private`
- `static`
- `let`
- `protected`
- `yield`  
## 语句
  - switch
    - case 必须紧接着跟值/变量/简单表达式/&&/function，不确定能使用||
  ```js
  // 以下产生一个bug，不管怎么样使用关键字name 声明一个值，只能是string 类型！！！
  var name = '22';var tt='22';
  var name1 =22;var tt1=22;
  // demo1
  switch (name) {
        // 终止错误，合并两个条件
        case '22':
        case 'AbortError':
        default:
          console.info('NotFoundError:找不到满足错误的类型');
      }
  //demo2
    switch (name) {
        // 终止错误，合并两个条件
        case tt:
        case 'AbortError':
        default:
          console.info('NotFoundError:找不到满足错误的类型');
      }
  //demo3
    switch (name1) {
        // 终止错误，合并两个条件,数值为number 类型时候，无法进入此条件
        case tt1:
        case 'AbortError':
        default:
          console.info('NotFoundError:找不到满足错误的类型');
      }
  ```

## 数据类型


## 静态方法
> xxx.prototype  在 constructor里面就看到了,


## 正则 RegExp

## 字符串 String

## 数字 Number

- 除法。先转为数字再进行除法操作
```js
   console.log('40'%7); // 等于多少? 取模
   console.log('40'/7) // 等于多少? 取模

```

## 数组 Array

- 能用forEach()做到的，map()同样可以。反过来也是如此。
- map()会分配内存空间存储新数组并返回，forEach()不会返回数据。
- forEach()允许callback更改原始数组的元素。map()返回新的数组。
- forEach 跳过空元素，但不跳过`undefined`


### 实例方法-不改变原始数组的方法

  - `Array.prototype.concat(arr1, arr2,...,arrn)`
    - 入参必填，可以是数组对象
    - 返回新数组
    - 链接数组
    
  -  <sup>es6</sup>`Array.prototype.entries()`
  
    ```js
    var fruits = ["Banana", "Orange", "Apple", "Mango"];
    var temp=fruits.entries();
    for(let item of temp) {
      console.log(item); /*[key,value]*/
    }
    console.log(temp);/*/Array Iterator {}*/
    console.log(fruits);/*不改變*/
    ```  
  -  <sup>es6</sup>`Array.prototype.every(function(crrrueValue,index,arr){},thisArr)` 
    - 检测数组所有元素都符合指定条件，通过函数条件
    - 如果有一个不满足条件，则会返回false，且剩余不再检测
    - 如果全部都满足条件则返回true

    ```js
      var ages = [32, 33, 16, 40];
      function checkAdult(age) {
        console.log(age)/*如果没有return 则返回第一个，然后打断*/
      /*     return age >= 18;*/
      }
      ages.every(checkAdult)
    ```
  - `Array.prototype.filter(function(){currentValue,index,arr},thisValue)`
  、
    - 过滤数组
    - 检查指定数组中符合条件的所有元素
    - 不检测空数组
    - 不改变原数组

  - <sup>es6</sup>`Array.prototype.find(function(){currenValue,index,arr},thisValue)`
    
    - 查找的意思
    - 判断数组第一个元素的值
    - 每个元素都调用一次函数
    - 如果条件满足true，则返回符合条件的元素，之后的不再执行
    - 如果都没有符合条件则返回undefined
  - `Array.prototype.map(function(currentValue,index,arr){},thisValue)`
    - 返回新数组，比如对每个数组都*2
    - 返回新数组,数组元素为原始数组元素调用函数处理后的值
    - 原始数组次序依次处理元素
    - 不对空数组进行检测
    - 不改变原数组，返回新数组

    ```js
    /*demo1*/
    var arr=[543153,1231,3215,12,12,42,45,4555,5];
    var arrT = arr.map(function(value,index,arr){
      console.log(value)
      /*/ retrun value *2*/
    });
    console.log(arrT);/*/[undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]*/

    /*demo2*/
    var ages = [32, 33, 16, 40];

    function checkAdult(age) {
        return age >= 18;
    };
    var mapTemp = ages.map(checkAdult);
    console.log(mapTemp);/*[true,true,false,true]*/
    var filterTemp = ages.filter(checkAdult);
    console.log(filterTemp)/*[32,33,40] 返回如何条件原数组的元素*/
    
    ```
  - `Arrary.prototype.forEach(function(currentValue,index,arr){},thisValue)`
    
    - 常用语，逐个做事情，打印，写入数据库
    - forEach()方法对数组每个元素执行一次提供的函数
    - 对空数组不会执行回调函数
    - es3开始
    - 返回值undefined
    - 不能使用return,只针对每个元素调用函数

    ```js
    var arr=[561531,1231,112,12,2];
    arr.forEach(function(currentValue,index,arr2r){
    console.log(this)//String {"ttt"}
    },'ttt')
    ```
### 实例方法-改变原始数组的方法(一般改变索引值的，都会改变原始数组)
  - `Array.prototype.copyWithin()`copyWithin
  
    - 从数组指定元素拷贝元素到数组的另外一个指定位置

    ```js
    var arr=['西瓜','赵铁柱','王尼玛'];
    var temp = arr.copyWithin(2,1);
    console.log(arr,temp);//["西瓜", "赵铁柱", "赵铁柱"] ,["西瓜", 西瓜"赵铁柱", "赵铁柱"]
    ```
  - <sup>es6</sup>`Array.prototype.fill('帅哥',start,end)`
    - 填充数组
  ```js
  var arr=['西瓜','赵铁柱','王尼玛'];
  var temp = arr.fill('帅哥');//不入参的话其他不变
  console.log(arr,temp)

  ```
### 静态方法



## 数据类型构造属性及方法(静态)
- 疑问：比较MediaSource.prototype 与Array.isArray()

> Array.isArray() `静态方法?`，可在chrome打印出来并不是灰色
![Array.isArray()](/images/isArray.jpg)

> MediaSource.isTypeSupported() `静态方法` ,在chrome打印出来是亮色
![MediaSource.isTypeSupported](/images/isTypeSupported.jpg)

> 共性

|类型或者构造函数|arguments|caller|length|name|prototype|__proto__|[[Scopes]]|
|----|----|----|----|----|----|----|----|
String|||1|String||||
Boolean|||1|Boolean||||
Number|||1|Number||||
Object|||1|Object||||
Array|||1|Array||||
Symbol|||0|Symbol||||
MediaSources||||||||
||||||||
- String
  - fromCharCode
  - raw
- Boolean 
- Number
  - EPSILON:2.220446049250313e-16
  - MAX_SAFE_INTEGER: 9007199254740991
  - MAX_VALUE:1.7976931348623157e+308
  - MIN_SAFE_INTEGER: -9007199254740991
  - MIN_VALUE:5e-324
  - NEGATIVE_INFINITY: -Infinity
  - NaN: NaN
  - POSITIVE_INFINITY: Infinity
  - isFinite()
  - isInteger()
  - isNaN()
  - isSafeInteger()
  - parseFloat()
  - parsetInt()
- Object
  - assign()
  - create()
  - defineProperties()
  - defineProperty()
  - entries()
  - freeze()
  - getOwnPropertyDescriptor()
  - getOwnPropertyDescriptors()
  - getOwnPropertyNames()
  - getOwnPropertySymbols()
  - getPrototypeOf()
  - is()
  - isExtensible()
  - isFrozen()
  - isSealed()
  - keys()
  - preventExtensions()
  - seal()
  - setPrototypeOf()
  - values()
- Array
  - from()
  - isArray()
  - of()
  - Symbol(Symbol.species)
  - get Symbol(Symbol.species):()
- Symbol
  - asyncIterator
  - for()
  - hadInstance
  - isConcatSpreadable
  - iterator
  - keyFor()
  - match
  - replace
  - search
  - species
  - split
  - toPrimitive
  - toStringTag
  - unscopables
- WebSocket
  - `CLOSED:3`
  - `CLOSING:2`
  - `OPEN:1`
  - `CONNECTING:0`
- MediaSources 
  - `isTypeSuported()` 静态方法

## 函数
>特点：
- 函数声明提升

### 声明函数的几种函数，目前三种
- 函数声明
- 函数表达式
- 匿名函数/拉姆达函数，`name` 是空字符串
```js
/*1 函数声明*/
function test(){
  //todo
}
/*2 函数表达式*/
const test1=  function(){
  //todo 
};
/*3 匿名函数/立即执行*/
(function(){
   //todo
 })()
```

### 一种危险的函数使用
为什么说它危险？
> 应该使用函数表达式

```js
if(true){
  function say(){
    console.log('hi')
  }
}else{
  function say2(){
    console.log('no hi!')
  }
}
```

### 递归

-----------------------------------------------------------------------------------------
> 以下来自红宝石：
- 使用`arguments.callee`，指向正在执行函数的指针
```js

function factorial(num){
if(num<=1){
  return 1
}else{
  return num*factorial(num-1)
  }
}
// ①如果设置中途转了一层
var anthorFactorial= factorial;
factorial=null;
console.log(anthorFactorial(4));//error
// ② 上面可以变为
function factorial1(num){
  if(num<=1){
    return 1
  }else{
    return num*arguments.callee(num-1)//但是在严格模式下，无法访问这个属性，所以会导致错误
  }
}
// ③ 更有效的方案，匿名函数的方式
var factorial2=(function f(num){
  if(num<=1){
    return 1
  }else{
    return num*f(num-1)
  }
})
```
-----------------------------------------------------------------------------------------
> 以下来自自己的摸索和总结：

`函数自己调用自己,就是递归`，由于递归需要具备超前的临时计算能力，对于我来讲，是很难一个学习难点。随后在网络上找到一个方法、函数来加深理解。

```js

// 用递归 来求 5 的阶乘 ，翻译过来就是 1*2*3*4*5 =120
// n! = n * (n-1)!

// 定义一个函数，用于求 n 的阶乘
function func(n)
{
    if (n === 1)
    {
        return 1;
    }

    // func(n-1) 因为传递的参数是 n-1,那么就是求 (n-1) 的阶乘
    return n * func(n-1);
}
console.log(func(5));

// 所以计算的结果是
// 第一步 return 5 *(func(4))
// 第二步 return 5 *(4*(func(3)))
// 第二步 return 5 *(4*3*2(func(2)))
// 第二步 return 5 *(4*3*2(*1*func(1)))
// 第二步 return 5 *(4*3*2*1) = 120
```

> 再看一个斐波那契数列的递归数列，加深对递归概念的理解，小于2则return 1, 公式 f[n]=f[n-1]+f(n-2) 递归结束条件f[1]=1;f[2]=1

- 基本规则

 |序列|值|
 |----- | ---- |
 0 | 1
 1 | 1
 2 | 2
 3 | 3
 4 | 5
 5 | 8
 6 | 13
 7 | 21
 8 | 34
 9 | 55
 |||

 ```js
 /**
  * @desc for 循环实现 ，借用三个变量来存放
  * */
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

/**
 * @desc 斐波那契数列 学习，递归函数解析
 *
*/
var fib= function(n){
  if(n<2){
  return 1
    }
    return fib(n-1)+fib(n-2)
}
 console.info(fib(9))
fib(8)
// 入参 8

```

|序列|值|
| ---- | ---- |
第一步 | fib(7)+fib(6)
第二步 | fib(6)+fib(5) + fib(5)+fib(4)
第三步 | fib(5)+fib(4) + fib(4)+fib(3) + fib(4)+fib(3) + fib(3)+fib(2)
第四步 | fib(4)+fib(3) + fib(3)+fib(2) + fib(3)+fib(2) + fib(2)+fib(1) + fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0)
第五步 | fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
第六步 | fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
第七步 | fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
第八步 | 1     +     1 +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +    1  +     1 +    1  +     1 +    1  +     1 +     1 +    1  +     1  +     1  +     1  
第九步 | 去掉空格之后 我们得到一个结果  1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1 = 34

![斐波那契数列](/images/fib.jpg "斐波那契数列")

### 立即执行
> 因为立即执行函数和外部的全局作用域的命名空间不同，于是name1 和 this.name1 属于不同的空间,私有命名空间


```js

/*立即函数的几种声明方式 1  匿名函数包括在一个括号运算符*/
(function(test){
  console.log(test)
})(123)

/*立即函数的几种声明方式 2  匿名函数跟一个效果好。并包括一个原算法*/
(function(test){
  console.log(test)
}(123))

/*demo*/
  var name1 ='World!';
(function(window){
	console.log(window.name1,this.name1,name1)//window,window,undefined
	if(typeof name1 === 'undefined'){
		var name1 ='JACK';
		console.log('hello,'+name1)
	}else{
		console.log('Goodbye' + name1)
	}
})(window)

```

## 事件

### 焦点事件
> 判断浏览器是否支持：`document.implementation.hasFeature("FcousEvent"),"3.0"`

|触发次序|冒泡事件|非冒泡事件|描述|用例|
|----|----|----|----|----|
|1|focusout||失去焦点大多浏览器||
|2|focusint||获得焦点，大多浏览器||
|3||`blur`|元素失去焦点，浏览器都支持||
|4|DOMFocusOut||失去焦点,Opera支持||
|5||`focus`|不冒泡，获得焦点触发|
|6|DOMFocusIn||冒泡,Opera支持||
||||||

> 郁闷，2018年10月31日 这一天面试，其实我都有做过，而且自然而然的做过，竟然答不上来，知识体系全部混乱。
这样下去，如果面试一些基础题，我真的可能找不到工作了。
之前也没怎么考虑是事件委托还是代理，自然而然就这样处理事件了。 比如之前人工写的 轮播 在那个智能官网里面的，也没多想了，可谁知道那就是事件委托，哔了狗。


- 如何去声明和使用事件，以点击事件来说
```html
<!--onclick--->
<button>button</button>  

<script>
  const btn = document.querySelector('button');
  function changeColorA() {}
  function changeColorB() {}
  function changeColor (){
    btn.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)
  }
  //方式1
  btn.onclick=changeColor;
  //方式2  以添加addEventListener 函数来完成。具名函数方式
  btn.addEventListener('click',changeColor);

  //方式3 匿名函数来指代一下也是可以的
  btn.addEventListener('click',,function(){
      btn.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)
  });
  // 移除事件
  btn.removeEventListener('click',changeColor);
 // 添加多个事件
  
 //  无法实现并存的方式，后者会覆盖前者
  btn.onclick=changeColorA;
  btn.onclick=changeColorB;

  //使用事件监听器注册的话，就可以实现了!!兼容性，addEventListener只支持到IE9
  btn.addEventListener('click',changeColorA);
  btn.addEventListener('click',changeColorB)
  //有些情况，如submit 事件总会使用preventDefault()阻止默认行为
</script>

```
- 事件委托/事件代理
  - 什么时候用到？for 循环里面 多个点击事件，一次操作就可以完成，减少DOM操作次数
  - 原理：利用事件的`冒泡原理`来实现，
  ```html
    <ul>
      <li> 1</li>
      <li> 2</li>
      <li> 3</li>
      <li> 4</li>
      <li> 5</li>
    </ul>
  ```
  ```js
  // 很蠢的对每个li 标签都循环做点击事件
   window.onload= function(){
     var ul = document.querySelector('ul');
     var li = document.querySeletcor('li');
     for(var i=0;i<li.length;i++){
       li[i].onclick=function(){
         alert(123)
       }
     }
   }
  
  ```

- 事件冒泡
  - 什么是冒泡原理？
  - 什么是事件冒泡？ 
  >事件从最深的节点开始，逐步向上传播事件，div>ul>li>a ，给a添加事件，事件就会一层一层的往外执行，执行顺序为a->li->ul->div
  - 机制
  > 给最外面的div加点击事件，`这里理解？：它的后代都会被点击到`那么 ul li a 做点击的时候，都会冒泡到最外层div，也就是会触发。这就是事件委托，委托父级代为执行事件。反正最后都会被冒泡到？？
  - 事件冒泡和事件捕获

    - 捕获阶段`父级->子级，向里`
      - 检查最外层`html`，是否在捕获阶段注册一个`onclick`事件处理程序，如果是，则运行
      - 然后移动到下一个元素，并执行相同操作，直到实际点击的元素
      - **结论是：事件始终从html层开始？**
      - 顺序：父级——>子级 、外到里
    - 冒泡阶段 `子级->父级，向外`
      - 检查实际点击元素是否在冒泡阶段注册`onclick`事件，如果是则运行
      - 然后移动到直接祖先，然后同上，直至`html`元素
      - 时间处理程序都在冒泡阶段注册  `(但可以使用addEventLisenter(,,true) 在捕获阶段注册`
      ```js
        video.onclick=function(e){
          e.stopProgation();//阻止冒泡链扩大
          video.play()//播放视频
        }
      ``` 
    - 事件委托`由于冒泡而被允许的概念`
      - 通过委托父级，addEventLisenter 设置在父节点上，将事件监听器气泡的影响每个子节点，而不是每个子节点都设置事件监听器


##  前端路由实现
>API，利用两个API修改URL，而不会引起页面的刷新
- 方式一 pushState ajax
  - history.pushState 增加一条新的记录
  - history.replaceState 替换当前的历史记录
- 方式二 hash+ajax
  - "#" 锚点，web不会解析hash，“#”后面，web服务会被自动忽略
  - js可以通过location.hash读取，解析后可以实现响应不同的路径逻辑
  - hashchange 监听hash 变化触发事件


  
## 全局函数
`http://www.w3school.com.cn/jsref/jsref_obj_global.asp`

- Global  `ES 内置单体对象` 全局对象

|属性|方法|描述|
|----|----|----|
||isNaN()||
||isFinite()||
||parseInt()||
||parseFloat()||
||encodeURI()|`对空格转换`|
||decodeURI()||
||encodeURIComponent()|`非标准字符全部编码`|
||decodeURIComponent()||
||eval()||
|undefined||`特殊值`|
|NaN||`not a number 特殊值`|
|Infinity||`特殊值`|
|Object||`构造函数`|
|Array||`构造函数`|
|Function||`构造函数`|
|Boolean||`构造函数`|
|String||`构造函数`|
|Number||`构造函数`|
|Date||`构造函数`|
|RegExp||`构造函数`|
|Error||`构造函数`|
|EvalError||`构造函数`|
|RangeError||`构造函数`|
|ReferenceError||`构造函数`|
|SyntaxError||`构造函数`|
|TypeError||`构造函数`|
|URIError||`构造函数`|
||||

- Math `ES 内置单体对象`
比较数组大小
```js
const arr =[11231,238,5,21];
Math.max.apply(Math,arr)
```
|属性|方法|描述|
|----|----|----|
|E||`自然对数的底数，常量e的值`|
|LN10||`10的自然对数`|
|LN2||`2的自然对数`|
|LOG2E||`2为底的e的对数`|
|LOG10E||`10为底的e的对数`|
|PI|||
|SQRT1_2||`1/2的平方根，2的平方根的倒数`|
|SQRT2||`2的平方根`|
||min()|`(1,3,9,4)`|
||max()|`(9,3,11)`|
||ceil()|向上取舍|
||floor()|向下取舍|
||round()||
||random()|`0-1随机数，技巧：Math.random()*100+1`|
||abs(num)|`绝对值`|
||exp(num)|`Math.E的num次幂`|
||log(num)||
||pow(num,power)||
||aqrt(num)|`num的平方根`|
||acros(x)|`x的反余弦值`|
||asin(x)|`x的反正弦值`|
||atan()|`x的反正切值`|
||atan2(y,x)|`y/x的反正切值`|
||cos(x)|`x的余弦值`|
||sin(x)|`x正弦值`|
||tan(x)|`x正切值`|
||||
- decodeURL

## 枚举[`new`] symbol



## 类 class  

## 面向对象,程序设计

> 一个标志，类的概念 

|概念/方法|描述|
|----|----|
|数据属性||
|访问器属性|||
|Object.defineProperty(obj,name,{})|`定义单个`|
|Object.defineProperties(obj,{xx:{value:1}})|`同时编辑多个，定义多个属性`|
|Object.getOwnPropertyDescriptor()|`取得 给定属性的描述符`|
|||

#### 创建对象-工厂模式
> 普通方式，字面量方式，代码量比较多

> 优点：一个函数，即可创建对象
1. 只要一个函数，可多次调用
> 缺点：
1. 没有解决对象识别（知道一个对象的类型？？）
2. 返回默认的，如果不处理则会返回固定的
```js
function factory(name,age,job){
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj= {};
  obj.age=age;
  obj.name=name;
  obj.job=job;
  obj.sayName=function(){
    return this.name
  };
  return obj
}
//use
const p= factory('张三','28','前端狗')
```
### 创建对象-构造函数
>优点：
1. 没有显示地创建对象
2. 直接将方法和属性赋值给this对象
3. 没有return
>缺点：
1. 每个方法都要在每个实例上重新创建一边，`p1.sayName===p2.sayName` 同样任务，但两遍，两者不等于，证明这一点
>特点：
1. 大写构造函数首字母，惯例
2. 它的实例都有一个`constructor`（构造函数）属性，指向他的构造函数
```js
function ConstractorFn(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sayName=function(){
    return this.name
  }
}
// use
const p1 = new ConstractorFn('李四6i7','29','后端喵');
// 监测类型
console.log(p1 instanceof ConstractorFn)//true,同样都是Object的实例

```
> 当做构造函数，见上面

> 当普通函数
```js
ConstractorFn('李四6i7','29','后端喵');
window.sayName()
```
> 在另外一个对象的作用域中调用
```js
const ob = {};
ConstractorFn.call(ob,"王五",'30','python');
// ConstractorFn.apply(ob,["王五",'30','python']) 或者这样

on.sayName()
```
> 缺点（原型模式解决）：
1. 在全局作用域下声明函数，只能被某个对象调用，意思是，专属的函数
2. 而如果需要定义多个函数的，那么你需要声明多个函数。。。
3. 如何对构造函数进行优化呢？属性和函数定义区分开,
```js
function ConstractorFn(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  this.sayName=sayName
}
function sayName(){
  return this.name
}
const p1 = new ConstructorFn('孙六','31','产品汪')
```
#### 创建对象-原型模式
> 特点：
1. 所有实例都共享原型的属性和方法
> 优点：
1. 修改单一个实例，不会影响到其他实例
2. 
> 缺点：
1. 
```js
function Proto(){}
Proto.prototype.name="刘七";
Proto.prototype.age="32";
Proto.prototype.job="设计狮";
Proto.prototype.sayName=function(){
  return this.name
};
var p1 = new Proto();
var p2 = new Proto();
p1.sayName===p2.sayName//true
```
> 理解原型对象
1. 默认情况，原型对象自动取得constructor属性，其他方法和属性都是从Object继承
2. 使用`Person.isPrototypeOf()`测试实例是否有一个纸箱构造函数`prototype`的指针
3. `hasOwnProperty()` 访问的值是不是实例的属性,该方法会忽略从原型链继承到的属性
4. `Objecet.getOwnPrototypeDescriptor()` 用于实例属性
> 原型与in操作符
1. `"name" in p1`查找该实例上的属性，不管是`实例上还是原型上`
2. IE早期版本出现bug，导致无法被`in` 出来，所以替代的方案是 `Object.keys()`，可列出可枚举的字符串数组
> 更简单的原型语法，
1. [x]字面量包装`prototype`，但！`constructor`没有指向构造函数了
```js
function Proto(){}
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
```
2. [x]字面量包装`prototype`，初始化回来`constructor`。！但是，此时，`constructor` 是可以被枚举的。
```js
function Proto(){}
Proto.prototype={
  constructor:Proto,//重新指向
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
```
3.[√]所以只能用es5的,Object.defineProperty()
```js
function Proto(){}
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
/*只允许在支持es5 Object.defineProperty()方法的环境下使用这样的方式*/
Object.defineProperty(Person.prototype,'constructor',{
  enumerable:false,
  value:Person
})
```
> 原型的动态性 **实例中的指针仅指向原型，并不是指向构造函数**，当时`new 出来 的prototype`，即`最初原型`，以下代码说明这一点：
```js
function Proto(){}
var p1 = new Proto()
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  sayName(){
    return this.name
  }
}
p1

```
> 原生对象的原型
- 给原型对象，添加方法，再`new` 出来
> 原型对象的问题
1. 忽略构造函数传递初始化参数
2. 所有实例获取相同的属性值
3. `共享`的本质

```js

function Proto(){}
Proto.prototype={
  name:"xx",
  age:'44',
  job:'ceo',
  test:['men','women'],
  sayName(){
    return this.name
  }
};
var p1 = new Proto();
var p2 = new Proto();
p1.test.push('son');
// 此时
console.info(p1.test===p2.test); //true

```

### [√]创建对象-混淆大法！组合使用构造函数 +原型模式！`目前最广泛，最好的方式`
> 构造函数写属性，方法则用原型继承
```js
function Fn(name,age,job){
  this.name=name;
  this.age= age;
  this.job=job;
  this.test=['man','woman']
}
Fn.prototype={
  constructor:Fn,
  sayName(){
    return this.name
  }
};
var p1 = new Fn('xsa','tt','te');
var p2 = new Fn('xsa2','tt2','te2');
p1.test.push('son');
console.info(p1.test===p2.test);

``` 

### 创建对象-动态原型模式
> 缺点
- 不能使用字面量重写原型,否则会切断联系
> 通过if来判断
```js
function Fn(name,age,job){
  this.name=name;
  this.age=age;
  this.job=job;
  if(typeof this.sayName !=='function'){
    Fn.prototype.sayName=function(){
      return this.name
    }
  }
}
```

### [x]创建对象-寄生构造函数模式
> 比工厂模式多了一个new，使用工厂模式new 出来

>特点：
1. 返回的对象与构造函数或者与构造函数的原型属性之间没有关系`[1]`
2. 构造函数return的对象与构造函数外部创建的对象没有什么不同`[2]`
3. 不能使用instanceof操作符确定对象类型
4. 在红宝石上书，不推荐此模式
```js
function factory(name,age,job){
  // const obj=Object.create({})//带有普通对象的__proto__ 类似  const obj = new Object()
  // const obj=Object.create(null)//则没有_proto__！
  const obj= {}; //此处不一定是Object对象，可以是Array对象，具体看业务操作
  obj.age=age;
  obj.name=name;
  obj.job=job;
  obj.sayName=function(){
    return this.name
  };
  return obj
}
//use
const p=new factory('张三','28','前端狗')
```

### 创建对象-稳妥构造函数模式
>由道格拉斯·克罗克福斯 发明了该模式——稳妥对象（durable obajects）

> 特点：
1. 遵从寄生构造函数类似模式
2. 新创建对象方法的实例不引用this
3. 不适用new操作调用构造函数
4. 丢掉无关属性或者说是丢掉无效入参
5. 没有其他方式可以访问其数据成员
6. 为安全性考虑的js设计模式 

```js
function durable(name,age,job){
  var obj= {};
  // todo 定义私有变量和属性
  obj.sayName=function(){
    console.log(name)
  };
  return obj
}
// use
var p1 = durable('柳十','41','CFO管钱的');
p1.sayName()
```

### new操作符都干吗了？
1. 创建一个新对象
2. 构造函数的作用域赋值给新对象，this指向这个新对象
3. 执行构造函数代码，为这个新对象添加属性
4. 返回新对象
[查看更多 js中的new()到底做了些什么？？](https://www.cnblogs.com/faith3/p/6209741.html)

## 作用域
- `js 没有作用域块`，导致var 声明时 是全局作用域。但如果是let声明，情况就不一样。let 让变量有了作用域。
- 可以使用过匿名函数来解决，模仿块级作用域

>以下代码让很感到困惑
```js
  if(1){
    var ha = 'hello,world!'
  }
  console.log(ha) //得到多少?
```
>但如果是 let 开头的话，就不一样了
```js
if(1){
	let ha ='hello world'
}
console.log(ha)
```
>这也就是能解释了，为什么 当使用var声明for循环出来后，总是最后一个值的原因（let 则相反）
```js
for(var i=0;i<5;i++){
 
}
 console.log(i)
```
>所以优秀的代码，其实可以这样去避免
```js
for(var i=0;i<5;i++){
 
}
 console.log(i);
 i=null

```
> 函数内部，相当于一个作用域
```js
/*demo1*/
const test=function(){
  var t = 'hello';
  return t+',world!'
};
test();
console.log(t);//

/*demo2*/
const test2=function(){
  t2 = 'hello';
  return t2+',world!'
};
test2();
console.log(t2)//可以访问到
```
## 私有变量
> 如何让外部的函数访问到内部的变量和设置
- 通过构造函数的方式
```js
function Main(name){
  this.getName=function(){
    return name
  };
  this.setName=function(value){
    name=value
  }
}
var p1 = new Main('李四');
console.log(p1.getName());
p1.setName('王五');
console.log(p1.getName())
```
### this

- this 总是指向函数的直接调用者（非间接）
- 有new 关键字，指new 出来的那个对象（构造函数的实例，一般）
- 事件中，指触发这个事件的对象。
- 特殊的。IE中的attachEvent 的this 总是指向全局的window
- 闭包中`this`是window对象
- dom实例，this指向这个dom对象实例


> this 竟然不是上一个函数对象
- 自动取得两个特殊的变量
- 内部搜索到this arguments时，只会搜索到其活动对象为止，因此`永远不可能直接访问外部函数的中的两个变量`
```js
var name = "I am window";
var object={
  name:"I am object",
  getName:function(){
    return function(){
      console.log(this);
      return this.name
    }
  }
};
console.log(object.getName()())//竟然是window！！！
```
> `将外部作用域中的this 对象，保存在一个闭包能够访问到的变量力，就可以让闭包访问到该对象了`!!
```js

var name ="I am window";
var object={
  name:"I am object",
  getName:function(){
    var that=this;
    return function(){
      console.log(this);
      return that.name
    }
  }
};
//demo1 
var object={
  name:"I am object",
  getName:function(){
    return function(){
      console.log(this);
      return that.name
    }.call(this)//bind 、call
  }
}
```

## 以下三个方法都是为了改变上下文存在而是用的

- <sub>[绑定-this-的方法](##索引__关于本作知识引用来源sub标签 )</sub>

- call  方法。调用一个函数，具有一个指定this值和分别地提供参数 [MDN查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
  - 语法 `function.call(thisObj,args...)`,如果thisObj 是null，则是全局对象,args作为参数传递给funciton

- apply 方法。调用一个函数，具有指定this 的值，以及作为一个数组提供的参数。 [MDN查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

- bind 方法。创建一个新的函数。被调用时，其this关键字 设置为提供的值，在调用时新函数时，在任何提供之前一个给定的参数序列。[MDN查看更多](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## call  会立即执行。

- 入参是一个 (a,b,c)的列表形式，记忆方式，“C” 类似括号“（”。
- call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数。
- 应用：调用对象的原生方法

```js
var obj = {};
obj.hasOwnProperty('toString'); // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString'); // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

## apply  会立即执行。
- 最多入参65536个参数
- 假如数组的长度很长。切块后循环传入目标方法

### apply 讲数组添加到另一个数组
- 数组a，数组b
- a里面含有b的元素

```js
const list1 = [1,2];
const list2 = [3,4];
list1.push.apply(list1,list2);
console.info("list1:",list1);
console.info("list2:",list2);

```

### apply和内置函数，允许Math.max/Math.min 找出数组中最大值/最小值

```js
// 最大值
const list1=[12,1,456,6,16];
const max = Math.max.apply(null,list1);
console.info(max);

// 最小值
const min= Math.min.apply(null,list1);
console.info(min);


```

### 将数组空元素转为`undefined`

```js
const arr=[54654,,55];
const result =Array.apply(null,arr);
console.info(result);//[ 54654, undefined, 55 ]

``` 


### 使用apply来链接构造器

### 转换类数组对象

```js
Array.prototype.slice.apply({0:1,length:1}); // [1]
Array.prototype.slice.apply({0:1,length:99}) // (99) [1, empty × 98]

```
### 绑定回调函数的对象
```js

```

## bind 新函数，不会立即执行。
- 创建一个新的函数。
- 新函数的this 是bind的第一个参数指定的
- 其余参数作为新函数的参数使用
```js

const bind= function() {
  return function() {
	// do something    
  }
}

```

- 因为bind每次都生成一个函数。所以需要注意以下：

```js
const o={
	m(){
		console.info("hello");
	}
};
const ele=document.querySelector('xx');
ele.addEventListener('click',o.m.bind(o));

// 而是

const listener= o.m.bind(o);
ele.addEventListener('click',listener);

// 否则无法remove事件监听

ele.removeEventListener('click',listener);


```


## call 与apply区别


- call  入参是列表。
- apply  入参是数组

```js
function a(ob){
  console.info(ob)
};
var cc ={t:'222'};
var ob={name1:'lala'};
a.apply(null,[ob],cc)

// undefined
```

## Blob 对象

- 相互转换的其他平台
	- url
    - URL.CreateObject(stream)//创建一个流的URL对象
	- web(XMLHttpRequest) 异步请求
	- file system 文件系统
	- database 数据库
	- workers 窗口
	- array buffer 二进制
	- text 文本

## js三大对象
[SegmentFault 查看更多，作者Adrain](https://segmentfault.com/a/1190000011467723)

## 本地对象
  - 与宿主无关，独立于宿主环境的ECMAScript 实现提供的对象
  - ECMA-262 定义的类（引用类型）
  - 该类引用类型在运行过程中需要通过new 创建所需的实例对象
  - 包含 `Object`、`Array`、`Date`、`RegExp`、`Function`、`Boolean`、`Number`、`String` 等
  
## 内置对象
  - 与宿主无关，独立于宿主环境的ECMAScript实现提供的对象
  - EMCAScript 程序开始执行前就存在，本身就是实例化内置对象，无需实例化
  - 内置对象是本地对象的子集
  - 包含`Global` 和`Math`
  - ECMAScript 5中新增了`JSON`这个存在于全局的内置对象
  
## 宿主对象
  - 由ECMAScript 实现的宿主环境提供的对象，包含两个大类，一个是宿主提供，一个是自定义类对象
  - 所有非本地对象都是宿主对象
  - 嵌入网页的js 来讲，宿主就是浏览器提供的对象，包括`window` 和`Document`
  - 所有DOM 和 BOM 对象都属于宿主对象
