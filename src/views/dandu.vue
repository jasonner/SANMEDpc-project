<template>
	<div style="height: 100vh;display: flex;align-items: center;">
		<video ref='videos' id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered" style="width: 1200px;height: 675px;"></video>
	</div>
</template>

<script>
	import '../assets/css/body.css'
	import '../assets/css/index.css'

	export default {
		name: "PlayVideo",
		data() {
			return {
				myPlayer: '',
				// 			dialogVisible: true,
				// 			kv: require('../assets/img/bg2.png'),
				// 			videoPlay: 0,

				// 			uploadDate: "2021-08-27 13:10",
				// 			videoState: "2",
				// 			videoNum: "2",
				// 			tuiLiu: "",

				// 			bofang:0
			}
		},
		methods: {
			// 判断播放状态
			// liu(qindao) {
			// 	let ths = this
			// 	this.$post(qindao).then((res) => {
			// 		if (res.msg == '流已开启') {
			// 			if (ths.$data.videoPlay == 0) {
			// 				// 提示文字
			// 				ths.$message({
			// 					message: '直播已开启',
			// 					type: 'success'
			// 				});
			// 				// 添加视频,并且显示播放器
			// 				ths.myPlayer.src({
			// 					type: "application/x-mpegURL",
			// 					src: 'https://pull.lehuitech.com/test/DB06C78D1E24CF708A14CE81C9B617EC.m3u8'
			// 				})
			// 				ths.$refs.videoDiv.firstChild.style.display = 'block'
			// 				ths.$data.videoPlay = 1
			// 			}
			// 		} else if (res.msg == '流已关闭') {
			// 			if (ths.dialogVisible || ths.$data.videoPlay == 1) {
			// 				// 提示,并且隐藏播放器
			// 				ths.$message({
			// 					message: '直播已关闭',
			// 					type: 'warning'
			// 				});
			// 				ths.$refs.videoDiv.firstChild.style.display = 'none'
			// 				ths.$data.videoPlay = 0
			// 			}
			// 		}
			// 		ths.dialogVisible = false
			// 	})
			// },
			// 初始化video.js
			initVideo() {
				console.log('执行')
				let ths = this
				this.$nextTick(() => {
					this.$data.myPlayer = this.$video(document.getElementById('myVideo'), {
						controls: true,
						autoplay: true,
						fill: true,
						preload: "auto",
						height: '173px',
						width: '307.7px'
					})
					ths.myPlayer.src({
						type: "application/x-mpegURL",
						src: 'https://pull.lehuitech.com/test/test.m3u8?auth_key=1632725871-0-0-06813601b954f79a19411140964de7ca'
					})
				})
			},
		},
		mounted() {
			console.log('准备1')
			let ths = this
			// let search = window.location.hash
			// let Oname = search.split('&')[1].split('=')[1].split('_')[0]
			// let name = decodeURIComponent(Oname).substr(decodeURIComponent(Oname).lastIndexOf('/') + 1)
			// this.tuiLiu = decodeURIComponent(search.split('&')[0].split('=')[1])
			// 初始化video.js
			ths.initVideo()

			setTimeout(function() {
				ths.myPlayer.src({
					type: "application/x-mpegURL",
					src: 'https://pull.lehuitech.com/test/test.m3u8?auth_key=1632725871-0-0-06813601b954f79a19411140964de7ca'
				})
			}, 1000)
		}
	};
</script>

<style>
</style>
