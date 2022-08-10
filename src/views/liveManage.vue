<template>
    <div class="liveManagePage">
        <Top/>
		<div class="create-top play-top">
			<i class="el-icon-folder-opened input-icon"></i>
			<div class="create-select">
				<el-select v-model="selectValue" placeholder="请选择" @change="selectValueChange(selectValue)">
					<el-option v-for="item in liveSelectList" :key="item.id" :label="item.channel" :value="item.id">
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
					<div id="qrcodeM" ref="qrcodeM"></div>
				</div>
				<el-button style="margin-left: 10px;padding-left: 10px;" slot="reference" @click="payOrder()">
					<i class="el-icon-link"></i>
					<span>观看地址</span>
				</el-button>
			</el-popover>
			<div class="button-gir">
				<div class="playTopSub Fplay-aciton" @click="liveChange()">
					<i class="el-icon-video-play"></i>
					<span>直播控制</span>
				</div>
				<div class="playTopSub play-aciton play-aciton">
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
		<!-- 左侧菜单 -->
		<MenuList></MenuList>
    </div>
</template>
<script>
import '@/assets/css/body.css'
import '@/assets/css/index.css'
import Top from '@/components/top.vue'
import MenuList from '@/components/menuList.vue'
import QRCode from 'qrcodejs2'
import qs from 'qs'
export default {
	name:'liveManage',
	data(){
		return{
			selectValue: '',
			liveList:[],
			liveSelectList:[],
			userid:'',
			channel:'',
			qrcodeM:''
		}
	},
	components:{
		Top,
		MenuList
	},

	mounted(){
		var query=this.$route.query;
		if(query && query.userid){
			this.userid = query.userid;
			this.channel = query.channel;
			this.getLiveDetail(this.userid,this.channel);
		}else{
			this.$router.push('/login');
		};
	},
	watch: {
		$route(){
			
		}
	},
	methods:{
		//频道选择
		selectValueChange(val){
			let that = this;
			that.axios.get('live/query?liveid='+val)
			.then(function (res) {
				console.log(res.data)
				if(res.data.code && res.data.code == '200'){
					if(res.data.s){
						that.$router.push({path: '/liveManage', query:{userid:res.data.data.userid,channel:res.data.data.channel}});
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

		//观看二维码
		payOrder(){
			this.qrcodeM = 'https://h5.lehuitech.com/html/live/index.html?id='+this.liveList.id;
			let that = this;
			let promise = {
				'auth_url':'https://h5.lehuitech.com/html/live/index.html?id='+this.liveList.id
			};
			that.axios.post('https://api.lehuitech.com/auth/live',qs.stringify(promise)).then((res) => {
				console.log(res.data);
				if (res.data.code && res.data.code =='200') {
				if(res.data && res.data.s){
					that.qrcodeM = res.data.data.url;
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
		},

		// 生成二维码
		crateQrcode () {
			if(this.$refs.qrcodeM.innerHTML !=''){
				this.$refs.qrcodeM.innerHTML = ''
			}	
			this.qr = new QRCode('qrcodeM', {
				width: 150,
				height: 150, // 高度
				text: this.qrcodeM,// 二维码内容
				render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
				// background: '#f0f'
				// foreground: '#ff0'
			})
			// console.log(this.qrcode)
		},

		//跳转直播详情
		liveChange(){
			this.$router.push({path: '/liveDetail', query:{userid:this.userid,channel:this.channel}});
		},
		
		alertChange(){
			this.$notify({
				title: '警告',
				message: '此功能在开发中...，敬请期待!',
				type: 'warning'
			});
		}
	}
}
</script>
<style scoped>
.liveManagePage{
    min-width: 1200px;
	max-width: 1200px;
	margin: 0 auto;
}
.play-top .button-gir{
	border: solid 1px #bbb;
    position: absolute;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    right: 20px;
	cursor: pointer;
}
.create-top{
	width: 100%;
	position: relative;
	padding: 10px 0;
	box-sizing: border-box;
}
</style>