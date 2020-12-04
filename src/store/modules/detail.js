import { reqProductDetail } from "@api/detail";

export default {
  state: {
    productDetailList: {
      categoryView: {},
      spuSaleAttrList: [],
      skuInfo: {},
    },
  },
  getters: {
    categoryView(state) {
      return state.productDetailList.categoryView;
    },
    spuSaleAttrList(state) {
      return state.productDetailList.spuSaleAttrList;
    },
    skuInfo(state) {
      return state.productDetailList.skuInfo;
    },
  },
  actions: {
    async reqProductDetail({ commit }, detailId) {
      const productDetailList = await reqProductDetail(detailId);
      commit("REQ_PRODUCT_DETAIL", productDetailList);
    },
  },
  mutations: {
    REQ_PRODUCT_DETAIL(state, productDetailList) {
      state.productDetailList = productDetailList;
    },
  },
};
