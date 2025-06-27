<!-- Catalog-->
<template>
  <div class="catalog">
    <ul>
      <li v-for="parent in pages">
        <router-link :to="parent.path"> {{ parent.title }}</router-link>
        <ul>
          <li v-for="child in parent.children">
            <router-link :to="child.path">{{ child.title }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // base: String，允许支持 base path 配置，默认为 /
  props: ['base'],
  computed: {
    pages() {
      // sort pages array
      const sortPages = (this.$site.pages || []).sort((a = {}, b = {}) => {
        if (a.path > b.path) return 1;
        else if (a.path < b.path) return -1;
        else return 0;
      });

      const parentSort = [];
      const childSort = [];
      const mergeSort = [];
      sortPages.forEach((parent) => {
        if (parent.path !== '/') {
          if (parent.path.startsWith('/') === parent.path.endsWith('/') || parent.path.split('/').length < 3) {
            parentSort.push(parent);
          } else childSort.push(parent);
        }
      });

      /**
       * 如果有base属性，先找到匹配的父级
       *
       */
      let matchedParent = null;
      if (this.base) {
        matchedParent = parentSort.find((parent) => {
          let base = this.base;
          if (!this.base.endsWith('/')) {
            base = this.base + '/';
          }
          return base === parent.path || (parent.path.endsWith('/') && this.base.startsWith(parent.path));
        });
      }

      parentSort.forEach((parent) => {
        parent.children = [];
        childSort.forEach((child) => {
          if (child.path.startsWith(parent.path)) parent.children.push(child);
        });
        // 如果有匹配的父级，只添加匹配的父级
        if (matchedParent) {
          if (parent.path === matchedParent.path) {
            mergeSort.push(parent);
          }
        } else {
          // 否则添加所有父级
          mergeSort.push(parent);
        }
      });

      console.log('mergeSort=>', mergeSort);
      return mergeSort;
    },
  },
  mounted() {
    console.log('pages=>', this.pages);
    console.log('base=>', this.base);
  },
};
</script>
