import Vue from "vue";
import HztlUi from "hztl-ui/lib/hztl-ui.common";
import "hztl-ui/lib/theme-chalk/index.css";

import App from "./App.vue";

Vue.use(HztlUi)

new Vue({
    render: h => h(App)
}).$mount("#app");
