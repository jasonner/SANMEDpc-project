<template>
  <div class="settingPopNumPage">
    <div class="title-list">
      <div class="title-left">观众人数显示设置</div>
    </div>
    <div class="content-list">
      <div class="list-left">
        <el-switch v-model="peopleList.openValue" inactive-text="显示开关"></el-switch>
        <div class="countdown-display-position">
            <span >显示形式&nbsp;&nbsp;:&nbsp;&nbsp;</span>
            <el-radio v-model="peopleList.type" :disabled="!peopleList.openValue" label="1">真实在线人数</el-radio>
            <el-radio v-model="peopleList.type" :disabled="!peopleList.openValue" label="2">真实累计人数(观看人数)</el-radio>
        </div>
        <div class="live-prompt-text">
            <div><span >增加形式&nbsp;:</span></div>
            <div><el-checkbox :disabled="!peopleList.openValue" v-model="BaseNumberChecked">默认基础人数</el-checkbox></div>
            <div><el-input class="live-prompt-input" :disabled='!BaseNumberChecked ||!peopleList.openValue' type="number" v-model="peopleList.baseNumber" placeholder="0"></el-input><span class="people-number">人</span></div>
        </div>
        <div class="live-prompt-text">
            <div class="actualNumber"><el-checkbox :disabled="!peopleList.openValue" v-model="actualNumberChecked">实际人数</el-checkbox> <span style="font-size:12px;margin-left:2px">X</span></div>
            <div>
                <el-select class="select-people-number"  :disabled="!actualNumberChecked || !peopleList.openValue" v-model="peopleList.multiple" placeholder="请选择">
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
            <p>1.显示观众人数=默认基础人数+实际人数×倍数</p>
            <p>2.该数据只为前端用户展现，后台数据以真实数据统计</p>
        </div>
      </div>
      <div class="list-right">
        <span>预览:</span>
        <img src="@/assets/img/liveStreaming/vertical-visitor-bg.png" alt="" srcset="" />
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
            liveid:'',
            peopleList:{
                openValue:false,
                type:'1',
                baseNumber:0,//基础人数
                multiple:1//倍数
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
                console.log(res.data.data.people)
                if(res.data.code && res.data.code == '200'){
                if(res.data.s){
                    if(res.data.data.people && res.data.data.people !='null'){
                        that.peopleList =  JSON.parse(res.data.data.people);
                    };
                };
                }else{
                    that.$message.error(res.data.msg);
                };
            });
        },

        //提交数据
        submitChange(){
            let that = this;
            let promise = {
                'liveid':that.liveid,
                'people':JSON.stringify(that.peopleList),
            };
            that.axios.post('live/decorate',qs.stringify(promise)).then((res) => {
                console.log(res.data);
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

    },
};
</script>
<style>
    .settingPopNumPage {
        width: 100%;
    }
    .settingPopNumPage .title-list {
        width: 100%;
        height: 40px;

        color: #787878;
        background-color: #f5f5f5;
        display: flex;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .settingPopNumPage .title-list .title-left {
        text-align: left;
        flex: 1;
        line-height: 40px;
    }
    .settingPopNumPage .title-list .title-right {
        text-align: right;
        flex: 1;
        line-height: 40px;
    }
    .settingPopNumPage .title-list .title-right p {
        display: inline-block;
        font-size: 12px;
        text-align: center;
        padding: 5px 10px;
        border: 1px solid #dfdfdf;
        background: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    .settingPopNumPage .title-list .title-right p span {
        margin-right: 5px;
    }

    /* content-list */
    .settingPopNumPage .content-list {
        width: 100%;
        height: 100%;
        padding: 30px;
        box-sizing: border-box;
        background: #fff;
        display: flex;
    }
    .settingPopNumPage .content-list .list-left {
        flex: 1.5;
        text-align: left;
    }
    .settingPopNumPage .content-list .list-left .open-introduce {
        font-size: 12px;
        margin-top: 10px;
    }
    .settingPopNumPage .content-list .list-right {
        flex: 1;
        text-align: left;
        border-left: 1px solid #dfdfdf;
        padding-left: 30px;
        box-sizing: border-box;
    }
    .settingPopNumPage .content-list .list-right span{
        float: left;
    }
    .settingPopNumPage .content-list .list-right img {
        width: 100%;
    }
    .settingPopNumPage  .countdown-display-position{
        width: 100%;
        margin-top: 20px;
    }
    .settingPopNumPage  .countdown-display-position span{
        font-size: 12px;
    }
    .settingPopNumPage .live-prompt-text{
        width: 100%;
        margin-top: 20px;
        display: flex;
    }
    .settingPopNumPage .actualNumber{
        margin-left: 55px;
    }
    .settingPopNumPage .el-input__inner{
        height: 30px !important;
    }
    .settingPopNumPage .select-people-number{
        width: 46%;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
    }
    .settingPopNumPage .live-prompt-text span{
        font-size: 12px;
        line-height: 1;
    }
    .settingPopNumPage .select-people-number .el-input__suffix{
        top: 0px;
    }
    .settingPopNumPage .select-people-number .el-input__icon{
        line-height: 1;
    }
    .settingPopNumPage .live-prompt-text .live-prompt-input{
        height: 30px;
        width: 50%;
        margin-left: 10px;
    }
    .settingPopNumPage .live-prompt-text .el-checkbox{
        margin-left: 10px;
    }
    .settingPopNum5Page .live-prompt-text .live-prompt-input .el-input__inner{
        font-size: 12px;
        color: #999;
    }
    .settingPopNumPage .live-prompt-text .people-number{
        font-size: 12px;
        margin-left: 20px;
    }

    .settingPopNumPage .live-prompt-text .live-prompt-input .el-input__suffix {
        right: -70px;
    }  
    .settingPopNumPage  .live-countdown-time{
        width: 100%;
        margin-top: 20px;
    }
    .settingPopNumPage  .live-countdown-time p{
        font-size: 12px;
        line-height: 1.5;
        margin-left: 30px;
        color: #999;
    }
    .settingPopNumPage  .live-countdown-time span{
        font-size: 12px;
        float: left;
        color: #999;
    }
    .settingPopNumPage .list-footer{
        width: 100%;
        background: #fff;
        text-align: center;
        border-top: 1px solid #ececec;
        padding: 40px 0;
        box-sizing: border-box;
    }
</style>