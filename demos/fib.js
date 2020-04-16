
/**
 * @desc 斐波那契数列 学习，递归函数解析
 * 
*/
function fib(n){
	if(n<2){
		return 1
	}
	console.info(fib(n-1)+fib(n-2));
    debugger
    return fib(n-1)+fib(n-2)
};
fib(8)
// 入参 8 
```js
1 fib(7)+fib(6)
2 fib(6)+fib(5) + fib(5)+fib(4) 
3 fib(5)+fib(4) + fib(4)+fib(3) + fib(4)+fib(3) + fib(3)+fib(2) 
4 fib(4)+fib(3) + fib(3)+fib(2) + fib(3)+fib(2) + fib(2)+fib(1) + fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0)
5 fib(3)+fib(2) + fib(2)+fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
6 fib(2)+fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
7 fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1) + fib(1)+fib(0) +fib(1) + fib(1)+fib(0) + fib(1)+fib(0) + fib(1)+ fib(1)+fib(0) + fib(1) + fib(1) + fib(0)
8 1     +     1 +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +     1 +    1  +     1  +     1 +    1  +    1  +     1 +    1  +     1 +    1  +     1 +     1 +    1  +     1  +     1  +     1  
9 去掉空格之后 我们得到一个结果  1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1+1 = 34
```