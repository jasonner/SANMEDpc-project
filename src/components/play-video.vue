<template>
<div class="playVideoPage">
	<div class="play-body">
		<div class="play-left">
			<div class="play-left-top">
				<span>直播监控</span>
				<el-button size="mini" style="margin-left: 10px;padding-left: 10px;">
					<span>开启观看页直播</span>
				</el-button>
			</div>
			<div class="play-left-center">
				<div ref="videoDiv" class="my-video" :style="{'backgroundImage':'url('+kv+')'}">
					<video ref='videos' id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" style="width: 307.7px;height: 173px;"></video>
				</div>

				<div class="playLC-xin">
					<div class="playLC-xin1">
						<i class="el-icon-s-data"></i>
						<span>实时监控数据</span>
					</div>
					<div class="playLC-xin2">
						<span>更新时间：<span>{{liveList.u_time}}</span></span>
					</div>
					<div class="playLC-xian"></div>
					<div class="playLC-xin3">
						<span>观看量(Pv)：<span>{{videoState}}</span></span>
					</div>
					<div class="playLC-xin3 playLC-xin4">
						<span>在线人数(并发)：<span>{{videoNum}}</span></span>
					</div>
				</div>
			</div>

			<div class="play-left-bottom" style="height: 60%;">
				<el-tabs type="border-card" style="height: 100%;box-shadow: none;">
					<el-tab-pane label="网页直播">

					</el-tab-pane>
					<el-tab-pane label="专业设备">
						<div class="play-bottom">
							<div class="playB-txt">直播推流地址</div>
							<div class="playB-input-div">
								<input ref="copy" class="playB-input" :value="liveList.push_url" readonly />
								<el-button @click="copy" size="mini" style="margin-left: 10px;padding-left: 10px;">
									<span>复制</span>
								</el-button>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="拉流直播">

					</el-tab-pane>
				</el-tabs>
			</div>
		</div>

		<!-- 直播互动 -->
		<div class="play-right">
			<div class="title-content">
				<div class="list">直播文档</div>
				<div class="list">
					<el-switch
						v-model="lookPageShow"
						active-text="观看页显示"
						>
					</el-switch>
				</div>
				<div class="list">
					<el-popover
						placement="bottom"
						title=""
						width="200"
						trigger="hover"
						content="">
						<div class="inputName">
							<span>文档名称:</span>
							<input type="text" maxlength="4" v-model="DocName" placeholder="请输入..."/>
						</div>
						<div class="DocuDow-box">
							<el-checkbox v-model="lookChecked">允许用户翻页</el-checkbox>
							<p>开启后观众可以查看文档所以内容</p>
						</div>
						<div class="DocuDow-box">
							<el-checkbox v-model="loadChecked">允许用户下载</el-checkbox>
							<p>开启后观众可以下载当前观看文档</p>
						</div>
						<el-button slot="reference"><span class="el-icon-s-tools"></span> 文档设置</el-button>
					</el-popover>
				</div>
				<div class="list">
					<el-button type="primary">选择文档 </el-button>
				</div>
				<div class="list">
					<span class="el-icon-arrow-up"></span>
				</div>
			</div>

			<!-- 文档 -->
			<div class="doc-content" v-show="docShow">
				<div class="nohas-doc-tip">
					当前无文档，请选择文档
				</div>
				<!-- <div class="add-doc-list">
					<div class="nohas-doc-tip">
						<p>当前列表为空</p>
						<p>请添加文件</p>
					</div>
				</div> -->
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'

	export default {
		name: "PlayVideo",
		data() {
			return {
				myPlayer: '',
				docShow:false,
				DocName:'',
				lookPageShow:true,
				dialogVisible: true,
				kv: require('../assets/img/bg2.png'),
				videoPlay: 0,
				uploadDate: "2021-08-27 13:10",
				videoState: "2",
				videoNum: "2",
				tuiLiu: "",
				liveList:{},
				lookChecked:true,
				loadChecked:true
			}
		},
		mounted() {
			var query=this.$route.query;
			if(query && query.userid){
				this.getLiveDetail(query.userid,query.channel);
			}else{
				this.$router.push('/index');
			};
			// let search = window.location.hash
			// let Oname = search.split('&')[1].split('=')[1].split('_')[0]
			// let name = decodeURIComponent(Oname).substr(decodeURIComponent(Oname).lastIndexOf('/') + 1)
			// this.tuiLiu = decodeURIComponent(search.split('&')[0].split('=')[1])
			// 初始化video.js
			
			// // 首次判断播放状态
			// ths.liu('http://livetest.lehuitech.com/home/GetFlowState?StreamName=' + decodeURIComponent(name))
			// // 轮询接口
			// setInterval(function() {
			// 	ths.liu('http://livetest.lehuitech.com/home/GetFlowState?StreamName=' + decodeURIComponent(name))
			// }, 1000)
		},
		methods: {
			getLiveDetail(userid,channel){
				let that = this;
				that.axios.get('live/query?userid='+userid+'&channel='+channel)
				.then(function (res) {
					console.log(res.data)
					if(res.data.code && res.data.code == '200'){
						if(res.data.s){
							that.liveList = res.data.data;
							that.initVideo();
						};
					}else{
						that.$message.error(res.data.msg);
					};
				});
			},

			// 判断播放状态
			liu(qindao) {
				let that = this
				this.$post(qindao).then((res) => {
					if (res.msg == '流已开启') {
						if (that.$data.videoPlay == 0) {
							// 提示文字
							that.$message({
								message: '直播已开启',
								type: 'success'
							});
							// 添加视频,并且显示播放器
							that.myPlayer.src({
								type: "application/x-mpegURL",
								src: play_hls
							})
							that.$refs.videoDiv.firstChild.style.display = 'block'
							that.$data.videoPlay = 1
						}
					} else if (res.msg == '流已关闭') {
						if (that.dialogVisible || that.$data.videoPlay == 1) {
							// 提示,并且隐藏播放器
							that.$message({
								message: '直播已关闭',
								type: 'warning'
							});
							that.$refs.videoDiv.firstChild.style.display = 'none'
							that.$data.videoPlay = 0
						}
					}
					that.dialogVisible = false
				})
			},

			// 初始化video.js
			initVideo() {
				let that = this
				this.$nextTick(() => {
					that.$data.myPlayer = this.$video(document.getElementById('myVideo'), {
						controls: true,
						autoplay: true,
						fill: true,
						poster: require('../assets/img/bg2.png'),
						preload: "auto",
						height: '173px',
						width: '307.7px'
					})
					that.myPlayer.src({
						type: "application/x-mpegURL",
						src: that.liveList.play_hls
					})
				})
			},

			// 复制功能
			copy() {
				let copy = this.$refs.copy
				const input = document.createElement('input');
				input.setAttribute('readonly', 'readonly');
				input.setAttribute('value', this.$data.href);
				document.body.appendChild(input);
				input.setSelectionRange(0, 9999);
				copy.select()
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					this.$message({
						message: '复制成功',
						type: 'success'
					});
					document.body.removeChild(input);
				} else {
					this.$message({
						message: '抱歉无法一键复制',
						type: 'warning'
					});
					document.body.removeChild(input);
				}
			},
		},
		
	};	
