<script setup>
import {computed, onMounted, ref} from "vue"
import { clubStore } from "@/stores/clubStore"
import {getClubPageListAPI} from "@/apis/club"
import {ElMessage} from "element-plus"
import {storeToRefs} from "pinia"

const useStore = clubStore()
const { clubid } = storeToRefs(useStore)
const getClubList = async () => {
  // console.log(id)
  const params = {id: localStorage.getItem("u_Id")}
  await getClubPageListAPI(params).then(res => {
    if(String(res.code === '1')){
      clubs.value = res.data || []
    }else {
      ElMessage.warning("没有数据")
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  getClubList()
})

const clubs = ref([])

const searchQuery = ref('')
const selectedClub = ref()

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

const selectClub = (club) => {
  selectedClub.value = club
  clubid.value = club.id
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

const getPicture =  (name) => {
  return `http://localhost:8080/common/download?name=${name}`
}
</script>

<template>
  <div class="container">
    <div v-if="!selectedClub">
      <div class="header">
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="搜索社团名称">
        </div>
      </div>

      <div class="clubs-container">
        <div v-for="club in filteredClubs" :key="club.id" class="club-item">
          <img :src="getPicture(club.picture)" alt="社团图片" class="club-image" @click="selectClub(club)" @mouseover="addHoverEffect($event)" @mouseleave="removeHoverEffect($event)">
          <h3 class="club-name">{{ club.clubName }}</h3>
          <p class="club-leader">负责人：{{ club.name }}</p>
          <p class="club-members">社团人数：{{ club.num }}</p>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="club-details-page">
        <button class="return-button" @click="returnToClubsPage">返回</button>
        <div class="club-details">
          <img :src="getPicture(selectedClub.picture)" alt="社团图片" class="club-image-details">
          <div class="club-mes">社团名称：{{ selectedClub.clubName }}</div>
          <div class="club-mes">负责人：{{ selectedClub.name }}</div>
          <div class="club-mes">社团人数：{{ selectedClub.num }}</div>
          <div class="club-mes">社团简介：{{ selectedClub.description }}</div>
          <!-- 在此处显示其他社团详细信息 -->
          <button class="apply-button"><router-link to="/applyclub">申请加入</router-link></button>
        </div>
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

.clubs-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.club-item {
  width: calc(25% - 20px);
  padding: 20px;
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
  transition: transform 0.3s ease;
}

.club-image-details {
  margin-bottom: 10px;
  width: 300px; /* 调整图片的宽度 */
  height: 180px; /* 调整图片的高度 */
  object-fit: cover;
  border-radius: 4px;
}

.club-mes {
  width: 300px;
  height: 30px;
  text-align: left;
  font-size: 18px;
  margin-left: 410px;
  /*background-color: red;*/
}

.club-image.hovered {
  transform: scale(1.1);
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
