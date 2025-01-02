/***********************
 * @name JS
 * @author Jo.gel
 * @date 2019/8/20 0020 下午 5:38
 ***********************/

console.time('具名函数');
var a=[66,99,44].map(function hello(item) {
	return item*2
});
console.timeEnd('具名函数');


// 不清楚和以下有什么区别：

console.time('匿名函数');
var b =[66,99,44].map(function(item) {
	return item*2
});
console.timeEnd('匿名函数');


// 而如果使用箭头函数，则为：

console.time('箭头函数');
var c=[66,99,44].map(item=>item*2);
console.timeEnd('箭头函数');


// 测试结果发现函数的执行时间： 箭头函数<匿名函数<具名函数
// -9007199254710991——9007199254710991