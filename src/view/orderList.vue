<template>
    <div class="orderPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p>订单查询</p>   
        </header>
        <!-- 订单 -->
        <div v-if="noDataShow">
            <div class ="order-list" v-for="item in userMsgList" :key="item.id" >
                <div class="left" @click="goOrderDetail(item.orderkey)">
                    <p>订单号:{{item.orderid}}</p>
                    <p>购买套餐:丽菲清®（CAC检测）</p>
                    <p v-if="item.status ===0">支付状态:待付款</p>
                    <p v-if="item.status ===1">支付状态:付款成功</p>
                    <p v-if="item.status ===2">支付状态:付款失败</p>
                    <p v-if="item.status ===3">支付状态:寄出</p>
                    <p v-if="item.status ===4">支付状态:上门</p>
                    <p v-if="item.status ===5">支付状态:等待报告</p>
                    <p v-if="item.status ===6">支付状态:退款</p>
                    <p v-if="item.status ===4910">支付状态:订单已撤销或已退款</p>
                    <p v-if="item.status ===10000">已退款</p>
                    <p v-if="item.baogaourl && item.baogaourl !=null"><a :href="item.baogaourl">查看报告</a></p>
                </div>
                <div class="right" >
                    <p>￥{{item.amount}}</p>
                    <button v-if="item.status ===0" @click="goPay()">支付</button>
                    <button v-if="item.status ===1" @click="goOrderDetail(item.orderkey)">退款</button>
                </div>
                <div class="add-shipping-address" @click="goOrderDetail(item.orderkey)">
                    <p>请点击添加收货地址</p>
                    <img src="@/assets/img/orderList/point.png" alt="" srcset="">
                </div>
            </div> 
        </div>
        <div v-if="!noDataShow" class="noData">
            <img src="@/assets/img/index/no-data.jpg" alt="" srcset="">
        </div> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            userMsgList:[],
            timer0:null,
            noDataShow:true    
        }
    },
    mounted(){
        this.getMyorders();
    },
    methods:{
        goBack(){
            this.$router.push('/index');
        },
        //获取订单列表
        getMyorders(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            that.axios.get('myorders?mobile='+mobile)
            .then(function (res) {
                console.log(res.data)
                if(res.status == 200 ){
                    if(res.data.data && res.data.data.length>0){
                        that.userMsgList=res.data.data;
                        that.noDataShow = true;   
                    }else{
                        that.noDataShow = false;   
                    }
                    
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        },

        //去支付
        goPay(){
            this.$router.push('/pay');
        },
        //订单详情
        goOrderDetail(orderkey){
            console.log(orderkey)
            this.$router.push({path:'/harvestAddress',query:{orderkey:orderkey}});
        }
    }   
}
</script>
<style scoped>
.orderPage{
    width: 100%;
    height: 100%;
    background: #fafcfc;
}
.orderPage header{
    width: 100%;
    height: 90px;
    background: #4eb7ba;
    line-height: 90px;
    color: #fff;
    text-align: center;
    margin-top: -40px;
    
}
.orderPage header p{
    font-size: 32px;
    padding-right: 60px;
    box-sizing: border-box;
}
.orderPage header span{
    float: left;
    font-size: 32px;
    margin-top: 31px;
    font-weight: 900;
    margin-left: 30px;
    cursor: pointer;
}
.order-list{
    cursor: pointer;
    width: 60%;
    margin: 0 auto;
    background: #f1f1f1;
    border-radius: 20px;
    min-height: 245px;
    box-sizing: border-box;
    margin-top: 20px;
    display: grid;
    grid-template-columns: 60% 20% 20%;
}

.order-list .left{
    text-align: left;
}
.order-list div p{
    font-size: 28px;
    color: #5f5f5f;
}
.order-list .left p{
    margin-left: 4vw;
}
.order-list .left p:nth-of-type(1){
    width: 100%;
    margin-top: 20px;
}
.order-list .left p:nth-of-type(2){
    margin-top: 25px;
}
.order-list .left p:nth-of-type(3){
    margin-top: 25px;
}
.order-list .right {
    text-align: center;
}
.order-list .right p{
    margin-top: 45px;
    font-size: 37px;
    color: #4eb7ba;
}
.order-list .right button{
    font-size: 28px;
    color: #fff;
    padding: 10px 40px;
    background: #4eb7ba;
    border-radius: 40px;
    border: none; 
    margin-top: 20px;
}
.order-list  .add-shipping-address {
   text-align: center;
}
.order-list .add-shipping-address p{
    font-size: 12px;
    text-align: center;
    margin-top: 3vw;
    color: #4eb7ba;
}
.order-list .add-shipping-address img{
    width: 50px;
    animation: fingerHandle 2s ease infinite both;
}
@keyframes fingerHandle {
    0% {
        opacity: 1;
        transform: scale3d(1.2, 1.2, 1.2);
    }
    70% {
        opacity: 1;
        transform: scale3d(1.5, 1.5, 1.5);
    }
    100% {
        opacity: 1;
        transform: scale3d(1.2, 1.2, 1.2);
    }
} 
.noData{
    width: 100%;
}
.noData img{
    width: 50%;
}
</style>