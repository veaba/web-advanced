/**
 * @desc Proxy 代理 实验
 * @todo Proxy第一个参数是干啥的？
 * 
*/

const obj=new Proxy({},{
    get:function(target,propKey,receiver){
        console.log(`getting ${propKey}!`)
        return Reflect.get(target,propKey,receiver)
    },
    set:function(target,propKey,value,receiver){
        console.log(`setting ${propKey}!`)
        return Reflect.set(target,propKey,value,receiver)
    }
})