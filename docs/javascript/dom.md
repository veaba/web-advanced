---
sidebar: auto
---

# DOM对象

- document对象，文档，window的属性
- xml DOM http://www.w3school.com.cn/xmldom/dom_htmlelement.asp

## Document对象 属性+方法
> http://www.runoob.com/jsref/dom-obj-document.html

|属性|方法|描述
|---|---|---|
|document.activeElement||返回当前获取焦点元素|
||documeent.addEventListener()|向文档添加句柄|
||document.adoptNode(node)||
|document.anchors||`a标签中需要含有name才能获取！`|
|document.baseURI||返回绝对基础URI|
|document.body||返回文档body元素|
||document.close()|关闭document.open的输出流 [document.close](https://github.com/veaba/web-advanced-frond-end/tree/master/demos/js/document.js#L1)|
|document.cookie||返回所有的cookie字符串|
||document.createAttribute()|创建属性节点|
||document.createComment()|竟然能创建一段注释的节点，亮瞎狗眼|
||document.createDocumentFragment()|创建空DocumentFragment并返回|
||document.createElement()|创建元素节点|
||document.createTextNode()|创建文档节点,不太实际|
|document.doctype|||
|document.documentElement||返回根节点|
|document.documentMode||返回渲染模式|
|document.documentURI|||
|document.domain|||
|document.embeds|||
|document.forms|||
||document.`getElementByClassName()`|返回指定class 的NodeList对象|
||document.`getElementById()`|id 第一个对象引用|
||document.`getElementByName`|名称对象集合|
||document.`getElementByTagName`|标签对象集合|
|document.`images`||返回所有Image对象引用|
|document.implementation||啥玩意|
||document.import()||
|document.inputEncoding||返回文档编码方式，比如`UTF-8`|
|document.lastModified||返回文档最后被修改的时间|
|document.links||返回所有a标签|
||document.normalize()|删除空文本节点，并连接相邻及节点，createTextNode 创建的节点。|
||document.normalizeDocument()||
||document.open()|打开一个流，以收集任何document.write | writenlen()方法的输出 [document.close](https://github.com/veaba/web-advanced-frond-end/tree/master/demos/js/document.js#L1)|
||`document.querySelector()`|匹配css 选择器的第一个元素|
||`document.querySelectorAll()`|返回匹配css选择的所有元素节点的列表|
|document.readyState||返回文档状态 `uninitialized ` `loading ` `interactive ` `complete `|
|document.referer||返回上一个文档的URL|
||document.removeEventListener()|移除addEventListener()添加的句柄|
|document.scripts||返回所有脚本的集合|
|document.title||返回title|
|document.URL||返回完整的URL|
||document.write()|写html表达式或者js代码，重写整个文档|
||document.writelen()|等同write，但带有换行符|
||||
## HTML DOM 属性对象

|属性|方法|描述
|---|---|---|
|attr.idId||是id，true，否则false|
|attr.name|||
|attr.value|||
|attr.specified||返回被指定的属性，true，否则false|
||nodemap.getNamedItem|`btn.attributes.getNamedItem("onclick").textContent;` 返回onclick|
||nodemap.item()||
||nodemap.length|查看元素带有多少个属性。`error`|
||nodemap.removeNamedItem|移除指定属性节点|
||nodemap.setNamedItem|设置指定属性节点，通过名称|
||||
## HTML DOM 元素对象 
> http://www.runoob.com/jsref/dom-obj-all.html

|属性|方法|描述
|---|---|---|
|element.accessKey||*设置或者返回accessKey一个元素|
|element.attributes||返回一个元素的属性数组|
|element.childNodes||返回一个元素的子元素数组|
|element.childrent||返回一个子元素的集合|
|element.classList||*返回元素的类型，作为DOM Token对象|
|element.className||设置或者返回class名称|
|element.clientHeight||返回整数，浏览器当前视窗的文档高度|
|element.clienWidth||返回整数，浏览器当前视窗的文档宽度|
|element.contentEditable||如果设置为true 则可编辑。false 不可编辑|
|element.dir|||
|element.firstChild|||
|element.id|||
|element.innerHTML|||
|element.isContentEdiable|||
|element.lang|||
|element.lastChild|||
|element.namespaceURL|||
|element.nextSibing|||
|element.nextElementSibing|||
|element.nodeName|||
|element.nodeType|||
|element.nodeValue|||
|element.offsetHeight|||
|element.offsetWidth|||
|element.offsetLeft|||
|element.offsetParent|||
|element.offsetTop|||
|element.ownerDocument|||
|element.parentNode|||
|element.previousSibing|||
|element.previousElementSibing|||
|element.scrollHeight|||
|element.scrollLeft|||
|element.scrollTop|||
|element.scrollWidth|||
|element.style|||
|element.tabInde|||
|element.tagName|||
|element.textContent|||
|nodeList.length|||
||element.addEventListener()|指定元素添加事件句柄？？句柄啥玩意|
||element.`appendChild()`|添加一个子元素|
||element.cloneNode()||
||element.compareDocumentPosition()||
||element.focus()||
||element.getAttribute()||
||element.getAttributeNode()||
||element.getElementsByTagName()||
||element.getElementsByClassName()||
||element.getFeature()||
||element.getUserData()||
||element.hasAttribute()||
||element.hasAttributes()||
||element.hasChildNodes()||
||element.hasFocus()||
||element.`insertBefore()`|插入,已选择的.insertBefore(parentNode,ChildNode) [insertBefore](https://github.com/veaba/web-advanced-frond-end/tree/master/demos/js/document.js/#L26)|
||element.isDefaultNamespace()||
||element.isEquaNode()||
||element.isSameNode()||
||element.isSupported()||
||element.normalize()||
||document.querySelector()||
||document.querySelectorAll()||
||element.removeAttribute()||
||element.removeAttributeNode()||
||element.removeChild()||
||element.removeEventLisenter()||
||element.`replaceChild()`|替换|
||element.setAttribute()||
||element.setAttributeNode()||
||element.setIdAttribute()||
||element.setIdAttributeNode()||
||element.setUserData()||
||element.toString()||
||nodeList.item()||
||||
### HTML DOM事件，见 `## DOM事件`
> 单独拎出来

### Console 对象
### cssStyle 对象
|属性|方法|描述|
|----|----|----|
|cssText||style属性,`document.body[0].style.cssText`|
|length|||
|parentRule|||
||getPropertyPriority()|指定是否设置了 `!important` 属性|
||getPropertyValue()|返回指定的css属性值|
||item()|通过索引方式返回css声明的css属性名|
||removeProperty()|移除css声明中的css属性|
||setProperty()|在css声明块中新建或者修改css属性|
||||
