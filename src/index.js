/* Automatically generated by "./build/bin/build-entry.js" */

import ElementUI, { install } from "element-ui";

import Input from "../packages/input/index.js";
import Autocomplete from "../packages/autocomplete/index.js";
import CustomInvoice from "../packages/custom-invoice/index.js";

const components = [
    Input,
    Autocomplete,
    CustomInvoice,
];

const hztlInstall = function(Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.use(install)
};

/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

export default {
    ...ElementUI,
    install: hztlInstall,
    Input,
    Autocomplete,
    CustomInvoice
};
