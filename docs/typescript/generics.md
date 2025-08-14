---
sidebar: auto
---

# TypeScript 泛型

原因：

为什么要有泛型变量、泛型函数、泛型类型呢？

## 概念

**泛型是什么**：TODO

**泛型变量**：常用 `T` 表示，当然，你也可以使用 `U` 或任意

**泛型类型**：泛型 `T` 作为元素，整体作为其他类型子元素类型的情况

**泛型类**：`class GenericNumberClass <T>`，叫 `泛型类`，(2020 年 12 月 20 日 02:59:53 发现 `deno` 无法运行 `泛型类` demo)

**泛型约束**：存在非法访问属性的情况，比如 `.length`

## 泛型的提出

在 `TypeScript` 中，为了解决函数的 `输入类型` 等同于 `返回类型` 而提出的一种新的声明方法

如果想要实现，输入的类型等于输出的类型，可能这么写，实例 1：

```typescript
function inputTypeEqualOutputType(args: number): number {
  return args;
}
console.log('ret==>', inputTypeEqualOutputType(2020));
```

如果想返回其他类型，就不得不再写一遍，定义输入和输出类型一致的函数声明。

再或者，使用 `any` 来实现：

```typescript
function useAnyType(args: any): any {
  return args;
}
console.log('any type:', useAnyType('any type'));
```

为了重用类型声明，以及表述输入和输出类似是一致的情况，TypeScript 提出的一种新的类型声明的方式——泛型。

常用 `<T>` 替代，现在改写实例 1：

```typescript
function inputTypeEqualOutputType<T>(args: T): T {
  return args;
}
console.log('ret==>', inputTypeEqualOutputType(2020));
```

这样就只需要写一遍，就可以支持多种入参类型使用：

```typescript
console.log('1. null:', inputTypeEqualOutputType(null));
console.log('2. undefined:', inputTypeEqualOutputType(undefined));
console.log('3. string:', inputTypeEqualOutputType('2020'));
console.log('4. number:', inputTypeEqualOutputType(2020));
console.log('5. boolean:', inputTypeEqualOutputType(true));
console.log('6. symbol:', inputTypeEqualOutputType(Symbol(11)));
console.log('7. object:', inputTypeEqualOutputType({ year: 2020 }));
console.log(
  '8. function:',
  inputTypeEqualOutputType(() => {})
);
console.log('9. array:', inputTypeEqualOutputType([2020]));
```

以上的完整写法，复杂的情况可能需要完整写法，一般情况，编译器可自动推断：

```typescript
console.log('1. null:', inputTypeEqualOutputType<null>(null));
console.log('2. undefined:', inputTypeEqualOutputType<undefined>(undefined));
console.log('3. string:', inputTypeEqualOutputType<string>('2020'));
console.log('4. number:', inputTypeEqualOutputType<number>(2020));
console.log('5. boolean:', inputTypeEqualOutputType<boolean>(true));
console.log('6. symbol:', inputTypeEqualOutputType<symbol>(Symbol(11)));
console.log('7. object:', inputTypeEqualOutputType<object>({ year: 2020 }));
console.log(
  '8. function:',
  inputTypeEqualOutputType<Function>(() => {})
);
console.log('9. array:', inputTypeEqualOutputType<number[]>([2020]));
```

## 泛型变量

但是，此时的泛型，其实等同于入参类型是 `any`，返回类型也是 `any`，这意味着，输入类型是数字，打印 `.length` 是错误的：

```typescript
function inputTypeEqualOutputType(args: any): any {
  console.log('length==>', args.length);
  return args;
}
console.log('error==>:', inputTypeEqualOutputType(2020));
```

### T 作为其他类型的元素类型

`T` 类型也可以作为单独的元素类型被其他类型使用，比如数组：

```typescript
function defineByArray<T>(arg: T[]): T[] {
  console.log('arg array length ==>', arg.length);
  return arg;
}
console.log('array element type T==>', defineByArray([2020, 3020]));
```

## 泛型类型

声明泛型类型：

```typescript
function defineType<T>(arg: T): T {
  return arg;
}

let myDefineType: <T>(arg: T) => T = defineType; // 使用变量来接受函数
```

使用带有调用签名的对象字面量来定义泛型函数：

```typescript
function defineTypeObject<T>(arg: T): T {
  return arg;
}

let myDefineTypeObject: { <T>(arg: T): T } = defineTypeObject;
```

### 泛型接口

与此同时，也可以将对象字面量单独拎出来作为一个接口使用，于是就有了**泛型接口**：

