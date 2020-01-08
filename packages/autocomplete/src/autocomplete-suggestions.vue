<template>
    <transition
        name="el-zoom-in-top"
        @after-leave="doDestroy"
    >
        <div
            v-show="showPopper"
            class="el-autocomplete-suggestion el-popper"
            :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
            :style="{ width: dropdownWidth }"
            role="region"
        >
            <el-scrollbar
                v-show="!parent.isShowEmptyText"
                tag="ul"
                wrap-class="el-autocomplete-suggestion__wrap"
                view-class="el-autocomplete-suggestion__list"
            >
                <li v-if="!parent.hideLoading && parent.loading">
                    <i class="el-icon-loading" />
                </li>
                <slot v-else />
            </el-scrollbar>
            <template v-if="parent.isShowEmptyText">
                <slot name="empty">
                    <p class="el-select-dropdown__empty">
                        {{ parent.emptyText }}
                    </p>
                </slot>
            </template>
        </div>
    </transition>
</template>
<script>
import Popper from "element-ui/lib/utils/vue-popper";
import Emitter from "element-ui/lib/mixins/emitter";

export default {
    mixins: [Popper, Emitter],

    componentName: "ElAutocompleteSuggestions",

    props: {
        options: {
            type: Object,
            default() {
                return {
                    gpuAcceleration: false
                };
            }
        },
        id: String
    },

    data() {
        return {
            parent: this.$parent,
            dropdownWidth: ""
        };
    },

    updated() {
        this.$nextTick(() => {
            this.popperJS && this.updatePopper();
        });
    },

    mounted() {
        this.$parent.popperElm = this.popperElm = this.$el;
        this.referenceElm = this.$parent.$refs.input.$refs.input;
        this.referenceList = this.$el.querySelector(
            ".el-autocomplete-suggestion__list"
        );
        this.referenceList.setAttribute("role", "listbox");
        this.referenceList.setAttribute("id", this.id);
    },

    created() {
        this.$on("visible", (val, inputWidth) => {
            this.dropdownWidth = inputWidth + "px";
            this.showPopper = val;
        });
    },

    methods: {
        select(item) {
            this.dispatch("ElAutocomplete", "item-click", item);
        }
    }
};
</script>
