import TagsView from "./src/tags-view";

TagsView.install = function(Vue) {
    Vue.component(TagsView.name, TagsView);
};

export default TagsView;
