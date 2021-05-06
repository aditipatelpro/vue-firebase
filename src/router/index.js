import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Meetups from '../components/Meetup/Meetups.vue';
import CreateMeetup from '../components/Meetup/CreateMeetup.vue';
import Meetup from '../components/Meetup/Meetup.vue';
import Profile from '../components/User/Profile.vue';
import Signin from '../components/User/Signin.vue';
import Signup from '../components/User/Signup.vue';

Vue.use(VueRouter);

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/',
  },

  {
    component: Meetups,
    name: 'Meetups',
    path: '/meetups',
  },

  {
    component: CreateMeetup,
    name: 'CreateMeetup',
    path: '/meetup/new',
  },

  {
    component: Meetup,
    name: 'Meetup',
    path: '/meetups/:id',
    props: true,
  },

  {
    component: Profile,
    name: 'Profile',
    path: '/profile',
  },

  {
    component: Signin,
    name: 'Signin',
    path: '/signin',
  },

  {
    component: Signup,
    name: 'Signup',
    path: '/signup',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
