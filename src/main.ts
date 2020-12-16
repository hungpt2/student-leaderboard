import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App";
import router from "./router";
import store from "./store";
import "@/assets/styles/css/tailwind.css";
import "@/assets/styles/scss/index.scss";
import "@/config/antd";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
