<template>
  <div class="d-flex flex-column bg-writer" style="min-height:100vh">
    <div class="d-flex justify-content-between align-items-center">
      <div style="flex:1">
        <el-menu class="px-4" :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item v-for="item in menuRouterMap" :key="item.path" :index="item.path">{{item.meta.title}}
          </el-menu-item>
        </el-menu>
      </div>
      <div>
        <el-menu class="px-4" mode="horizontal">
          <el-submenu index="0">
            <template slot="title">
              <span class="text-uppercase font-weight-bold">{{context.session.user.username}}</span>
            </template>
            <el-menu-item index="1" @click="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>


    <div class="px-4 py-3">
      <router-view />
    </div>

  </div>
</template>

<script>
  import { menuRouterMap } from "../../router"
  import { mapGetters } from 'vuex'
  import { Http } from "../../common/http"

  export default {
    computed: {
      ...mapGetters([
        'context'
      ])
    },
    data() {
      return {
        menuRouterMap,
        activeIndex: "config"
      };
    },
    methods: {
      handleSelect(key) {
        console.log(key);
      },
      logout(){
        console.log(11);
      }
    }
  };
</script>