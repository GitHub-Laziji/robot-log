<template>
  <div>
    <div class="px-4 py-3">
      <div class="d-flex">
        <el-input v-model="query.limit" placeholder="Limit" style="width:150px"></el-input>
        <el-button type="primary" @click="listDay"  style="margin-left:8px">查询</el-button>
      </div>
      <div style="width:50%">
        <div class="mt-3" v-for="item in list" :key="item.date">
          <el-card>
            <div slot="header" style="display: flex;align-items: center;">
              <div>
                <span style="font-size: 1.5rem;font-weight: 500;line-height: 1.2;">{{item.date}}</span>&nbsp;
                <span style="font-size: 0.9rem;line-height: 1.2;">{{item.week}}</span>&nbsp;
                <span style="font-size: 0.9rem;line-height: 1.2;">{{item.list.length}}条记录</span>
              </div>

              <button class="btn ml-3" title="复制到剪贴板">
                <img
                  class="clippy"
                  width="13"
                  src="https://clipboardjs.com/assets/images/clippy.svg"
                  alt="复制到剪贴板"
                >
              </button>
            </div>
            <div
              style="line-height: 25px"
              v-for="line in item.list"
              :key="line.value"
              v-html="line.value"
            ></div>
          </el-card>
        </div>
        <div style="height: 100px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Http } from "../common/http";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      query: {
        limit: 100
      },
      list: []
    };
  },
  mounted() {
    this.listDay();
  },
  methods: {
    listDay() {
      const loading = this.$loading({
        lock: true,
        text: "日志加载中",
        spinner: "el-icon-loading"
      });
      Http.get("/dayLog", this.query)
        .then(result => {
          this.list = result;
        })
        .finally(() => loading.close());
    }
  }
};
</script>

<style>
</style>
