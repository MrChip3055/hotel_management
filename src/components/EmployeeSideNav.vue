<script>
import '@mdui/icons/hotel.js';
import '@mdui/icons/time-to-leave.js';
import '@mdui/icons/attach-money.js';
import '@mdui/icons/search.js';
import { useRoute, useRouter } from "vue-router";
export default {
  setup() {
    const route = useRoute(); // 获取当前路由信息
    const router = useRouter();

    const navigateTo = (path) => {
      router.push(path); // 跳转到目标路由
    };

    return {
      currentRoute: route.path, // 当前激活的路由路径
      navigateTo,
    };
  },
};
</script>

<template>
  <mdui-navigation-rail
      id="main-nav-rail"
      :value="currentRoute"
      contained="contained"
      alignment="center"
      style="border-radius: 0 1.5rem 1.5rem 0; width: 100px; padding: 22px"
  >
  <mdui-navigation-rail-item
      value="/employee/roominfo"
      @click="navigateTo('/employee/roominfo')"
  >
    <mdui-icon-search slot="icon"></mdui-icon-search>
    客房管理
  </mdui-navigation-rail-item>
  <mdui-navigation-rail-item
      value="/employee/employeecheckin"
      @click="navigateTo('/employee/employeecheckin')"
  >
    <mdui-icon-hotel slot="icon"></mdui-icon-hotel>
    办理入住
  </mdui-navigation-rail-item>
  <mdui-navigation-rail-item
      value="/employee/employeequit"
      @click="navigateTo('/employee/employeequit')"
  >
    <mdui-icon-time-to-leave slot="icon"></mdui-icon-time-to-leave>
    办理退房
  </mdui-navigation-rail-item>
  <mdui-navigation-rail-item
      value="/employee/employeebills"
      @click="navigateTo('/employee/employeebills')"
  >
    <mdui-icon-attach-money slot="icon"></mdui-icon-attach-money>
    账单
  </mdui-navigation-rail-item>
  </mdui-navigation-rail>
</template>


<style scoped>
#main-nav-rail{
  box-shadow: var(--mdui-elevation-level3);
}

</style>
