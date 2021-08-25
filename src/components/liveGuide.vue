<template>
  <div class="liveGuidePage">
    <div class="title-list">
      <div class="title-left">直播引导图</div>
      <div class="title-right">
        <p><span class="el-icon-full-screen"></span>手机预览</p>
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
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
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
        <img src="@/assets/img/liveStreaming/myLive.jpg" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      openValue: false,
      fileList: [],
    };
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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