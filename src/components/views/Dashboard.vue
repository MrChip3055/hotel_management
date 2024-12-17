<template>
  <div class="room-stats-wrapper">
    <h2 id="page-title">房间统计信息</h2>
    <div class="room-stats-container">
      <div v-for="room in roomStats" :key="room.fullName" class="room-card">
        <el-card shadow="none">
          <template #header>
            <div class="card-header">{{ room.fullName }}</div>
          </template>
          <div class="card-content">
            <p>价格: <strong>￥{{ room.price }}</strong></p>
            <p>空房数量: <strong>{{ room.available }}</strong></p>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
import {ref, onMounted, onBeforeUnmount} from "vue";
import axios from "axios";
import { listAvailable } from "@/services/room";

interface RoomStat {
  fullName: string;
  price: number;
  available: number;
}

const roomStats = ref<RoomStat[]>([]);

// 获取信息
listAvailable().then(r => {
  console.log(r.data)
  roomStats.value = r.data;
}).catch(e => {
  console.log(e);
})

  const controller = new AbortController();
  onBeforeUnmount(() => {
    controller.abort();
  });


// 组件挂载时调用接口
onMounted(() => {
});
</script>


<style scoped>
.room-stats-wrapper {
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 100px;
  background-color: transparent;
}

.room-stats-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 每行两列 */
  gap: 20px;
  width: 100%;
  place-items: center;
  max-width: 800px;
}

#page-title{
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
}

.room-card {
  width:85%;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影仅在底部 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加平滑动画 */
}

/* 卡片悬停效果 */
.room-card:hover {
  transform: scale(1.05); /* 放大效果 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 更深的阴影 */
}

.card-header {
  font-size: 18px;
  font-weight: bold;
}

.card-content p {
  margin: 5px 0;
  font-size: 14px;
}
</style>

