import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap'
import './config/msgs'
import store from './config/store'
import router from './config/router'

Vue.config.productionTip = false

//mudar token caso necessario
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlBhaXZhIiwiZW1haWwiOiJwYWl2YWhAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTYzNjU0OTY4NSwiZXhwIjoxNjM2ODA4ODg1fQ.J6fwmwg4n4m2fVSf8r95oz_icWGFyyESpwDdlWYwdFQ'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')