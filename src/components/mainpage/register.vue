<template>
<body class="gray-bg">
  <div class="middle-box text-center loginscreen animated fadeInDown">
    <div>
      <div>
        <h1 class="logo-name">IN+</h1>
      </div>
      <h3>註冊一組新帳號</h3>
      <p>請輸入帳號密碼</p>
      <form class="m-t" role="form" action="login.html">
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
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="member_title"
            required
            v-model="member_title"
          />
        </div>
        <div class="form-group"></div>
        <button
          v-on:click="register"
          type="button"
          class="btn btn-primary block full-width m-b"
        >Register</button>
        <a class="btn btn-sm btn-black btn-block" href="/">登入頁面</a>
      </form>
      <p class="m-t">
        <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small>
      </p>
    </div>
  </div>
</body>
</template>

<script>
import { apiUserRegister } from "../../api.js";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      member_title: ""
    };
  },
  methods: {
    register() {
      apiUserRegister({
        username: this.username,
        password: this.password,
        member_title: this.member_title
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
