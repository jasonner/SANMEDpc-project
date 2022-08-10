<template>
    <div class="product-detail-page">
        <!-- 头部 -->
        <div class="product-header-box">
            <div class="header-list">
                <div class="left"><img src="@/assets/img/page1/logo.png" alt="" srcset=""></div>
                <div class="right">
                    <p><router-link :to="{path:'/index',query: {name: 1}}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                    <p><router-link :to="{path:'/shield',query: {name: 1}}">技术详情</router-link></p>
                    <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
                    <p @click="goUserPage()"><span>个人中心</span></p> 
                    <p @click="callUs()"><span>联系我们</span></p>
                </div>
            </div>
            <div class="header-list headerFiexd"  v-if="headerFixed">
                <div class="left"><img src="@/assets/img/page1/logo.png" alt="" srcset=""></div>
                <div class="right">
                    <p><router-link :to="{path:'/index',query: {name: 1}}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                    <p><router-link :to="{path:'/shield',query: {name: 1}}">技术详情</router-link></p>
                    <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
                    <p @click="goUserPage()"><span>个人中心</span></p> 
                    <p @click="callUs()"><span>联系我们</span></p>
                </div>
            </div>
            <!-- 方案介绍  -->
            <div class="scheme-introduction-box">
                <div class="scheme-left">
                    <div>
                        <img src="@/assets/img/productDetail/family.png" alt="" srcset="">
                    </div>
                    <div>
                        <button @click="payBtnChange()">
                            <img src="@/assets/img/index/payBtnNew.png" alt="" srcset="">
                        </button>
                    </div>
                </div>
                <div class="scheme-right">
                    <h4>“肺”常无忧——肺结节全病程管理方案</h4>
                    <div class="list">
                        <div>
                            <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                        </div>
                        <div>
                            <strong>准确</strong>
                        </div>
                        <div>
                            <p>全国13家三甲医院，1737例研究数据验证:早期肺癌综合分析准确率<span class="num-text">90%*</span></p>
                        </div>
                        
                    </div>
                    <div class="list">
                        <div><img src="@/assets/img/index/iconStar.png" alt="" srcset=""></div>
                        <div><strong>权威</strong></div>
                        <div><p>丽菲清®️（CAC检测）是“中国肺癌防治联盟百万工程”肺癌早诊三剑客之一</p></div>
                    </div>
                   <div class="list">
                       <div>
                           <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                       </div>
                       <div><strong>专业</strong></div>
                       <div><p>三甲医院专家团队<span class="num-text">（副主任医师及以上）</span>提供解读报告</p></div>
                    </div>
                    <div class="list">
                        <div><img src="@/assets/img/index/iconStar.png" alt="" srcset=""></div>
                        <div><strong>便捷</strong></div>
                        <div><p>执证护士上门采血（无需空腹），仅需<span class="num-text">10分钟7天** </span> 即可拿到检测结果，全程顺丰物流</p></div>
                    </div>
                    <div class="list">
                        <div>
                            <img src="@/assets/img/index/iconStar.png" alt="" srcset="">
                        </div>
                        <div><strong>无忧</strong></div>
                        <div>
                            <p>专属健管师<span class="num-text">1对1服务</span>，全流程跟进，后顾无忧</p>
                            <!-- <ul class="tip-text">
                                <li>* ：中国多中心研究数据</li>
                                <li>**：自实验室确认样本合格之日计算</li>
                            </ul>     -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- 问题列表 -->
        <div class="problem-list-box">
            <div class="problem-list">
                <div class="problem-list-content">
                    <div :class="{active:listChange=='1'}" @click="listChange='1'">套餐内容详情</div>
                    <div :class="{active:listChange=='2'}" @click="listChange='2'">“TA”的故事</div>
                    <div :class="{active:listChange=='3'}" @click="listChange='3'">常见问题</div>
                </div>
            </div>
        </div>
        <div class="problem-list-box selectFixed" v-if="Fixed">
            <div class="problem-list">
                <div class="problem-list-content">
                    <div :class="{active:listChange=='1'}" @click="listChange='1'">套餐内容详情</div>
                    <div :class="{active:listChange=='2'}" @click="listChange='2'">“TA”的故事</div>
                    <div :class="{active:listChange=='3'}" @click="listChange='3'">常见问题</div>
                </div>
            </div>
        </div>
        <!-- 套餐内容详情 -->
        <PackageContent v-show="listChange=='1'"></PackageContent>
        <!-- 使用者反馈 -->
        <UseFeedback v-show="listChange=='2'"></UseFeedback>
        <!-- 常见问题 -->
        <commonProblem v-show="listChange=='3'"></commonProblem>        
        <!-- 结尾 -->
        <div class="payBtnFiexd">
            <img @click="payBtnChange()" class="payBTN" src="@/assets/img/index/payBtn.png?v=1" alt="" srcset="">
        </div>
        <Footer></Footer>
        <div class="maskModle" v-if="callUsShow"></div>
        <!-- 联系我们弹窗 -->
        <div class="call-us-box" v-if="callUsShow">
            <div class="call-us-list">
                <div class="list">
                    <div>
                        <span>您的称呼:</span>
                    </div>
                    <div>
                        <input v-model="msgList.name" maxlength="10" type="text" />
                    </div>
                </div>
                <div class="list">
                    <div>
                        <span>联系方式:</span>
                    </div>
                    <div>
                        <input v-model="msgList.tel" placeholder="(手机或邮箱均可)"  type="text" />
                    </div>
                </div>
                <div class="list">
                    <div>
                        <span>意见反馈:</span>
                    </div>
                    <div>
                        <textarea v-model="msgList.msg" maxlength="200" name="" id=""  rows="4"></textarea>
                    </div>
                </div>
                <p class="health-manager-title">或您可直接添加健管师进行实时沟通</p>
                <div class="health-manager">
                    <div class="health-manager-left">
                        <img src="@/assets/img/index/eqCode.jpg" alt="" srcset="">
                    </div>
                    <div class="health-manager-right">
                            <p>联系健管师</p>
                            <p>孙老师 &nbsp;&nbsp; &nbsp;<a href="tel:13232218811">13232218811</a></p>
                    </div>
                </div>
                <div class="cross" @click="closeCallUsChange()">
                   X
                </div>
            </div>
            <div class="submit-list">
                <button @click="msgSubmit()">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import Footer from '@/components/footer.vue'
