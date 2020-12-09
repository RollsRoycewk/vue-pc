import Vue from "vue";
import App from "./App.vue";

// 引入路由
import router from "./router";
// 引入vuex
import store from "@store/index";

// 引入mockServer，为了加载里面代码
// 里面代码一旦加载，就去启动mock服务器，从而拦截相应的请求
import "./mock/mockServer";
// 引入样式重置
import "./styles/reset.css";
// 引入图标字体样式
import "./styles/iconfont.css";
import "./plugins/element.js";
// 引入图片懒加载
import "./plugins/lazyLoad.js";
// 性能优化
import "swiper/swiper-bundle.min.css";

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
