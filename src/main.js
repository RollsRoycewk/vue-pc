import Vue from "vue";
import App from "./App.vue";

import router from "./router";

// 引入样式重置
import "./styles/reset.css";

import './plugins/element.js'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
