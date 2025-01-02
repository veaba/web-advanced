/**
 * 原型继承
 */

function Parent() {
  this.name = 'parent';
}

Parent.prototype.say = function () {
  console.log('hello');
};

function Child() {
  this.age = 18;
}

Child.prototype = Object.create(Parent.prototype); // Child 继承 Parent
Child.prototype.constructor = Child; // 重置 constructor
Child.prototype.cook = function () {
  console.log('cook');
};

// 此时， child 函数将拥有 cook 和 say 方法
let child = new Child();
child.cook();
child.say();
