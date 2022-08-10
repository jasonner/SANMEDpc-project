<template>
  <div class="liveGuidePage">
    <div class="title-list">
      <div class="title-left">直播引导图</div>
      <div class="title-right">
        <el-popover
						placement="top-start"
						title="观看地址"
						width="200"
						trigger="click"
					>
						<div>
							<div id="qrcode" ref="qrcodeR"></div>
							<div></div>
						</div>
						<el-button style="padding:0;border:none; background:none;" slot="reference" @click="payOrder()">
							<p  style="margn-bottom:100px;"><span class="el-icon-full-screen"></span>手机预览</p>
						</el-button>
					</el-popover>
        
      </div>
    </div>
    <div class="content-list">
      <div class="list-left">
        <el-switch v-model="openValue" inactive-text="直播引导图"> </el-switch>
        <p class="open-introduce">
          此图片显示在进入直播页面之前，用于展示直播相关介绍内容
        </p>
        <div class="upload-img">
          <el-upload
            class="upload-demo"
              action=""
              :http-request="uploadImg"
              :limit="1"
              :file-list="fileList"
              :disabled="!openValue"
            >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              <p>图片大小4M以内</p>
              <p>图片分辨率1125*2436像素</p>
              <p>支持GIF、PNG、JPG、JPEG格式</p>
            </div>
          </el-upload>
        </div>

        <div class="safety-zone">
          <div class="title">鼠标移动到预览区域可查看内容安全区</div>
          <el-popover placement="right" width="160">
            <div class="safetyZone-img">
              <img
                src="@/assets/img/liveStreaming/safetyZone.jpg"
                alt=""
                srcset=""
              />
            </div>
            <div slot="reference" class="safety-zone-text">
              <span class="el-icon-question"></span>内容安全区
            </div>
          </el-popover>
        </div>
      </div>
      <div class="list-right">
        <span>预览:</span>
        <img :src="guideSrc" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script>
import OSS from 'ali-oss';
import QRCode from 'qrcodejs2'
import qs from 'qs'
export default {
  data() {
    return {
      openValue: true,
      fileList: [],
      guideSrc:require('@/assets/img/liveStreaming/myLive.jpg'),
      liveid:'',
      qrcode:'',
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
            console.log(res.data.data)
            if(res.data.code && res.data.code == '200'){
            if(res.data.s){
              that.guideSrc = res.data.data.guide;
            };
            }else{
                that.$message.error(res.data.msg);
            };
        });
    },

    //自定义上传方法..
    uploadImg(file) {
      //判断扩展名
      const tmpcnt = file.file.name.lastIndexOf(".")
      const exname = file.file.name.substring(tmpcnt + 1)
      const names = ['jpg', 'jpeg', 'webp', 'png','bmp']
      if(names.indexOf(exname)< 0 ){
        this.$message.error("不支持的格式!")
        return
      }
      console.log(file);
      var name = 'lehuiLive';
      let fileName = 'LehuiLive/'+name+'/'+'LehuiLive-oss'+file.file.lastModified;
      console.log(fileName);
      const _this = this;
      _this.axios.get('https://cac.sanmedgene.com/forhoo/GetOSSSTS?dir=LehuiLive').then((result) => {
        console.log(result.data);
        _this.client =  new OSS({
          region: result.data.region,
          accessKeyId: result.data.data.accessKeyId,
          accessKeySecret: result.data.data.accessKeySecret,
          stsToken: result.data.data.securityToken,
          bucket: result.data.bucketName
        });
        this.getBase64(file.file).then(resBase64 => {
          const base64 = resBase64.split(",").pop();
          const fileType = resBase64.split(";").shift().split(":").pop();
          // base64转blob
          const blob = _this.dataURLtoBlob(base64, fileType);
          console.log(blob);
          // blob转arrayBuffer
          const reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onload = event => {
            //arrayBuffer转Buffer
            const buffer = OSS.Buffer(event.target.result);
            // 上传
            _this.client.put(fileName, buffer)
            .then( result=> {
              let httpUrl = 'https://merckoss.wfbweb.com/'
              _this.guideSrc = httpUrl+fileName;
              console.log(_this.guideSrc);
              _this.$nextTick(() => {
                _this.SubmitEvent();
              })
            })
            .catch( err=> {
                console.log("错误", err);
            });
          };
        })
      })
    },

    //file文件转base64
    getBase64(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file);
