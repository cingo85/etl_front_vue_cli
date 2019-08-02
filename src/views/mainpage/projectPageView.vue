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
    this.$emit("project", true);
  }
};
</script>

<style>
</style>
