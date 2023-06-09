<script setup>
import {computed, onBeforeMount, onMounted, ref} from "vue";
import { getOtherEvent, getAllAnnoun, subApplyFormAPI } from "@/apis/events";
import {ElMessage} from "element-plus";

const announcements = ref([
  // {
  //   id: 1,
  //   title: '重要通知',
  //   name: '篮球比赛',
  //   date: '2023-06-01 10:00',
  //   content: '这是一条重要通知的内容。',
  //   author: '社团管理员',
  //   contact: '18868887268'
  // },
  // {
  //   id: 2,
  //   title: '活动公告',
  //   name: '十周年庆',
  //   date: '2023-06-02 14:30',
  //   content: '社团将举办一场精彩的活动，请大家准时参加。',
  //   author: '活动组织者',
  //   contact: '15327551088'
  // },
  // {
  //   id: 3,
  //   title: '重要通知',
  //   name: '敬老院',
  //   date: '2023-06-01 10:00',
  //   content: '这是一条重要通知的内容。',
  //   author: '社团管理员',
  //   contact: '18868887268'
  // },
  // {
  //   id: 4,
  //   title: '活动公告',
  //   name: '排球比赛',
  //   date: '2023-06-02 14:30',
  //   content: '社团将举办一场精彩的活动，请大家准时参加。',
  //   author: '活动组织者',
  //   contact: '15327551088'
  // },
  // {
  //   id: 5,
  //   title: '重要通知',
  //   name: '登山活动',
  //   date: '2023-06-01 10:00',
  //   content: '这是一条重要通知的内容。',
  //   author: '社团管理员',
  //   contact: '18868887268'
  // },
  // 其他公告对象...
])

const getEvent = async () => {
  const params = {id: localStorage.getItem("u_Id")}
  await getOtherEvent(params).then(res => {
    if(String(res.code === '1')){
      const ans = ref([])
      ans.value = res.data
      ans.value.forEach(obj => obj.status = '1')
      ans.value.forEach(obj => announcements.value.push(obj))
      // announcements.value.push(ans.value)
      console.log(announcements.value)
    }else {
      ElMessage.warning("没有数据")
    }
  }).catch(err => {
    console.log(err)
  })
}

const getAnnoun = async () => {
  await getAllAnnoun().then(res => {
    if(String(res.code === '1')){
      const ans = ref([])
      ans.value = res.data
      ans.value.forEach(obj => obj.status = '2')
      ans.value.forEach(obj => announcements.value.push(obj))
      // announcements.value.push(ans.value)
      console.log(announcements.value)
    }else {
      ElMessage.warning("没有数据")
    }
  }).catch(err => {
    console.log(err)
  })
}

const hoveredAnnouncement = ref()
const showBackToTop = ref(false)
const searchAnnoun = ref('')
const selectedAnnoun = ref()
const selfDescription = ref('')
const selfStrength = ref('')
const selfReason = ref('')

const filteredAnnouncements = computed(() => {
  if(searchAnnoun.value === ''){
    return announcements.value
  } else {
    return announcements.value.filter(announcements =>
      announcements.name.toLowerCase().includes(searchAnnoun.value.toLowerCase())
    )
  }
})

const selectAnnoun = (announcement) => {
  selectedAnnoun.value = announcement
}

const applyForm = async () => {
  //执行表单逻辑
  console.log(selectedAnnoun.value.id)
  await subApplyFormAPI(localStorage.getItem("u_Id"), selectedAnnoun.value.id, selfDescription.value, selfStrength.value, selfReason.value).then(res => {
    if(String(res.code === '1')){
      ElMessage.success(res.msg || '操作成功')
      selfDescription.value = null
      selfStrength.value = null
      selfReason.value = null
      selectedAnnoun.value = null
    } else {
      ElMessage.success(res.msg || '服务繁忙，请稍后尝试')
    }
  }).catch(err => {
    console.log(err)
  })
}

const returnToAnnousPage = () => {
  selectedAnnoun.value = null
}

const formatDateTime = (dateTime) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  return new Date(dateTime).toLocaleString('en-US', options)
}

const setHoveredAnnouncement = (announcement) => {
  hoveredAnnouncement.value = announcement
}

const clearHoveredAnnouncement = () => {
  hoveredAnnouncement.value = null
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  getEvent()
  getAnnoun()
  window.addEventListener('scroll', () => {
    showBackToTop.value = window.pageYOffset > 100
  })
})

onBeforeMount(() => {
  window.removeEventListener('scroll', () => {
    showBackToTop.value = window.pageYOffset > 100
  })
})

