//  不用泛型，需求：输入数字，返回数字
function identify(arg: number): number {
  return arg;
}

// # 泛型变量
const x = identify(11);
console.log(`不用泛型==>`, x);

// 使用any，需求，输入任何，返回任何
function useAnyIdentify(arg: any): any {
  return arg;
}

const anyRet = useAnyIdentify("any arg?");
console.log(`使用any泛型==>`, x);

// 新需求：输入数字，返回任何呢？
// 或者说，如果想输入的类型是：`number`、`string`,但不限制返回任何类型？
// ==> 需要：一种方法使返回值和传入参数类型是一致的
// 于是有了，一个概念 `类型变量`，一种特殊的变量，只用于表示类型而不是值

// T 代表什么？代表 类型变量，此时 specifyType 就是泛型
// 定义泛型函数之后，有两个使用方法：

function specifyType<T>(arg: T): T {
  return arg;
}
let output = specifyType<string>("my string"); // 第一种：全称。除非复杂情况下

let simpleOutput = specifyType("my string"); // 第二种：简写，编译器会自动推断

// 使用泛型变量：数字
function lenSpecify<T>(arg: T): T {
  // 如果入参是 `number` 是没有length，此时报错
  //   console.log(arg.length);
  return arg;
}

// 使用泛型变量：数组
function arraySpecify<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}

// 等同
function arraySpecifyT<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

// # 泛型类型：
function inputTypeEqualOutputType<T>(args: T): T {
  return args;
}

console.log("1. null:", inputTypeEqualOutputType(null));
console.log("2. undefined:", inputTypeEqualOutputType(undefined));
console.log("3. string:", inputTypeEqualOutputType("2020"));
console.log("4. number:", inputTypeEqualOutputType(2020));
console.log("5. boolean:", inputTypeEqualOutputType(true));
console.log("6. symbol:", inputTypeEqualOutputType(Symbol(11)));
console.log("7. object:", inputTypeEqualOutputType({ year: 2020 }));
console.log(
  "8. function:",
  inputTypeEqualOutputType(() => {})
);
console.log("9. array:", inputTypeEqualOutputType([2020]));

// 完整写法
// console.log("1. null:", inputTypeEqualOutputType<null>(null));
// console.log("2. undefined:", inputTypeEqualOutputType<undefined>(undefined));
// console.log("3. string:", inputTypeEqualOutputType<string>("2020"));
// console.log("4. number:", inputTypeEqualOutputType<number>(2020));
// console.log("5. boolean:", inputTypeEqualOutputType<boolean>(true));
// console.log("6. symbol:", inputTypeEqualOutputType<symbol>(Symbol(11)));
// console.log("7. object:", inputTypeEqualOutputType<object>({year:2020}));
// console.log("8. function:", inputTypeEqualOutputType<Function>(()=>{}));
// console.log("9. array:", inputTypeEqualOutputType<number[]>([2020]));

function defineByArray<T>(arg: T[]): T[] {
  console.log("arg array length ==>", arg.length);
  return arg;
}
console.log("array element type T==>", defineByArray([2020, 3020]));

function defineType1<T>(arg: T): T {
  return arg;
}

let myDefineType: <T>(arg: T) => T = defineType1;

console.log("myDefineType===>", myDefineType(11));

// 泛型接口

interface DefineType2 {
  <T>(arg: T): T;
}

function defineType2<T>(arg: T): T {
  return arg;
}

let myDefineType2: DefineType2 = defineType2;

console.log("myDefineType2===>", myDefineType2(2020 - 12 - 20));

// 泛型类
// class GenericNumberClass<T>{
//     zeroValue: T;
//     add: (x: T, y: T) => T;
// }

// let myGenericNumber = new GenericNumberClass<number>()
// myGenericNumber.zeroVal =0

// myGenericNumber.add = function(x,y) {
//     return x +y
// }

// console.log("number class ==>",myGenericNumber.add(myGenericNumber.zeroVal,2020))
// let myGenericString = new GenericNumberClass<string>()
// myGenericString.zeroVal = "2020"

// myGenericString.add = function(x,y) {
//     return x +y
// }

// console.log("string class ==>",myGenericString.add(myGenericString.zeroVal,"hello world "))

// interface LengthWise{
//     length:number
// }

// function lengthFn<T extends LengthWise>(arg:T):T{
//     console.log("T length ==>",arg.length)
//     return arg
// }

// console.log("number no length ==>",lengthFn({length:11,age:99}))

// console.log("string has length ==>",lengthFn("11"))

// function getProp<O, K extends keyof O>(obj: O, key: K) {
//   return obj[key];
// }

// const x1 = { a: 1, b: 22, c: 33 };

// console.log("a==>", getProp(x1, "a"));
// // console.log("m==>",getProp(x1,"m"))

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}

class Animal {
  numLegs: number;
}

class Bee extends Animal {
  keeper: BeeKeeper;
}

class Lion extends Animal {
  keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Lion).keeper.nametag; // typechecks!
createInstance(Bee).keeper.hasMask; // typechecks!
