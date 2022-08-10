<template>
  <div class="userPage">
    <div class="header-box">
      <header>
        <div class="right">
            <p><router-link :to="{path:'/index',query: {name: 1}}">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</router-link></p>
            <p><router-link :to="{path:'/shield',query: {name: 1}}">技术详情</router-link></p>
            <p><router-link :to="{path:'/manual',query: {name: 1}}">健康讲堂</router-link></p>
            <p @click="callUs()">联系我们</p>
        </div>
      </header>
      <div>
        <img src="@/assets/img/page3/icon-test-4.png" alt="" srcset="" />
      </div>
      <div>{{ mobile }}</div>
      <div>
        <router-link :to="{ path: '/improve' }">完善个人信息</router-link>
      </div>
    </div>

    <!-- 信息列表 -->
    <div class="Information-list">
      <div class="list">
        <div>我的订单</div>
        <div @click="lookOrder()">查看全部订单<span class="el-icon-arrow-right"></span></div>
      </div>
      <div class="list" @click="lookReport()">
        <div>查看报告</div>
        <div><span class="el-icon-arrow-right"></span></div>
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
    <div class="payBtnFiexd">
      <img @click="payWx()" class="payBTN" src="@/assets/img/index/payBtn.png?v=1" alt="" srcset="">
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      mobile: "",
      callUsShow:false,
      msgList:{
          name:'',
          tel:'',
          msg:''
      }
    };
  },
  mounted(){
    this.mobile = localStorage.getItem("tel");
  },
  methods: {
    lookReport() {
      this.$router.push("/reportQuery");
    },
    lookOrder() {
      this.$router.push("/order");
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
  },
};
</script>
<style scoped>
.userPage .right{
    width: 40%;
    display: grid;
    height: 30px;
    line-height: 30px;
    grid-template-columns: repeat(auto-fill, 140px);
    line-height: 30px;
    padding-left: 6vw;
    box-sizing: border-box;

}
.userPage .right p a{
    font-size: 24px;
    border-right: 1px solid #fff;
    padding-right: 20px;
    box-sizing: border-box;
    color: #fff;
}
.userPage .right p{
    font-size: 24px;
    cursor: pointer;
    color: #fff;
}
.userPage .right p:nth-last-of-type(2){
    height: 30px;
    line-height: 30px;
}
.userPage .header-box {
  width: 100%;
  height: 391px;
  opacity: 1;
  background: linear-gradient(123deg, #128492 0%, #204685 100%);
  text-align: center;
}
.userPage .header-box img {
  width: 157px;
  height: 157px;
  margin-top: 78px;
}
.userPage .header-box div:nth-of-type(2) {
  font-size: 28px;
  font-family: SourceHanSansCN, SourceHanSansCN-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  margin-top: 34px;
}
.userPage .header-box div:nth-of-type(3) a {
  font-size: 20px;
  font-family: SourceHanSansCN, SourceHanSansCN-Regular;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
  margin-top: 10px;
}
/* 信息列表 */
.userPage .Information-list {
  width: 60%;
  padding: 0 44px;
  box-sizing: border-box;
  margin-top: 58px;
  margin: 0 auto;
  margin-top: 40px;
}
.userPage .Information-list .list {
  width: 100%;
  height: 82px;
  line-height: 82px;
  display: flex;
  border-bottom: 1px solid #909191;
  cursor: pointer;
}
.userPage .Information-list .list div {
  flex: 1;
}
.userPage .Information-list .list div:nth-of-type(1) {
  text-align: left;
  font-size: 35px;
  color:#4eb7ba;
}
.userPage .Information-list .list div:nth-of-type(2) {
  text-align: right;
  font-size: 26px;
  color: #707070;
}
.userPage .Information-list .list div:nth-of-type(2) span {
  font-size: 26px;
  font-weight: 700;
}

.userPage .Information-list .list:nth-last-of-type(1) {
  border-bottom: none;
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
.userPage  .call-us-list{
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
.userPage .call-us-list .cross{
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
.userPage  .call-us-list .list:nth-of-type(1){
    margin-top: 0;
}
.userPage  .call-us-list .list{
    position: relative;
    padding: 0 30px;
    box-sizing: border-box;
    margin-top: 42px;
    display: grid;
    grid-template-columns: 20% 80%;
}
.userPage  .call-us-list .list input{
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
.userPage  .call-us-list .list span{
    font-size: 28px;
    color: #4eb7ba;
    position: absolute;
    left: 5vw;
    top: 2.2vh;
}
.userPage .call-us-list .list textarea{
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
.userPage  .call-us-box .health-manager{
    display: flex;
    margin-top: 10px;
}
.userPage  .call-us-box .health-manager div{
    flex: 1;
    text-align: left;
}
.userPage  .call-us-box .health-manager div:nth-of-type(1) img{
    width: 232px;
    margin-left: 36px;
}
.userPage  .call-us-box .health-manager-right p, .resultPage  .call-us-box .health-manager-right p a{
    font-size: 28px;
    color: #4eb7ba;
    margin-top: 50px;
    margin-left: -30px;
    font-weight: 700;
}
.userPage  .call-us-box .submit-list button{
    padding: 13px 40px;
    border: 2pt solid #d3d8d8;
    border-radius: 40px;
    background: #fff;
    margin-top: 20px;
    box-sizing: border-box;
    font-size: 28px;
    color: #4eb7ba;
}
.userPage  .call-us-box  input::-webkit-input-placeholder , .userPage  .login-information .tel input::-webkit-input-placeholder{
    color: rgb(78, 183, 186);
}
.userPage  .call-us-box  input::-moz-input-placeholder, .userPage  .login-information .tel input::-moz-input-placeholder{
    color: rgb(78, 183, 186)
}
.userPage  .call-us-box  input::-ms-input-placeholder, .userPage  .login-information .tel input::-ms-input-placeholder {
    color: rgb(78, 183, 186)
}
.userPage  .health-manager-title{
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