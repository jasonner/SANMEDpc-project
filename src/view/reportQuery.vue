<template>
    <div class="reportQuery">
        <div class="header">
            报告查询
        </div>
        <div class="list-box" v-for="(item) in userMsgList" :key="item.id">   
            <div class="list" v-if="item.baogaourl && item.baogaourl !=null">
                <div class="text" >
                    您的报告{{item.id}}
                </div>
                <div class="query"  v-if="item.baogaourl && item.baogaourl !=null">
                    <button><a :href="item.baogaourl" style="color:#fff">查询</a></button>
                </div>
            </div>
        </div>
        <div class="list" v-if="userMsgList.length<=0">
            <div class="text" >
                暂无报告数据
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            userMsgList:[]
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
                    that.userMsgList=res.data.data;
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
            this.$router.push('/productDetail');
        },
        //订单详情
        goOrderDetail(orderkey){
            this.$router.push({path:'/harvestAddress',query:{orderkey:orderkey}});
        }
    }   
}
</script>
<style scoped>
.reportQuery{
    width: 100%;
    height: 100%;
    overflow: scroll;
    background: url('../assets/img/reportQuery/bg.png') center no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding-bottom: 30px;
    box-sizing: border-box;
}
.reportQuery .header{
    width: 100%;
    height: 114px;
    background: #4eb7ba;
    line-height: 114px;
    font-size: 45px;
    color: #fff;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
}
.reportQuery .list-box{
    width: 100%;
}
.reportQuery  .list{
    width: 90%;
    height: 290px;
    margin: 0 auto;
    border-radius: 10px;
    margin-top: 30px;
    background: #e0ebeb;
    padding-top: 103px;
    box-sizing: border-box;
}
.reportQuery  .list .text{
    font-size: 42px;
    color: #4eb7ba;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
}
.reportQuery  .list .query{
    width: 100%;
    height: auto;
    margin-top: 40px;
}
.reportQuery  .list .query button{
    width: 167px;
    height: 64px;
    font-size: 33px;
    color: #fff;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    background: url('../assets/img/reportQuery/btn.png') center no-repeat;
    background-size: 100% 100%;
    border: none;
    padding-left: 30px;
    float: right;
    margin-right: 30px;
}
</style>