<template>
  <indexpageView></indexpageView>
</template>

<script>
import indexPageView from "@/components/mainpage/IndexPage.vue";
export default {
  name: "indexPage",
  components: {
    indexpageView: indexPageView
  },
  created: function() {
    this.$emit("insert_project", true);
  }
};
</script>

<style>
</style>
