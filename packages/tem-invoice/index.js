import TemInvoice from "../custom-invoice/src/tem-invoice";

/* istanbul ignore next */
TemInvoice.install = function(Vue) {
    Vue.component(TemInvoice.name, TemInvoice);
};

export default TemInvoice;
