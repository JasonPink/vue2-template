import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './utils/filters'
import directives from './directives'

Vue.config.productionTip = false
Vue.use(filters)
Vue.use(directives)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
