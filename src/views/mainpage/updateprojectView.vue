<template>
  <updateprojectView></updateprojectView>
</template>

<script>
import updateproject from "@/components/mainpage/updateproject.vue";
export default {
  name: "updateproject",
  components: {
    updateprojectView: updateproject
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
