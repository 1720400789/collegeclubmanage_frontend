<script setup>
import {onMounted, ref} from "vue"
import {useRoute, useRouter} from "vue-router"
import { checkApplyAPI } from "@/apis/audit";
import {ElMessage} from "element-plus"

const route = useRoute()
const router = useRouter()
const userData = ref({id:1, mAccount:13212312,mName:'',picture:'',msex:1,grade:'大一',description:'adwwadawdwad',major:'软件学院'})

onMounted(() => {
  getData()
})

//获取当前页数据
const getData = async () => {
  let applyForm = route.query
  console.log(applyForm)
  userData.value = applyForm
}

const goBack = () => {
  router.push({
    path: '/manageuser'
  })
}

const handleStatus = async (st) => {
  const params = {
    id: userData.value.id,
    status: st
  }
  if (st === 0){
    goBack()
  }else {
    await checkApplyAPI(params).then(res => {
      if(res.code === 1){
        goBack()
        ElMessage.success(res.msg || "更改成功")
      }else {
        ElMessage.error(res.msg || "更改失败")
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}

</script>

<template>
  <el-card class="box-one">
    <el-row class="demo-avatar demo-basic">
      <el-col :span="12">
        <div class="block">
          <div class="avatar-wrapper">
            <el-avatar :size="100" :src="getPicture(userData.mpicture)"></el-avatar>
            <el-tag type="info" class="avatar-tag">{{ userData.mname }}</el-tag>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <el-card class="box-two">
    <div slot="header" class="clearfix">
      <span><b style="font-weight: bold; font-size: 20px;">申请人信息</b></span>
      <el-button type="primary" plain style="float: right"  class="User_PersonalCenter_edit" @click="handleStatus(1)">同意</el-button>
      <el-button type="warning" plain style="float: right"  class="User_PersonalCenter_edit" @click="handleStatus(2)">驳回</el-button>
      <el-button type="info" plain style="float: right"  class="User_PersonalCenter_edit" @click="handleStatus(0)">我再想想</el-button>
    </div>

    <el-descriptions  class="User_data" column="1">
      <el-descriptions-item label="用户名ID:"> <span style="font-weight: bold; font-size: 16px">{{ userData.memberId }}</span></el-descriptions-item>
      <el-descriptions-item label="用户账号:"><span style="font-weight: bold; font-size: 16px">{{ userData.maccount }}</span></el-descriptions-item>
      <el-descriptions-item label="姓名:"> <span style="font-weight: bold; font-size: 16px">{{ userData.mname }}</span></el-descriptions-item>
      <el-descriptions-item label="性别:">
        <span style="font-weight: bold; font-size: 16px" v-if="userData.msex == 1">女</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.msex == 0">男</span>
      </el-descriptions-item>
      <el-descriptions-item label="年级:">
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade == 1">大一</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade == 2">大二</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade == 3">大四</span>
        <span style="font-weight: bold; font-size: 16px" v-if="userData.grade == 4">大四</span>
      </el-descriptions-item>
      <el-descriptions-item label="所属学院:">  <span style="font-weight: bold; font-size: 16px">{{ userData.major }}</span></el-descriptions-item>
      <el-descriptions-item label="为什么申请:"><span style="font-weight: bold; font-size: 16px">{{ userData.description }}</span></el-descriptions-item>
    </el-descriptions>
  </el-card>
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
.User_PersonalCenter_edit{
  margin: 0px 10px;
}
</style>