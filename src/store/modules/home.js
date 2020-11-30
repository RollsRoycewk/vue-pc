import { getBaseCategoryList, getslideshow } from "@api/home";

export default {
  state: { navList: [], slideshowList: [] },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      const navList = await getBaseCategoryList();
      commit("GET_CATEGORY_LIST", navList);
    },
    async getSlideshowList({ commit }) {
      const slideshow = await getslideshow();
      commit("GET_SLIDESHOW_LIST", slideshow);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, navList) {
      state.navList = navList;
    },
    GET_SLIDESHOW_LIST(state, slideshow) {
      state.slideshowList = slideshow;
    },
  },
};
