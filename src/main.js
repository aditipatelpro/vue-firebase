import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import DateFilter from './filters/date';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import AlertCmp from './components/Shared/Alert.vue';
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue';

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);
Vue.component('app-edit-meetup-details-dailog', EditMeetupDetailsDialog);

const configOptions = {
  apiKey: 'AIzaSyAKauYLGRcF76GEDzvgn5GxdQM0ZoMt1tA',
  authDomain: 'vue-firebase-meetup.firebaseapp.com',
  projectId: 'vue-firebase-meetup',
  storageBucket: 'vue-firebase-meetup.appspot.com',
  messagingSenderId: '197473540824',
  appId: '1:197473540824:web:bf345ed87514abc1f615ad',
  measurementId: 'G-TYCSJYWC2L',
};
firebase.initializeApp(configOptions);
new Vue({
  router,
  store,
  vuetify,
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
  render: (h) => h(App),
}).$mount('#app');
