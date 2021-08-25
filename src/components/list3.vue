<template>
	<div class="List3">
		<div class="List3Top">
			自定义菜单
		</div>
		<div style="display: flex;">
			<div class="Lis3Left">
				<div class="shoujiXuan" v-if="!paixu">
					<i class="el-icon-arrow-left shoujiJian" id="swiper-button-next" @click="houtui()"></i>
					<div class="swiperList">
						<swiper class="swiper-no-swiping" v-bind:options="swiperOptions" id="swiperOptions" :style="{'marginLeft':pianyi}">
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai" style="margin-left: 0;">菜单一</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单一</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单二</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单三</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单四</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单五</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单刘</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai">菜单七</div>
							</swiper-slide>
							<swiper-slide class="swiper-no-swiping">
								<div class="shoujiCai" style="margin-right: 0;">菜单八</div>
							</swiper-slide>
						</swiper>
					</div>
					<i class="el-icon-arrow-right shoujiJian" id="swiper-button-prev" @click="qianjin()"></i>
				</div>
				<div class="subDiv" v-if="!paixu">
					<el-button size="mini" class="tijiao" style="padding: 3px 10px;padding-top: 4px;" @click="weizhiG">
						<i class="el-icon-sort" style="margin-right: 5px;"></i>菜单顺序
					</el-button>
					<el-button size="mini" class="tijiao" style="padding: 3px 10px;padding-top: 4px;">
						<i class="el-icon-plus" style="margin-right: 5px;"></i>新增菜单
					</el-button>

					<div class="qrTishi">
						<i class="el-icon-mobile-phone" style="font-size: 14px;margin-right: 5px;"></i>
						<div>手机扫描二维码查看显示效果</div>
					</div>
				</div>

				<div class="listPai" v-if="paixu">
					<el-tree :data="data" node-key="id" :allow-drop="allowDrop" @node-drop="handleDrop" draggable="true">
						<div class="custom-tree-node" style="font-size: 12px;color: #787878;width: 100%;" slot-scope="{data}">
							<span style="margin-right: 10px;">{{ data.id }}</span>
							<span>{{ data.label }}</span>
							<i class="el-icon-sort" style="margin-left: 60%;"></i>
						</div>
					</el-tree>
				</div>

				<div class="List3RSub" :style="{'visibility':zhanwei}" @click="weizhi">完成</div>
			</div>
			<div class="List3Right">
				<div class="ListCao">
					<div style="display: flex;justify-content: space-between;">
						<div class="Lis3RT">
							<span>菜单名称</span>
							<el-input type="text" placeholder="菜单名称" v-model="name" maxlength="8" show-word-limit></el-input>
						</div>
						<div class="Lis3RT">
							<span>菜单分类</span>
							<el-select v-model="SelectValue" placeholder="请选择">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
								</el-option>
							</el-select>
						</div>
					</div>

					<quill-editor v-model="content" :options="editorOption" ref="QuillEditor" style="margin-top: 20px;">
					</quill-editor>
					<div style="margin-top: 5px;text-align: right;font-size: 12px;color: #3C8CD2;">文字说明</div>
					<div style="margin-top: 5px;text-align: center;display: flex;justify-content: center;align-items: flex-end;position: relative;">
						<div style="margin-top: 5px;text-align: right;font-size: 12px;color: #3C8CD2;position: absolute;left: 0;">删除菜单</div>
						<div style="padding: 5px;border-radius: 5px;background: #3C8CD2;color: white;width: 10%;display: inline-block;">保存</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import '@/assets/css/body.css'
	import '@/assets/css/index.css'
	import {
		Swiper,
		SwiperSlide
	} from 'vue-awesome-swiper'
	import 'swiper/css/swiper.css'

	export default {
		name: "List3",
		data() {
			return {
				name: "",
				options: [{
					value: '图1',
					label: '图文'
				}, {
					value: '视频',
					label: '视频'
					// disabled: true
				}, {
					value: '话题互动',
					label: '话题互动'
				}, {
					value: '榜单排名',
					label: '榜单排名'
				}, {
					value: '照片直播',
					label: '照片直播'
				}],
				SelectValue: '',

				leftM: 0,
				pianyi: "0px",

				paixu: false,
				zhanwei: "auto",

				swiperOptions: {
					loop: true,
					// autoplay: {stopOnLastSlide: true, delay: 7000},
					direction: "vertical",
					on: {
						init: function() {
							swiperAni.swiperAnimateCache(this); //隐藏动画元素 
							swiperAni.swiperAnimate(this); //初始化完成开始动画
						},
						slideChangeTransitionStart: function(e) {
							swiperAni.swiperAnimate(this);
						},
						slideChangeTransitionEnd: function() {
							if (this.isEnd) {
								this.navigation.$nextEl.css('display', 'none');
							} else {
								this.navigation.$nextEl.css('display', 'block');
							}
						},
					},
				},

				data: [{
					id: 1,
					label: '一级 1'
				}, {
					id: 2,
					label: '一级 2'
				}, {
					id: 3,
					label: '一级 3'
				}]
			}
		},
		methods: {
			handleDrop(draggingNode, dropNode, dropType, ev) {
				for (let i = 0; i < this.data.length; i++) {
					this.data[i].id = i + 1
				}
			},
			allowDrop(draggingNode, dropNode, type) {
				for (let i = 0; i < this.data.length; i++) {
					if (dropNode.data.label == this.data[i].label) {
						return type !== 'inner';
					}
				}
			},

			jump(url) {
				this.$emit('allList', url)
			},
			houtui() {
				if (this.leftM == 0) {
					return
				} else {
					this.leftM--
					this.pianyi = -this.leftM * this.$refs.shouji.offsetWidth + 'px'
					console.log(document.getElementById('swiperOptions').style.marginLeft)
				}
			},
			qianjin() {
				if ((this.leftM * this.$refs.shouji.offsetWidth) + this.$refs.shouji.offsetWidth >= document.getElementById(
						'swiperOptions').offsetWidth) {
					return
				} else {
					this.leftM++
					this.pianyi = -this.leftM * this.$refs.shouji.offsetWidth + 'px'
					console.log(document.getElementById('swiperOptions').style.marginLeft)
				}
			},
			weizhi() {
				this.zhanwei = 'hidden'
				this.paixu = false
			},
			weizhiG() {
				this.zhanwei = 'auto'
				this.paixu = true
			}
		},
		mounted() {
			// if(document.getElementById('swiperOptions').offsetWidth > this.$refs.shouji.offsetWidth){

			// }
		}
	};
