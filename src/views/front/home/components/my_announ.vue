<script setup>
import {onMounted, ref} from "vue";
import {getMyEvent} from "@/apis/events";
import {ElMessage} from "element-plus";

const announcements = ref([
  {
    id: 1,
    title: '重要通知',
    name: '篮球比赛',
    date: '2023-06-01 10:00',
    content: '这是一条重要通知的内容。',
    author: '社团管理员',
    contact: '18868887268'
  },
  {
    id: 2,
    title: '活动公告',
    name: '十周年庆',
    date: '2023-06-02 14:30',
    content: '社团将举办一场精彩的活动，请大家准时参加。',
    author: '活动组织者',
    contact: '15327551088'
  },
  // 其他公告对象...
])

const formatDateTime = (dateTime) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
  return new Date(dateTime).toLocaleString('en-US', options)
}

const getEvent = async () => {
  const params = {id: localStorage.getItem("u_Id")}
  await getMyEvent(params).then(res => {
    if(String(res.code === '1')){
      announcements.value = res.data || []
      console.log(announcements.value)
    }else {
      ElMessage.warning(res.msg || "没有数据")
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => getEvent())
</script>

<template>
  <div class="myannouncement-center">
    <div v-for="announcement in announcements" :key="announcement.id" class="myannouncement-item">
<!--      <h3 class="myannouncement-title">{{ announcement.title }}</h3>-->
<!--      <p class="myannouncement-name">公告名称：{{announcement.name}}</p>-->
<!--      <p class="myannouncement-date">{{ formatDateTime(announcement.date) }}</p>-->
<!--      <p class="myannouncement-content">{{ announcement.content }}</p>-->
<!--      <div class="myannouncement-footer">-->
<!--        <span class="myannouncement-author">发布人：{{ announcement.author }}</span>-->
<!--        <span class="myannouncement-contact">联系方式：{{ announcement.contact }}</span>-->
<!--      </div>-->
      <p class="announcement-name">活动名称：{{announcement.eventname}}</p>
      <p class="announcement-date">起止时间：{{ formatDateTime(announcement.startTime) }}~{{ formatDateTime(announcement.endTime) }}</p>
      <p class="announcement-content">{{ announcement.eventDescription }}</p>
      <div class="announcement-footer">
        <span class="announcement-author">发布人：{{ announcement.admName }}</span>
        <span class="announcement-author">主办社团：{{ announcement.clubName }}</span>
        <span class="announcement-contact">联系方式：{{ announcement.admPhone }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.myannouncement-center {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.myannouncement-item {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  background-color: #f7f7f7;
}

.myannouncement-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.myannouncement-name {
  font-size: 16px;
  margin-bottom: 10px;
}

.myannouncement-date {
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
}

.myannouncement-content {
  font-size: 16px;
  margin-bottom: 10px;
}

.myannouncement-footer {
  display: flex;
  justify-content: space-between;
}

.myannouncement-author,
.myannouncement-contact {
  font-size: 14px;
  color: #888;
}

</style>
