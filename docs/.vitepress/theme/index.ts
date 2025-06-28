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
    app.component('Catalog', Catalog);
  },
} satisfies Theme;
