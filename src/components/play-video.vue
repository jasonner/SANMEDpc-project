<template>
<div class="playVideoPage">
	<div class="play-body">
		<div class="play-left">
			<div class="play-left-top">
				<span>直播监控</span>
				<el-button size="mini" style="margin-left: 10px;padding-left: 10px;" @click="startLiveChange()">
					<span>{{openTitle}}</span>
				</el-button>
			</div>
			<div class="play-left-center">
				<div ref="videoDiv" class="my-video" :style="{'backgroundImage':'url('+kv+')'}">
					<video ref='videos' id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered"></video>
				</div>
				<div class="playLC-xin">
					<div class="playLC-xin1">
						<i class="el-icon-s-data"></i>
						<span>实时监控数据</span>
					</div>
					<div class="playLC-xin2">
						<span>更新时间：<span>{{lastInfoTime}}</span></span>
					</div>
					<div class="playLC-xian"></div>
					<div class="playLC-xin3">
						<span>观看量(Pv)：<span>{{maxMemberCount}}</span></span>
					</div>
					<div class="playLC-xin3 playLC-xin4">
						<span>在线人数(并发)：<span>{{memberCount}}</span></span>
					</div>
				</div>
			</div>

			<div class="play-left-bottom" style="height: 60%;">
				<el-tabs type="border-card" style="height: 100%;box-shadow: none;">
					<!-- <el-tab-pane label="网页直播">
						<el-button type="primary" class="Start-live-streaming-now" @click="startLiveChange()">立即开启直播</el-button>
					</el-tab-pane> -->
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
					<!-- <el-tab-pane label="拉流直播">

					</el-tab-pane> -->
				</el-tabs>
			</div>
		</div>

		<!-- 直播互动 -->
		<div class="play-right">
			<!-- <el-collapse accordion>
				<el-collapse-item>
					<template slot="title">
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
								<el-button type="primary" @click="addFileShowChange()">选择文档 </el-button>
							</div>
						</div>
					</template>
						文档
					 <div class="doc-content" v-show="docShow">
						<div class="nohas-doc-tip" @click="addFileHideChange()">
							当前无文档，请选择文档
						</div>
						<div class="add-doc-list" v-show="addFileShow">
							<div class="add-doc-file">
								<span class="el-icon-plus"></span>
								添加文档
							</div>
							<div class="nohas-doc-tip">
								<p>当前列表为空</p>
								<p>请添加文件</p>
							</div>
							<div class="support-file-type">
								<p>支持文件类型</p>
								<p>PPT、Word、PDF</p>
								<p>单文件大小不超过50M</p>
							</div>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse> --> 
			<!--互动详情 -->
			<div class="interactive-details">
				 <el-tabs v-model="activeName" @tab-click="handleClick">
					<!-- <el-tab-pane :disabled='true' label="互动详情">互动详情</el-tab-pane> -->
					<el-tab-pane label="聊天互动" name="first">
						<div class="Chat-interaction-box">
							<p><span class="el-icon-setting"></span>聊天设置</p>
							<!-- <p><span class="el-icon-delete"></span>清空</p> -->
							<p @click="ExportRecordChange()"><span class="el-icon-download"></span>导出</p>
							<div>聊天数({{chactToall}})</div>
						</div>
						<div class="Chat-interaction-list" ref="userMsg">
							<ul>
								<li v-for="(item,index) in interactionList" :key="index">
									<img class="user-logo" :src="item.img" alt="">
									<div>
										<span class="admin-nick">{{item.nick}}</span>
										<span class="admin-title" v-if="item.nick =='管理员'">官方</span>
										<span class="top" v-if="item.top">顶</span>
										<i class="el-icon-check"></i>
										<span class="time">{{item.time}}</span>
									</div>
									<div class="text-content" v-html="item.contentText">
									</div>
									<div class="operate-btn">
										<!-- <el-button plain>弹幕高亮</el-button>
										<el-button plain>置顶</el-button> -->
										<el-button plain @click="revokeMsg(item)">删除</el-button>
									</div>
								</li>
							</ul>
						</div>
						<div class="topic-input-box">
						<VueEmoji @input="onInput" width="480" height="60" :value="sedMsg"/>
							<!-- <input type="text" v-model="sedMsg" name="" placeholder="请输入..." id=""> -->
						</div>
						<div class="topic-setting-box">
							<div class="left-list">
								<img src="@/assets/img/liveStreaming/avatar.png" alt="">
								<!-- <img src="@/assets/img/liveStreaming/emjio.png" alt=""> -->
							</div>
							<div class="right-list">
								<button @click="sedIMmsgChange()">发送</button>
							</div>
						</div>
					</el-tab-pane>
					
					<!-- <el-tab-pane label="话题互动" name="second">话题互动</el-tab-pane> -->
					<el-tab-pane label="在线观众" name="third">
						<div class="group-list">
							<div class="list" v-for="(item,index) in GroupUserList" :key="index">
								<img :src="item.avatar" alt="" srcset=""> {{item.lastMessage.fromAccount}}
							</div>
						</div>
					</el-tab-pane>
					<!-- <el-tab-pane :disabled='true' label="自定义菜单">自定义菜单</el-tab-pane> -->
				</el-tabs>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import TIM from 'tim-js-sdk';
	// 发送图片、文件等消息需要腾讯云即时通信IM上传插件
	import TIMUploadPlugin from 'tim-upload-plugin';
	import qs from 'qs'
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	import VueEmoji from 'emoji-vue'
	export default {
		name: "PlayVideo",
		data() {
			return {
				myPlayer: '',
				sedMsg:'',
				docShow:true,
				DocName:'',
				lookPageShow:true,
				dialogVisible: true,
				kv: require('../assets/img/bg2.png'),
				videoPlay: 0,
				tuiLiu: "",
				liveList:{},
				lookChecked:true,
				loadChecked:true,
				addFileShow:false,
				activeName: 'first',
				userSig:'',
				interactionList:[],
				IM:{
					SDKAppID:1400601282,
					groupid:null,
					seq:''
				},
				userid:'',
				channel:'',
				timeR1:null,
				maxMemberCount:0,
				memberCount:0,
				lastInfoTime:'',
				chactToall:0,
				openTitle:'开启观看页直播',
				nextReqMessageID:null,
				GroupUserList:[],
				loading:false
			}
		},
		components: {
			VueEmoji
		},
		mounted() {
			var query=this.$route.query;
			if(query && query.userid){
				this.getLiveDetail(query.userid,query.channel);
				this.userid = query.userid;
				this.channel = query.channel;
				this.Scroll();
			}else{
				this.$router.push('/index');
			};
		},
		created: function() {
			var that = this;
			document.onkeydown = function(e){
				window.cancelAnimationFrame = true;
				let key = window.event.keyCode;
				if (e.ctrlKey && key==13) {
					that.sedIMmsgChange();
				}
			};
		},
		methods: {
			//获取直播详情
			getLiveDetail(userid,channel){
				let that = this;
				that.axios.get('live/query?userid='+userid+'&channel='+channel)
				.then(function (res) {
					console.log(res.data)
					if(res.data.code && res.data.code == '200'){
						if(res.data.s){
							that.liveList = res.data.data;
							if(res.data.data && res.data.data.length>0){
								res.data.data.forEach(element => {
									that.IM.groupid = element.groupid;
								});
							}else{
								that.IM.groupid = res.data.data.groupid;
							}
							//console.log(that.IM.groupid)
							that.$nextTick(() => {
								that.initVideo();
								that.genTestUserSig(that.userid);
							})
						};
					}else{
						console.log(res.data.msg);
					};
				});
			},

			// 初始化video.js
			initVideo() {
				let that = this
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
			
			//开启直播
			startLiveChange(){
				let that = this;
				console.log(that.liveList.status);
				if(that.liveList.status === 2){
					let promise = {
						liveid:that.liveList.id
					}
					that.$confirm('开启后观众能够看到直播画面', '确定开启观看页直播?', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							that.axios.post('/live/resume_live',qs.stringify(promise))
							.then(function (res) {
								if(res.data.code && res.data.code == '200'){
									that.getLiveDetail(that.userid,that.channel);	
									that.openTitle = "关闭观看页直播"
									that.$message({
										type: 'success',
										message:'开启观看页直播成功'
									});
								}else{
									console.log(res.data.msg);
								};
							});
						}).catch(() => {
						that.$message({
							type: 'info',
							message: '已取消'
						});          
					});
					
				}else{
					that.stopLiveChange();
				}
				
			},

			//关闭直播
			stopLiveChange(){
				let that = this;
				let promise = {
					liveid:that.liveList.id
				};
				that.$confirm('关闭后观众不能够看到直播画面', '确定关闭观看页直播', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						that.axios.post('/live/stop_live',qs.stringify(promise))
						.then(function (res) {
							if(res.data.code && res.data.code == '200'){
								that.openTitle = "开启观看页直播";
								that.getLiveDetail(that.userid,that.channel);	
								that.$message({
									type: 'success',
									message:'关闭观看页直播成功'
								});
							}else{
								console.log(res.data.msg);
							};
						});
					}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消'
					});          
				});
			},

			//显示文档
			addFileShowChange(){
				this.addFileShow = true;
			},
			
			//隐藏文档
			addFileHideChange(){
				this.addFileShow = false;
			},	

			//折叠
			foldChange(){
				this.docShow = !this.docShow;
			},

			//互动详情
			handleClick(tab, event) {
				console.log(tab, event);
			},

			//表情包
			selectEmoji(emoji) {
				console.log(emoji)
			},

			//获取usersig
			genTestUserSig() {
				let that = this;
				let promise = {
					userid:'live'+that.liveList.id+'_admin'
				}
				that.axios.post('/imcallback/usersig',qs.stringify(promise))
				.then(function (res) {
					if(res.data.code && res.data.code == '200'){
						if(res.data.s &&  res.data.data.sig){
							that.userSig = res.data.data.sig;
							that.$nextTick(() => {
								that.timLogin();
							});
						};
					}else{
						console.log(res.data.msg);
					};
				});
				
			},

			//IM登录
			timLogin(){
				let that = this;
				let options = {
					SDKAppID: that.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
				};
				// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
				let tim = TIM.create(options); // SDK 实例通常用 tim 表示
				let promise = tim.login({userID: 'live'+that.liveList.id+'_admin', userSig: that.userSig});
				promise.then(function(imResponse) {
					//console.log(imResponse.data); // 登录成功
					if(imResponse.data.actionStatus == 'OK'){
						console.log('登录成功')
						that.$nextTick(() => {
							that.joinGroup();
						})
					}
				}).catch(function(imError) {
					//console.warn('login error:', imError); // 登录失败的相关信息
				});
			}, 

			//加入群组
			joinGroup(){
				let that = this;
				let options = {
					SDKAppID: that.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
				};
				console.log(that.IM.groupid);
				// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
				let tim = TIM.create(options); // SDK 实例通常用 tim 表示
				let promise = tim.joinGroup({ groupID: that.IM.groupid, type: TIM.TYPES.GRP_AVCHATROOM });
				promise.then(function(imResponse) {
				switch (imResponse.data.status) {
					case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL: // 等待管理员同意
					console.log('WaitAdminApproval')
					break;
					case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
					console.log('加群成功')
					that.$nextTick(() => {
						setTimeout(() => {
							that.getGroupProfile();
							that.getDanmuList();
						}, 3000);
					});
					//console.log(imResponse.data.group); // 加入的群组资料
					break;
					case TIM.TYPES.JOIN_STATUS_ALREADY_IN_GROUP: // 已经在群中
					console.log('已经在群中');
					that.$nextTick(() => {
						setTimeout(() => {
							that.getGroupProfile();
							that.getDanmuList();
						}, 3000);
					});
					break;
					default:
					console.log('不在群中')
					break;
				}
				}).catch(function(imError){
					//console.warn('joinGroup error:', imError); // 申请加群失败的相关信息
					console.log('申请加群失败');
					that.timLogin();
				});
			},

			//发送消息
			sedIMmsgChange(){
				let that = this;
				if(that.sedMsg !=''){
					let options = {
						SDKAppID:that.IM.SDKAppID// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
					};
					let tim = TIM.create(options); // SDK 实例通常用 tim 表示
					// 1. 创建消息实例，接口返回的实例可以上屏
					let message = tim.createTextMessage({
						to: that.IM.groupid,
						conversationType: TIM.TYPES.CONV_GROUP,
						// 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
						// 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
						// priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
						payload: {
							text: that.sedMsg,
						}
					});
					// 2. 发送消息
					let promise1 = tim.sendMessage(message);
					promise1.then(function(imResponse) {
						// 发送成功
						that.nextReqMessageID = null;
						that.interactionList = [];
						that.getDanmuList();
						that.sedMsg = "";
						that.$message({
							message: '发送成功',
							type: 'success'
						});
						that.chactToall++;
					}).catch(function(imError) {
						console.log(imError)
						// 发送失败
						that.$message.error('发送失败');
					});
				}
			},

			//获取群详情
			getGroupProfile(){
				console.log('获取群消息')
				let that = this;
				let options = {
					SDKAppID: that.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
				};
				// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
				let tim = TIM.create(options); // SDK 实例通常用 tim 表示
				let promise = tim.getGroupProfile({ groupID: that.IM.groupid});
				promise.then(function(imResponse) {
					console.log(imResponse.data.group);
					that.memberCount = imResponse.data.group.memberCount;
					that.maxMemberCount = imResponse.data.group.maxMemberCount;
					that.lastInfoTime = that.getLocalTime(imResponse.data.group.lastInfoTime);
					that.$nextTick(() => {
						that.updateMyProfile();
						that.getGroupList();
					});
				}).catch(function(imError) {
					console.warn('getGroupProfile error:', imError); // 获取群详细资料失败的相关信息
				});
				
			},	

			//修改个人信息
			updateMyProfile(){
				let that = this;
				let options = {
					SDKAppID: that.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
				};
				// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
				let tim = TIM.create(options); // SDK 实例通常用 tim 表示
				let updateMyProfile = tim.updateMyProfile({
					nick: '管理员',
					avatar: 'https://oss.sxyweb.com.cn/2021/wj/lehuiLive/themSetting/avatar.jpg',
					gender: TIM.TYPES.GENDER_MALE,
					selfSignature: '真正的大师永远都怀着一颗学徒的心！',
					allowType: TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
				});
				updateMyProfile.then(function(imResponse) {
					console.log(imResponse.data); // 更新资料成功
				}).catch(function(imError) {
				console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				});
			},
			
			//获取群消息
			getDanmuList(){
				console.log('获取群消息')
				let that = this;
				let options = {
					SDKAppID:that.IM.SDKAppID// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
				};
				let tim = TIM.create(options); // SDK 实例通常用 tim 表示
				// 打开某个会话时，第一次拉取消息列表
				if(that.timeR1){
					clearTimeout(that.timeR1);
				}
				that.timeR1 = setTimeout(() => {
					that.nextReqMessageID = null;
					that.getDanmuList();
				}, 3000);
			
				let promise = tim.getMessageList({conversationID: `GROUP${that.IM.groupid}`, count: 15,nextReqMessageID:that.nextReqMessageID});
					promise.then(function(imResponse) {
						if(imResponse.data.messageList && imResponse.data.messageList.length>0){
							console.log(imResponse.data.messageList);
							that.interactionList = [];
							imResponse.data.messageList.reverse().forEach(element => {
								if(element.avatar == ''){
									element.avatar =  require('@/assets/img/liveStreaming/avatar.png')
								};
								if(element.nick == ''){
									element.nick = '管理员'
								}
								if(!element.isRevoked && !element.isDeleted){
									let obj = {
										img:element.avatar,
										nick:element.nick,
										top:false,
										time: that.getLocalTime(element.time),
										contentText:element.payload.text,
										seq:element.sequence,
										eventTime:element.time
									};
									that.interactionList.push(obj);
								}
								
							});
							that.chactToall = that.interactionList.length;
						};
						that.nextReqMessageID = imResponse.data.nextReqMessageID;
					// const messageList = imResponse.data.messageList; // 消息列表。
					// const nextReqMessageID = imResponse.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
					// const isCompleted = imResponse.data.isCompleted; // 表示是否已经拉完所有消息。
				});
			},

			//获取群成员
			getGroupList(){
				// 该接口默认只会拉取这些资料：群类型、群名称、群头像、最后一条消息的时间。
				let that = this;
				let options = {
					SDKAppID:that.IM.SDKAppID// 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
				};
				let tim = TIM.create(options); // SDK 实例通常用 tim 表示
				let promise = tim.getGroupList();
				promise.then(function(imResponse) {
				console.log(imResponse.data.groupList); // 群组列表
				if(imResponse.data.groupList && imResponse.data.groupList.length>0){
					imResponse.data.groupList.forEach(element => {
						if(element.avatar == ''){
							element.avatar =  require('@/assets/img/liveStreaming/avatar.png');
						};
						if(element.lastMessage.nick == ''){
							element.lastMessage.nick = "管理员";
						}
					});
				}
				that.GroupUserList = imResponse.data.groupList;
				}).catch(function(imError) {
				console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
				});
			},

			//删除消息
			revokeMsg(item){
				console.log(item)
				 let that = this;
				let promise = {
					groupid:that.IM.groupid,
					msgSeq:item.seq,
					eventTime:item.eventTime
				}
				that.axios.post('/watch/retract',qs.stringify(promise))
				.then(function (res) {
					//console.log(res.data)
					if(res.data.code && res.data.code == '200'){
						if(res.data.data.ActionStatus && res.data.data.ActionStatus == "OK"){
							
							that.$message({
								type: 'success',
								message:'删除成功'
							});
						}else{
							that.$message.error(res.data.msg);
						}
					}else{
						that.$message.error(res.data.msg);
					};
				});
			},

			//时间戳转时间
			getLocalTime(nS) {  
				 return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');  
			},

			//滚动事件
			Scroll(){
				let that=this
				let _dom=this.$refs.userMsg
				_dom.onscroll  = () => {
					if(_dom.scrollTop===0){
						//that.getDanmuList();
					}else if(_dom.scrollTop>=500){
						that.getDanmuList();
					}
				}
			},

			//清空聊天
			clearMsg(){
				
			},

			//赋值发送消息
			onInput(event) {
				console.log(event);
				this.sedMsg =  event.data;
				//事件。数据包含文本区域的值
			},

			//导出聊天记录
			ExportRecordChange(){
				let that = this;
				that.$confirm('确认要导出聊天记录吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						window.open('https://live.lehuitech.com/watch/export_danmu?liveid='+that.liveList.id,'_blank')
					}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消导出'
					});          
				});

			}
		},
		destroyed(){
			if(this.timeR1){
				clearTimeout(this.timeR1);
			};
			let that = this;
			let options = {
				SDKAppID: that.IM.SDKAppID // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
			};
			// 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
			let tim = TIM.create(options); // SDK 实例通常用 tim 表示
			let promise = tim.logout();
			promise.then(function(imResponse) {
				console.log(imResponse.data); // 登出成功
			}).catch(function(imError) {
				console.warn('logout error:', imError);
			});
		}
		
	};	
