<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;height: 100vh;">
      <div style="width: 400px">
        <div class="pb-3">
          <h3>Login</h3>
        </div>
        <el-form :model="form" :rules="rules" ref="form" label-position="top" @submit.native.prevent>
          <el-form-item prop="username">
            <el-input v-model="form.username" placeholder="用户名" @keyup.enter.native="submit"></el-input>
          </el-form-item>
        </el-form>
        <div class="pt-2">
          <el-button type="primary" @click="submit">登录</el-button>
          <router-link to="/sign">
            <el-button class="ml-2">注册</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Http } from "../common/http"
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'context',
      ])
    },
    data() {
      return {
        form: {
          username: null
        },
        rules: {
          username: [{ required: true, message: "请输入用户名", trigger: "blur" }]
        }
      };
    },
    mounted() { },
    methods: {
      submit() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            Http.post("/login", this.form).then(result => {
              this.context.session.user = result;
              location.href = "#/home/config";
            });
          }
        });
      }
    }
  };
</script>