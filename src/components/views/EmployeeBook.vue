<script>
import {bookList, bookRoom, bookCheckin,deleteBook} from "@/services/stay";
import {listRoomType} from "@/services/room.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {roomTypeD} from "@/utils/dists.js";
export default {
  name: "EmployeeBook",
  data(){
    return {
      rtDist: roomTypeD(),
      roomTypes:[{
        name: "",
        fullName:"",
      }],
      newReservation:{
        customer: {
          name: "",
          phone: "",
          idNumber: "",
          status: "",
        },
        typeName: "",
        days: ""
      },
      formRules : {
        typeName: [{ required: true, message: "请选择房型", trigger: "change" }],
        "customer.name": [{ required: true, message: "请输入用户名", trigger: "blur" }],
        "customer.idNumber": [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        "customer.phone": [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        days: [{ required: true, message: "请输入入住天数", trigger: "blur" }],
      },
      search: "",
      reservationList:[],
    };
  },
  computed:{
    filteredReservations() {
      return this.reservationList.filter((book) =>
          book.customerName.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
  created() {
    listRoomType().then((res) => {
      console.log(res)
      this.roomTypes = res.data.map((type) =>({
        name:type.name,
        fullName: type.fullName,
      }))
    }).catch((err) => {
      console.log(err);
      if(err){
        switch (err.status) {
          case 404:
            break;
          default:
            break;
        }
      }
    })
    bookList().then((response) => {
      console.log(response.data);
      this.reservationList = response.data.map((book)=>({
        id: book.id,
        customerName: book.customerName,
        bookTime: book.bookTime,
        outTime: book.outTime,
        roomId: book.roomId,
        roomType: this.rtDist[book.roomType],
        phone: book.phone,
      }));
    })
        .catch((err) => {
          console.log("获取数据失败",err);
        })
  },
  methods: {
    formatDate(row, column, cellValue, index) {
      if (!cellValue) return "";
      const date = new Date(cellValue);
      return date.toLocaleString(); // 你也可以自定义格式
    },
    submitReservation() {
      this.$refs.reservationForm.validate((valid) => {
        if (valid) {
          console.log(this.newReservation);
          bookRoom(this.newReservation)
              .then((res) => {
                console.log(res);
                this.$message.success("预定信息提交成功！");
                setTimeout(() => {
                   location.reload();
                }, 500);
              })
              .catch((e) => {
                switch (e.status){
                  case 404:
                    this.$message.info("此房型下无可用房间")
                    break;
                  case 500:
                  default:
                    this.$message.error("提交失败，错误信息：" + e.data);
                    break;
                }
              });
        } else {
          console.log("表单验证失败");
        }
      });
    },
    resetForm() {
      this.newReservation = {
        customer: {
          name: "",
          phone: "",
          idNumber: "",
          status: "",
        },
        typeName: "",
        days: "",
      };
      // 重置表单验证状态
      this.$refs.reservationForm.resetFields();
    }
    ,
    handleCheckIn(book){
      const id = book.id
      bookCheckin(id,book).then(res =>{
        console.log(res)
        this.$message.success("预定信息提交成功！");
        setTimeout(() => {
          location.reload();
        },500)
      }).catch(e =>{
        console.log(e);
        let m = "";
        if (e) {
          m = e.data;
        }
        this.$message.error("提交失败，错误信息："+m)
      })
    },

    handleDelete (book){
      ElMessageBox.confirm(
          `确定要取消该预定记录吗？`,
          "取消确认",
          {
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            type: "warning",
          }
      )
          .then(() => this.deleteBookRecord(book))
          .catch(() => {
            ElMessage.info("取消操作终止")
          })
    },

    async deleteBookRecord(book){
      try{
        const id = book.id
        await deleteBook(id);
        ElMessage.success("预定记录已取消");
        location.reload();
      }catch(err){
        console.error("取消记录失败：",err);
        ElMessage.error("取消记录失败")
      }
    }
  }
}
</script>

<template>
  <div class="reservation-page">
    <div class="reservation-container">
      <!-- 右侧表单 -->
      <div class="form-section">

        <div class="form-card">
          <h3>办理预定</h3>
          <el-form
              :model="newReservation"
              :rules="formRules"
              ref="reservationForm"
              label-width="80px"
          >
            <!-- 房型 -->
            <el-form-item label="房型" prop="typeName">
              <el-select v-model="newReservation.typeName" placeholder="请选择房型">
                <el-option
                    v-for="room in roomTypes"
                    :key="room"
                    :label="room.fullName"
                    :value="room.name"
                />
              </el-select>
            </el-form-item>

            <!-- 用户名 -->
            <el-form-item label="用户姓名" prop="customer.name">
              <el-input v-model="newReservation.customer.name" placeholder='请输入用户名'/>
            </el-form-item>

            <!-- 身份证号 -->
            <el-form-item label="身份证号" prop="customer.idNumber">
              <el-input v-model="newReservation.customer.idNumber" placeholder="请输入身份证号" />
            </el-form-item>

            <!-- 电话号 -->
            <el-form-item label="电话号" prop="customer.phone">
              <el-input v-model="newReservation.customer.phone" placeholder="请输入电话号码" />
            </el-form-item>


            <!-- 入住天数 -->
            <el-form-item label="入住天数" prop="days">
              <el-input-number
                  v-model="newReservation.days"
                  :min="1"
                  :max="7"
                  placeholder="请输入天数"
              />
            </el-form-item>

            <!-- 提交按钮 -->
            <el-form-item>
              <el-button type="primary" @click="submitReservation">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 左侧表格 -->
      <div class="table-section">
        <!-- 搜索框 -->
        <el-input
            v-model="search"
            size="large"
            placeholder="输入用户姓名搜索"
            clearable
            class="search-bar"
        />
        <el-table :data="filteredReservations" style="width: 100% ; margin-top: 20px" >
          <!-- 房型 -->
          <el-table-column label="房型" prop="roomType" />
          <!-- 房间号 -->
          <el-table-column label="房间号" prop="roomId" />
          <!-- 用户名 -->
          <el-table-column label="用户名" prop="customerName" />
          <!-- 电话号 -->
          <el-table-column label="电话号" prop="phone" />
          <!-- 预定时间 -->
          <el-table-column label="预定时间" prop="bookTime" :formatter="formatDate" />
          <!-- 过期时间 -->
          <el-table-column label="过期时间" prop="outTime" :formatter="formatDate" />

          <!-- 操作 -->
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button
                  size="small"
                  type="primary"
                  @click="handleCheckIn(scope.row)"
              >
                入住
              </el-button>
              <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row)"
              >
                取消
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
  </div>
</template>

<style scoped>
.reservation-page {
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  gap: 20px;
}

.reservation-container {
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 90%;
  gap: 20px;
}

.table-section {
  flex: 6.5;
  box-sizing: border-box;
  padding: 48px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.1);
}

.form-section {
  max-width: 350px;
  flex: 3.5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .form-card{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid #ebeef5;
    border-radius: 8px;
    background-color: #ffffff;
    height: 100%;
    overflow: auto;
    max-height: 345px;
  }
}

.table-header {
  padding: 10px;
}

.search-bar {
  width: 100%;
}
</style>
