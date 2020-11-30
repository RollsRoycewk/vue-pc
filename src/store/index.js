import Vue from "vue";
import Vuex from "vuex";

import { getBaseCategoryList } from "@api/home";

Vue.use(Vuex);

const state = {
  navList: [],
};
const getters = {};
const actions = {
  async getCategoryList({ commit }) {
    const navList = await getBaseCategoryList();
    commit("GET_CATEGORY_LIST", navList);
  },
};
const mutations = {
  GET_CATEGORY_LIST(state, navList) {
    state.navList = navList;
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
