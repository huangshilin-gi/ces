<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]

const onConfirmScreen = () => {
  alert('触发筛选条件')
}

const onResetScreen = () => {
  alert('清空筛选条件')
}
</script>

<template>
  <el-card class="box-card" shadow="never">
    <c-screen
      :up="8"
      :down="24"
      @confirm="onConfirmScreen"
      @reset="onResetScreen"
    >
      <template #fixed>
        <el-col :span="8">
          <el-form-item label="Approved by">
            <div class="grid-content ep-bg-purple" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Approved by">
            <div class="grid-content ep-bg-purple" />
          </el-form-item>
        </el-col>
      </template>
      <template #hide>
        <el-col :span="8">
          <el-form-item label="Approved by">
            <div class="grid-content ep-bg-purple" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Approved by">
            <div class="grid-content ep-bg-purple" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Approved by">
            <div class="grid-content ep-bg-purple" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Approved by">
            <div class="grid-content ep-bg-purple" />
          </el-form-item>
        </el-col>
      </template>
    </c-screen>
    <c-table :data="tableData" :pagination="{ total: 30 }">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </c-table>
  </el-card>
</template>

<style scoped>
.ep-bg-purple {
  background-color: #ccc;
}

.grid-content {
  border-radius: 4px;
  height: 36px;
  width: 100%;
}
</style>
