<template>
  <div class="layout_container">
    <!--侧边菜单栏-->
    <div
      class="layout_slider"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Logo></Logo>
      <el-scrollbar class="scrollbar">
        <el-menu
          :collapse="layOutSettingStore.fold ? true : false"
          :default-active="$route.path"
          background-color="#001529"
          text-color="white"
          active-text-color="yellowgreen"
        >
          <!--根据路由动态生成菜单-->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>

    <!--顶部导航-->
    <div
      class="layout_tabbar"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Tabbar> </Tabbar>
    </div>

    <!--内容-->
    <div
      class="layout_main"
      :class="{ fold: layOutSettingStore.fold ? true : false }"
    >
      <Main> </Main>
    </div>
  </div>
</template>

<script setup lang="ts">
//引入左侧菜单logo子组件
import Logo from "./logo/index.vue";
//引入菜单组件
import Menu from "./menu/index.vue";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";
import useLayOutSettingStore from "@/store/modules/setting";
import { useRoute } from "vue-router";
//获取用户相关的小仓库
import useUserStore from "@/store/modules/user";

let userStore = useUserStore();
let $route = useRoute();
let layOutSettingStore = useLayOutSettingStore();
</script>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    color: white;
    width: $base-menu-width;
    height: 100vh;
    background: $base-menu-background;
    transition: all 0.3s;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;
      }
    }
    &.fold {
      width: $base-menu-min-width;
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.3s;
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    left: $base-menu-width;
    top: $base-tabbar-height;
    padding: 20px;
    overflow: auto;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;
    }
  }
}
</style>
