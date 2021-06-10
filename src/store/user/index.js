/* eslint-disable no-param-reassign */
import firebase from 'firebase';

export default {
  state: {
    user: null,
  },

  mutations: {

    registerUserForMeetup(state, payload) {
      const { id } = payload;
      // if (state.user.registeredMeetups.findIndex((meetup) => meetup.id === id) >= 0) {
      //   return false;
      // }
      state.user.registeredMeetups.push(id);
      state.user.fbKeys[id] = payload.fbKey;
    },

    setUser(state, payload) {
      state.user = payload;
    },

    unregisterUserFormMeetup(state, payload) {
      const { registeredMeetups } = state.user;
      registeredMeetups.splice(registeredMeetups.findIndex((meetup) => meetup.id === payload), 1);
      Reflect.deleteProperty(state.user.fbKey);
    },
  },

  actions: {
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} });
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

    async signUserIn({ commit }, payload) {
      try {
        commit('clearError');
        const user = await firebase.auth()
          .signInWithEmailAndPassword(payload.email, payload.password);
        const newUser = { id: user.uid, registeredMeetups: [], fbKeys: {} };
        commit('setUser', newUser);
      } catch (error) {
        console.log(error);
      }
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

  },

  getters: {

    user(state) {
      return state.user;
    },

  },
};
