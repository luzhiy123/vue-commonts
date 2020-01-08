import Vue from "vue";
import hztlUi from "hztl-ui";

import App from "./App.vue";

Vue.use(hztlUi)

new Vue({
    render: h => h(App)
}).$mount("#app");
