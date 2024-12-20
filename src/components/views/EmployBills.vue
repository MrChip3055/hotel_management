<template>
  <div class="bill-wrapper">
    <div class="bill-container">
      <h2 style="margin-bottom: 20px">账单管理</h2>
      <!-- 搜索框 -->
      <el-input
          v-model="searchQuery"
          placeholder="输入客户姓名、房间号或日期搜索"
          clearable
          class="search-input"
      />
      <!-- 表格展示数据 -->
      <el-table id="bills-table" :data="filteredBills" style="width: 100%">
        <!-- 房型筛选展示为标签 -->
        <el-table-column
            prop="typeName"
            label="房型"
            width="120"
        >
        </el-table-column>
        <!-- 服务员姓名列 -->
        <el-table-column prop="name" label="客户" width="100" />
        <!-- 房间号列 -->
        <el-table-column prop="roomId" label="房间号" width="100" />
        <!-- 账单金额列 -->
        <el-table-column prop="amount" label="账单金额" width="120" />
        <!-- 入住日期列 -->
        <el-table-column prop="inTime" label="入住日期" width="180">
          <template #default="scope">
            {{ scope.row.inTime }}
          </template>
        </el-table-column>
        <!-- 离开日期列 -->
        <el-table-column prop="outTime" label="离开日期" width="180">
          <template #default="scope">
            {{ scope.row.outTime }}
          </template>
        </el-table-column>
      </el-table>
      <!-- 功能按钮 -->
      <div class="button-container">
        <el-button @click="clearAllFilters">重置所有搜索条件</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
import { billList } from "@/services/bill";
import { roomTypeD } from "@/utils/dists";

export default {
  data() {
    return {
      rtDist: roomTypeD(),
      billData: [], // 用于存储账单数据
      searchQuery: "", // 搜索框绑定的查询条件
    };
  },
  computed: {
    // 过滤后的账单数据
    filteredBills() {
      const keyword = this.searchQuery.toLowerCase();
      return this.billData.filter((bill) => {
        const matchesStaffName = bill.name.toLowerCase().includes(keyword);
        const matchesRoomNumber = bill.roomId.toString().includes(keyword);
        const matchesDate = bill.inTime.includes(keyword) || bill.outTime.includes(keyword);
        return matchesStaffName || matchesRoomNumber || matchesDate;
      });
    },
  },
  methods: {
    // 清除所有搜索条件
    clearAllFilters() {
      this.searchQuery = "";
      ElMessage.success("搜索条件已重置");
    },
  },
  created() {
    billList()
        .then((response) => {
          console.log(response.data);
          this.billData = response.data
              .filter((bill) => bill)
              .map((bill) => ({
                name: bill.name,
                roomId: bill.roomId, // 房间号
                typeName: this.rtDist[bill.typeName], // 房型
                amount: bill.amount, // 账单金额
                inTime: new Date(bill.inTime).toLocaleString(), // 入住日期
                outTime: new Date(bill.outTime).toLocaleString(), // 离开日期
              }));
        })
        .catch((err) => {
          console.log(err);
          if (err) {
            switch (err.status) {
              case 404:
                break;
              default:
                break;
            }
          }
        });
  },
};
</script>

<style scoped>
.bill-wrapper {
  user-select: none;
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
