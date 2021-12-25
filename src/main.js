import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import SocketIO from 'socket.io-client'

import VueSocketIO from 'vue-socket.io'
const socket = SocketIO('http://localhost:3000')
Vue.use(new VueSocketIO({
  debug: true,
  connection: socket
}));

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
