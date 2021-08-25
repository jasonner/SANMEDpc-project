<template>
  <div class="liveCountdownPage">
    <div class="title-list">
      <div class="title-left">直播引导图</div>
      <div class="title-right">
        <p><span class="el-icon-full-screen"></span>手机预览</p>
      </div>
    </div>
    <div class="content-list">
      <div class="list-left">
        <el-switch v-model="openValue" inactive-text="功能开关"> </el-switch>
        <div class="countdown-display-position">
            <span>倒计时显示位置&nbsp;&nbsp;:&nbsp;&nbsp;</span>
            <el-radio v-model="radioCountdownVal" label="1">顶部</el-radio>
            <el-radio v-model="radioCountdownVal" label="2">全屏</el-radio>
        </div>
        <div class="live-prompt-text">
            <span>直播提示文字&nbsp;:</span>
            <el-input class="live-prompt-input" type="text" placeholder="请输入..." v-model="tipVal" maxlength="20" show-word-limit></el-input>
        </div>
        <div class="start-time">
            <span>直播开始时间&nbsp;:&nbsp;</span>
             <el-date-picker
                v-model="startDatetime"
                @change="startTimeChange(startDatetime)"
				class="time-select"
                type="datetime"
                :picker-options="pickerOptions"
                placeholder="选择日期时间">
            </el-date-picker>
        </div>
        <div class="live-countdown-time">
            直播倒计时剩余：16天23时31分22秒
        </div>
      </div>
      <div class="list-right">
        <span>预览:</span>
        <img src="@/assets/img/liveStreaming/countdown.jpg" alt="" srcset="" />
      </div>
    </div>
    <div class="list-footer">
        <el-button type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            openValue:false,
            radioCountdownVal:'1',
            tipVal:'距直播开始',
            startDatetime:'',
            pickerOptions: {
                disabledDate(v) {
                return v.getTime() < new Date().getTime() - 86400000;
                }
            },
        };
    },
    mounted() {

    },
    methods: {
        startTimeChange(val){
            console.log(val);
        }
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