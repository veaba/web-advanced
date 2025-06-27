<!-- Catalog-->
<script setup lang="ts">
import { onMounted, ref, toRef } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

onMounted(() => {
  console.log('注册组件=>', useData());

  console.log('useData', useData());
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
