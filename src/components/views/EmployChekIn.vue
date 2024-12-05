<template>
  <div class="check-in-wrapper">
    <el-card class="check-in-container" shadow="hover">
      <h2 class="check-in-title" style="margin-bottom: 30px">办理入住</h2>
      <el-form :model="checkInForm" :rules="rules" ref="checkInForm" label-width="120px">
        <!-- 房型 -->
        <el-form-item label="房型" prop="roomType">
          <el-select v-model="checkInForm.roomType" placeholder="请选择房型">
            <el-option v-for="type in roomTypes" :key="type.value" :label="type.label" :value="type.value" />
          </el-select>
        </el-form-item>

        <!-- 用户姓名 -->
        <el-form-item label="用户姓名" prop="userName">
          <el-input v-model="checkInForm.userName" placeholder="请输入用户姓名" />
        </el-form-item>

        <!-- 身份证号 -->
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="checkInForm.idNumber" placeholder="请输入身份证号" maxlength="18" />
        </el-form-item>

        <!-- 房间号 -->
        <el-form-item label="房间号" prop="roomNumber">
          <el-input v-model="checkInForm.roomNumber" placeholder="请输入房间号" />
        </el-form-item>

        <!-- 按钮容器 -->
        <el-form-item>
          <div class="button-container">
            <el-button type="primary" @click="handleSubmit">提交</el-button>
            <el-button @click="handleReset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CheckIn",
  data() {
    return {
      checkInForm: {
        roomType: "", // 房型
        userName: "", // 用户姓名
        idNumber: "", // 身份证号
        roomNumber: "", // 房间号
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
        idNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { pattern: /^[1-9]\d{17}$/, message: "身份证号格式不正确", trigger: "blur" },
        ],
        roomNumber: [{ required: true, message: "请输入房间号", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.checkInForm.validate((valid) => {
        if (valid) {
          console.log("提交信息：", this.checkInForm);
          this.$message.success("入住信息提交成功！");
        } else {
          console.log("表单校验失败");
          this.$message.error("请完善表单信息后再提交！");
        }
      });
    },
    handleReset() {
      this.$refs.checkInForm.resetFields();
    },
  },
};
</script>

<style scoped>

/* 父容器使其充满整个视口 */
.check-in-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 设置高度为视口的100% */
  width: 100%; /* 设置宽度为视口的100% */
  margin: 0; /* 移除默认的外边距 */
}

/* 表单容器宽度并给它一些内边距 */
.check-in-container {
  width: 600px; /* 宽度限制为400px */
  padding: 20px;
}

/* 按钮容器使用Flexbox居中按钮 */
.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 按钮之间的间隔 */
  margin-left: 100px;
}
</style>
