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
    user: null,
  },

  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    clearError(state) {
      state.error = null;
    },

    setError(state, payload) {
      state.error = payload;
    },

    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },

    setUser(state, payload) {
      state.user = payload;
    },
  },

  actions: {
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [] });
    },

    createMeetup({ commit }, getters, payload) {
      const meetup = {
        creatorId: getters.user.id,
        date: payload.date.toISOString(),
        description: payload.description,
        imageUrl: payload.imageUrl,
        location: payload.location,
        title: payload.title,
      };
      firebase.database().ref('meetups').push(meetup)
        .then(
          (data) => {
            const { key } = data;
            commit('createMeetup', {
              ...meetup,
              id: key,
            });
          },
        )
        .catch(
          (error) => {
            console.log(error);
          },
        );
    },

    // eslint-disable-next-line no-unused-vars
    loadMeetups({ commit }) {
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const key in obj) {
            meetups.push({
              creatorId: obj[key].creatorId,
              date: obj[key].date,
              description: obj[key].description,
              id: key,
              imageUrl: obj[key].imageUrl,
              title: obj[key].title,

            });
            commit('setLoadedMeetups', meetups);
          }
        })
        .catch(
          (error) => {
            console.log(error);
          },
        );
    },

    logout({ commit }) {
      firebase.auth().signOut();
      commit('setUser', null);
    },

    signUserUp({ commit }, payload) {
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          },
        )
        .catch(
          (error) => {
            commit('setError', error);
          },
        );
    },

    signUserIn({ commit }, payload) {
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
            };
            commit('setUser', newUser);
          },
        ).catch(
          (error) => {
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
