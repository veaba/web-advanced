---
sidebar: auto
---

# Elements

关于更多的标签可以到 [HTML tag 参考](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element) 访问。

## 知识点
- `param` 定义了 `<object>` 元素的参数；
- `video` 标签中的 `controls` 属性决定是否用户显示控件；
- `audio` 与 `</audio>` 之间插入的内容是为了供不支持 `audio` 元素的浏览器显示的；
- `<progress>` 标签不填写 `max` 和  `value` 会自动滑动。
- `<body>` 允许 `background="background.jpg"` 设置背景图片
- 

## 主根元素
- `<html>`

## 文档元数据
- `<base>`
- `<head>`
- `<link>`
- `<meta>`
- `<style>`
- `<title>`

## 分区根元素
- `<body>`

## 内容分区
- `<address>`
- `<article>`
- `<aside>`
- `<footer>`
- `<header>`
- `<h1>`、`<h2>`、`<h3>`、`<h4>`、`<h5>`、`<h6>`
- `<hgroup>`
- `<main>`
- `<nav>`
- `<section>`

## 文本内容
- `<blockquote>`
- `<dd>`
- ~~`<dir>`~~
- `<dl>`
- `<dt>`
- `<figcaption>`
- `<figure>`
- `<hr>`
- `<li>`
- `<main>`
- `<ol>`
- `<p>`
  - 不能包括任何块级元素以及自身
- `<pre>`
- `<ul>`

## 内联文本语义
内联文本语义(inline text semantics )，定义一个单词、一行内容、或任意文字的语义，结构或样式。

- `<a>`
  - 可以包括任何元素以及自身
- `<abbr>`
- `<b>`
- `<bdi>`
- `<bdo>`
- `<br>`
- `<cite>`
- `<code>`
- `<data>`
- `<dfn>`
- `<em>`
- `<i>`
- `<kbd>`
- `<mark>`
- `<q>`
- `<rd>`
- `<rq>`
- `<rtc>`
- `<ruby>`
- `<s>`
- `<samp>`
- `<small>`
- `<span>`
- `<strong>`
- `<sub>`
- `<sup>`
- `<time>`
- ~~`<tt>`~~
- `<u>`
- `<var>`
- `<wbr>`

## 图片与多媒体
- `<area>`
- `<audio>`
  - 事件
    - `play`
    - `seeked`
    - `abort`
- `<img>`-
- `<map>`
- `<track>`
- `<video>`
  - 事件
    - `play`
    - `seeked`
    - `abort`

## 内嵌内容
- ~~`<applet>`~~ Java applet
- `<embed>` 外部内容嵌入
- `<iframe>`
- ~~`<noembed>`~~
- `<object>`
- `<param>`
- `<picture>`
- `<source>`

## 脚本
- `canvas`
- `<script>`
- `<noscript>`

## 编辑标识
- `<del>`
- `<ins>`

## 表格内容
- `<caption>`
- `<col>`
- `<colgroup>`
- `<table>`
- `<tbody>`
- `<td>`
- `<tfoot>`
- `<th>`
- `<thead>`
- `<tr>`

## 表单
- `<button>`
- `<datalist>`
- `<fieldset>`
- `<from>`
  - `<input>`
  ```html
    <!-- 时间选择器 -->
    <input type="date" name="bday">
    <input type="datetime-local" name="bdaytime">
  ```
- `<label>`
- `<legend>`
- `<meter>`
- `<optgroup>`
- `<option>`
- `<output>`
- `<progress>`
- `<select>`
- `<textarea>`

## 交互元素
- `<details>`
- `<dialog>`
- `<menu>`
- `<menuitem>`
- `<summary>`

## Web 组件
- ~~`<content>`~~
- ~~`<element>`~~
- ~~`<shadow>`~~
- `<slot>`
- `<template>`

## 过时和弃用的元素
- ~~`<acronym>`~~
- ~~`<applet>`~~
- ~~`<basefont>`~~
- ~~`<bgsound>`~~
- ~~`<big>`~~
- ~~`<blink>`~~
- ~~`<center>`~~
- ~~`<command>`~~
- ~~`<content>`~~
- ~~`<dir>`~~
- ~~`<element>`~~
- ~~`<font>`~~
- ~~`<frame>`~~
- ~~`<frameset>`~~
- ~~`<image>`~~
- ~~`<isindex>`~~
- ~~`<keygen>`~~
- ~~`<listing>`~~
- ~~`<marquee>`~~
- ~~`<menuitem>`~~
- ~~`<multicol>`~~
- ~~`<nextid>`~~
- ~~`<nobr>`~~
- ~~`<nomebed>`~~
- ~~`<noframes>`~~
- ~~`<plaintext>`~~
- ~~`<shadow>`~~
- ~~`<spacer>`~~
- ~~`<strike>`~~
- ~~`<tt>`~~
- ~~`<xmp>`~~


## empty element (空元素)

### 总结
- [Empty element](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%A9%BA%E5%85%83%E7%B4%A0)
- 通常在一个空元素上使用闭合标签是无效的
- 不存在子节点（文本或内嵌元素）的元素

### 空元素列表
- `<area>`
- `<base>`
- `<br>`
- `<col>`
- `<colgroup>` <sub> 当 `span` 存在时</sub> 
- ~~`<command>`~~
- `<embed>`
- `<hr>`
- `<img>`
- `<input>`
- `<keygen>`
- `<link>`
- `<meta>`
- `<param>`
- `<source>`
- `<track>`
- `<wbr>`

## 块级元素 TODO

## 内联元素 TODO


## 表单相关特性 TODO

- form 表单 disabled = true，无法修改和无法提交

:::
@copyright 本页内容为基于网络整理所得
:::
