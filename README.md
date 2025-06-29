# web advanced

> 进阶 web 高级前端知识体系：来自个人的面试经历、学习笔记、参考大神们的 blog，以及常见面试题！不代表内容的正确性！！！！有一部分还在带着问号！以下内容是随手记下的笔记，还在学习..。 by@veaba

---

![deploy](https://github.com/veaba/web-advanced/actions/workflows/deploy.yml/badge.svg)

使用 Vuepress 重新构建静态网站，舒爽体验阅读，请访问：https://web.veaba.me

> 本项目使用 vuepress-actions 构建，详情请查看：<https://github.com/veaba/vuepress-actions>，仅支持 vuepress 1.x

部分内容尚未补充完成！！

- [interview-rspress](https://github.com/veaba/interview-rspress) <sup>private</sup>

## todo 翻译工具

- 开发工具，同步官方数据-todo
  - <https://nodejs.org/dist/latest-v14.x/docs/api/documentation.json> 一些 api
  - 自动生成 node 最新版文档目录
  - copy 一份后，自动翻译
  - 参考以前的 Tensorflow-docs 项目
  - 使用 vuepress 自带的在本页面生成目录在文章前面
  - 扫描未翻译的段落、同步更新请求操作

## 写作

### 使用 vitepress-script-preview 插件

```shell

::: script-preview
  console.log('hello world')
:::

```
