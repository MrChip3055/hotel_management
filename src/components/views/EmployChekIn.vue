<template>
  <div class="check-in-wrapper">
    <el-card class="check-in-container" shadow="hover">
      <h2 class="check-in-title" style="margin-bottom: 30px">办理入住</h2>
      <el-form :model="checkInForm" :rules="rules" ref="checkInForm" label-width="120px">
        <el-form-item label="房型" prop="roomType">
          <el-select v-model="checkInForm.roomType" placeholder="请选择房型">
            <el-option v-for="type in roomTypes" :key="type.value" :label="type.label" :value="type.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="checkInForm.userName" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="checkInForm.idNumber" placeholder="请输入身份证号" maxlength="18" />
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="checkInForm.phoneNumber" placeholder="请输入手机号" maxlength="11" />
        </el-form-item>
        <el-form-item label="房间号" prop="roomNumber">
          <el-input v-model="checkInForm.roomNumber" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item style="margin: 0">
          <div class="button-container">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 查询空房间的表格 -->
    <div class="room-table-container">
      <h3>房间清单</h3>
      <div class="bottom-group">
        <el-button @click="resetDateFilter">重置日期筛选</el-button>
        <el-button @click="clearFilter">清除所有筛选</el-button>
      </div>
      <el-table id="room-info-table" ref="tableRef" :data="tableData" style="width: 100%" row-key="date">
        <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            :filters="dateFilters"
            :filter-method="filterHandler"
        />
        <el-table-column prop="roomNumber" label="房间号" width="180" />
        <el-table-column prop="roomType" label="房型" />
        <el-table-column
            prop="status"
            label="状态"
            width="100"
            :filters="statusFilters"
            :filter-method="filterStatus"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status === '空房' ? 'success' : 'info'">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CheckIn",
  data() {
    return {
      checkInForm: {
        roomType: "",
        userName: "",
        idNumber: "",
        phoneNumber: "",
        roomNumber: "",
      },
      roomTypes: [
        { label: "标准单人房", value: "single" },
        { label: "豪华单人房", value: "deluxe_single" },
        { label: "标准双人房", value: "double" },
        { label: "豪华套房", value: "suite" },
      ],
      rules: {
        roomType: [{ required: true, message: "请选择房型", trigger: "change" }],
        userName: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        idNumber: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        phoneNumber: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        roomNumber: [{ required: true, message: "请输入房间号", trigger: "blur" }],
      },
      tableData: [
        { date: "2024-12-01", roomNumber: "101", roomType: "单人房", status: "空房" },
        { date: "2024-12-02", roomNumber: "102", roomType: "单人房", status: "入住" },
        { date: "2024-12-03", roomNumber: "201", roomType: "双人房", status: "空房" },
        { date: "2024-12-04", roomNumber: "202", roomType: "套房", status: "入住" },
        { date: "2024-12-01", roomNumber: "101", roomType: "单人房", status: "空房" },
        { date: "2024-12-02", roomNumber: "102", roomType: "单人房", status: "入住" },
        { date: "2024-12-03", roomNumber: "201", roomType: "双人房", status: "空房" },
        { date: "2024-12-04", roomNumber: "202", roomType: "套房", status: "入住" },
        { date: "2024-12-01", roomNumber: "101", roomType: "单人房", status: "空房" },
        { date: "2024-12-02", roomNumber: "102", roomType: "单人房", status: "入住" },
        { date: "2024-12-03", roomNumber: "201", roomType: "双人房", status: "空房" },
        { date: "2024-12-04", roomNumber: "202", roomType: "套房", status: "入住" },
        { date: "2024-12-01", roomNumber: "101", roomType: "单人房", status: "空房" },
        { date: "2024-12-02", roomNumber: "102", roomType: "单人房", status: "入住" },
        { date: "2024-12-03", roomNumber: "201", roomType: "双人房", status: "空房" },
        { date: "2024-12-04", roomNumber: "202", roomType: "套房", status: "入住" },
        { date: "2024-12-01", roomNumber: "101", roomType: "单人房", status: "空房" },
        { date: "2024-12-02", roomNumber: "102", roomType: "单人房", status: "入住" },
        { date: "2024-12-03", roomNumber: "201", roomType: "双人房", status: "空房" },
        { date: "2024-12-04", roomNumber: "202", roomType: "套房", status: "入住" },
      ],
      dateFilters: [
        { text: "2024-12-01", value: "2024-12-01" },
        { text: "2024-12-02", value: "2024-12-02" },
        { text: "2024-12-03", value: "2024-12-03" },
      ],
      statusFilters: [
        { text: "空房", value: "空房" },
        { text: "入住", value: "入住" },
      ],
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.checkInForm.validate((valid) => {
        if (valid) {
          this.$message.success("入住信息提交成功！");
        }
      });
    },
    handleReset() {
      this.$refs.checkInForm.resetFields();
    },
    resetDateFilter() {
      this.$refs.tableRef.clearFilter(["date"]);
    },
    clearFilter() {
      this.$refs.tableRef.clearFilter();
    },
    filterHandler(value, row) {
      return row.date === value;
    },
    filterStatus(value, row) {
      return row.status === value;
    },
  },
};
</script>

<style scoped>
/* 父容器使其充满整个视口 */
.check-in-wrapper {
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%; /* 设置高度为视口的100% */
  width: 100%; /* 设置宽度为视口的100% */
  margin: 0; /* 移除默认的外边距 */
  background:transparent;
}

/* 表单容器宽度并给它一些内边距 */
.check-in-container {
  padding: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  width: 600px; /* 宽度限制为400px */
  height: 60%;
}
/* 表格容器 */
.room-table-container {
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 600px; /* 限制表格的宽度与表单一致 */
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ebeef5; /* 添加边框 */
  border-radius: 6px; /* 圆角边框 */
  background-color: #ffffff; /* 背景颜色 */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /* 添加阴影 */
}


/* 按钮容器使用Flexbox居中按钮 */
.button-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 按钮之间的间隔 */
}

#room-info-table{
  overflow: auto;
  height: 100%;
}
</style>
