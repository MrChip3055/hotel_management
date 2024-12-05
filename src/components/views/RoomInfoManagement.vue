<template>
  <div class="room-management-wrap" style="box-sizing: border-box; width: 100%; height: auto">
    <div class="room-management">
      <h1>房间信息管理</h1>
      <div class="cards-wrap">
        <!-- 房型信息列表 -->
        <el-card class="type-info-card card" header="房型信息">
          <el-table :data="roomTypes" style="width: 100%">
            <el-table-column prop="code" label="房型代码" width="150" />
            <el-table-column prop="name" label="房型名称" />
            <el-table-column prop="price" label="价格" width="100" />
            <el-table-column label="操作" width="200">
              <template #default="scope">
                <el-button
                    type="text"
                    @click="editRoomType(scope.$index)"
                >
                  编辑
                </el-button>
                <el-button
                    type="text"
                    @click="deleteRoomType(scope.$index)"
                    :disabled="roomTypes[scope.$index].rooms.length > 0"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <div class="new-wrap">
          <!-- 添加房型 -->
          <el-card class="new-type-card card" header="新增房型">
            <el-form :model="newRoomType" label-width="100px">
              <el-form-item label="房型代码">
                <el-input v-model="newRoomType.code" placeholder="请输入房型代码" />
              </el-form-item>
              <el-form-item label="房型名称">
                <el-input v-model="newRoomType.name" placeholder="请输入房型名称" />
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
                <el-select v-model="newRoom.roomType" placeholder="请选择房型">
                  <el-option
                      v-for="roomType in roomTypes"
                      :key="roomType.code"
                      :label="roomType.name"
                      :value="roomType.code"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="房间号">
                <el-input v-model="newRoom.number" placeholder="请输入房间号" />
              </el-form-item>
              <el-form-item label="房间状态">
                <el-select v-model="newRoom.status" placeholder="请选择房间状态">
                  <el-option label="空闲" value="空闲" />
                  <el-option label="已预订" value="已预订" />
                  <el-option label="维修中" value="维修中" />
                </el-select>
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
import SideNav from "@/components/EmployeeSideNav.vue";

export default {
  components: {SideNav},
  data() {
    return {
      roomTypes: [], // 房型列表
      newRoomType: {
        code: "",
        name: "",
        price: "",
      },
      newRoom: {
        roomType: "",
        number: "",
        status: "空闲",
      },
    };
  },
  methods: {
    addRoomType() {
      if (
          !this.newRoomType.code ||
          !this.newRoomType.name ||
          !this.newRoomType.price
      ) {
        this.$message.error("请填写完整的房型信息！");
        return;
      }
      this.roomTypes.push({ ...this.newRoomType, rooms: [] });
      this.resetRoomTypeForm();
      this.$message.success("房型添加成功！");
    },
    resetRoomTypeForm() {
      this.newRoomType = { code: "", name: "", price: "" };
    },
    deleteRoomType(index) {
      if (this.roomTypes[index].rooms.length > 0) {
        this.$message.error("该房型下存在房间，无法删除！");
        return;
      }
      this.roomTypes.splice(index, 1);
      this.$message.success("房型删除成功！");
    },
    editRoomType(index) {
      this.$message.info("编辑房型功能未实现");
    },
    addRoom() {
      const roomType = this.roomTypes.find(
          (type) => type.code === this.newRoom.roomType
      );
      if (roomType) {
        roomType.rooms.push({ ...this.newRoom });
        this.resetRoomForm();
        this.$message.success("房间添加成功！");
      } else {
        this.$message.error("请选择有效的房型！");
      }
    },
    resetRoomForm() {
      this.newRoom = { roomType: "", number: "", status: "空闲" };
    },
  },
};
</script>

<style scoped>
.room-management {
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
    }
    height: min-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1.5rem;
    .new-wrap{
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}


</style>
