
// let ob = {
//     '1': '∞',
//     '2': 'abc',
//     '3': 'def',
//     '4': 'ghi',
//     '5': 'jkl',
//     '6': 'mno',
//     '7': 'pqrs',
//     '8': 'tuv',
//     '9': 'wxyz',
//     '0': '+',
//     '*': ' ',
//     '↑': '#'
// }
// let arrNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, '*', '0', '↑'];//∞ + ' ' #
// function func(string) {
//     let stringData = (string.toString()).split('') //切割为数组
//     let len = stringData.length || 1;
//     let arrCount = []
//     // 入参多少次数据?
//     for (let i = 0; i < len; i++) {
//         let tempArr = ob[stringData[i]].split('')//值的数组
//         arrCount.push(tempArr)
//     }
//     console.info(arrCount)
//     return arrCount
// }
// func(194)



/*********************************************/
// var arr = [];
// var a = ['b', 'c']; var b = ['e', 'f', 'g','h'];
// for (let i = 0; i < 2; i++) {
//     for (let k = 0; k < b.length; k++) {
//         arr.push(a[i]+b[k])
//     };
// };
// console.info(arr)

// ['a']、 ['b','c']、['d','e','f']  abd,abe,abf,acd,ace,acf= 2x3=6的长度

let arr1= [ [ '∞' ], [ 'w', 'x', 'y', 'z' ], [ 'g', 'h', 'i' ] ]
let temp=[]
function p1(arr) {
    let s=''
    for (let i = 0; i < arr.length; i++) {
        s = s+arr[i]
        temp.push(s)
        return p1(arr[i])
    }
}
p1(arr1)



// Math.round(Math.random())?Math.round(Math.random()):Math.round(Math.random())-1