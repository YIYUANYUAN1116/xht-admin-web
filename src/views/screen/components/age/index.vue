<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="" />
    </div>
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
//引入echarts
import * as echarts from "echarts";

let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);

  let option = {
    tooltip: {
      trigger: "item",
      showDelay: 20,
    },
    legend: {
      top: "30",
      right: "30",
      orient: "vertical",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    series: [
      {
        name: "年龄分布",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,

          borderWidth: 2,
        },
        label: {
          show: true,
          position: "inside",
          formatter: `{d}%`,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 580, name: "10岁以下" },
          { value: 735, name: "10-18岁" },
          { value: 1048, name: "18-30岁" },
          { value: 484, name: "30-60岁" },
          { value: 300, name: "60岁以上" },
        ],
      },
    ],
  };

  mycharts.setOption(option);
});
</script>

<style scoped lang="scss">
.box2 {
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;

  .title {
    margin-left: 20px;

    p {
      color: white;
      font-size: 20px;
    }
  }

  .charts {
    height: 260px;
  }
}
</style>
