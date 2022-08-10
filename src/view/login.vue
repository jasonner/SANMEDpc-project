<template>
    <div class="loginPage">
        <header>
            <span class="el-icon-arrow-left" @click="goBack()"></span>
             <p>个人中心</p>   
        </header>
        <!-- logo -->
        <div class="logo-box">
            <img src="@/assets/img/page1/logo.png?v=1" alt="" srcset="">
        </div>
        
        <!-- 登录信息 -->
        <div class="login-information">
            <el-input
                placeholder="请输入姓名"
                v-model="name"
                :maxlength='12'
                class="name"
                >
            </el-input>
            <el-input
                placeholder="请输入手机号"
                v-model="tel"
                :maxlength='11'
                class="tel"
            >
            </el-input>
            <div class="Verification-Code-box">
                <el-input
                    placeholder="请输入验证码"
                    v-model="Code"
                    :maxlength='4'
                    class="Verification-Code"
                >
                </el-input>
                <button @click="getCodeChange()">{{getCode}}</button>
            </div>
            <div class="Privacy-Policy">
                <input type="checkbox" name="" id="" :checked="selectChecked" @click="selectChecked= !selectChecked">
                阅读并同意 <router-link to="userAgreement">《用户协议》</router-link>和<router-link to="privacyPolicy">《隐私政策》</router-link>
            </div>
            <div class="login-btn">
                <button @click="login()">登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            name:'',
            tel:'',
            Code:'',
            codeNum:'',
            getCode:'获取验证码',
            tim1Flag:true,
            timer1:null,
            selectChecked:false,
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        },

        //获取短信验证码
        getCodeChange(){
            let that = this;
            if(that.tim1Flag){
                if(that.tel == ''){
                    that.$message.error('请输入手机号');
                    return
                }else{
                    var num = 60;
                    var timer1 = setInterval(() => {
                        num --;
                        if(num <= 0){
                            clearInterval(timer1);
                            that.getCode = '重新获取验证码';
                            that.tim1Flag = true;
                        }else{
                            that.tim1Flag = false;
                            that.getCode = num+'s';
                        }
                    }, 1000);
                    that.codeNum = Math.floor(Math.random()*(9999-0))+0;
                    let promise = {
                        mobile: that.tel,
                        code:that.codeNum
                    };
                    that.axios.post('sendsms', qs.stringify(promise))
                    .then(function (res) {
                        console.log(res);
                        if(res.status == 200 ){
                            if(res.data && res.data.s){
                                console.log('短信验证码已发送');
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
                };
            };
        },

        //登录
        login(){
            let that  = this;
            console.log(that.PhoneVerify(that.tel));
            if(!that.selectChecked){
                that.$message.error('请勾选阅读协议');
                return
            }else if(that.name ==''){
               that.$message.error('请输入姓名');
                return
            }else if(that.tel ==''){
               that.$message.error('请输入手机号');
                return
            }else if(!that.PhoneVerify(that.tel)){
                that.$message.error('请输入正确的手机号');
                return
            }else{
                let promise = {
                    username:that.name,
                    mobile:that.tel,
                };
                that.axios.post('login', qs.stringify(promise))
                .then(function (res) {
                    console.log(res);
                    if(res.status == 200 ){
                        if(res.data && res.data.s){
                           that.$router.push({path:'/index'});
                           localStorage.setItem('tel',that.tel);
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
            }
        },

        //手机号检验
        PhoneVerify(str){
            var reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/;
            if (reg.test(str)) {
                return  true;
            }else{
                return false;
            }
        },

    },
    
    beforeDestroy() {
        clearInterval(this.timer1);        
        this.timer1 = null;
    }
}
</script>
<style >
.loginPage{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
.loginPage header{
    width: 100%;
    height: 128px;
    background: #4eb7ba;
    line-height: 128px;
    color: #fff;
    text-align: center;
    margin-top: -40px;
    padding: 0;
}
.loginPage header p{
    font-size: 32px;
    padding-right: 60px;
    box-sizing: border-box;
}
.loginPage header span{
    float: left;
    font-size: 64px;
    margin-top: 40px;
    font-weight: 900;
    margin-left: 30px;
}

/* logo */
.loginPage .logo-box {
    width: 100%;
    height: auto;
}
.loginPage .logo-box img{
    width: 377px;
    height: 159px;
    margin-top: 65px;
}

/* 登录信息 */
.loginPage .login-information{
    width: 60%;
    margin: 0 auto;
    margin-top: 109px;
    
}
.loginPage .login-information .name,.loginPage .login-information .tel{
    width: 87.3%;
    height: 92px;
}
.loginPage .login-information .name input,.loginPage .login-information .tel input{
    width: 100%;
    height: 80px;
    border: 4px solid #4eb7ba;
    border-radius: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 30px;
}
.loginPage .login-information .name input::-webkit-input-placeholder , .loginPage .login-information .tel input::-webkit-input-placeholder{
    color: #4eb7ba;
}
.loginPage .login-information .name input::-moz-input-placeholder, .loginPage .login-information .tel input::-moz-input-placeholder{
    color: #4eb7ba
}
.loginPage .login-information .name input::-ms-input-placeholder, .loginPage .login-information .tel input::-ms-input-placeholder {
    color: #4eb7ba
}
.loginPage .login-information .tel{
    margin-top: 60px;
}
.loginPage .login-information .Verification-Code-box{
    margin-top: 60px;
    height: 80px;
    width: 100%;
}
.loginPage .login-information .Verification-Code{
    width: 405px;
    height: 80px;
    float: left;
    margin-left: 108px;
    height: auto;
}   
.loginPage .login-information .Verification-Code input{
    width: 100%;
    height: 80px;
    border: 4px solid #4eb7ba;
    border-radius: 40px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 30px;
}
.loginPage .login-information .Verification-Code input::-webkit-input-placeholder{
    color: #4eb7ba
}
.loginPage .login-information .Verification-Code input::-ms-input-placeholder{
    color: #4eb7ba
}
.loginPage .login-information .Verification-Code input::-moz-input-placeholder{
    color: #4eb7ba
}
.loginPage .login-information .Verification-Code-box button{
    min-width: 31.4%;
    padding: 0 40px;
    height: 80px;
    font-size: 26px;
    color: #fff;
    background: #4eb7ba;
    border-radius: 40px;
    border: none;
    box-sizing: border-box;
    margin-left: 360px;
}
.loginPage  .login-btn button{
    width: 488px;
    height: 90px;
    text-align: center;
    font-size: 0.373333rem;
    font-family: SourceHanSansCN, SourceHanSansCN-Medium;
    font-weight: 500;
    color: #ffffff;
    letter-spacing: 0.026667rem;
    background: #4eb7ba;
    border: 0.08rem solid #ffffff;
    border-radius: 90px;
    box-shadow: 0.066667rem 0.066667rem 0.12rem 0.013333rem #999;
    margin-top: 0.773333rem;
    font-size: 36px;
    margin-top: 100px;
}
.loginPage  .Privacy-Policy{
    margin-top: 100px;
}
.loginPage  .Privacy-Policy {
    font-size: 28px;
}
.loginPage  .Privacy-Policy input{
    vertical-align: middle;
    border: 1px solid #4eb7ba;
    width: 40px;
    height: 30px;
}
.loginPage  .Privacy-Policy a{
    color: blue;
    font-size: 28px;
}
</style>