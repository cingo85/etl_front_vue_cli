<template>
  <LoginView></LoginView>
</template>

<script>
// @ is an alias to /src
import LoginView from "@/components/mainpage/Login.vue";
import "bootstrap";
import "jquery";
import "popper.js";
import "../../assets/css/style2.css";

export default {
  name: "login",
  components: {
    LoginView
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
