<script setup>
import {ref} from "vue";
import {ElMessage} from "element-plus";
import {addNoticeAPI} from "@/apis/notice";

const tableform = ref({})//弹窗表单数据
const tableformRef = ref()

const rules = {
  title: [
    {required: true, message: '公告名称不能为空', trigger:'blur' },
    { max: 20, message: '公告名称最长为20个字', trigger: 'blur' }
  ],
  content: [
    {required: true, message: '公告内容不能为空', trigger:'blur' }
  ],
  startTime: [
    {required: true,  trigger:'blur' }
  ]
}

const onSubmit = async () => {
  console.log('新增活动')
  tableformRef.value.validate(async  (valid) => {
    console.log(valid)
    if(valid) {
      const params = {
        manId: localStorage.getItem('userId'),
        title: tableform.value.title,
        content: tableform.value.content
      }
      console.log(params.value)
      await addNoticeAPI(params.manId, params.title, params.content).then(res => {
        if(res.code === 1){
          ElMessage.success('公告发布成功！')
          tableform.value = {id:'',title:'',notice:'',startTime:''}
        }else {
          ElMessage.error(res.msg || '操作失败')
        }
      }).catch(err => {
        ElMessage.error('请求出错了：' + err)
      })
    }else {
      ElMessage.info('请检查公告信息')
    }
  })
}

const clearAll = () => {
  tableform.value = {id:'',title:'',notice:'',startTime:''}
}
</script>

<template>
  <el-card class="box-card">

    <el-form
        ref="tableformRef"
        :model="tableform"
        :rules="rules"
        :inline="false"
        :label-position="left"
        label-width="180px"
    >
      <el-form-item label="公告名称" prop="title" :label-width="100" size="large" style="font-weight: bold;" >
        <el-input v-model="tableform.title"  placeholder="请输入公告名称" maxlength="20" autocomplete="off" />
      </el-form-item>

      <el-form-item label="公告内容" prop="content" :label-width="100" style="font-weight: bold;">
        <el-input type="textarea" v-model="tableform.content" placeholder="请输入公告内容" maxlength="20" autocomplete="off" />
      </el-form-item>
<!--      <el-form-item label="开始时间" prop="startTime" :label-width="100" style="font-weight: bold;">-->
<!--        <el-col :span="7">-->
<!--          <el-date-picker type="date" placeholder="选择日期" v-model="tableform.startTime" style="width: 100%;"></el-date-picker>-->
<!--        </el-col>-->
<!--        <el-col class="line" :span="1">-</el-col>-->
<!--        <el-col :span="11">-->
<!--          <el-time-picker placeholder="选择时间" v-model="tableform.startTime" style="width: 100%;"></el-time-picker>-->
<!--        </el-col>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" style="font-size: 17px" @click="onSubmit">立即创建</el-button>
        <el-button style=" font-size: 17px" @click="clearAll">清空</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.box-card {
  width: 60%;
  margin: 0 auto;
  margin-top: 150px;
}

</style>