</script>

<style>
.playVideoPage{
	width: 97%;
	margin: 0 auto;
	height: 94%;
	margin-top: 20px;
}
.playVideoPage .play-body{
	width: 100%;
	display: flex;
}
.playVideoPage .play-body .el-tabs--border-card{
	border: none;
}
.playVideoPage .play-body .play-right {
	padding: 20px;
	box-sizing:border-box;
}
.playVideoPage .play-body .play-right .title-content{
	display: flex;
}
.title-content .list{
	flex: auto;
	margin: 0 10px;
	cursor: pointer;
}
.title-content .list:nth-of-type(1){
	cursor:default;
}
.title-content .list:nth-last-of-type(1){
	text-align: right;
	margin-left: 100px;
}
.inputName{
	width: 100%;
} 
.inputName span{
	width: 100%;
	font-size: 12px;
}
.inputName input{
	width: 100px;
	border: 1px solid #409EFF;
	outline-color: cornflowerblue;
	margin-left: 5px;
	border-radius: 3px;
	padding-left: 10px;
}
.DocuDow-box {
	margin-top: 10px;
}
.DocuDow-box p{
	line-height: 2;
	font-size: 12px;
}
.playVideoPage .play-body .play-right .title-content .el-button{
	padding: 5px;
}
.playVideoPage .play-body .play-right .doc-content{
	width: 100%;
	height: 300px;
	margin-top: 10px;
}
.nohas-doc-tip{
	line-height: 300px;
	font-size: 24px;
	color: #999;
	text-align: center;
}
</style>
