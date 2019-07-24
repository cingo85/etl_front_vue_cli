<template>
  <div id="app">
    <router-view/>
    
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

</style>