```typescript
interface DefineType {
  <T>(arg: T): T;
}

function defineType<T>(arg: T): T {
  return arg;
}

let myDefineType: DefineType = defineType;
```

把泛型参数作为整个接口的参数，让用户知道具体是哪个泛型类型 (比如：`DefineType<string>` 而非 `DefineType`)，使得接口里的其他成员也能知道参数的类型：

```typescript
interface DefineType<T>{
    (arg:T):T
}
function defineType<T>(arg:T):T{
    return arg
}

let myDefineType:DefineType<number>:defineType

```

此时，不再描述泛型函数，而是把非泛型函数前面作为泛型类型的一部分，当使用 `define` 函数时候，还得需要传入类型参数来指定泛型类型 (这里是：`number`)，锁定了之后代码里使用的类型。

这对于描述 `哪部分类型` 属于 `泛型部分`，理解 `何时把参数` 放在 `调用签名里` 和 `何时放在接口上` 是很有帮助的。

## 泛型类

- 无法创建 `泛型枚举`

- 无法创建 `泛型命名空间`

`泛型类` 与 `泛型接口` 差不多，泛型类使用 `<>` 括起泛型类型，跟在类名后面：

(注意：此处使用 `Deno` 运行，发现错误是 `Property 'zeroValue' has no initializer and is not definitely assigned in the constructor.`)

```typescript
class GenericNumberClass <T>{
    zeroVal :T,
    add:(x:T,y:T)=>T
}

let myGenericNumberClass = new GenericNumberClass<number>()

myGenericNumberClass.zeroVal =0

myGenericNumberClass.add = function(x,y) {
    return x +y
}

```

此时，`GenericNumberClass` 并非只限制使用 `number` 类型，也可以使用 `string`：

```typescript

class GenericNumberClass <T>{
    zeroVal :T,
    add:(x:T,y:T)=>T
}

let myGenericString = new GenericNumberClass<string>()

myGenericString.zeroVal = "2020"

myGenericString.add = function(x,y) {
    return x +y
}

console.log(myGenericString.add(myGenericString.zeroVal,"hello world"))

```

**类包含两部分：`静态部分` 与 `实例部分`，`泛型类` 属于实例部分的类型，所以类的静态属性不能使用这个 `泛型类型`**。

## 泛型约束

泛型声明，编译器并不能完全保证错误，比如当访问非法的属性时：

```typescript
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // number 不存在 length
  return arg;
}

loggingIdentity(2020);
```

所以，这需要我们限制函数，不要任意去访问带 `.length` 属性的所有类型。

仅当存在这个 `.length` 属性时，在允许，于是出现了 `泛型约束`，下面是使用 `extends` 关键词实现约束：

```typescript
interface LengthWise {
  length: number;
}

function lengthFn<T extends LengthWise>(arg: T): T {
  console.log('T length ==>', arg.length);
  return arg;
}

console.log('number no length ==>', lengthFn(11)); // 错误

console.log('string has length ==>', lengthFn('11'));

console.log('string has length ==>', lengthFn({ length: 11, age: 99 }));
```

当不使用 `泛型约束` 前，编译器报错 `error TS2339: Property 'length' does not exist on type 'T'.`

使用了 `泛型约束` 后，编译器报错 `error TS2345: Argument of type '11' is not assignable to parameter of type 'LengthWise'.`

### 在泛型约束中使用类型参数

声明 `类型参数` 且被另外一个类型参数所约束。比如从对象中获取某个属性名，此时需要确保存在这个属性名：

```typescript
function getProp<O, K extends keyof O>(obj: O, key: K) {
  return obj[key];
}

const x1 = { a: 1, b: 22, c: 33 };

console.log('a==>', getProp(x1, 'a'));
console.log('m==>', getProp(x, 'm')); 
// 错误：Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c"'. console.log("m==>",getProp(x1,"m"))
```

### 泛型里使用类类型

`TypeScript` 使用泛型创建工厂函数是，需要**引用构造函数的类类型**，比如：

```typescript
function CreateClass<T>(c: { new (): T }): T {
  return new c();
}
```

使用原型类型推断并约束 `构造函数` 与 `类实例` 的关系：

```typescript
class AClass {
  aName: boolean;
}

class BClass {
  bName: string;
}

class CClass {
  cName: number;
}

class DClass extends CClass {
  dName: AClass;
}

class EClass extends CClass {
  eClass: AClass;
  dName: BClass;
}

function createInstance<A extends CClass>(c: new () => A): A {
  return new c();
}

createInstance(EClass).cName.bName; // 类型检查
createInstance(DClass).cName.aName; // 类型检查
```
