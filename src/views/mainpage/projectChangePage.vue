<template>
  <project-Change-Page></project-Change-Page>
</template>

<script>
import projectChangePage from "@/components/mainpage/projectChangePage.vue";
export default {
  name: "projectChangePage",
  components: {
    "project-Change-Page": projectChangePage
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
