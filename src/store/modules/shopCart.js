import {
  reqGetCartList,
  //   reqUpShopCart,
  //   delShopCartCommodity,
  reqShopCartCheck,
} from "@api/shopCart";

export default {
  state: {
    //   所有购物车数据
    allShopCartList: [],
  },
  getters: {},
  actions: {
    //   所有购物车数据
    async getCartList({ commit }) {
      const allShopCart = await reqGetCartList();
      commit("GET_CART_LIST", allShopCart);
    },
    // 物品状态
    async shopCartCheck({ commit }, { skuId, isChecked }) {
      await reqShopCartCheck(skuId, isChecked);
      console.log(commit);
    },
  },
  mutations: {
    GET_CART_LIST(state, allShopCart) {
      state.allShopCartList = allShopCart;
    },
  },
};
