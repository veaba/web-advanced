---
sidebar: auto
---

# 事件

> http://www.runoob.com/jsref/dom-obj-event.html

## 事件的传播

- 第一阶段。从 window 对象传导到目标节点（上层传递到下层），捕获阶段 capture
- 第二阶段。在目标节点触发，目标阶段 target
- 第三阶段。目标节点传导回 window 对象（底层传回下层），冒泡阶段 bubbling

## 事件代理

- 事件在冒泡阶段，始终会传导到父级别，所以，在父级别定义监听函数即可。此行为叫 事件的代理

```js
const ul = document.querySelector('ul');
ul.addEventListener('click', (event) => {
  if (event.target.tagName.toLowerCase() === 'li') {
    console.info('这就是li');
  }
});
```

- 如需要以上代码不需要传播到 window，则可以使用 stopPropagation 方法阻止传播
  - stopPropagation 方法，阻止继续向下传播
  - 事件冒泡到 p，不再继续向上冒泡

```js
p.addEventListener(
  'click',
  () => {
    if (event.target.tagName.toLowerCase() === 'li') {
      console.info('这就是li');
      event.stopPropagation();
    }
  },
  true
);
```

## 鼠标

| 事件          | 描述                                 | 例子                                 |
| ------------- | ------------------------------------ | ------------------------------------ |
| `onclick`     |                                      | `document.body.onclick=function(){}` |
| oncontextmenu | 对内容右键，firefox 支持 contentmenu |                                      |
| onmousedown   |                                      |                                      |
| onmouseenter  |                                      |                                      |
| onmouseleave  |                                      |                                      |
| onmousemove   |                                      |                                      |
| onmouseout    |                                      |                                      |
| onmouseup     |                                      |                                      |
|               |                                      |                                      |

## 键盘

| 事件       | 描述 | 例子 |
| ---------- | ---- | ---- |
| onkeydown  |      |      |
| onkeypress |      |      |
| onkeyup    |      |      |
|            |      |      |

## 框架/对象 事件

| 事件           | 描述                          | 例子 |
| -------------- | ----------------------------- | ---- |
| onabort        |                               |      |
| `onbeforeload` |                               |      |
| `onerror`      | 图片 src 加载错误，常用       |      |
| onhashchange   |                               |      |
| `onload`       |                               |      |
| onpageshow     | 一打开页面就出现，一般在 body |      |
| onpagehide     | 用户离开网页时触发            |      |
| onresize       |                               |      |
| onscroll       |                               |      |
| onunload       | body frameset                 |      |
|                |                               |      |

## 表单事件

| 事件       | 描述           | 例子 |
| ---------- | -------------- | ---- |
| onblur     |                |      |
| onchange   |                |      |
| onfocus    |                |      |
| onfocusin  |                |      |
| onfocusout |                |      |
| oninput    |                |      |
| onreset    |                |      |
| onsearch   | input="search" |      |
| onselect   | 选取文档       |      |
| onsubmit   |                |      |
|            |                |      |

## 剪切板

| 事件    | 描述 | 例子 |
| ------- | ---- | ---- |
| oncopy  |      |      |
| oncut   |      |      |
| onpaste |      |      |
|         |      |      |

### 打印事件

| 属性          | 描述 | 例子 |
| ------------- | ---- | ---- |
| onafterprint  |      |      |
| obbeforeprint |      |      |
|               |      |      |

## 拖动事件

| 事件        | 描述 | 例子 |
| ----------- | ---- | ---- |
| ondrag      |      |      |
| ondraged    |      |      |
| ondragenter |      |      |
| ondragleave |      |      |
| ondragover  |      |      |
| ondragstart |      |      |
| ondrop      |      |      |
|             |      |      |

## 多媒体(Media)事件

| 事件             | 描述 | 例子 |
| ---------------- | ---- | ---- |
| onabort          |      |      |
| oncanplay        |      |      |
| oncanplaythrough |      |      |
| ondurationchange |      |      |
| onemptied        |      |      |
| onended          |      |      |
| onerror          |      |      |
| onloadeddata     |      |      |
| onloadedmetadata |      |      |
| onloadstart      |      |      |
| onpause          |      |      |
| onplay           |      |      |
| onplaying        |      |      |
| onprogress       |      |      |
| onratechange     |      |      |
| onseeked         |      |      |
| onstalled        |      |      |
| onsuspend        |      |      |
| ontimeupdate     |      |      |
| onvolumechange   |      |      |
| onwaiting        |      |      |
|                  |      |      |

