import Vue from "vue";
import Vuex from "vuex";

import mockData from "./mock";
import mutations from "./mutations";

Vue.use(Vuex);

const { CHART_ADD_SEED_SERIES } = mutations;

const store = new Vuex.Store({
  state: {
    data: mockData, //данные относящиеся к отрисовке графика
  },
  getters: {
    getData: ({ data }) => data,
  },
  mutations: {
    [CHART_ADD_SEED_SERIES](state, seriesObj) {
      const obj = {
        categories: state.data.categories,
        series: state.data.series,
      }
      obj.series.push(seriesObj);
      state.data = obj;
    },
  },
  actions: {
    /* Добавляем новый вид семян */
    addSeedSeries({ commit }, seriesObj) {
      commit('CHART_ADD_SEED_SERIES', seriesObj);
    },
  },
});

export default store;
