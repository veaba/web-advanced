# 关键字

- 如果使用关键字 name 声明一个值，只能是 string 类型！！！

## 关键字、保留字分类

- 操作符关键字
  - `instanceof`
  - `typeof`
  - `delete`
- 类型关键字
- 语法关键字

  - `break`
  - `do`
  - `case`
  - `else`
  - `new`
  - `catch`
  - `finally`
  - `return`
  - `continue`
  - `for`
  - `switch`
  - `while`
  - `debugger *`
  - `this`
  - `with` 设置特定对象中的作用域
  - `in`
  - `try`

  ```js
  const s = 'Hello';
  with (s) {
    console.log(length);
  }
  // with 语句是运行缓慢的代码块，尤其是在已设置了属性值时。大多数情况下，如果可能，最好避免使用它。
  ```

  - `default`
  - `if`
  - `throw`

- 声明关键字

  - `function`
  - `void`
  - `var`

- 算术操作符

### ECMA-262 保留字

- `abstract`
- `enum`
- `int`
- `short`
- `boolean`
- `export`
- `interface`
- `static`
- `byte`
- `extends`
- `long`
- `super`
- `char`
- `final`
- `native`
- `synchronized`
- `class`
- `float`
- `package`
- `throws`
- `const`
- `goto`
- `private`
- `transient`
- `debugger`
- `implements`
- `protected`
- `volatile`
- `double`
- `import`
- `public`

### 第五版非严格模式下缩减为

- `class`
- `enum`
- `extends`
- `super`
- `const`
- `export`
- `import`

### 严格模式下，保留字限制

- `implements`
- `package`
- `public`
- `interface`
- `private`
- `static`
- `let`
- `protected`
- `yield`
