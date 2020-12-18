import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import workers from './workers';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    workers,
  },
});
