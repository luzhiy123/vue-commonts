!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("custom-invoice",[],t):"object"==typeof exports?exports["custom-invoice"]=t():e["custom-invoice"]=t()}(window,(function(){return function(e){var t={};function o(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=11)}({0:function(e,t,o){"use strict";function n(e,t,o,n,r,i,a,s){var c,d="function"==typeof e?e.options:e;if(t&&(d.render=t,d.staticRenderFns=o,d._compiled=!0),n&&(d.functional=!0),i&&(d._scopeId="data-v-"+i),a?(c=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},d._ssrRegister=c):r&&(c=s?function(){r.call(this,this.$root.$options.shadowRoot)}:r),c)if(d.functional){d._injectStyles=c;var u=d.render;d.render=function(e,t){return c.call(t),u(e,t)}}else{var l=d.beforeCreate;d.beforeCreate=l?[].concat(l,c):[c]}return{exports:e,options:d}}o.d(t,"a",(function(){return n}))},11:function(e,t,o){"use strict";o.r(t);var n={props:{headerFiles:{type:Array,required:!0},bodyFiles:{type:Array,required:!0}},data:()=>({}),render(){const e=arguments[0];return e("div",[e("div",["打印内容",e("span",["（拖拽到画布中）"])]),e("div",[e("div",["页头页尾独立字段"]),e("div",["字段区域"])]),e("div",[e("div",["标题列数据"]),e("div",["字段区域"])])])}},r=o(0),i=Object(r.a)(n,void 0,void 0,!1,null,null,null);i.options.__file="packages/custom-invoice/src/invoice-alternative.vue";var a=i.exports,s={props:{templateData:{type:Array,required:!0}},data:()=>({}),render(){return(0,arguments[0])("div",["header"])}},c=Object(r.a)(s,void 0,void 0,!1,null,null,null);c.options.__file="packages/custom-invoice/src/invoice-header.vue";var d=c.exports,u={props:{templateData:{type:Array,required:!0}},data:()=>({}),render(){return(0,arguments[0])("div",["body"])}},l=Object(r.a)(u,void 0,void 0,!1,null,null,null);l.options.__file="packages/custom-invoice/src/invoice-body.vue";var p={components:{InvoiceHeader:d,InvoiceBody:l.exports},props:{templateData:{type:Object,required:!0}},render(){const e=arguments[0];return e("div",[e("invoice-header",{attrs:{templateData:this.templateData.header}}),e("invoice-body",{attrs:{templateData:this.templateData.body}}),e("invoice-header",{attrs:{templateData:this.templateData.footer}})])}},v=Object(r.a)(p,void 0,void 0,!1,null,null,null);v.options.__file="packages/custom-invoice/src/invoice-content.vue";var f=v.exports,y={name:"HtCustomInvoice",componentName:"HtCustomInvoice",components:{InvoiceAlternative:a,InvoiceContent:f},props:{name:{type:String,required:!0},headerFiles:{type:Array,required:!0},bodyFiles:{type:Array,required:!0},templateData:{type:Object,default:()=>({header:[],body:[],footer:[]})}},data:()=>({}),render(){const e=arguments[0];return e("div",[e(a,{attrs:{headerFiles:this.headerFiles,bodyFiles:this.bodyFiles}}),e(f,{attrs:{templateData:this.templateData}})])}},m=Object(r.a)(y,void 0,void 0,!1,null,null,null);m.options.__file="packages/custom-invoice/src/custom-invoice.vue";var b=m.exports;b.install=function(e){e.component(b.name,b)};t.default=b}}).default}));
//# sourceMappingURL=index.js.map