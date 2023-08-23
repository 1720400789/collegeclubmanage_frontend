<script setup>
//导入图标组件，虽已全局导入所有图标，但绑定图标，还需单独导入
import { Delete,Edit,Search } from '@element-plus/icons-vue'
//定义用户信息数据
import {ref, onMounted} from 'vue'
import {ElMessage} from "element-plus";
import { getAdminPageAPI, editStatusAPI } from "@/apis/backend_user";
import {useRouter} from "vue-router";

const userData = ref([])
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const sname = ref('')//初始化搜索框的值
const router = useRouter()

onMounted(() => {
  getData()
})

//获取当前页数据
const getData = async () => {
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    name: sname.value ? sname.value : undefined
  }
  await getAdminPageAPI(params).then(response => {
        userData.value = response.data.records
        total.value = response.data.total
        console.log(userData.value)
        // console.log(currentPage.value+'a')
      })
      .catch(error => {
        console.error(error);
      })
}

//字段排序
// 定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  userData.value = userData.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}
//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  getData();
};
//处理每页显示多少条事件
const handleSizeChange=(pagesize)=>{
  pageSize.value=pagesize;
  getData();
}

//处理增加按钮点击事件
const handleAdd = (st) => {
  console.log(st)
  router.push({
    path: '/manageadmin_add',
    query: st
  })
}
// 创建响应式变量multipleSelection，用于存储当前选中的数据行
let multipleSelection = ref([])
// 处理表格行选中状态变化的方法，val是当前选中的数据行数组
const handleSelectionChange = (val) => {
  // 清空数组，确保每次更新都是最新选中状态
  multipleSelection.value = []
  val.forEach(item => { // 遍历选中的数据行数组
    multipleSelection.value.push(item.id) // 将选中的每一行数据存入multipleSelection数组中
  })
}
const statusHandle = async (flag, id) => {
  let ids = []
  if(id == undefined) ids = multipleSelection.value
  else ids = [id]
  console.log(ids)
  await editStatusAPI(flag, ids).then(res => {
    if(res.code === 1){
      ElMessage.success('账号状态修改成功！')
      getData()
    }else {
      ElMessage.error(res.msg || '操作失败')
    }
  })
}
</script>

<template>
  <div class="dashboard-container">
  <div class="container">
    <div class="tableBar">
<!--      @keyup.enter绑定回车事件-->
      <el-input v-model="sname" placeholder="请输入姓名或用户名搜索" style="width: 250px" @keyup.enter="getData" :prefix-icon="Search">
      </el-input>
      <div class="tableLab">
<!--        <span class="span-btn delBut non" @click="deleteHandle('批量', null)">批量删除</span>-->
        <span class="span-btn blueBug non" @click="statusHandle('1')">批量封禁</span>
        <span style="border:none;" class="span-btn delBut non" @click="statusHandle('0')">批量解禁</span>
        <el-button
            type="primary"
            @click="handleAdd('add')"
        >
          + 添加管理员
        </el-button>
      </div>
    </div>

    <!--el-table数据表格组件-->
    <el-table
        :data="userData"
        :header-cell-style="{ background: '#f6f9fa'}"
        class="tableBox"
        @sort-change="handleSortChange"
        empty-text="暂无数据"
        @selection-change="handleSelectionChange">
      <!--el-table-column列-->
      <el-table-column type="selection" width="30"/>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="account" label="用户名" sortable></el-table-column>
<!--      <el-table-column prop="password" label="密码"></el-table-column>-->
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="status" label="状态" sortable>
        <template #default="scope">
          <span style="margin-right: 10px">{{ scope.row.status == '0' ? '封禁' : '正常' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template #default="{ row }">
          <el-button type="danger" size="small" :icon="Delete" @click="statusHandle('0', row.id)" v-if="row.status == 0">解封</el-button>
          <el-button type="danger" size="small" :icon="Delete" @click="statusHandle('1', row.id)" v-if="row.status == 1">封禁</el-button>
          <el-button type="primary" size="small" :icon="Edit"  @click="handleAdd(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
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

<style>
</style>

<style scoped>
@import '@/styles/page.css';
/*在ElementPlus中，可使用组件名称的类选择器选择对应组件，从而修改默认组件样式*/
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;
  justify-content: space-between;margin-bottom: 8px;
}
</style>
