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
						<el-select v-model="selectValue" placeholder="请选择" @change="selectValueChange(selectValue)">
							<el-option v-for="item in liveSelectList" :key="item.id"   :label="item.channel" :value="item.id">
							</el-option>
						</el-select>
					</div>
					<el-popover
						placement="top-start"
						title="观看地址"
						width="200"
						trigger="click"
					>
						<div>
							<div id="qrcode" ref="qrcode"></div>
							<div></div>
						</div>
						<el-button style="margin-left: 10px;padding-left: 10px;" slot="reference" @click="payOrder()">
							<i class="el-icon-link"></i>
							<span>观看地址</span>
						</el-button>
					</el-popover>
					<div class="button-gir">
						<div class="playTopSub play-aciton">
							<i class="el-icon-video-play"></i>
							<span>直播控制</span>
						</div>
						<div class="playTopSub play-aciton Fplay-aciton" @click="manageChange()">
							<i class="el-icon-edit-outline"></i>
							<span>频道管理</span>
						</div>
						<div class="playTopSub play-aciton Fplay-aciton"  @click="alertChange()">
							<i class="el-icon-edit-outline"></i>
							<span>数据统计</span>
						</div>
						<div class="playTopSub play-aciton Fplay-aciton"  @click="alertChange()">
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
	import QRCode from 'qrcodejs2'
	import '../assets/css/body.css'
	import '../assets/css/index.css'
	import Top from '../components/top.vue'
	import qs from 'qs'
	import VueUeditorWrap from "vue-ueditor-wrap";
	export default {
		name: "Play",
		data() {
			return {
				fanhui: '',
				selectValue: '',
				liveList:[],
				liveSelectList:[],
				userid:'',
				id:'',
				channel:'',
				msg:'<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定!+!$#</h2>',
				myConfig: {
					UEDITOR_HOME_URL: "/UEditor/",
					serverUrl: ""
				}

			};
		},
		
		components:{
			Top,
			playVideo,
			VueUeditorWrap
		},

		mounted() {
			var query=this.$route.query;
			if(query && query.userid){
				this.userid = query.userid;
				this.channel = query.channel;
				this.getLiveDetail(this.userid,this.channel);
			}else{
				this.$router.push('/login');
			};
		},
		
		methods: {
			//频道选择
			selectValueChange(val){
				console.log(val);
				let that = this;
				that.axios.get('live/query?liveid='+val)
				.then(function (res) {
					console.log(res.data)
					if(res.data.code && res.data.code == '200'){
						if(res.data.s){
							that.$router.push({path: '/liveDetail', query:{userid:res.data.data.userid,channel:res.data.data.channel}});
							window.location.reload(true); 
						};
					}else{
						console.log(res.data.msg);
					};
				});
			},

			//获取直播列表
			getLiveListChange(){
				let that = this;
				let userid = that.userid;
				that.axios.get('live/query?userid='+userid)
				.then(function (res) {
					console.log(res)
					if(res.data.code && res.data.code == '200'){
						if(res.data.data && res.data.data.length>0){
							that.liveSelectList = res.data.data;
						};
					}else{
						console.log(res.data.msg);
					};
				});
			},

			//获取频道详情
			getLiveDetail(userid,channel){
				let that = this;
				that.axios.get('live/query?userid='+userid+'&channel='+channel)
				.then(function (res) {
					console.log(res.data)
					if(res.data.code && res.data.code == '200'){
						if(res.data.s){
							that.liveList = res.data.data;
							that.$nextTick(() => {
								that.selectValue =  res.data.data.id;
								that.getLiveListChange();
							})
						};
					}else{
						console.log(res.data.msg);
					};
				});
			},

			//频道管理
			manageChange(){
				this.$router.push({path: '/liveManage', query:{userid:this.userid,channel:this.channel}});
			},

			//观看二维码
			payOrder(){
				this.qrcode = 'https://h5.lehuitech.com/html/live/index.html?id='+this.liveList.id;
				let that = this;
				if(this.liveList.id){
					let promise = {
					'auth_url':'https://h5.lehuitech.com/html/live/index.html?id='+this.liveList.id
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
				}
				
			},

			// 生成二维码
			crateQrcode () {
				this.$refs.qrcode.innerHTML = ''
				this.qr = new QRCode('qrcode', {
				width: 150,
				height: 150, // 高度
				text: this.qrcode // 二维码内容
				// render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
				// background: '#f0f'
				// foreground: '#ff0'
				})
				// console.log(this.qrcode)
			},

			onInput(event) {
				//事件。数据包含文本区域的值
			},

			clearTextarea(){
				this.$refs.emoji.clear()
			},  
			
			alertChange(){
				this.$notify({
					title: '警告',
					message: '此功能在开发中...，敬请期待!',
					type: 'warning'
				});
			},
			showOne() {
				alert(this.msg);
			}

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
