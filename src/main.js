import Vue from 'vue'
import App from './App'
import router from './router'

// 引入全局控制css样式文件
import './assets/css/global.css'

// import ElementUI from 'element-ui'
// Vue.use(ElementUI)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
