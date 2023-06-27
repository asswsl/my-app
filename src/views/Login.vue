<template>
    <el-card shadow="hover" class="login-container" :body-style="{ padding: '20px' }">
        <el-form :model="LoginForm" :rules="rules" inline="true" label-width="80px">
            <h2 class="login-title">系统登陆</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="LoginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <!-- type=password 隐藏密码，使输入密码显示为点 -->
                <el-input v-model="LoginForm.password" placeholder="请输入密码" type="password"></el-input>
            </el-form-item>
            <el-form-item class="btn-right">
                <el-button type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            LoginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        }
    },
    methods: {

    },

}
</script>
<style scoped lang="less">
.login-container {
    display: flex;
    justify-content: center;
    align-content: center;
    width: 350px;
    margin: 180px auto;
    border-radius: 10%;
    .btn-right {
        display: flex;
        justify-content: right;
    }

    h2 {
        margin-bottom: 40px;
        text-align: center;
    }
}
</style>
