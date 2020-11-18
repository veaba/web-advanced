---
sidebar: auto
---

# Css部分

- zoom与transform scale区别
- CSS IFC inline formatting context
  > 内联格式上下文
- CSS BFC block formatting context
  > 块级格式上下文。里面子元素不会影响到外面的元素

## CSS实现水平垂直居中的1010种方式（史上最全）
- [CSS实现水平垂直居中](https://segmentfault.com/a/1190000016389031)

## 知识点
- 外边距坍塌问题。块级之间共享垂直外边距，margin取最大值
  - 解决办法，给第二个兄弟加个父级，且给原兄弟使用margin
- 当 `margin-top`、`padding-top` 值是百分比时，将以*父级块级元素的 width*、*相对父级块级元素的 width* 分别计算
- `background-position`:
  - 该属性可有两个取值，第一个取值为背景图像与其容器在水平方向上的距离，第二个取值为背景图像与其容器在垂直方向上的距离
  - 若只有一个取值，则其第二个取值默认为50%；
  - 如果第一个值取关键词，则第二个默认值为：center
  - 若属性取值用left、center、right、top、bottom表示，则该属性取值的顺序可以颠倒，否则其取值顺序不能颠倒
- 关于`link` 和 `@import`：
  - 页面被加载时，`link` 会同时被加载
  - `@import` 引用的css 会等到页面被加载完再加载
  - `@import` 只能加载 css，`link` 标签还可以定义 RSS 等
  - `@import` 是 css2.1提出，IE5 以上可识别，link 无兼容性问题
- css 伪元素 
  - active 必须位于 hover 之后
  - 顺序：

- inline-block 可以设置高度
- inline 不可以设置高度

### BFC 问题
- BFC(Block formatting context)，块级格式化上下文
  - 满足以下都可以触发 BFC
    - body 根元素
    - float元素：除以 none 意外的值
    - display: `inline-block`、`table-cells`、`flex`
    - overflow: 非 visible 的值( `hidden`、`auto`、`scroll` )
    - position: `absolute`
- BFC 浮动子元素也参与计算
- BFC 页面隔离独立容器，容器的子元素不会影响到外部


## 可被继承的 css 属性

### 字体
- `font-family` 
- `font-size`
- `font-style`
- `font-weight`
- `font-stretch`
- `font-size-adjust`

### 列表相关
- `list-style`
- `list-style-image`
- `list-style-position`
- `list-style-type`
- `list-style-color`

### 文本继承 
- `text-indent`
- `text-align`
- `lint-height`
- `word-spaceing`
- `letter-spacing`
- `text-transfomr`
- `direction`
- `color`

### 元素可见性
- `visibility`

### 表格布局
- `caption-side`
- `border-collapse`
- `border-spacing`
- `empty-cells`
- `table-layout`

### 生成内容
- `quotes`

### 光标属性
- `cursor`

### 页面样式
- `page`
- `page-break-inside`
- `windows`
- `orphans`

### 声音样式
- `speak`
- `speak-puncatuation`
- `speak-numreal`
- `speack-header`
- `volume`
- `voice-family`
- `pitch`
- `pitch-range`
- `stress`
- `richness`
- `azimuth`
- `elevation`

## 不可被继承的 css 属性
- `display`
- `margin`
- `border`
- `padding`
- `background`
- `height`
- `min-height`
- `max-height`
- `width`
- `min-height`
- `max-height`
- `overflow`
- `position`
- `left`
- `right`
- `top`
- `bottom`
- `z-index`
- `float`
- `clear`
- `table-layout`
- `vertical-align`
- `page-break-after`
- `page-break-before`
- `unicode-bidi`

## css 选择符优先级

- `! important`: infinite
- `inline` 1000
- `id`: 100
- `class`、`attr`、`伪类`: 10
- `标签`: 1
- `*`: 0

## 伪类元素

- first-of-type
- nth-child(2)
- disabled

:::
本页内容为网络收集整理所得
:::
