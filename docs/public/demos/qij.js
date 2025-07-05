
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

let arr1 = [['∞'], ['w', 'x', 'y', 'z'], ['g', 'h', 'i']]
let temp = []
function p1(arr) {
    let s = ''
    for (let i = 0; i < arr.length; i++) {
        s = s + arr[i]
        temp.push(s)
        return p1(arr[i])
    }
}
p1(arr1)



// Math.round(Math.random())?Math.round(Math.random()):Math.round(Math.random())-1

/**数据动态绑定基本实现 **/
let obj = {
    key_1: 1,
    key_2: 2
}
function func(key) {
    console.info(key + '的值子发生变化' + this[key])
}

function bindData(obj, func) {
    for (let item in obj) {
        Object.defineProperty(obj, item, {
            get: function () {
                return obj.item;
            },
            set: function (value) {
                obj.item = value;
                func.bind(obj)(item);
            }
        })
   }
}
bindData(obj, func)
obj.key_1 = 2;//此时自动输出 变化为2
obj.key_2 = 1 //此时自动输出变化为1

/** 对json 数据结构进行处理，要求找到child 超过两个的name值 **/ 

let data={
    name:'jack',
    child:[
        {name:'jack1'},
        {name:'jack2',child:[
            {name:'jack2_1',child:{name:'jack2-1-1'}},
            {name:'jack2_2'}
        ]},
        {name:'jack3',child:{name:'jack3-1'}}
    ]
};
Object.keys(data)//只能取同级的keys值