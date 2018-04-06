import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import util from './util'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(util)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
