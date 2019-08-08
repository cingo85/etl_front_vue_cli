<template>
  <insertprojectView></insertprojectView>
</template>

<script>
import insertproject from "@/components/mainpage/insertproject.vue";
export default {
  name: "insertproject",
  components: {
    insertprojectView: insertproject
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
