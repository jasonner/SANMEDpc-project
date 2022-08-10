<template>
	<div class="List2">
		<div class="List2Top">
			观看页主题设置
		</div>
		<div class="List2xuan">
			<div class="waiceng" style="align-items: flex-end;">
				<div style="margin-left: 20px;font-size: 14px;">频道主题：</div>
				<el-radio v-model="themList.type" label="1" size="mini" @change="themeSelectChange(themList.type)">通用版</el-radio>
				<el-radio v-model="themList.type" label="2" size="mini" @change="themeSelectChange(themList.type)">科技版</el-radio>
				<el-radio v-model="themList.type" label="3" size="mini" @change="themeSelectChange(themList.type)">新年版</el-radio>
			</div>
			<div class="waiceng" style="margin-left: 40%;">
				<div>显示手机观看二维码：</div>
				<el-switch
					v-model="openVal"
				>
				</el-switch>
			</div>
		</div>
		<div style="display: flex;border-bottom: solid 1px #e6e6e6;">
			<div class="leftDiv">
				<div class="uplayDiv">
					<div class="title">频道图标：</div>
					<div>
						<el-upload  action=""
							:class="{Iconhide:iconHideUpload}"
							:on-change="iconHandleChange" 
							:on-remove="iconRemoveChange"
							:multiple="false"
              				:http-request="uploadIcon"
              				:limit="1"
             				:file-list="fileList"
							list-type="picture-card" class="uplay1" :style="{backgroundImage:'url(' + themList.iocnImg + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center top', backgroundSize: '100% 100%'}">
							<i class="el-icon-upload2">
							</i>
						</el-upload>
						<div style="font-size: 10px;color: #999999;margin-top: 5px;">图片尺寸：128*128px；图片大小：2M以内;</div>
						<div style="font-size: 10px;color: #999999;">图片格式：png、jpg、jpeg;</div>
					</div>
				</div>
				<div class="uplayDiv" style="margin-top: 10px;">
					<div class="title" style="margin-top: 38px;">背景图片：</div>
					<div class="bg-img-box" >
						<el-upload 
							:class="{hide:hideUpload}"
							:on-change="handleChange" 
							:on-remove="removeChange"
							:http-request="uploadBG"
              				:limit="1"
							:multiple="false"
             				:file-list="fileList"
							list-type="picture-card"
							v-if="themList.type=='1'" action="" class="uplay2 isActive1"  :style="{backgroundImage:'url(' + themList.bgImg + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center top'}">
							<i class="el-icon-upload2"></i>
						</el-upload>
						<el-upload 
							:on-change="handleChange" 
							:on-remove="removeChange"
							:http-request="uploadBG"
              				:limit="1"
							:multiple="false"
             				:file-list="fileList"
							list-type="picture-card"
							:class="{hide:hideUpload}"
						 	v-if="themList.type=='2'" action="" class="uplay2 isActive2" :style="{backgroundImage:'url(' + themList.bgImg + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center top'}">
							<i class="el-icon-upload2"></i>
						</el-upload>
						<el-upload 
							:on-change="handleChange" 
							:on-remove="removeChange"
							:http-request="uploadBG"
              				:limit="1"
							:multiple="false"
             				:file-list="fileList"
							list-type="picture-card"
							:class="{hide:hideUpload}"
							v-if="themList.type=='3'" action="" class="uplay2 isActive3" :style="{backgroundImage:'url(' + themList.bgImg + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center top'}">
							<i class="el-icon-upload2"></i>
						</el-upload>
						<div style="font-size: 10px;color: #999999;margin-top: 5px;">图片尺寸：宽1920px；高度不限;</div>
						<div style="font-size: 10px;color: #999999;">图片大小：2MB以内；图片格式：png、jpg、jpeg;</div>
					</div>
				</div>
				<div class="uplayDiv" style="margin-top: 10px;">
					<div class="title" style="margin-top: 9px;">观看页背景色:</div>
					<div>
						<el-color-picker v-model="themList.bgColor"></el-color-picker>
					</div>
				</div>
				<div class="uplayDiv" style="margin-top: 10px;">
					<div class="title" style="margin-top: 6.5px;">页脚信息:</div>
					<div>
						<el-input type="text" placeholder="请输入..." v-model="themList.footerMsg" maxlength="40" show-word-limit></el-input>
					</div>
				</div>
				<el-button size="mini" class="huifu">恢复默认</el-button>
			</div>
			<div class="rightDiv">
				<div class="theme-img-box">
					<div class="title">预览图:</div>
					<div class="yulan" :style="{'background':themList.bgColor}">
						<img  :src="themeSrc" alt="" srcset="">
					</div>
				</div>
			</div>
		</div>
		<div style="width: 100%;text-align: center;">
			<el-button size="mini" type="primary" class="tijiao" @click="submitChange()">提交</el-button>
		</div>
	</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	import OSS from 'ali-oss';
	import qs from 'qs'
	export default {
		data() {
			return {
				liveid:'',
				openVal: false,
				dialogImageUrl: '',
				dialogVisible: false,
				color1: '#F2FCF4',
				yulan:require('@/assets/img/bg2.png'),
				themeSrc:require('@/assets/img/liveStreaming/theme-default.png'),
				themList:{
					type:'1',
					iocnImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/logo1.png',
					bgImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/theme-default-bg.png',
					bgColor:'#F2FCF4',
					footerMsg:'',
				},
				fileList:[],
				hideUpload: false,
				iconHideUpload:false
			}
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
			themeSelectChange(val){
				console.log(val);
				let that = this;
				that.themList.type = val;
				switch (val) {
					case '1':
						that.themeSrc = require('@/assets/img/liveStreaming/theme-default.png');
						that.themList={
							type:'1',
							iocnImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/logo1.png',
							bgImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/theme-default-bg.png',
							bgColor:'#F2FCF4',
							footerMsg:'',
						}
						break;
					case '2':
						that.themeSrc = require('@/assets/img/liveStreaming/theme-tech.png');
						that.themList={
							type:'2',
							iocnImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/logo1.png',
							bgImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/theme-tech-bg.png',
							bgColor:'#272A45',
							footerMsg:'',
						}
						break;
					case '3':
						that.themeSrc = require('@/assets/img/liveStreaming/theme-year.png');
						that.themList={
							type:'3',
							iocnImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/logo1.png',
							bgImg:'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/theme-year-bg.png',
							bgColor:'#A81C18',
							footerMsg:'',
						}
						break;
					default:
						break;
				}
			},

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
						if(res.data.data.theme && res.data.data.theme !='null'){
							that.themList = JSON.parse(res.data.data.theme);
							console.log(that.themList)
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
					'theme':JSON.stringify(that.themList),
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

			iconHandleChange(){
				this.iconHideUpload = true;
			},

			handleChange(){
				this.hideUpload = true;
			},

			iconRemoveChange(){
				this.iconHideUpload = false;
			},

			removeChange(){
				this.iconHideUpload = false;
			},

			//上传图标
			uploadIcon(file){
				this.uploadImg(file,'icon')
			},
			
			//上传背景图
			uploadBG(file){
				this.uploadImg(file,'bgimg')
			},
			//自定义上传方法..
			uploadImg(file,type) {
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
							if(type == 'icon'){
								_this.themList.iocnImg = httpUrl+fileName;
							}else{
								_this.themList.bgImg = httpUrl+fileName;
							}
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
		},
		
	};
</script>
<style>
.el-upload-list--picture-card .el-upload-list__item{
	width: 100%;
	height:100%;
	background-color: transparent;
}
.el-upload--picture-card{
	background-color: transparent;
}

.hide .el-upload--picture-card {
    display: none !important;
}
.Iconhide .el-upload--picture-card {
    display: none !important;
}
</style>
<style scoped>
.bg-img-box{
	width: 260px;
	position: relative;
	margin-top: 20px;
}
.bg-img-box img{
	width: 90%;
	position: absolute;
	left: 0;
	top: 0;
	margin-bottom: 20px;
	z-index: 10;
}
.bg-img-box .isActive1{
	width: 90%;
	height: 100px;
	z-index: 1001;
	background: url('../assets/img/theme-default-bg.png');
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
}
.bg-img-box .isActive2{
	width: 90%;
	height: 100px;
	z-index: 1001;
	background: url('../assets/img/theme-tech-bg.png');
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
}
.bg-img-box .isActive3{
	width: 90%;
	height: 100px;
	z-index: 1001;
	background: url('../assets/img/theme-year-bg.png');
	background-size: 100% 100%;
	background-position: center;
	background-repeat: no-repeat;
}
</style>
<style>
	.List2 {
		height: 100%;
		width: 100%;
		/* height: 100%; */
		overflow: auto;
		background: white;
		border-radius: 10px;
	}

	.List2 .List2Top {
		height: 6.5%;
		display: flex;
		color: #787878;
		font-size: 16px;
		padding-left: 20px;
		align-items: center;
		background-color: #f5f5f5;
	}

	.List2 .List2xuan {
		height: 9%;
		display: flex;
		color: #787878;
		font-size: 16px;
		padding-left: 20px;
		align-items: center;
		background-color: #fafafa;
		border-bottom: 1px solid #e6e6e6;
	}

	.List2 .List2xuan .waiceng {
		display: flex;
		font-size: 12px;
		align-items: center;
	}

	.List2 .List2xuan .el-radio {
		margin-right: 15px
	}

	.List2 .List2xuan .el-radio__label {
		padding-left: 5px;
	}

	.List2 .List2xuan .el-radio__inner,
	.el-radio__label {
		width: 12px;
		height: 12px;
		font-size: 12px;
	}

	.List2 .List2xuan .el-switch__core {
		height: 15px;
		width: 35px !important;
	}

	.List2 .List2xuan .el-switch__core::after {
		height: 14px;
		margin-top: -1.1px;
		width: 14px !important;
	}
		
	.List2 .uplay1 {
		width: 60px;
		height: 60px;
		background: url('https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/logo1.png') center no-repeat;
		background-size: 100% 100%;
	}	
	.List2 .uplay1 .el-upload {
		height: 60px;
		width: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #000;
		opacity: 0.5;

	}

	.List2 .uplay1 .el-upload:hover{
		background: #000;
		opacity: 0.5;
	}
	.List2 .uplay2 .el-upload {
		height: 100px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.List2 .uplay2 .el-upload:hover {
		background: #000;
		opacity: 0.5;
	}
	.List2 .leftDiv {
		width: 50%;
		padding-top: 20px;
		border-right: 1px solid #e6e6e6;
	}

	.List2 .uplayDiv {
		display: flex;
		align-items: flex-start;
	}

	.List2 .uplayDiv .title{
		width: 150px;
		color: #666666;
		font-size: 14px;
		margin-top: 20px;
		text-align: right;
		padding-right: 5px;
		box-sizing: border-box;
	}
	.List2 .el-color-picker__trigger{
		width: 100px;
	}
	
	.List2 .el-color-picker__color{
		border: none;
	}
	
	.List2 .el-input{
		height: 35px;
	}
	
	.List2 .huifu{
		margin-top: 20px;
		margin-left: 100px;
		margin-bottom: 20px;
	}
	
	.List2 .rightDiv{
		width: 50%;
		padding-top: 20px;
		padding-left: 20px;
		box-sizing: content-box;
	}
	.theme-img-box{
		width: 100%;
		height: 100%;
	}
	.theme-img-box img{
		width: 100%;
		height: 100%;
		object-fit:fill;
	}
	.List2 .rightDiv .title{
		color: #666666;
		font-size: 14px;
	}
	
	.List2 .rightDiv .yulan{
		width: 90%;
		height: 250px;
		margin-top: 20px;
		background-size: cover;
		background-position: center;
	}
	
	.List2 .tijiao{
		margin-top: 20px;
	}
	.el-icon-upload2{
		font-size: 24px;
		color: #fff;
	}
</style>
