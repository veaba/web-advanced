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
      parentSort.forEach(parent => {
        parent.children = [];
        childSort.forEach(child => {
          if (child.path.startsWith(parent.path)) parent.children.push(child);
        });
        mergeSort.push(parent);
      });
      return mergeSort;
    }
  }
};
</script>
