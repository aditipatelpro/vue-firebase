import Vue from 'vue'
import App from './App.vue'
import DateFilter from './filters/date'
// import * as firebase from 'firebase'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

Vue.config.productionTip = false

Vue.filter('date', DateFilter)

const configOptions = {
  apiKey: 'AIzaSyAKauYLGRcF76GEDzvgn5GxdQM0ZoMt1tA',
  authDomain: 'vue-firebase-meetup.firebaseapp.com',
  projectId: 'vue-firebase-meetup',
  storageBucket: 'vue-firebase-meetup.appspot.com',
  messagingSenderId: '197473540824',
  appId: '1:197473540824:web:bf345ed87514abc1f615ad',
  measurementId: 'G-TYCSJYWC2L'
}
firebase.initializeApp(configOptions)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
