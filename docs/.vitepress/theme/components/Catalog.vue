<!-- Catalog-->
<script setup lang="ts">
import { onMounted, computed, ref, toRef } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { data as apiIndex } from './catalog.data';

const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ');

const filtered = computed(() => {
  const q = normalize(query.value);
  const matches = (text: string) => normalize(text).includes(q);

  return apiIndex;
  // TODO
  // .map((section) => {
  //   // section title match
  //   if (matches(section.text)) {
  //     return section;
  //   }

  //   // filter groups
  //   const matchedGroups = section.items
  //     .map((item) => {
  //       // group title match
  //       if (matches(item.text)) {
  //         return item;
  //       }
  //       // ssr special case
  //       if (q.includes('ssr') && item.text.startsWith('Server')) {
  //         return item;
  //       }
  //       // filter headers
  //       const matchedHeaders = item.headers.filter(({ text, anchor }) => matches(text) || matches(anchor));
  //       return matchedHeaders.length ? { text: item.text, link: item.link, headers: matchedHeaders } : null;
  //     })
  //     .filter((i) => i);

  //   return matchedGroups.length ? { text: section.text, items: matchedGroups } : null;
  // })
  // .filter((i) => i) as APIGroup[];
});

onMounted(async () => {
  console.log('注册组件=>', useData());

  // const dataModule = await import.meta.url('/.vitepress/client/app/data.js?import');
  console.log(import.meta);
  console.log(import.meta.env);
  const vitepressConfig = import.meta.env.VITEPRESS_CONFIG;

  console.log('vitepressConfig', vitepressConfig);
  console.log('filtered', filtered);
  console.log('apiIndex', apiIndex);
  console.log('useRouter ', useRouter());
  console.log('useRoute', useRoute());
});
</script>

<template>
  <div class="catalog">
    <ul>
      <!-- <li v-for="parent in pages">
        <router-link :to="parent.path"> {{ parent.title }}</router-link>
        <ul>
          <li v-for="child in parent.children">
            <router-link :to="child.path">{{ child.title }}</router-link>
          </li>
        </ul>
      </li> -->
    </ul>
  </div>
</template>
