<!--<template>-->
<!--  <div class="act-container">-->
<!--    <div class="announcement-center">-->
<!--      <div v-if="!selectedAnnoun">-->
<!--        <div class="search-announ">-->
<!--          <input type="text" v-model="searchAnnoun" placeholder="搜索公告名称">-->
<!--        </div>-->
<!--        <div class="my-activity">-->
<!--          <router-link to="/myannou" class="my-activity-link">我参加的活动>></router-link>-->
<!--        </div>-->
<!--        <div-->
<!--            v-for="announcement in filteredAnnouncements"-->
<!--            :key="announcement.id"-->
<!--            class="announcement-item"-->
<!--            @mouseenter="setHoveredAnnouncement(announcement)"-->
<!--            @mouseleave="clearHoveredAnnouncement"-->
<!--        >-->
<!--          <h3 class="announcement-title">{{ announcement.title }}-->
<!--            <span-->
<!--                v-if="hoveredAnnouncement === announcement"-->
<!--                class="joinAnnoun"-->
<!--                @click="selectAnnoun(announcement)"-->
<!--            >-->
<!--          申请加入-->
<!--        </span></h3>-->
<!--          <p class="announcement-name">公告名称：{{announcement.name}}</p>-->
<!--          <p class="announcement-date">{{ formatDateTime(announcement.date) }}</p>-->
<!--          <p class="announcement-content">{{ announcement.content }}</p>-->
<!--          <div class="announcement-footer">-->
<!--            <span class="announcement-author">发布人：{{ announcement.author }}</span>-->
<!--            <span class="announcement-contact">联系方式：{{ announcement.contact }}</span>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="backtop-button" v-show="showBackToTop" @click="scrollToTop">-->
<!--          UP-->
<!--        </div>-->
<!--      </div>-->

<!--      <div v-else>-->
<!--        <div class="announcement-form">-->
<!--          <button class="return-announ" @click="returnToAnnousPage">返回公告中心</button>-->
<!--          <div class="applyannoun">-->
<!--            <h1>申请加入活动</h1>-->
<!--            <h2>社团名称：{{ selectedAnnoun.name }}</h2>-->
<!--            <div class="announ-mes">-->
<!--              <label for="apply-name">申请人姓名</label>-->
<!--              <input type="text" id="apply-name" v-model="applyName" required>-->
<!--            </div>-->

<!--            <div class="announ-mes">-->
<!--              <label for="apply-tel">联系方式</label>-->
<!--              <input type="tel" id="apply-tel" v-model="applyTel" required>-->
<!--            </div>-->

<!--            <div class="announ-mes">-->
<!--              <label>申请理由</label>-->
<!--              <textarea v-model="applyReason"></textarea>-->
<!--            </div>-->

