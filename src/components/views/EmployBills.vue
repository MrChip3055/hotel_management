<template>
  <div class="bill-wrapper">
    <div class="bill-container">
      <h2>账单管理</h2>
      <!-- 搜索框 -->
      <el-input
          v-model="search"
          placeholder="输入服务员姓名、房间号或日期搜索"
          clearable
          class="search-input"
      />
      <!-- 表格展示数据 -->
      <el-table id ='bills-table' :data="filteredData" style="width: 100%">
        <!-- 房型筛选展示为标签 -->
        <el-table-column
            prop="roomType"
            label="房型"
            width="200"
        >
          <template #default="scope">
            <el-tag
                :type="
                scope.row.roomType.includes('豪华')
                  ? 'success'
                  : 'primary'
              "
                disable-transitions
            >{{ scope.row.roomType }}</el-tag
            >
          </template>
        </el-table-column>
        <!-- 服务员姓名列 -->
        <el-table-column prop="name" label="服务员" width="180" />
        <!-- 房间号列 -->
        <el-table-column prop="roomNumber" label="房间号" width="180" />
        <!-- 账单金额列 -->
        <el-table-column prop="billAmount" label="账单金额" width="150" />
        <!-- 日期列 -->
        <el-table-column prop="date" label="日期" width="150" />
      </el-table>
      <!-- 功能按钮 -->
      <div class="button-container">
        <el-button @click="clearAllFilters">重置所有搜索条件</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";

// 模拟数据
const tableData = ref([
  {
    date: "2024-12-08",
    roomType: "标准单人房",
    name: "Alice",
    roomNumber: "101",
    billAmount: 1200,
  },
  {
    date: "2024-12-07",
    roomType: "豪华单人房",
    name: "Bob",
    roomNumber: "102",
    billAmount: 1500,
  },
  {
    date: "2024-12-06",
    roomType: "标准双人房",
    name: "Charlie",
    roomNumber: "103",
    billAmount: 1800,
  },
  {
    date: "2024-12-05",
    roomType: "豪华套房",
    name: "Diana",
    roomNumber: "104",
    billAmount: 2500,
  },
  {
    date: "2024-12-08",
    roomType: "标准单人房",
    name: "Alice",
    roomNumber: "101",
    billAmount: 1200,
  },
  {
    date: "2024-12-07",
    roomType: "豪华单人房",
    name: "Bob",
    roomNumber: "102",
    billAmount: 1500,
  },
  {
    date: "2024-12-06",
    roomType: "标准双人房",
    name: "Charlie",
    roomNumber: "103",
    billAmount: 1800,
  },
  {
    date: "2024-12-05",
    roomType: "豪华套房",
    name: "Diana",
    roomNumber: "104",
    billAmount: 2500,
  },  {
    date: "2024-12-08",
    roomType: "标准单人房",
    name: "Alice",
    roomNumber: "101",
    billAmount: 1200,
  },
  {
    date: "2024-12-07",
    roomType: "豪华单人房",
    name: "Bob",
    roomNumber: "102",
    billAmount: 1500,
  },
  {
    date: "2024-12-06",
    roomType: "标准双人房",
    name: "Charlie",
    roomNumber: "103",
    billAmount: 1800,
  },
  {
    date: "2024-12-05",
    roomType: "豪华套房",
    name: "Diana",
    roomNumber: "104",
    billAmount: 2500,
  },  {
    date: "2024-12-08",
    roomType: "标准单人房",
    name: "Alice",
    roomNumber: "101",
    billAmount: 1200,
  },
  {
    date: "2024-12-07",
    roomType: "豪华单人房",
    name: "Bob",
    roomNumber: "102",
    billAmount: 1500,
  },
  {
    date: "2024-12-06",
    roomType: "标准双人房",
    name: "Charlie",
    roomNumber: "103",
    billAmount: 1800,
  },
  {
    date: "2024-12-05",
    roomType: "豪华套房",
    name: "Diana",
    roomNumber: "104",
    billAmount: 2500,
  },  {
    date: "2024-12-08",
    roomType: "标准单人房",
    name: "Alice",
    roomNumber: "101",
    billAmount: 1200,
  },
  {
    date: "2024-12-07",
    roomType: "豪华单人房",
    name: "Bob",
    roomNumber: "102",
    billAmount: 1500,
  },
  {
    date: "2024-12-06",
    roomType: "标准双人房",
    name: "Charlie",
    roomNumber: "103",
    billAmount: 1800,
  },
  {
    date: "2024-12-05",
    roomType: "豪华套房",
    name: "Diana",
    roomNumber: "104",
    billAmount: 2500,
  },
]);

// 搜索框绑定的值
const search = ref("");

// 过滤逻辑
const filteredData = computed(() =>
    tableData.value.filter((data) => {
      const keyword = search.value.toLowerCase();
      const matchesName = data.name.toLowerCase().includes(keyword);
      const matchesRoomNumber = data.roomNumber.includes(keyword);
      const matchesDate = data.date.includes(keyword);

      return matchesName || matchesRoomNumber || matchesDate;
    })
);

// 清除所有搜索条件
const clearAllFilters = () => {
  search.value = "";
  ElMessage.success("搜索条件已重置");
};
</script>

<style scoped>
.bill-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: transparent;
}

.bill-container {
  width: 900px;
  height: 500px;
  padding: 20px;
  overflow-y: auto;
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

#bills-table {
  height: 60%;
  display: flex;
  overflow: auto;
  box-sizing: border-box;
}

.search-input {
  margin-bottom: 20px;
  width: 100%;
}

.button-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}
</style>