import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//mudar token caso necessario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6InBhaXZhaCIsImVtYWlsIjoicGFpdmFoQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE2MzcxMDMwNjYsImV4cCI6MTYzNzM2MjI2Nn0.1bTt1pK3QtNRXQGGnPX59aYDrl80lFAXgNwC3YXQgyw'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')