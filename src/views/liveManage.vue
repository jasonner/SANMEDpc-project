<template>
    <div class="liveManagePage">
        <Top/>
		<div class="create-top play-top">
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
				<div class="playTopSub Fplay-aciton" @click="liveChange()">
					<i class="el-icon-video-play"></i>
					<span>直播控制</span>
				</div>
				<div class="playTopSub play-aciton play-aciton">
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
		<!-- 左侧菜单 -->
		<MenuList></MenuList>
    </div>
</template>
<script>
import '@/assets/css/body.css'
import '@/assets/css/index.css'
import Top from '@/components/top.vue'
import MenuList from '@/components/menuList.vue'
export default {
	name:'liveManage',
	data(){
		return{
			selectValue: '',
			liveList:[],
			userid:'',
		}
	},
	components:{
		Top,
		MenuList
	},

	mounted(){
		let query=this.$route.query;
		if(query && query.userid){
			this.userid = query.userid;
			this.getLiveListChange();
		}else{
			this.$router.push('/login');
		};
	},

	methods:{

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

		//跳转直播详情
		liveChange(){
			this.$router.push({path: '/liveDetail', query:{userid:this.userid,channel:this.selectValue}});
		},
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