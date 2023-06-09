<script setup>
import majorListData from '@/directives/major.json'
import gradeListData from '@/directives/grade.json'
import { useRoute, useRouter } from "vue-router"
import {onMounted, ref} from "vue"
import { addUserAPI, editUserAPI } from "@/apis/front_user"
import {ElMessage} from "element-plus"

const gradeList = ref({})
const majorList = ref({})
gradeList.value = JSON.parse(JSON.stringify(gradeListData))
majorList.value = JSON.parse(JSON.stringify(majorListData))
const sexList = [
  {
    name: '男',
    id: '0'
  },
  {
    name: '女',
    id: '1'
  }
]
const route = useRoute()
const router = useRouter()
const ruleFormRef = ref()
const ruleForm = ref({
  mName: '',
  mAccount: '',
  mPassword: '',
  mPhone: '',
  picture: '',
  major: '',
  grade: '',
  sex: ''
})

const actionType = ref('')
const flag = ref('')
const imageUrl = ref('')
const init = () => {
  // console.log(route.query)
  ruleForm.value = route.query
  imageUrl.value = getPicture(ruleForm.value.picture)
  console.log(imageUrl.value)
  // console.log(ruleForm.value.id)
  flag.value = ruleForm.value.id
  // console.log(flag)
  if(flag.value == undefined)
    actionType.value = 'add'
}

onMounted(() => {
  init()
})

const rules = {
  // name: [
  //   { required: true, message: '姓名不能为空', trigger: 'blur'}
  // ],
  mAccount: [
    { required: true, message: '用户名不能为空', trigger: 'blur' }
  ],
  mPassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  mPhone: [
    { required: true, message: '联系电话不能为空', trigger: 'blur'},
    { pattern: /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/, message: '联系电话格式错误', trigger: 'blur'}
  ]
}

const goBack = () => {
  router.push({
    path: '/manageuser'
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
          mName: ruleForm.value.mName,
          mAccount: ruleForm.value.mAccount,
          mPassword: ruleForm.value.mPassword,
          mPhone: ruleForm.value.mPhone,
          picture: ruleForm.value.picture,
          major: ruleForm.value.major,
          grade: ruleForm.value.grade,
          sex: ruleForm.value.sex
        }
        console.log(params.value)
        await addUserAPI(params.mName, params.mAccount, params.mPassword, params.mPhone, params.picture, params.major, params.grade, params.sex).then(res => {
          if(res.code === 1){
            ElMessage.success('用户添加成功！')
            if(!st) {
              goBack()
            }else {
              ruleForm.value.mName = '',
              ruleForm.value.mAccount = '',
              ruleForm.value.mPassword = '',
              ruleForm.value.mPhone = '',
              ruleForm.value.picture = '',
              ruleForm.value.major = '',
              ruleForm.value.grade = '',
              ruleForm.value.sex = ''
            }
          }else {
            ElMessage.error(res.msg || '操作失败')
          }
        }).catch(err => {
          ElMessage.error('请求出错了：' + err)
        })
      }else {
        const params = {
          mName: ruleForm.value.mName,
          mAccount: ruleForm.value.mAccount,
          mPassword: ruleForm.value.mPassword,
          mPhone: ruleForm.value.mPhone,
          picture: ruleForm.value.picture,
          major: ruleForm.value.major,
          grade: ruleForm.value.grade,
          sex: ruleForm.value.sex,
          id: ruleForm.value.id
        }
        await editUserAPI(params.mName, params.mAccount, params.mPassword, params.mPhone, params.picture, params.major, params.grade, params.sex, params.id).then(res => {
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

const handleAvatarSuccess = (response, file, fileList) => {
  console.log("下载图片")
  imageUrl.value = getPicture(response.data)
  ruleForm.value.picture = response.data
  console.log(ruleForm.value.picture)
}

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
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
        <div>
        <el-form-item label="姓名:" prop="mName">
          <el-input v-model="ruleForm.mName" placeholder="请输入姓名" maxlength="20"/>
        </el-form-item>
        <el-form-item label="用户名:" prop="mAccount">
          <el-input v-model="ruleForm.mAccount" placeholder="请输入用户名" maxlength="20"/>
        </el-form-item></div>
        <div>
        <el-form-item
            label="用户密码:"
            prop="mPassword"
        >
          <el-input
              v-model="ruleForm.mPassword"
              placeholder="请输入账号密码"
              maxlength="20"
          />
        </el-form-item>

        <el-form-item
            label="联系电话:"
            prop="mPhone"
        >
          <el-input
              v-model="ruleForm.mPhone"
              placeholder="请输入联系电话"
              maxlength="20"
          />
        </el-form-item></div>
        <div>
          <el-form-item
              label="性别:"
              prop="sex"
          >
            <el-select
                v-model="ruleForm.sex"
                placeholder="请选择性别"
            >
              <el-option v-for="(item,index) in sexList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item
              label="年级:"
              prop="grade"
          >
            <el-select
                v-model="ruleForm.grade"
                placeholder="请选择年级"
            >
              <el-option v-for="(item,index) in gradeList" :key="index" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item
              label="学院:"
              prop="major"
          >
            <el-select
                v-model="ruleForm.major"
                placeholder="请选择学院"
            >
              <el-option v-for="(item,index) in majorList" :key="index" :label="item.name" :value="item.name" />
            </el-select>
          </el-form-item>
        </div>
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
            <img v-if="imageUrl || imageUrl.value != 'http://localhost:8080/common/download?name=undefined' " :src="imageUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
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