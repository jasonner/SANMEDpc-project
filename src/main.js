import Vue from 'vue'
import App from './App.vue'
<<<<<<< HEAD
import router from './router'
import store from './store'
=======
import VueRouter from 'vue-router'
import router from './router'
>>>>>>> 6c013275232954aeb12be48a31132da511375b21
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
<<<<<<< HEAD
Vue.use(ElementUI);
import VideoJs from 'video.js'
import 'videojs-contrib-hls'
import 'videojs-flash'
import 'video.js/dist/video-js.css'
Vue.prototype.$video = VideoJs

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://live.lehuitech.com/'  //关键代码
=======
import './util/rem'

Vue.use(ElementUI);
Vue.use(VueRouter,)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://cac.sanmedgene.com/forhoo/'  //关键代码
>>>>>>> 6c013275232954aeb12be48a31132da511375b21
// 是否允许跨域携带cookie信息
// axios.defaults.withCredentials = true;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
<<<<<<< HEAD
Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  render: h => h(App)
=======
new Vue({
  router,
  render: h => h(App),
>>>>>>> 6c013275232954aeb12be48a31132da511375b21
}).$mount('#app')
