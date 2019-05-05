import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 引入全局控制css样式文件
import './assets/css/global.css'

// 引入icon图标库
import './assets/fonts/iconfont.css'
import './assets/fonts1/iconfont.css'
import './assets/fonts2/iconfont.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'

// axios请求拦截器
axios.interceptors.request.use(
  function(config) {
    var token = window.sessionStorage.getItem('token')
    config.headers.Authorization = token
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.prototype.$http = axios
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
