<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
      <div style="width: 400px">
          <h3>Login</h3>
          <div class="form-group">
            <label>Username</label>
            <input class="form-control" name="username" placeholder="Username">
            <small class="form-text text-muted">username</small>
          </div>
          <button type="button" class="btn btn-primary" @click="submit()">Login</button>
          <button type="button" class="btn btn-light" onclick="location.href='/sign'">Sign up</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Http} from "../common/http";
  export default {
    data(){
      return {

      }
    },
    mounted(){

    },
    methods:{
      submit(){
        console.log("----")
        Http.post("/login",{});
      }
    }
  }
</script>