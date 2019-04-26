<template>
  <div class="d-flex flex-column bg-writer" style="min-height:100vh">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" class="px-4">
      <el-menu-item
        v-for="item in menuRouterMap"
        :key="item.path"
        :index="item.path"
      >{{item.meta.title}}</el-menu-item>
    </el-menu>
    <div class="px-4 py-3">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import { menuRouterMap } from "../../router";

export default {
  data() {
    return {
      menuRouterMap,
      activeIndex: "config"
    };
  },
  methods: {
    handleSelect(key) {
      console.log(key);
    }
  }
};
</script>