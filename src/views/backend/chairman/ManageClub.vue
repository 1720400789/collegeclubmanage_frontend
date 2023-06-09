<script setup>
import {chairmanStore} from "@/stores/chairman"
import {storeToRefs} from "pinia"
import { getChairClubListAPI } from "@/apis/chairman";
import {computed, onMounted, ref} from "vue";
import { getClubUserListAPI } from "@/apis/club";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const userStore = chairmanStore()
const { clubList, admid } = storeToRefs(userStore)

const getClubList = async (id) => {
  // console.log(id)
  const params = {id: id}
  await getChairClubListAPI(params).then(res => {
    if(String(res.code === '1')){
      clubList.value = res.data
      clubPageList.value = res.data || []
      admid.value = id
      console.log(clubList.value)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  let id = localStorage.getItem("userId")
  // console.log(id)
  getClubList(id)
})

const clubPageList = ref([
])

const userPageList = ref([])

const club = ref('')

const router = useRouter()

const searchQuery = ref('')
const filteredClubs = computed(() => {
  // 根据搜索条件筛选 clubs.value 数组，返回匹配的社团
  if (searchQuery.value === '') {
    return clubPageList.value
  } else {
    return clubPageList.value.filter(club =>
        club.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
})

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}

const selectedClub = ref()

const selectClub = async (club) => {
  selectedClub.value = club
  console.log(club.id)
  const params = {id: club.id}
  await getClubUserListAPI(params).then(res => {
    if(String(res.code === '1')){
      userPageList.value = res.data
    }else {
      ElMessage.warning(res.msg || "操作失败")
    }
  }).catch(err => {
    console.log(err)
  })
}

const returnToClubsPage = () => {
  selectedClub.value = null
}

const addHoverEffect = (event) => {
  event.target.classList.add('hovered')
}

const removeHoverEffect = (event) => {
  event.target.classList.remove('hovered')
}

</script>

<template>
  <div class="container">
    <div v-if="!selectedClub">
    <div class="clubs-container">
      <div v-for="club in filteredClubs" :key="club.id" class="club-item">
        <!--        <router-link :to="`/club/${club.id}`" class="club-link">-->
        <div>
          <div class="image-container" @mouseover="showQuitButton = true" @mouseleave="showQuitButton = null">
            <img :src="getPicture(club.picture)" alt="社团头像" @click="selectClub(club)" @mouseover="addHoverEffect($event)" @mouseleave="removeHoverEffect($event)" class="club-image">
            <button v-if="showQuitButton" class="quit-button">查看详情</button>
          </div>
          <h3 class="club-name">{{ club.clubName }}</h3>
          <p class="club-leader" v-if="club.level === 0">校级</p>
          <p class="club-leader" v-if="club.level === 2">{{ club.major }}</p>
          <p class="club-leader">{{ club.description }}</p>
        </div>
        <!--        </router-link>-->
      </div>
    </div>
    </div>

    <div v-else>
      <div class="club-details-page">
        <button class="return-button" @click="returnToClubsPage">返回</button>
        <div v-for="club in userPageList" :key="club.id" class="club-item">
<!--          <div @click="check(club)">-->
            <div class="image-container" @mouseover="showQuitButton = true" @mouseleave="showQuitButton = null">
              <img :src="getPicture(club.picture)" alt="用户头像" class="club-image">
              <button v-if="showQuitButton" class="quit-button">查看详情</button>
            </div>
            <h3 class="club-name">{{ club.mName }}</h3>
            <p class="club-leader" v-if="club.grade === 1">年级：大一</p>
            <p class="club-leader" v-if="club.grade === 2">年级：大二</p>
            <p class="club-leader" v-if="club.grade === 3">年级：大三</p>
            <p class="club-leader" v-if="club.grade === 4">年级：大四</p>
            <p class="club-members" v-if="club.sex === 0">性别：男</p>
            <p class="club-members" v-if="club.sex === 1">性别：女</p>
            <p class="club-members">院校：{{ club.major }}</p>
<!--          </div>-->
        </div>
<!--        <div class="club-details">-->
<!--          <img :src="getPicture(selectedClub.picture)" alt="社团图片" class="club-image-details">-->
<!--          <div class="club-mes">社团名称：{{ selectedClub.name }}</div>-->
<!--          <div class="club-mes">负责人：{{ selectedClub.leader }}</div>-->
<!--          <div class="club-mes">社团人数：{{ selectedClub.members }}</div>-->
<!--          <div class="club-mes">社团简介：</div>-->
<!--          &lt;!&ndash; 在此处显示其他社团详细信息 &ndash;&gt;-->
<!--          <button class="apply-button"><router-link to="/applyclub">申请加入</router-link></button>-->
<!--        </div>-->
      </div>
    </div>

  </div>
</template>

<style scoped>
.container {
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
  background-color: #ff6161;
  border: none;
  border-radius: 20px;
  color: #fff;
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

.add-club-button {
  padding: 10px 20px;
  background-color: #616dff;
  border: none;
  border-radius: 20px;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

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
  position: relative;
}

.club-link {
  text-decoration: none;
  color: inherit;
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

.club-details-page {
  max-width: 1200px;
  height: 100vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #fdf4eb;
}

.return-button {
  margin-bottom: 20px;
  border: none;
  background-color: #616dff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.club-details {
  text-align: center;
}
</style>
