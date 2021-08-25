<template>
  <div class="likesSettingPage">
    <div class="title-list">
      <div class="title-left">观众人数显示设置</div>
    </div>
    <div class="content-list">
      <div class="list-left">
        <el-switch v-model="openValue" inactive-text="显示开关"></el-switch>
        <div class="countdown-display-position">
            <span>点赞数&nbsp;&nbsp;:&nbsp;&nbsp;</span>
            <el-radio v-model="radioCountdownVal" :disabled="!openValue" label="1">显示</el-radio>
            <el-radio v-model="radioCountdownVal" :disabled="!openValue" label="2">不显示</el-radio>
        </div>
        <div class="live-prompt-text">
            <div><span >增加形式&nbsp;:</span></div>
            <div><el-checkbox :disabled="radioCountdownVal=='2' || !openValue" v-model="BaseNumberChecked">默认点赞人数</el-checkbox></div>
            <div><el-input class="live-prompt-input" :disabled="!BaseNumberChecked || radioCountdownVal=='2'" type="number" v-model="BaseNumberVal" placeholder="0"></el-input><span class="people-number">人</span></div>
        </div>
        <div class="live-prompt-text">
            <div class="actualNumber"><el-checkbox :disabled="radioCountdownVal=='2' ||!openValue" v-model="actualNumberChecked">实际点赞人数</el-checkbox> <span style="font-size:12px;margin-left:2px">X</span></div>
            <div>
                <el-select class="select-people-number"  :disabled="!actualNumberChecked || radioCountdownVal=='2'" v-model="actualNumberVal" placeholder="请选择">
                    <el-option
                    v-for="item in actualNumberoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span class="people-number">倍</span>
            </div>
        </div>
        <div class="live-countdown-time">
            <span>注&nbsp;:</span> 
            <p>1.显示点赞人数=默认基础点赞数+实际点赞数x倍数</p>
            <p>  2.该数据只为前端用户展现，后台数据以真实数据统计</p>
        </div>
      </div>
      <div class="list-right">
        <span>预览:</span>
        <img src="@/assets/img/liveStreaming/like-example.png" alt="" srcset="" />
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
            openValue:true,
            radioCountdownVal:'1',
            tipVal:'距直播开始',
            startDatetime:'',
            actualNumberVal:'1',
            pickerOptions: {
                disabledDate(v) {
                return v.getTime() < new Date().getTime() - 86400000;
                }
            },
            BaseNumberVal:'0',
            BaseNumberChecked:false,
            actualNumberChecked:false,
            actualNumberoptions:[{
                value: '1',
                label: '1'
            }, {
                value: '2',
                label: '2'
            }, {
                value: '3',
                label: '3'
            }, {
                value: '4',
                label: '4'
            }, {
                value: '5',
                label: '5'
            },{
                value: '6',
                label: '6'
            },{
                value: '7',
                label: '7'
            },{
                value: '8',
                label: '8'
            },{
                value: '9',
                label: '9'
            },{
                value: '10',
                label: '10'
            }],
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
    .likesSettingPage {
        width: 100%;
    }
    .likesSettingPage .title-list {
        width: 100%;
        height: 40px;

        color: #787878;
        background-color: #f5f5f5;
        display: flex;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .likesSettingPage .title-list .title-left {
        text-align: left;
        flex: 1;
        line-height: 40px;
    }
    .likesSettingPage .title-list .title-right {
        text-align: right;
        flex: 1;
        line-height: 40px;
    }
    .likesSettingPage .title-list .title-right p {
        display: inline-block;
        font-size: 12px;
        text-align: center;
        padding: 5px 10px;
        border: 1px solid #dfdfdf;
        background: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .likesSettingPage .title-list .title-right p span {
        margin-right: 5px;
    }

    /* content-list */
    .likesSettingPage .content-list {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
        display: flex;
    }
    .likesSettingPage .content-list .list-left {
        flex: 1.5;
        text-align: left;
    }
    .likesSettingPage .content-list .list-left .open-introduce {
        font-size: 12px;
        margin-top: 10px;
    }
    .likesSettingPage .content-list .list-right {
        flex: 1;
        text-align: left;
        border-left: 1px solid #dfdfdf;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .likesSettingPage .content-list .list-right span{
        float: left;
    }
    .likesSettingPage .content-list .list-right img {
        width: 100%;
    }
    .likesSettingPage  .countdown-display-position{
        width: 100%;
        margin-top: 20px;
    }
    .likesSettingPage  .countdown-display-position span{
        font-size: 12px;
    }
    .likesSettingPage .live-prompt-text{
        width: 100%;
        margin-top: 20px;
        display: flex;
    }
    .likesSettingPage .live-prompt-text div{
        flex: auto;
    }
    .likesSettingPage .actualNumber{
        width: 32%;
        margin-left: 58px;
    }
    .likesSettingPage .el-input__inner{
        height: 30px !important;
    }
    .likesSettingPage .select-people-number{
        width: 28%;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
    }
    .likesSettingPage .live-prompt-text span{
        font-size: 12px;
        line-height: 1;
    }
    .likesSettingPage .select-people-number .el-input__suffix{
        top: 0px;
    }
    .likesSettingPage .select-people-number .el-input__icon{
        line-height: 1;
    }
    .likesSettingPage .live-prompt-text .live-prompt-input{
        height: 30px;
        width: 30%;
        margin-left: 10px;
    }
    .likesSettingPage .live-prompt-text .el-checkbox{
        margin-left: 10px;
    }
    .likesSettingPage .live-prompt-text .live-prompt-input .el-input__inner{
        font-size: 12px;
        color: #999;
    }
    .likesSettingPage .live-prompt-text .people-number{
        font-size: 12px;
        margin-left: 20px;
    }

    .likesSettingPage .live-prompt-text .live-prompt-input .el-input__suffix {
        right: -70px;
    }  
    .likesSettingPage  .live-countdown-time{
        width: 100%;
        margin-top: 20px;
    }
    .likesSettingPage  .live-countdown-time p{
        font-size: 12px;
        line-height: 1.5;
        margin-left: 30px;
        color: #999;
    }
    .likesSettingPage  .live-countdown-time span{
        font-size: 12px;
        float: left;
        color: #999;
    }
    .likesSettingPage .list-footer{
        width: 100%;
        background: #fff;
        text-align: center;
        border-top: 1px solid #ececec;
        padding: 40px 0;
        box-sizing: border-box;
    }
</style>