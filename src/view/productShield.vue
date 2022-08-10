<template>
    <div class="productShieldPage">
        <!-- 头部 -->
        <div class="product-header-box">
            <div class="header-list">
                <div class="left"><img src="@/assets/img/page1/logo.png" alt="" srcset=""></div>
                <div class="right">
                    <p><router-link :to="{path:'/index',query: {name: 1}}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                    <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
                    <p @click="goUserPage()">个人中心</p> 
                    <p @click="callUs()">联系我们</p>
                </div>
            </div>
        </div>
        <div class="header-list headerFiexd"  v-if="headerFixed">
            <div class="left"><img src="@/assets/img/page1/logo.png" alt="" srcset=""></div>
            <div class="right">
                <p><router-link :to="{path:'/index',query: {name: 1}}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
                <p @click="goUserPage()"><span>个人中心</span></p> 
                <p @click="callUs()"><span>联系我们</span></p>
            </div>
        </div>
        <div class="img-list-content">
            <img src="@/assets/img/shield/01.png?v=001" alt="" srcset="">
        </div>
        <div class="link-list">
            <p><a href="https://health.usnews.com/health-care/best-hospitals/slidesho">1、https://health.usnews.com/health-care/best-hospitals/slidesho</a></p>
            <p><a href="https://thepathologist.com/the-power-list-2015\">2、https://thepathologist.com/the-power-list-2015</a></p>
            <p><a href="https://mp.weixin.qq.com/s/XfS4mqqcvzlKBFeFV0yTuQ">3、https://mp.weixin.qq.com/s/XfS4mqqcvzlKBFeFV0yTuQ</a></p>
        </div>
        <div class="video-box">
            <video src="@/assets/video/video1.mp4" controls="controls" poster="@/assets/img/new1203/videoPost-new.jpg">
                your browser does not support the video tag
            </video>
        </div>
        <div class="img-list-content">
            <img src="@/assets/img/shield/02.png" alt="" srcset="">
        </div>
        <div class="img-list-content">
            <img src="@/assets/img/shield/03.png" alt="" srcset="">
        </div>
        <div class="img-list-content">
            <img src="@/assets/img/shield/04.png" alt="" srcset="">
        </div>
        <div class="link-URL">
            <a href="https://mp.weixin.qq.com/s/HYZFz2Z88PWgWfGt2j-Qjw">详见：重磅| 国际肺癌研究协会ISALC 液体活检热点会议 循环异常细胞（CAC）在5-10mm肺部小结节中的良恶性诊断效能</a>
        </div>
        
        <div class="img-list-content">
            <img src="@/assets/img/shield/05.png" alt="" srcset="">
        </div>

        <div class="link-URL">
            <a href="https://mp.weixin.qq.com/s/guXgATShReVkOJhyYITXxA">详见：基于深度学习的人工智能用于肺结节良恶性鉴别诊断，一项真实世界、多中心的诊断性研究</a>
        </div>
        <!-- 结尾 -->
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
        <div class="payBtnFiexd">
            <img @click="payWx()" class="payBTN" src="@/assets/img/index/payBtn.png?v=1" alt="" srcset="">
        </div>
    </div>
