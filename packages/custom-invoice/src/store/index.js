import Vue from "vue";
import Vuex from "vuex";

import { invoiceTemplate, editInvoice } from "./invoice";

Vue.use(Vuex);

export function makeEditInvoiceStore() {
    return new Vuex.Store({
        ...editInvoice
    });
}

export function makeInvoiceTemplateStore() {
    return new Vuex.Store({
        ...invoiceTemplate
    });
}