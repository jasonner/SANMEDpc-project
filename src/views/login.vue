<template>
    <div class="loginPage">
        <div class="header-box">
            <img src="@/assets/img/logo.png" alt="" srcset="">
        </div>
        <div class="content-box">
            <div class="title">
                <p :class="{active:!isLoginShow}" @click="isLoginShow=!isLoginShow">注册</p>
                <p :class="{active:isLoginShow}" @click="isLoginShow=!isLoginShow">登录</p>
            </div>
            <div class="login-list-form">
                <div class="left"> 
                    <img src="@/assets/img/login/introduction.png" alt="" srcset="">
                </div>

                <!-- 登录 -->
                <div class="right" v-if="isLoginShow">
                    <div class="input-text">
                        <el-input style="height:40px" minlength='4' maxlength='20'  v-model="loginList.userName" placeholder="用户名"></el-input>
                    </div>
                    <div class="input-text">
                        <el-input style="height:40px"  type="password" minlength='6' maxlength='20'  v-model="loginList.password" placeholder="设置密码"></el-input>
                    </div>
                    <div class="submit-button">
                        <el-button style="width:70%" type="primary" :disabled='isSisabled' @click="loginBtn()">登录</el-button>
                    </div>
                </div>

                <!-- 注册 -->
                <div class="right register" v-else>
                    <div class="input-text">
                        <el-input style="height:40px"  minlength='4' maxlength='20'  @blur="isLoginChange()" v-model="regList.userName" placeholder="用户名（4-20个字符内容）"></el-input>
                    </div>
                    <div class="input-text">
                        <el-input style="height:40px"  minlength='6' maxlength='20'  v-model="regList.password" placeholder="密码（6-20个字符内容）"></el-input>
                    </div>
                    <div class="input-text">
                        <el-input style="height:40px"  minlength='4' maxlength='40'  v-model="regList.company" placeholder="公司名（4-40个字符）"></el-input>
                    </div>
                    <div class="input-text">
                        <el-input style="height:40px"  minlength='11' maxlength='11'  v-model="regList.tel" placeholder="手机号"></el-input>
                    </div>
                    <div class="input-text">
                        <el-input style="height:40px"  v-model="regList.email" placeholder="邮箱"></el-input>
                    </div>
                    <!-- <div class="sedCode">
                        <el-input style="height:40px" v-model="regList.code" placeholder="验证码"></el-input>
                        <el-button style="margin-left:10px">发送验证码</el-button>
                    </div> -->
                    <div class="submit-button">
                        <el-button style="width:70%" :disabled='isSisabled' type="primary" @click="regSubmit()">提交</el-button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    data(){
        return{
            isLoginShow:true,
            regList:{
                userName:'',
                password:'',
                company:'',
                tel:'',
                email:'',
                code:'',
            },
            loginList:{
                userName:'',
                password:'', 
            },
            isSisabled:false,//防止连击
            isLoginFlag:false,//是否已经注册过
        }
    },
    methods:{

        //是否已经注册过
        isLoginChange(){
            let that = this;
            that.axios.get('user/username?username='+that.regList.userName)
            .then(function (res) {
                console.log(res.data)
                if(res.data.code && res.data.code == '200'){
                    if(res.data.s){
                       that.isLoginFlag = false;
                        that.$message({
                            message: res.data.msg,
                            type: 'success'
                        });
                    }else{
                       that.isLoginFlag = true;
                        that.$message({
                            message: res.data.msg,
                            type: 'warning'
                        });
                    };
                }else{
                    that.$message.error(res.data.msg);
                };
            });
        },

        //注册提交
        regSubmit(){
            console.log('注册')
            let that = this;
            if(that.regList.userName ==''){
                that.$message.error('请输入用户名！');
            }else if(that.regList.password ==''){
                that.$message.error('请输入密码！');
            }else if(that.regList.company == ''){
                that.$message.error('请输入公司名！');
            }else if(that.regList.tel == ''){
                that.$message.error('请输入手机号！');
            }else if(!that.PhoneVerify(that.regList.tel)){
                that.$message.error('请输入正确的手机号！');
            }else if(!that.emailVerify(that.regList.email)){
                that.$message.error('请输入正确的邮箱！');
            }else if(that.isLoginFlag){
                that.$message.error('该用户名已经注册过！');
            }else{
                that.isSisabled = true;
                setTimeout(() => {
                    that.isSisabled = false;
                }, 5000);
				let promise = {
					username:that.regList.userName,
                    password:that.regList.password,
                    mobile:that.regList.tel,
                    company:that.regList.company,
                    email:that.regList.email,
				};
				that.axios.post('user/reg',qs.stringify(promise)).then((res) => {
					console.log(res.data);
					if (res.data.code && res.data.code =='200') {
						if(res.data && res.data.data){
							if(res.data.s){
                                that.$message({
                                    message: res.data.msg,
                                    type: 'success'
                                });
                                that.isLoginShow = true; 
                            }else{
                                that.$message.error(res.data.msg); 
                            }
						}	
					} else {
						that.$message.error(res.data.msg);
					}
				});
            }

        },

        //登录
        loginBtn(){
            let that = this;
            if(that.loginList.userName ==''){
                that.$message.error('请输入用户名！');
            }else if(that.loginList.password ==''){
                that.$message.error('请输入密码！');
            }else{
                let promise = {
                    username:that.loginList.userName,
                    password:that.loginList.password
                };
                that.axios.post('user/login',qs.stringify(promise)).then((res) => {
					console.log(res.data);
					if (res.data.code && res.data.code =='200') {
						if(res.data && res.data.s){
                            that.$router.push('/index');
                            that.$router.push({path: '/index', query:{name: that.loginList.userName}});
                            that.loginList.userName='';
                            that.loginList.password='';
						}else{
                            that.$message.error(res.data.msg); 
                        }	
					} else {
						that.$message.error(res.data.msg);
					}
				});
            }
        },

        //手机号检验
        PhoneVerify(str){
            //var reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,7,8])|(18[0-9])|(19[8,9]))\d{8}/;
            var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
            if (reg.test(str)) {
                return  true;
            }else{
                return false;
            }
        },

        //邮箱验证
        emailVerify(email){
            var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if(reg.test(email)){
                return true
            }else{
                return false
            }
        },

    }
}
</script>
<style scoped>
    .loginPage{
        height: 100%;
        width: 100%;
        background: #f2f8ff;
    }
    .loginPage .header-box{
        width: 100%;
        height: 64px;
        line-height: 64px;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
        text-align: left;
        position: absolute;
        top: 0;
        left: 0;
    }
    .loginPage .header-box img{
        width: 120px;
        vertical-align: middle;
        margin-left: 30px;
    }
    .loginPage .content-box{
        width: 100%;
        margin: 0 auto;
        position: absolute;
        top: 64px;
        left: 0;
    }
    .loginPage .title{
        width: 400px;
        margin: 0 auto;
        display: flex;
        margin-top: 80px;
    }
    .title .active::after{
        content: ' ';
        position: absolute;
        width: 40px;
        height: 3px;
        background: #3c8cd2;
        bottom: -10px;
        left:40%;

    }
    .loginPage .title p{
        flex: 1;
        text-align: center;
        cursor: pointer;
        font-size: 18px;
        font-weight: 500;
        color: #3c8cd2;
        position: relative;
    }
    .loginPage .login-list-form{
        width: 800px;
        margin: 0 auto;
        display: flex;
        margin-top: 20px;
    }
    .loginPage .login-list-form div{
        flex: 1;
    }
    .loginPage .login-list-form .left img{
        width: 100%;
    }
    .loginPage .login-list-form .right{
        background:#fff;
    }
    .loginPage .login-list-form .right .input-text{
        width: 70%;
        margin: 0 auto;
        margin-top: 40px;
    }
    .loginPage .login-list-form .register .input-text{
        margin-top: 15px;
    }   
    .loginPage .login-list-form .right .input-text input{
        height: 40px;
    }
    .loginPage .login-list-form .right .submit-button{
        width: 100%;
        text-align: center;
        margin-top: 100px;
    }
    .loginPage .login-list-form .right .sedCode{
        width: 70%;
        display: flex;
        margin: 0 auto;
        margin-top: 20px;
    }
</style>