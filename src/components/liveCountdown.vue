<template>
  <div class="liveCountdownPage">
    <div class="title-list">
      <div class="title-left">直播引导图</div>
    </div>
    <div class="content-list">
      <div class="list-left">
        <el-switch v-model="timedList.openValue" inactive-text="功能开关"> </el-switch>
        <div class="countdown-display-position">
            <span>倒计时显示位置&nbsp;&nbsp;:&nbsp;&nbsp;</span>
            <el-radio :disabled="!timedList.openValue" @change="typeSelectChange(timedList.type)" v-model="timedList.type" label="1">顶部</el-radio>
            <el-radio :disabled="!timedList.openValue" @change="typeSelectChange(timedList.type)" v-model="timedList.type" label="2">全屏</el-radio>
        </div>
        <div class="live-prompt-text">
            <span>直播提示文字&nbsp;:</span>
            <el-input :disabled="!timedList.openValue" class="live-prompt-input" type="text" placeholder="请输入..." v-model="timedList.tipVal" maxlength="20" show-word-limit></el-input>
        </div>
        <div class="start-time">
            <span>直播开始时间&nbsp;:&nbsp;</span>
             <el-date-picker
                v-model="timedList.startTime"
                :disabled="!timedList.openValue"
                @change="startTimeChange(timedList.startTime)"
				class="time-select"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
            </el-date-picker>
        </div>
        <div class="live-countdown-time">
            直播倒计时剩余：{{Countdown}}
        </div>
      </div>
      <div class="list-right">
        <span>预览:</span>
        <img :src="countdownImg" alt="" srcset="" />
      </div>
    </div>
    <div class="list-footer">
        <el-button type="primary" @click="submitChange()">提交</el-button>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
    data() {
        return {
            startDatetime:'',
            countdownImg:require('@/assets/img/liveStreaming/countdown.jpg'),
            pickerOptions: {
                disabledDate(v) {
                return v.getTime() < new Date().getTime() - 86400000;
                }
            },
            liveid:'',
            Countdown:'00天 00时 00分 00秒',
            timedList:{
                openValue:false,
                tipVal:'距直播开始',
                type:'1',//（1.顶部；2.全屏）
                startTime:''
            }
        };
    },
    mounted() {
        var query=this.$route.query;
        if(query && query.userid){
            this.getLiveDetail(query.userid,query.channel);
        }else{
            this.$router.push('/index');
        };
    },
    methods: {
        //获取直播详情
        getLiveDetail(userid,channel){
            let that = this;
            that.axios.get('live/query?userid='+userid+'&channel='+channel)
            .then(function (res) {
                console.log(res.data)
                if(res.data.code && res.data.code == '200'){
                if(res.data.s){
                    that.liveid = res.data.data.id;
                    that.$nextTick(() => {
                        that.getLiveSetting();
                    })
                };
                }else{
                    console.log(res.data.msg);
                };
            });
        },

        //获取频道设置
        getLiveSetting(){
            let that = this;
            that.axios.get('live/query-decorate?liveid='+ that.liveid)
            .then(function (res) {
                if(res.data.code && res.data.code == '200'){
                if(res.data.s){
                    console.log(res.data);
                    if(res.data.data.timed){
                        if(res.data.data.timed){
                            that.timedList = JSON.parse(res.data.data.timed);
                            that.timeDown(that.timedList.startTime);
                        }
                    }
                };
                }else{
                    that.$message.error(res.data.msg);
                };
            });
        },

        //倒计时位置选择
        typeSelectChange(val){
            let that = this;
            that.timedList.type = val;
            switch (val) {
                case '1':
                    that.countdownImg = require('@/assets/img/liveStreaming/countdown.jpg');
                    break;
                case '2':
                    that.countdownImg = require('@/assets/img/liveStreaming/downcount-vertical-center.png');
                    break;
                default:
                    break;
            }
        },

        //时间转换
        startTimeChange(d){
            console.log(d);
            if(d){
                console.log(d.getHours()>10)
                let Year = d.getFullYear()+'-';
				let Month = (d.getMonth() + 1)>10?(d.getMonth() + 1)+'-':'0'+(d.getMonth() + 1)+'-';
				let Day = d.getDate()>10?d.getDate()+ ' ':'0'+d.getDate()+' ';
				let Hours = d.getHours()>10?d.getHours()+':':'0'+d.getHours()+':';
				let Minutes = d.getMinutes()>10?d.getMinutes()+':':'0'+d.getMinutes()+':';
				let Seconds = d.getSeconds()>10?d.getSeconds():'0'+d.getSeconds();
                this.timedList.startTime = Year+Month+Day+Hours+Minutes+Seconds
                console.log(this.timedList.startTime)
                this.timeDown(this.timedList.startTime);
            }else{
                this.timedList.startTime = '';
            }
            
        },

        //提交数据
        submitChange(){
            let that = this;
            if(that.timedList.openValue){
                if(that.timedList.startTime == ''){
                    that.$message.error('请选择直播开始时间！'); 
                    return
                }
            };
            
            let promise = {
                'liveid':that.liveid,
                'timed':JSON.stringify(that.timedList),
            };
            that.axios.post('live/decorate',qs.stringify(promise)).then((res) => {
                if (res.data.code && res.data.code =='200') {
                if(res.data && res.data.s){
                    that.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                }else{
                    that.$message.error(res.data.msg); 
                }	
                } else {
                that.$message.error(res.data.msg);
                }
			});
        },

        //倒计时
        timeDown (endDateStr) {
            //结束时间
            var that=this
             var endDate = new Date(endDateStr);
            //当前时间
            var nowDate = new Date();
            //相差的总秒数
            var totalSeconds = parseInt((endDate - nowDate) / 1000);
            if(totalSeconds<=0){
                this.Countdown= '00' + "天" + '00' + "小时" + '00' + "分钟" + '00'+"秒";
                return
            }else{
                //天数
                this.days = Math.floor(totalSeconds / (60 * 60 * 24));
                //取模（余数）
                var modulo = totalSeconds % (60 * 60 * 24);
                //小时数
                this.hours = Math.floor(modulo / (60 * 60));
                modulo = modulo % (60 * 60);
                //分钟
                this.minutes = Math.floor(modulo / 60);
                //秒
                this.seconds = modulo % 60;
                //输出到页面
                this.Countdown= this.days + "天" + this.hours + "小时" + this.minutes + "分钟" + this.seconds+"秒";
                //延迟一秒执行自己
                  setTimeout(function () {
                      that.timeDown(endDateStr);
                  }, 1000)
            }
           
        },

    },
};
</script>
<style>
    .liveCountdownPage {
        width: 100%;
    }
    .liveCountdownPage .title-list {
        width: 100%;
        height: 40px;

        color: #787878;
        background-color: #f5f5f5;
        display: flex;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .liveCountdownPage .title-list .title-left {
        text-align: left;
        flex: 1;
        line-height: 40px;
    }
    .liveCountdownPage .title-list .title-right {
        text-align: right;
        flex: 1;
        line-height: 40px;
    }
    .liveCountdownPage .title-list .title-right p {
        display: inline-block;
        font-size: 12px;
        text-align: center;
        padding: 5px 10px;
        border: 1px solid #dfdfdf;
        background: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .liveCountdownPage .title-list .title-right p span {
        margin-right: 5px;
    }

    /* content-list */
    .liveCountdownPage .content-list {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
        display: flex;
    }
    .liveCountdownPage .content-list .list-left {
        flex: 1.5;
        text-align: left;
    }
    .liveCountdownPage .content-list .list-left .open-introduce {
        font-size: 12px;
        margin-top: 10px;
    }
    .liveCountdownPage .content-list .list-right {
        flex: 1;
        text-align: left;
        border-left: 1px solid #dfdfdf;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .liveCountdownPage .content-list .list-right span{
        float: left;
    }
    .liveCountdownPage .content-list .list-right img {
        width: 80%;
    }
    .liveCountdownPage  .countdown-display-position{
        width: 100%;
        margin-top: 20px;
    }
    .liveCountdownPage  .countdown-display-position span{
        font-size: 12px;
    }
     .liveCountdownPage .live-prompt-text{
        width: 100%;
        margin-top: 20px;
    }
    .liveCountdownPage .live-prompt-text span{
        font-size: 12px;
        margin-right: 5px;
    }
    .liveCountdownPage .live-prompt-text .live-prompt-input{
        width: 40%;

    }
    .liveCountdownPage .live-prompt-text .live-prompt-input input{
        font-size: 12px;
        height: 35px;
        color: #999;
    }
    .liveCountdownPage .live-prompt-text .live-prompt-input .el-input__suffix {
        right: -70px;
    }  
    .liveCountdownPage .start-time{
        width: 100%;
        margin-top: 20px;
    }
    .liveCountdownPage .start-time span{
        font-size: 12px;
    }
    .liveCountdownPage .start-time .time-select{
        height: 35px;
        color: #333;
    }
    .liveCountdownPage .start-time .time-select input{
        color: #333;
        font-size: 12px;
        font-weight: 500;
    }
    .liveCountdownPage  .live-countdown-time{
        width: 100%;
        margin-top: 20px;
        font-size: 12px;
    }
    .liveCountdownPage .list-footer{
        width: 100%;
        background: #fff;
        text-align: center;
        border-top: 1px solid #ececec;
        padding: 40px 0;
        box-sizing: border-box;
    }
</style>