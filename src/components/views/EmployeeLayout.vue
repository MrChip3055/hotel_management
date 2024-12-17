<template>
  <div class="employee-layout">
    <SideNav /> <!-- 显示侧边导航栏 -->
    <el-main>
      <keep-alive>

        <router-view />

      </keep-alive>
    </el-main>
  </div>
</template>

<script>
import SideNav from '@/components/EmployeeSideNav.vue'; // 确保路径正确

export default {
  components: {
    SideNav
  }
}
</script>

<style scoped>
.employee-layout {
  display: flex;
  height: 100vh;
}
</style>
