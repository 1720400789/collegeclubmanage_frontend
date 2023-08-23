<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <a :href="getLinkUrl(item)" target="_blank">
        <img :src="getImageUrl(item)" alt="Carousel Image" />
      </a>
    </el-carousel-item>
  </el-carousel>
  <div class="card-container">
    <el-card class="box-card">
      <div class="text item"><a href="#">震惊长安第一拳</a></div>
      <div class="text item"><a href="#">S18的故事</a></div>
      <div class="text item"><a href="#">狂魔哥被封杀！</a></div>
      <div class="text item"><a href="#">一天几次，原因竟然是！！！</a></div>
      <div class="text item"><a href="#">天才少年一分钟跳绳250个夺冠</a></div>
      <div class="text item"><a href="#">时隔两年半，蛮好飞车突破车神！！！</a></div>
      <div class="text item"><a href="#">社团大会，现场有人想称王？！</a></div>
      <div class="text item"><a href="#">篮球社为热火打call！！！</a></div>
    </el-card>
    <el-card class="box-card">
      <div class="text item"><a href="#">震惊长安第一拳</a></div>
      <div class="text item"><a href="#">S18的故事</a></div>
      <div class="text item"><a href="#">狂魔哥被封杀！</a></div>
      <div class="text item"><a href="#">一天几次，原因竟然是！！！</a></div>
      <div class="text item"><a href="#">天才少年一分钟跳绳250个夺冠</a></div>
      <div class="text item"><a href="#">时隔两年半，蛮好飞车突破车神！！！</a></div>
      <div class="text item"><a href="#">社团大会，现场有人想称王？！</a></div>
      <div class="text item"><a href="#">篮球社为热火打call！！！</a></div>
    </el-card>
    <el-card class="box-card">
      <div class="text item"><a href="#">震惊长安第一拳</a></div>
      <div class="text item"><a href="#">S18的故事</a></div>
      <div class="text item"><a href="#">狂魔哥被封杀！</a></div>
      <div class="text item"><a href="#">一天几次，原因竟然是！！！</a></div>
      <div class="text item"><a href="#">天才少年一分钟跳绳250个夺冠</a></div>
      <div class="text item"><a href="#">时隔两年半，蛮好飞车突破车神！！！</a></div>
      <div class="text item"><a href="#">社团大会，现场有人想称王？！</a></div>
      <div class="text item"><a href="#">篮球社为热火打call！！！</a></div>
    </el-card>
  </div>
</template>

<script>
import { reactive } from 'vue'
import images01 from '@/assets/images/p1.png'
import images02 from '@/assets/images/p2.png'
import images03 from '@/assets/images/p3.png'
import images04 from '@/assets/images/p4.png'
import images05 from '@/assets/images/p5.png'
import images06 from '@/assets/images/p6.png'
export default {
  setup() {
    // 图片的URL数组
    const imageUrls = reactive([
      images01,
      images02,
      images03,
      images04,
      images05,
      images06,
    ]);

    // 获取对应图片的URL
    const getImageUrl = (item) => {
      return imageUrls[item - 1];
    };
    return {
      getImageUrl,
    };
  },
  methods: {
    getLinkUrl(item) {
      // 返回对应图片点击后要跳转的链接地址
      switch (item) {
        case 1:
          return 'https://www.msn.cn/zh-cn/news/other/%E8%80%83%E7%94%9F%E4%BA%BA%E6%95%B0%E5%86%8D%E5%88%9B%E5%8E%86%E5%8F%B2%E6%96%B0%E9%AB%98-%E7%9B%B4%E5%87%BB2023%E9%AB%98%E8%80%83%E7%8E%B0%E5%9C%BA-%E5%8D%97%E4%BA%AC%E5%A4%AB%E5%AD%90%E5%BA%99%E6%8C%A4%E6%BB%A1%E4%B8%BA%E9%AB%98%E8%80%83%E7%A5%88%E7%A6%8F%E7%9A%84%E4%BA%BA/ar-AA1cdpUj?ocid=msedgntp&cvid=4f8a5c8fc07e4ba19d85544519118702&ei=9';
        case 2:
          return 'https://pc.yiyouliao.com/microsoft/article/rivers/newsfeed/1531576099383816194/ID00IWGM5OOSWXT.html?channel=12d892470c3c45cc885dc575e92f1ed0';
        case 3:
          return 'https://www.msn.cn/zh-cn/news/other/%E5%B7%9D%E8%97%8F%E7%BA%BF%E4%B8%80suv%E9%80%86%E8%A1%8C%E6%8C%A1%E6%95%91%E6%8A%A4%E8%BD%A6%E7%94%9F%E5%91%BD%E9%80%9A%E9%81%93-%E7%BD%91%E5%8F%8B-%E8%87%AA%E7%A7%81%E8%87%AA%E5%88%A9%E7%9A%84%E5%85%B8%E8%8C%83/ar-AA1cb06b?ocid=msedgntp&cvid=4f8a5c8fc07e4ba19d85544519118702&ei=29';
        case 4:
          return 'https://www.msn.cn/zh-cn/news/other/%E5%A5%87%E7%91%9Eicar-03%E9%A6%96%E5%8F%B0%E6%95%B4%E8%BD%A6%E4%B8%8B%E7%BA%BF-%E5%B0%86%E4%BA%8E10%E6%9C%88%E9%87%8F%E4%BA%A7/ar-AA1cbvJc?ocid=msedgntp&cvid=4f8a5c8fc07e4ba19d85544519118702&ei=32';
        case 5:
          return 'https://www.msn.cn/zh-cn/news/national/%E9%87%8E%E7%81%AB%E9%9A%BE%E6%8E%A7-%E5%8A%A0%E6%8B%BF%E5%A4%A7%E9%AD%81%E5%8C%97%E5%85%8B%E7%9C%81%E8%AF%B7%E6%B1%82%E5%9B%BD%E9%99%85%E6%8F%B4%E5%8A%A9/ar-AA1cbtJM?ocid=msedgntp&cvid=4f8a5c8fc07e4ba19d85544519118702&ei=36';
        case 6:
          return 'https://www.msn.cn/zh-cn/news/other/%E4%BB%8A%E6%97%A5%E9%AB%98%E8%80%83-%E5%AE%B6%E9%95%BF%E7%A9%BF-%E7%BA%A2%E6%97%97%E8%A2%8D-%E5%9B%BE%E5%A5%BD%E5%85%86%E5%A4%B4-%E4%B8%BA%E8%80%83%E7%94%9F%E5%8A%A0%E6%B2%B9-%E5%90%91%E6%9C%AA%E6%9D%A5%E5%86%B2%E5%88%BA/ar-AA1cdzOp?ocid=msedgntp&cvid=4f8a5c8fc07e4ba19d85544519118702&ei=45';
          // 继续添加其他项目的链接地址
        // default:
        //   return '#'; // 默认情况下返回一个空链接
      }
    },
  },
};
</script>

<style scoped>
.el-carousel__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 15px;
}

.item {
  padding: 18px 0;
}

.card-container a {
  color: #222;
}
.card-container a:hover {
  text-decoration: underline;
  color: #cc0000;
  /*font-weight: bold;*/
}
.box-card {
  width: 450px;
  background-color: #c7cee6;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 将容器分为三列，每列宽度相等 */
  grid-gap: 10px; /* 可根据需要调整卡片之间的间距 */
}
</style>
