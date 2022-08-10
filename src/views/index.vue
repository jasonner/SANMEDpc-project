<template>
	<div id="HomePage">
		<Top/>
		<div class="home">
			<!-- 左侧列表 -->
			<Left :post-title="allTotal" />
			<!-- 内容部分 -->
			<div class="home-body">
				<!-- 顶头选择部分 -->
				<div class="create-top">
					<div class="create-select">
						<el-select v-model="value" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
					<i class="el-icon-s-fold icon-url"></i>
					<div class="search-input">
						<!-- <input type="text" v-model="seachName" @blur="seachLiveChange()" placeholder="请输入频道关键字"/>
						<button @click="seachLiveChange()"><span class="el-icon-search"></span></button> -->
					</div>
				</div>
				<div class="create-body">
					<div class="create-jian  create-list create-jian-shadow" @click="dialogVisible = true">
						<i class="el-icon-plus"></i>
						<div>新建直播频道</div>
					</div>
					<div class="create-list create-jian-shadow" v-for="item in liveList" :key="item.id">
						<div class="top-list" >
							<el-tooltip class="item" effect="dark" :content="item.OpenValue?'关闭频道':'开启频道'" placement="bottom-start">
								<span @click="LiveIsOpen(item)">
									<el-switch
										v-model="item.OpenValue"
										active-color="#f6ab00"
										inactive-color="#dfdfdf"
										>
									</el-switch>
								</span>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="复制频道" placement="bottom-start">
								<span class="el-icon-document-copy" @click="copyLiveChange(item)"></span>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="设置频道" placement="bottom-start">
								<span class="el-icon-setting" @click="setLiveChange(item)"></span>
							</el-tooltip>
							<el-tooltip class="item" effect="dark" content="删除频道" placement="bottom-start">
								<span class="el-icon-delete-solid" @click="delLiveChange(item)"></span>
							</el-tooltip>
						</div>
						<div class="list-content" @click="getLiveDetailChange(item)">
							<div class="list-left">
								<img v-if="item.logo" :src="item.logo" alt="" srcset="">
								<img v-else src="@/assets/img/logo1.png" alt="" srcset="">
								<p v-if="item.OpenValue">列表播放已开启</p>
							</div>
							<div class="list-right">
								<p class="title">{{item.channel}}</p>
								<p>直播开始时间&nbsp;:&nbsp;{{item.start_time}}</p>
								<p v-if="item.status === 0">最后直播时间&nbsp;:&nbsp;该频道未直播过</p>
								<p>观看量:<i>0</i>次 <span>观看总时长<i>0</i>分钟</span></p>
							</div>
						</div>
						<div class="list-footer">
							<div @click="liveSetting(item)">
								<i class="el-icon-video-camera-solid"></i>
								<span>频道装修</span>
							</div>
							<div  @click="alertChange()">
								<i class="el-icon-s-marketing"></i>
								<span>分析报表</span>
							</div>
							<div @click="PClook(item)">
								<i class="el-icon-s-platform"></i>
								<span>PC预览</span>
							</div>
							<!-- <div>
								<i class="el-icon-mobile"></i>
								<span>手机预览</span>
							</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 新建直播 -->
		<el-dialog title="新建直播频道" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
			<div class="create-form">
				<div class="create-form-input">
					<span style="width: 15%;"><span style="color: red;margin-right: 5px;">*</span>频道名称	:	</span>
					<el-input v-model="liveAddObj.channel" @blur="hasLiveChange()" placeholder="请输入内容" class="input-txt"></el-input>
				</div>

				<!--直播方式  -->
				<div class="live-streaming-way">
					<span style="width: 15%;">直播方式	:	</span>
					<div class="list-way1">
					 	<div :class="{wayActive:wayActive=='1'}" class="way-content" @click="wayChange('1')">
							<img src="@/assets/img/liveStreaming/way1.png" alt="" srcset="">
							<p>标准直播</p>
							<span class="el-icon-success"></span>
						</div>
						<div>
							<p>通过专业设备、拉流、列表、手机、桌面等方式直播</p>
						</div>
					</div>
					<div class="list-way2">	
						<div class="way-content" :class="{wayActive:wayActive=='2'}" @click="wayChange('2')">
							<img src="@/assets/img/liveStreaming/way1.png" alt="" srcset="">
							<p>连麦直播</p>
							<span  class="el-icon-success"></span>
						</div>
						<div>
							<p>“多人访谈/圆桌会议”模式，最多支持8人连麦直播</p>
						</div>
					</div>
				</div>

				<!-- 直播类型 -->
				<div class="Live-stream-type">
					<span style="width: 15%;">直播类型	:	</span>
					<el-radio v-model="radio" label="1">单流直播</el-radio>
					<el-radio v-model="radio" label="2">多流直播</el-radio>
				</div>

				<!-- 直播开始时间 -->
				<div class="Live-broadcast-start-time">
					<span style="width: 15%;">直播开始时间	:	</span>
					<el-date-picker
						@change="startTimeChange(liveAddObj.start_time)"
						class="time-select"
						v-model="liveAddObj.start_time"
						type="datetime"
						:picker-options="pickerOptions"
						placeholder="选择日期时间">
					</el-date-picker>
				</div>	

				<!-- 更多设置 -->
				<!-- <div class="more-set-box">
					<span style="width: 15%;">更多设置	:	</span>
					<div>展开更多</div>
				</div> -->
			</div>
			<span slot="footer" class="dialog-footer create-form-bottom">
				<el-button @click="dialogVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="liveAddChange()" size="small">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 修改直播 -->
		<el-dialog title="修改直播频道" :visible.sync="editDialogVisible" width="700px" :before-close="editHandleClose">
			<div class="create-form">
				<div class="create-form-input">
					<span style="width: 15%;"><span style="color: red;margin-right: 5px;">*</span>频道名称	:	</span>
					<el-input v-model="editLiveAddObj.channel" placeholder="请输入内容" class="input-txt"></el-input>
				</div>

				<!--直播方式  -->
				<div class="live-streaming-way">
					<span style="width: 15%;">直播方式	:	</span>
					<div class="list-way1">
					 	<div :class="{wayActive:wayActive=='1'}" class="way-content" @click="wayChange('1')">
							<img src="@/assets/img/liveStreaming/way1.png" alt="" srcset="">
							<p>标准直播</p>
							<span class="el-icon-success"></span>
						</div>
						<div>
							<p>通过专业设备、拉流、列表、手机、桌面等方式直播</p>
						</div>
					</div>
					<div class="list-way2">	
						<div class="way-content" :class="{wayActive:wayActive=='2'}" @click="wayChange('2')">
							<img src="@/assets/img/liveStreaming/way1.png" alt="" srcset="">
							<p>连麦直播</p>
							<span  class="el-icon-success"></span>
						</div>
						<div>
							<p>“多人访谈/圆桌会议”模式，最多支持8人连麦直播</p>
						</div>
					</div>
				</div>

				<!-- 直播类型 -->
				<div class="Live-stream-type">
					<span style="width: 15%;">直播类型	:	</span>
					<el-radio v-model="radio" label="1">单流直播</el-radio>
					<el-radio v-model="radio" label="2">多流直播</el-radio>
				</div>

				<!-- 直播图标 -->
				<div class="Live-icon-box">
					<span style="width: 15%;">直播图标	:	</span>
					<el-upload
					 	type="file"
                    	accept="image/*"
						:limit="1"
						action=""
						:http-request="uploadImg"
						:on-remove="delitem"
						list-type="picture-card" class="upload-demo"
					>
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="editLiveAddObj.logo" alt="">
					</el-dialog>
				</div>

				<!-- 直播开始时间 -->
				<div class="Live-broadcast-start-time">
					<span style="width: 15%;">直播开始时间	:	</span>
					<el-date-picker
						@change="editstartTimeChange(editLiveAddObj.start_time)"
						class="time-select"
						v-model="editLiveAddObj.start_time"
						type="datetime"
						:picker-options="pickerOptions"
						placeholder="选择日期时间">
					</el-date-picker>
				</div>	

				<!-- 更多设置 -->
				<!-- <div class="more-set-box">
					<span style="width: 15%;">更多设置	:	</span>
					<div>展开更多</div>
				</div> -->
			</div>
			<span slot="footer" class="dialog-footer create-form-bottom">
				<el-button @click="editDialogVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="editLiveChange()" size="small">确 定</el-button>
			</span>
		</el-dialog>

		<!-- 复制直播 -->
		<el-dialog title="复制频道" :visible.sync="copyDialogVisible" width="700px" :before-close="copyHandleClose">
			<div class="create-form copy-list-content">
				<div class="copy-title">仅做装修设置复制，不涉及数据报表内容(具体如下)</div>
				<div class="content-list">
					<p>基础设置<span class="el-icon-check"></span></p>
					<p>互动投票<span class="el-icon-check"></span></p>
					<p>报名问卷<span class="el-icon-check"></span></p>
					<p>自定义菜单<span class="el-icon-check"></span></p>
					<p>自定义广告栏<span class="el-icon-check"></span></p>
					<p>竟达红包<span class="el-icon-close"></span></p>
					<p>互动打赏<span class="el-icon-check"></span></p>
					<p>消费上线<span class="el-icon-check"></span></p>
					<p>分享及嵌入<span class="el-icon-check"></span></p>
					<p>视频预告/回放<span class="el-icon-check"></span></p>
					<p>授权观看<span class="el-icon-close"></span></p>
					<p>多人协作<span class="el-icon-close"></span></p>
				</div>
			</div>
			<span slot="footer" class="dialog-footer create-form-bottom">
				<el-button @click="copyDialogVisible = false" size="small">取 消</el-button>
				<el-button type="primary" @click="sureCopyLiveChange()" size="small">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	import Top from '@/components/top.vue'
	import Left from '@/components/left.vue'
	import qs from 'qs'
	import OSS from 'ali-oss';
	import { test, hello } from '@/util/utils.js'
	export default {
		name: "Home",
		data() {
			return {
				userid:'',
				dialogVisible: false,
				editDialogVisible:false,
				copyDialogVisible:false,
				xiangmu: "",
				seachName:'',
				wayActive:'1',
				radio: '1',
				hasLiveFlag:false,
				liveAddObj:{
					channel:"",//频道名称
					start_time:'',//开始时间
					way:'',//直播方式
					type:'', //直播类型
					theme:'',//直播主题
					menu:'',//直播菜单
					logo:''
				},	
				editLiveAddObj:{
					id:'1',//用户ID
					channel:"",//频道名称
					start_time:'',//开始时间
					way:'',//直播方式
					type:'', //直播类型
					theme:'',//直播主题
					menu:'', //直播菜单
					logo:''
				},	
				copyLiveId:'',
				options: [{
					value: '1',
					label: '默认排序'
				}, {
					value: '2',
					label: '最后直播时间'
				}, {
					value: '3',
					label: '累计观看时长'
				}, {
					value: '4',
					label: '累计观看人次'
				}, {
					value: '5',
					label: '直播开始时间'
				}],
				value: '默认排序',
				liveList:[],
				pickerOptions: {
					disabledDate(v) {
					return v.getTime() < new Date().getTime() - 86400000;
					}
				},
				allTotal:0,
			};
		},
		components: {
			Top,
			Left
		},
		mounted() {
			var query=this.$route.query;
			if(query && query.name){
				this.getuserInfo(query.name);
			}else if(localStorage.getItem('userid')){
				this.userid = localStorage.getItem('userid');
				this.getLiveListChange();
			}else{
				this.$router.push('/login');
			}
			hello();
		},
		methods: {
			//获取用户信息
			getuserInfo(name){	
				let that = this;
				that.axios.get('user/query?username='+name)
				.then(function (res) {
					console.log(res.data.data)
					if(res.data.code && res.data.code == '200'){
						if(res.data.s){
							that.userid = res.data.data.id;
							localStorage.setItem('userid',res.data.data.id);
							that.getLiveListChange();
						}else{
							that.$message({
								message: res.data.msg,
								type: 'warning'
							});
						};
					}else{
						that.$message.error(res.data.msg);
					};
				});
			},

			//直播方式选择
			wayChange(type){
				this.wayActive = type;
			},

			//关闭新建直播频道弹窗
			handleClose() {
				this.dialogVisible = false;
			},

			//关闭编辑直播频道弹窗
			editHandleClose(){
				this.editDialogVisible = false;
			},

			//关闭复制直播频道弹窗
			copyHandleClose(){	
				this.copyDialogVisible = false;
			},

			//创建直播频道时间格式转换
			startTimeChange(d){
				let Year = d.getFullYear()+'-';
				let Month = (d.getMonth() + 1)>10?(d.getMonth() + 1)+'-':'0'+(d.getMonth() + 1)+'-';
				let Day = d.getDate()>10?d.getDate()+ ' ':'0'+d.getDate()+' ';
				let Hours = d.getHours()>10?d.getHours()+':':'0'+d.getHours()+':';
				let Minutes = d.getMinutes()>10?d.getMinutes()+':':'0'+d.getMinutes()+':';
				let Seconds = d.getSeconds()>10?d.getSeconds():'0'+d.getSeconds();
				this.liveAddObj.start_time = Year+Month+Day+Hours+Minutes+Seconds;
				console.log(this.liveAddObj.start_time);
			},

			//编辑直播频道时间转换
			editstartTimeChange(d){
				let Year = d.getFullYear()+'-';
				let Month = (d.getMonth() + 1) +'-';
				let Day = d.getDate()>10?d.getDate()+ ' ':'0'+d.getDate()+'	';
				let Hours = d.getHours()>10?d.getHours()+':':+'0'+d.getHours()+':';
				let Minutes = d.getMinutes()>10?d.getMinutes()+':':'0'+d.getMinutes()+':';
				let Seconds = d.getSeconds()>10?d.getSeconds():'0'+d.getSeconds();
				this.editLiveAddObj.start_time = Year+Month+Day+Hours+Minutes+Seconds;
				console.log(this.editLiveAddObj.start_time);
			},

			//查询频道channel是否已占用
			hasLiveChange(){
				let that = this;
				if(that.liveAddObj.channel !=''){
					that.axios.get('live/channel?channel='+that.liveAddObj.channel+'&userid='+that.liveAddObj.userid)
					.then(function (res) {
						console.log(res.data)
						if(res.data.code && res.data.code == '200'){
							if(res.data.s){
								that.hasLiveFlag = false;
								that.$message({
									message: res.data.msg,
									type: 'success'
								});
							}else{
								that.hasLiveFlag = true;
								that.$message({
									message: res.data.msg,
									type: 'warning'
								});
							};
						}else{
							that.hasLiveFlag = true;
							that.$message.error(res.data.msg);
						};
					});
				}
			},

			//创建直播频道
			liveAddChange() {
				let that= this;
				console.log(that.hasLiveFlag);
				if(that.liveAddObj.channel ==''){
					that.$message.error('请输入频道名称！');
				}else if(that.liveAddObj.start_time ==''){
					that.$message.error('请选择日期时间！');
				}else if(that.hasLiveFlag){
					that.$message.error('此频道名称已被占用');
				}else{
					let promise = {
						userid: that.userid,
						channel:that.liveAddObj.channel,
						start_time:that.liveAddObj.start_time,
						way:that.liveAddObj.way,
						type:that.liveAddObj.type,
						theme:that.liveAddObj.theme,
						menu:that.liveAddObj.menu,                    
					}
					that.axios.post('live/add',qs.stringify(promise)).then((res) => {
						console.log(res.data);
						if (res.data.code && res.data.code =='200') {
							if(res.data && res.data.data){
								that.$message({
									message: '创建成功！',
									type: 'success'
								});
								that.getLiveListChange();
								that.dialogVisible = false;
							}	
						} else {
							that.$message.error(res.data.msg);
							that.dialogVisible = false
						}
					})
				}
			},

			//获取直播列表
			getLiveListChange(){
				let that = this;
				let userid = that.userid;
				that.axios.get('live/query?userid='+userid)
				.then(function (res) {
					if(res.data.code && res.data.code == '200'){
						if(res.data.data && res.data.data.length>0){
							that.allTotal = res.data.data.length;
							res.data.data.forEach(element => {
								console.log(element);
								if(element.status ===2){
									element.OpenValue = false;
								}else{
									element.OpenValue = true;
								}
							});
							that.liveList = res.data.data;
						}else{
							that.liveList = [];
						}
					}else{
						that.liveList = [];
						console.log(res.data.msg);
					};
				});
			},

			//搜索直播频道
			seachLiveChange(){
				let that = this;
				let userid =that.userid;
				let channel = that.seachName;
				that.axios.get('live/query?userid='+userid+'&channel='+channel)
				.then(function (res) {
					console.log(res.data.data)
					if(res.data.code && res.data.code == '200'){
						that.liveList = [];
						if(res.data.data &&res.data.data.length>0){
							that.liveList=res.data.data;
						}else if(res.data.data){
							that.liveList.push(res.data.data);
						}
					}else{
						that.$message.error(res.data.msg);
					};
				});
			},

			//复制直播
			copyLiveChange(item){
				console.log(item);
				this.copyLiveId = item.id;
				this.copyDialogVisible = true;
			},

			//确认复制直播
			sureCopyLiveChange(){
				let that = this;
				let promise = {
					liveid: that.copyLiveId
				};
				that.axios.post('live/copy',qs.stringify(promise)).then((res) => {
					console.log(res.data);
					if (res.data.code && res.data.code =='200') {
						if(res.data && res.data.data){
							that.$message({
								message: '复制成功！',
								type: 'success'
							});
							that.getLiveListChange();
							that.copyDialogVisible = false;
						}	
					} else {
						that.$message.error(res.data.msg);
						that.copyDialogVisible = false
					}
				});
			},

			//修改直播频道
			setLiveChange(item){
				console.log(item);
				let that = this;
				that.editLiveAddObj = item;
				that.editDialogVisible = true;
			},
			
			//确定修改直播频道
			editLiveChange(){
				let that = this;
				if(that.editLiveAddObj.channel ==''){
					that.$message.error('请输入频道名称！');
				}else if(that.editLiveAddObj.start_time ==''){
					that.$message.error('请选择日期时间！');
				}else{
					let promise = {
						liveid: that.editLiveAddObj.id,
						channel:that.editLiveAddObj.channel,
						start_time:that.editLiveAddObj.start_time,
						way:that.editLiveAddObj.way,
						type:that.editLiveAddObj.type,
						theme:that.editLiveAddObj.theme,
						menu:that.editLiveAddObj.menu,  
						logo:that.editLiveAddObj.logo                  
					};
					that.axios.post('live/update',qs.stringify(promise)).then((res) => {
						console.log(res.data);
						if (res.data.code && res.data.code =='200') {
							if(res.data && res.data.data){
								that.$message({
									message: '编辑成功！',
									type: 'success'
								});
								that.getLiveListChange();
								that.editLiveAddObj = {};
								that.editDialogVisible = false;
							}	
						} else {
							that.$message.error(res.data.msg);
							that.editDialogVisible = false
						}
					});
				}	
			},

			//上传选择文件
			uploadImg(file){
				this.Upload(file);
			},

			//删除图片
			delitem(){
				//TODO
				this.editLiveAddObj.logo ='';	
			},

			//自定义上传方法..
			Upload(file) {
				//判断扩展名
				const tmpcnt = file.file.name.lastIndexOf(".")
				const exname = file.file.name.substring(tmpcnt + 1)
				const names = ['jpg', 'jpeg', 'webp', 'png','bmp','pdf','mp4']
				if(names.indexOf(exname)< 0 ){
					this.$message.error("不支持的格式!")
					return
				};
				let fileName = 'LehuiLive/'+file.file.name+'/'+'LehuiLive-oss'+file.file.lastModified;
				console.log(fileName);
				const _this = this;
				_this.axios.get('https://cac.sanmedgene.com/forhoo/GetOSSSTS?dir=LehuiLive').then((result) =>{
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
								let httpUrl = 'https://merckoss.wfbweb.com/';
								if(result.url){
									_this.editLiveAddObj.logo = httpUrl+fileName;
								};
								console.log(_this.editLiveAddObj.logo);
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

			//删除直播
			delLiveChange(item){
				console.log(item);
				let that = this;
				that.$confirm('此操作将永久删除该频道, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let promise = {
						liveid:item.id,
					};
					that.axios.post('live/del',qs.stringify(promise)).then((res) => {
						console.log(res.data);
						if (res.data.code && res.data.code =='200') {
							if(res.data && res.data.data){
								that.$message({
									message: '删除成功！',
									type: 'success'
								});
								that.getLiveListChange();
							}	
						} else {
							that.$message.error(res.data.msg);
						}
					})
				}).catch(() => {
					that.$message({
						type: 'info',
						message: '已取消删除'
					});          
				});
			},

			//获取直播详情
			getLiveDetailChange(item){
				console.log(item);
				this.$store.commit('setLiveValue', item);    
				this.$router.push({path: '/liveDetail', query:{userid:item.userid,channel:item.channel}});
			},

			//频道装修
			liveSetting(item){
				this.$router.push({path: '/liveManage', query:{userid:item.userid,channel:item.channel}});
			},

			//PC预览
			PClook(row){
				window.open('https://h5.lehuitech.com/html/live/pc.html?id='+row.id, '_blank');
			},

			//开启直播
			LiveIsOpen(row){
				console.log(row)
				let that = this;
				if(row.status === 2){
					that.$confirm('开启后观众能够看到直播画面', '确定开启观看页直播?', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
						}).then(() => {
							let promise = {
								liveid:row.id
							}
							that.axios.post('/live/resume_live',qs.stringify(promise))
							.then(function (res) {
								if(res.data.code && res.data.code == '200'){
									that.getLiveListChange();
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
					that.stopLiveChange(row);
				}
			},

			//关闭直播
			stopLiveChange(row){
				let that = this;
				let promise = {
					liveid:row.id
				}
				that.$confirm('关闭后观众不能够看到直播画面', '确定关闭观看页直播', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
					}).then(() => {
						that.axios.post('/live/stop_live',qs.stringify(promise))
						.then(function (res) {
							if(res.data.code && res.data.code == '200'){
								that.getLiveListChange();
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

			alertChange(){
				this.$notify({
					title: '警告',
					message: '此功能在开发中...，敬请期待!',
					type: 'warning'
				});
			}
		},
		
	};
</script>

<style>
#HomePage{
	width: 1200px;
	margin: 0 auto;
}
#HomePage .create-select input{
	font-size: 12px;
	font-weight: 500;
}
#HomePage  .search-input{
	width: 200px;
	display: flex;
	margin-left: 500px;
}
#HomePage  .search-input input{
	height: 28px;
	padding: 5px;
	padding-left: 10px;
	box-sizing: border-box;
	outline: 1px solid #12b7f5;
	border:  1px solid #12b7f5;
}
#HomePage  .search-input button{
	height: 30px;
	border: 1px solid #12b7f5;
	padding: 5px;
	padding-left: 10px;
	box-sizing: border-box;
	cursor: pointer;
	background: #12b7f5;
	color: #fff;
	text-align: center;
	margin-top: -1.2px;
}
#HomePage  .search-input button:hover{
	opacity: 0.5;
}
#HomePage  .search-input button span{
	text-align: center;
	display: block;
	margin: 0 auto;
}
#HomePage .live-streaming-way{
	margin-top: 20px;
}
#HomePage .live-streaming-way span{
	margin-left: 10px;
}
#HomePage .live-streaming-way{
	display: flex;
}
#HomePage .live-streaming-way div{
	flex: auto;
	width: 164px;
	text-align: center;
	
}
#HomePage .live-streaming-way div p{
	font-size: 12px;
}
#HomePage .live-streaming-way div img{
	width: 100%;
}
#HomePage .live-streaming-way .way-content{
	filter:grayscale(100%);
	border: 1px solid #dfdfdf;
	position: relative;
	padding: 10px;
	box-sizing: border-box;
	cursor: pointer;
	margin-bottom: 10px;
	border-radius: 5px;
}
#HomePage .live-streaming-way .way-content span{
	position: absolute;
	right: 10px;
	top: 5px;
	width: 15px;
	height: 15px;
	border-radius: 100%;
	background: #fff;
}
#HomePage .live-streaming-way .wayActive{
	filter:none;
	box-shadow:0rem 0rem 0.5rem 0.2rem #97c9e5;        
}
#HomePage .live-streaming-way .wayActive p{
	color: #3C8CD2;
}
#HomePage .live-streaming-way .wayActive span{
	color: #3C8CD2;
	border: none;
}
#HomePage .Live-stream-type{
	margin-top: 30px;
	padding-left: 10px;
	box-sizing: border-box;
	font-size: 14px;
}

