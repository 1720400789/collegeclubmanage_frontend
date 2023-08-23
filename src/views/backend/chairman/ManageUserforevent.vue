<script setup>
import {dispassUserEventAPI, getUserEventPageAPI, passUserEventAPI} from "@/apis/userevent";
import {onMounted, ref} from "vue";
import {storeToRefs} from "pinia";
import {chairmanStore} from "@/stores/chairman";
import {ElMessage} from "element-plus";
const userStore = chairmanStore()
const userevents = ref([])
const { clubList, admid } = storeToRefs(userStore)
const club = ref('')
// const club_ = ref('')
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const dialogFormVisible = ref(false)//设置弹窗不显示
const tableform = ref({})//弹窗表单数据
const status = ref()

onMounted(() => {
  getData()
})

const getData = async () => {
  console.log(club.value)
  console.log(admid.value)
  const params = {
    page: currentPage.value,
    pageSize: pageSize.value,
    // name: sname.value ? sname.value : undefined
    status: status.value ? status.value : 0,
    clubid: club.value ? club.value : 0,
    admid: admid.value
  }
  await getUserEventPageAPI(params).then(response => {
    if(response.code === 1){
      userevents.value = response.data.records
      total.value = response.data.total
      console.log(userevents.value)
    }else {
      userevents.value = []
    }
  }).catch(error => {
    console.error(error)
  })
}
const applyList = [{
    name:'待审核',
      id:0
  },
  {
      name:'通过',
      id:1
    },
    {
      name:'不通过',
      id:2
    }
]


const handleSizeChange=(pagesize)=>{
  pageSize.value=pagesize;
  getData();
}

  //处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  getData();
};

const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  userevents.value = userevents.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}

function handleMore(row) {
  dialogFormVisible.value = true
  tableform.value = {...row}
}

const handlePass = async(row) =>{
  const params = {id: row.id}
  await passUserEventAPI(params).then(res =>{
    if(res.code === 1){
      ElMessage.success(res.msg || '审批成功！')
      getData();
    }else {
      ElMessage.error(res.msg || '操作失败')
    }
  }).catch(err => {
    ElMessage.error('请求出错了：' + err)
  })
}

const handleDisPass = async(row) =>{
  const params = {id: row.id}
  await dispassUserEventAPI(params).then(res =>{
    if(res.code === 1){
      ElMessage.success(res.msg || '审批成功！')
      getData();
    }else {
      ElMessage.error(res.msg || '操作失败')
    }
  }).catch(err => {
    ElMessage.error('请求出错了：' + err)
  })
}

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}

</script>

<template>
  <div class="topTool">
    <el-form-item
        label="当前:"
        prop="major"
    >
      <el-select
          @change="getData"
          v-model="status"
          placeholder="待审核||通过||不通过"
      >
        <el-option v-for="(item,index) in applyList" :key="index" :label="item.name" :value="item.id" />
      </el-select>
      <el-select
          v-model="club"
          placeholder="全部申请"
          @change="getData"
      >
        <el-option v-for="(item,index) in clubList" :key="index" :label="item.clubName" :value="item.id" />
      </el-select>
    </el-form-item>
  </div>

  <el-table
      :data="userevents"
      :header-cell-style="{ background: '#f6f9fa'}"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
  >
    <el-table-column prop="eventName" label="活动名称" sortable></el-table-column>
    <el-table-column prop="mname" label="用户姓名" sortable></el-table-column>
    <el-table-column prop="picture" label="头像" align="center">
      <template #default="{ row }">
        <el-image style="width: auto; height: 40px; border: none; cursor: pointer"
                  :src="getPicture(row.picture)"
                  :preview-src-list="[ `/common/download?name=${row.picture}` ]">
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="grade" label="年级" sortable></el-table-column>
    <el-table-column prop="major" label="学院" sortable></el-table-column>
    <el-table-column prop="sex" label="性别" sortable></el-table-column>
    <el-table-column prop="mphone" label="联系电话" ></el-table-column>
    <el-table-column prop="status" label="状态" sortable>
      <template #default="scope">
        <span style="margin-right: 10px" v-if="scope.row.status == '0'">待审核</span>
        <span style="margin-right: 10px" v-if="scope.row.status == '1'">通过</span>
        <span style="margin-right: 10px" v-if="scope.row.status == '2'">不通过</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180" >
      <template #default="{ row }">
        <el-button type="primary" size="small" icon="el-icon-check" v-if="status == '0'"
                   @click="handlePass(row)">通过</el-button>
        <el-button type="warning" size="small" icon="el-icon-close" v-if="status == '0'"
                   @click="handleDisPass(row)">不通过</el-button>
        <el-button type="info" size="small" icon="el-icon-zoom-in"
                   @click="handleMore(row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      background
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5,10,15]"
      :total="total"
      layout="prev, pager, next, sizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
  />

  <el-dialog v-model="dialogFormVisible" :title="详细资料">
    <el-form
        :model="tableform"
        :inline="false"
        label-width="180px"
    >
      <el-form-item label="活动名称" prop="eventName" :label-width="100" >
        <el-input v-model="tableform.eventName"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="用户姓名" prop="mName" :label-width="100" >
        <el-input v-model="tableform.mname"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="头像" prop="picture" class="uploadImg" :label-width="100" disabled="true">
       <el-image style="width: auto; height: 80px; border: none; cursor: pointer"
       :src="getPicture(tableform.picture)">
       </el-image>
      </el-form-item>
      <el-form-item label="年级" prop="grade" :label-width="100" >
        <el-input v-model="tableform.grade"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="学院" prop="major" :label-width="100" >
        <el-input v-model="tableform.major"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="100" >
        <el-input v-model="tableform.sex"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="联系电话" prop="mPhone" :label-width="100" >
        <el-input v-model="tableform.mphone"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="自我介绍" prop="selfDescription" :label-width="100" >
        <el-input type="textarea" v-model="tableform.selfDescription"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="个人特长" prop="selfStrength" :label-width="100" >
        <el-input type="textarea" v-model="tableform.selfStrength"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="参加理由" prop="selfReason" :label-width="100" >
        <el-input type="textarea" v-model="tableform.selfReason"  autocomplete="off"  disabled="true"/>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "ManageUserforevent"
}
</script>

<style scoped>
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;justify-content: space-between;margin-bottom: 15px;
}
</style>