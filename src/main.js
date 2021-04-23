import Vue from 'vue'
import App from './App.vue'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAKauYLGRcF76GEDzvgn5GxdQM0ZoMt1tA',
      authDomain: 'vue-firebase-meetup.firebaseapp.com',
      projectId: 'vue-firebase-meetup',
      storageBucket: 'vue-firebase-meetup.appspot.com'
    })
  }
}).$mount('#app')
