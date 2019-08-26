<template>
  <div id="app">
    <Header v-if="header_show">
      <app-header></app-header>
    </Header>
    <router-view
      v-on:header="header"
      v-on:footer="footer"
      v-on:insert_project="insert_project"
      v-on:update_project="update_project"
      v-on:createTable="createTable"
    ></router-view>
    <insertprojectView v-if="insert_project_show">
      <insert-project-Page></insert-project-Page>
    </insertprojectView>
    <updateprojectView v-if="update_project_show">
      <update-project-Page></update-project-Page>
    </updateprojectView>
    <createNewTable v-if="create_table_show">
      <create-Table></create-Table>
    </createNewTable>
    <Footer v-if="footer_show">
      <app-footer></app-footer>
    </Footer>
  </div>
</template>
<script>
import Login from "@/views/mainpage/LoginView.vue";
import FunctionTable from "@/views/mainpage/FunctionTableView.vue";
import Header from "@/views/otherpage/headerView.vue";
import Footer from "@/views/otherpage/footerView.vue";
import insertprojectView from "@/views/mainpage/insertprojectView.vue";
import updateprojectView from "@/views/mainpage/updateprojectView.vue";
import indexPageView from "@/views/mainpage/indexPageView";
import createNewTable from "@/views/mainpage/createNewTableView.vue";
import Register from "@/views/mainpage/registerView.vue";
import Vue from "vue";

export default {
  name: "App",
  data() {
    return {
      header_show: true,
      footer_show: true,
      insert_project_show: false,
      update_project_show: false,
      create_table_show: false
    };
  },
  components: {
    Login,
    FunctionTable,
    insertprojectView,
    updateprojectView,
    createNewTable,
    Register,
    indexPageView,
    "app-header": Header,
    "app-footer": Footer,
    "insert-project-Page": insertprojectView,
    "update-project-Page": updateprojectView,
    "create-Table": createNewTable
  },
  methods: {
    header: function(bool) {
      this.header_show = bool;
    },
    footer: function(bool) {
      this.footer_show = bool;
    },
    insert_project: function(bool) {
      this.insert_project_show = bool;
    },
    update_project: function(bool) {
      this.update_project_show = bool;
    },
    createTable: function(bool) {
      this.create_table_show = bool;
    }
  }
};
</script>


<style>
</style>
