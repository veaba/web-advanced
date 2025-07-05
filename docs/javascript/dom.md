---
sidebar: auto
---

# DOM 对象

- document 对象，文档，window 的属性
- [xml DOM](http://www.w3school.com.cn/xmldom/dom_htmlelement.asp)
- document 是文档 (整个 DOM 树) 的根节点
- 对于 DOM 元素，children 是指 DOM Object 类型的子对象，不包括 tag 之间隐形存在的 TextNode，而 childNodes 包括 tag 之间隐形存在的 TextNode 对象
- domContentLoaded 事件早于 onload

## 知识点

- document 是一个 document node
- elements 都是 element node
- comments 不都是 document node
- element 内的 text 内容也是 text node

## dom 继承顺序

`HTMLDivElement` > `HTMLElement` > `Element` > `Node` > `EventTarget`

## Document 对象属性+方法

[document 对象属性一览表](http://www.runoob.com/jsref/dom-obj-document.html)

| 属性或方法                          | 描述                                                               |
| ----------------------------------- | ------------------------------------------------------------------ |
| document.activeElement              | 返回当前获取焦点元素                                               |
| `document.addEventListener()`       | 向文档添加句柄                                                     |
| `document.adoptNode(node)`          |                                                                    |
| document.anchors                    | `a标签中需要含有name才能获取！`                                    |
| document.baseURI                    | 返回绝对基础 URI                                                   |
| document.body                       | 返回文档 body 元素                                                 |
| `document.close()`                  | 关闭 document.open 的输出流                                        |
| document.cookie                     | 返回所有的 cookie 字符串                                           |
| `document.createAttribute()`        | 创建属性节点                                                       |
| `document.createComment()`          | 竟然能创建一段注释的节点，亮瞎狗眼                                 |
| document.`createDocumentFragment()` | 创建空 DocumentFragment 并返回，对多节点循环创建性能更优           |
| `document.createElement()`          | 创建元素节点                                                       |
| `document.createTextNode()`         | 创建文档节点,不太实际                                              |
| document.doctype                    | 返回与文档相关的文档类型声明 (DTD)。                               |
| document.documentElement            | 返回根节点                                                         |
| document.documentMode               | 返回渲染模式                                                       |
| document.documentURI                | 设置或返回文档的位置                                               |
| document.domain                     | 返回当前文档的域名。                                               |
| document.embeds                     | 返回文档中所有嵌入的内容（embed）集合                              |
| document.forms                      | 返回对文档中所有 Form 对象引用。                                   |
| document.`getElementByClassName()`  | 返回指定 `class` 的 `NodeList` 对象                                |
| document.`getElementById()`         | id 第一个对象引用                                                  |
| document.`getElementByName`         | 名称对象集合                                                       |
| document.`getElementByTagName`      | 标签对象集合                                                       |
| document.`images`                   | 返回所有 Image 对象引用                                            |
| document.implementation             | 啥玩意                                                             |
| `document.importNode()`             | 把一个节点从另一个文档复制到该文档以便应用。                       |
| document.inputEncoding              | 返回文档编码方式，比如 `UTF-8`                                     |
| document.lastModified               | 返回文档最后被修改的时间                                           |
| document.links                      | 返回所有 `a` 标签                                                  |
| `document.normalize()`              | 删除空文本节点，并连接相邻及节点，`createTextNode` 创建的节点。    |
| `document.normalizeDocument()`      |                                                                    |
| `document.open()`                   | 打开一个流，以收集任何 `document.write` 或 `writenlen()`方法的输出 |
| `document.querySelector()`          | 匹配 `css` 选择器的第一个元素                                      |
| `document.querySelectorAll()`       | 返回匹配 `css` 选择的所有元素节点的列表                            |
| document.readyState                 | 返回文档状态 `uninitialized` `loading` `interactive` `complete`    |
| document.referer                    | 返回上一个文档的 URL                                               |
| `document.removeEventListener()`    | 移除 addEventListener()添加的句柄                                  |
| document.scripts                    | 返回所有脚本的集合                                                 |
| document.strictErrorChecking        | 设置或返回是否强制进行错误检查。                                   |
| document.title                      | 返回 `title`                                                       |
| document.URL                        | 返回完整的 `URL`                                                   |
| `document.write()`                  | 写 `html` 表达式或者 `js` 代码，重写整个文档                       |
| `document.writeln()`               | 等同 `write`，但带有换行符                                         |
|                                     |                                                                    |

## HTML DOM 属性对象

| 属性 或 方法                | 描述                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| attr.idId                   | 是 id，true，否则 false                                            |
| attr.name                   |                                                                    |
| attr.value                  |                                                                    |
| attr.specified              | 返回被指定的属性，true，否则 false                                 |
| `nodemap.getNamedItem()`    | `btn.attributes.getNamedItem("onclick").textContent;` 返回 onclick |
| `nodemap.item()`            |                                                                    |
| nodemap.length              | 查看元素带有多少个属性。`error`                                    |
| `nodemap.removeNamedItem()` | 移除指定属性节点                                                   |
| `nodemap.setNamedItem`      | 设置指定属性节点，通过名称                                         |
|                             |                                                                    |

## HTML DOM 元素对象

> 详细 <http://www.runoob.com/jsref/dom-obj-all.html>

| 属性 或 方法                        | 描述                                                                                                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| element.accessKey                   | 设置或者返回 accessKey 一个元素                                                                                                                        |
| element.attributes                  | 返回一个元素的属性数组                                                                                                                                 |
| element.childNodes                  | 返回一个元素的子元素数组                                                                                                                               |
| element.children                    | 返回一个子元素的集合                                                                                                                                   |
| element.classList                   | 返回元素的类型，作为 DOM Token 对象                                                                                                                    |
| element.className                   | 设置或者返回 class 名称                                                                                                                                |
| element.clientHeight                | 返回整数，浏览器当前视窗的文档高度                                                                                                                     |
| element.clientWidth                 | 返回整数，浏览器当前视窗的文档宽度                                                                                                                     |
| element.contentEditable             | 如果设置为 true 则可编辑。false 不可编辑                                                                                                               |
| element.dir                         |                                                                                                                                                        |
| element.firstChild                  |                                                                                                                                                        |
| element.id                          |                                                                                                                                                        |
| element.innerHTML                   |                                                                                                                                                        |
| element.isContentEditable           |                                                                                                                                                        |
| element.lang                        |                                                                                                                                                        |
| element.lastChild                   |                                                                                                                                                        |
| element.namespaceURL                |                                                                                                                                                        |
| element.nextSibling                 |                                                                                                                                                        |
| element.nextElementSibling          |                                                                                                                                                        |
| element.nodeName                    |                                                                                                                                                        |
| element.nodeType                    |                                                                                                                                                        |
| element.nodeValue                   |                                                                                                                                                        |
| element.offsetHeight                |                                                                                                                                                        |
| element.offsetWidth                 |                                                                                                                                                        |
| element.offsetLeft                  |                                                                                                                                                        |
| element.offsetParent                |                                                                                                                                                        |
| element.offsetTop                   |                                                                                                                                                        |
| element.ownerDocument               |                                                                                                                                                        |
| element.parentNode                  |                                                                                                                                                        |
| element.previousSibling             |                                                                                                                                                        |
| element.previousElementSibling      |                                                                                                                                                        |
| element.scrollHeight                |                                                                                                                                                        |
| element.scrollLeft                  |                                                                                                                                                        |
| element.scrollTop                   |                                                                                                                                                        |
| element.scrollWidth                 |                                                                                                                                                        |
| element.style                       |                                                                                                                                                        |
| element.tabIndex                    |                                                                                                                                                        |
| element.tagName                     |                                                                                                                                                        |
| element.textContent                 |                                                                                                                                                        |
| nodeList.length                     |                                                                                                                                                        |
| `element.addEventListener()`        | 指定元素添加事件句柄？？句柄啥玩意                                                                                                                     |
| `element.appendChild()`             | 添加一个子元素                                                                                                                                         |
| `element.cloneNode()`               |                                                                                                                                                        |
| `element.compareDocumentPosition()` |                                                                                                                                                        |
| `element.focus()`                   |                                                                                                                                                        |
| `element.getAttribute()`            |                                                                                                                                                        |
| `element.getAttributeNode()`        |                                                                                                                                                        |
| `element.getElementsByTagName()`    |                                                                                                                                                        |
| `element.getElementsByClassName()`  |                                                                                                                                                        |
| `element.getFeature()`              |                                                                                                                                                        |
| `element.getUserData()`             |                                                                                                                                                        |
| `element.hasAttribute()`            |                                                                                                                                                        |
| `element.hasAttributes()`           |                                                                                                                                                        |
| `element.hasChildNodes()`           |                                                                                                                                                        |
| `element.hasFocus()`                |                                                                                                                                                        |
| `element.insertBefore()`            | 插入,已选择的.insertBefore(parentNode,ChildNode) [insertBefore](https://github.com/veaba/web-advanced-frond-end/tree/master/demos/js/document.js/#L26) |
| `element.isDefaultNamespace()`      |                                                                                                                                                        |
| `element.isEqualNode()`              |                                                                                                                                                        |
| `element.isSameNode()`              |                                                                                                                                                        |
| `element.isSupported()`             |                                                                                                                                                        |
| `element.normalize()`               |                                                                                                                                                        |
| `document.querySelector()`          |                                                                                                                                                        |
| `document.querySelectorAll()`       |                                                                                                                                                        |
| `element.removeAttribute()`         |                                                                                                                                                        |
| `element.removeAttributeNode()`     |                                                                                                                                                        |
| `element.removeChild()`             |                                                                                                                                                        |
| `element.removeEventListener()`     |                                                                                                                                                        |
| `element.replaceChild()`            | 替换                                                                                                                                                   |
| `element.setAttribute()`            |                                                                                                                                                        |
| `element.setAttributeNode()`        |                                                                                                                                                        |
| `element.setIdAttribute()`          |                                                                                                                                                        |
| `element.setIdAttributeNode()`      |                                                                                                                                                        |
| `element.setUserData()`             |                                                                                                                                                        |
| `element.toString()`                |                                                                                                                                                        |
| `nodeList.item()`                   |                                                                                                                                                        |
|                                     |                                                                                                                                                        |

### Console 对象

### CssStyle 对象

| 属性 或 方法            | 描述                                        |
| ----------------------- | ------------------------------------------- |
| cssText                 | style 属性,`document.body[0].style.cssText` |
| length                  |                                             |
| parentRule              |                                             |
| `getPropertyPriority()` | 指定是否设置了 `!important` 属性            |
| `getPropertyValue()`    | 返回指定的 css 属性值                       |
| `item()`               | 通过索引方式返回 css 声明的 css 属性名      |
| `removeProperty()`      | 移除 css 声明中的 css 属性                  |
| `setProperty()`         | 在 css 声明块中新建或者修改 css 属性        |
|                         |                                             |
