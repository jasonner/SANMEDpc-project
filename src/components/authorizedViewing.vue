<template>
  <div class="authorizedViewingPage">
    <div class="title-list">
      <div class="title-left">授权观看设置</div>
      <div class="title-right">
        <p>使用帮助<span class="el-icon-arrow-right"></span></p>
      </div>
    </div>
    <div class="content-list">
        <div class="title-content">
            <div class="title-list">
                <p>主渠道授权设置</p>
                <p>所有渠道授权方式默认为跟随主渠道，各渠道也可独立设置授权方式</p>
            </div>
            <div class="Authorization-type"> 
                <p>当前授权方式:&nbsp;<span>无限制</span></p>
                <p><span>更改授权类型</span></p>
            </div>
        </div>
        <!-- 渠道状态 -->
        <div class="channel-status">
            <div>渠道状态:
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in channelStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <span>清空</span>
            </div>
            <div>
              <el-button type="info" plain><span class="el-icon-plus"></span>新增渠道</el-button>
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
                prop="channelID"
                label="渠道ID"
                width="150">
              </el-table-column>
              <el-table-column
                prop="name"
                label="渠道名称"
                width="120">
              </el-table-column>
              <el-table-column
                prop="province"
                label="累计访问次数"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                label="授权方式"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="渠道状态"
                width="120">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="创建时间"
                width="120">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="渠道地址"
                width="120">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
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
