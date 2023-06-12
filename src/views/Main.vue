<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-28 23:10:37
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-14 21:36:47
 * @FilePath: \vued:\web\project\my-app\src\views\Main.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <view-aside />
      </el-aside>
      <el-container>
        <el-header>
          <view-header />
        </el-header>
        <view-tags />
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ViewAside from "../components/ViewAside.vue";
import ViewHeader from "../components/ViewHeader.vue";
import ViewTags from "../components/ViewTags.vue";
export default {
  components: { ViewAside, ViewHeader, ViewTags },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>
