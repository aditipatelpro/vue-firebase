import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        date: '2021-04-20',
        imageURL: 'https://static.rentcars.com/imagens/modules/localidade/about/739-desktop-location-description.png',
        id: '1',
        title: 'Meetup in Boston'
      },
      {
        date: '2021-03-31',
        imageURL: 'https://thumbnails.expedia.com/WAIOLrW6W9eerDtrV8bChFwICn4=/536x384/smart/filters:quality(60)/a.cdn-hotels.com/cos/heroimage/Toronto_EEX15P.jpg',
        id: '2',
        title: 'Meetup in Toronto'
      },
      {
        date: '2021-05-25',
        imageURL: 'https://media-cdn.tripadvisor.com/media/photo-s/0e/9a/e3/1d/freedom-tower.jpg',
        id: '3',
        title: 'Meetup in New York'
      },
      {
        date: '2021-07-10',
        imageURL: 'https://www.swissotel.com/assets/0/92/2119/2120/2159/2161/6442451653/842c3170-fbea-4dcb-a655-c82988987467.jpg',
        id: '4',
        title: 'Meetup in Chicago'
      }
    ],
    user: {
      id: 'u1',
      registeredMeetups: ['1', '2']
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  getters: {
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    }

  }
})
