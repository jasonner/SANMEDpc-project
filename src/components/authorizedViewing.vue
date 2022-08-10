<template>
  <div class="authorizedViewingPage">
    <div class="title-list">
      <div class="title-left">授权观看设置</div>
      <div class="title-right">
        <!-- <p>使用帮助<span class="el-icon-arrow-right"></span></p> -->
      </div>
    </div>
    <div class="content-list">
        <div class="title-content">
            <div class="title-list">
                <p>主渠道授权设置</p>
                <p>所有渠道授权方式默认为跟随主渠道，各渠道也可独立设置授权方式</p>
            </div>
            <div class="Authorization-type"> 
                <p>当前授权方式:&nbsp;<span>观众白名单</span></p>
                <!-- <p><span>更改授权类型</span></p> -->
            </div>
        </div>
        <!-- 渠道状态 -->
        <div class="channel-status">
            <div>
              <!-- 渠道状态:
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in channelStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>清空</span> -->
                <el-button type="primary" plain @click="whiteOpenChange()">{{whiteTip}}</el-button>
            </div>
            <div>
              <el-button type="primary" plain @click="selectUploadFile()"><span class="el-icon-plus"></span>新增白名单</el-button>
              <el-button type="primary" @click="onLoadModel()">模板下载</el-button>
              <input
                type="file"
                style="display:none"
                @change="uploadFile()"
                name="upload_file"
                ref="file"
            />
            </div>
        </div>

        <!-- 渠道表单 -->
        <div class="channel-from">
            <el-table
              :data="tableData"
              border
              style="width: 100%;text-align: center;">
              <el-table-column
                fixed
                prop="id"
                label="用户ID"
                width="100">
              </el-table-column>
              <el-table-column
                prop="liveid"
                label="直播频道id"
                width="120">
              </el-table-column>
              <el-table-column
                prop="username"
                label="用户账号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="password"
                label="用户密码"
                width="120">
              </el-table-column>
              <el-table-column
                prop="c_time"
                label="创建时间"
                width="160">
              </el-table-column>
              <el-table-column
                prop="u_time"
                label="更新时间"
                width="160">
              </el-table-column>
              
            </el-table>
        </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data() {
    return {
      openValue: false,
      fileList: [],
      channelStatusOptions:[{
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '已启用'
        }, {
          value: '3',
          label: '已停用'
        }],
        value:'1',
        tableData:[], 
        liveid:'',
        whiteIsOpen:null,
        whiteTip:'开启白名单验证',
        userid:null,
        channel:null
    };
  },
  mounted() {
    var query=this.$route.query;
    if(query && query.userid && query.channel){
        this.userid  = query.userid;
        this.channel  = query.channel;
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
            that.whiteIsOpen = res.data.data.white;
            if(res.data.data.white === 0){
              that.whiteTip = "开启白名单验证"
            }else if(res.data.data.white === 1){
              that.whiteTip = "关闭白名单验证"
            }
            that.$nextTick(() => {
              that.getWhiteList()
            });
          };
          }else{
            console.log(res.data.msg);
          };
      });
    },

    //选择上传文件
    selectUploadFile(){
      this.$refs.file.dispatchEvent(new MouseEvent('click'));
    },

    //上传文件
    uploadFile () {
      var files = this.$refs.file.files;
      let that = this;
      var formData = new FormData();
      formData.append('liveid',that.liveid);
      formData.append('file',files[0]);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      };
      that.axios.post('white/upload',formData,config)
      .then(function (res) {
          if(res.data.code && res.data.code == '200'){
          if(res.data.s){
            that.$nextTick(() => {
              that.getWhiteList();
                that.$message({
                  message: res.data.msg,
                  type: 'success'
              });
            });
            
          };
          }else{
              that.$message.error(res.data.msg);
          };
      });
    },

    //获取白名单列表
    getWhiteList(){
      let that = this;
      that.axios.get('white/list?liveid='+that.liveid)
      .then(function (res) {
          console.log(res.data.data)
          if(res.data.code && res.data.code == '200'){
          if(res.data.s){
              that.tableData = res.data.data;
          };
          }else{
              that.$message.error(res.data.msg);
          };
      });
    },

    //模板下载
    onLoadModel(){
      window.open('https://live.lehuitech.com/demo/whitelist.xlsx', '_blank');
    },

    //开启白名单验证
    whiteOpenChange(){
      let that = this;
      if(that.whiteIsOpen === 0){
        var promise = {
          liveid:that. liveid,
          action:'ON'//开启
        };
      }else{
        var promise = {
          liveid:that. liveid,
          action:'OFF'//关闭
        };
      }
      that.axios.post('live/white',qs.stringify(promise))
      .then(function (res) {
          console.log(res.data.data)
          if(res.data.code && res.data.code == '200'){
            that.getLiveDetail(that.userid,that.channel);
            that.$message({
              message: '操作成功',
              type: 'success'
            });
          }else{
              that.$message.error(res.data.msg);
          };
      });
    }

  },
};
</script>
<style scoped>
.authorizedViewingPage .title-list {
  width: 100%;
  height: 40px;
  color: #787878;
  background-color: #f5f5f5;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
}
.authorizedViewingPage .title-list .title-left {
  text-align: left;
  flex: 1;
  line-height: 40px;
}
.authorizedViewingPage .title-list .title-right {
  text-align: right;
  flex: 1;
  line-height: 40px;
}
.authorizedViewingPage .title-list .title-right p {
  display: inline-block;
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  border: 1px solid #dfdfdf;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  color: #3c8cd2;
}
.authorizedViewingPage .title-list .title-right p span {
  margin-right: 5px;
  color: #3c8cd2;
}

/* content-list */
.authorizedViewingPage .content-list {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
}
.authorizedViewingPage .content-list .title-content{
    width: 100%;
    margin: 0 auto;
    border: 1px dashed #dfdfdf;
    padding: 20px;
    box-sizing: border-box;
}
.authorizedViewingPage .content-list .title-list{
    display: flex;
    
}
.authorizedViewingPage .content-list .title-list p{
    line-height: 40px;
    flex: auto;
}
.authorizedViewingPage .content-list .title-list p:nth-last-of-type(1){
    font-size: 10px;
    text-align: right;
}

.authorizedViewingPage .content-list .Authorization-type{
    display: flex;
    width: 100%;
    padding:0 30px;
    box-sizing: border-box;
    margin-top: 20px;
}
.authorizedViewingPage .content-list .Authorization-type p{
    flex: auto;
    font-size: 12px;
}
.authorizedViewingPage .content-list .Authorization-type p:nth-of-type(1) span{
    display: inline-block;
    padding: 5px;
    background: #efefef;
    border-radius: 5px;

}
.authorizedViewingPage .content-list .Authorization-type p:nth-of-type(2){
    text-align: right;
}
.authorizedViewingPage .content-list .Authorization-type p:nth-of-type(2) span{
    color: #3c8cd2;
    cursor: pointer;
}
.authorizedViewingPage .channel-status{
    display: flex;
    margin-top: 20px;
}
.authorizedViewingPage .channel-status div{
    flex: auto;
    font-size: 12px;
}
.authorizedViewingPage .channel-status div:nth-of-type(1){
    width: 30%;
    height: 40px;
}
.authorizedViewingPage .channel-status div:nth-of-type(1) span{
    color: #3c8cd2;
    margin-left: 10px;
    cursor: pointer;
}
.authorizedViewingPage .channel-status div:nth-of-type(2){
  text-align: right;
}
.authorizedViewingPage .channel-from{
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
</style>
