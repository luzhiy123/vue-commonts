import Vue from "vue";
import HztlUi from "hztl-ui/src/index";
import "hztl-ui/packages/theme-chalk/src/index.scss";

import App from "./App.vue";

Vue.use(HztlUi)

new Vue({
    render: h => h(App)
}).$mount("#app");
