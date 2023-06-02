<script setup>
import { useRoute, useRouter } from "vue-router";
import {onMounted, onBeforeMount, ref} from "vue";
import { addAdminAPI, editAdminAPI } from "@/apis/backend_user";
import {ElMessage} from "element-plus";

const route = useRoute()
const router = useRouter()
const ruleFormRef = ref()
const ruleForm = ref({
  name: '',
  account: '',
  password: '',
  phone: ''
})

const actionType = ref('')
const flag = ref('')
const init = () => {
  console.log(route.query)
  ruleForm.value = route.query
  console.log(ruleForm.value.id)
  flag.value = ruleForm.value.name
  console.log(flag)
  if(flag.value == undefined)
    actionType.value = 'add'
}

onMounted(() => {
  init()
})

const rules = {
  name: [
    { required: true, message: '姓名不能为空', trigger: 'blur'}
  ],
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '联系电话不能为空', trigger: 'blur'},
    { pattern: /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/, message: '联系电话格式错误', trigger: 'blur'}
  ]
}

const goBack = () => {
  router.push({
    path: '/manageadmin'
  })
}

const submitForm = async (st) => {
  console.log('新增数据')
  ruleFormRef.value.validate(async  (valid) => {
    console.log(valid)
    if(valid) {
      console.log(actionType.value)
      if(actionType.value === 'add') {
        const params = {
          name: ruleForm.value.name,
          account: ruleForm.value.account,
          password: ruleForm.value.password,
          phone: ruleForm.value.phone
        }
        console.log(params.value)
        await addAdminAPI(params.account, params.name, params.password, params.phone).then(res => {
          if(res.code === 1){
            ElMessage.success('管理员添加成功！')
            if(!st) {
              goBack()
            }else {
              ruleForm.value.name = '',
              ruleForm.value.account = '',
              ruleForm.value.password = '',
              ruleForm.value.phone = ''
            }
          }else {
            ElMessage.error(res.msg || '操作失败')
          }
        }).catch(err => {
          ElMessage.error('请求出错了：' + err)
        })
      }else {
        const params = {
          name: ruleForm.value.name,
          account: ruleForm.value.account,
          password: ruleForm.value.password,
          phone: ruleForm.value.phone,
          id: ruleForm.value.id
        }
        await editAdminAPI(params.account, params.name, params.password, params.phone, params.id).then(res => {
          if(res.code === 1){
            ElMessage.success('修改信息成功！')
            goBack()
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

</script>

<template>
  <div class="addBrand-container" id="member-add-app">
    <div class="container">
      <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          :inline="false"
          label-width="180px"
          class="demo-ruleForm"
      >
        <el-form-item label="姓名:" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入用户名" maxlength="20"/>
        </el-form-item>
        <el-form-item label="用户名:" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入用户名" maxlength="20"/>
        </el-form-item>
        <el-form-item
            label="用户密码:"
            prop="password"
        >
          <el-input
              v-model="ruleForm.password"
              placeholder="请输入账号密码"
              maxlength="20"
          />
        </el-form-item>

        <el-form-item
            label="联系电话:"
            prop="phone"
        >
          <el-input
              v-model="ruleForm.phone"
              placeholder="请输入联系电话"
              maxlength="20"
          />
        </el-form-item>

        <div class="subBox address">
          <el-form-item>
            <el-button  @click="goBack()">
              取消
            </el-button>
            <el-button
                type="primary"
                @click="submitForm( false)"
            >
              保存
            </el-button>
            <el-button
                v-if="actionType == 'add'"
                type="primary"
                class="continue"
                @click="submitForm( true)"
            >
              保存并继续添加
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/page.css';

</style>