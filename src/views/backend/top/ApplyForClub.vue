<script setup>
import { Search } from '@element-plus/icons-vue'
import {ref} from 'vue'
import {onMounted} from "vue";
import  {ElMessage} from "element-plus";
import { getClubRegPageAPI, updateRegStatusAPI, disaggreStatusAPI } from "@/apis/audit";

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
const clubData = ref([])
const currentPage = ref(1)//定义当前页码
const pageSize = ref(10)//定义每页显示记录数
const total = ref(0)//总记录数
const sname = ref('')
const status = ref()
// 在组件挂载后执行回调函数
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
  await getClubRegPageAPI(params).then(response => {
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

//定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  clubData.value = clubData.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}

const aggreStatus = async (row) => {
  let params = { ... row }
  console.log(params)
  await updateRegStatusAPI(params).then(res => {
    if(res.code === 1){
      ElMessage.success(res.msg || "状态修改成功")
      getData()
    }else {
      ElMessage.error(res.msg || "状态修改失败")
    }
  })
}

const disaggreStatus = async (st) => {
  let ids = [st]
  await disaggreStatusAPI(ids).then(res => {
    if(res.code === 1){
      ElMessage.success(res.msg || "状态修改成功")
      getData()
    }else {
      ElMessage.error(res.msg || "状态修改失败")
    }
  })
}

let multipleSelection = ref([])
const handleSelectionChange = (val) => {
  // 清空数组，确保每次更新都是最新选中状态
  multipleSelection.value = []
  val.forEach(item => { // 遍历选中的数据行数组
    multipleSelection.value.push(item.id) // 将选中的每一行数据存入multipleSelection数组中
  })
}
</script>

<template>
  <div class="dashboard-container">
  <div class="container">
  <div class="tableBar">
    <div>
      <el-input v-model="sname" placeholder="请输入社团名称进行搜索"
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
<!--    <div class="tableLab">-->
<!--      &lt;!&ndash;        <span class="span-btn delBut non" @click="deleteHandle('批量', null)">批量删除</span>&ndash;&gt;-->
<!--      <span class="span-btn blueBug non" @click="handleStatus('1')">批量同意</span>-->
<!--      <span style="border:none;" class="span-btn delBut non" @click="handleStatus('2')">批量驳回</span>-->
<!--    </div>-->
  </div>
  <!--el-table数据表格组件-->
  <el-table
      :data="clubData"
      :header-cell-style="{ background: '#f6f9fa'}"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange">
    <!--el-table-column列-->
<!--    <el-table-column type="selection" width="30"/>-->
    <el-table-column prop="applyName" label="要建立的社团名称" sortable></el-table-column>
<!--    <el-table-column prop="applyId" label="社团ID" sortable></el-table-column>-->
    <el-table-column prop="maccount" label="申请账号用户名"></el-table-column>
    <el-table-column prop="mname" label="申请人姓名"></el-table-column>
    <el-table-column prop="clubDescription" label="申请理由"></el-table-column>
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
                   @click="aggreStatus(row)">同意</el-button>
        <el-button type="warning" size="small" icon="Edit"
                   @click="disaggreStatus(row.id)">驳回</el-button>
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