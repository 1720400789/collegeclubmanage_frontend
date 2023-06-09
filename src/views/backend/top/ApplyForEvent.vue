
<script setup>
//使用:icon绑定图标，需单独导入图标组件
import { Search } from '@element-plus/icons-vue'
import {ref} from 'vue'
import {onMounted} from "vue";
import axios from "axios";
import  { ElMessage, ElMessageBox } from "element-plus";
import {getEventRegPageAPI, eventStatusAPI} from "@/apis/audit";

const clubData = ref([])
const currentPage = ref(1)//定义当前页码
const pageSize = ref(10)//定义每页显示记录数
const total = ref(0)//总记录数
const sname = ref('')
const status = ref()
const applyList = [
  {
    name: '待审核',
    id: 0
  },
  {
    name: '已审核',
    id: 1
  }
]
onMounted(() => {
  getData()
})
//获取当前页数据
const getData = async () => {
  console.log(status.value)
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    name: sname.value ? sname.value : undefined,
    status: status.value ? status.value : NaN
  }
  await getEventRegPageAPI(params).then(response => {
    clubData.value = response.data.records
    total.value = response.data.total
    console.log(clubData.value)
    // console.log(currentPage.value+'a')
  })
      .catch(error => {
        console.error(error);
      })
}

//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum
  getData()
}

//处理每页显示多少条事件
const handleSizeChange=(pagesize)=>{
  pageSize.value=pagesize
  getData()
}
const handleSortChange = (sortData) => {
  const { prop, order } = sortData;
  clubData.value = clubData.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}
const handleStatus = async (flag, st) => {
  let ids = [st]
  await eventStatusAPI(flag, ids).then(res => {
    if(res.code === 1){
      ElMessage.success(res.msg || "状态修改成功")
      getData()
    }else {
      ElMessage.error(res.msg || "状态修改失败")
    }
  })
}
</script>
<template>
  <div class="dashboard-container">
  <div class="container">
  <div class="tableBar">
    <div>
      <el-input v-model="sname" placeholder="请输入活动名称进行搜索"
                @keyup.enter="getData" :prefix-icon="Search">
      </el-input>
    </div>
    <el-form-item
        label="当前:"
        prop="major"
    >
      <el-select
          @change="getData"
          v-model="status"
          placeholder="待审核||已审核"
      >
        <el-option v-for="(item,index) in applyList" :key="index" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
  </div>
  <!--el-table数据表格组件-->
  <el-table
      :data="clubData"
      :header-cell-style="{ background: '#f6f9fa'}"
      @sort-change="handleSortChange"
      empty-text="暂无数据">
    <!--el-table-column列-->
    <el-table-column prop="eventname" label="活动名称" sortable></el-table-column>
    <el-table-column prop="clubName" label="主办社团" sortable></el-table-column>
    <el-table-column prop="mname" label="申请人"></el-table-column>
    <el-table-column prop="eventDescription" label="活动简介"></el-table-column>
    <el-table-column prop="status" label="状态" sortable>
      <template #default="scope">
        <span style="margin-right: 10px" v-if="scope.row.status == '0'">待审核</span>
        <span style="margin-right: 10px" v-if="scope.row.status == '1'">已通过</span>
        <span style="margin-right: 10px" v-if="scope.row.status == '2'">已驳回</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180" v-if="status != '1'">
      <template #default="{ row }">
        <el-button type="primary" size="small" icon="Edit"
                   @click="handleStatus('1', row.id)">同意</el-button>
        <el-button type="warning" size="small" icon="Edit"
                   @click="handleStatus( '2', row.id)">驳回</el-button>
        <!--        <el-button type="info" size="small" icon="Edit"-->
        <!--                   @click="handleMore(row)">详情</el-button>-->
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      :current-page="currentPage"
      :page-size="pageSize"
      :page-sizes="[5,10,20]"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />
  </div>
  </div>
</template>


<style scoped>
@import '@/styles/page.css';
</style>