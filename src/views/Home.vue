<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-28 22:40:25
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-14 21:06:56
 * @FilePath: \vued:\web\project\my-app\src\views\myHome.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row>
    <el-col :span="7" style="padding-right: 10px">
      <el-card class="box-card" shadow="hover">
        <div class="user" slot="header">
          <img src="../assets/user.png" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="log-info">
          <p class="log-time">上次登录时间：<span>2023-4-1</span></p>
          <p class="log-place">上次登录地点：<span>广西</span></p>
        </div>
      </el-card>
      <el-card
        class="box-card"
        shadow="hover"
        :style="{ width: '100%', height: '450px' }"
      >
        <div>
          <el-table :data="tableData">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :prop="key"
              :label="val"
              :key="key"
            />
          </el-table>
        </div>
      </el-card>
    </el-col>
    <el-col :span="17" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          shadow="hover"
          :body-style="{ display: 'flex' }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="detail-value">￥{{ item.value }}</p>
            <p class="detail-name">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px" shadow="hover">
        <!-- 折线图 -->
        <div ref="line" style="height: 280px; width: 100%"></div>
      </el-card>
      <div class="graph">
        <el-card shadow="hover" style="height: 240px">
          <!-- 柱状图 -->
          <div ref="bar" style="height: 240px; width: 100%"></div>
        </el-card>
        <el-card shadow="hover" style="height: 240px">
          <!-- 饼图 -->
          <div ref="pie" style="height: 200px; width: 100%"></div>
        </el-card>
      </div>
    </el-col>
     <el-backtop target=".page-component__scroll .el-scrollbar__wrap">》</el-backtop>
  </el-row>
</template>
<script>
import { getData } from "../api";
import * as echarts from "echarts";
export default {
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "日销",
        monthBuy: "月销",
        totalBuy: "总销",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;
      // 解构赋值，获得orderData，userData，videoData数值
      const { orderData, userData, videoData } = data.data;
      // 对orderData进行数据处理，获取xAxis
      const linexAxis = Object.keys(orderData.data[0]);
      const line = echarts.init(this.$refs.line);

      // 折线图数据处理
      var lineOption = {};
      lineOption.xAxis = {
        data: linexAxis,
      };
      lineOption.legend = {
        data: linexAxis,
      };
      lineOption.yAxis = {};
      lineOption.series = [];
      linexAxis.forEach((key) => {
        lineOption.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      line.setOption(lineOption);

      // 柱状图数据处理
      const bar = echarts.init(this.$refs.bar);
      var barOption = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [
          {
            name: "新增用户",
            type: "bar",
            data: userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: userData.map((item) => item.active),
          },
        ],
      };
      bar.setOption(barOption);

      // 饼状图数据处理
      const pie = echarts.init(this.$refs.pie);
      var pieOption = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            type: "pie",
            data: videoData,
            // name:''
          },
        ],
      };
      pie.setOption(pieOption);
      // 使用监听页面的resize()监听浏览器大小改变事件，而后调用echartsInstance.resize同步改变图标大小
      window.addEventListener("resize", function () {
        line.resize();
        bar.resize();
        pie.resize();
      });
    });
  },
};
</script>
<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
  // 隐藏滚动条
  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }

}
.user {
  display: inline-flex;
  align-items: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .user-info {
    margin-left: 40px;
    .name {
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 32px;
    }
    .access {
      color: #9999;
    }
  }
}
.log-info {
  color: #9999;
  .log-time {
    margin-bottom: 10px;
  }
  span {
    margin-left: 10px;
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 50px;
    height: 50px;
    font-size: 25px;
    line-height: 50px;
    text-align: center;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 30px;
    .detail-name {
      color: #9999;
      font-size: 14px;
    }
    .detail-value {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 10px;
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .el-card {
    width: 48%;
  }
}
</style>