</script>
<style scoped>
 /* 设置滚动条的样式 */
 ::-webkit-scrollbar {
	width:12px;
	background-color: #d9e1e7;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
	border-radius:10px;
}
::-webkit-scrollbar {
	display: block; /* Chrome Safari */
	-ms-overflow-style: block;
	scrollbar-width: block; /* Firefox */
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
	border-radius:10px;
	background:#f6ab00;;
}
.group-list{
	width: 100%;
}
.group-list .list{
	width: 100%;
	height: 40px;
	line-height: 40px;
}
.group-list .list img{
	width: 30px;
	margin-right: 20px;
	vertical-align: middle;
}
</style>
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
	width: 50%;
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
	height: 280px;
	position: relative;
	border-bottom: 1px solid #CBD4DC;
}
.playVideoPage .play-body .play-right .doc-content  .nohas-doc-tip{
	line-height: 200px;
	font-size: 24px;
	color: #999;
	text-align: center;
}
.playVideoPage .play-body .play-right .doc-content .add-doc-list{
	width: 200px;
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
	border: 1px solid #CBD4DC;
	background: #fff;
	box-shadow: -2px 0px 0px #dfdfdf;

}
.playVideoPage .play-body .play-right .doc-content  .add-doc-file{
	text-align: center;
	height: 40px;
	line-height:40px;
	border-bottom: 1px solid #CBD4DC;
	cursor: pointer;
}
.playVideoPage .play-body .play-right .doc-content .add-doc-list .nohas-doc-tip{
	margin-top: 80px;
}
.playVideoPage .play-body .play-right .doc-content .add-doc-list .nohas-doc-tip p{
	font-size: 16px;
    line-height: 30px;
    font-weight: bold;
    color: #C8C8C8;
}
.playVideoPage .play-body .play-right .doc-content  .Start-live-streaming-now{
	display: block;
	margin:  0 auto;
	margin-top: 140px;
}
.playVideoPage .play-body .play-right .doc-content  .support-file-type p{
	font-size: 12px;
    line-height: 20px;
    color: #959595;
	text-align: center;
}
.playVideoPage  .el-collapse-item__content{
	padding: 0;
}
/* 聊天详情 */
.playVideoPage .interactive-details{
	width: 100%;
}