## 动画事件

| 事件              | 描述     | 例子 |
| ----------------- | -------- | ---- |
| animationed       |          |      |
| animationteration | 重复播放 |      |
| animationstart    |          |      |
|                   |          |      |

## 过渡事件

| 事件          | 描述 | 例子           |
| ------------- | ---- | -------------- |
| transitionend |      | css 过渡后触发 |
|               |      |                |

## 其他事件

| 事件                  | 描述                                          | 例子 |
| --------------------- | --------------------------------------------- | ---- |
| onmeesage             | websocket、 web worker、 event source 、frame |      |
| onmousewheel->onwheel |                                               |      |
| ononline              |                                               |      |
| onoffine              |                                               |      |
| onpopstate            |                                               |      |
| onshow                |                                               |      |
| onstorage             |                                               |      |
| ontoggle              | `<details>`                                   |      |
| onwheel               | 滚轮                                          |      |
|                       |                                               |      |

## 事件对象

| 属性          | 方法              | 静态变量        | 描述                               | 例子 |
| ------------- | ----------------- | --------------- | ---------------------------------- | ---- | --- |
|               |                   | CAPTURING-PHASE | 当前事件阶段为——捕获阶段           |      |
|               |                   | AT-TARGET       | 当前事件时目标阶段，在评估目标事件 |      |
|               |                   | BUBBLING-PHASE  | 当前的事件为——冒泡阶段             |      |
| bubbles       |                   |                 |                                    |      |
| cancelable    |                   |                 |                                    |      |
| currentTarget |                   |                 |                                    |      |
| eventPhase    |                   |                 |                                    |      |
| target        |                   |                 |                                    |      |
| timeStamp     |                   |                 |                                    |      |
| type          |                   |                 |                                    |      |
|               | initEvent()       |                 |                                    |      |
|               | `prevenDefault()` |                 |                                    |      |
|               | `stopPropation()` |                 |                                    |      |
|               |                   |                 |                                    |      |     |

## 目标事件对象

| 属性 | 方法                  | 描述                                                    | 例子 |
| ---- | --------------------- | ------------------------------------------------------- | ---- |
|      | `addEventListener()`  | 允许在目标事件中监听事件（IE8=attachEvent()）           |      |
|      | dispatchEvent()       | 发送事件到监听器(IE8=fireEvent())                       |      |
|      | removeEventListener() | 运行一次注册在事件目标上的监听事件（IE8=detachEvent()） |      |
|      |                       |                                                         |      |

## 事件监听对象

| 属性 | 方法          | 描述                         | 例子 |
| ---- | ------------- | ---------------------------- | ---- |
|      | handleEvent() | 把任意对象注册为事件处理程序 |      |
|      |               |                              |      |

## 文档事件对象

| 属性 | 方法          | 描述 | 例子 |
| ---- | ------------- | ---- | ---- |
|      | createEvent() |      |      |
|      |               |      |      |

## 鼠标/键盘事件对象

| 属性          | 方法                | 描述                                             | 例子 |
| ------------- | ------------------- | ------------------------------------------------ | ---- | --- |
| altKey        |                     |                                                  |      |
| button        |                     | event.button 可以知道是鼠标的那个按键 左、右、中 |      |
| clientX       |                     |                                                  |      |
| clientY       |                     |                                                  |      |
| ctrlKey       |                     |                                                  |      |
| Location      |                     |                                                  |      |
| charCode      |                     |                                                  |      |
| key           |                     |                                                  |      |
| keyCode       |                     |                                                  |      |
| which         |                     |                                                  |      |
| metaKey       |                     |                                                  |      |
| relatedTarget |                     |                                                  |      |
| screenX       |                     |                                                  |      |
| screenY       |                     |                                                  |      |
| shiftKey      |                     |                                                  |      |
|               | initMouseEvent()    | 初始化鼠标事件对象                               |      |     |
|               | initKeyboardEvent() | 初始化键盘事件对象                               |      |     |
|               |                     |                                                  |      |     |
