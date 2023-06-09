<script setup>
import {onMounted, ref} from "vue"
import { getUserSelfIden, editUserSelf } from "@/apis/user"
import axios from "axios"
import {ElMessage} from "element-plus"

onMounted(() => {
  getData()
})

//获取当前页数据
const getData = async () => {
  const params = {
    id: localStorage.getItem("u_Id")
  }
  await getUserSelfIden(params).then(res => {
    userData.value = res.data
  }).catch(err => {
    console.log(err)
  })
}
const dialogTitle = '编辑'
const userData = ref({id:1, mAccount:13212312,mName:'',picture:'',sex:'男',grade:'大一',description:'adwwadawdwad',major:'软件学院'})
// const picture="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
const dialogFormVisible = ref(false)//设置弹窗不显示
const tableform = ref({})//弹窗表单数据

function handleEdit(userData){
  dialogFormVisible.value = true // 设置对话框显示状态为 true
  tableform.value = {...userData} //表单数据设置为传入行数据
  imageUrl.value = getPicture(tableform.value.picture)
  console.log(tableform.value)
}

const dialogOk = async () =>{
  dialogFormVisible.value = false
  const updatedUser = { ...tableform.value }
  await editUserSelf(updatedUser).then(res => {
    if(res.code === 1){
      ElMessage({type: 'success',message: res.msg || '修改成功!',})
      userData.value = tableform.value
      getData()
    }
  }).catch(err => {
    console.log(err)
  })
  // const userId = tableform.value.id
  // axios.put('http://localhost:8080/teas/'+teaId,updatedUser)//url未作修改
  //     .then(response => {
  //       // 处理成功响应
  //
  //       getData()
  //     })
  //     .catch(error => {
  //       // 处理错误
  //       console.error('信息更新失败');
  //       console.error(error);
  //     })
}
const options = [
  {
    value: '软件学院',
    label: '软件学院',
  },
  {
    value: '外国语学院',
    label: '外国语学院',
  },
  {
    value: '土木工程学院',
    label: '土木工程学院',
  },
  {
    value: '美术学院',
    label: '美术学院',
  },
  {
    value: '旅游工程管理学院',
    label: '旅游工程管理学院',
  },
  {
    value: '预科学院',
    label: '预科学院',
  },
]

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}

const imageUrl = ref('')
const handleAvatarSuccess = (response, file, fileList) => {
  console.log("下载图片")
  imageUrl.value = getPicture(response.data)
  tableform.value.picture = response.data
  console.log(tableform.value.picture)
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
  <el-card class="box-one">
    <el-row class="demo-avatar demo-basic">
      <el-col :span="12">
        <div class="block">
          <div class="avatar-wrapper">
            <el-avatar :size="100" :src="getPicture(userData.picture)"></el-avatar>
            <el-tag type="info" class="avatar-tag">{{ userData.mName }}</el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="box-two">
    <div slot="header" class="clearfix">
      <span><b style="font-weight: bold; font-size: 20px;">基本信息</b></span>
      <el-button type="primary" plain style="float: right"  class="User_PersonalCenter_edit" @click="handleEdit(userData)">编辑</el-button>
    </div>

    <el-descriptions  class="User_data" column="1">
      <el-descriptions-item label="用户名ID:"> <span style="font-weight: bold; font-size: 16px">{{ userData.id }}</span></el-descriptions-item>
      <el-descriptions-item label="用户账号:"><span style="font-weight: bold; font-size: 16px">{{ userData.mAccount }}</span></el-descriptions-item>
      <el-descriptions-item label="用户名:"> <span style="font-weight: bold; font-size: 16px">{{ userData.mName }}</span></el-descriptions-item>
      <el-descriptions-item label="性别:">
        <span style="font-weight: bold; font-size: 16px" v-if="userData.sex === 1">女</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.sex === 0">男</span>
      </el-descriptions-item>
      <el-descriptions-item label="年级:">
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade === 1">大一</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade === 2">大二</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade === 3">大四</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade === 4">大四</span>
      </el-descriptions-item>
      <el-descriptions-item label="个人简介:"><span style="font-weight: bold; font-size: 16px">{{ userData.description }}</span></el-descriptions-item>
      <el-descriptions-item label="所属学院:">  <span style="font-weight: bold; font-size: 16px">{{ userData.major }}</span></el-descriptions-item>
    </el-descriptions>
  </el-card>

  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form :model="tableform">
      <el-form-item label="用户ID" :label-width="100" >
        <el-input v-model="tableform.id"  autocomplete="off"  disabled="true"/>
      </el-form-item>
      <el-form-item label="用户账号" :label-width="100">
        <el-input v-model="tableform.mAccount" autocomplete="off"  disabled="true"/>
      </el-form-item>
      <!--      <el-form-item label="账号密码" :label-width="100">-->
      <!--        <el-input v-model="tableform.mPassword" autocomplete="off"/>-->
      <!--      </el-form-item>-->
      <el-form-item label="用户名" :label-width="100">
        <el-input v-model="tableform.mName" autocomplete="off" />
      </el-form-item>
<!--      <el-form-item label="头像" :label-width="100">-->
<!--        <el-input v-model="tableform.picture" autocomplete="off" />-->
<!--      </el-form-item>-->
      <el-form-item
          label="用户头像:"
          prop="picture"
          class="uploadImg"
      >
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
      <el-form-item label="年级" :label-width="100">
        <el-radio-group v-model="tableform.grade">
          <el-radio :label=1>大一</el-radio>
          <el-radio :label=2>大二</el-radio>
          <el-radio :label=3>大三</el-radio>
          <el-radio :label=4>大四</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学院" :label-width="100">
        <el-select v-model="tableform.major" placeholder="选择学院">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="性别" :label-width="100">
        <el-radio-group v-model="tableform.sex">
          <el-radio :label=0>男</el-radio>
          <el-radio :label=1>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人简介" :label-width="100">
        <el-input type="textarea" v-model="tableform.description" autocomplete="off" />
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
.box-one{
  width: 1000px;
  height: 174px;
  margin: 0 auto; /* 居中 */
  margin-bottom: 20px;
}

.block{
  padding-left: 24px;
  padding-top: 12px;
}

.text {
  font-size: 14px;
}

.item {
  margin-top: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-two {
  width: 1000px;
  margin: 0 auto; /* 居中 */
}

.clearfix{
  border-bottom: 2px solid #ebeef5;
  height: 40px;
}

.User_data{
  padding-top: 15px;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
}

.avatar-tag {
  margin-left: 10px;
  font-size: 40px;
}
/*.User_form{*/
/*  padding-top: 15px;*/
/*}*/
/*.User_PersonalCenter_edit{*/
/*  padding-bottom: 110px;*/
/*}*/
</style>