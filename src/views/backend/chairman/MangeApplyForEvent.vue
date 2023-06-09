<script setup>
import {computed, onMounted, ref} from "vue"
import {addEventAPI, deleteEventAPI, editEventAPI, getEventPageAPI} from "@/apis/events"
import {ElMessage, ElMessageBox} from "element-plus"
import { chairmanStore} from "@/stores/chairman"
import {storeToRefs} from "pinia"

const userStore = chairmanStore()
const { clubList, admid } = storeToRefs(userStore)
const events = ref([])
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const dialogFormVisible = ref(false)//设置弹窗不显示
const tableformRef = ref()
const tableform = ref({})//弹窗表单数据
const dialogType = ref('add')//初始化弹出框的类型为增加弹窗
const dialogTitle = computed(() => {
  console.log(dialogType.value)
  return dialogType.value === 'add' ? '新增活动' : '编辑活动'
})
const flag = ref(true)
flag.value = computed(() => {
  console.log(flag.value)
  return dialogType.value === 'add' ? true : false
})
const club = ref('')
const club_ = ref('')
const status = ref()
//
// const getApplyList = async () => {
//   console.log(club.value)
//   const params = {
//     clubid: club.value ? club.value : 0,
//     admid: admid.value
//   }
//   await getApplyForjoinAPI(params).then(res => {
//     if(String(res.code) === '1'){
//       applyList.value = res.data || []
//       console.log(res.data)
//       console.log(applyList.value)
//     }
//   }).catch(err => {
//     console.log(err)
//   })
// }


onMounted(() => {
  getData()
})

const getClubid = () => {
  console.log("选择的社团id" + club_.value)
}

//获取当前页数据
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
  await getEventPageAPI(params).then(response => {
    if(response.code === 1){
      events.value = response.data.records
      total.value = response.data.total
      console.log(events.value)
    }else {
      events.value = []
    }
  }).catch(error => {
    console.error(error)
  })
}

const rules = {
  clubName: [
    {required: true, message: '社团名称不能为空', trigger:'blur' }
  ],
  eventname: [
    {required: true, message: '活动名称不能为空', trigger:'blur' },
    { max: 20, message: '活动名称最长为20个字', trigger: 'blur' }
  ],
  eventDescription: [
    {required: true, message: '活动描述不能为空', trigger:'blur' }
  ],
  startTime: [
    {required: true,  trigger:'blur' }
  ],
  endTime: [
    {required: true,  trigger:'blur' }
  ],
  spot: [
    {required: true, message: '活动地点不能为空', trigger:'blur' }
  ]
}

