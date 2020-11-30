import Vue from "vue";
import App from "./App.vue";

// 引入路由
import router from "./router";
// 引入vuex
import store from "@store/index";

// 引入样式重置
import "./styles/reset.css";

import "./plugins/element.js";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
