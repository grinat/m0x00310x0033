import Vue from 'vue'
import Home from './views/Home'
import store from './store'

import 'bulma/css/bulma.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app')
