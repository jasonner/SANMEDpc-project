<template>
	<div id="Play">
		<Top />
		<div class="home">
			<!-- 内容部分 -->
			<div class="home-body play-top">
				<!-- 顶头选择部分 -->
				<div class="create-top">
					<i class="el-icon-folder-opened input-icon"></i>
					<div class="create-select">
						<el-select v-model="selectValue" placeholder="请选择">
							<el-option v-for="item in liveList" :key="item.id" :label="item.channel" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<el-button size="mini" style="margin-left: 10px;padding-left: 10px;">
						<i class="el-icon-link"></i>
						<span>观看地址</span>
					</el-button>
					<div class="button-gir">
						<div class="playTopSub play-aciton">
							<i class="el-icon-video-play"></i>
							<span>直播控制</span>
						</div>
						<div class="playTopSub play-aciton Fplay-aciton" @click="manageChange()">
							<i class="el-icon-edit-outline"></i>
							<span>频道管理</span>
						</div>
						<div class="playTopSub play-aciton Fplay-aciton">
							<i class="el-icon-edit-outline"></i>
							<span>数据统计</span>
						</div>
						<div class="playTopSub play-aciton Fplay-aciton">
							<i class="el-icon-edit-outline"></i>
							<span>分析报表</span>
						</div>
					</div>
				</div>
				<!-- style="padding: 1.5rem;" -->
				<div class="create-body" style="padding: 0;">
					<playVideo></playVideo>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import playVideo from '@/components/play-video.vue'
	import '../assets/css/body.css'
	import '../assets/css/index.css'
	import Top from '../components/top.vue'
	export default {
		name: "Play",
		data() {
			return {
				fanhui: '',
				selectValue: '',
				liveList:[],
				userid:'',
			};
		},
		
		components:{
			Top,
			playVideo,
		},

		mounted() {
			var query=this.$route.query;
			if(query && query.userid){
				this.userid = query.userid;
				this.getLiveListChange();
			}else{
				this.$router.push('/login');
			};
		},

		methods: {
			//获取直播列表
			getLiveListChange(){
				let that = this;
				let userid = that.userid;
				that.axios.get('live/query?userid='+userid)
				.then(function (res) {
					console.log(res)
					if(res.data.code && res.data.code == '200'){
						if(res.data.data && res.data.data.length>0){
							that.liveList = res.data.data;
							that.selectValue = that.liveList[0].channel;
						};
					}else{
						that.$message.error(res.data.msg);
					};
				});
			},

			//频道管理
			manageChange(){
				this.$router.push({path: '/liveManage', query:{userid:this.userid,channel:this.selectValue}});
			},
		},
		
	};
</script>

<style scoped>
#Play{
	width: 1200px;
	margin: 0 auto;
}
#Play .video-js .vjs-control {
	width: 3.5em;
}
.button-gir div{
	border: 1px solid #bebebe;
	cursor: pointer;
}
</style>
