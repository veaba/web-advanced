/***********************
 * @name JS
 * @author veaba
 * @date 2019/8/9 0009
 * @desc  es6 symbol 联系验证文件
 ***********************/
// let s= Symbol('dddd');
// console.info(s);

// const y = Symbol('dddd');
// console.info(y);

// console.info(s==y);//false
// console.info(s===y);//false

// console.info(s.prototype); // undefined
// console.info(s.__proto__); // Symbol {}

/*入参是对象则调用对象的toString()转为字符*/
// const obj={
// };

// const obj1={
// 	toString(){
// 		return 'hahah'
// 	}
// };
//
// const sym = Symbol(obj);//Symbol([object Object])
// const sym1 = Symbol(obj1);//Symbol(hahah)
// console.info(sym);
// console.info(sym1);

// let s= Symbol('dddd');
// console.info(String(s));//Symbol(dddd)
// console.info(s.toString());//Symbol(dddd)

/* 获取描述 */
// console.info(s.description);//es2019才提供，浏览器是支持的，node尚未支持es2019


// const sm = Symbol();
// const sm1 = Symbol('biubiu');
// const abj ={
// 	[sm]:"哈哈",
// 	sm:'略略',
// 	[sm1]:'888',
// 	sm1:'99'
// };
// console.info(abj);
//
// console.info(abj[sm1]);//88
// console.info(abj.sm1);


// const COLOR_RED    = Symbol();
// const COLOR_GREEN  = Symbol();
//
// function getComplement(color) {
// 	switch (color) {
// 		case COLOR_RED:
// 			return COLOR_GREEN;
// 		case COLOR_GREEN:
// 			return COLOR_RED;
// 		default:
// 			// throw new Error('Undefined color');
// 			console.info('Undefined color');//永远都 'Undefined color
// 	}
// }
// getComplement('red');
// getComplement('green');


/*魔术字符串*/
// function getArea(shape, options) {
// 	let area = 0;
//
// 	switch (shape) {
// 		case 'Triangle': // 魔术字符串
// 			area = .5 * options.width * options.height;
// 			break;
// 		/* ... more code ... */
// 	}
//
// 	return area;
// }
//
// const area =getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
//
// console.info(area);

/*消除魔术字符串，尽量消除魔术字符串，把字符串写成一个变量*/
// const shapeType = {
// 	triangle: 'Triangle'
// };
//
// function getArea(shape, options) {
// 	let area = 0;
// 	switch (shape) {
// 		case shapeType.triangle:
// 			area = .5 * options.width * options.height;
// 			break;
// 	}
// 	return area;
// }
//
// const x =getArea(shapeType.triangle, { width: 100, height: 100 });
// console.info(x);

/*使用symbol消除魔术字符串*/
// const shapeType = {
// 	triangle: Symbol(1),
// 	triangle2: Symbol(1),
// };
//
// function getArea(shape, options) {
// 	let area = 0;
// 	// 因为引用值，所以一定会相等
// 	if(shape===shapeType.triangle){
// 		console.info('=');
// 	}else console.info('!');
// 	switch (shape) {
// 		case  6:
// 			area=6;
// 			break;
// 		case shapeType.triangle:
// 			console.info(shapeType.triangle);
//
// 			console.info(shape);
// 			area = .5 * options.width * options.height;
// 			break;
// 		case 7:
// 			area=7;
// 		default:
// 			console.info(66);
// 	}
// 	return area;
// }
//
// const x =getArea(shapeType.triangle2, { width: 100, height: 100 });
// console.info(x);

/*属性名遍历*/
// const obj = {
// 	c: "哈哈",
// 	d: '溜溜',
// 	[Symbol(55)]: "香港"
// };
// const a = Symbol('a');
// const b = Symbol('b');
// obj[a] = "hello";
// obj[b] = "world";
// console.info(obj); // { [Symbol(a)]: 'hello', [Symbol(b)]: 'world' }
// const objectSymbols = Object.getOwnPropertySymbols(obj);
// console.info(objectSymbols);//[ Symbol(a), Symbol(b) ]
//
// console.info(obj[a]); //hello
//
//
// for (let item in obj){
// 	console.info(item);//c、d 没办法打印出来Symbol属性名的值
// }


// console.info(Reflect.ownKeys(obj));//[ 'c', 'd', Symbol(55), Symbol(a), Symbol(b) ] 返回所有类型的键名

/*内部的方法，且不被常规遍历到*/
// const size = Symbol('size');
//
// class Collection {
// 	constructor() {
// 		this[size] = 0;
// 	}
//
// 	add(item) {
// 		this[this[size]] = item;
// 		this[size]++;
// 	}
//
// 	demos sizeOf(instance) {
// 		return instance[size];
// 	}
// }
//
// let x = new Collection();
// console.info(Collection.sizeOf(x));//1
//
// x.add('hello');
//
// console.info(Collection.sizeOf(x));//1
//
// console.info(Object.keys(x));//['0']
// console.info(Object.getOwnPropertyNames(x)); //['0']
// console.info(Object.getOwnPropertySymbols(x));//[ Symbol(size) ]
//
// x.size=8888;
//
// console.info(x);//Collection { '0': 'hello', size: 8888, [Symbol(size)]: 1 }


/*Symbol.for()、Symbol.keyFor()*/

// let s1 = Symbol.for('a1');
// let s2 = Symbol.for('b1');
// let s3 = Symbol.for('a1');
//
// console.info(s1);
// console.info(s2);
// console.info(s3);
//
// console.info(s1 === s2); // false
// console.info(s1 === s3); // true
//
// const arr=[54654,,55];
// const result =Array.apply(null,arr);
// console.info(result);
// const obj={
// 	f(){
// 		console.info(this===obj);
// 	}
// };
// const f = function(){
// 	obj.f.apply(obj)
// };
// $('#button').on('click',f);
// console.info(obj);
//

// const ob1 = {};
// const obj2 = {
// 	name:1
// };
// console.info(ob1 === obj2); // false
//
// const fn = function () {
// 	return this
// };
// console.info(fn.call(obj2)===obj2);
//
// console.info(obj2===obj2);

// console.info(ob1===ob1);

const d = new Date();
console.info(d.getTime());
console.info(new Date().getTime());

const p = d.getTime;

console.info(p.call(d));
console.info(p.call(new Date));
