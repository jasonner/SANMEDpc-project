<template>
	<div class="menuListPage">
		<div class="PMleft">
			<el-menu class="el-menu-vertical-demo"  :unique-opened='true' :default-active="isActiveVal" @select="selectChange"  @open="handleOpen"
			>
				<!-- <el-submenu index="1">
					<template slot="title">
						<span>全部功能</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="1-1" style="display:none">全部功能</el-menu-item>
					</el-menu-item-group>
				</el-submenu> -->
				<el-submenu index="2">
					<template slot="title">
						<span>基础设置</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="2-1">观看页主题设置</el-menu-item>
						<el-menu-item index="2-2">直播引导图</el-menu-item>
						<el-menu-item index="2-3">直播倒计时</el-menu-item>
						<el-menu-item index="2-4">观众人数显示设置</el-menu-item>
						<el-menu-item index="2-5">点赞设置</el-menu-item>
						<el-menu-item index="2-6">直播窗口设置</el-menu-item>
						<!-- <el-menu-item index="2-6">直播窗口背景</el-menu-item>
						<el-menu-item index="2-7">视频logo及水印</el-menu-item>
						<el-menu-item index="2-8">公众号设置</el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<span>授权观看</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="3-1">观众白名单</el-menu-item>   
						<!-- <el-menu-item index="3-2">付费记录</el-menu-item>
						<el-menu-item index="3-3">手机号登录记录</el-menu-item>
						<el-menu-item index="3-4">手机白名单</el-menu-item>
						<el-menu-item index="3-5">授权类型</el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<span>分享及嵌入</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="4-1">微信分享设置</el-menu-item>   
						<!-- <el-menu-item index="3-2">付费记录</el-menu-item>
						<el-menu-item index="3-3">手机号登录记录</el-menu-item>
						<el-menu-item index="3-4">手机白名单</el-menu-item>
						<el-menu-item index="3-5">授权类型</el-menu-item> -->
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<span>自定义菜单</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="5-1">菜单设置</el-menu-item>  
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</div>

		<div class="PMright">
			<!-- 全部功能 -->
			<MenuContent v-if="isActiveVal =='1-1'"></MenuContent>
			<!-- 观看页主题设置 -->
			<ThemeSetting v-if="isActiveVal =='2-1'"></ThemeSetting>
			<!-- 直播引导图 -->
			<LiveGuide  v-if="isActiveVal =='2-2'"></LiveGuide>
			<!-- 直播倒计时 -->
			<LiveCountdown  v-if="isActiveVal =='2-3'"></LiveCountdown>
			<!-- 观众人数设置 -->
			<SettingPopNum v-if="isActiveVal =='2-4'"></SettingPopNum>
			<!-- 点赞设置 -->
			<LikesSetting v-if="isActiveVal =='2-5'"></LikesSetting>
			<!-- 直播窗口设置 -->
			<Setlivecover v-if="isActiveVal =='2-6'"></Setlivecover>
			<!-- 授权类型 -->
			<AuthorizedViewing v-if="isActiveVal =='3-1'"></AuthorizedViewing>	
			<!-- 用户白名单 -->
			<WhiteList v-if="isActiveVal =='3-5'"></WhiteList>	
			<!-- 微信分享设置 -->
			<WechatShareSet v-if="isActiveVal =='4-1'"></WechatShareSet>
			<!-- 自定义菜单 -->
			<Custommenu v-if="isActiveVal =='5-1'"></Custommenu>		
		</div>
	</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	import MenuContent from '@/components/menuContent.vue'
	import ThemeSetting from '@/components/themeSetting.vue'
	import LiveGuide from '@/components/liveGuide.vue'
	import LiveCountdown from '@/components/liveCountdown.vue'
	import SettingPopNum from '@/components/settingPopNum.vue'
	import LikesSetting from '@/components/likesSetting.vue' 
	import AuthorizedViewing from '@/components/authorizedViewing.vue'
	import WhiteList from '@/components/whiteList.vue'
	import Setlivecover from '@/components/setlivecover.vue'
	import WechatShareSet from '@/components/wechatShareSet.vue'
	import Custommenu from '@/components/custommenu.vue'
	export default {
		data() {
			return {
				isActiveVal:'2-1'
			}
		},
		components: {
			MenuContent,
			ThemeSetting,
			LiveGuide,
			LiveCountdown,
			SettingPopNum,
			LikesSetting,
			AuthorizedViewing,
			WhiteList,
			Setlivecover,
			WechatShareSet,
			Custommenu
		},
		mounted() {
			if(sessionStorage.getItem('index')){
				this.isActiveVal = sessionStorage.getItem('index');
			}
		},
		methods: {
			handleOpen(key) {
				console.log(key);
				this.isActiveVal = key;
				switch (key) {
					case '1':
						this.isActiveVal = '1-1'
						break;
					case '2':
						this.isActiveVal = '2-1'
						break;
					case '3':
						this.isActiveVal = '3-1'
						break;
					case '4':
						this.isActiveVal = '4-1'
						break;
					case '5':
						this.isActiveVal = '5-1'
					break;
					default:
						break;
				};
				sessionStorage.setItem('index',this.isActiveVal);
			},
			selectChange(key) {
				console.log(key);
				this.isActiveVal = key;
				sessionStorage.setItem('index',this.isActiveVal);
			},
		},
		
	};
</script>

<style >
	.menuListPage{
		width: 100%;
		border-radius: 0;
		position: relative;
		display: flex;
	}
	.menuListPage .PMleft {
		flex: 1;
		background-color: #ecedf1;
	}
	.menuListPage .PMleft .el-menu {
		border: none;
	}
	.menuListPage .PMleft .el-submenu__title {
		text-align: center;
	}
	.menuListPage .el-menu-item.is-active{
		background: #465567 !important; 
		color: #fff;
	}
	.menuListPage .PMleft .is-opened div:first-child {
		color: #fff;
		font-size: 16px;
		text-align: center;
		background-color: #f6ab00 !important;
	}
	.menuListPage .PMleft .el-menu-item {
		line-height: 35px;
		height: 35px !important;
		padding-left: 150px !important;
		background-color: #dcdfe6;
	}
	.menuListPage .PMleft .el-submenu__title i {
		display: none;
	}
	.menuListPage .el-menu-item-group__title {
		display: none;
	}
	.menuListPage .PMright {
		min-height: 800px;
		padding: 30px;
		flex: 3;
		box-sizing: border-box;
		background-image: url(../assets/img/bg2.png);
	}
	.menuListPage .PMright .rightDiv {
		width: 100%;
		height: 100%;
		background: white;
		border-radius: 10px;
	}
</style>