　　　　　//开始转
        reader.onload = function() {
          fileResult = reader.result;
        };
　　　　　//转 失败
        reader.onerror = function(error) {
          reject(error);
        };
　　　　　//转 结束 
        reader.onloadend = function() {
          resolve(fileResult);
        };
      });
    },
    
    // base64转blob
    dataURLtoBlob(urlData, fileType) {
        let bytes = window.atob(urlData);
        let n = bytes.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bytes.charCodeAt(n);
        }
        return new Blob([u8arr], {
            type: fileType
        });
    },

    //提交引导图
    SubmitEvent(){
      let that = this;
      let promise = {
        'liveid':that.liveid,
        'guide':that.guideSrc,
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

    //观看二维码
    payOrder(){
      this.qrcode = 'https://h5.lehuitech.com/html/live/index.html?id='+this.liveid;
      let that = this;
      let promise = {
        'auth_url':'https://h5.lehuitech.com/html/live/index.html?id='+this.liveid
      };
      that.axios.post('https://api.lehuitech.com/auth/live',qs.stringify(promise)).then((res) => {
        console.log(res.data);
        if (res.data.code && res.data.code =='200') {
          if(res.data && res.data.s){
            that.qrcode = res.data.data.url;
              that.$nextTick(() => {
                that.crateQrcode()
              })
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

    // 生成二维码
    crateQrcode () {
      this.$refs.qrcodeR.innerHTML = ''
      this.qr = new QRCode('qrcode', {
      width: 150,
      height: 150, // 高度
      text: this.qrcode // 二维码内容
      // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      // background: '#f0f'
      // foreground: '#ff0' 
      })
      console.log(this.qrcode)
    },

  },

};
</script>
<style scoped>
.liveGuidePage .title-list {
  width: 100%;
  height: 40px;
  color: #787878;
  background-color: #f5f5f5;
  display: flex;
  padding: 0 30px;
  box-sizing: border-box;
}
.liveGuidePage .title-list .title-left {
  text-align: left;
  flex: 1;
  line-height: 40px;
}
.liveGuidePage .title-list .title-right {
  text-align: right;
  flex: 1;
  line-height: 40px;
}
.liveGuidePage .title-list .title-right p {
  display: inline-block;
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  border: 1px solid #dfdfdf;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
}
.liveGuidePage .title-list .title-right p span {
  margin-right: 5px;
}

/* content-list */
.liveGuidePage .content-list {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
}
.liveGuidePage .content-list .list-left {
  flex: 1.5;
  text-align: left;
}
.liveGuidePage .content-list .list-left .open-introduce {
  font-size: 12px;
  margin-top: 10px;
}
.liveGuidePage .content-list .list-right {
  flex: 1;
  text-align: left;
  border-left: 1px solid #dfdfdf;
  padding-left: 30px;
  box-sizing: border-box;
}
.liveGuidePage .upload-img {
  margin-top: 20px;
}
.liveGuidePage .upload-img .el-upload__tip p {
  font-size: 12px;
  line-height: 2;
}
.liveGuidePage .safety-zone {
  width: 300px;
}
.liveGuidePage .safety-zone .title {
  font-size: 12px;
  color: #999;
  margin-top: 30px;
}
.liveGuidePage .safety-zone .safety-zone-text {
  width: 100px;
  font-size: 14px;
  margin-top: 10px;
  color: #3c8cd2;
  cursor: pointer;
  font-weight: 700;
}
.liveGuidePage .safety-zone .safety-zone-text span {
  margin-right: 5px;
}
.safetyZone-img {
  width: 100%;
}
.safetyZone-img img {
  width: 100%;
}
.liveGuidePage .content-list .list-right span {
  float: left;
}
.liveGuidePage .content-list .list-right img {
  width: 70%;
}
</style>