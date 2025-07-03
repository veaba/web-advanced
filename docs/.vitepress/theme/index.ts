import DefaultTheme from 'vitepress/theme';
import { h, nextTick } from 'vue';
import type { Theme } from 'vitepress';
import Catalog from './components/Catalog.vue';
import 'vitepress-script-preview/components/style.css';
import { CodePreview } from 'vitepress-script-preview/components';
import { createMermaidRenderer } from 'vitepress-mermaid-renderer';
import 'vitepress-mermaid-renderer/dist/style.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      Catalog: () => h(Catalog),
    });
  },
  enhanceApp({ app, router }) {
    app.component('Catalog', Catalog);
    app.component('CodePreview', CodePreview);

    const mermaidRenderer = createMermaidRenderer();
    mermaidRenderer.initialize();

    if (router) {
      router.onAfterRouteChange = () => {
        nextTick(() => mermaidRenderer.renderMermaidDiagrams());
      };
    }
  },
} satisfies Theme;
