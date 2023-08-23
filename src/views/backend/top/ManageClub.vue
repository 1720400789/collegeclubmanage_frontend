<script setup>
//使用:icon绑定图标，需单独导入图标组件
import { Plus,Delete,Search } from '@element-plus/icons-vue'
import {ref, onMounted, computed} from "vue"
import {ElMessage} from "element-plus"
import {addClubAPI, editClubAPI, getClubPageAPI, editClubStatusAPI} from "@/apis/club"
import majorListData from '@/directives/major.json'


const isDisabled = ref(false)
const clubs = ref([])
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const sname = ref('')//初始化搜索框的值
const dialogFormVisible = ref(false)//设置弹窗不显示
const tableformRef = ref()
const tableform = ref({})//弹窗表单数据
const dialogType = ref('add')//初始化弹出框的类型为增加弹窗
const dialogTitle = computed(() => {
  return dialogType.value === 'add' ? '新增社团' : '编辑社团'
})

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
  await getClubPageAPI(params).then(response => {
    clubs.value = response.data.records;
    total.value = response.data.total;
    console.log(clubs.value)
  })
      .catch(error => {
        console.error(error);
      });
};

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}

const genderList = [
  {
    name:'院级',
    id:'0'
  },
  {
    name:'校级',
    id:'1'
  }
]

const majorList = ref({})
majorList.value = JSON.parse(JSON.stringify(majorListData))

const rules = {
  // name: [
  //   { required: true, message: '姓名不能为空', trigger: 'blur'}
  // ],
  clubName: [
    {required: true, message: '社团名称不能为空', trigger:'blur' }
  ],
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur'}
  ]
}

const handleSizeChange=(pagesize)=>{
  pageSize.value=pagesize;
  getData();
}

function handleEdit(row) {// 处理编辑按钮点击事件
  dialogFormVisible.value = true // 设置对话框显示状态为 true
  tableform.value = {...row} //表单数据设置为传入行数据
  imageUrl.value = getPicture(tableform.value.picture)
  dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
  console.log('Edit clicked:', row)
  isDisabled.value = true
}

//处理页码变化点击事件
const handleCurrentChange = (pageNum) => {
  currentPage.value = pageNum;
  getData();
};

// 定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  clubs.value = clubs.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}

const handleAdd = () => {
  dialogFormVisible.value = true
  dialogType.value = 'add'
  tableform.value = {gender: '院级',major:'计算机科学与工程学院'}
  imageUrl.value = getPicture(tableform.value.picture)
  isDisabled.value = false
}

