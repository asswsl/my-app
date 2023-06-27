/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-28 22:35:53
 * @LastEditors: asswsl 107310268+asswsl@users.noreply.github.com
 * @LastEditTime: 2023-06-27 19:22:56
 * @FilePath: \vued:\web\project\my-app\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import Page1 from '../views/Page1.vue'
import Page2 from '../views/Page2.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)
// 1.创建路由组件

const routes = [
    // 配置主路由
    {
        path: '/',
        component: Main,
        redirect: '/home',//重定向，使得当path为'/'时，跳转到home
        children: [
            // 子路由
            { path: 'home', name: 'home', component: Home },//首页
            { path: 'user', name: 'user', component: User },//用户管理
            { path: 'mall', name: 'mall', component: Mall },//商品管理
            { path: 'page1', name: 'page1', component: Page1 },//待定
            { path: 'page2', name: 'page2', component: Page2 },//待定
        ]
    },
    // 登录
    {
        path:'/login',name:'login',component:Login
    }

]
// 2.将路由与组件建立映射

const router = new VueRouter({
    routes
})
// 3.创建router实例，传递routes配置

export default router


// 4.创建挂载根实例