const applyList = [
  {
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

function handleEdit(row) {// 处理编辑按钮点击事件
  dialogFormVisible.value = true // 设置对话框显示状态为 true
  tableform.value = {...row} //   ！！！！！！！！！！！
  dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
  console.log('Edit clicked:', row)
}

const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  events.value = events.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}

const handleAdd = () => { //!!!!!!!!!!!!!!可能需要添加一个id
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  dialogType.value = 'add' // 设置对话框的类型为 "add"
  tableform.value = {status:'0'} // 清空表单数据
}

const dialogOk = async () => {
  dialogFormVisible.value = false
  console.log('新增活动')
  tableformRef.value.validate(async  (valid) => {
    console.log(valid)
    if(valid) {
      console.log(dialogType.value)
      if(dialogType.value  === 'add') {
        const params = {
          memberId: localStorage.getItem('userId'),
          clubId: club_.value,
          eventname: tableform.value.eventname,
          eventDescription: tableform.value.eventDescription,
          startTime: tableform.value.startTime,
          endTime: tableform.value.endTime,
          spot: tableform.value.spot
        }
        console.log(params.value)
        await addEventAPI(params.memberId, params.clubId, params.eventname, params.eventDescription, params.startTime, params.endTime, params.spot).then(res => {
          if(res.code === 1){
            ElMessage.success('活动添加成功！')
            getData();
          }else {
            ElMessage.error(res.msg || '操作失败')
          }
        }).catch(err => {
          ElMessage.error('请求出错了：' + err)
        })
      }else {
        const params = {
          id: tableform.value.id,
          clubName: tableform.value.clubName,
          eventname: tableform.value.eventname,
          eventDescription: tableform.value.eventDescription,
          startTime: tableform.value.startTime,
          endTime: tableform.value.endTime,
          spot: tableform.value.spot
        }
        await editEventAPI(params.id, params.clubName, params.eventname, params.eventDescription, params.startTime, params.endTime, params.spot).then(res => {
          if(res.code === 1){
            ElMessage.success('修改信息成功！')
            getData();
          }else{
            ElMessage.error(res.msg || '操作失败')
          }
        }).catch(err => {
          ElMessage.error('请求出错了' + err)
        })
      }
    }else {
      ElMessage.info('请检查表单信息')
    }
  })
}

// 创建响应式变量multipleSelection，用于存储当前选中的数据行
// let multipleSelection = ref([])


function handleDelete(row) {
  ElMessageBox.confirm(
      '您确定要撤回活动名称为【' + row.eventname + '】的申请吗?', '危险操作',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', }
  ).then(() => {
        delrow(row)
        ElMessage({type: 'success', message: '完成撤回！', })
      })
      .catch(() => {
        ElMessage({type: 'info', message: '取消撤回!', })
      })
  // 处理删除按钮点击事件
  console.log('Delete clicked:', row)
}

const delrow = async(row) => {
  const params = {id: row.id}
  await deleteEventAPI(params).then(res => {
    if(res.code === 1){
      ElMessage.success('撤回成功！')
      getData()
    }else{
      ElMessage.error(res.msg || '操作失败')
    }
  }).catch(error => {
    ElMessage.error('请求出错了：' + error)
    console.error(error)
  })
}
</script>

<template>
  <div class="topTool">
<!--    <el-input v-model="sname" placeholder="请输入社团名称,所属学院或负责人姓名进行搜索"-->
<!--              @keyup.enter="getData" :prefix-icon="Search">-->
<!--    </el-input>-->
    <el-button type="primary" :icon="Plus" @click="handleAdd"
               style="margin-left: 20px;font-size: 17px">申请活动</el-button>
<!--    <el-button type="danger" :icon="Delete" @click="statusHandle('1',null)"-->
<!--               v-if="multipleSelection.length>0">封禁选中社团</el-button>-->
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
      :data="events"
      :header-cell-style="{ background: '#f6f9fa'}"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
  >
<!--      @selection-change="handleSelectionChange">-->
<!--    <el-table-column type="selection"/>-->
<!--    <el-table-column prop="clubName" label="社团名称" sortable></el-table-column>-->
    <el-table-column prop="eventname" label="活动名称" sortable></el-table-column>
    <el-table-column prop="eventDescription" label="活动描述">
<!--      <template #default="{ row }">-->
<!--        <el-image style="width: auto; height: 40px; border: none; cursor: pointer"-->
<!--                  :src="getPicture(row.picture)"-->
<!--                  :preview-src-list="[ `/common/download?name=${row.picture}` ]">-->
<!--        </el-image>-->
<!--      </template>-->
    </el-table-column>
    <el-table-column prop="startTime" label="开始时间" ></el-table-column>
    <el-table-column prop="endTime" label="结束时间" ></el-table-column>
    <el-table-column prop="spot" label="活动地址" sortable></el-table-column>
    <el-table-column prop="status" label="状态" sortable>
      <template #default="scope">
        <span style="margin-right: 10px" v-if="scope.row.status == '0'">待审核</span>
        <span style="margin-right: 10px" v-if="scope.row.status == '1'">通过</span>
        <span style="margin-right: 10px" v-if="scope.row.status == '2'">不通过</span>
      </template>
    </el-table-column>
<!--    <el-table-column label="操作" min-width="180">-->
<!--      <template #default="{ row }">-->
<!--        <el-button type="primary" size="small" icon="Edit" @click="handleEdit(row)">编辑</el-button>-->
<!--        <el-button type="danger" size="small" :icon="Delete" @click="statusHandle('0', row.id)" v-if="row.status == 0">解封</el-button>-->
<!--        <el-button type="danger" size="small" :icon="Delete" @click="statusHandle('1', row.id)" v-if="row.status == 1">封禁</el-button>-->
<!--      </template>-->
<!--    </el-table-column>-->
    <el-table-column label="操作" min-width="180" v-if="status == '0'">
      <template #default="{ row }">
        <el-button type="primary" size="small" icon="Edit"
                   @click="handleEdit(row)">编辑</el-button>
        <el-button type="warning" size="small" icon="Delete"
                   @click="handleDelete(row)">撤回</el-button>
        <!--        <el-button type="info" size="small" icon="Edit"-->
        <!--                   @click="handleMore(row)">详情</el-button>-->
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

  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form
        ref="tableformRef"
        :model="tableform"
        :rules="rules"
        :inline="false"
        label-width="180px"
    >
      <el-form-item label="活动ID" prop="id" :label-width="100" >
        <el-input v-model="tableform.id"  placeholder="请输入ID" maxlength="20" autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="选择社团" v-if="flag.value === true" prop="clubId" :label-width="100">
        <el-select
            v-model="club_"
            placeholder="请选择社团"
            @change="getClubid"
        >
          <el-option v-for="(item,index) in clubList" :key="index" :label="item.clubName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称" prop="eventname" :label-width="100">
        <el-input v-model="tableform.eventname" placeholder="请输入活动名称" maxlength="20" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="活动描述" prop="eventDescription" :label-width="100">
        <el-input type="textarea" v-model="tableform.eventDescription" placeholder="请输入相关描述" maxlength="20" autocomplete="off" />
      </el-form-item>

      <el-form-item label="活动地址" prop="spot" :label-width="100">
        <el-input v-model="tableform.spot"  maxlength="20" autocomplete="off" />
      </el-form-item>

      <el-form-item label="开始时间" prop="startTime" :label-width="100" >
        <el-date-picker
            v-model="tableform.startTime"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime" :label-width="100" >
        <el-date-picker
            v-model="tableform.endTime"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status" :label-width="100">
        <el-input v-model="tableform.status"  maxlength="20" autocomplete="off" disabled="true"/>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        确定
      </el-button>
    </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;justify-content: space-between;margin-bottom: 15px;
}
</style>