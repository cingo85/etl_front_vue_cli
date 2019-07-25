<template>
  <div id="app">
    <Header v-if="header_show">
      <app-header></app-header>
    </Header>
    <router-view v-on:header="header" v-on:footer="footer"></router-view>
    <projectChangePage v-if="project_show">
      <project-Page></project-Page>
    </projectChangePage>
    <Footer v-if="footer_show">
      <app-footer></app-footer>
    </Footer>
  </div>
</template>
<script>
import Login from "@/views/Login.vue";
import FunctionTable from "@/views/FunctionTable.vue";
import Header from "@/views/header.vue";
import Footer from "@/views/footer.vue";
import projectChangePage from "@/views/projectChangePage.vue";

export default {
  name: "App",
  data() {
    return {
      header_show: true,
      footer_show: true,
      project_show: false
    };
  },
  components: {
    Login,
    FunctionTable,
    "app-header": Header,
    "app-footer": Footer,
    "project-Page": projectChangePage
  },
  methods: {
    header: function(bool) {
      this.header_show = bool;
    },
    footer: function(bool) {
      this.footer_show = bool;
    },
    project: function(bool) {
      this.project_show = bool;
    }
  }
};
</script>


<style>
</style>
