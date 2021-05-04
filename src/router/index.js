import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Meetups from '../components/Meetup/Meetups'
import CreateMeetup from '../components/Meetup/CreateMeetup'
import Meetup from '../components/Meetup/Meetup'
import Profile from '../components/User/Profile'
import Signin from '../components/User/Signin'
import Signup from '../components/User/Signup'

Vue.use(VueRouter)

const routes = [
  {
    component: Home,
    name: 'Home',
    path: '/'
  },

  {
    component: Meetups,
    name: 'Meetups',
    path: '/meetups'
  },

  {
    component: CreateMeetup,
    name: 'CreateMeetup',
    path: '/meetup/new'
  },

  {
    component: Meetup,
    name: 'Meetup',
    path: '/meetups/:id',
    props: true
  },

  {
    component: Profile,
    name: 'Profile',
    path: '/profile'
  },

  {
    component: Signin,
    name: 'Signin',
    path: '/signin'
  },

  {
    component: Signup,
    name: 'Signup',
    path: '/signup'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
