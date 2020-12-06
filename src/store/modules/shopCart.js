import {
  reqGetCartList,
  reqUpShopCart,
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
    // 更新商品状态
    async upShopCart({ commit }, { skuID, skuNum }) {
      await reqUpShopCart(skuID, skuNum);
      commit("UP_SHOP_CART", { skuID, skuNum });
    },
  },
  mutations: {
    GET_CART_LIST(state, allShopCart) {
      state.allShopCartList = allShopCart;
      // 更新数据成功就要进行跳转
    },
    // 更新购物车数据
    UP_SHOP_CART(state, { skuID, skuNum }) {
      state.allShopCartList = state.allShopCartList.map((item) => {
        if (item.skuId === skuID) {
          item.skuNum += skuNum;
        }
        return item;
      });
    },
  },
};