.playVideoPage .Chat-interaction-box{
	margin-top: 0px;
	display: flex;
	background-color: #fcfcfc;
}
.playVideoPage .Chat-interaction-box p{
	width: 80px;
	padding: 5px;
	text-align: center;
	box-sizing:border-box;
	border: 1px solid #dfdfdf;
	border-radius: 10px;
	font-size: 12px;
	cursor: pointer;
	margin: 0 10px;
	float: left;
}
.playVideoPage .Chat-interaction-box p:hover{
	color: #409EFF;
}
.playVideoPage .Chat-interaction-box p span{
	margin-right: 5px;
}
.playVideoPage .Chat-interaction-box div{
	float: right;
	font-size: 12px;
	margin-top: 5px;
}
.playVideoPage .Chat-interaction-list{
	width: 100%;
	height: 400px;
	padding-right:20px;
	box-sizing: border-box;
	overflow-x: hidden;
    overflow-y: auto;
}

.playVideoPage .Chat-interaction-list ul{
	width: 100%;
	height: auto;

}
.playVideoPage .Chat-interaction-list ul li{
	padding:20px;
	box-sizing:border-box;
    border-bottom: 1px solid #e6e6e6;
}
.playVideoPage .Chat-interaction-list ul li .user-logo{
	float: left;
    width: 32px;
    height: 32px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
.playVideoPage .interactive-details .Chat-interaction-list .admin-nick{
	font-size: 12px;
	margin-left: 10px;
	color: #3c8cd2;
	margin-top: -2px;
}
.playVideoPage .interactive-details .Chat-interaction-list .admin-title{
	font-size: 12px;
	margin-left: 10px;
	display: inline-block;
    padding: 0 5px 1px;
    color: #fff;
    background-color: #5c95eb;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
}
.playVideoPage .interactive-details .Chat-interaction-list .top{
	display: inline-block;
    margin-left: 6px;
    padding: 0 3px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    color: #fff;
    background-color: #ffa32c;
    font-size: 12px;
}
.playVideoPage .interactive-details .Chat-interaction-list .el-icon-check{
	font-size: 12px;
	margin-left: 10px;
	color: #46a037;
}
.playVideoPage .interactive-details .Chat-interaction-list .time{
	font-size: 12px;
	margin-left: 10px;
	float: right;
}
.playVideoPage .interactive-details .Chat-interaction-list  .text-content{
	width: 100%;
	font-size: 12px;
	margin-left: 42px;
}
.playVideoPage .operate-btn{
	text-align: right;
}
.playVideoPage .operate-btn .el-button{
	font-size: 10px;
	padding: 6px;
	color: #3c8cd2;
}
.playVideoPage .operate-btn .el-button:nth-of-type(2){
	color: #fa5b22;
    border: 1px solid #fa5b22;
}
.playVideoPage .operate-btn .el-button:nth-of-type(2):hover{
	background: #fa5b22;
	color: #fff;
}
.playVideoPage .operate-btn .el-button:hover{
	background: #5c95eb;
	color: #fff;
}
.playVideoPage  .topic-input-box{
	width: 100%;
	border-top: 1pt solid #dfdfdf;
	padding-top: 0.1vw;
	box-sizing: border-box;
}
.playVideoPage  .topic-input-box input{
	width: 96%;
	height: 60px;
	border: none;
	font-size: 10px;
	padding-left: 1vw;
}
.playVideoPage .topic-setting-box{
	margin-top: 1vh;
	display: flex;
}
.playVideoPage .topic-setting-box .left-list{
	flex: 1;
}
.playVideoPage .topic-setting-box .left-list img{
	margin: 0 10px;
}
.playVideoPage .topic-setting-box .left-list span{
	font-size: 38px;
	margin-left: 10px;
	cursor: pointer;
}
.playVideoPage .topic-setting-box .right-list{
	flex: 1;
	text-align: right;
	
}
.playVideoPage .topic-setting-box .right-list button{
	cursor: pointer;
}

.topic-setting-box img{
	width: 30px;
	height: 30px;
	cursor: pointer;
}

.playVideoPage  i.emoji-picker-icon.emoji-picker{
	position: absolute;
    top: 86px;
    left: 64px;
}
</style>

