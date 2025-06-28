import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import type { Theme } from 'vitepress';
import Catalog from './components/Catalog.vue';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      Catalog: () => h(Catalog),
    });
  },
  enhanceApp({ app }) {
    console.log('enhanceApp=>',app);
    // 注册自定义全局组件
    app.component('Catalog', Catalog);
  },
} satisfies Theme;
