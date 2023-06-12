/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-03-30 21:59:19
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-04-16 15:08:21
 * @FilePath: \vued:\web\project\my-app\src\store\tab.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    state: {
        isCollapse: false,//用于控制侧边栏菜单展开收起
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            },
        ]//面包屑
    },
    mutations: {
        // 修改isCollapse
        collapseChange(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            console.log(val, state);
            // 判断添加的数据是否是首页Home
            if (val.name != 'home') {
                // findIndex 如果当前数据存在，返回当前数据索引，不存在则返回-1
                const index = state.tabList.findIndex(item => item.name === val.name)
                if (index == -1) {
                    state.tabList.push(val)
                }
            }
        },
        // 删除tablist内指定数据
        closeTag(state, item) {
            console.log(item, 'closeTagitem');
            const index = state.tabList.findIndex(val => item.name == val.name)
            // splice()第一个参数为删除元素起始位置，第二个参数为删除元素个数
            state.tabList.splice(index, 1);
        }
    }
}