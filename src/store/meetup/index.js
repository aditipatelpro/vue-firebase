/* eslint-disable no-param-reassign */
import firebase from 'firebase';

export default {
  state: {
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
    ],
  },

  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },

    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
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

  getters: {
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
};
