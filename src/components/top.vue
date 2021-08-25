<template>
	<div id="Top">
		<div class="compon-top">
			<div class="compon-top title-url">
				<h1 @click="goIndexPage()"><img src="@/assets/img/logo.png" alt="" srcset=""></h1>
			</div>
			<div class="header-list">
				<div class="nav last-nav first-nav active" @click="goIndexPage()">首页</div>
				<div class="nav last-nav first-nav ">门户</div>
				<div class="nav last-nav first-nav ">应用</div>
				<div class="nav last-nav first-nav ">媒体库</div>
				<div class="nav last-nav first-nav ">账户</div>
				<div class="nav last-nav first-nav ">观众画像</div>
			</div>
			<div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import '../assets/css/componeents.css'
	export default {
		props: ['TopDate'],
		name: "Top",
		data() {
			return {};
		},
		components: {},
		mounted() {},
		methods: {
			goIndexPage(){
				this.$router.push('/index');
			}
		},
	};
</script>

<style>

#Top .header-list{
	width: 100%;
	display: flex;	
}
#Top .header-list div{
	cursor: pointer;
	font-size: 16px;
	color: #333;
}
#Top .header-list .active{
	color: #1e78dc;
}
.title-url img{
	width: 100%;
	cursor: pointer;
}
</style>