<!--            &lt;!&ndash; 在此处显示其他社团详细信息 &ndash;&gt;-->
<!--            <button class="btn-announ" @click="applyForm">申请</button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      announcements: [-->
<!--        {-->
<!--          id: 1,-->
<!--          title: '重要通知',-->
<!--          name: '篮球比赛',-->
<!--          date: '2023-06-01 10:00',-->
<!--          content: '这是一条重要通知的内容。',-->
<!--          author: '社团管理员',-->
<!--          contact: '18868887268'-->
<!--        },-->
<!--        {-->
<!--          id: 2,-->
<!--          title: '活动公告',-->
<!--          name: '十周年庆',-->
<!--          date: '2023-06-02 14:30',-->
<!--          content: '社团将举办一场精彩的活动，请大家准时参加。',-->
<!--          author: '活动组织者',-->
<!--          contact: '15327551088'-->
<!--        },-->
<!--        {-->
<!--          id: 3,-->
<!--          title: '重要通知',-->
<!--          name: '敬老院',-->
<!--          date: '2023-06-01 10:00',-->
<!--          content: '这是一条重要通知的内容。',-->
<!--          author: '社团管理员',-->
<!--          contact: '18868887268'-->
<!--        },-->
<!--        {-->
<!--          id: 4,-->
<!--          title: '活动公告',-->
<!--          name: '排球比赛',-->
<!--          date: '2023-06-02 14:30',-->
<!--          content: '社团将举办一场精彩的活动，请大家准时参加。',-->
<!--          author: '活动组织者',-->
<!--          contact: '15327551088'-->
<!--        },-->
<!--        {-->
<!--          id: 5,-->
<!--          title: '重要通知',-->
<!--          name: '登山活动',-->
<!--          date: '2023-06-01 10:00',-->
<!--          content: '这是一条重要通知的内容。',-->
<!--          author: '社团管理员',-->
<!--          contact: '18868887268'-->
<!--        },-->
<!--        // 其他公告对象...-->
<!--      ],-->
<!--      hoveredAnnouncement: null,-->
<!--      showBackToTop: false,-->
<!--      searchAnnoun: '',-->
<!--      selectedAnnoun: null,-->
<!--      applyName: '',-->
<!--      applyTel: '',-->
<!--      applyReason: ''-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    filteredAnnouncements() {-->
<!--      if (this.searchAnnoun === '') {-->
<!--        return this.announcements;-->
<!--      } else {-->
<!--        return this.announcements.filter(announcement =>-->
<!--            announcement.name.toLowerCase().includes(this.searchAnnoun.toLowerCase())-->
<!--        );-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    selectAnnoun(announcement) {-->
<!--      this.selectedAnnoun = announcement;-->
<!--    },-->
<!--    applyForm() {-->
<!--      // 在此处执行表单提交逻辑-->
<!--      // 您可以使用this.clubName，this.applicantId等访问表单字段的值-->
<!--    },-->
<!--    returnToAnnousPage() {-->
<!--      this.selectedAnnoun = null;-->
<!--    },-->
<!--    formatDateTime(dateTime) {-->
<!--      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };-->
<!--      return new Date(dateTime).toLocaleString('en-US', options);-->
<!--    },-->
<!--    setHoveredAnnouncement(announcement) {-->
<!--      this.hoveredAnnouncement = announcement;-->
<!--    },-->
<!--    clearHoveredAnnouncement() {-->
<!--      this.hoveredAnnouncement = null;-->
<!--    },-->
<!--    scrollToTop() {-->
<!--      window.scrollTo({-->
<!--        top: 0,-->
<!--        behavior: 'smooth'-->
<!--      });-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    window.addEventListener('scroll', () => {-->
<!--      this.showBackToTop = window.pageYOffset > 100;-->
<!--    });-->
<!--  },-->
<!--  beforeUnmount() {-->
<!--    window.removeEventListener('scroll', () => {-->
<!--      this.showBackToTop = window.pageYOffset > 100;-->
<!--    });-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.act-container {-->
<!--  width: 100%;-->
<!--  height: 100vh;-->
<!--  background-image: url("src/assets/images/act.jfif");-->
<!--  background-repeat: no-repeat;-->
<!--  background-size: 100% auto;-->
<!--}-->
<!--.announcement-center {-->
<!--  max-width: 800px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--}-->

<!--.search-announ {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.my-activity {-->
<!--  position: absolute;-->
<!--  top: 100px;-->
<!--  right: 90px;-->
<!--}-->

<!--.return-announ {-->
<!--  position: absolute;-->
<!--  top: 100px;-->
<!--  left: 100px;-->
<!--  margin-bottom: 20px;-->
<!--  border: none;-->
<!--  background-color: #616dff;-->
<!--  color: #fff;-->
<!--  padding: 10px 20px;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.my-activity-link {-->
<!--  font-size: 16px;-->
<!--  color: #222222;-->
<!--  text-decoration: none;-->
<!--  transition: color 0.3s;-->
<!--}-->

<!--.my-activity-link:hover {-->
<!--  color: #1989fa;-->
<!--}-->

<!--.backtop-button {-->
<!--  position: fixed;-->
<!--  bottom: 20px;-->
<!--  right: 20px;-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  background-color: var(&#45;&#45;el-bg-color-overlay);-->
<!--  box-shadow: var(&#45;&#45;el-box-shadow-lighter);-->
<!--  text-align: center;-->
<!--  line-height: 40px;-->
<!--  color: #1989fa;-->
<!--  cursor: pointer;-->
<!--  opacity: 0;-->
<!--  transition: opacity 0.3s;-->
<!--}-->

<!--.backtop-button:hover {-->
<!--  opacity: 1;-->
<!--}-->

<!--.announcement-item {-->
<!--  margin-bottom: 20px;-->
<!--  border: 1px solid #ccc;-->
<!--  padding: 20px;-->
<!--  border-radius: 4px;-->
<!--  background-color: #f7f7f7;-->
<!--}-->

<!--.announcement-title {-->
<!--  font-size: 20px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.announcement-name {-->
<!--  font-size: 16px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.announcement-date {-->
<!--  font-size: 14px;-->
<!--  color: #888;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.announcement-content {-->
<!--  font-size: 16px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.announcement-footer {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.announcement-author,-->
<!--.announcement-contact {-->
<!--  font-size: 14px;-->
<!--  color: #888;-->
<!--}-->

<!--.joinAnnoun {-->
<!--  font-size: 16px;-->
<!--  color: #1989fa;-->
<!--  text-decoration: none;-->
<!--  transition: color 0.3s;-->
<!--  margin-left: 550px;-->
<!--}-->

<!--.joinAnnoun:hover {-->
<!--  color: #005aa0;-->
<!--}-->

<!--label {-->
<!--  display: block;-->
<!--  font-weight: bold;-->
<!--}-->

<!--input[type="text"],-->
<!--input[type="tel"],-->
<!--textarea {-->
<!--  width: 100%;-->
<!--  padding: 10px;-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.announ-mes {-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.btn-announ {-->
<!--  margin-top: 30px;-->
<!--  margin-left: 340px;-->
<!--  background-color: #007bff;-->
<!--  color: #fff;-->
<!--  border: none;-->
<!--  padding: 10px 20px;-->
<!--  font-size: 16px;-->
<!--  border-radius: 4px;-->
<!--  cursor: pointer;-->
<!--}-->
<!--</style>-->
