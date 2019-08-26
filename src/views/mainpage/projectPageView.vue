<template>
  <projectPageView></projectPageView>
</template>

<script>
import projectPage from "@/components/mainpage/projectPage.vue";

export default {
  name: "projectPage",
  components: {
    projectPageView: projectPage
  },
  created: function() {
    this.$emit("createTable", true);
    this.$emit("update_project", true);
    this.$emit("insert_project", false);
  }
};
</script>

<style>
</style>
