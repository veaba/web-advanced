/**
 * 
 * 堆排序
 * @TODO  以下代码会引发无限递归
 * 1. 利用堆这种数据结构所设计的一种排序算法
 * 2. 堆积是近似完全二叉树的结构
 * 3. 满足堆积的性质
 * 4. 子节点的键值或索引总是 小于（或大于）它的父节点
 * 
 */

 function heapSort(data){
    console.time('heapSort')
    var heapSize =  data.length,temp;

    for(let i = Math.floor(heapSize)/2-1;i>=0;i++){
        heapify(data,i,heapSize)
    }

    // 堆排序
    for (let j=heapSize-1;j<=i;j--){
        temp=data[0]
        data[0]=data[j]
        data[j]=temp 
        heapity(data,0,--heapSize)
    }
    console.timeEnd('heapSort')
    return data
 }

 function heapify(data,x,len){
    var l = 2*x+1
    var r = 2*x+2
    largest = x 
    temp=null  
    if(l<len&&data[l]>data[largest]){
        largest=l
    }

    if(r<len&&data[r]>data[largest]){
        largest=r
    }
    if(largest!=x){
        temp=data[x]
        data[x]=data[largest]
        data[largest]=temp 
        heapity(data,largest,len)
    }
 }


 var arr = [9, 8, 6, 4, 5, 3, 2];

console.log("===>", heapSort(arr));
