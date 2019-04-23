import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

// 引入全局控制css样式文件
import './assets/css/global.css'

// 引入icon图标库
import './assets/fonts/iconfont.css'

import ElementUI from 'element-ui'
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://127.0.0.1:11333/api/private/v1/'
Vue.prototype.$http = axios
// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
