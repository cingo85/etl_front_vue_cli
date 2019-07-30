<template>
  <projectChangePageView></projectChangePageView>
</template>

<script>
import projectChangePage from "@/components/mainpage/projectChangePage.vue";
export default {
  name: "projectChangePage",
  components: {
    projectChangePageView: projectChangePage
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
