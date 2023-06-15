<!--
 * @Author: asswsl 107310268+asswsl@users.noreply.github.com
 * @Date: 2023-06-13 15:28:10
 * @LastEditors: asswsl 107310268+asswsl@users.noreply.github.com
 * @LastEditTime: 2023-06-15 15:41:46
 * @FilePath: \my-app\src\views\User.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <!-- dialog弹窗 -->
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="handclose">
            <!-- form表单配置 -->
            <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select placeholder="请选择性别" v-model="form.sex">
                        <!-- 给选项不同的value值来进行区分不同的选项 -->
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <!-- value-format 定义日期输出格式  -->
                    <el-date-picker placeholder="请选择日期" v-model="form.birth" value-format="yyyy-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click='submit'>确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <!-- 在@click中调用方法，如果方法名不加括号，仅会在点击时调用方法，如果加上括号，则会立即调用一次，在点击时再次调用 -->
            <el-button type="primary" @click="handleAdd">+新增</el-button>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="sex" label="性别">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>
<script>
import { getUser, addUser, editUser, delUser } from '../api'
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
                name: [{ required: true, message: '请输入姓名' }],
                age: [{ required: true, message: '请输入年龄' }],
                sex: [{ required: true, message: '请选择性别' }],
                birth: [{ required: true, message: '请输入出生日期' }],
                addr: [{ required: true, message: '请输入地址' }]
            },
            // 用户列表数据
            tableData: [],
            // 区分新增用户 0 与更新用户 1 的状态
            modalType: 0
        };
    },
    methods: {
        // 提交用户表单
        submit() {
            // validate 对表单进行校验，参数为回调函数，在校验结束后被调用，传入两个参数，是否校验成功和未通过校验的字段
            // 若不传回回调函数，返回一个promise   Function(callback: Function(boolean, object))
            this.$refs.form.validate((valid) => {
                console.log(valid);//校验成功 true 失败 false
                if (valid) {
                    // 当校验成功，才可以继续对表单进行操作
                    if (this.modalType == 0) {
                        // 新增用户
                        addUser(this.form).then(() => {
                            this.getList()
                        })
                    } else {
                        // 更新用户
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    console.log(this.form, 'form');
                    // 校验成功后关闭弹窗,同时清空表单内数据
                    // resetFields 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
                    this.$refs.form.resetFields()
                    this.dialogVisible = false
                } else {
                    // 
                }
            })
        },
        // 弹窗关闭触发handclose
        handclose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false
        },
        handleAdd() {
            this.dialogVisible = true
            this.modalType = 0
        },
        cancel() {
            this.handclose()
        },
        handleEdit(row) {
            this.dialogVisible = true
            this.modalType = 1
            // 对当前行数据进行深拷贝，创建一个副本以便于进行数据修改 否则会报错
            this.form = JSON.parse(JSON.stringify(row))
        },
        getList() {
            getUser().then(({ data }) => {
                this.tableData = data.list
            })
        },
        handleDelete(row) {
            this.$confirm('此操作将删除改用户信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({id:row.id}).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getList()
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    mounted() {
        this.getList()
    }
};
</script>