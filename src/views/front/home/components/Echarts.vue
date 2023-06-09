<script>
import { onMounted, ref, reactive } from 'vue';
import * as echarts from 'echarts';

export default {
  setup() {
    const chartRef = ref(null);
    const data = reactive({
      pieData: [
        { value: 5, name: '第一季度', percent: '' },
        { value: 3, name: '第二季度', percent: '' },
        { value: 4, name: '第三季度', percent: '' },
        { value: 1, name: '第四季度', percent: '' }
      ]
    });

    onMounted(() => {
      const chartDom = chartRef.value;
      const myChart = echarts.init(chartDom);

      const option = {
        title: {
          text: '季度活动参与量',
          left: 'center',
          textStyle: {
            fontSize: 24 // 调整标题的字体大小
          }
        },
        textStyle: {
          fontSize: 18 // 调整标题的字体大小
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '70%',
            center: ['50%','65%'],
            data: data.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      myChart.setOption(option);

      // 添加鼠标移动事件
      myChart.on('mousemove', params => {
        const { dataIndex, percent } = params;
        const { value } = data.pieData[dataIndex];
        data.pieData[dataIndex].percent = `${percent}%`;
        data.pieData[dataIndex].value = value;
      });
    });

    return {
      chartRef,
      data
    };
  }
};
</script>

<template>
  <div class="e-container">
    <div ref="chartRef" id="chart"></div>
    <ul>
      <li v-for="item in data.pieData" :key="item.name" style="font-size: 18px">
        {{ item.name }}: {{ item.value }} ({{ item.percent }})
      </li>
    </ul>
  </div>
</template>

<style>
.e-container {
  width: 100%;
  height: 100%; /* 调整容器高度以适应屏幕 */
  background-image: url("src/assets/images/beijing.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
}
#chart {
  width: 100%;
  height: 400px;
  padding-top: 10px;
}
</style>
