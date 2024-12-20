<template>
  <div class="room-management-wrap" style="box-sizing: border-box; width: 100%; height: auto">
    <div class="room-management">
      <h1>房间信息管理</h1>
      <div class="cards-wrap">
        <!-- 房型信息列表 -->
        <el-card class="type-info-card card" header="房型信息">
          <el-table :data="roomTypes" style="width: 100%">
            <el-table-column
                prop="name"
                label="房型代码"
                align="left"
                header-align="left"
            />
            <el-table-column
                prop="fullName"
                label="房型名称"
                align="left"
                header-align="left"
            />
            <el-table-column
                prop="price"
                label="价格"
                align="left"
                header-align="left"
            />
          </el-table>
        </el-card>
        <div class="new-wrap" v-if="isAdmin" >
          <!-- 添加房型 -->
          <el-card class="new-type-card card" header="新增房型">
            <el-form :model="newRoomType" label-width="100px">
              <el-form-item label="房型代码">
                <el-input v-model="newRoomType.name" placeholder="请输入房型代码" />
              </el-form-item>
              <el-form-item label="房型名称">
                <el-input v-model="newRoomType.fullName" placeholder="请输入房型名称" />
              </el-form-item>
              <el-form-item label="房型价格">
                <el-input
                    v-model="newRoomType.price"
                    type="number"
                    placeholder="请输入房型价格"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addRoomType">添加房型</el-button>
                <el-button @click="resetRoomTypeForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <!-- 新增房间 -->
          <el-card class="create-room-card card" header="新增房间">
            <el-form :model="newRoom" label-width="100px">
              <el-form-item label="选择房型">
                <el-select v-model="newRoom.typeName" placeholder="请选择房型">
                  <el-option
                      v-for="roomType in roomTypes"
                      :key="roomType.name"
                      :label="roomType.fullName"
                      :value="roomType.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="房间号">
                <el-input v-model="newRoom.roomNumber" placeholder="请输入房间号" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="addRoom">添加房间</el-button>
                <el-button @click="resetRoomForm">重置</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {listRoomType} from "@/services/room.js";
import{newRoom} from "@/services/room.js";
import {newRoomType} from "@/services/room.js";
import {roomStatusD} from "@/utils/dists.js";
import{dropRoomType} from "@/services/room.js";
import {getRole} from "@/services/admin.js";

export default {

  data() {
    return {
      isAdmin: getRole() === "ADMIN",
      roomTypes: [], // 房型列表
      newRoomType: {
      },
      newRoom: {
        typeName: "",
        roomNumber: "",
      },
    };
  },
  created() {
    listRoomType().then((res) => {
      console.log(res)
      this.roomTypes = res.data.map((type) =>({
        name: type.name,
        fullName: type.fullName,
        price: type.price,
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
    for(const [_, v] of Object.entries(roomStatusD)){
      this.roomTypes = [...this.roomTypes,
        {
          text: v,
          value: v
        }]
      console.log(v)
    }
  },
  methods: {
    addRoomType() {
      if (
          !this.newRoomType.name ||
          !this.newRoomType.fullName ||
          !this.newRoomType.price
      ) {
        this.$message.error("请填写完整的房型信息！");
        return;
      }
      console.log(this.newRoomType)
      newRoomType(this.newRoomType).then((res) => {
        this.roomTypes.push({ ...this.newRoomType, rooms: [] });
        this.resetRoomTypeForm();
        this.$message.success("房型添加成功！");
      }).catch((err) => {
        let m = ''
        if(err){
          m = err.data()
        }
        this.$message.error("提交失败，错误信息：" + m)
      })
    },
    resetRoomTypeForm() {
      this.newRoomType = { name: "", fullName: "", price: "" };
    },
    deleteRoomType(index) {
      const roomName = this.roomTypes[index].name;
      console.log("要删除的房型名称：", roomName);
      // 确认删除操作
      this.$confirm(`确定删除房型 "${roomName}" 吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            dropRoomType(roomName).then((res) => {
              this.roomTypes.splice(index, 1);
              this.$message.success("房型已删除！");
            }).catch((err) => {
              console.log(err);
              this.$message.info("删除失败！");
            })
          })
    },
    addRoom() {
      console.log(this.roomTypes)
      console.log(this.newRoom)
      if (this.newRoom.typeName) {
        newRoom(this.newRoom).then((r) => {
          this.$message.success("房间添加成功！");
          this.resetRoomForm();
        }).catch((err) => {
          console.log(err)
          this.$message.error("房间添加失败！\n " + err.data);
        })
      } else {
        this.$message.error("请选择有效的房型！");
      }
    },
    resetRoomForm() {
      this.newRoom = { roomNumber: "", typeName: "" };
    },
  },
};
</script>

<style scoped>

.room-management {
  user-select: none;
  width: 100%;
  height: min-content;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  h1{
    margin: 2rem;
  }

  .cards-wrap{
    .type-info-card{
      height: auto;
      min-height: 550px;
      width: 40%;
      box-sizing: border-box;
    }
    height: min-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
    box-sizing: border-box;
    .new-wrap{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
