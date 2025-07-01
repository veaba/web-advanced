import {defineConfig} from 'vitepress';
import {codePreviewPlugin} from 'vitepress-script-preview';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'web advanced',
  description: '进阶的 web 前端知识体系',
  head: [
    [
      'style',
      {},
      `
      :root {
        --vt-c-bg-soft: #f9f9f9;
        --vt-c-green: #42b883;
      }
    `,
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.png',
    outline: {
      level: [2, 3],
      label: "目录"
    },

    nav: [
      {text: '指南', link: '/guide'},
      {text: 'JavaScript', link: '/javascript'},
      {text: 'CSS', link: '/css'},
      {text: 'Leetcode', link: '/leetcode'},
      {
        text: '前端',
        items: [
          {text: 'canvas', link: '/canvas'},
          {text: 'svg', link: '/svg'},
          {text: 'es6', link: '/es6'},
          {text: 'pwa', link: '/pwa'},
          {text: 'v8', link: '/v8'},
          {text: 'webgl', link: '/webgl'},
          {text: 'security', link: '/security'},
        ],
      },
      {
        text: '类库',
        items: [
          {text: 'nuxt', link: '/nuxt'},
          {text: 'vite', link: '/vite'},
          {text: 'vue', link: '/vue'},
          {text: 'webpack', link: '/webpack'},
        ],
      },
      {
        text: '后端',
        items: [
          {text: 'node', link: '/node'},
          {text: 'deno', link: '/deno'},
          {text: 'nginx', link: '/nginx'},
          {text: 'actix-web', link: '/rust/actix-web/'},
        ],
      },
      {text: '面试题', link: '/interview'},
    ],

    sidebar: {
      '/javascript/': [
        {
          text: 'JavaScript',
          items: [
            {text: '目录', link: '/javascript'},
            {text: '基础', link: '/javascript/base'},
            {text: 'Typescript', link: '/typescript'},
            {text: 'Node', link: '/node'},
            {text: 'BOM', link: '/javascript/bom'},
            {text: 'DOM', link: '/javascript/dom'},
            {text: 'ECMAScript', link: '/es6/'},
            {text: '原型与原型链', link: '/javascript/prototype'},
            {text: 'Blob', link: '/javascript/blob'},
            {text: 'HTTP', link: '/http'},
            {text: '设计模式', link: '/javascript/design-model'},
            {text: '正则', link: '/javascript/regex'},
            {
              text: '函数',
              link: '/javascript/function',
              items: [
                {text: '构造函数', link: '/javascript/function/function-constructor'},
                {text: '函数声明', link: '/javascript/function/function-declaration'},
                {text: '箭头函数', link: '/javascript/function/function-arrow'},
                {text: '匿名函数', link: '/javascript/function/function-anonymous'},
                {text: '具名函数', link: '/javascript/function/function-named'},
                {text: '全局函数', link: '/javascript/function/function-global'},
              ],
            },
            {text: '类', link: '/javascript/class'},
            {
              text: '数据结构',
              items: [
                {text: '数组', link: '/javascript/data-structure/array'},
                {text: '对象', link: '/javascript/data-structure/object'},
                {text: '字符串', link: '/javascript/data-structure/string'},
              ],
            },
            {text: 'this', link: '/javascript/this'},
            {
              text: '内置对象',
              items: [
                {text: 'Date', link: '/javascript/object/date'},
                {text: 'Math', link: '/javascript/object/math'},
              ],
            },
            {
              text: '常用技巧',
              items: [
                {text: '深浅拷贝', link: '/javascript/useful/deep-copy'},
                {text: '防抖', link: '/javascript/useful/debounce'},
                {text: '节流', link: '/javascript/useful/throttle'},
                {text: '柯里化', link: '/javascript/useful/currying'},
                {text: '内存指向', link: '/javascript/useful/memory'},
              ],
            },
            {
              text: '上下文',
              link: '/javascript/context',
              items: [
                {text: 'apply', link: '/javascript/context/apply'},
                {text: 'bind', link: '/javascript/context/bind'},
                {text: 'call', link: '/javascript/context/call'},
              ],
            },
          ],
        },
      ],
    },

    socialLinks: [{icon: 'github', link: 'https://github.com/veaba/web-advanced'}],
    footer: {
      copyright: 'Copyright © 2018-present',
      message: "Powered by <a href='https://web.veaba.me' target='_blank'>veaba</a>",
    },
  },
  vite: {
    plugins: [],
  },
  markdown: {
    config: (md) => {
      md.use(codePreviewPlugin);
    },
  },
});