const dialogOk = async () => {
  dialogFormVisible.value = false
  console.log('新增数据')
  tableformRef.value.validate(async  (valid) => {
    console.log(valid)
    if(valid) {
      console.log(dialogType.value)
      if(dialogType.value  === 'add') {
        const params = {
          id: tableform.value.id,
          clubName: tableform.value.clubName,
          account: tableform.value.account,
          name: tableform.value.name,
          description: tableform.value.description,
          picture: tableform.value.picture,
          gender: tableform.value.gender,
          major: tableform.value.major,
          num: tableform.value.num,
          birthTime: tableform.value.birthTime,
          birthMan: tableform.value.birthMan
        }
        console.log(params.value)
        await addClubAPI(params.id, params.clubName, params.account, params.name, params.description, params.picture, params.gender, params.major, params.num, params.birthTime, params.birthMan).then(res => {
          if(res.code === 1){
            ElMessage.success('社团添加成功！')
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
          account: tableform.value.account,
          name: tableform.value.name,
          description: tableform.value.description,
          picture: tableform.value.picture,
          gender: tableform.value.gender,
          major: tableform.value.major,
          num: tableform.value.num,
          birthTime: tableform.value.birthTime,
          birthMan: tableform.value.birthMan
        }
        await editClubAPI(params.id, params.clubName, params.account, params.name, params.description, params.picture, params.gender, params.major, params.num, params.birthTime, params.birthMan).then(res => {
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

let multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = []
  val.forEach(item => {
    multipleSelection.value.push(item.id)
  })
}

const statusHandle = async (flag, id) => {
  let ids = []
  if(id == undefined) ids = multipleSelection.value
  else ids = [id]
  console.log(ids)
  await editClubStatusAPI(flag, ids).then(res => {
    if(res.code === 1){
      ElMessage.success('社团状态修改成功！')
      getData()
    }else {
      ElMessage.error(res.msg || '操作失败')
    }
  })
}

const imageUrl = ref('')
const handleAvatarSuccess = (response, file, fileList) => {
  // console.log("下载图片")
  imageUrl.value = getPicture(response.picture)
  tableform.value.picture = response.data
  // console.log(tableform.value.picture)
}

const onChange = (file) => {
  if(file) {
    const suffix = file.name.split('.')[1]
    const size = file.size / 1024 / 1024 < 2
    if(['png','jpeg','jpg'].indexOf(suffix) < 0){
      ElMessage.error('上传图片只支持 png、jpeg、jpg 格式！')
      return false
    }
    if(!size){
      ElMessage.error('上传文件大小不能超过 2MB!')
      return false
    }
    return file
  }
}
</script>

<template>
  <!--  社团表-->
  <div class="topTool">
    <el-input v-model="sname" placeholder="请输入社团名称,所属学院或负责人姓名进行搜索"
              @keyup.enter="getData" :prefix-icon="Search">
    </el-input>
    <el-button type="primary" :icon="Plus" @click="handleAdd"
               style="margin-left: 20px;">添加社团</el-button>
    <el-button type="danger" :icon="Delete" @click="statusHandle('1',null)"
               v-if="multipleSelection.length>0">封禁选中社团</el-button>
  </div>
  <!--  v-model双向绑定-->
  <!--el-table数据表格组件-->
  <el-table
      :data="clubs"
      :header-cell-style="{ background: '#f6f9fa'}"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange">
<!--    <el-table-column type="selection"/>-->
    <el-table-column prop="clubName" label="社团名称"  ></el-table-column>
    <el-table-column prop="name" label="负责人姓名" sortable></el-table-column>
    <el-table-column prop="picture" label="社团头像" align="center">
      <template #default="{ row }">
        <el-image style="width: auto; height: 40px; border: none; cursor: pointer"
                  :src="getPicture(row.picture)"
                  :preview-src-list="[ `/common/download?name=${row.picture}` ]">
        </el-image>
      </template>
    </el-table-column>
    <el-table-column prop="level" label="社团等级" sortable></el-table-column>
    <el-table-column prop="major" label="所属学院" sortable></el-table-column>
    <el-table-column prop="num" label="社团人数" sortable></el-table-column>
    <el-table-column prop="status" label="状态" sortable>
      <template #default="scope">
        <span style="margin-right: 10px">{{ scope.row.status == '0' ? '封禁' : '正常' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="180">
      <template #default="{ row }">
        <el-button type="primary" size="small" icon="Edit" @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="statusHandle('0', row.id)" v-if="row.status == 0">解封</el-button>
        <el-button type="danger" size="small" :icon="Delete" @click="statusHandle('1', row.id)" v-if="row.status == 1">封禁</el-button>
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
      <el-form-item label="社团ID" prop="id" :label-width="100" >
        <el-input v-model="tableform.id"  placeholder="请输入ID" maxlength="20" autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="社团名称" prop="clubName" :label-width="100">
        <el-input v-model="tableform.clubName" placeholder="请输入用户名" maxlength="20" autocomplete="off"/>
      </el-form-item>
<!--      这里做成下拉框-->
      <el-form-item label="负责人账号" prop="account" :label-width="100">
        <el-input v-model="tableform.account" placeholder="请输入负责人账号" maxlength="20" autocomplete="off" />
      </el-form-item>
<!--      <el-form-item label="负责人姓名" prop="name" :label-width="100">-->
<!--        <el-input v-model="tableform.name" placeholder="请输入负责人姓名" maxlength="20" autocomplete="off" />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="社团负责人账号" prop="mAccount" :label-width="100">-->
<!--        <el-input v-model="tableform.mAccount" placeholder="请输入负责人账号" maxlength="20" autocomplete="off" />-->
<!--      </el-form-item>-->
      <el-form-item label="社团简介" prop="description" :label-width="100">
        <el-input type="textarea" v-model="tableform.description" placeholder="请输入社团简介" maxlength="20" autocomplete="off" />
      </el-form-item>
      <el-form-item label="社团头像" prop="picture" class="uploadImg" :label-width="100">
<!--        <el-input v-model="tableform.picture" autocomplete="off" />-->
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8080/common/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-change="onChange"
            ref="upload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="社团等级" prop="gender" :label-width="100">
<!--        <el-radio-group v-model="tableform.gender">-->
<!--          <el-radio label="院级">院级</el-radio>-->
<!--          <el-radio label="校级">校级</el-radio>-->
<!--        </el-radio-group>-->
        <el-select
            v-model="tableform.gender"
            placeholder="请选择社团等级"
        >
          <el-option v-for="(item,index) in genderList" :key="index" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="所属学院" prop="major" :label-width="100">
<!--        <el-input v-model="tableform.major" autocomplete="off" />-->
        <el-select
            v-model="tableform.major"
            placeholder="请选择学院"
        >
          <el-option v-for="(item,index) in majorList" :key="index" :label="item.name" :value="item.name" />
        </el-select>
      </el-form-item>
      <el-form-item label="社团人数" prop="num" :label-width="100">
        <el-input v-model="tableform.num"  maxlength="20" autocomplete="off" disabled="true"/>
      </el-form-item>
      <el-form-item label="建立日" prop="birthTime" :label-width="100" :disabled="isDisabled">
        <el-date-picker
            v-model="tableform.birthTime"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="建立者" prop="birthMan" :label-width="100">
        <el-input v-model="tableform.birthMan" placeholder="请输入建立者" maxlength="20" autocomplete="off" :disabled="isDisabled"/>
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

<script>
export default {
  name: "Club"
}
</script>

<style scoped>
.el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;justify-content: space-between;margin-bottom: 8px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
</style>

