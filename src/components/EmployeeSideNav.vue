<script>
import '@mdui/icons/hotel.js';
import '@mdui/icons/time-to-leave.js';
import '@mdui/icons/attach-money.js';
import '@mdui/icons/search.js';
export default {
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<template>
    <mdui-navigation-rail id="main-nav-rail" value="main" contained="true" alignment="center" style="border-radius: 0 1.5rem 1.5rem 0; width: 100px;padding: 22px">
      <mdui-navigation-rail-item value="main" @click="navigateTo('/employee/roominfo')">
        <mdui-icon-search slot="icon"></mdui-icon-search>
        客房管理
      </mdui-navigation-rail-item>
      <mdui-navigation-rail-item value="socialpractice" @click="navigateTo('/employee/employeecheckin')">
        <mdui-icon-hotel slot="icon"></mdui-icon-hotel>
        办理入住
      </mdui-navigation-rail-item>
      <mdui-navigation-rail-item value="awards" @click="navigateTo('/home/awards')">
        <mdui-icon-time-to-leave slot="icon"></mdui-icon-time-to-leave>
        办理退房
      </mdui-navigation-rail-item>
      <mdui-navigation-rail-item value="grade" @click="navigateTo('/home/grades')">
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
