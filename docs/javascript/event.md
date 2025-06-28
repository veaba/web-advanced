---
sidebar: auto
---

# 事件

> http://www.runoob.com/jsref/dom-obj-event.html

## 事件的传播

- 第一阶段。从 window 对象传导到目标节点 (上层传递到下层)，捕获阶段 capture
- 第二阶段。在目标节点触发，目标阶段 target
- 第三阶段。目标节点传导回 window 对象 (底层传回下层)，冒泡阶段 bubbling

## 事件代理

- 事件在冒泡阶段，始终会传导到父级别，所以，在父级别定义监听函数即可。此行为叫事件的代理

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

## 框架/对象事件

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

## 多媒体 (Media) 事件

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

| 属性          | 方法                | 描述                                            | 例子 |
| ------------- | ------------------- | ----------------------------------------------- | ---- | --- |
| altKey        |                     |                                                 |      |
| button        |                     | event.button 可以知道是鼠标的那个按键左、右、中 |      |
| clientX       |                     |                                                 |      |
| clientY       |                     |                                                 |      |
| ctrlKey       |                     |                                                 |      |
| Location      |                     |                                                 |      |
| charCode      |                     |                                                 |      |
| key           |                     |                                                 |      |
| keyCode       |                     |                                                 |      |
| which         |                     |                                                 |      |
| metaKey       |                     |                                                 |      |
| relatedTarget |                     |                                                 |      |
| screenX       |                     |                                                 |      |
| screenY       |                     |                                                 |      |
| shiftKey      |                     |                                                 |      |
|               | initMouseEvent()    | 初始化鼠标事件对象                              |      |     |
|               | initKeyboardEvent() | 初始化键盘事件对象                              |      |     |
|               |                     |                                                 |      |     |

## 焦点事件

> 判断浏览器是否支持：`document.implementation.hasFeature("FocusEvent"),"3.0"`

| 触发次序 | 冒泡事件    | 非冒泡事件 | 描述                       | 用例 |
| -------- | ----------- | ---------- | -------------------------- | ---- |
| 1        | focusout    |            | 失去焦点大多浏览器         |      |
| 2        | focusint    |            | 获得焦点，大多浏览器       |      |
| 3        |             | `blur`     | 元素失去焦点，浏览器都支持 |      |
| 4        | DOMFocusOut |            | 失去焦点,Opera 支持        |      |
| 5        |             | `focus`    | 不冒泡，获得焦点触发       |
| 6        | DOMFocusIn  |            | 冒泡,Opera 支持            |      |
|          |             |            |                            |      |

> 郁闷，2018 年 10 月 31 日这一天面试，其实我都有做过，而且自然而然的做过，竟然答不上来，知识体系全部混乱。
> 这样下去，如果面试一些基础题，我真的可能找不到工作了。
> 之前也没怎么考虑是事件委托还是代理，自然而然就这样处理事件了。比如之前人工写的轮播在那个智能官网里面的，也没多想了，可谁知道那就是事件委托，哔了狗。

- 如何去声明和使用事件，以点击事件来说

```html
<!--onclick--->
<button>button</button>

<script>
   const btn = document.querySelector('button');
   function changeColorA() {}
   function changeColorB() {}
   function changeColor (){
     btn.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)
   }
   //方式1
   btn.onclick=changeColor;
   //方式2  以添加addEventListener 函数来完成。具名函数方式
   btn.addEventListener('click',changeColor);

   //方式3 匿名函数来指代一下也是可以的
   btn.addEventListener('click',,function(){
       btn.style.backgroundColor='#'+Math.floor(Math.random()*16777215).toString(16)
   });
   // 移除事件
   btn.removeEventListener('click',changeColor);
  // 添加多个事件

  //  无法实现并存的方式，后者会覆盖前者
   btn.onclick=changeColorA;
   btn.onclick=changeColorB;

   //使用事件监听器注册的话，就可以实现了!!兼容性，addEventListener只支持到IE9
   btn.addEventListener('click',changeColorA);
   btn.addEventListener('click',changeColorB)
   //有些情况，如submit 事件总会使用preventDefault()阻止默认行为
</script>
```

## 事件委托/事件代理

- 什么时候用到？for 循环里面多个点击事件，一次操作就可以完成，减少 DOM 操作次数
- 原理：利用事件的 `冒泡原理` 来实现，

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
</ul>
```

```js
// 很蠢的对每个li 标签都循环做点击事件
window.onload = function () {
  var ul = document.querySelector('ul');
  var li = document.querySelector('li');
  for (var i = 0; i < li.length; i++) {
    li[i].onclick = function () {
      alert(123);
    };
  }
};
```

- 事件冒泡

  - 什么是冒泡原理？
  - 什么是事件冒泡？
    > 事件从最深的节点开始，逐步向上传播事件，div>ul>li>a，给 a 添加事件，事件就会一层一层的往外执行，执行顺序为 a->li->ul->div
  - 机制
    > 给最外面的 div 加点击事件，`这里理解？：它的后代都会被点击到` 那么 ul li a 做点击的时候，都会冒泡到最外层 div，也就是会触发。这就是事件委托，委托父级代为执行事件。反正最后都会被冒泡到？？
  - 事件冒泡和事件捕获

    - 捕获阶段 `父级->子级，向里`
      - 检查最外层 `html`，是否在捕获阶段注册一个 `onclick` 事件处理程序，如果是，则运行
      - 然后移动到下一个元素，并执行相同操作，直到实际点击的元素
      - **结论是：事件始终从 html 层开始？**
      - 顺序：父级——>子级、外到里
    - 冒泡阶段 `子级->父级，向外`
      - 检查实际点击元素是否在冒泡阶段注册 `onclick` 事件，如果是则运行
      - 然后移动到直接祖先，然后同上，直至 `html` 元素
      - 时间处理程序都在冒泡阶段注册 `(但可以使用addEventListener(,,true) 在捕获阶段注册`
      ```js
      video.onclick = function (e) {
        e.stopPropagation(); //阻止冒泡链扩大
        video.play(); //播放视频
      };
      ```
    - 事件委托 `由于冒泡而被允许的概念`
      - 通过委托父级，`addEventListener` 设置在父节点上，将事件监听器气泡的影响每个子节点，而不是每个子节点都设置事件监听器
