<script setup>
import { ref, computed, onMounted} from 'vue'

import {getSelfClubPageListAPI, userapplyforClubAPI} from "@/apis/club"
import {ElMessage} from "element-plus";

const showQuitButton = ref(null);
const dialogFormVisible = ref(false)
const tableform = ref({})//弹窗表单数据
const tableformRef = ref()

const dialogOk = async () => {
  dialogFormVisible.value = false
  console.log('申请社团')
  tableformRef.value.validate(async  (valid) => {
    console.log(valid)
    if(valid) {
      const params = {
        memberId: localStorage.getItem('u_Id'),
        applyName: tableform.value.applyName,
        clubDescription: tableform.value.clubDescription,
        birthTime: tableform.value.birthTime,
        birthMan: tableform.value.birthMan
      }
      console.log(params.value)
      await userapplyforClubAPI(params.memberId, params.applyName, params.clubDescription, params.birthTime, params.birthMan).then(res => {
        if(res.code === 1){
          ElMessage.success('社团申请成功！')
          tableform.value = {}
        }else {
          ElMessage.error(res.msg || '操作失败')
        }
      }).catch(err => {
        ElMessage.error('请求出错了：' + err)
      })
    }else {
      ElMessage.info('请检查表单信息')
    }
  })
}

const handleAdd = () => { //!!!!!!!!!!!!!!可能需要添加一个id
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  tableform.value = {} // 清空表单数据
}

const rules = {
  applyName: [
    {required: true, message: '社团名称不能为空', trigger:'blur' }
  ],
  clubDescription: [
    {required: true, message: '活动描述不能为空', trigger:'blur' }
  ]
}

const quitClub = (clubId) => {
  // 执行退出社团操作
  // 在这里编写您退出社团的逻辑代码
  console.log(`退出社团 ${clubId}`);
};
const returnToClubs = () => {
  selectClubs.value = null
}
const select = (club) => {
  selectClubs.value = club
}
const addHoverEffect = (event) => {
  event.target.classList.add('hovered');
}
const removeHoverEffect = (event) => {
  event.target.classList.remove('hovered');
}
const clubs = ref([
  // {
  //   id: 1,
  //   name: '社团1',
  //   leader: '负责人1',
  //   members: 10,
  //   image: image01
  // }
])

const searchQuery = ref('');
const selectClubs = ref()

