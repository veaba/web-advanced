/**
 * 核心逻辑：函数的 return 出参不一样
*/
// 创建一个计数器
let symbolCounter = 0;

// 创建一个函数来生成唯一的标识符
function mySymbol() {
    const uniqueId = `mySymbol_${symbolCounter++}`;
    return {
        toString: function () {
            return uniqueId;
        },
        valueOf: function () {
            return uniqueId;
        }
    };
}

// 使用自定义的mySymbol
let sym1 = mySymbol();
let sym2 = mySymbol();

console.log(sym1 === sym2); // false
console.log(sym1.toString()); // mySymbol_0
console.log(sym2.toString()); // mySymbol_1

