import Vue from 'vue'
import Router from 'vue-router'

import index from "@/view/index.vue";
import Login from "@/view/login.vue";
import productDetail from "@/view/productDetail.vue";
import userInformation from "@/view/userInformation.vue";
import Improve from "@/view/ImproveUser.vue";
import Manual from "@/view/manual.vue";
import Question from "@/view/Question.vue";
import Result from "@/view/result.vue";
import getResult from "@/view/getResult.vue";
import Shield from "@/view/productShield.vue";
import Order from "@/view/order.vue";
import orderList from "@/view/orderList.vue"; 
import HarvestAddress from "@/view/harvestAddress.vue";
import pay from "@/view/pay.vue";
import ReportQuery from "@/view/reportQuery.vue";
import userAgreement from "@/view/userAgreement.vue";
import privacyPolicy from "@/view/privacyPolicy.vue";
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
        name:'登录注册页',
        component: Login,
        menuShow:false
    },
    {
        path:'/productDetail',
        name:'产品详情页',
        component: productDetail,
        menuShow:false
    },
    {
        path:'/user',
        name:'个人中心页',
        component: userInformation,
        menuShow:false
    },
    {
        path:'/improve',
        name:'完善个人信息页',
        component: Improve,
        menuShow:false
    },
    {
        path:'/manual',
        name:'患教手册页',
        component: Manual,
        menuShow:false
    },
    {
        path:'/question',
        name:'自测风险问题页',
        component: Question,
        menuShow:false
    },
    {
        path:'/result',
        name:'自测风险问题页',
        component: Result,
        menuShow:false
    },
    {
        path:'/getResult',
        name:'获取自测风险问题页',
        component: getResult,
        menuShow:false
    },
    {
        path:'/shield',
        name:'CAC创新技术',
        component: Shield,
        menuShow:false
    },
    {
        path:'/order',
        name:'订单页面',
        component: Order,
        menuShow:false
    },
    {
        path:'/orderList',
        name:'订单页面',
        component: orderList,
        menuShow:false
    },
    {
        path:'/harvestAddress',
        name:'添加地址',
        component: HarvestAddress,
        menuShow:false
    },
    {
        path:'/pay',
        name:'支付页面',
        component: pay,
        menuShow:false
    },
    {
        path:'/reportQuery',
        name:'报告查询',
        component: ReportQuery,
        menuShow:false
    },
    {
        path:'/userAgreement',
        name:'用户协议',
        component: userAgreement,
        menuShow:false
    },
    {
        path:'/privacyPolicy',
        name:'隐私政策',
        component: privacyPolicy,
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