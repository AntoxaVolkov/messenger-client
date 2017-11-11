import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang'
//import io from 'socket.io-client';


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
const myApp = new Vue({
  components: { App },
  router,
  store,
  i18n,
  template: '<App/>'
}).$mount('#app')
