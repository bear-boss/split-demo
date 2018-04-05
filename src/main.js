import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
