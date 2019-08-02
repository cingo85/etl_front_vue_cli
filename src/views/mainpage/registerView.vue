<template>
  <RegisterView></RegisterView>
</template>

<script>
import RegisterView from "@/components/mainpage/register.vue";
import "bootstrap";
import "jquery";
import "popper.js";
import "../../assets/css/style2.css";

export default {
  name: "register",
  components: {
    RegisterView
  },
  data() {
    return {};
  },
  created: function() {
    this.$emit("header", false);
    this.$emit("footer", false);
  }
};
</script>

<style>
</style>
