<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-28 22:41:17
 * @LastEditors: asswsl 107310268+asswsl@users.noreply.github.com
 * @LastEditTime: 2023-06-12 17:48:56
 * @FilePath: \vued:\web\project\my-app\src\views\User.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- 添加用户信息 -->
  <div>
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handClose"
    >
      <!-- 用户信息编辑· -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            v-model="form.birth"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          plain
          @click="
            cancel();
            handClose();
          "
          >取 消</el-button
        >
        <el-button
          plain
          type="primary"
          @click="
            dialogVisible = false;
            success();
            submit();
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <div class="menage">
      <el-button
        type="primary"
        @click="
          dialogVisible = true;
          modalType = 0;
        "
        >+ 新增</el-button
      >
    </div>
    <!-- 用户信息 -->
    <el-table :data="TableData" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="sexLabel" label="性别"> </el-table-column>
      <el-table-column prop="birth" label="出生日期"> </el-table-column>
      <el-table-column prop="addr" label="地址"> </el-table-column>
      <el-table-column prop="addr" label="地址">
        <template slot-scope="scope">
          <el-button
            @click="
              eidt(scope.row);
              modalType = 1;
            "
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getUser, addUser, eidtUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      TableData: [],
      modalType: 0, // 0表示新增状态 1表示编辑状态
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        // console.log(valid, "valid"); //valid 判断数据是否提交成功 true false
        if (valid) {
          // 首先写入数据，而后重新获取列表数据
          if (this.modalType == 0) {
            addUser(this.form).then(() => {});
            // 重新获取列表数据
            this.getList();
          } else {
            eidtUser(this.form).then(() => {
              this.getList();
            });
          }
          this.form.birth = this.UserData.push(this.form);
          // 数据提交成功，数据传入后台
          console.log(this.form, "form");
          console.log(this.UserData, "userData");
        }
        this.$refs.form.resetFields();
        this.dialogVisible = false;
      });
    },
    handClose() {
      // 弹窗关闭后初始化表单内容 并关闭表单
      // console.log(this.$refs.form, "form");
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    success() {
      this.$notify({
        title: "成功",
        message: "成功添加用户信息",
        type: "success",
      });
    },
    cancel() {
      this.$notify({
        title: "取消",
        message: "已取消添加用户信息",
        type: "warning",
      });
    },

    getList() {
      getUser().then(({ data }) => {
        console.log(data);
        this.TableData = data.list;
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>