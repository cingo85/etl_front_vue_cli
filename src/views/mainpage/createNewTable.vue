<template>
<create-New-Table></create-New-Table>
</template>

<script>
import createNewTable from "@/components/mainpage/createNewTable.vue";
export default {
  name: "createNewTable",
  components: {
    "create-New-Table": createNewTable
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
