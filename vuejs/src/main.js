import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
