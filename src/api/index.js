/*
 * @Author: asswsl 107310268+asswsl@users.noreply.github.com
 * @Date: 2023-06-12 02:52:16
 * @LastEditors: asswsl 107310268+asswsl@users.noreply.github.com
 * @LastEditTime: 2023-06-14 16:41:51
 * @FilePath: \my-app\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    // 返回promise对象
    return http.get('/home/getData')
}

export const getUser = (params) => {
    // 获取用户列表
    return http.get('/user/getUser', params)
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
export const editUser = (data) => {
    return http.post('/user/edit', data)
}