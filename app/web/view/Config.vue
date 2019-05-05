<template>
  <div>
    <div style="display: flex;justify-content: center;align-items: center;">
      <div class="pt-4" style="width: 450px">
        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="80px">
          <el-form-item label="项目地址" prop="baseUrl">
            <el-input v-model="form.baseUrl" placeholder="项目地址"></el-input>
          </el-form-item>
          <el-form-item label="分支名" prop="branch">
            <el-input v-model="form.branch" placeholder="分支名"></el-input>
          </el-form-item>
          <el-form-item label="开发者" prop="author">
            <el-input v-model="form.author" placeholder="开发者"></el-input>
          </el-form-item>
          <el-form-item label="日报格式" prop="format">
            <el-input v-model="form.format" placeholder="日报格式"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Http } from "../common/http";
export default {
  data() {
    return {
      form: {},
      rules: []
    };
  },
  mounted() {
    Http.get("/api/config").then(result => {
      console.log(result);
    });
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          Http.post("/login", this.form).then(result => {
            this.$message.success("登录成功");
          });
        }
      });
    }
  }
};
</script>
