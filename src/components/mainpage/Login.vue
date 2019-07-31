<template>
<body class="gray-bg">
  <div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
      <div>
        <h6 class="logo-name">IN+</h6>
      </div>
      <h3>ETL清洗程式</h3>

      <p>test</p>
      <form class="m-t" role="form">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            required
            v-model="username"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            required
            v-model="password"
          />
        </div>
        <button v-on:click="login" type="submit" class="btn btn-primary block full-width m-b">Login</button>

        <a class="btn btn-sm btn-black btn-block" href="/register">Create an account</a>
      </form>
    </div>
  </div>
</body>
</template>

<script>
import { apiUserLogin } from "../../api";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      apiUserLogin({
        username: this.username,
        password: this.password
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
    /*
    login: function() {
      let username = this.username;
      let password = this.password;
      this.$store
        .dispatch("login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }*/
  }
};
</script>


<style>
</style>
