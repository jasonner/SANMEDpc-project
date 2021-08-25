import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import VideoJs from 'video.js'
import 'videojs-contrib-hls'
import 'videojs-flash'
import 'video.js/dist/video-js.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
Vue.prototype.$video = VideoJs

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://live.lehuitech.com/'  //关键代码
// 是否允许跨域携带cookie信息
// axios.defaults.withCredentials = true;
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
Vue.use(VueAxios, axios)
Vue.use(VueQuillEditor);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
