<template>
  <div id="app">
    <router-view/>
    <router-link to="/Login">Login</router-link>
     <router-link to="/FunctionTable">FunctionTable</router-link>
  </div>
</template>
<script>
import Login from '@/views/Login.vue'
import FunctionTable from '@/views/FunctionTable.vue'
export default {
   components:{
      Login,
      FunctionTable
   }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
