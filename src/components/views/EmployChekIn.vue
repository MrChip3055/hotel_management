<template>
  <div class="check-in-wrapper">
    <el-card class="check-in-container">
      <h2 class="check-in-title" style="margin-bottom: 30px">办理入住</h2>
      <el-form :model="checkInForm" :rules="rules" ref="checkInForm" label-width="120px">
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
            <el-tag
                :type="getTagType(scope.row.status)"
                :key="scope.row.id"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>

        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import {listRoom} from "@/services/room.js";
import {roomStatusD, roomTypeD} from "@/utils/dists.js";
import {checkin} from "@/services/stay.js";

export default {
  name: "CheckIn",
  data() {
    return {
      rtDist: roomTypeD(),
      checkInForm: {
        userName: "",
        idNumber: "",
        phoneNumber: "",
        roomNumber: "",
      },
      rules: {
        roomType: [{ required: true, message: "请选择房型", trigger: "change" }],
        userName: [{ required: true, message: "请输入用户姓名", trigger: "blur" }],
        idNumber: [{ required: true, message: "请输入身份证号", trigger: "blur" }],
        phoneNumber: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        roomNumber: [{ required: true, message: "请输入房间号", trigger: "blur" }],
      },
      statusFilters: [],
      typeFilters: [],
      tableData: [],
    };
  },
  created() {
    for(const [_, v] of Object.entries(roomStatusD)){
      this.statusFilters = [...this.statusFilters,
        {
          text: v,
          value: v
        }]
      console.log(v)
    }
    for(const [_, v] of Object.entries(roomTypeD())){
      this.typeFilters = [...this.typeFilters,
        {
          text: v,
          value: v
        }]
      console.log(v)
    }
    listRoom().then(
        (r) => {
          console.log(r.data)
          this.tableData = r.data.map(rm => ({
            ...rm,
            typeName: this.rtDist[rm.typeName] || '未知',
            status: roomStatusD[rm.status] || '未知',
          }))
        }
    ).catch(
        (err) => {
          console.log(err);
          if (err) {
            switch (err.status) {
              case 404:
                break
              default:
                break
            }
          }
        }
    )
  },
  methods: {
    getTagType(status) {
      switch (status) {
        case '空房':
          return 'success';  // 空房使用绿色
        case '已入住':
          return 'warning';  // 已入住使用橙色
        case '已预定':
          return 'info';     // 已预定使用蓝色
        default:
          return 'default';  // 其他状态使用默认样式 (可选值为 'success', 'info', 'warning', 'danger')
      }
    },
    handleSubmit() {
      this.$refs.checkInForm.validate((valid) => {
        if (valid) {
          console.log(this.checkInForm)
          const formData = this.checkInForm
          const data = {
            customers: [
              {
                name: formData.userName,
                phone: formData.phoneNumber,
                idNumber: formData.idNumber,
                status: 1
              }
            ],
            roomId: formData.roomNumber,
            deposit: 0
          }
          checkin(data).then(res => {
            console.log(res)
            this.$message.success("入住信息提交成功！");
            setTimeout(()=>{
              location.reload()
            }, 500)
          }).catch(e => {
            console.log(e)
            let m = ''
            if (e) {
              m = e.data
            }
            this.$message.error("提交失败，错误信息：" + m)
          })
        }
      });
    },
    handleReset() {
      this.$refs.checkInForm.resetFields();
    },
    filterStatus(value, row) {
      return row.status === value;
    },
    filterType(value, row) {
      return row.typeName === value;
    },
  },
};
</script>

<style scoped>
.check-in-wrapper {
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

.check-in-container {
  padding: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  width: 600px;
  height: 60%;
}

.room-table-container {
  display: flex;
  flex-direction: column;
  height: 60%;
  width: 600px;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

#room-info-table {
  margin-top: 20px;
  overflow: auto;
  height: 100%;
}
</style>