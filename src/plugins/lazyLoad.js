import Vue from "vue";
import VueLazyload from "vue-lazyload";

import loading from "../assets/imgs/loding.gif";

Vue.use(VueLazyload, {
  loading: loading,
});
