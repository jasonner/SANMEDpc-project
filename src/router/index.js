import Vue from 'vue'
import Router from 'vue-router'

import index from "@/views/index.vue";
import Login from "@/views/login.vue";
import liveDetail from "@/views/liveDetail.vue";
import liveManage from "@/views/liveManage.vue";
Vue.use(Router)
export const constantRouterMap =[
    {
        path:'/',
        name:'首页',
        redirect:'/index',
        menuShow:false
    },
    {
        path:'/index',
        name:'首页',
        component: index,
        menuShow:false
    },
    {
        path:'/login',
        name:'首页',
        component: Login,
        menuShow:false
    },
	{
        path:'/liveDetail',
        name:'直播详情',
        component: liveDetail,
        menuShow:false
    },
    {
        path:'/liveManage',
        name:'频道管理',
        component: liveManage,
        menuShow:false
    },
    {
        path: "*",
        redirect: "/index"
    }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 
export default new Router({
    routes: constantRouterMap
})