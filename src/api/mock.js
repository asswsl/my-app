import Mock from 'mockjs'
import homeApi from './MockServeData/home'
// 定义mock接口请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
