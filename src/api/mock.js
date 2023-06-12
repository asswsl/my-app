import Mock from 'mockjs'
import homeApi from './MockServeData/home'
import user from './MockServeData/user'

// home定义mock接口请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// user定义mock接口请求拦截
Mock.mock('/api/user/get', user.getUserList)
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
