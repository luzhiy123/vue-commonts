import Autocomplete from "./src/autocomplete";

/**
 * 回车 下拉时候原element的 emit  select ， 下拉没选中项和输入框时候 emit intput-enter 
 * 
 */

Autocomplete.install = function(Vue) {
    Vue.component(Autocomplete.name, Autocomplete);
};

export default Autocomplete;