</script>

<style>
	.List3 {
		width: 100%;
		height: 100%;
		overflow: auto;
		background: white;
		background: #fafafa;
		border-radius: 10px;
	}

	.List3 .List3Top {
		height: 6.5%;
		display: flex;
		color: #787878;
		font-size: 16px;
		padding-left: 20px;
		align-items: center;
		background-color: #f5f5f5;
	}

	.List3 .Lis3Left {
		width: 35%;
		display: flex;
		padding: 20px;
		padding-top: 40px;
		margin-left: 40px;
		align-items: center;
		flex-direction: column;
	}

	.List3 .Lis3Left .shoujiTop {
		width: 100%;
	}

	.List3 .Lis3Left .shoujiXuan {
		width: 100%;
		display: flex;
		padding: 10px 0;
		align-items: center;
	}

	.List3 .Lis3Left .shoujiJian {
		width: 10%;
		text-align: center;
		transform: translateY(2px);
	}

	.List3 .Lis3Left .swiperList {
		width: 85%;
		overflow: scroll;
		white-space: nowrap;
	}

	.List3 .Lis3Left .shoujiCai {
		margin: 0 10px;
		font-size: 12px;
		display: inline-block;
		color: rgb(153, 153, 153);
	}

	.List3 .Lis3Left .subDiv {
		width: 100%;
		height: 300px;
		padding-top: 15px;
		text-align: center;
		background: #F5F5F5;
		box-sizing: border-box;
		border-top: 1px solid rgb(230, 230, 230);
	}

	.List3 .Lis3Left .qrImg {
		width: 100px;
		height: 100px;
		display: block;
		margin-left: 50%;
		margin-top: 50px;
		transform: translateX(-50%);
	}

	.List3 .Lis3Left .qrTishi {
		display: flex;
		color: #666666;
		font-size: 12px;
		margin-top: 40px;
		align-items: center;
		justify-content: center;
	}

	.List3 .Lis3Left .listPai {
		width: 100%;
		height: 300px;
		overflow: scroll;
		background-color: white;
	}

	.List3 .List3Right {
		width: 50%;
		display: flex;
		margin: 20px;
		margin-top: 40px;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background-color: #f5f8fa;
		border: 1px solid #dfdddd;
	}

	.List3 .List3Right:before {
		width: 0;
		top: 50%;
		height: 0;
		left: 42.4%;
		content: ' ';
		position: absolute;
		transform: translateY(-50%);
		border: 20px solid transparent;
		border-right: 20px solid #dfdddd;
	}

	.List3 .List3Right .ListCao {
		width: 90%;
		height: 95%;
	}

	.List3 .List3Right .ListCao::after {
		width: 0;
		top: 50%;
		height: 0;
		left: 42.5%;
		content: ' ';
		position: absolute;
		transform: translateY(-50%);
		border: 20px solid transparent;
		border-right: 20px solid #f5f8fa;
	}

	.List3 .List3RSub {
		margin: 10px 0;
		color: #3C8CD2;
		font-size: 14px;
		padding: 5px 20px;
		border-radius: 5px;
		border: solid 1px #3C8CD2;
	}

	.List3 .List3Right .Lis3RT {
		display: flex;
		font-size: 12px;
		align-items: center;
	}

	.List3 .List3Right .Lis3RT .el-input {
		width: 130px;
		padding: 5px;
	}

	.List3 .List3Right .Lis3RT .el-select .el-input {
		width: 80px;
		padding: 5px;
	}

	.List3 .List3Right .Lis3RT .el-input input {
		padding: 5px;
		font-size: 10px;
	}

	.List3 .List3Right .Lis3RT .el-select input {
		padding: 5px;
		font-size: 10px;
	}

	.List3 .List3Right .Lis3RT .el-input .el-input .el-input__count .el-input__count-inner,
	.el-input .el-input__count .el-input__count-inner {
		background-color: transparent;
	}

	.List3Right .ql-toolbar.ql-snow+.ql-container.ql-snow {
		height: 340px;
	}
</style>
