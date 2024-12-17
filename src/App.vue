<template>
  <keep-alive>
    <router-view />
  </keep-alive>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();

    // 根据当前路由显示或隐藏头部
    const showHeader = route.path !== "/login";

    return {
      showHeader,
    };
  },
};
</script>

<style>
#app {
  overflow: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
}
.el-main{
  padding: 0;
  margin: 0;
}
</style>
