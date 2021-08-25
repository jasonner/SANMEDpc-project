<template>
	<div class="ManageAll">
		<div class="ManageAllTop">
			全部功能
		</div>
		<div class="ManageAllBody">
			<div class="BoydGard">
				<div class="BigBoyd">
					<i class="el-icon-setting" />
					<div>基础设置</div>
				</div>
				<div class="BigList">
					<div @click="jump('/play/playManage2')">观看页主题设置</div>
					<div>直播引导图</div>
					<div>直播倒计时</div>
					<div>观众人数显示设置</div>
					<div>点赞设置</div>
					<div>直播窗口背景</div>
					<div>视频logo及水印</div>
					<div>公众号设置</div>
				</div>
			</div>
			
			<div class="BoydGard">
				<div class="BigBoyd" style="padding-right: 0;">
					<i class="el-icon-menu" />
					<div @click="jump('/play/playManage3')">自定义菜单</div>
				</div>
			</div>
			
			<div class="BoydGard">
				<div class="BigBoyd" style="padding-right: 0;">
					<i class="el-icon-s-finance" />
					<div>自定义广告栏</div>
				</div>
			</div>
			
			<div class="BoydGard">
				<div class="BigBoyd" style="height:150px">
					<i class="el-icon-s-shop" />
					<div>互动功能</div>
				</div>
				<div class="BigList" style="height:150px">
					<div>互动打赏</div>
					<div>互动投票</div>
					<div>竞答红包</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	export default {
		name: "ManageAll",
		data() {
			return {}
		},
		mounted() {
			
		},

		methods: {
			jump(url){
				console.log('点击',url)
				this.$emit('allList',url)
			}
		},
	};
</script>

<style>
	.ManageAll {
		width: 100%;
		height: 100%;
		overflow: auto;
		background: white;
		border-radius: 10px;
	}

	.ManageAll .ManageAllTop {
		height: 5.5%;
		display: flex;
		color: #787878;
		font-size: 16px;
		padding-left: 20px;
		align-items: center;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e6e6e6;
	}

	.ManageAll .ManageAllBody {
		display: flex;
		height: 94.5%;
		padding: 30px;
		box-sizing: border-box;
		flex-wrap: wrap;
		align-items: baseline;
		background-color: #fafafa;
		justify-content: space-between;
	}

	.ManageAll .ManageAllBody .BoydGard {
		display: flex;
		min-width: 130px;
		padding: 10px 30px;
		border-radius: 10px;
		align-items: center;
		justify-content: center;
		border: 1px solid #ebe9e9;
	}

	.ManageAll .ManageAllBody .BoydGard .BigBoyd {
		height: 240px;
		display: flex;
		align-items: center;
		padding-right: 30px;
		flex-direction: column;
		justify-content: center;
		cursor: pointer;
	}

	.ManageAll .ManageAllBody .BoydGard .BigBoyd i {
		color: #42a4f9;
		font-size: 75px;
	}

	.ManageAll .ManageAllBody .BoydGard .BigBoyd div {
		margin-top: 15px;
		margin-bottom: 15px;
		font-size: 20px;
	}

	.ManageAll .ManageAllBody .BoydGard .BigList {
		width: 200px;
		border-left: 1px solid #dcdcdc
	}

	.ManageAll .ManageAllBody .BoydGard .BigList div {
		padding-left: 30px;
		line-height: 30px;
		text-align: left;
		font-size: 14px;
		color: #3c8cd2;
		cursor: pointer;
	}
</style>