</script>

<template>
  <div class="act-container">
    <div class="announcement-center">
      <div v-if="!selectedAnnoun">
      <div class="search-announ">
        <input type="text" v-model="searchAnnoun" placeholder="搜索公告名称">
      </div>
      <div class="my-activity">
        <router-link to="/myannou" class="my-activity-link">我参加的活动>></router-link>
      </div>
      <div
          v-for="announcement in filteredAnnouncements"
          :key="announcement.id"
          class="announcement-item"
          @mouseenter="setHoveredAnnouncement(announcement)"
          @mouseleave="clearHoveredAnnouncement"
      >
        <div v-if="announcement.status === '1'">
          <h3 class="announcement-title">活动公告
            <span
                v-if="hoveredAnnouncement === announcement"
                class="joinAnnoun"
                @click="selectAnnoun(announcement)"
            >
          申请加入
          </span>
          </h3>
          <p class="announcement-name">活动名称：{{announcement.eventname}}</p>
          <p class="announcement-date">起止时间：{{ formatDateTime(announcement.startTime) }}~{{ formatDateTime(announcement.endTime) }}</p>
          <p class="announcement-content">{{ announcement.eventDescription }}</p>
          <div class="announcement-footer">
            <span class="announcement-author">发布人：{{ announcement.admName }}</span>
            <span class="announcement-author">主办社团：{{ announcement.clubName }}</span>
            <span class="announcement-contact">联系方式：{{ announcement.admPhone }}</span>
          </div>
        </div>
        <div v-else>
          <h3 class="announcement-title">通知公告</h3>
          <p class="announcement-name">公告名称：{{announcement.title}}</p>
          <p class="announcement-date">{{ formatDateTime(announcement.startTime) }}</p>
          <p class="announcement-content">{{ announcement.content }}</p>
          <div class="announcement-footer">
            <span class="announcement-author">发布人：{{ announcement.admName }}</span>
            <span class="announcement-contact">联系方式：{{ announcement.admPhone }}</span>
          </div>
        </div>
      </div>
      <div class="backtop-button" v-show="showBackToTop" @click="scrollToTop">
        UP
      </div>
    </div>

      <div v-else>
        <div class="announcement-form">
          <button class="return-announ" @click="returnToAnnousPage">返回公告中心</button>
          <div class="applyannoun">
            <h1>申请加入活动：{{ selectedAnnoun.eventname }}</h1>
            <h2>主办社团：{{ selectedAnnoun.clubName }}</h2>
            <div class="announ-mes">
              <label for="apply-name">个人简介</label>
              <input type="text" id="apply-name" v-model="selfDescription" required>
            </div>
            <div class="announ-mes">
              <label for="apply-tel">个人爱好及特长</label>
              <input type="tel" id="apply-tel" v-model="selfStrength" required>
            </div>

            <div class="announ-mes">
              <label>申请理由</label>
              <textarea v-model="selfReason"></textarea>
            </div>

            <!-- 在此处显示其他社团详细信息 -->
            <button class="btn-announ" @click="applyForm">申请</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.act-container {
  width: 100%;
  height: 100vh;
  background-image: url("src/assets/images/act.jfif");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
.announcement-center {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.search-announ {
  margin-bottom: 20px;
}

.my-activity {
  position: absolute;
  top: 100px;
  right: 90px;
}

.return-announ {
  position: absolute;
  top: 100px;
  left: 100px;
  margin-bottom: 20px;
  border: none;
  background-color: #616dff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.my-activity-link {
  font-size: 16px;
  color: #222222;
  text-decoration: none;
  transition: color 0.3s;
}

.my-activity-link:hover {
  color: #1989fa;
}

.backtop-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  line-height: 40px;
  color: #1989fa;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.backtop-button:hover {
  opacity: 1;
}

.announcement-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  background-color: #f7f7f7;
}

.announcement-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.announcement-name {
  font-size: 16px;
  margin-bottom: 10px;
}

.announcement-date {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.announcement-content {
  font-size: 16px;
  margin-bottom: 10px;
}

.announcement-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-author,
.announcement-contact {
  font-size: 14px;
  color: #888;
}

.joinAnnoun {
  font-size: 16px;
  color: #1989fa;
  text-decoration: none;
  transition: color 0.3s;
  margin-left: 550px;
}

.joinAnnoun:hover {
  color: #005aa0;
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

.announ-mes {
  margin-top: 20px;
}

.btn-announ {
  margin-top: 30px;
  margin-left: 340px;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
