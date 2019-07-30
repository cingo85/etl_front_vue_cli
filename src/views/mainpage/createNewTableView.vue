<template>
  <createNewTableView></createNewTableView>
</template>

<script>
import createNewTableView from "@/components/mainpage/createNewTable.vue";
export default {
  name: "createNewTable",
  components: {
    createNewTableView: createNewTableView
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
