<template>
        <div class="indexPage-content">
            <div class="header-content-box">
                <div class="header-box">
                <div class="header-list">
                    <h1>
                        <img src="@/assets/img/page1/logo.png" alt="" srcset="">
                    </h1>
                    <div class="menu-list">
                    <p><router-link :to="{path:'/shield',query: {name: 1}}">技术详情</router-link></p>
                    <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
                    <p @click="goUserPage()">个人中心</p> 
                    <p @click="callUs()">联系我们</p>
                </div>
                </div>
                <div class="header-swiper">
                    <el-carousel  height="94rem"  class="container">
                        <el-carousel-item v-for="item in swiperSliderArr" :key="item.id">
                            <img :src="item.bannerurl" alt="" srcset="" @click="goPage(item.index)">
                        </el-carousel-item>
                    </el-carousel> 
                </div>
            </div>、
        </div>

        <!-- 检查 -->
        <div class="inspect-box">
            <div class="inspect">
                <h6>发现肺结节，担心是肺癌？</h6>
                <div class="title">点击自测，评估结节恶性风险</div>
                <div class="list" @click="testingChange()">
                    <p class="p1">肺结节尺寸<br/>在5-30mm之间？</p>
                    <p class="p2">吸烟或者<br/>被动吸二手烟？</p>
                    <p class="p3">有肿瘤家史、<br/> 慢阻肺病史、<br/> 肺结核病史？</p>
                   <div class="ziceImg-box">
                        <img src="@/assets/img/page1/ziceBg2.png" class="transition-box" alt="" srcset="">
                        <img  class="circle" src="@/assets/img/index/iconPoirt.png" alt="" srcset="">
                        <img  class="finger" src="@/assets/img/index/poirt.png" alt="" srcset="">
                    </div> 
                    <span class="spot"></span>
                </div>
                <!-- <div class="tip">温馨提示&nbsp;:&nbsp; &nbsp;如果您符合以上条件之一或者以上，请马上进入自测</div> -->
            </div>
        </div>
      
        <!-- 视频 -->
        <div  class="video-box">
            <h6>产品介绍</h6>
            <el-carousel  height="80rem" @change="videoChange"  class="container" :autoplay="false" arrow='always' >
                <el-carousel-item>
                    <video-player class="video-player vjs-custom-skin" 
                        ref="videoPlayer1" 
                        :playsinline="true" 
                        :options="playerOptions1"
                        id="video-player"
                    >
                    </video-player>
                </el-carousel-item>
                <el-carousel-item>
                    <video-player class="video-player vjs-custom-skin" 
                        ref="videoPlayer2" 
                        :playsinline="true" 
                        :options="playerOptions2"
                        id="video-player"
                    >
                    </video-player>
                </el-carousel-item>
            </el-carousel> 
            
        </div>

        <!-- 专家推荐 -->
        <div class="expert-recommendation-box">
            <div class="expert-recommendation">
                <h6>专家推荐</h6>
                <el-carousel @change="swiperChange"  :interval="4000" type="card" indicator-position="none"  height="120rem" :autoplay="true">
                    <el-carousel-item v-for="item in zhuanjialist" :key="item.index">
                        <div class="content-box">
                            <div class="list listImg1">
                                <img :src="item.photourl" alt="" srcset="">
                            </div>
                        </div>
                    </el-carousel-item>
                    <div v-for="(item,index) in textContent" :key="index">
                        <div class="text-content"  v-show="index == selectIndex">
                            <h6 class="user-name" v-html="item.name"></h6>
                            <p v-if="item.title0">{{item.title0}}</p>
                            <p>
                                {{item.title1}}
                            </p>
                            <p>
                                {{item.title2}}
                            </p>
                            <p>
                                {{item.title3}}
                            </p>
                            <p v-if="item.title4">
                                {{item.title4}}
                            </p>
                            <p style="text-align:left;margin-top:4vw">
                                {{item.content}}
                            </p>
                        </div>
                    </div>
                    
                </el-carousel>
                <div class="bg-left"></div>
                <div class="bg-right"></div>
            </div>
        </div>

        <!-- CAC检测 -->
        <div class="cac-testing-box">
            <div class="cac-testing">
                <h6>CAC检测国际顶尖肺癌早诊技术</h6>
                <div class="content" v-for="item in footerList" :key="item.index">
                      <img class="bg1" :src="item.bannerurl" alt="" srcset="">  
                      <div class="pos1 postList"  @click="goPageProductDetail('2')">
                         
                      </div>
                      <div class="pos2 postList" @click="goPageProductDetailS('1')">
                          
                      </div>
                      <div class="pos3 postList" @click="goPageShield()">
                          
                      </div>
                      <div class="pos4 postList" @click="goPageProductDetail('1')">
                          
                      </div>
                </div>
            </div>
        </div>
        <div class="payBtnFiexd">
            <img @click="payWx()" class="payBTN" src="@/assets/img/index/payBtn.png?v=1" alt="" srcset="">
        </div>
        <!-- 友情链接 -->
        <div class="join-subscription-box">
            <div class="join-subscription">
               友情链接&nbsp;:&nbsp;&nbsp; <a href="http://www.mhn24.com/"> <img src="@/assets/img/userFeedback/logo.png" alt="" srcset="">中国肺癌防治联盟官网</a>
            </div>
        </div>
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
import Swiper from "swiper/swiper-bundle.min.js"
import "swiper/swiper-bundle.min.css"
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import qs from 'qs'
export default {
    name:'index',
    data(){
        return{
            swiperSliderArr:[
                {url: require("@/assets/img/page1/slider0.png"),index:'slider0'},
                {url: require("@/assets/img/page1/slider1.png"),index:'slider1'},
                {url: require("@/assets/img/page1/slider2.png"),index:'slider2'},
                {url: require("@/assets/img/page1/slider3.png"),index:'slider3'},
            ],
            playerOptions1: {
                //playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false, // 如果为true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: true, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'en-US',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4", // 类型
                src: 'https://oss.sxyweb.com.cn/2021/wj/SANMED/IMG_1838.MP4' // url地址
                }],
                poster: '', // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: true, // 是否显示剩余时间功能
                    fullscreenToggle: true // 是否显示全屏按钮
                }
            },
             playerOptions2: {
                //playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false, // 如果为true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: true, // 是否视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'en-US',
                aspectRatio: '4:3', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                type: "video/mp4", // 类型
                src: 'https://oss.sxyweb.com.cn/2021/wj/SANMED/IMG_1566.mp4' // url地址
                }],
                poster: '', // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true, // 当前时间和持续时间的分隔符
                    durationDisplay: true, // 显示持续时间
                    remainingTimeDisplay: true, // 是否显示剩余时间功能
                    fullscreenToggle: true // 是否显示全屏按钮
                }
            },
            selectIndex:0,
            selectIndex:0,
            textContent:[
                {
                    key:'0',
                    name:'白春学&nbsp; &nbsp;教授',
                    title0:'复旦大学附属中山医院  呼吸科  主任医师',
                    title1:'中国肺癌防治联盟主席',
                    title2:'国际智能健康联盟主席',
                    title3:'上海呼吸病研究所所长',
                    title4:'复旦大学呼吸病研究所所长',
                    content:'“由我们中山医院牵头进行的中国多中心临床研究显示：CAC检测针对IA期肺癌准确率近80%，联合人工智能影像判读（CT A.I.）准确率能达到90%以上，可作为肺癌早诊的有效补充手段，从而提高中国肺癌治疗的五年生存率，甚至十年生存率。”',
                },
                {
                    key:'1',
                    name:'王悦虹&nbsp; &nbsp;教授',
                    title1:'浙江大学医学院附属第一医院 呼吸科 主任医师',
                    title2:'美国MD Anderson癌症中心访问学者',
                    title3:'中国医师协会呼吸医师分会肺癌工作组委员',
                    content:'“CAC检测结合人工智能影像判读（CT A.I.）总体诊断效能针对10mm以下结节，准确率能够达到90%以上，可以帮助临床有效鉴别肺结节良恶性，及早确诊避免延误治疗，挽救患者生命。”'
                },
                 {
                    key:'2',
                    name:'刘红&nbsp; &nbsp;教授',
                    title1:'郑州大学第一附属医院 呼吸与危重症医学二科 主任医师',
                    title2:'中国医师协会呼吸病学分会肺癌学组委员',
                    title3:'中华医学会河南省呼吸病学分会委员',
                    content:'“肺结节的规范诊治极具挑战性，需要影像、活检等多维度信息，综合评估患者的肺结节恶性概率。传统诊疗手段+新技术辅助肺结节良恶性准确鉴别（如：CAC检测、CT A.I.等），为临床提供有效的决策参考，有其积极且深远的应用价值。”'
                },

            ],
            zhuanjialist:[],
            footerList:[],
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            }
        }
    },
    components: {
        videoPlayer
    },
    mounted(){
        if (this._isMobile()) {
            window.location.href = 'https://cac.sanmedgene.com/SANMEDH5/index.html#/index';
        } else {
            window.location.href = 'https://cac.sanmedgene.com/SANMEDPC/index.html#/index';
        }
        new Swiper(".swiper-container",{
            loop:true, //循环
            pagination: { //分页符
                el: '.swiper-pagination',
            },
        });
        this.getInitList();
    },
    methods:{
        _isMobile(){
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            return flag;
        },
        //获取列表
        getInitList(){
            let that = this;
            that.axios.get('gethomecontent')
            .then(function (res) {
            console.log(res.data);
            if(res.status == 200 ){
                if(res.data){
                    that.listData = res.data;
                    if(res.data.banner && res.data.banner.length>0){
                        that.swiperSliderArr = res.data.banner
                    };
                    if(res.data.video){
                        that.playerOptions2['sources'][0]['src'] = res.data.video;
                    };
                    if(res.data.zhuanjialist && res.data.zhuanjialist.length>0){
                        that.zhuanjialist = res.data.zhuanjialist;
                        console.log(that.zhuanjialist);
                    };
                    if(res.data.footer && res.data.footer.length>0){
                        that.footerList = res.data.footer;
                    }
                    
                }else{
                    that.$message.error(res.data.msg);
                }
            }else{
                that.$message({
                message: '服务异常请稍后重试！',
                type: 'warning'
                });
            }
            })
        },
        //视频切换
        videoChange(item){
            console.log(item);
            this.$refs.videoPlayer1.player.pause() // 暂停
            this.$refs.videoPlayer2.player.pause() // 暂停
        },
        //获取专家下标
        swiperChange(item){
            this.selectIndex = item;
        },
        onSwiper(swiper) {
            console.log(swiper);
        },
        onSlideChange() {
            console.log('slide change');
        },
        //轮播图跳转详情页
        goPage(index){
            this.$router.push({path:'/productDetail',query:{listChange:'1'}});
        },
        //自测
        testingChange(id){
            let tel = localStorage.getItem('tel');
            if(!tel || tel==''){
                this.$confirm('此操作需要您进行登录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                    }).then(() => {
                        this.$router.push({path:'/login'});
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消登录'
                    });          
                });
            }else{
                this.$router.push({path:'/question',query:{id:id}});
            };
        },
        
        goPageProductDetail(listChange){
            this.$router.push({path:'/productDetail',query:{listChange:listChange}});
        },

        goPageProductDetailS(listChange){
            this.$router.push({path:'/productDetail',query:{listChange:listChange}});
        },

        goPageShield(){
           this.$router.push({path:'/shield'});
        },
         //支付
        payWx(){
            this.$router.push('/productDetail');
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
<style>
    .indexPage-content .header-content-box{
        width: 100%;
        background-size: 50% 50%;
        background-color: #ebf6f6;
    }
    .indexPage-content .header-box{
        width: 1705px;
        margin:0 auto;
        display: flex;
        background: #ebf6f6;
        background-position: -10px 0;
    }
    .indexPage-content .header-box .header-list{
        width: 398px;
        text-align: right;
        margin-right: 10px;
    }
    .indexPage-content .header-box .header-list h1{
        margin-top: 100px;
    }
    .indexPage-content .header-box .header-list h1 img{
        width: 175px;
        height: 76px;
    }
    .header-box .menu-list{
        margin-top: 165px;
    }
    .indexPage-content .header-box .menu-list p{
        height: 70px;
        line-height: 70px;
        text-align: center;
        border-top: 1px solid #919191;
        margin: 0;
        padding: 0;
        margin-left: 210px;
        font-size: 38px;
        cursor: pointer;
        color: #6e6e6e;
    }
    .indexPage-content .header-box .menu-list p:nth-last-of-type(1){
        border-bottom: 1px solid #919191;
    }
    .indexPage-content .header-box .header-swiper{
        width: 1200px;
        padding-left: 70px;
    }
    .indexPage-content .header-box .header-swiper img{
        width: 100%;
        margin-left: -1px;
        cursor: pointer;
    }
    .indexPage-content .header-box .header-swiper .el-carousel__indicators--horizontal{
        bottom: 7rem;
        left: 45%;
    }
    .indexPage-content .header-box .header-swiper .el-carousel__indicators--horizontal li{
        width: 18px;
        height: 18px;
        background: #dfdfdf;
        border-radius: 100%;
        margin: 0 35px;
        padding: 0;
    }
    .indexPage-content .header-box .header-swiper .el-carousel__indicators--horizontal .is-active{
        background: #43b9f6;
        width: 18px;
        height: 18px;
    }
    .indexPage-content .header-box .header-swiper .el-carousel__indicators--horizontal .el-carousel__button{
        height: 0;
    }


    /* 检查 */
    .indexPage-content .inspect-box {
        width: 100%;
        margin: 0 auto;
        height: auto;
        margin-top: 50px;
    }
    .indexPage-content .inspect-box .inspect{
        width: 1395px;
        height: auto;
        margin: 0 auto;
    }
    .indexPage-content .inspect-box .inspect h6{
        font-size: 60px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        text-align: center;
        color: #4eb7ba;
        position: relative;
    }
    .indexPage-content .inspect-box .inspect h6::before{
        position: absolute;
        content: '';
        width: 320px;
        height: 3px;
        background: #4eb7ba;
        left: 0;
        top: 40px;
    }
    .indexPage-content .inspect-box .inspect h6::after{
        position: absolute;
        content: '';
        width: 350px;
        height: 3px;
        background: #4eb7ba;
        right: 0;
        top: 40px;
    }
    .indexPage-content .inspect-box .inspect .title{
        font-size: 42px;
        margin-top: 32px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: center;
        color: #808080;
    }
    .indexPage-content .inspect-box .inspect .list{
        position: relative;
    }

    .indexPage-content .inspect-box .inspect .ziceImg-box{
        width: 100%;
        margin: 0 auto;
        margin-top: 30px;
        position: relative;
        cursor: pointer;
    }
    .indexPage-content .inspect-box .inspect .ziceImg-box .circle{
        width: 60px;
        position: absolute;
        left: 48%;
        top: 65%;
        animation: circleHide 2s ease infinite both;
    }
    .indexPage-content .inspect-box .inspect .ziceImg-box .finger{
        width: 60px;
        position: absolute;
        left: 49%;
        top: 78%;
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
    @keyframes circleHide {
        0% {
            opacity: 1;
            transform: scale3d(1, 1, 1);
        }
        70% {
            opacity: 0;
            transform: scale3d(0, 0, 0);
        }
        100% {
            opacity: 1;
            transform: scale3d(1.5, 1.5, 1.5);
        }
    }
    .indexPage-content .inspect-box .inspect .ziceImg-box img{
        width: 100%;
        height: auto;
    }
    .indexPage-content .inspect-box .inspect .list p{
        flex: 1;
        font-size: 30px;
        line-height: 50px;
        position: absolute;
        text-align: left;
        cursor: pointer;
        color: #6e6e6e;
    }
    .indexPage-content .inspect-box .inspect .list .p1{
       left: 132px;
       top: 175px;
       /* animation-name: example;
       animation-duration: 30s;
       animation-iteration-count: infinite; */
       text-align: center;
     
    }
    .indexPage-content .inspect-box .inspect .list .p2{
       left: 610px;
       top: 175px;
       text-align: center;
        /* animation-name: example;
       animation-duration: 20s;
       animation-iteration-count: infinite; */
    }
    .indexPage-content .inspect-box .inspect .list .p3{
       left: 1078px;
       top: 175px;
        text-align: center;
       /* animation-name: example;
       animation-duration: 10s;
       animation-iteration-count: infinite; */
    }
    .indexPage-content .inspect-box .inspect .list .spot{
        width: 30px;
        height: 30px;
        background:#fff;
        border-radius: 100%;
        position: absolute;
        left: 1365px;
        top: 280px;
        display: block;
        animation-name: sport;
        animation-duration: 10s;
        animation-iteration-count: infinite;
    }
    @keyframes example {
        0%   {opacity: 0;}
        25%  {opacity: 0.3;}
        50%  {opacity: 0.5;}
        100% {opacity: 1;}
    }

    @keyframes sport {
        0% {left: 10px;top: 275px;}
        3% {left: 15px;top: 316px;}
        6% {left: 35px;top: 360px;}
        9% {left: 70px;top: 400px;}
        12% {left: 110px;top: 420px;}
        15% {left: 150px;top: 450px;}
        18% {left: 195px;top: 455px;}
        21% {left: 245px;top: 455px;}
        24% {left: 295px;top: 445px;}
        27% {left: 345px;top: 425px;}
        30% {left: 385px;top: 400px;}
        33% {left: 415px;top: 365px;}
        36% {left: 445px;top: 325px;}
        39% {left: 475px;top: 135px;}
        42% {left: 495px;top: 90px;}
        45% {left: 535px;top: 60px;}
        47% {left: 575px;top: 30px;}
        50% {left: 615px;top: 10px;}
        53% {left: 660px;top: 0px;}
        56% {left: 710px;top: 0px;}
        59% {left: 760px;top: 10px;}
        62% {left: 800px;top: 30px;}
        65% {left: 835px;top: 50px;}
        68% {left: 865px;top: 80px;}
        71% {left: 900px;top: 125px;}
        74% {left: 930px;top: 325px;}
        77% {left: 955px;top: 365px;}
        80% {left: 1025px;top: 425px;}
        83% {left: 1070px;top: 445px;}
        86% {left: 1110px;top: 455px;}
        89% {left: 1210px;top: 445px;}
        92% {left: 1260px;top: 425px;}
        94% {left: 1300px;top: 400px;}
        96% {left: 1330px;top: 350px;}
        98% {left: 1350px;top: 325px;}
        100% {left: 1365px;top: 280px;}
    }
    /* .inspect-box .inspect .tip{
        width: 50%;
        height: 58px;
        background: #317fcc;
        color: #fff;
        font-size: 24px;
        margin: 0 auto;
        line-height: 58px;
        margin-top: 67px;
        border-radius: 60px;
        padding:  0 40px;
    } */

    /* 视频 */
    .indexPage-content .video-box{
        width: 50%;
        margin:0 auto;
        margin-top: 114px;
    }
    .indexPage-content .video-box .video-js .vjs-play-progress:before{
        top: -1em;
    }
    .indexPage-content .video-box .video-player{
        width: 100%;
        background: #ebf4f3;
        border-radius: 90px;
    }
    .indexPage-content .video-box .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3{
        background: #ebf4f3;
        border-radius: 90px;
    }
    .indexPage-content .video-box .video-js .vjs-big-play-button{
        width: 6rem;
        height: 6rem;
        border-radius: 100%;
        left: 48%;
        top: 45%;
        font-size: 5rem;
        line-height: 5rem;
    }
    .indexPage-content .video-box .el-carousel__arrow {
        top: 50%;
    }
    .indexPage-content .video-box .video-js .vjs-tech{
        border-radius: 90px;
    }
    .indexPage-content .video-box .video-js .vjs-control-bar{
        bottom: 98px;
    }
    .indexPage-content .video-box h6{
        font-size: 60px;
        color: #4eb7ba;
        width: 100%;
        text-align: center;
        margin-bottom: 42px;
        position: relative;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        color: #4eb7ba;
    }
    .indexPage-content .video-box h6::before{
        content: '';
        height: 3px;
        width: 520px;
        background: #4eb7ba;
        position: absolute;
        left: 0;
        top: 35px;
    }
     .indexPage-content .video-box h6::after{
        content: '';
        height: 3px;
        width: 520px;
        background: #4eb7ba;
        position: absolute;
        right: 0;
        top: 35px;
    }
    /*专家推荐 */
    .indexPage-content .expert-recommendation-box{
        width: 100%;
        height: auto;
        padding: 0;
        padding-top: 306px;
        background:url('../assets/img/page1/userbg.png') center no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        margin: 0;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation{
        width: 1890px;
        height: 47vw;
        margin:  0 auto;
        background: ora;
    }
    .indexPage-content .expert-recommendation h6{
        width: 1395px;
        margin: 0 auto;
        font-size: 60px;
        color: #4eb7ba;
        text-align: center;
        margin-bottom: 62px;
        font-family: SourceHanSansCN, SourceHanSansCN-Bold;
        font-weight: 700;
        color: #4eb7ba;
        position: relative;
    }
    .indexPage-content .expert-recommendation .user-name::before{
        background: #282828;
        height: 1px;
    }
    .indexPage-content .expert-recommendation .user-name::after{
        background: #282828;
        height: 1px;
    }
    .indexPage-content .expert-recommendation h6::before{
        content: '';
        position: absolute;
        width: 520px;
        height: 3px;
        background: #4eb7ba;
        top: 35px;
        left: 0;
    }
    .indexPage-content .expert-recommendation h6::after{
        content: '';
        position: absolute;
        width: 520px;
        height: 3px;
        background: #4eb7ba;
        top: 35px;
        right: 0;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item:nth-child(2n) {
        background-color: transparent;
        
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item:nth-child(2n+1) {
        background-color: transparent;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active .list{
        background: #e2f0d2;
        border-radius: 100%;
        margin:  0 auto;
        width: 560px;
        text-align: center;
        line-height: 592px;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active{
        width: 560px;
        height: 560px;
        border-radius: 100%;
        transform: translateX(47.5rem) scale(1) !important;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active img{
        width: 436px;
        height: 532px;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation  .list img{
        width: 345px;
        height: 414px;
        vertical-align: middle;
        z-index: 10000;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active .listImg1 img{
        margin-bottom: 0px;
        margin-right: 35px;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active .listImg2 img{
        margin-bottom: 12px;
        margin-right: 12px;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__item--card.is-active .listImg3 img{
        margin-bottom: -10px;
        margin-right: 5px;
    }
    .indexPage-content .expert-recommendation-box .expert-recommendation .el-carousel__mask{
        background: transparent;
    }
    .indexPage-content .expert-recommendation-box{
        position: relative;
    }
    .indexPage-content .expert-recommendation-box .text-content{
        height: 922px;
        width: 80%;
        position: absolute;
        top: 600px;
        left: 10%;
        z-index: 1000;
        padding: 0 90px;
        box-sizing: border-box;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .indexPage-content .expert-recommendation .bg-left{
        width: 550px;
        height: 510px;
        background: url('../assets/img/page1/swiperLeft.png');
        background-size: 100% 100%;
        /* background-position: 12px -140px; */
        position: absolute;
        left:520px;
        top: 465px;
        z-index: 0;
    }
    .indexPage-content .expert-recommendation .bg-right{
        width: 550px;
        height: 510px;
        background: url('../assets/img/page1/swiperRight.png') ;
        background-size: 100% 100%;
        position: absolute;
        right:520px;
        top: 465px;
        z-index: 0;
    }
    .indexPage-content .expert-recommendation-box  .el-carousel{
        overflow: hidden;
    }
    .indexPage-content .expert-recommendation-box  .text-content h6{
        font-size: 40px;
        color: #6e6e6e;
        margin-top: 45px;
        font-weight: 400;
    }
    .indexPage-content .expert-recommendation-box .text-content p{
        font-size: 40px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: center;
        color: #6e6e6e;
        line-height: 1.5;
        letter-spacing: 3px;
    }

    .indexPage-content .expert-recommendation-box  .el-carousel__arrow--left{
        display: block !important;
        width: 500px;
        height: 500px;
        background:transparent !important;
        top: 295px;
        left: 130px;
        z-index: 1000;
        content: none;
    }
    .indexPage-content .expert-recommendation-box  .el-carousel__arrow--left i{
        display: none;
    }

    .indexPage-content .expert-recommendation-box  .el-carousel__arrow--right{
        display: block !important;
        width: 500px;
        height: 500px;
        background:transparent !important;
        top: 295px;
        right: 125px;
        z-index: 1000;
        content: none;
    }
    .indexPage-content .expert-recommendation-box  .el-carousel__arrow--right i{
        display: none;
    }

    /* CAC检测 */
    .indexPage-content .cac-testing-box{
        width: 50%;
        height: auto;
        margin: 0 auto;
        margin-top: 18vw;
    }
    .indexPage-content .cac-testing-box .cac-testing{
        width: 100%;
        margin: 0 auto;
        text-align: center;
    }
    .indexPage-content .cac-testing-box .cac-testing h6{
        font-size: 60px;
        color: #4eb7ba;
        width: 100%;
        text-align: center;
        margin-bottom: 42px;
        font-weight: 700;
        position: relative;
    }
    .indexPage-content .cac-testing-box .cac-testing h6::before{
        content: '';
        width: 220px;
        height: 3px;
        background: #4eb7ba;
        position: absolute;
        left: 0;
        top: 35px;
    }
    .indexPage-content .cac-testing-box .cac-testing h6::after{
        content: '';
        width: 220px;
        height: 3px;
        background: #4eb7ba;
        position: absolute;
        right: 0;
        top: 35px;
    }
    .indexPage-content .cac-testing-box .cac-testing img{
        width: 100%;
        margin: 0 auto;
    }

    .indexPage-content .cac-testing-box .cac-testing .content{
        position: relative;
        height: auto;
        margin: 0 auto;

    }
    .indexPage-content .cac-testing-box .cac-testing .content .postList{
        position: absolute;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .pos1{
        width: 380px;
        height: 120px;
        top: 380px;
        left: 140px;
        text-align: right;
        border-radius: 30px;
        cursor: pointer;
        background: transparent;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .pos2{
        width: 380px;
        height: 120px;
        top: 608px;
        left: 792px;
        border-radius: 30px;
        cursor: pointer;
        background: transparent;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .pos3{
        width: 380px;
        height: 120px;
        top: 1140px;
        left: 150px;
        border-radius: 30px;
        cursor: pointer;
        background: transparent;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .pos4{
        width: 380px;
        height: 120px;
        top: 1360px;
        left: 830px;
        text-align:left;
        border-radius: 30px;
        cursor: pointer;
        background: transparent;
        
    }
    .indexPage-content .cac-testing-box .cac-testing .content .postList h3{
        font-size: 32px;
        margin-bottom: 24px;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .postList p{
        font-size: 24px;
        line-height: 30px;
        margin: 0;
        margin-top: 8px;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .postList button{
        padding: 5px 30px;
        background: #abc0d3;
        color: #fff;
        border: none;
        border-radius: 20px;
        font-size: 16px;
        margin-top: 30px;
        -webkit-animation:mymove 3s infinite; /*Safari and Chrome*/
        animation-direction:alternate;/*轮流反向播放动画。*/
        animation-timing-function: ease-in-out; /*动画的速度曲线*/
        /* Safari 和 Chrome */
        -webkit-animation:mymove 3s infinite;
        -webkit-animation-direction:alternate;/*轮流反向播放动画。*/
        -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
    }
    .indexPage-content .cac-testing-box .cac-testing .content .btn{
        width: 150px;
        height: 150px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        background: transparent;
        border: none;
        border-radius: 100%;
    }
    .indexPage-content .cac-testing-box .cac-testing .content .btn1{
         top: 120px;
         left: 960px;
     }
    .indexPage-content .cac-testing-box .cac-testing .content .btn2{
         top: 480px;
         left: 618px;
     }
    .indexPage-content .cac-testing-box .cac-testing .content .btn3{
         top: 598px;
         left: 1085px;
     }
    .indexPage-content .cac-testing-box .cac-testing .content .btn4{
         top: 940px;
         left: 720px;
     }

    .indexPage-content .cac-testing-box .cac-testing .content .btn img{
        width: 150px;
        height: 150px;
        z-index: 10000;
    }
  
    /* 友情链接 */
    .indexPage-content .join-subscription-box{
        width: 100%;
        margin-top: 100px;
    }
    .indexPage-content .join-subscription{
        width: 100%;
        height: 160px;
        background: #cce1de;
        text-align: center;
        cursor: pointer;
        font-size: 29px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        color: #282828;
        line-height: 160px;
    }
    .indexPage-content .join-subscription a{
        font-size: 29px;
        font-family: SourceHanSansCN, SourceHanSansCN-Normal;
        font-weight: Normal;
        text-align: center;
        color: #282828;
    }
    .payBtnFiexd img{
        width: 120px;
        position: fixed;
        right:30px;
        top: 45%;
        cursor: pointer;
    }
    .qrcode-bg{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.3;
    }
    .qrCode-box{
        width: 30%;
        height: 25%;
        ;background: #fff;
        position: fixed;
        top: 35%;
        left: 35%;
        z-index: 10009;
        display: flex;
        border-radius: 20px;
    }
    .qrCode-box div{
        flex: 1;
        text-align: left;
        margin-top: 40px;
        padding-left: 80px;
        box-sizing: border-box;
    }
    .qrCode-box .qrcode img{
       margin-top: 40px;
    }
    .pay-text{
        margin-left: 20px;
        color: royalblue;
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

    .indexPage-content .maskModle{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        opacity: 0.5;
        z-index: 1005;
    }
    .indexPage-content .call-us-box{
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
    .indexPage-content .call-us-list{
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
    .indexPage-content .call-us-list .cross{
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
    .indexPage-content .call-us-list .list:nth-of-type(1){
        margin-top: 0;
    }
    .indexPage-content .call-us-list .list{
        position: relative;
        padding: 0 30px;
        box-sizing: border-box;
        margin-top: 42px;
        display: grid;
        grid-template-columns: 20% 80%;
    }
    .indexPage-content .call-us-list .list input{
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
    .indexPage-content .call-us-list .list span{
        font-size: 28px;
        color: #4eb7ba;
        position: absolute;
        left: 5vw;
        top: 2.2vh;
    }
    .indexPage-content .call-us-list .list textarea{
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
    .indexPage-content .call-us-box .health-manager{
        display: flex;
        margin-top: 10px;
    }
    .indexPage-content .call-us-box .health-manager div{
        flex: 1;
        text-align: left;
    }
    .indexPage-content .call-us-box .health-manager div:nth-of-type(1) img{
        width: 232px;
        margin-left: 36px;
    }
    .indexPage-content .call-us-box .health-manager-right p, .indexPage-content .call-us-box .health-manager-right p a{
        font-size: 28px;
        color: #4eb7ba;
        margin-top: 50px;
        margin-left: -30px;
        font-weight: 700;
    }
    .indexPage-content .call-us-box .submit-list button{
        padding: 13px 40px;
        border: 2pt solid #d3d8d8;
        border-radius: 40px;
        background: #fff;
        margin-top: 20px;
        box-sizing: border-box;
        font-size: 28px;
        color: #4eb7ba;
    }
    .indexPage-content .call-us-box  input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
        color: rgb(78, 183, 186);
    }
    .indexPage-content .call-us-box  input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
        color: rgb(78, 183, 186)
    }
    .indexPage-content .call-us-box  input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
        color: rgb(78, 183, 186)
    }
    .indexPage-content .health-manager-title{
        color: rgb(78, 183, 186);
        font-size:28px;
        margin-left: 4vw;
        margin-top: 1vw;
        text-align: center;
    }
    .join-subscription a img{
        width: 50px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }
</style>