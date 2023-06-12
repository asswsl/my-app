import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回promise对象
    return http.get('/home/getData')
}
export const getUser = (params) => {
    // 获取用户列表
    return http.get('/user/get', params)
}
// 添加用户
export const addUser = (data) => {
    return http.post('/user/add', data)
}
// 删除用户
export const delUser = (data) => {
    return http.post('/user/del', data)
}
// 编辑用户
export const eidtUser = (data) => {
    return http.post('/user/edit', data)
}