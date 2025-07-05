---
sidebar: auto
---

# 左中右布局方案

## 基于 `float:left` (错误的方式)

- 但这种方式是不行的。

::: details

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>左中右布局</title>
    <style>
      div {
        text-align: center;
      }
      * {
        box-sizing: border-box;
      }
      .parent {
        height: 200px;
        border: 1px solid red;
      }
      .left {
        border: 1px solid yellow;
        float: left;
        width: 200px;
      }
      .center {
        border: 1px solid blue;
        margin-left: 200px;
        margin-right: 200px;
      }
      .right {
        border: 1px solid slateblue;
        float: right;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="left">Left</div>
      <div class="center">
        Center Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid
        布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格， 可以看作是二维布局。Grid 布局远比 Flex
        布局强大。Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid
        布局则是将容器划分成"行"和"列"， 产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex
        布局强大。Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。 Grid
        布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex
        布局强大。
      </div>
      <div class="right">Right</div>
    </div>
  </body>
</html>
```

:::

![float-left-center-right](/images/css/float-left-center-right.png)

## 基于 float + position 定位

::: details

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>左中右布局</title>
    <style>
      .parent {
        position: relative;
        height: 200px;
        border: 1px solid red;
      }
      .left {
        border: 1px solid yellow;
        float: left;
        width: 200px;
      }
      .center {
        border: 1px solid blue;
        margin-left: 200px;
        margin-right: 200px;
      }
      .right {
        position: absolute;
        top: 0px;
        right: 0px;
        border: 1px solid slateblue;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="left">Left</div>
      <div class="center">Center Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。</div>
      <div class="right">Right</div>
    </div>
  </body>
</html>
```

:::
![position-left-center-right](/images/css/position-left-center-right.png)

## 基于 flex 实现

::: details

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>左中右布局 Flex</title>
    <style>
      .parent {
        height: 200px;
        border: 1px solid red;
        display: flex;
        justify-content: center;
      }
      .left {
        border: 1px solid yellow;
        width: 200px;
        /*align-self: center 让left 水平居中，高度脱离*/
      }
      .center {
        border: 1px solid blue;
        flex: 1;
      }
      .right {
        border: 1px solid slateblue;
        width: 200px;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="left">Left</div>
      <div class="center">Center Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。</div>
      <div class="right">Right</div>
    </div>
  </body>
</html>
```

:::

![right-center-right](/images/css/flex-right-center-right.png)

## 基于负 margin 实现

### 方式 1：双 float 正序<Badge text="不推荐" type="danger" />

- 子元素全部 float
- center 在 left 前一个面位置
- 缺点：超出一屏的宽度
- 查看：[margin-left_center_right-layout.html](/demos/html/margin-left_center_right-layout.html)

::: details

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>Document</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        color: black;
        font-size: 45px;
      }
      .main {
        width: 100%;
        background: yellow;
      }
      .center {
        float: left;
        background: red;
        margin-left: 200px;
        margin-right: -200px;
        width: 100%;
      }
      .left {
        float: left;
        background: pink;
        width: 200px;
        margin-left: -100%;
      }
      .right {
        float: left;
        background: blue;
        width: 200px;
        margin-right: -200px;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="center">中间</div>
      <div class="left">左边</div>
      <div class="right">右边</div>
    </div>
  </body>
</html>
```

:::

![float-case-1-scroll](/images/css/float-case-1-scroll.png)

### 方式 2：<Badge text="不推荐" type="danger" />

通过改进上面的代码：

- 解决滚动条的问题
- 但是，当随着高度撑开，其实还是出现遮挡的问题

![left-center-right-1](</images/css/margin(pref)-left-center-right-1.png>)

::: details

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>三栏布局</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        color: black;
        font-size: 45px;
      }
      .main {
        width: 100%;
        background: yellow;
        overflow: hidden;
      }
      .center {
        float: left;
        background: red;
        margin-left: 200px;
        margin-right: -200px;
        width: 100%;
      }
      .left {
        float: left;
        background: pink;
        width: 200px;
        margin-left: -100%;
      }
      .right {
        float: left;
        background: blue;
        width: 200px;
        margin-left: -200px;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div class="center">中间</div>
      <div class="left">左边</div>
      <div class="right">右边</div>
    </div>
  </body>
</html>
```

:::

![left-center-right](</images/css/margin(pref)-left-center-right.png>)

### 方式 3：双 float 逆序方式

- 右边移到最前面
- 其次到 left
- center
- 查看：[margin-left_center_right-layout-3.html](/demos/html/margin-left_center_right-layout-3.html)

::: details

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <title>Document</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        color: black;
        font-size: 45px;
      }

      .main {
        width: 100%;
        background: yellow;
      }

      .left {
        float: left;
        background: pink;
        width: 200px;
      }

      .right {
        float: right;
        background: blue;
        width: 200px;
      }

      .center {
        background: red;
        margin-left: 200px;
        margin-right: 200px;
      }
    </style>
  </head>

  <body>
    <div class="main">
      <div class="right">右右边右边右边边</div>
      <div class="left">左边左边左边左边</div>
      <div class="center">
        中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间中间
      </div>
    </div>
  </body>
</html>
```

:::
![left-center-right-2](</images/css/margin(pref)-left-center-right-2.png>)
