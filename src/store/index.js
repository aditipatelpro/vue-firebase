/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
    loadedMeetups: [
      {
        date: new Date(),
        description: 'Data analysis meetup in Prudential tower.',
        imageUrl: 'https://static.rentcars.com/imagens/modules/localidade/about/739-desktop-location-description.png',
        id: '1',
        location: 'Boston Downtown',
        title: 'Meetup in Boston',
      },
      {
        date: new Date(),
        description: 'React JS meetup in CN tower.',
        imageUrl: 'https://thumbnails.expedia.com/WAIOLrW6W9eerDtrV8bChFwICn4=/536x384/smart/filters:quality(60)/a.cdn-hotels.com/cos/heroimage/Toronto_EEX15P.jpg',
        id: '2',
        location: 'Toronto Downtown',
        title: 'Meetup in Toronto',
      },
      {
        date: new Date(),
        description: 'Data analysis meetup in Manhattan.',
        imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
        id: '3',
        location: 'Empire State building',
        title: 'Meetup in New York',
      },
      {
        date: new Date(),
        description: 'Data analysis meetup in trump tower.',
        imageUrl: 'https://www.swissotel.com/assets/0/92/2119/2120/2159/2161/6442451653/842c3170-fbea-4dcb-a655-c82988987467.jpg',
        id: '4',
        location: 'Chicago Downtown',
        title: 'Meetup in Chicago',
      },
    ],
    loading: false,
    user: null,
  },

  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    clearError(state) {
      state.error = null;
    },

    setLoading(state, payload) {
      state.loading = payload;
    },

    setError(state, payload) {
      state.error = payload;
    },

    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    createMeetup({ commit }, payload) {
      const meetup = {
        date: payload.date,
        description: payload.description,
        imageUrl: payload.imageUrl,
        id: '10',
        location: payload.location,
        title: payload.title,
      };
      // Firebase stuff
      commit('createMeetup', meetup);
    },

    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
          },
        );
    },

    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            commit('setLoading', false);
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          },
        ).catch(
          (error) => {
            commit('setLoading', false);
            commit('setError', error);
          },
        );
    },
  },
  modules: {
  },
  getters: {
    error(state) {
      return state.error;
    },

    loading(state) {
      return state.loading;
    },

    user(state) {
      return state.user;
    },

    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },

    loadedMeetup(state) {
      return (meetupId) => state.loadedMeetups.find((meetup) => meetup.id === meetupId);
    },

    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date);
    },
  },
});
