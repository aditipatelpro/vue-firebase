/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

import meetup from './meetup';
import user from './user';
import shared from './shared';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetup,
    shared,
    user,
  },
});
