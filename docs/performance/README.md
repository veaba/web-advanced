---
sidebar: auto
---
# 性能提升
网页性能管理详解 ——阮一峰 http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html 

## 前端常见的性能优化请求手段/加快资源的加载速度/减少白屏事件
  - CDN 内容分发
  - css Sprite  图片合并
  - Compress/Gzip 资源文件压缩
  - Async/Defer 异步加载
  - HTTP Cache HTTP 缓存
  ....
## html/css 重绘回流(Repaint、Reflow)

- display:none 不会发生回流和重绘

回流(reflow)：布局引擎为frame(框架)计算图形的过程,一个frame回流会导致所有父节点以及后续元素都会回流。
  - 理论上发生回流的原因
    - 初始化(initial)。dom载入后第一次回流，遍历所有frame
    - 渐进(incremental)。一个frame发生渐进reflow时，前面没变，自己内部发生变化。
    - 改变大小。容器边界发生变化，内部没变，复用内部状态
    - 样式改变。整个frame都会遍历
    - dirty。（脏的）已缓存了多个子元素的渐进回流时。
  - 具体的操作原因：
    - 窗口大小变化
    - 更改文档默认字体
    - 样式表改变
    - 元素内容变化，尤其是输入控件
      - input textarea 
    - dom操作
    - 渐进回流，会使浏览器将渐进队列冲洗，立即执行回流
      - offsetWidth、offsetHeight计算。 整个可视区域大小，包括border scrollBar在内
      - width、height计算。
      - clientWidth计算 内部可视区域大小。
      - scrollTop计算。元素内容向上滚动了多少像素。
      - scrollHeight计算。元素内容的高度，包括溢出的部分
  - 避免回流
    - 避免逐项更改style
    - 避免循环操作dom 
    - 避免循环读取offsetLeft 等属性，并在循环之前存起来
    - 绝对定位具有复杂变化的动画元素。position:absolute 脱离文档流，否则会引起父元素以及后续元素的大量回流。css3 transition 性能不错
```js
// 一次bad 的demo

var dom = document.body.style;
dom.padding="2px";// 回流+重绘
dom.border="1px solid";//回流+重绘
dom.border="blue";//重绘
dom.backgroundColor="#ccc";//重绘
dom.fontSize="14px";//重绘+回流
document.body(document.createTextNode('abcdev!'));
```
解决办法

1. 写style 更改class

```js
document.body.className="dom"
```

```html
.dom {
  padding:2px;
  border:1px solid;
  background-color:#ccc;
  font-size:14px
}
```

2. 一次添加全部的style操作

```js
var dom = document.body.style;
dom="padding:2px;border:1px solid;background-color:#ccc;font-size:14px";
```
重绘(repaint)：发生在元素的可见性发生变化时产生重新渲染的现象，回流必然引起重绘:
  - background
  - color


## 常见的内存泄露问题的
### 闭包在IE9之前的版本会导致一些特殊的问题。

```js

  // 内存泄漏
  function click1(){
    let element = document.querySelector('.test');
    element.onclick=function(){
      console.log(element.id)
    }
  }
  // fix 版本
  function click2(){
    let element2 = document.querySelector('.test');
    let id = element2.id;// 引用赋值，消除变量循环引用
    element2.onclick=function(){
      console.log(id)
    };
    // 设置为null，解除对DOM对象的引用，减少计数
    element2=null
  }
  
```
