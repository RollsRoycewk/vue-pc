import { getBaseCategoryList } from "@api/home";

export default {
  state: { navList: [] },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const navList = await getBaseCategoryList();
      commit("GET_CATEGORY_LIST", navList);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, navList) {
      state.navList = navList;
    },
  },
};