const filteredClubs = computed(() => {
  // 根据搜索条件筛选 clubs.value 数组，返回匹配的社团
  if (searchQuery.value === '') {
    return clubs.value;
  } else {
    return clubs.value.filter(club =>
        club.clubName.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
})

const shouldShowScrollTopButton = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const getMyClubPage = async () => {
  const params = {
    userid: localStorage.getItem("u_Id")
  }
  await getSelfClubPageListAPI(params).then(res => {
    if(String(res.code) === '1'){
      clubs.value = res.data || []
      console.log(res.data)
      console.log(clubs.value)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  getMyClubPage()
  window.addEventListener('scroll', () => {
    shouldShowScrollTopButton.value = window.scrollY > 1;
  });
});

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}
</script>

<template>
  <div class="container">
    <div v-if="!selectClubs">
      <div class="header">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="搜索社团名称">
        </div>
        <el-button type="primary" :icon="Plus" @click="handleAdd"
                   style="margin-left: 20px;font-size: 17px">申请社团</el-button>
      </div>

      <div class="clubs-container">
        <div v-for="club in filteredClubs" :key="club.id" class="club-item">
            <div class="image-container" @mouseover="showQuitButton = true" @mouseleave="showQuitButton = null">
              <img :src="getPicture(club.picture)" alt="社团图片" class="club-image" @click="select(club)" @mouseover="addHoverEffect($event)" @mouseleave="removeHoverEffect($event)">
              <button v-if="showQuitButton" class="quit-button" @click="quitClub(club.id)">退出社团</button>
            </div>
            <h3 class="club-name">{{ club.clubName }}</h3>
            <p class="club-leader">负责人：{{ club.name }}</p>
            <p class="club-members">{{ club.description }}</p>
        </div>
      </div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      <div class="scroll-to-top" @click="scrollToTop" v-show="shouldShowScrollTopButton">
        <i class="fas fa-arrow-up"></i>
      </div>
  </div>
    <div v-else>
      <div class="club-details">
        <button class="re-button" @click="returnToClubs">返回</button>
        <div class="myclub-details">
          <img :src="getPicture(selectClubs.picture)" alt="社团图片" class="myclub-image-details">
          <div class="club-mess">社团名称：{{ selectClubs.clubName }}</div>
          <div class="club-mess">负责人：{{ selectClubs.name }}</div>
          <div class="club-mess">社团人数：{{ selectClubs.num }}</div>
          <div class="club-mess">社团简介：{{ selectClubs.description }}</div>
          <!-- 在此处显示其他社团详细信息 -->
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" :title="申请社团表单">
    <el-form
        ref="tableformRef"
        :model="tableform"
        :rules="rules"
        :inline="false"
        label-width="180px"
    >
      <el-form-item label="社团名称" prop="applyName" :label-width="100" >
        <el-input v-model="tableform.applyName"  placeholder="请输入社团名称" maxlength="20" autocomplete="off"/>
      </el-form-item>

      <el-form-item label="社团简介" prop="clubDescription" :label-width="100">
        <el-input type="textarea" v-model="tableform.clubDescription" placeholder="请输入相关简介" autocomplete="off" />
      </el-form-item>

      <el-form-item label="建立时间" prop="birthTime" :label-width="100" >
        <el-date-picker
            v-model="tableform.birthTime"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="建立人" prop="birthMan" :label-width="100">
        <el-input v-model="tableform.birthMan"  placeholder="请输入建立人" maxlength="20" autocomplete="off"/>
      </el-form-item>

    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        提交申请
      </el-button>
    </span>
    </template>
  </el-dialog>

</template>

<style>
.container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.image-container {
  position: relative; /* 添加定位属性，使退出社团按钮相对定位 */
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.1); /* 图片放大1.1倍 */
}

.quit-button {
  position: absolute; /* 使按钮相对定位 */
  top: 10px; /* 调整按钮的上边距 */
  right: 10px; /* 调整按钮的右边距 */
  padding: 5px 10px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  color: #616dff;
  cursor: pointer;
  opacity: 0; /* 初始状态下按钮透明 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
}

.image-container:hover .quit-button {
  opacity: 1; /* 鼠标移到图片上时按钮显示 */
}

.search-bar {
  display: flex;
  align-items: center;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
}

/*.add-club-button {*/
/*  padding: 10px 20px;*/
/*  background-color: #616dff;*/
/*  border: none;*/
/*  border-radius: 20px;*/
/*  color: #fff;*/
/*  text-decoration: none;*/
/*  cursor: pointer;*/
/*}*/

.clubs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.club-item {
  width: calc(25% - 20px);
  padding: 20px;
  /*border: 1px solid #ccc;*/
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
}

.club-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.club-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.club-leader,
.club-members {
  font-size: 14px;
  margin-bottom: 5px;
}

.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #616dff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scroll-to-top:hover {
  opacity: 1;
}
.club-details {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #fdf4eb;
}
.re-button {
  margin-bottom: 20px;
  border: none;
  background-color: #616dff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}
.club-mess {
  width: 300px;
  height: 30px;
  text-align: left;
  font-size: 18px;
  margin-left: 410px;
  /*background-color: red;*/
}
.myclub-image-details {
  margin-bottom: 10px;
  width: 300px; /* 调整图片的宽度 */
  height: 180px; /* 调整图片的高度 */
  object-fit: cover;
  border-radius: 4px;
}
.myclub-details {
  text-align: center;
}
</style>