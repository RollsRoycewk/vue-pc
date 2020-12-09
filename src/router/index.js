import Vue from "vue";
import VueRouter from "vue-router";

// 引入store,为了读取token
import store from "@store";

// import Home from "../views/Home";
// import Login from "../views/Login";
// import Register from "../views/Register";
// import Search from "../views/Search";
// import ShopCart from "@views/ShopCart";
// import AddCartSuccess from "@views/AddCartSuccess";
// import Center from "@views/Center";
// import Trade from "@views/Trade";
// import Pay from "@views/Pay";
// import PaySuccess from "@views/PaySuccess";

const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home");
const Login = () => import(/* webpackChunkName: "Login" */ "../views/Login");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "../views/Register");
const Search = () => import(/* webpackChunkName: "Search" */ "../views/Search");
const ShopCart = () =>
  import(/* webpackChunkName: "ShopCart" */ "../views/ShopCart");
const AddCartSuccess = () =>
  import(/* webpackChunkName: "AddCartSuccess" */ "../views/AddCartSuccess");
const Center = () => import(/* webpackChunkName: "Center" */ "../views/Center");
const Trade = () => import(/* webpackChunkName: "Trade" */ "../views/Trade");
const Pay = () => import(/* webpackChunkName: "Pay" */ "../views/Pay");
const PaySuccess = () =>
  import(/* webpackChunkName: "PaySuccess" */ "../views/PaySuccess");

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

const router = new VueRouter({
  mode: "hash",
  // mode: "history",
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
      // 路由独享守卫
      beforeEnter: (to, from, next) => {
        // 需求：只有添加了购物车才能进行，没有添加就去购物车页面
        // console.log(to, from, next);
        // 1. 从detail过来 2. 有数据
        if (from.name === "detail") {
          return next();
        }
        next("/login");
      },
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

const authority = ["/pay", "/paysuccess", "/trade", "/center/myorder"];

router.beforeEach((to, form, next) => {
  // console.log(to, form);
  // if (authority.indexOf(to.path) > -1) {
  //   // 包含了,就要判断是否有token
  //   if (store.state.user.token) {
  //     next();
  //   } else {
  //     next("/login");
  //   }
  // } else {
  //   // 不包含,想去哪就去哪
  //   next();
  // }

  if (authority.indexOf(to.path) > -1 && !store.state.user.token) {
    return next("/login");
  }
  next();
});

export default router;
