import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// require('../src/styles/style.css')

Vue.config.productionTip = false
Vue.prototype.$baseUrl = "https://untitled-ua515pfg2ggh.runkit.sh"

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