</template>
<script>
import Footer from '@/components/footer.vue'
import qs from 'qs'
export default {
    data(){
        return{
            listChange:'2',
            indexShow:false,
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            },
            headerFixed:false
        }
    },
    components:{
        Footer,
    },
    mounted(){
        window.addEventListener("scroll", this.showIcon);
    },  
    methods:{
        //滚动事件        
        showIcon() {
            console.log(document.documentElement.scrollTop);
            if (document.documentElement.scrollTop > 550) {            
                this.headerFixed = true
            } else {
                this.headerFixed = false 
            };
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
         
         //支付
        payWx(){
            this.$router.push('/productDetail');
        },  
    }
}
</script>
<style scoped>
.productShieldPage{
    width: 100%;
}
.productShieldPage .header-list{
    display: flex;
    width: 72.6%;
    margin: 0 auto;
    padding-top: 45px;
    box-sizing: border-box;
}
.productShieldPage .header-list .left{
    flex: 1;
}
.productShieldPage .header-list .right{
    width: 80%;
    flex: 3;
    display: flex;
}
.productShieldPage .header-list .right p{
    text-align: center;
    width: 80px;
    height: 35px;
    line-height: 35px;
    margin-left: 20px;
    font-size:29px;
    color: #747474;
    border-right: 1px solid #a3a4a4;
    padding-right: 30px;
    box-sizing: border-box;
    cursor: pointer;
}
.productShieldPage .header-list .right p a{
    font-size:1.3vw;
    color: #747474;
}
.productShieldPage .header-bg{
    width: 100%;
    height: 18px;
    background: #e3edd3;
}
.productShieldPage .header-box{
    width: 100%;
    background: #fff;
}
.productShieldPage .content-list{
    width: 100%;
    display: flex;
}
.productShieldPage .header-box div{
    flex: 1;
}
.productDetailPage .header-box .left{
    text-align: left;
}
.productShieldPage .header-box .right{
    text-align: right;
    position: relative;
}
.productShieldPage .header-box .index-list{
    width: 180px;
    position: absolute;
    right: 0;
    top: 134px;
    background: #f8f8f8;
    z-index: 100;
    box-shadow: 10px 10px 10px #dfdfdf;
    box-shadow: -10px 10px 10px #dfdfdf;
}
.productShieldPage .header-box .index-list p{
    height: 66px;
    font-size: 25px;
    border-top: 1px solid #989898;
    text-align: center;
    line-height: 66px;
}
.productShieldPage .header-box .left img{
    width: 131px;
    margin-top: 70px;
    margin-left: 30px;
}
.productShieldPage .header-box .right img{
    width: 47px;
    margin-top: 85px;
    margin-right: 37px;
}
.productShieldPage .header-list .left{
    flex: 1;
}
.productShieldPage .header-list .left img{
    width: 6vw;
}
.productShieldPage .header-list .right{
    width: 80%;
    flex: 3;
    margin-left: 16vw;
    display: flex;
}
.headerFiexd{
    width: 100% !important;
    height: 5vw;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left:0;
    z-index: 1000;
    background: #fff;
    padding-left: 12%;
    box-shadow: 10px 10px 10px #dfdfdf;
    padding: 0 !important;
    box-sizing: border-box;
}
.headerFiexd .left img{
    display: inline-block;
    margin-top: 1.2vw;
}
.productShieldPage .header-list .right p{
    text-align: center;
    width: 200px;
    margin-top: 2vw;
    margin-left: 20px;
    font-size:1.3vw;
    color: #747474;
}
·
/* banner */
.productShieldPage .banner{
    width: 100%;
    height: 528px;
    background: url('https://oss.sxyweb.com.cn/2021/wj/SANMED/H5/productShield/01.png') center no-repeat;
    background-size: 100% 100%;
}
.productShieldPage .banner p{
    font-size: 33px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #ffffff;
    text-shadow: 10px 10px 7px 1px #1f2d89; 
    line-height: 528px;
}
/* 技术发明者介绍 */
.productShieldPage .technological-invention{
    width: 79%;
    margin: 0 auto;
    height: auto;
}
.productShieldPage .technological-invention .title{
    margin-top: 39px;
}
.productShieldPage .technological-invention .title p{
    font-size: 46px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 72px;
}
.productShieldPage .technological-invention .user-img img{
    width: 241px;
    height: 241px;
    margin-top: 43px;
}
.productShieldPage .technological-invention .Top{
    width: 72%;
    margin: 0 auto;
    margin-top: 27px;
}
.productShieldPage .technological-invention .Top p{
    font-size: 42px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #282828;
    line-height: 60px;
}
.productShieldPage .technological-invention .Top p span{
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background: lightseagreen;
    float: left;
    margin-top: 18px;
    margin-right: 15px;
}
.productShieldPage .technological-invention .pathologist{
    width: 100%;
    margin-top: 40px;
    text-align: center;
}
.productShieldPage .technological-invention .pathologist img{
    width: 60%;
}
.productShieldPage .technological-invention .clinical-research{
    width: 100%;
    margin-top: 49px;
    text-align: center;
}
.productShieldPage .technological-invention .clinical-research img{
    width: 100%;
}
.productShieldPage .expert{
    width: 100%;
    height: 528px;
    margin-top: 49px;
    text-align: center;
    background: url('https://oss.sxyweb.com.cn/2021/wj/SANMED/PC/productShield/03.png') center no-repeat;
    background-size: 100% 100%;
    font-size: 65px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #ffffff;
    text-shadow: 4px 4px 0 #1f2d89, 4px -4px 0 #1f2d89, -4px -4px 0 #1f2d89, -4px 4px 0 #1f2d89, 4px 3px 0 #1f2d89, 4px -3px 0 #1f2d89, -4px -3px 0 #1f2d89, -4px 3px 0 #1f2d89, 4px 2px 0 #1f2d89, 4px -2px 0 #1f2d89, -4px -2px 0 #1f2d89, -4px 2px 0 #1f2d89, 4px 1px 0 #1f2d89, 4px -1px 0 #1f2d89, -4px -1px 0 #1f2d89, -4px 1px 0 #1f2d89, 4px 0px 0 #1f2d89, 4px 0px 0 #1f2d89, -4px 0px 0 #1f2d89, -4px 0px 0 #1f2d89, 3px 4px 0 #1f2d89, 3px -4px 0 #1f2d89, -3px -4px 0 #1f2d89, -3px 4px 0 #1f2d89, 3px 3px 0 #1f2d89, 3px -3px 0 #1f2d89, -3px -3px 0 #1f2d89, -3px 3px 0 #1f2d89, 3px 2px 0 #1f2d89, 3px -2px 0 #1f2d89, -3px -2px 0 #1f2d89, -3px 2px 0 #1f2d89, 3px 1px 0 #1f2d89, 3px -1px 0 #1f2d89, -3px -1px 0 #1f2d89, -3px 1px 0 #1f2d89, 3px 0px 0 #1f2d89, 3px 0px 0 #1f2d89, -3px 0px 0 #1f2d89, -3px 0px 0 #1f2d89, 2px 4px 0 #1f2d89, 2px -4px 0 #1f2d89, -2px -4px 0 #1f2d89, -2px 4px 0 #1f2d89, 2px 3px 0 #1f2d89, 2px -3px 0 #1f2d89, -2px -3px 0 #1f2d89, -2px 3px 0 #1f2d89, 2px 2px 0 #1f2d89, 2px -2px 0 #1f2d89, -2px -2px 0 #1f2d89, -2px 2px 0 #1f2d89, 2px 1px 0 #1f2d89, 2px -1px 0 #1f2d89, -2px -1px 0 #1f2d89, -2px 1px 0 #1f2d89, 2px 0px 0 #1f2d89, 2px 0px 0 #1f2d89, -2px 0px 0 #1f2d89, -2px 0px 0 #1f2d89, 1px 4px 0 #1f2d89, 1px -4px 0 #1f2d89, -1px -4px 0 white, -1px 4px 0 #1f2d89, 1px 3px 0 #1f2d89, 1px -3px 0 #1f2d89, -1px -3px 0 #1f2d89, -1px 3px 0 #1f2d89, 1px 2px 0 #1f2d89, 1px -2px 0 #1f2d89, -1px -2px 0 #1f2d89, -1px 2px 0 #1f2d89, 1px 1px 0 #1f2d89, 1px -1px 0 #1f2d89, -1px -1px 0 #1f2d89, -1px 1px 0 #1f2d89, 1px 0px 0 #1f2d89, 1px 0px 0 #1f2d89, -1px 0px 0 #1f2d89, -1px 0px 0 #1f2d89, 0px 4px 0 #1f2d89, 0px -4px 0 #1f2d89, 0px -4px 0 #1f2d89, 0px 4px 0 #1f2d89, 0px 3px 0 #1f2d89, 0px -3px 0 #1f2d89, 0px -3px 0 #1f2d89, 0px 3px 0 #1f2d89, 0px 2px 0 #1f2d89, 0px -2px 0 #1f2d89, 0px -2px 0 #1f2d89, 0px 2px 0 #1f2d89, 0px 1px 0 #1f2d89, 0px -1px 0 #1f2d89, 0px -1px 0 #1f2d89, 0px 1px 0 #1f2d89;
    padding-top: 150px;
    box-sizing: border-box;
}
.productShieldPage .user-introduction img {
    width: 80%; 
}
.productShieldPage  .link-list{
    width: 60%;
    margin: 0 auto;
    text-align: left;
    padding: 0 25px;
    box-sizing: border-box;
    margin-top: -100px;

}
.productShieldPage  .link-list p a{
    font-size: 28px;
    line-height: 56px;
}
.productShieldPage .user-intrduce{
   width: 100%;
}
.productShieldPage .user-intrduce img{
    width: 100%;
}
/* CAC介绍 */
.productShieldPage .CAC-list{
    width: 100%;
    text-align: center;
}
.productShieldPage .CAC-list img{
    width: 90%;
}
.productShieldPage .CAC-list .list6{
    width: 100%;
    height: 528px;
    background: url('https://oss.sxyweb.com.cn/2021/wj/SANMED/PC/productShield/09.png') center no-repeat;
    background-size: 100% 100%;
    padding-top: 57px;
    box-sizing: border-box;
    margin-top: 157px;
}
.productShieldPage .CAC-list .list6 p{
    font-size: 65px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #233a7e;
    line-height: 119px;
}
.productShieldPage .CAC-list .list7{
    width: 79%;
    margin-top: 53px;
    margin: 0 auto;
}
.productShieldPage .CAC-list .list7 p{
   font-size: 46px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 72px;
}
.productShieldPage .CAC-list .list8{
    width: 79%;
    margin-top: 53px;
    margin: 0 auto;
    margin-top: 47px;
}
.productShieldPage  .CAC-text-list{
    width: 72%;
    margin: 0 auto;
    box-sizing: border-box;
    text-align: left;
}
.productShieldPage  .CAC-text-list p{
    font-size: 36px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #000000;
    line-height: 40px;
}

