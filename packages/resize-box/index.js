import ResizeBox from "./src/resize-box";

ResizeBox.install = function(Vue) {
    Vue.component(ResizeBox.name, ResizeBox);
};

export default ResizeBox;