#HomePage .Live-broadcast-start-time{
	margin-top: 20px;
	padding-left: 10px;
	box-sizing: border-box;
}
#HomePage .Live-broadcast-start-time .time-select{
	height: 40px;
	color: #333;
}
#HomePage .Live-broadcast-start-time .time-select input{
	color: #333;
	font-size: 12px;
	font-weight: 500;
}
#HomePage .more-set-box{
	padding-left: 10px;
	box-sizing: border-box;
	margin-top: 20px;
}
#HomePage .create-list{
	background: white;
    height: 13rem;
    width: 45%;
	margin: 0;
	margin-top: 30px;
	cursor: pointer;
	box-shadow:0rem 0rem 0.5rem 0.2rem rgba(0,0,0,0.15)
}
#HomePage .create-list:hover{
	box-shadow:0rem 0rem 0.5rem 0.2rem rgba(31,140,198,0.5)
}
#HomePage .top-list{
	width: 100%;
	height: 2rem;
	text-align: right;
}
#HomePage  .create-body{
	overflow: scroll;
}
#HomePage .top-list span{
	margin:5px;
	color: #f6ab00;
	font-size: 18px;
	cursor: pointer;
}
#HomePage .list-content{
	width: 100%;
	padding:0 20px;
	box-sizing: border-box;
	display: flex;
}
#HomePage .list-content .list-left{
	width: 100px;
	height: 100px;
	margin-right: 20px;
}
#HomePage .list-content  .list-left img{
	width: 80px;
}
#HomePage .list-content .list-left p{
	font-size: 12px;
	color: #999;
	text-align: center;
	color: red;
	border: 1px solid red;
	border-radius: 20px;
	min-width: 110px;
	margin: 0 auto;
	text-align: center;
}
#HomePage .list-content .list-right{
	width: 100%;
}
#HomePage .list-content .list-right p{
	font-size: 12px;
	margin-top: 15px;
	line-height: 1;
}
#HomePage .list-content .list-right .title{
	font-size: 16px;
	margin-top: 0;
}
#HomePage .list-footer{
	background: #f4faff;
	width: 100%;
	height: 40px;
	margin-top: 10px;
	display: flex;
}
#HomePage .list-footer div{
	flex: 1;
	height: 20px;
	float: left;
	margin-top: 12px;
	text-align: center;
	font-size: 14px;
}
#HomePage .list-footer div i{
	display: block;
	width: 100%;
	font-size: 20px;
	color: #f6ab00;
	cursor: pointer;
	border-left: 1px solid #f6ab00;
}
#HomePage .list-footer div span{
	display: none;
}
#HomePage .list-footer div:hover span{
	display: block;
	font-size: 12px;
	color: #fff;
	background: #f6ab00;
	width: 100%;
	height: 40px;
	margin-top: -10px;
	padding-top: 10px;
	box-sizing: border-box;
	cursor: pointer;
}
#HomePage .list-footer div:hover i{
	display: none;
	border: none;
}
#HomePage .list-footer div:nth-of-type(1) i{
	border-left: none;
}
#HomePage .list-content .list-right i{
	color: #1e78dc;
	margin: 0 5px;
}
#HomePage .list-content .list-right span{
	margin-left: 40px;
}
#HomePage  .Live-icon-box{
	margin-top: 20px;
	padding-left: 10px;
	box-sizing: border-box;
}
#HomePage  .Live-icon-box span{
	float: left;
}
#HomePage  .copy-list-content .content-list{
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	flex-wrap:wrap;
	width: 100%;
}
#HomePage  .copy-list-content .content-list p{
	width: 15%;
	margin-top: 20px;
	position: relative;
	text-align: right;
}
#HomePage  .copy-list-content .content-list p span{
	position: absolute;
	right: -10px;
	bottom: -10px;
}
#HomePage  .copy-list-content .content-list p .el-icon-check{
	color: #4ed444;
}
#HomePage  .copy-list-content .content-list p .el-icon-close{
	color: orangered;
}
</style>
