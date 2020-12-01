import { getBaseCategoryList, getslideshow, getfloors } from "@api/home";

export default {
  state: { navList: [], slideshowList: [], floorsList: [] },
  getters: {},
  actions: {
    async getCategoryList({ commit }) {
      console.log("actions");
      const navList = await getBaseCategoryList();
      commit("GET_CATEGORY_LIST", navList);
    },
    async getSlideshowList({ commit }) {
      const slideshow = await getslideshow();
      commit("GET_SLIDESHOW_LIST", slideshow);
    },
    async getFloorsList({ commit }) {
      const floors = await getfloors();
      commit("GET_FLOORS_LIST", floors);
    },
  },
  mutations: {
    GET_CATEGORY_LIST(state, navList) {
      state.navList = navList;
    },
    GET_SLIDESHOW_LIST(state, slideshow) {
      state.slideshowList = slideshow;
    },
    GET_FLOORS_LIST(state, floors) {
      state.floorsList = floors;
    },
  },
};
