/***********************
 * @desc 这是一个学习call、apply、bind的demo
 * @name JS
 * @author veaba
 * @date 2019/8/8 0008
 *
 * @reference
 *  - https://segmentfault.com/a/1190000019970715
 *  - https://juejin.im/post/5c493086f265da6115111ce4
 * @call/bind/apply 都是绑定在function 对象上面的函数。
 *   - 'x'.bind()就会报错
 * @call 最多入参65536个
 ***********************/

// 这是一个普通的函数
const callApplyBind = function () {
  console.info('Hello world:callApplyBind ');
  console.info(this);
};

// 这是一个箭头函数
const callApplyBindArrow = () => {
  console.info('Hello world:callApplyBindArrow ');
  console.info(this);
};

// arg 测试

const callApplyBindArg = function () {
  console.info('callApplyBindArg:', arguments);
};
const callApplyBindArgArrow = () => {
  console.info('callApplyBindArgArrow:', arguments);
};

const catObj = {
  name: '小叮当',
  age: 2,
  sex: 'female',
};

const dogObj = {
  name: '二哈',
  age: 1.5,
  sex: 'male',
};

// 直接指向函数
// callApplyBindArrow();//Hello world:callApplyBindArrow  {}
// callApplyBind();//直接打印最外部的大对象

// bind 测试
// callApplyBindArrow.bind(catObj); // 什么都没打印
// callApplyBind.bind(catObj); // 什么都没打印

// call测试
// callApplyBindArrow.call(catObj);// Hello world:callApplyBindArrow    {}
// callApplyBind.call(catObj); //Hello world:callApplyBind { name: '小叮当', age: 2, sex: 'female' }

// apply 测试
// callApplyBindArrow.apply(dogObj); // Hello world:callApplyBindArrow  {}
// callApplyBind.apply(dogObj); // Hello world:callApplyBind { name: '二哈', age: 1.5, sex: 'male' }

// bind 测试 arg,todo，如何写一个bind函数

// callApplyBindArg.bind(catObj,dogObj);//没有执行
// callApplyBindArgArrow.bind(catObj,dogObj);//没有执行

// call 测试 arg
// callApplyBindArg.call(catObj, dogObj); // catObj没有打印到 callApplyBindArg: [Arguments] { '0': { name: '二哈', age: 1.5, sex: 'male' } }
// callApplyBindArg.call(null, catObj, dogObj); // 打印到期望值
// callApplyBindArg.call(this, catObj, dogObj); // 打印到期望值
//
// callApplyBindArgArrow.call(catObj,dogObj); // 打印Arguments 大对象，没有打印到期望值
/*
[Arguments] {
  '0': {},
  '1':
   { [Function: require]
     resolve: { [Function: resolve] paths: [Function: paths] },
     main:
      Module {
        id: '.',
        exports: {},
        parent: null,
        filename:
         'F:\\Github\\web-advanced-frond-end\\demos\\js\\callApplyBind.js',
        loaded: false,
        children: [],
        paths: [Array] },
     extensions:
      { '.js': [Function], '.json': [Function], '.node': [Function] },
     cache:
      { 'F:\\Github\\web-advanced-frond-end\\demos\\js\\callApplyBind.js': [Module] } },
  '2':
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename:
      'F:\\Github\\web-advanced-frond-end\\demos\\js\\callApplyBind.js',
     loaded: false,
     children: [],
     paths:
      [ 'F:\\Github\\web-advanced-frond-end\\demos\\js\\node_modules',
        'F:\\Github\\web-advanced-frond-end\\demos\\node_modules',
        'F:\\Github\\web-advanced-frond-end\\node_modules',
        'F:\\Github\\node_modules',
        'F:\\node_modules' ] },
  '3':
   'F:\\Github\\web-advanced-frond-end\\demos\\js\\callApplyBind.js',
  '4': 'F:\\Github\\web-advanced-frond-end\\demos\\js' }
  
* */

// callApplyBindArgArrow.call(this,catObj,dogObj); // 打印Arguments 大对象，没有打印到期望值
// callApplyBindArgArrow.call(null,catObj,dogObj); // 打印Arguments 大对象，没有打印到期望值

// apply 测试 arg

