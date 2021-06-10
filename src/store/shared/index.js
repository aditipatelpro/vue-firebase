/* eslint-disable no-param-reassign */

export default {
  state: {
    error: null,
  },

  mutations: {

    clearError(state) {
      state.error = null;
    },

    setError(state, payload) {
      state.error = payload;
    },

  },

  actions: {
    clearError({ commit }) {
      commit('clearError');
    },
  },

  getters: {
    error(state) {
      return state.error;
    },
  },
};
