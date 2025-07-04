<!-- 
@desc 本组件将允许用户展开所有需要的目录
@author veaba
-->
<script setup lang="ts">
import { onMounted, computed, ref, toRef } from 'vue';
import { useData, useRoute, useRouter, withBase } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { data as apiIndex } from './catalog.data';

const query = ref('');

const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ');

const props = defineProps({
  base: {
    type: String,
    default: '',
  },
});

const rmSlashPath = (path: string) => path.replace(/\//g, '');

const pages = computed(() => {
  if (!props.base) return apiIndex;

  // 递归查找匹配路径的节点
  function findNode(items) {
    const subChildren = [];
    for (const item of items) {
      // 如果匹配一级，直接打断
      if (item.path === props.base) {
        return [item];
      }
      if (item.children && item.children.length) {
        for (const child of item.children) {
          if (child.path.indexOf(props.base) > -1) {
            subChildren.push(child);
          }
        }
      }
    }

    if (subChildren.length > 0) {
      // 重新组织二级结构
      const indexItem = subChildren.find((item) => [props.base + '/index', props.base].includes(item.path));
      if (indexItem) {
        const indexChildren = subChildren.filter((item) => item.path !== props.base + '/index');
        return [{ title: indexItem.title, path: indexItem.path, children: indexChildren }];
      }
      return subChildren;
    }
    return [];
  }

  const ret = findNode(apiIndex);
  return ret as APIGroup[];
});

onMounted(async () => {
  console.log('apiIndex', apiIndex);
  console.log('pages', pages);
});
</script>

<template>
  <div class="catalog">
    <div v-for="section of pages" :key="section.text" class="api-section">
      <h2 :id="section.anchor">{{ section.title }}</h2>
      <div class="api-groups">
        <div v-for="item of section.children" :key="item.text" class="api-group">
          <h3>{{ item.text || item.title }}</h3>
          <ul>
            <li v-for="h of item.headers" :key="h.anchor" class="li-text">
              <a :href="item.path + '.html#' + h.anchor">{{ h.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#api-index {
  max-width: 1024px;
  margin: 0px auto;
  padding: 64px 32px;
}

.li-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h1,
h2,
h3 {
  font-weight: 600;
  line-height: 1;
}

h1,
h2 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: 38px;
}

h2 {
  font-size: 24px;
  color: var(--vt-c-text-1);
  margin: 36px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
}

h3 {
  letter-spacing: -0.01em;
  color: var(--vt-c-green);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
}

.api-section {
  margin-bottom: 64px;
}

.api-groups a {
  font-size: 15px;
  font-weight: 500;
  line-height: 2;
  color: var(--vt-c-text-code);
  transition: color 0.5s;
}

.dark api-groups a {
  font-weight: 400;
}

.api-groups a:hover {
  color: var(--vt-c-green);
  transition: none;
}

.api-group {
  break-inside: avoid;
  overflow: auto;
  margin-bottom: 20px;
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 24px 28px;
  transition: background-color 0.5s;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.api-filter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

#api-filter {
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
  padding: 6px 12px;
  transition: box-shadow 0.25s ease;
}

#api-filter:focus {
  box-shadow: 0 0 4pt #00d47499;
}

.api-filter:focus {
  border-color: var(--vt-c-green-light);
}

.no-match {
  font-size: 1.2em;
  color: var(--vt-c-text-3);
  text-align: center;
  margin-top: 36px;
  padding-top: 36px;
  border-top: 1px solid var(--vt-c-divider-light);
}

@media (max-width: 768px) {
  #api-index {
    padding: 42px 24px;
  }
  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }
  h2 {
    font-size: 22px;
    margin: 42px 0 32px;
    padding-top: 32px;
  }
  .api-groups a {
    font-size: 14px;
  }
  .header {
    display: block;
  }
}

@media (min-width: 768px) {
  .api-groups {
    columns: 1;
  }
}

@media (min-width: 1024px) {
  .api-groups {
    columns: 2;
  }
}
</style>
