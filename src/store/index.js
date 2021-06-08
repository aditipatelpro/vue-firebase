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

    registerUserForMeetup(state, payload) {
      const { id } = payload;
      // if (state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >= 0) {
      //   return false;
      // }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
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

    unregisterUserFormMeetup(state, payload) {
      const { registeredMeetups } = state.user;
      registeredMeetups.splice(registeredMeetups.findIndex((meetup) => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.fbKey);
    },

    updateMeetup(state, payload) {
      // eslint-disable-next-line no-shadow
      const meetup = state.loadedMeetups.find((meetup) => meetup.id === payload.id);

      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
    },
  },

  actions: {
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} });
    },

    createMeetup({ commit, getters }, payload) {
      const meetup = {
        creatorId: getters.user.id,
        date: payload.date.toISOString(),
        description: payload.description,
        location: payload.location,
        title: payload.title,
      };

      let imageUrl;
      let key;
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key;
          return key;
        })

        // eslint-disable-next-line no-shadow
        .then((key) => firebase.storage().ref(`meetups/${key}`).put(payload.image))

        .then((image) => image.ref.getDownloadURL())

        // eslint-disable-next-line no-shadow
        .then((imageUrl) => firebase.database().ref('meetups').child(key).update({ imageUrl }))

        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl,
            id: key,
          });
        })

        .catch((error) => {
          console.log(error);
        });
    },

    fetchUserDate({ commit, getters }) {
      firebase.database().ref(`/users/${getters.user.id}/registrations`).once('value')
        .then((data) => {
          const dataPairs = data.val();
          const registeredMeetups = [];
          const swappedPairs = [];
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const key in dataPairs) {
            registeredMeetups.push(dataPairs[key]);
            swappedPairs[dataPairs[key]] = key;
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups,
            fbKeys: swappedPairs,
          };
          commit('setUser', updatedUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },

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
              location: obj[key].location,
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

    registerUserForMeetup({ commit, getters }, payload) {
      const userId = getters.user.id;
      firebase.database().ref(`/users/${userId}`).child('/registrations/').push(payload)
        .then((data) => {
          commit('registerUserForMeetup', { id: payload, fbKey: data.key });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {},
            };
            commit('setUser', newUser);
          },
        ).catch(
          (error) => {
            commit('setError', error);
          },
        );
    },

    signUserUp({ commit }, payload) {
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          (user) => {
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {},
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

    unregisterUserFormMeetup({ commit, getters }, payload) {
      const { user } = getters;
      const fbKey = user.fbKeys[payload];
      firebase.database().ref(`/users/${user.id}/registrations/`).child(fbKey).remove()
        .then(() => {
          commit('unregisterUserFormMeetup', payload);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateMeetupData({ commit }, payload) {
      const updateObj = {};

      if (payload.title) updateObj.title = payload.title;
      if (payload.description) updateObj.description = payload.description;
      if (payload.date) updateObj.date = payload.date;

      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateMeetup', payload);
        })
        .catch((error) => {
          console.log(error);
        });
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
