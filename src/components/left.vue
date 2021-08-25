<template>
	<div id="Left" class="compon-left">
		<!-- 顶部三图标状态 -->
		<div class="compon-left-display tou">
			<div class="compon-left-display-flex top-tou">
				<span>手机验证</span>
				<el-avatar icon="el-icon-user-solid"></el-avatar>
			</div>
			<div class="compon-left-display-flex top-tou">
				<span> 邮箱验证</span>
				<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
			</div>
			<div class="compon-left-display-flex top-tou">
				<span>身份验证</span>
				<el-avatar> user </el-avatar>
			</div>
		</div>

		<div class="xinxi">
			<div class="compon-left-display zhanghu">
				账户类型:
				<div class="zhanghu-xinxi">
					<span>初版测试</span>
					<el-tag type="warning" effect='dark'>
						测试
					</el-tag>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				账户余额:
				<div class="zhanghu-xinxi">
					<span><strong>￥0.</strong><small>00</small></span>
					<el-tag  effect='dark'>
						充值
					</el-tag>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				代金券金额:
				<div class="zhanghu-xinxi">
					<span><strong>￥0.</strong><small>00</small></span>
					<a href="###" target="_blank" rel="noopener noreferrer">查看</a>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				时长资源:
				<div class="zhanghu-xinxi">
					<span>暂无资源</span>
					<a href="###" target="_blank" rel="noopener noreferrer">查看</a>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				<div class="Billing">
					计费中功能(0)
				</div>
			</div>
		</div>

		<!-- 数据概况 -->
		<div class="data-overview xinxi">
			<div class="title">数据概况</div>
			<div class="compon-left-display zhanghu">
				已建频道:
				<div class="zhanghu-xinxi">
					<strong>4</strong> <small>个</small>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				累计消费金额:
				<div class="zhanghu-xinxi">
					<span><strong>￥6.</strong><small>71</small></span>	
					<a href="###" target="_blank" rel="noopener noreferrer">查看</a>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				累计观看时长<i class="el-icon-question"></i>:
				<div class="zhanghu-xinxi">
					<strong>134</strong><small>分钟</small>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				视频文件数:
				<div class="zhanghu-xinxi">
					<strong>1</strong><small>个</small>
				</div>
			</div>
			<div class="compon-left-display zhanghu">
				<el-progress :text-inside="true" :stroke-width="24" :percentage="100" status="success"></el-progress>
				<div class="zhanghu-xinxi">
					<strong>0G</strong>/<small>100G</small>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '../assets/css/componeents.css'

	export default {
		props: ['LeftDate'],
		name: "Left",
		data() {
			return {};
		},
		components: {},
		mounted() {},
		methods: {},
	};
</script>

<style>
	#Left .xinxi .zhanghu{
		font-size: 14px;
		color: #333
	}
	#Left .zhanghu{
		margin-top: 20px;
	}
	#Left .zhanghu span{
		margin: 0 10px;
	}
	#Left .zhanghu .Billing{
		width: 100px;
		height: 20px;
		background: #fff;
		text-align: center;
		font-size: 14px;
		color:#333;
	}
	#Left .data-overview{
		border-bottom: none;
	}
	#Left .data-overview .title{
		color: #108ee9;
	}
	#Left .data-overview  .el-icon-question{
		color: #108ee9;
	}
</style>
