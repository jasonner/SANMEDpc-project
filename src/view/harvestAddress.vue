<template>
    <div class="orderPage">
         <div class="header">
            <span class="el-icon-arrow-left" @click="goBack()"></span>
            <p>订单详情</p>   
        </div>
        <!-- 新增地址 -->
        <div class="content-list">
            <div class="icon-left">
                <img src="https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/icon-attr.png" alt="" srcset="">
            </div>
            <div class="text-right" v-for="item in userMsgList" :key="item.id">
                <div>
                    <div class="name">姓名:{{item.hzusername}}</div>
                    <div class="tel">手机号:{{item.mobile}}</div>
                    <div class="address">地址：{{item.hzaddress}}</div>
                </div>
                <div class="addBtn">
                    <button @click="addNewAttr()" v-if="item.hzaddress">修改收货地址</button>
                    <button @click="addNewAttr()" v-if="!item.hzaddress">添加收货地址</button>
                </div>
            </div>
        </div>
        <!-- 订单信息 -->
        <div class="order-list" v-for="item in userMsgList" :key="item.id">
            <div class="left">
                <div class="msg"><span></span>&nbsp;&nbsp;订单信息&nbsp;&nbsp;<span></span></div>
                <div class="msgCode">订单号:{{item.orderid}}</div>
                <div class="msgCode">购买价格:￥{{item.amount}}</div>
                <div class="msgCode">购买时间:{{item.inserttime}}</div>
                <div class="msgCode" v-if="item.status ===0">支付状态:待付款</div>
                <div class="msgCode" v-if="item.status ===1">支付状态:付款成功</div>
                <div class="msgCode" v-if="item.status ===2">支付状态:付款失败</div>
                <div class="msgCode" v-if="item.status ===3">支付状态:寄出</div>
                <div class="msgCode" v-if="item.status ===4">支付状态:上门</div>
                <div class="msgCode" v-if="item.status ===5">支付状态:等待报告</div>
                <div class="msgCode" v-if="item.status ===6">支付状态:退款</div>
                <p v-if="item.status ===4910">支付状态:订单已撤销或已退款</p>
                <div class="msgMoney">
                    <p>购买套餐:丽菲清®（CAC检测）</p>
                </div>
            </div>
            <div class="right">
                <p>￥{{item.amount}}</p>
            </div>
        </div>
        <!-- 购买按钮 -->
        <div class="submitbtn" v-for="item in userMsgList" :key="item.id">
            <button @click="placeOrder()" v-if="item.status ===1">退款</button>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            userMsgList:[],
            orderkey:''
        }
    },
    mounted(){
        this.getMyorders();
        var query=this.$route.query;
        this.orderkey = query.orderkey;
    },
    methods:{
         //返回上一页
        goBack(){
            this.$router.go(-1);
        },
        //获取订单列表
        getMyorders(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            that.axios.get('myorders?mobile='+mobile)
            .then(function (res) {
                if(res.status == 200 ){
                    res.data.data.forEach(element => {
                        if(element.orderkey == that.orderkey){
                            that.userMsgList.push(element);
                            return
                        }else{
                            return
                        }   
                    });
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        },
        //添加新地址
        addNewAttr(){
            this.$router.push('/improve');
        },
        //退款
        placeOrder(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            let promise = {
                'mobile':mobile,
                'orderkey':that.orderkey
            }
            that.axios.post('refundorder',qs.stringify(promise))
            .then(function (res) {
                if(res.status == 200 ){
                    that.$alert('您的退款申请已提交后台，工作人员审核通过后，退款将于7个工作日内原路返回。如有问题，请联系：XXXXXX', '', {
                        confirmButtonText: '确定',
                        callback: action => {
                            that.$message({
                            type: 'info',
                            message: `action: ${ action }`
                            });
                        }
                    });
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
        }
    }
}
</script>
<style scoped>

.orderPage .content-list{
    width: 92%;
    margin: 0 auto;
    background: #e8f4f5;
    border-radius: 40px;
    margin-top: 45px;
    padding: 37px 34px;
    box-sizing: border-box;
}
.orderPage .content-list .icon-left img{
    float: left;
    width: 58px;
    margin-top: 72px;
    margin-right: 42px;
    margin-left: 42%;
}
.orderPage .content-list  .text-right .name{
    font-size: 34px;
    color: #4eb7ba;
    text-align: left;
}
.orderPage .content-list  .text-right .tel{
    font-size: 24px;
    color: #707070;
    margin-top: 22px;
    text-align: left;
}
.orderPage .content-list  .text-right .address{
    font-size: 24px;
    color: #707070;
    margin-top: 22px;
    text-align: left;
}
.orderPage .content-list .addBtn button,.submitbtn button{
    padding: 0 100px;
    box-sizing: border-box;
    height: 80px;
    text-align: center;
    font-size: 28px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 0.5rem solid #ffffff;
    border-radius: 4rem;
    box-shadow: 0.66667rem 0.66667rem 1.2rem 0.13333rem #999;
    margin-top: 40px;
}
.orderPage  .header{
    width: 100%;
    height: 74px;
    background: #4eb7ba;
    line-height: 74px;
    color: #fff;
    text-align: center;
    margin-top: -40px;
}
.orderPage .header p{
    font-size: 32px;
    padding-right: 60px;
    box-sizing: border-box;
}
.orderPage .header span{
    float: left;
    font-size: 32px;
    margin-top: 21px;
    font-weight: 900;
    margin-left: 30px;
    cursor: pointer;
}

/* order-list */
.orderPage .order-list{
    width: 92%;
    margin: 0 auto;
    background: #e8f4f5;
    border-radius: 40px;
    margin-top: 45px;
    padding: 37px 34px;
    box-sizing: border-box;
    display: flex;
}
.order-list .left{
    flex: 2;
    box-sizing: border-box;
    padding-left: 35%;
    box-sizing: border-box;
}
.order-list .right{
    flex: 1;
}
.order-list .right p{
    font-size: 28px;
   color: #4eb7ba;
   margin-top: 100px;
}
.orderPage .order-list div{
    width: 60%;
    margin: 0 auto;
    text-align: left;
}
.orderPage .order-list .msg{
    font-size: 30px;
    color: #4eb7ba;
}
.orderPage .order-list .msg span{
    line-height: 30px;
    display: inline-block;
    width: 10px;
    height: 10px;
    background: #4eb7ba;
    border-radius: 100%;
}
.orderPage .order-list .msgCode{
    font-size: 24px;
    color: #707070;
    text-align:left;
    margin-top: 24px;
}   
.orderPage .order-list .msgMoney{
    font-size: 28px;
    color: #707070;
    text-align: left;
    margin-top: 24px;
} 

</style>