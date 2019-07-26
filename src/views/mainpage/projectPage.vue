<template>
  <project-Page></project-Page>
</template>

<script>
import projectPage from "@/components/mainpage/projectPage.vue";

export default {
  name: "projectPage",
  components: {
    "project-Page": projectPage
  },
  created: function() {
    this.$emit("createTable", true);
    this.$emit("project", true);
  }
};
</script>

<style>
</style>
