<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-30 21:18:36
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-14 21:00:25
 * @FilePath: \vued:\web\project\my-app\src\components\ViewHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="header">
    <div class="l-nav">
      <el-button
        @click="collapseMenu"
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="text">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          class="mycolor"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-nav">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img class="user" src="../assets/user.png" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    collapseMenu() {
      this.$store.commit("collapseChange");
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  mounted() {
    console.log(this.tags, "tags");
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  height: 60px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    color: #fff;
    font-size: 14px;
    padding: 0 10px;
  }
  .l-nav {
    display: flex;
    align-items: center;
    /* 不被选中时的颜色 */
    .el-breadcrumb ::v-deep .el-breadcrumb__inner {
      color: #c9c3bb !important;
      font-weight: 400 !important;
    }
    /* 被选中时的颜色 */
    .el-breadcrumb__item:last-child ::v-deep .el-breadcrumb__inner {
      color: #ffffff !important;
      font-weight: 800 !important;
    }
  }
  .r-nav {
    .user {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
}
</style>