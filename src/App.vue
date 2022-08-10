<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	import './assets/css/index.css'
	import Top from './components/top.vue'
	export default {
		name: "app",
		data() {
			return {};
		},
		components: {
			Top
		},
		mounted() {},
		methods: {
			alertChange(){
				this.$notify({
					title: '警告',
					message: '这是一条警告的提示消息',
					type: 'warning'
				});
			}
		},
	};
</script>

<style>
#app{
	width: 100%;
}
</style>
