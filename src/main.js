import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './utils/filters'
import directives from './directives'
import element from './element'
import api from './apis/index'
Vue.prototype.$api = api

Vue.config.productionTip = false
Vue.use(filters)
Vue.use(directives)
Vue.use(element)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

console.log(124)
