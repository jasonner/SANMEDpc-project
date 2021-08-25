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
		methods: {},
	};
</script>

<style>
#app{
	width: 100%;
}
</style>
