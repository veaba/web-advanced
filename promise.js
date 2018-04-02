/***********************
 * @name JS
 * @author Jo.gel
 * @date 2018/4/2
 ***********************/

 //P(fn) fn typeof 为function

// 1 3 4 2 5
function P(fn) {
	console.info('P promise')
	var value = null;
	var events = [];
	debugger
	this.then = function (f) {
		debugger
		events.push(f);
		return this;
	}
	function resolve(newValue) {
		var f = events.shift();
		debugger
		f(newValue, resolve);
	}
	fn(resolve);
}

function a() {
	debugger
	console.info('function a')
	return new P(function (resolve) {
		debugger
		console.log("ge1");
		setTimeout(function () {
			debugger
			console.log("get2");
			resolve(1);
		}, 6000)
	});
}
a().then(function (value, resolve) {
	console.log("get3");
	debugger
	setTimeout(function () {
		console.log("get 4");
		debugger
		resolve(2);
	}, 3000)
}).then(function (value, resolve) {
	console.log('get 5：' + value)
	debugger
})