.productShieldPage  .CAC-text-list i{
    width: 10px;
    height: 10px;
    background: lightseagreen;
    border-radius: 100%;
    float: left;
    margin-top: 15px;
    margin-right: 10px;
}
.productShieldPage  .CAC-text-list p span{
    color: #4eb7ba;
}
.productShieldPage  .CAC-text-list div{
    font-size: 22px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #000000;
    line-height: 40px;
}
.productShieldPage  .list9{
    width: 100%;
    height: 528px;
    background: url('https://oss.sxyweb.com.cn/2021/wj/SANMED/PC/productShield/12.png') center no-repeat;
    background-size: 100% 100%;
    margin-top: 72px;
    padding-top: 70px;
    box-sizing: border-box;
}
.productShieldPage  .list9 p{
    font-size: 65px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    text-align: center;
    color: #000052;
    line-height: 119px;
    text-shadow: 4px 4px 0 white, 4px -4px 0 white, -4px -4px 0 white, -4px 4px 0 white, 4px 3px 0 white, 4px -3px 0 white, -4px -3px 0 white, -4px 3px 0 white, 4px 2px 0 white, 4px -2px 0 white, -4px -2px 0 white, -4px 2px 0 white, 4px 1px 0 white, 4px -1px 0 white, -4px -1px 0 white, -4px 1px 0 white, 4px 0px 0 white, 4px 0px 0 white, -4px 0px 0 white, -4px 0px 0 white, 3px 4px 0 white, 3px -4px 0 white, -3px -4px 0 white, -3px 4px 0 white, 3px 3px 0 white, 3px -3px 0 white, -3px -3px 0 white, -3px 3px 0 white, 3px 2px 0 white, 3px -2px 0 white, -3px -2px 0 white, -3px 2px 0 white, 3px 1px 0 white, 3px -1px 0 white, -3px -1px 0 white, -3px 1px 0 white, 3px 0px 0 white, 3px 0px 0 white, -3px 0px 0 white, -3px 0px 0 white, 2px 4px 0 white, 2px -4px 0 white, -2px -4px 0 white, -2px 4px 0 white, 2px 3px 0 white, 2px -3px 0 white, -2px -3px 0 white, -2px 3px 0 white, 2px 2px 0 white, 2px -2px 0 white, -2px -2px 0 white, -2px 2px 0 white, 2px 1px 0 white, 2px -1px 0 white, -2px -1px 0 white, -2px 1px 0 white, 2px 0px 0 white, 2px 0px 0 white, -2px 0px 0 white, -2px 0px 0 white, 1px 4px 0 white, 1px -4px 0 white, -1px -4px 0 white, -1px 4px 0 white, 1px 3px 0 white, 1px -3px 0 white, -1px -3px 0 white, -1px 3px 0 white, 1px 2px 0 white, 1px -2px 0 white, -1px -2px 0 white, -1px 2px 0 white, 1px 1px 0 white, 1px -1px 0 white, -1px -1px 0 white, -1px 1px 0 white, 1px 0px 0 white, 1px 0px 0 white, -1px 0px 0 white, -1px 0px 0 white, 0px 4px 0 white, 0px -4px 0 white, 0px -4px 0 white, 0px 4px 0 white, 0px 3px 0 white, 0px -3px 0 white, 0px -3px 0 white, 0px 3px 0 white, 0px 2px 0 white, 0px -2px 0 white, 0px -2px 0 white, 0px 2px 0 white, 0px 1px 0 white, 0px -1px 0 white, 0px -1px 0 white, 0px 1px 0 white;
}
.productShieldPage  .list10{
    margin-top: 62px;
    width: 72%;
    margin: 0 auto;
}
.productShieldPage  .list10 p:nth-of-type(1){
    margin-top: 42px;
}
.productShieldPage  .list10 p{
    font-size: 46px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 72px;
    letter-spacing: -1px;
}
.productShieldPage  .list10 .compare{
    margin-top: 71px;
}
.productShieldPage  .list10 .compare p{
    font-size: 41px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #4eb7ba;
    line-height: 61px;
}
.productShieldPage  .list10 .compare p:nth-of-type(2){
    color: #000;
}
.productShieldPage  .list11{
    margin-top: 72px;
    width: 79%;
    margin: 0 auto;
}
.productShieldPage .CAC-list  .list11 p{
  font-size: 37px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: center;
    color: #231815;
    margin-top: 49px;
    padding: 28px;
    box-sizing: border-box;
}
.productShieldPage .CAC-list  .judge{
    width: 79%;
    margin: 0 auto;
    border-top: 3px dashed #4eb7ba;
    margin-top: 89px;
    padding-top: 68px;
    box-sizing: border-box;
}
.productShieldPage .CAC-list  .judge p{
    font-size: 46px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #4eb7ba;
    line-height: 72px;
    letter-spacing: -2px;
}
.productShieldPage .CAC-list  .judge div{
    font-size: 24px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #282828;
    line-height: 222px;
    letter-spacing: -1px;
}
.productShieldPage .CAC-list  .list12{
    width: 79%;
    margin:0 auto;
    
}
.productShieldPage .CAC-list  .list12 img{
    width: 100%;
}
.productShieldPage .maskModle{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 1005;
}
.productShieldPage .call-us-box{
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
.productShieldPage .call-us-list{
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
.productShieldPage .call-us-list .cross{
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
.productShieldPage .call-us-list .list:nth-of-type(1){
    margin-top: 0;
}
.productShieldPage .call-us-list .list{
    position: relative;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 42px;
    display: grid;
    grid-template-columns: 20% 80%;
}
.productShieldPage .call-us-list .list input{
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
.productShieldPage .call-us-list .list span{
    font-size: 28px;
    color: #4eb7ba;
    position: absolute;
    left: 5vw;
    top: 2.2vh;
}
.productShieldPage .call-us-list .list textarea{
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
.productShieldPage .call-us-box .health-manager{
    display: flex;
    margin-top: 10px;
}
.productShieldPage .call-us-box .health-manager div{
    flex: 1;
    text-align: left;
}
.productShieldPage .call-us-box .health-manager div:nth-of-type(1) img{
    width: 232px;
    margin-left: 36px;
}
.productShieldPage .call-us-box .health-manager-right p, .productShieldPage .call-us-box .health-manager-right p a{
    font-size: 28px;
    color: #4eb7ba;
    margin-top: 50px;
    margin-left: -30px;
    font-weight: 700;
}
.productShieldPage .call-us-box .submit-list button{
    padding: 13px 40px;
    border: 2pt solid #d3d8d8;
    border-radius: 40px;
    background: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 28px;
    color: #4eb7ba;
}
.productShieldPage .call-us-box  input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
    color: rgb(78, 183, 186);
}
.productShieldPage .call-us-box  input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.productShieldPage.call-us-box  input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
    color: rgb(78, 183, 186)
}
.productShieldPage .health-manager-title{
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
.img-list-content{
    width: 100%;
    margin-top: 40px;
}
.img-list-content img{
    width: 100%;
} 
.video-box{
    width: 60%;
    margin: 40px auto;
}
.video-box video{
    width: 100%;
}
.link-URL{
    width: 100%;
    margin: 4vw 0;
}   
.link-URL a{
    font-size: 36px;
    color: #5e5e5e;
}
</style>