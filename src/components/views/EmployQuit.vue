<template>
  <div class="check-out-wrapper">
    <div class="check-out-container">
      <h2 style="margin-bottom: 20px">办理退房</h2>
      <el-form
          :model="checkOutForm"
          :rules="rules"
          ref="checkOutFormRef"
          label-width="100px"
      >
        <el-form-item label="房间号" prop="roomNumber">
          <el-input
              v-model="checkOutForm.roomNumber"
              placeholder="请输入房间号"
          />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="checkOutForm.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="checkOutForm.idNumber" placeholder="请输入身份证号" />
        </el-form-item >
        <div class="button-container">
          <el-button type="primary" @click="handleCheckOut">退房</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {ElMessage} from "element-plus";

export default {
  setup() {
    const checkOutForm = ref({
      roomNumber: "",
      name: "",
      idNumber: "",
    });

    const checkOutFormRef = ref(null);

    // 表单校验规则
    const rules = {
      roomNumber: [
        {required: true, message: "房间号是必填项", trigger: "blur"},
      ],
      name: [{required: true, message: "姓名是必填项", trigger: "blur"}],
      idNumber: [
        {required: true, message: "身份证号是必填项", trigger: "blur"},
        {min: 18, max: 18, message: "身份证号必须为18位", trigger: "blur"},
      ],
    };

    const handleCheckOut = () => {
      checkOutFormRef.value.validate((valid) => {
        if (valid) {
          ElMessage.success("退房成功！");
          console.log("退房信息：", checkOutForm.value);
        } else {
          ElMessage.error("请填写完整信息！");
        }
      });
    };

    const handleReset = () => {
      checkOutForm.value.roomNumber = "";
      checkOutForm.value.name = "";
      checkOutForm.value.idNumber = "";
    };

    return {
      checkOutForm,
      checkOutFormRef,
      rules,
      handleCheckOut,
      handleReset,
    };
  },
};
</script>

<style scoped>
.check-out-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  background-color: transparent;
}

.check-out-container {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 按钮之间的间隔 */
}
</style>