import PackageContent from '@/components/PackageContent.vue'
import UseFeedback from '@/components/UseFeedback.vue'
import commonProblem from '@/components/commonProblem.vue'
import qs from 'qs'
export default {
    data(){
        return{
            listChange:'1',
            indexShow:false,
            Fixed:false,
            headerFixed:false,
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            }
        }
    },
    components:{
        commonProblem,
        Footer,
        UseFeedback,
        PackageContent
    },
    mounted(){
        window.addEventListener("scroll", this.showIcon);
        let mobile = localStorage.getItem('tel');
        if(mobile){
            this.mobile = mobile;
        };
        var query=this.$route.query;
        if(query.listChange){
            this.listChange = query.listChange;
        };
    },
    methods:{
        indexListChange(){
            this.indexShow = !this.indexShow;
        },
        //滚动事件        
        showIcon() {
            console.log(document.documentElement.scrollTop);
            if (document.documentElement.scrollTop > 550) {            
                this.headerFixed = true
            } else {
                this.headerFixed = false 
            };
            if (document.documentElement.scrollTop > 1450) {            
                this.Fixed = true
            } else {
                this.Fixed = false 
            }
        },
        //支付按钮
        payBtnChange(){
            let mobile = localStorage.getItem('tel');
            if(mobile && mobile !=''){
                this.$router.push('/pay');
            }else{
                this.$confirm('需要您进行登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        this.$router.push('/login');
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消登录'
                    });          
                });
            }
        },
        //个人中心
        goUserPage(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            if(!mobile || mobile==''){
                that.$confirm('此操作需要您进行登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                    }).then(() => {
                        this.$router.push({path:'/login'});
                    }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消登录'
                    });          
                });
            }else{
                that.$router.push({path:'/user'});
            };
        },
        //订单列表
        goOrderPage(){
            let that = this;
            let mobile = localStorage.getItem('tel');
            if(!mobile || mobile==''){
                that.$confirm('此操作需要您进行登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                    }).then(() => {
                        this.$router.push({path:'/login'});
                    }).catch(() => {
                    that.$message({
                        type: 'info',
                        message: '已取消登录'
                    });          
                });
            }else{
                that.$router.push({path:'/order'});
            };
        },
        //联系我们弹窗
        callUs(){
            console.log(111)
            this.callUsShow = true;
        },

        //关闭联系我们弹窗
        closeCallUsChange(){
            this.callUsShow = false;
        },

        //提交留言
        msgSubmit(){
            if(this.msgList.name == ''){
                this.$message({
                    type: 'warning',
                    message: '请输入您的姓名'
                });   
            }else if(this.msgList.tel == ''){
                this.$message({
                    type: 'warning',
                    message: '请输入您的联系方式'
                });   
            }else if(this.msgList.msg == ''){
                this.$message({
                    type: 'warning',
                    message: '留言不能为空'
                }); 
            }else{
                let that = this;
                let promise = {
                    username:that.msgList.name,
                    mobile:that.msgList.tel,
                    msg:that.msgList.msg
                };
                that.axios.post('postmsg', qs.stringify(promise))
                .then(function (res) {
                    console.log(res);
                    if(res.status == 200 ){
                        if(res.data && res.data.s){
                            that.callUsShow = false;
                        }else{
                            that.$message.error(res.data.msg);
                        }
                    }else{
                        that.$message({
                            message: '服务异常请稍后重试！',
                        type: 'warning'
                        });
                    }
                });
            }   
        },
    }
}
</script>
<style  scoped>
    .product-detail-page{
        width: 100%;
        height: 100%;
    }
    .product-detail-page .product-header-box{
        width: 100%;
      
        margin: 0 auto;
        padding-top: 45px;
        box-sizing: border-box;
    }
    .product-detail-page .header-list{
        display: flex;
        width: 72.6%;
        margin: 0 auto;
    }
    .product-detail-page .header-list .left{
        flex: 1;
    }
    .product-detail-page .header-list .left img{
        width: 6vw;
    }
    .product-detail-page .header-list .right{
        width: 80%;
        flex: 3;
        margin-left: 16vw;
        display: flex;
    }
    .headerFiexd{
        width: 100% !important;
        margin: 0 auto;
        position: fixed;
        top: 0;
        left:0;
        z-index: 1000;
        background: #fff;
        padding-left: 12%;
        box-sizing: border-box;
        box-shadow: 10px 10px 10px #dfdfdf;
    }
    .headerFiexd .left img{
        margin-top: 1vw;
        display: inline-block;
    }
    .product-detail-page .header-list .right p{
        text-align: center;
        width: 200px;
        line-height: 1.5;
        margin-left: 20px;
        font-size:1.3vw;
        color: #747474;
    }
    .product-detail-page .header-list .right p a{
        font-size:1.3vw;
        color: #747474;
        border-right: 1px solid #a3a4a4;
        padding-right: 30px;
        box-sizing: border-box;
     }
    .product-detail-page .header-list .right p span{
        font-size:1.3vw;
        color: #747474;
        border-right: 1px solid #a3a4a4;
        padding-right: 30px;
        box-sizing: border-box;
        cursor: pointer;
     }
     /* 方案介绍 */
    .product-detail-page .scheme-introduction-box{
        width: 100%;
        height: 1590px;
        margin: 0 auto;
        background: url('../assets/img/productDetail/header-bg.png') 10% 0 no-repeat;
        background-size:  100% 100%;
        margin-top: -250px;
    }
    .product-detail-page .scheme-introduction-box .scheme-left{
        width:45.1%;
        float: left;
    }
    .product-detail-page .scheme-introduction-box .scheme-left img{
        border-radius: 100%;
        width: 52%;
        height: 52%;
        margin-top: 16.5vw;
        margin-left: 15%;
    }
     .product-detail-page .scheme-introduction-box .scheme-left button img{
        width: 255px;
        height: 125px;
        margin: 0;
        border-radius: 0;
        margin-left: -10px;
     }
    /* @media screen and (max-width: 1280px) {
       .product-detail-page .scheme-introduction-box .scheme-left img{
            border-radius: 100%;
            width: 52%;
            height: 52%;
            margin-top: 16.5vw;
            margin-left: 15%;
        }
    } */
    .product-detail-page .scheme-introduction-box .scheme-left button{
        font-size: 32px;
        font-family: SourceHanSansCN, SourceHanSansCN-Medium;
        font-weight: 500;
        text-align: center;
        color: #ffffff;
        letter-spacing: 2px;
        width: 239px;
        height: 49px;
        opacity: 1;
        margin-left: 15%;
        margin-top: 5%;
        border: none;
    }
    .product-detail-page .scheme-introduction-box .scheme-right{
        width:54%;
        height: auto;
        float: right;
        text-align: left;
        margin-top:10%;
    }
    .product-detail-page .scheme-introduction-box .scheme-right h4{
        font-size: 50px;
        font-family: SourceHanSansCN, SourceHanSansCN-Medium;
        font-weight: 500;
        text-align: left;
        color: #4eb7ba;
        line-height: 67px;
        letter-spacing: -1px;
        margin-top: 123px;
        margin-left: -45px;
    }
    .product-detail-page .scheme-introduction-box .scheme-right h6{
        font-size: 45px;
        font-family: SourceHanSansCN, SourceHanSansCN-Medium;
        font-weight: 500;
        text-align: left;
        color: #10888e;
        line-height: 67px;
    }
    .product-detail-page .scheme-introduction-box .scheme-right  .list img{
        width: 32px;
        margin-top: 10px;
    }
    .product-detail-page .scheme-introduction-box .scheme-right .list strong{
        float: left;
        font-size: 32px;
        color: #4eb7b9;
        margin-right: 18px;
        margin-left: 10px;

    }
    .product-detail-page .scheme-introduction-box .scheme-right .list:nth-of-type(1){
        margin-top: 76px;
    }
     .product-detail-page .scheme-introduction-box .scheme-right .list{
         width: 100%;
         height: auto;
         margin-top: 63px;
         display: grid;
         grid-template-columns: 46px 94px 760px; 
    }
    .product-detail-page .scheme-introduction-box .scheme-right .list p{
        margin: 0;
        font-size: 33px;
        font-family: SourceHanSansCN, SourceHanSansCN-Light;
        font-weight: 300;
        text-align: left;
        color: #231815;
        letter-spacing: 0.5px;
    }
     .product-detail-page .scheme-introduction-box .scheme-right .list  .tip-text li{
         font-size: 23px;
        font-family: SourceHanSansCN, SourceHanSansCN-Light;
        font-weight: 300;
        text-align: left;
        color: #231815;
        line-height: 42px;
    }
    .product-detail-page .scheme-introduction-box .scheme-right .list p .num-text{
        font-size: 33px;
        font-family: SourceHanSansCN;
        text-align: left;
        color: #4eb7b9;
        font-weight: 700;
    }
    .product-detail-page .scheme-introduction-box .scheme-right .list .tip{
        height: 18px;
        opacity: 1;
        font-size: 18px;
        font-family: SourceHanSansCN, SourceHanSansCN-Light;
        font-weight: 300;
        text-align: left;
        color: #231815;
        line-height: 32px;
        margin-left: 9rem;
        margin-top:-10px;
    }
    /* 问题列表 */
    .problem-list-box{
        width: 100%;
        height: 102px;
        background-image: linear-gradient(#fff, #4eb7ba);
    }
    .problem-list{
        width: 100%;
        height: 94px;
        line-height: 94px;
        background-image: linear-gradient(#fff, #e4f0e2);
     }
    .problem-list-content{
        width: 60%;
        margin: 0 auto;
        height: 94px;
        line-height: 94px;
        text-align: center;
        display: flex;
        cursor: pointer;
        background: #4eb7ba;
    }
    .problem-list-content div{
        font-size: 1.4vw;
        flex: 1;
        margin: 0 3px;
        height: 94px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 700;
        text-align: center;
        color: #4eb7ba;
        background-image: linear-gradient(#fff, #e4f0e2);
    }
    .problem-list-box .active{
        background-image: linear-gradient(#fff, #4eb7ba);
        color: #fff;
    }

    .product-detail-page .maskModle{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        z-index: 1005;
    }
    .product-detail-page .call-us-box{
        width: 36%;
        position: fixed;
        top: 10%;
        left: 32%;
        background: #fff;
        z-index: 1006;
        border-radius: 40px;
        padding-bottom: 32px;
        box-sizing: border-box;
    }
    .product-detail-page .call-us-list{
        width: 100%;
        background: #e3f3fc;
        text-align: left;
        padding-top: 62px;
        box-sizing: border-box;
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        padding-bottom: 20px;
        position: relative;
    }
    .product-detail-page .call-us-list .cross{
        position: absolute;
        right: 1vw;
        top: 1vw;
        line-height: 1;
        color: #fff;
        background: #999;
        border-radius: 100%;
        font-size: 35px;
        height: 40px;
        line-height: 40px;
        width: 40px;
        text-align: center;
        cursor: pointer;
    }
    .product-detail-page .call-us-list .list:nth-of-type(1){
        margin-top: 0;
    }
    .product-detail-page .call-us-list .list{
        position: relative;
        padding: 0 30px;
        box-sizing: border-box;
        margin-top: 42px;
        display: grid;
        grid-template-columns: 20% 80%;
    }
    .product-detail-page .call-us-list .list input{
        width:100%;
        height: 96px;
        line-height: 96px;
        border-radius: 40px;
        border:1pt solid #d3d8d8;
        padding-left: 5.8vw;
        box-sizing: border-box;
        font-size: 28px;
        color: #4eb7ba;
        outline-color: #4eb7ba;
        margin-left: -15%;
    }
    .product-detail-page .call-us-list .list span{
        font-size: 28px;
        color: #4eb7ba;
        position: absolute;
        left: 5vw;
        top: 2.2vh;
    }
    .product-detail-page .call-us-list .list textarea{
        border-radius: 40px;
        padding:20px;
        padding-top: 80px;
        width: 100%;
        resize: none;
        font-size: 28px;
        box-sizing: border-box;
        border:1pt solid #d3d8d8;
        outline-color: #4eb7ba;
        margin-left: -15%;
        color: #4eb7ba;
    }
    .product-detail-page .call-us-box .health-manager{
        display: flex;
        margin-top: 10px;
    }
    .product-detail-page .call-us-box .health-manager div{
        flex: 1;
        text-align: left;
    }
   .product-detail-page .call-us-box .health-manager div:nth-of-type(1) img{
        width: 232px;
        margin-left: 36px;
    }
   .product-detail-page .call-us-box .health-manager-right p, .product-detail-page .call-us-box .health-manager-right p a{
        font-size: 28px;
        color: #4eb7ba;
        margin-top: 50px;
        margin-left: -30px;
        font-weight: 700;
    }
    .product-detail-page .call-us-box .submit-list button{
        padding: 13px 40px;
        border: 2pt solid #d3d8d8;
        border-radius: 40px;
        background: #fff;
        margin-top: 20px;
        box-sizing: border-box;
        font-size: 28px;
        color: #4eb7ba;
    }
    .product-detail-page .call-us-box  input::-webkit-input-placeholder , .product-detail-page .login-information .tel input::-webkit-input-placeholder{
        color: rgb(78, 183, 186);
    }
    .product-detail-page .call-us-box  input::-moz-input-placeholder, .product-detail-page .login-information .tel input::-moz-input-placeholder{
        color: rgb(78, 183, 186)
    }
    .product-detail-page .call-us-box  input::-ms-input-placeholder, .product-detail-page .login-information .tel input::-ms-input-placeholder {
        color: rgb(78, 183, 186)
    }
    .product-detail-page .health-manager-title{
        color: rgb(78, 183, 186);
        font-size:28px;
        margin-left: 4vw;
        margin-top: 1vw;
        text-align: center;
    }
    .closeBtn{
        width: 20px;
        height: 20px;
        font-size: 20px;
        position: absolute;
        right: 30px;
        top: 5px;
        cursor: pointer;
    }
    </style>