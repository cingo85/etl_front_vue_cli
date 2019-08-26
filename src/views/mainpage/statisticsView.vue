<template>
  <statisticsView></statisticsView>
</template>

<script>
import statisticsView from "@/components/mainpage/statistics.vue";

export default {
  name: "statistics",
  components: {
    statisticsView
  },
  created: function() {
    this.$emit("createTable", false);
    this.$emit("update_project", false);
    this.$emit("insert_project", false);
  }
};
</script>

<style>
</style>
