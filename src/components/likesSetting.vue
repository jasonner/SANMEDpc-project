<template>
  <div class="likesSettingPage">
    <div class="title-list">
      <div class="title-left">观众人数显示设置</div>
    </div>
    <div class="content-list">
      <div class="list-left">
        <el-switch v-model="likeList.openValue" inactive-text="显示开关"></el-switch>
        <div class="countdown-display-position">
            <span>点赞数&nbsp;&nbsp;:&nbsp;&nbsp;</span>
            <el-radio v-model="likeList.type" :disabled="!likeList.openValue" label="1">显示</el-radio>
            <el-radio v-model="likeList.type" :disabled="!likeList.openValue" label="2">不显示</el-radio>
        </div>
        <div class="live-prompt-text">
            <div><span >增加形式&nbsp;:</span></div>
            <div><el-checkbox :disabled="likeList.type=='2' || !likeList.openValue" v-model="BaseNumberChecked">默认点赞人数</el-checkbox></div>
            <div><el-input class="live-prompt-input" :disabled="!BaseNumberChecked || likeList.type=='2'" type="number" v-model="likeList.baseNumberVal" placeholder="0"></el-input><span class="people-number">人</span></div>
        </div>
        <div class="live-prompt-text">
            <div class="actualNumber"><el-checkbox :disabled="likeList.type=='2' ||!likeList.openValue" v-model="actualNumberChecked">实际点赞人数</el-checkbox> <span style="font-size:12px;margin-left:2px">X</span></div>
            <div>
                <el-select class="select-people-number"  :disabled="!actualNumberChecked || likeList.type=='2'" v-model="likeList.multiple" placeholder="请选择">
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
            likeList:{
                openValue:false,
                type:'1',//（1.显示；2.不显示）
                baseNumberVal:0,
                multiple:1
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
                    if(res.data.data.like && res.data.data.like !='null'){
                        that.likeList = JSON.parse(res.data.data.like);
                    };
                   
                };
                }else{
                    console.log(res.data.msg);
                };
            });
        },
        
        //提交数据
        submitChange(){
            let that = this;
            let promise = {
                'liveid':that.liveid,
                'like':JSON.stringify(that.likeList),
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
        width: 39%;
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
        width: 40%;
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