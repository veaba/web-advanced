// 定义一个函数来模拟类
function createClass(constructor, methods, staticMethods) {
  // 为构造函数添加原型方法
  if (methods) {
      Object.keys(methods).forEach((methodName) => {
          constructor.prototype[methodName] = methods[methodName];
      });
  }

  // 为构造函数添加静态方法
  if (staticMethods) {
      Object.keys(staticMethods).forEach((methodName) => {
          constructor[methodName] = staticMethods[methodName];
      });
  }

  return constructor;
}

// 模拟一个类
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 类的实例方法
const personMethods = {
  sayHello() {
      console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
  }
};

// 类的静态方法
const personStaticMethods = {
  fromJSON(json) {
      return new Person(json.name, json.age);
  }
};

// 创建模拟的类
const MyPerson = createClass(Person, personMethods, personStaticMethods);

// 创建实例
let person = new MyPerson('Alice', 30);
person.sayHello(); // 输出: Hello, my name is Alice and I'm 30 years old.

// 调用静态方法
let newPerson = MyPerson.fromJSON({ name: 'Bob', age: 25 });
newPerson.sayHello(); // 输出: Hello, my name is Bob and I'm 25 years old.