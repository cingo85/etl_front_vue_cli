<template>
  <index-page></index-page>
</template>

<script>
import index_Page from "@/components/IndexPage.vue";
export default {
  name: "indexPage",
  components: {
    "index-page": index_Page
  },
  created: function() {
    this.$emit("project", true);
  }
};
</script>

<style>
</style>
