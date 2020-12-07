import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home";
import Login from "../views/Login";
import Register from "../views/Register";
import Search from "../views/Search";
import ShopCart from "@views/ShopCart";
import AddCartSuccess from "@views/AddCartSuccess";
import Center from "@views/Center";
import Trade from "@views/Trade";
import Pay from "@views/Pay";
import PaySuccess from "@views/PaySuccess";
// 商品详情
import Detail from "@views/Detail";

Vue.use(VueRouter);

const push = VueRouter.prototype.push;
const replace = VueRouter.prototype.replace;

// VueRouter.prototype.push = function(location, onComplete, onAbort) {
//   if (onComplete && onAbort) {
//     return push.call(this, location, onComplete, onAbort);
//   }
//   return push.call(this, location, onComplete, () => {});
// };

// VueRouter.prototype.replace = function(location, onComplete, onAbort) {
//   if (onComplete && onAbort) {
//     return replace.call(this, location, onComplete, onAbort);
//   }
//   return replace.call(this, location, onComplete, () => {});
// };

// // 简写形式
VueRouter.prototype.push = function(location, onComplete, onAbort = () => {}) {
  console.log(location);
  return push.call(this, location, onComplete, onAbort);
};

VueRouter.prototype.replace = function(
  location,
  onComplete,
  onAbort = () => {}
) {
  console.log(location);
  return replace.call(this, location, onComplete, onAbort);
};

export default new VueRouter({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/login",
      component: Login,
      meta: {
        isFooterShow: true,
      },
    },
    {
      path: "/register",
      component: Register,
      meta: {
        isFooterShow: true,
      },
    },
    {
      name: "search",
      path: "/search/:searchText?",
      component: Search,
    },
    // 商品详情页
    {
      name: "detail",
      path: "/detail/:detailId",
      component: Detail,
    },
    // 添加购物车
    {
      name: "shopCart",
      path: "/shopCart",
      component: ShopCart,
    },
    // 购物车完成
    {
      name: "addCartSuccess",
      path: "/addCartSuccess",
      component: AddCartSuccess,
    },
    // 交易界面
    {
      name: "trade",
      path: "/trade",
      component: Trade,
    },
    // 交易界面
    {
      name: "center",
      path: "/center/myorder",
      component: Center,
    },
    // 支付页面
    {
      name: "pay",
      path: "/pay",
      component: Pay,
    },
    // 支付成功
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: PaySuccess,
    },
  ],
  // 每次切换路由页面滚动条位置
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
