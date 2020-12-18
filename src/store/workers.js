import axios from 'axios';

export default {
  state: {
    workers: [],
  },
  actions: {
    async fetchWorkers({ commit }) {
      const workers = (await axios.get('http://localhost:3000/workers')).data;
      commit('setWorkers', workers);
      return true;
    },
  },
  mutations: {
    setWorkers(state, payload) {
      state.workers = payload;
    },
  },
  getters: {
    getAllWorkers(state) {
      return state.workers;
    },
  },
};