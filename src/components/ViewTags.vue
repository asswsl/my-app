<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-14 21:19:35
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 15:33:56
 * @FilePath: \vued:\web\project\my-app\src\components\ViewTags.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="item.path"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      :closable="item.name != 'home'"
      @click="changeTag(item)"
      @close="closeTag(item, index)"
      class="tag"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ViewTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
  methods: {
    // 点击tag跳转路由
    changeTag(item) {
      console.log(item, "changeTag.item");
      this.$router.push(item.path);
      // this.$router.push({ name: item.name });
    },
    // 点击tag删除
    closeTag(item, index) {
      this.$store.commit("closeTag", item);
         const len = this.tags.length;
      // 实现删除后跳转逻辑
      // 如果删除标签非当前页面，仅删除标签
      if (item.name != this.$route.name) {
        return;
      } else if (index == len) {
        // index==len 最后一个页面为当前显示页面 删除后跳转为当前页面前一个页面
        this.$router.push(this.tags[index-1].path);
      } else {
        // 当前页面位于中间，删除后向后一个页面跳转
        this.$router.push(this.tags[index].path);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tags {
  padding: 20px;
  .tag{
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>