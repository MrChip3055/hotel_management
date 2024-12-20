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
        <el-form-item label="房间号" prop="roomId">
          <el-input
              v-model="checkOutForm.roomId"
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
    <!-- 查询空房间的表格 -->
    <div class="room-table-container">
      <h3 style="font-size: 22px;margin-top: 20px">房间清单</h3>
      <el-table id="room-info-table" ref="tableRef" :data="tableData" style="width: 100%" row-key="roomNumber">
        <el-table-column prop="id" label="房间号" width="180" />
        <el-table-column prop="typeName" label="房型"
                         :filters="typeFilters"
                         :filter-method="filterType"
        />
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
import { onBeforeUnmount, ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { roomStatusD, roomTypeD } from "@/utils/dists.js";
import { listRoom } from "@/services/room.js";
import { checkout } from "@/services/stay.js";
import { getId } from "@/services/admin.js";

export default {
  name: "CheckOut",
  setup() {
    const rtDist = roomTypeD();
    const controller = new AbortController();

    // 响应式数据
    const checkOutForm = reactive({
      roomId: "",
      name: "",
      idNumber: "",
    });

    const rules = {
      roomId: [{ required: true, message: "房间号是必填项", trigger: "blur" }],
      name: [{ required: true, message: "姓名是必填项", trigger: "blur" }],
      idNumber: [{ required: true, message: "身份证号是必填项", trigger: "blur" }],
    };

    const statusFilters = ref([]);
    const typeFilters = ref([]);
    const tableData = ref([]);

    // 初始化筛选项
    for (const v of Object.values(roomStatusD)) {
      statusFilters.value.push({ text: v, value: v });
    }
    for (const v of Object.values(roomTypeD())) {
      typeFilters.value.push({ text: v, value: v });
    }

    // 拉取房间数据
    listRoom()
        .then((r) => {
          tableData.value = r.data.map((rm) => ({
            ...rm,
            typeName: rtDist[rm.typeName] || "未知",
            status: roomStatusD[rm.status] || "未知",
          }));
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("获取房间数据失败");
        });

    // 组件卸载时清理
    onBeforeUnmount(() => {
      controller.abort();
    });

    // 过滤方法
    const filterStatus = (value, row) => row.status === value;
    const filterType = (value, row) => row.typeName === value;

    return {
      checkOutForm,
      rules,
      statusFilters,
      typeFilters,
      tableData,
      filterStatus,
      filterType,
    };
  },
  methods: {
    // 提交退房信息
    handleCheckOut() {
      this.$refs.checkOutFormRef.validate((valid) => {
        if (valid) {
          const formData = this.checkOutForm;
          checkout({
            roomId: formData.roomId,
            name: formData.name,
            idNumber: formData.idNumber,
            operatorId: getId(),
          })
              .then(() => {
                ElMessage.success("退房成功！");
                setTimeout(()=>{
                  location.reload()
                }, 500)
              });
        } else {
          ElMessage.error("请填写完整信息！");
        }
      });
    },
    handleReset() {
      this.checkOutForm.roomId = "";
      this.checkOutForm.name = "";
      this.checkOutForm.idNumber = "";
    },
  },
};
</script>


<style scoped>
.check-out-wrapper {
  user-select: none;
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  margin: 0;
  background: transparent;
}



#room-info-table {
  margin-top: 20px;
  overflow: auto;
  height: 100%;
}

.button-container {
  margin-top:50px;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  gap: 20px; /* 按钮之间的间隔 */
}

.check-out-container, .room-table-container {
  flex: 2; /* 平均分配空间 */
  height: 60%;
  min-height: 500px; /* 设置最小高度 */
  max-width:600px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

}

</style>
