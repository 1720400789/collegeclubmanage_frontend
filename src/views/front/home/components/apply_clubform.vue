<script setup>
import {onMounted, ref} from "vue";
import { storeToRefs } from "pinia"
import { clubStore } from "@/stores/clubStore"
import { getClubByIdAPI, saveApplyforJoinForm } from '@/apis/club'
import {ElMessage} from "element-plus";
const useStore = clubStore()
const { clubid } = storeToRefs(useStore)

const clubName = ref('')
// const applicantId = ref('')
// const applicantName = ref('')
// const applicantTel = ref('')
const personalBio = ref('')

const getBase = async () => {
  console.log(clubid.value)
  const params = {id: clubid.value}
  await getClubByIdAPI(params).then(res => {
    if(res.code === 1){
      clubName.value = res.data.clubName
      console.log(clubName.value)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  getBase()
})

const submitForm = async () => {
  await saveApplyforJoinForm(clubid.value, localStorage.getItem('u_Id'), personalBio.value).then(res => {
    if(res.code === 1){
      ElMessage.success("提交成功！请等待审核")
      goBack()
    }else {
      ElMessage.warning(res.msg || "提交失败！请稍后再试")
    }
  }).catch(err => {
    console.log(err)
  })
}

const goBack = () => {
  window.history.back()
}
</script>

<template>
  <div class="v apply-container">
    <div class="application-form">
      <h1>申请加入社团</h1>
      <div class="form-group">
        <h3>社团名称：{{ clubName }}</h3>
      </div>

<!--      <div class="form-group">-->
<!--        <label for="applicant-id">申请人ID</label>-->
<!--        <input type="text" id="applicant-id" v-model="applicantId" required>-->
<!--      </div>-->

<!--      <div class="form-group">-->
<!--        <label for="applicant-name">申请人姓名</label>-->
<!--        <input type="text" id="applicant-name" v-model="applicantName" required>-->
<!--      </div>-->

<!--      <div class="form-group">-->
<!--        <label for="applicant-tel">联系方式</label>-->
<!--        <input type="tel" id="applicant-tel" v-model="applicantTel" required>-->
<!--      </div>-->

      <div class="form-group">
        <label>个人简介</label>
        <textarea id="personal-bio" v-model="personalBio"></textarea>
      </div>

      <div class="form-actions">
        <button class="btn btn-primary" @click="submitForm">提交</button>
        <button class="btn btn-secondary" @click="goBack">取消</button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.apply-container {
  width: 100%;
  height: 100%;
  background-image: url("src/assets/images/formclub.jpg");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.application-form {
  max-width: 400px;
  margin: 0 auto;
  padding-top: 65px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  margin-top: 30px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  margin-left: 110px;
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn-secondary {
  margin-left: 30px;
  background-color: #ccc;
  color: #fff;
  border: none;
}
</style>
