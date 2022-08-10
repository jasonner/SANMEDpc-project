<template>
    <div class="content">
        <div class="pay-box">
            <div @click="wxPay()">
                <img src="@/assets/img/payPage/wxPay.png" alt="" srcset="">    
            </div>
            <div  @click="aliPay()">
                <img src="@/assets/img/payPage/zhifubao.png" alt="" srcset="">
            </div>
        </div>
        <div class="qrcode-bg" v-if="showPayStyle"></div>
        <div class="qrCode-box" v-show="showPayStyle">
            <div class="weixinPay"  v-if="wxShow">
                <div class="qrcode" ref="weixinCodeUrl"></div>
                <!-- <div class="pay-text">微信扫码支付</div> -->
                <!-- <img class="eqcode" src="https://oss.sxyweb.com.cn/2021/wj/5GIMT/pc/pay/EQcode.png" alt="" srcset=""> -->
               
            </div>
            <div class="zhifubaoPay" v-if="!wxShow">
                <div class="qrcode" ref="zhifubaoCodeUrl"></div>
                <!-- <div class="pay-text">支付宝扫码支付</div> -->
                <!-- <img class="eqcode" src="https://oss.sxyweb.com.cn/2021/wj/5GIMT/pc/pay/EQcode.png" alt="" srcset=""> -->
            </div>
            <p class="closeBtn" @click="closedPayBtn()">X</p>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import QRCode from 'qrcodejs2'
export default {
    data(){
        return{
            showPayStyle:false,
            wxShow:true,
            payFlag:true,
            timer0: null
        }
    },
    mounted(){

    },
    methods:{
        //微信支付
        wxPay(){
            let that = this;
            that.showPayStyle = true;
            if(this.payFlag){
                that.wxShow = true;
                let mobile = localStorage.getItem('tel');
                let promise = {
                    mobile: mobile,
                    paytype:'wxpay.comm.qrcode'
                };
                that.axios.post('qrpay', qs.stringify(promise))
                .then(function (res) {
                    console.log(res.data);
                    if(res.status == 200 ){
                        if(res.data && res.data.s){
                            that.showPayStyle = true;
                            that.creatQrCode1(res.data.qr);
                            that.payFlag = false;
                            that.timer0 = setInterval(() => {
                                that.getOrderStated(res.data.orderid);
                            }, 3000);
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
        //支付宝支付
        aliPay(){
            let that = this;
            that.showPayStyle = true;
            if(this.payFlag){
                that.wxShow = false;
                let mobile = localStorage.getItem('tel');
                let promise = {
                    mobile: mobile,
                    paytype:'alipay.comm.qrcode'
                };
                that.axios.post('qrpay', qs.stringify(promise))
                .then(function (res) {
                    console.log(res.data.qr);
                    if(res.status == 200 ){
                        if(res.data && res.data.s){
                            that.showPayStyle = true;
                            that.creatQrCode2(res.data.qr);
                            that.payFlag = false;
                            if(that.timer0){
                                clearInterval(that.timer0);
                            }
                            that.timer0 = setInterval(() => {
                                that.getOrderStated(res.data.orderid);
                            }, 3000);
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
        //创建微信二维码
        creatQrCode1(url) {
            var qrcode = new QRCode(this.$refs.weixinCodeUrl, {
                text: url,
                width: 100,
                height: 100,
                left:100,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        //创建支付宝二维码
        creatQrCode2(url) {
            var qrcode = new QRCode(this.$refs.zhifubaoCodeUrl, {
                text: url,
                width: 100,
                height: 100,
                left:100,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        //关闭支付弹窗
        closedPayBtn(){
            this.showPayStyle = false;
            window.location.reload(true);
        },

        //轮询订单
        getOrderStated(orderid){
            let that  = this;
            let promise = {
                orderid:orderid
            }
            that.axios.post('querypayorder', qs.stringify(promise))
            .then(function (res) {
                if(res.status == 200 ){
                    if(res.data && res.data.s){
                        console.log(res.data.data.paystatus);
                        if(res.data.data.paystatus == '1'){//支付成功
                            that.$notify({
                                title: '成功',
                                message: '支付成功',
                                type: 'success'
                            });
                            clearInterval(that.timer0);
                            that.$router.push('/order');
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
            });
        }
    },
    destroyed(){
        clearInterval(this.timer0);
    }

}
</script>
<style scoped>
.content{
    width: 100%;
    height: 100%;
    background: url('../assets/img/payPage/payBG.png') center no-repeat;
    background-size: 100% 100%;
    object-fit: fill;
}
.pay-box{
    width: 100%;
    height: 40vh;
    box-sizing: border-box;
    display: flex;
}
.pay-box div{
    margin: 0 4vw;
    margin-top: 18%;
    cursor: pointer;
}
.pay-box div:nth-of-type(1){
    margin-left: 30%;
}
.pay-box div img{
    width: 18vw;
}
.qrcode{
    width: 14vw;
    height: 14vw;
    background: url('../assets/img/payPage/kuang.png') center no-repeat;
    background-size: 100% 100%;
    object-fit: fill;
    text-align: center;
    vertical-align: middle;
    padding-top: 0.5vw;
    margin-left: 1vw;
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
    width: 20vw;
    height: 20vw;
    background: #fff;
    position: fixed;
    top: 35%;
    left: 43%;
    z-index: 10009;
    border-radius: 20px;
    text-align: center;
    
}
.qrCode-box div{
    position: relative;
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
    right: 10px;
    top: -10px;
    cursor: pointer;
}
</style>