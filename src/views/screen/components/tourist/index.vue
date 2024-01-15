<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>99999</span>人</p>
    </div>

    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>

    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import "echarts-liquidfill";
import * as echarts from "echarts";
import { ref, onMounted } from "vue";

let people = ref("215908人");
let charts = ref();
onMounted(() => {
  let mycharts = echarts.init(charts.value);
  // 指定图表的配置项和数据
  var option = {
    series: [
      {
        type: "liquidFill",
        name: "预约量",
        data: [
          {
            name: "First Data",
            value: 6666,
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 2000,
        animationEasingUpdate: "cubicOut",
        label: {
          formatter: function (param: any) {
            return param.seriesName + "\n" + param.value;
          },
          fontSize: 28,
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 5,
            borderColor: "#156ACF",
            shadowBlur: 20,
            shadowColor: "rgba(255, 0, 0, 1)",
          },
        },
      },
    ],
  };
  mycharts.setOption(option);
});
</script>

<style scoped lang="scss">
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
