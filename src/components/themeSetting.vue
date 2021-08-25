<template>
	<div class="List2">
		<div class="List2Top">
			观看页主题设置
		</div>
		<div class="List2xuan">
			<div class="waiceng" style="align-items: flex-end;">
				<div style="margin-left: 20px;font-size: 14px;">频道主题：</div>
				<el-radio v-model="radio1" label="1" size="mini">通用版</el-radio>
				<el-radio v-model="radio1" label="2" size="mini">科技版</el-radio>
				<el-radio v-model="radio1" label="3" size="mini">新年版</el-radio>
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
						<el-upload list-type="picture" action="" class="uplay1">
							<i class="el-icon-upload2"></i>
						</el-upload>
						<div style="font-size: 10px;color: #999999;margin-top: 5px;">图片尺寸：128*128px；图片大小：2M以内;</div>
						<div style="font-size: 10px;color: #999999;">图片格式：png、jpg、jpeg;</div>
					</div>
				</div>
				<div class="uplayDiv" style="margin-top: 10px;">
					<div class="title" style="margin-top: 38px;">背景图片：</div>
					<div>
						<el-upload list-type="picture" action="" class="uplay2">
							<i class="el-icon-upload2"></i>
						</el-upload>
						<div style="font-size: 10px;color: #999999;margin-top: 5px;">图片尺寸：宽1920px；高度不限;</div>
						<div style="font-size: 10px;color: #999999;">图片大小：2MB以内；图片格式：png、jpg、jpeg;</div>
					</div>
				</div>
				<div class="uplayDiv" style="margin-top: 10px;">
					<div class="title" style="margin-top: 9px;">观看页背景色:</div>
					<div>
						<el-color-picker v-model="color1"></el-color-picker>
					</div>
				</div>
				<div class="uplayDiv" style="margin-top: 10px;">
					<div class="title" style="margin-top: 6.5px;">页脚信息:</div>
					<div>
						<el-input type="text" placeholder="请输入..." v-model="yeJiao" maxlength="40" show-word-limit></el-input>
					</div>
				</div>
				<el-button size="mini" class="huifu">恢复默认</el-button>
			</div>
			<div class="rightDiv">
				<div>
					<div class="title">预览图:</div>
					<div class="yulan" :style="{'backgroundImage':'url('+yulan+')'}"></div>
				</div>
			</div>
		</div>
		<div style="width: 100%;text-align: center;">
			<el-button size="mini" type="primary" class="tijiao">提交</el-button>
		</div>
	</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	export default {
		data() {
			return {
				radio1: "1",
				openVal: false,
				dialogImageUrl: '',
				dialogVisible: false,
				color1: '#ffffff',
				yeJiao:"",
				yulan:require('../assets/img/bg2.png')
			}
		},
		
		mounted() {

		},
		methods: {
			jump(url) {
				this.$emit('allList', url)
			}
		},
		
	};
</script>

<style>
	.List2 {
		height: 82%;
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
		width: 250px;
		display: flex;
		align-items: center;
		justify-content: center;
		background:url('https://static.mudu.tv/assets/img/console/theme-default-bg.png');
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
