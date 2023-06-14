/*
 * @Author: asswsl 107310268+asswsl@users.noreply.github.com
 * @Date: 2023-06-12 02:52:16
 * @LastEditors: asswsl 107310268+asswsl@users.noreply.github.com
 * @LastEditTime: 2023-06-14 16:35:36
 * @FilePath: \my-app\src\api\mock.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Mock from 'mockjs'
import homeApi from './MockServeData/home'
import user from './MockServeData/user'

// 定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 获取用户列表数据
Mock.mock('/api/user/getUser', user.getUserList)
// 创建
Mock.mock('/api/user/add','post', user.createUser)
// 修改
Mock.mock('/api/user/edit', 'post',user.updateUser)
// 删除
Mock.mock('/api/user/del','post', user.deleteUser)
