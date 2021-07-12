import { isNumber } from "highcharts";
import Vue from "vue";
import Vuex from "vuex";

import mockData from "./mock";
import mutations from "./mutations";

Vue.use(Vuex);

const {
  CHART_ADD_SEED_SERIES,
  CHART_ADD_FIRST_YEAR,
  CHART_ADD_LAST_YEAR,
} = mutations;

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
      };
      obj.series.push(seriesObj);
      state.data = obj;
    },
    [CHART_ADD_FIRST_YEAR](state, yearObj) {
      const obj = {
        categories: state.data.categories,
        series: state.data.series,
      }
      obj.categories.unshift(yearObj.year);
      obj.series.forEach(item => {
        item.data.unshift(+yearObj.seeds[item.name]);
      });
      state.data = obj;
    },
    [CHART_ADD_LAST_YEAR](state, yearObj) {
      const obj = {
        categories: state.data.categories,
        series: state.data.series,
      }
      obj.categories.push(yearObj.year);
      obj.series.forEach(item => {
        item.data.push(+yearObj.seeds[item.name]);
      });
      state.data = obj;
    },
  },
  actions: {
    /* Добавляем новый вид семян */
    addSeedSeries({ commit }, seriesObj) {
      commit("CHART_ADD_SEED_SERIES", seriesObj);
    },
    /* Добавляем год */
    addYear({ commit }, yearObj) {
      if (yearObj.firstYear) {
        // Добавляем год в начало списка
        commit("CHART_ADD_FIRST_YEAR", yearObj);
      } else {
        // Добавляем год в конец списка
        commit("CHART_ADD_LAST_YEAR", yearObj);
      }
    },
  },
});

export default store;
