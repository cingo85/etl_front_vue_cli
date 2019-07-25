<template>
  <NotFound></NotFound>
</template>

<script>
import NotFound from "@/components/404.vue";
export default {
  name: "404",
  components: {
    NotFound
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
