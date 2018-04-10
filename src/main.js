import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = process.env.VUE_APP_SERVER_URL
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App)
}).$mount('#app')
