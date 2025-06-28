import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'web advanced',
  description: '进阶的 web 前端知识体系',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', link: '/guide' },
      { text: 'Leetcode', link: '/leetcode' },
      { text: 'actix-web', link: '/rust/actix-web' },
      { text: 'JavaScript', link: '/javascript' },
      { text: 'Node', link: '/node' },
      { text: '面试题', link: '/interview' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/veaba/web-advanced' }],
    footer: {
      copyright: 'Copyright © 2018-present',
      message: "Powered by <a href='https://web.veaba.me' target='_blank'>veaba</a>",
    },
  },
});
