<template>
  <div class="login">
    <Login msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import 'bootstrap'
import 'jquery'
import 'popper.js'

export default {
  name: 'login',
  components: {
    Login
  }
}
</script>
