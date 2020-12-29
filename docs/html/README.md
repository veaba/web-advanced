---
sidebar: auto
---

# HTML

- [Docs Glossary](https://developer.mozilla.org/zh-CN/docs/Glossary)

## 知识点

- 带 id 属性的 DOM 元素有什么副作用？
  - 创建同名的全局变量
- `clientWidth`：`height` + `padding`
- `offsetHeight`: `height` + `padding` + `border`
- w3c 标准盒模型中，默认情况下，块元素的总宽度 = content
- HTML5 事件可以触发多次
- `link` 与 `@import` 区别

## 盒子模型

### 标准盒子模型

标准盒子模型宽度: content

- 默认使用 border-box

```html
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .parent {
        display: inline-block;
        width: 200px;
        height: 200px;
        padding: 10px;
        margin: 20px;
        border: 10px solid green;
        background: red;
        box-sizing: border-box;
      }
      .children {
        width: 100%;
        height: 100%;
        background: yellow;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="children"></div>
    </div>
  </body>
</html>
```

- parent

  - 总 width: width + margin-left + margin-right
  - 总 height: width + margin-left + margin-right
  - 实际content: width - border*2- padding*2=160 

![](/html/border-box-parent.png)

- children
  - 总 width: width - border*2- padding*2= 200-40=160
  - 总 height: height - border*2- padding*2= 200-40=160

![](/html/border-box-children.png)
### IE 盒子模型

- IE 盒子模型: (margin+padding+border)\*2+width
- 默认使用 content-box

```html
<html lang="zh-cn">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .parent {
        display: inline-block;
        width: 200px;
        height: 200px;
        padding: 10px;
        margin: 20px;
        border: 10px solid green;
        background: red;
        box-sizing: border-box;
      }
      .children {
        width: 100%;
        height: 100%;
        background: yellow;
      }
    </style>
  </head>
  <body>
    <div class="parent">
      <div class="children"></div>
    </div>
  </body>
</html>
```

- parent

  - 总 width: margin*2+border*2+padding*2+width=200+20*2+10*2+10*2=280
  - 总 height: margin*2+border*2+padding*2+height=200+20*2+10*2+10*2=280

![](/html/content-box-parent.png)

- children
  - 总 width: parent width = 200
  - 总 height: parent height = 200

![](/html/content-box-children.png)