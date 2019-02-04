import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './firebase'
import VueFire from 'vuefire'
import VeeValidate from 'vee-validate'
import 'buefy/dist/buefy.css'
import Buefy from 'buefy'

Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(VeeValidate)
Vue.use(Buefy)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
