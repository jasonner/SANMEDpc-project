<template>
    <div class="resultPage">
        <div class="resultPage-box">
            <header>
                <div class="right">
                    <p><router-link :to="{path:'/index',query: {name: 1}}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
                    <p><router-link :to="{path:'/shield',query: {name: 1}}">技术详情</router-link></p>
                    <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
                    <p @click="goUserPage()">个人中心</p> 
                    <p @click="callUs()">联系我们</p>
                </div>
                <p>发现肺结节，担心是肺癌？</p>   
            </header>
            <div class="result-type">
                测试结果：
            </div>
            <div class="title" v-for="item in resultArr" :key="item.index">
                <button>{{item.type}}</button>
            </div>
            <div class="list-content">
                <div class="list-left">
                   
                    <div class="content-box">
                        <div class="type-box">
                            <img src="@/assets/img/result/type1.png"  v-if="type==1 || type==2" alt="" srcset="">
                            <img src="@/assets/img/result/type2.png"  v-if="type==3 " alt="" srcset="">
                            <img src="@/assets/img/result/type3.png"  v-if="type==5 || type==4" alt="" srcset=""> 
                        </div>
                        <div class="content-list" v-for="item in resultArr" :key="item.index">
                            <div class="title">{{item.title}}</div>
                            <p>{{item.tip}}</p>
                            <p v-html="item.content"></p>
                        </div>
                    </div>
                    <div class="reference-box">
                        <div class="reference-title">参考文献：</div>
                        <p>1、根据中国肺结节专家共识指南，建议将我国肺癌高危人群定义为年龄≥40岁且具有以下任一危险因素者：（1）吸烟≥ 20包年（或400年支），或曾经吸烟≥20包年（或400 年支），戒烟时间 &lt;15 年；（2）有环境或高危职业暴露史（如石棉、铍、铀、氡等接触者（3）合并慢阻 肺、弥漫性肺纤维化或既往有肺结核病史者；（4）既往罹患恶性肿瘤或有肺癌家族史者。</p>
                    </div>
                </div>
                <div class="list-right">
                    <img src="@/assets/img/result/callTeacher.png" alt="" srcset="">
                </div>
            </div>
            
            
        </div>
        <div class="maskModle" v-if="callUsShow"></div>
        <!-- 联系我们弹窗 -->
        <div class="call-us-box"  v-if="callUsShow">
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
import qs from 'qs'
export default {
    data(){
        return{
            resultArr:[],
            resultArr1:[{
                type:'潜在风险型',
                // title:'亚型一：微小结节，定期随访',
                // tip:'您的肺结节属于微小结节。',
                content:'您的肺结节属于微小结节，根据《肺结节诊治中国专家共识（2018年版）》：结节直径≤4 mm者，且存在肺癌危险因素，应在12个月重新评估，如果没有变化则转为常规年度检查。请遵医嘱定期随访，密切关注结节变化；如结节直径>5mm，应遵医嘱缩短CT随访周期，及时完善相关检查。如有任何问题，可随时联系网站专业人员，为您提供帮助和指导。'
            }],

            resultArr2:[{
                type:'潜在风险型',
                // title:'亚型二：无高危因素',
                // tip:'您的肺结节属于小结节。',
                content:'您的肺结节属于小结节，虽然您并无《肺结节诊治中国专家共识（2018年版）》上常见的肺癌高危因素，但仍存在癌变风险。建议积极随访并及时完善相关检查。如有任何问题，可随时联系网站专业人员，为您提供帮助和指导。'
            }],

            resultArr3:[{//小于40岁
                type:'小结节，存在肺癌高风险因素',
                title:'作为正在改变世界的逐梦人',
                // tip:'您的肺结节属于小结节。',
                content:'建议您及时就诊并进一步完善相关检查，密切关注结节变化，避免延误诊断或过度治疗。请联系专属健管师，为您提供丽菲清<sup>®</sup>检测肺结节智能管理方案。用科技消除隐患，将健康掌握在自己手中，尽享精彩人生！'
            }],

            resultArr4:[{//40-60岁
                type:'小结节，存在肺癌高风险因素',
                title:'身为社会的中流砥柱、家中的主心骨，您的健康就是全家幸福安心的保障。',
                // tip:'您的肺结节属于小结节。',
                content:'建议您及时就诊并进一步完善相关检查，密切关注结节变化，避免延误诊断或过度治疗。请联系专属健管师，为您提供丽菲清<sup>®</sup>检测肺结节智能管理方案。用科技控制风险，将健康掌握在自己手中，护航全家安心！'
            }],

            resultArr5:[{//60岁以上
                type:'小结节，存在肺癌高风险因素',
                title:'家有一老如有一宝，您的身体健康，牵动着全家的心',
                // tip:'家有一老如有一宝，您的身体健康，牵动着全家的心。',
                content:'建议您及时就诊并进一步完善相关检查，密切关注结节变化，避免延误诊断或过度治疗。请联系专属健管师，为您提供丽菲清<sup>®</sup>检测肺结节智能管理方案。用科技消除焦虑，将健康掌握手中，使您安心全家放心！'
            }],
            type:'',
            callUsShow:false,
            msgList:{
                name:'',
                tel:'',
                msg:''
            }
        }
    },
    mounted(){
        var query=this.$route.query;
        let key = query.id;
        let that  = this;
        this.type = query.id;
        switch (key) {
            case '1':
                that.resultArr = that.resultArr1; 
                that.resurtSubmit(that.resultArr);  
                break;
            case '2':
                that.resultArr = that.resultArr2;
                that.resurtSubmit(that.resultArr);
                break;
            case '3':
                that.resultArr = that.resultArr3;
                that.resurtSubmit(that.resultArr);
                break;
            case '4':
                that.resultArr = that.resultArr4;
                that.resurtSubmit(that.resultArr);
                break;
            case '5':
                that.resultArr = that.resultArr5;
                that.resurtSubmit(that.resultArr);
                break;
            default:
                break;
        };
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },
        //上传提交结果
        resurtSubmit(row){
            console.log(row);
            let that  = this;
            let mobile = localStorage.getItem('tel');
            var promise = {}
            row.forEach(element => {
                promise = {
                    mobile:mobile,
                    leixing:element.type,
                    result:element.content,
                    q1:element.title,
                    q2:element.tip,
                    q3:'',
                    q4:'',
                };
            });
            that.axios.post('zicepost', qs.stringify(promise))
            .then(function (res) {
                console.log(res);
                if(res.status == 200 ){
                    if(res.data && res.data.data){
                        console.log('提交成功!');
                    }
                }else{
                    that.$message({
                    message: '服务异常请稍后重试！',
                    type: 'warning'
                    });
                }
            });
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
<style scoped>
.resultPage{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.resultPage header{
    width: 100%;
    background: #4eb7ba;
    color: #fff;
    text-align: center;
    margin-top: -60px;
}
.resultPage header p{
    font-size: 60px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    line-height: 100px;
}
.resultPage header span{
    float: left;
    font-size: 42px;
    margin-top: 18px;
    font-weight: 900;
    margin-left: 30px;
}
.resultPage-box{
    min-height: 100%;
    padding-bottom: 250px;
    box-sizing: border-box;
    border-radius: 5px;
    box-sizing: border-box;
    background-size: 100% 100%;
    background-color: #e4f2f2;
    margin: 0;
}
.resultPage .result-type{
    font-size: 45px;
    font-family: SourceHanSansCN, SourceHanSansCN-Normal;
    font-weight: Normal;
    text-align: left;
    color: #ffffff;
    height: 90px;
    line-height: 90px;
    background-image: linear-gradient(to right, #4eb7ba , #fff);
    padding-left: 90px;
    box-sizing: border-box;
    margin-top: 52px;
}
.resultPage  .title button{
    min-width: 563px;
    height: 108px;
    padding: 0 20px;
    box-sizing: border-box;
    text-align: center;
    font-size: 45px;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 10px solid #ffffff;
    border-radius: 90px;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    margin-top: 59px;
}
.resultPage .content-list{
    font-weight: 400;
    text-align: left;
    color: #221e1f;
    line-height: 54px;
    letter-spacing: -1px;
    padding: 0 27px;
    box-sizing: border-box;
    margin-top: 40px;
}
.resultPage .content-list .title{
    font-size: 30px;
    font-family: Adobe Heiti Std, Adobe Heiti Std-R;
    font-weight: R;
    text-align: justifyLeft;
    color: #000;
    letter-spacing: -0.75px;
    font-weight: 700;
}
.resultPage .content-list p{
  font-size: 30px;
  font-family: Adobe Heiti Std, Adobe Heiti Std-R;
  font-weight: R;
  text-align: justifyLeft;
  color: #6e6e6e;
  letter-spacing: -0.75px;
}
.resultPage .reference-box{
    width: 82%;
    margin-left: 6.5vw;
    text-align: left;
    padding: 0 26px;
    box-sizing: border-box;
    margin-top: 40px;
}
.resultPage .reference-box p, .resultPage .reference-box div{
   font-size: 17px;
  font-family: SourceHanSansCN, SourceHanSansCN-Regular;
  font-weight: 400;
  text-align: left;
  color: #6e6e6e;
}
.resultPage .type-box{
    width: 38%;
    margin: 0 auto;
    text-align: center;
    margin-top: 42px;
    position: relative;
}
.resultPage .type-box img{
  width: 300px;
  margin-top: 50px;
}
.resultPage .type-box .type1{
    position: absolute;
    top: 10vw;
    left: 12vw;
    width: 0;
    height: 0;
    border-left: 2.3vw solid transparent;
    border-right: 2.3vw solid transparent;
    border-bottom: 2.3vw solid #e4f3f3;
    transform: rotate(-38deg);
}
.resultPage .type-box .type2{
    position: absolute;
    top: 10vw;
    left: 29vw;
    width: 0;
    height: 0;
    border-left: 2.3vw solid transparent;
    border-right: 2.3vw solid transparent;
    border-bottom: 2.3vw solid #e4f3f3;
    transform: rotate(40deg); 
}
.resultPage .type-box .type3{
    position: absolute;
    top: 17vw;
    left: 34vw;
    width: 0;
    height: 0;
    border-left: 2.3vw solid transparent;
    border-right: 2.3vw solid transparent;
    border-bottom: 2.3vw solid #e4f3f3;
    transform: rotate(69deg);
}
.content-box{
  width: 1475px;
  margin: 0 auto;
  background: #f4f4f4;
  border-radius: 30px;
  display: grid;
  grid-template-columns: 40% 60%;
  margin-top: 30px;
}
.resultPage-box .right {
    width: 40%;
    display: grid;
    height: 30px;
    line-height: 30px;
    grid-template-columns: repeat(auto-fill, 140px);
    line-height: 30px;
    margin-top: 25px;
    padding-left: 6vw;
    box-sizing: border-box;

}
.resultPage-box .right p a{
    font-size: 24px;
    border-right: 1px solid #fff;
    padding-right: 20px;
    box-sizing: border-box;
    color: #fff;
}
.resultPage-box .right p{
    font-size: 24px;
    cursor: pointer;
}
.resultPage-box .right p:nth-last-of-type(2){
    border-right: 1px solid #fff;
    height: 30px;
    line-height: 30px;
    margin-top: 58px;
}
.call-us-box{
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
.resultPage  .call-us-list{
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
.resultPage .call-us-list .cross{
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
.resultPage  .call-us-list .list:nth-of-type(1){
    margin-top: 0;
}
.resultPage  .call-us-list .list{
    position: relative;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 42px;
    display: grid;
    grid-template-columns: 20% 80%;
}
.resultPage  .call-us-list .list input{
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
.resultPage  .call-us-list .list span{
    font-size: 28px;
    color: #4eb7ba;
    position: absolute;
    left: 5vw;
    top: 2.2vh;
}
.resultPage .call-us-list .list textarea{
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
.resultPage  .call-us-box .health-manager{
    display: flex;
    margin-top: 10px;
}
.resultPage  .call-us-box .health-manager div{
    flex: 1;
    text-align: left;
}
.resultPage  .call-us-box .health-manager div:nth-of-type(1) img{
    width: 232px;
    margin-left: 36px;
}
.resultPage  .call-us-box .health-manager-right p, .resultPage  .call-us-box .health-manager-right p a{
    font-size: 28px;
    color: #4eb7ba;
    margin-top: 50px;
    margin-left: -30px;
    font-weight: 700;
}
.resultPage  .call-us-box .submit-list button{
    padding: 13px 40px;
    border: 2pt solid #d3d8d8;
    border-radius: 40px;
    background: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 28px;
    color: #4eb7ba;
}
.resultPage  .call-us-box  input::-webkit-input-placeholder , .resultPage  .login-information .tel input::-webkit-input-placeholder{
    color: rgb(78, 183, 186);
}
.resultPage  .call-us-box  input::-moz-input-placeholder, .resultPage  .login-information .tel input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.resultPage  .call-us-box  input::-ms-input-placeholder, .resultPage  .login-information .tel input::-ms-input-placeholder {
    color: rgb(78, 183, 186)
}
.resultPage  .health-manager-title{
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
.maskModle{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.5;
    z-index: 1005;
}
.list-content{
    width: 80%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 70% 30%;
}
.list-content .list-right{
    text-align: center;
}
.list-content .list-right img{
    width: 14vw;
    margin-top: 2vw;
    
}
  
</style>