// callApplyBindArg.apply(catObj, dogObj);// {}空对象
// callApplyBindArg.apply(null, catObj);// {}空对象
// callApplyBindArg.apply(null, catObj, dogObj);// {}空对象
// callApplyBindArg.apply(null, [catObj, dogObj]);// 得到期望值 √
// callApplyBindArg.apply(this, [catObj, dogObj]);// 得到期望值 √
// callApplyBindArg.apply([catObj, dogObj]);// {}空对象

// => 通过对象应用去改变原入参对象的值
// const homeObj = {
// 	get() {
// 		this.color = "red";
// 		console.info(this);
// 	}
// };
//
// homeObj.get.call(catObj);//{ name: '小叮当', age: 2, sex: 'female' }
// console.info(homeObj.color);//undefined
//
// console.info(catObj);//{ name: '小叮当', age: 2, sex: 'female', color: 'red' },因为在对象在引用，所以catObj多出color

// 结论1，call可以改变入参的那个对象的内部结构

// apply的应用

// apply - 对数组进行取最大值
// const maxNums = (5484, 546, 6, 6, 699, 1, 2, 3);
// console.info(maxNums);//3
// const maxList = [5484, 546, 6, 6, 699, 1, 2, 3];
//
// console.info(Math.max(5484, 546, 6, 6, 699, 1, 2, 3)); //5484
//
// const theMax1 = Math.max.apply(null, maxList);
// console.info(theMax1);
//
// const theMax2 = Math.max.apply(maxList);//5484
// console.info(theMax2);//-Infinity

// apply 合并到另外一个数组中？什么原理呢？

// const list1 = [1, 2];
// const list2 = [3, 4];

// const list3 = list1.push.apply(list1, list2); // list1= [1,2,3,4]
// const list3 = list1.push.call(list1, list2); //  list1=[ 1, 2, [ 3, 4 ] ]
// const list3 = list1.push.call(list1, 3,4); //  list1=[ 1, 2, 3,4 ]
//
// console.info('list1:', list1);//[1,2,3,4]
// console.info('list2:', list2);//[3,4]
// console.info('list3:', list3);//2

// 使用apply 链接构造器

// 方法1

// 方法2

// apply 最大最小值
// const list1=[12,1,456,6,16];
// const max = Math.max.apply(null,list1);
// console.info(max);
//
// const min= Math.min.apply(null,list1);
// console.info(min);

// function add(a, b) {
// 	console.info('a+b');
// 	return a + b;
// }
//
// function sub(a, b) {
// 	console.info('a-b');
// 	return a - b;
// }
//
// const result = add.call(sub, 5, 3);//此时sub干嘛？这里？
// console.info(result);
//
// const res1 = add.call(null, 5, 3);
// console.info(res1);

// 实现类似bind的方法
// 要点1、返回一个返回
// apply的衍生实现也是需要调用apply、call?！
// Function.prototype.RealizeBind = function (thisArg) {
// 	// console.info('jaja');
// 	// console.info(this);
// 	// console.info(this.arguments);
// 	// console.info(arguments);
// 	// console.info(this.constructor);
// 	// console.info(this.prototype);
// 	// console.info(this.prototype.arguments);
// 	// 检查this 是不是function
// 	if (typeof this !=='function'){
// 		return
// 	}
// 	console.info(arguments);
// 	const w= this;
// 	const args= Array.prototype.slice.call(arguments,1);
// 	return function () {
// 		console.info(args);//[8,5]
// 		console.info(Array.prototype.slice.call(arguments));//[]
// 		return w.apply(thisArg,args.concat(Array.prototype.slice.call(arguments)))
// 	}
// };
//
// function sub(a, b) {
// 	return a - b;
// }
//
// const res = sub.RealizeBind(null,8,5)();

// console.info(res);

// function hello(a,b) {
// 	console.info(a,b);
// 	return function (){
// 		console.info('return');
// 		console.info(this);//始终是全局
// 	}
// }
//
// hello(99,66)

// 手写call

Function.prototype.theCall = function (ctx, ...arr) {
  if (ctx === null || ctx === undefined) {
    ctx = this; // 自动指向
  } else ctx = Object(ctx); // 原始值的this 指向该原始值的实例对象

  const tempPrototype = Symbol('hahh');
  ctx[tempPrototype] = this;
  let result = ctx[tempPrototype](...arr);
  delete ctx[tempPrototype];
  return result;
};

const x = function (a, b) {
  console.info(a, b);
};

x.theCall(null, 999, 666);
// 手写bind

// 手写apply
