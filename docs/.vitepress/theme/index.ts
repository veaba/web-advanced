import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import type { Theme } from 'vitepress';
import Catalog from './components/Catalog.vue';
import 'vitepress-script-preview/components/style.css'
import { CodePreview } from 'vitepress-script-preview/components';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      Catalog: () => h(Catalog),
    });
  },
  enhanceApp({ app }) {
    app.component('Catalog', Catalog);
    app.component('CodePreview', CodePreview);
  },
} satisfies Theme;
