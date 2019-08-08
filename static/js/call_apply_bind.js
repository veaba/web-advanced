/***********************
 * @desc 这是一个学习call、apply、bind的demo
 * @name JS
 * @author Jo.gel
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
const call_apply_bind = function () {
	console.info('Hello world:call_apply_bind ');
	console.info(this);
};

// 这是一个箭头函数
const call_apply_bind_arrow = () => {
	console.info('Hello world:call_apply_bind_arrow ');
	console.info(this);
};

// arg 测试

const call_apply_bind_arg = function () {
	console.info("call_apply_bind_arg:", arguments);
};
const call_apply_bind_arg_arrow = () => {
	console.info("call_apply_bind_arg_arrow:", arguments);
};

const catObj = {
	name: "小叮当",
	age: 2,
	sex: 'female'
};

const dogObj = {
	name: "二哈",
	age: 1.5,
	sex: "male"
};

// 直接指向函数
// call_apply_bind_arrow();//Hello world:call_apply_bind_arrow  {}
// call_apply_bind();//直接打印最外部的大对象

// bind 测试
// call_apply_bind_arrow.bind(catObj); // 什么都没打印
// call_apply_bind.bind(catObj); // 什么都没打印

// call测试
// call_apply_bind_arrow.call(catObj);// Hello world:call_apply_bind_arrow    {}
// call_apply_bind.call(catObj); //Hello world:call_apply_bind { name: '小叮当', age: 2, sex: 'female' }

// apply 测试
// call_apply_bind_arrow.apply(dogObj); // Hello world:call_apply_bind_arrow  {}
// call_apply_bind.apply(dogObj); // Hello world:call_apply_bind { name: '二哈', age: 1.5, sex: 'male' }

// bind 测试 arg,todo，如何写一个bind函数

// call_apply_bind_arg.bind(catObj,dogObj);//没有执行
// call_apply_bind_arg_arrow.bind(catObj,dogObj);//没有执行

// call 测试 arg
// call_apply_bind_arg.call(catObj, dogObj); // catObj没有打印到 call_apply_bind_arg: [Arguments] { '0': { name: '二哈', age: 1.5, sex: 'male' } }
// call_apply_bind_arg.call(null, catObj, dogObj); // 打印到期望值
// call_apply_bind_arg.call(this, catObj, dogObj); // 打印到期望值
//
// call_apply_bind_arg_arrow.call(catObj,dogObj); // 打印Arguments 大对象，没有打印到期望值
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
         'F:\\Github\\web-advanced-frond-end\\static\\js\\call_apply_bind.js',
        loaded: false,
        children: [],
        paths: [Array] },
     extensions:
      { '.js': [Function], '.json': [Function], '.node': [Function] },
     cache:
      { 'F:\\Github\\web-advanced-frond-end\\static\\js\\call_apply_bind.js': [Module] } },
  '2':
   Module {
     id: '.',
     exports: {},
     parent: null,
     filename:
      'F:\\Github\\web-advanced-frond-end\\static\\js\\call_apply_bind.js',
     loaded: false,
     children: [],
     paths:
      [ 'F:\\Github\\web-advanced-frond-end\\static\\js\\node_modules',
        'F:\\Github\\web-advanced-frond-end\\static\\node_modules',
        'F:\\Github\\web-advanced-frond-end\\node_modules',
        'F:\\Github\\node_modules',
        'F:\\node_modules' ] },
  '3':
   'F:\\Github\\web-advanced-frond-end\\static\\js\\call_apply_bind.js',
  '4': 'F:\\Github\\web-advanced-frond-end\\static\\js' }
  
* */

// call_apply_bind_arg_arrow.call(this,catObj,dogObj); // 打印Arguments 大对象，没有打印到期望值
// call_apply_bind_arg_arrow.call(null,catObj,dogObj); // 打印Arguments 大对象，没有打印到期望值

// apply 测试 arg

// call_apply_bind_arg.apply(catObj, dogObj);// {}空对象
// call_apply_bind_arg.apply(null, catObj);// {}空对象
// call_apply_bind_arg.apply(null, catObj, dogObj);// {}空对象
// call_apply_bind_arg.apply(null, [catObj, dogObj]);// 得到期望值 √
// call_apply_bind_arg.apply(this, [catObj, dogObj]);// 得到期望值 √
// call_apply_bind_arg.apply([catObj, dogObj]);// {}空对象

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


const list1=[12,1,456,6,16];
const max = Math.max.apply(null,list1);
console.info(max);

const min= Math.min.apply(null,list1);
console.info(min);
