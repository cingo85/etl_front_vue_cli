<template>
 
    <body class="gray-bg">
    <div class="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>
                <h6 class="logo-name">IN+</h6>
            </div>
            <h3>ETL清洗程式</h3>
           
            <p>請輸入帳號密碼</p>
            <form class="m-t" role="form" action="index.html">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Username" required="" id="username">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" required="" id="password">
                </div>
                <button type="submit" class="btn btn-primary block full-width m-b">Login</button>

                <a class="btn btn-sm btn-white btn-block" href="register.html">Create an account</a>
            </form>
        </div>
    </div>
</body>
</template>

<script>
import '../assets/css/style2.css'
export default {
    name: 'login'

}

   
   
</script>


<style>

</style>
