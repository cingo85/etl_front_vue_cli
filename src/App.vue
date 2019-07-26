<template>
  <div id="app">
    <Header v-if="header_show">
      <app-header></app-header>
    </Header>
    <router-view
      v-on:header="header"
      v-on:footer="footer"
      v-on:project="project"
      v-on:createTable="createTable"
    ></router-view>
    <projectChangePage v-if="project_show">
      <project-Page></project-Page>
    </projectChangePage>
    <createNewTable v-if="create_table_show">
      <create-Table></create-Table>
    </createNewTable>
    <Footer v-if="footer_show">
      <app-footer></app-footer>
    </Footer>
  </div>
</template>
<script>
import Login from "@/views/mainpage/Login.vue";
import FunctionTable from "@/views/mainpage/FunctionTable.vue";
import Header from "@/views/otherpage/header.vue";
import Footer from "@/views/otherpage/footer.vue";
import projectChangePage from "@/views/mainpage/projectChangePage.vue";
import createNewTable from "@/views/mainpage/createNewTable.vue";

export default {
  name: "App",
  data() {
    return {
      header_show: true,
      footer_show: true,
      project_show: false,
      create_table_show: false
    };
  },
  components: {
    Login,
    FunctionTable,
    projectChangePage,
    createNewTable,
    "app-header": Header,
    "app-footer": Footer,
    "project-Page": projectChangePage,
    "create-Table": createNewTable
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
    },
    createTable: function(bool) {
      this.create_table_show = bool;
    }
  }
};
</script>


<style>
</style>
