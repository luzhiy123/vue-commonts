import CustomInvoice from "./src/custom-invoice";

CustomInvoice.install = function(Vue) {
    Vue.component(CustomInvoice.name, CustomInvoice);
};

export default CustomInvoice;
