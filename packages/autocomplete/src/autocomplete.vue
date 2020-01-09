<template>
    <div
        v-clickoutside="close"
        :aria-expanded="suggestionVisible"
        :aria-owns="id"
        class="el-autocomplete"
        aria-haspopup="listbox"
        role="combobox"
    >
        <ht-input
            ref="input"
            v-bind="[$props, $attrs]"
            @change="handleChange"
            @input="handleInputChange"
            @focus="handleFocus"
            @blur="handleBlur"
            @clear="handleClear"
            @keydown.up.native="e => highlight(highlightedIndex - 1, e)"
            @keydown.down.native="e => highlight(highlightedIndex + 1, e)"
            @keydown.enter.native="handleKeyEnter"
            @keydown.native.tab="close"
            @keydown.native.esc="activated = false"
        >
            <template
                v-if="$slots.prepend"
                slot="prepend"
            >
                <slot name="prepend" />
            </template>
            <template
                v-if="$slots.append"
                slot="append"
            >
                <slot name="append" />
            </template>
            <template
                v-if="$slots.prefix"
                slot="prefix"
            >
                <slot name="prefix" />
            </template>
            <template
                v-if="showSuffix"
                slot="suffix"
            >
                <slot name="suffix">
                    <i
                        :class="['ht-arrow-icon', 'el-input__icon', 'el-icon-arrow-down', {'is-reverse': activated}]"
                        @click="handleClickSuffix"
                    />
                </slot>
            </template>
        </ht-input>
        <ht-autocomplete-suggestions
            :id="id"
            ref="suggestions"
            :class="[popperClass ? popperClass : '']"
            :popper-options="popperOptions"
            :append-to-body="popperAppendToBody"
            :placement="placement"
            visible-arrow
        >
            <li
                v-for="(item, index) in suggestions"
                :id="`${id}-item-${index}`"
                :key="index"
                :class="{'highlighted': highlightedIndex === index}"
                :aria-selected="highlightedIndex === index"
                role="option"
                @click="select(item)"
            >
                <slot :item="item">
                    {{ item[valueKey] }}
                </slot>
            </li>
        </ht-autocomplete-suggestions>
    </div>
</template>
<script>
import debounce from "throttle-debounce/debounce";
import Clickoutside from "element-ui/lib/utils/clickoutside";
import Emitter from "element-ui/lib/mixins/emitter";
import Migrating from "element-ui/lib/mixins/migrating";
import { generateId } from "element-ui/lib/utils/util";
import Focus from "element-ui/lib/mixins/focus";

import HtAutocompleteSuggestions from "./autocomplete-suggestions";
import HtInput from "../../input";

export default {
    name: "HtAutocomplete",
    components: {
        HtAutocompleteSuggestions,
        HtInput
    },
    directives: { Clickoutside },
    inject: {
        elForm: {
            default: ""
        },
        elFormItem: {
            default: ""
        }
    },
    mixins: [Emitter, Focus("input"), Migrating],
    inheritAttrs: false,
    componentName: "HtAutocomplete",
    props: {
        valueKey: {
            type: String,
            default: "value"
        },
        popperClass: String,
        popperOptions: Object,
        placeholder: String,
        clearable: {
            type: Boolean,
            default: false
        },
        disabled: Boolean,
        name: String,
        size: String,
        value: [String, Number],
        maxlength: Number,
        minlength: Number,
        autofocus: Boolean,
        fetchSuggestions: Function,
        triggerOnFocus: {
            type: Boolean,
            default: true
        },
        customItem: String,
        selectWhenUnmatched: {
            type: Boolean,
            default: false
        },
        debounce: {
            type: Number,
            default: 300
        },
        placement: {
            type: String,
            default: "bottom-start"
        },
        hideLoading: Boolean,
        popperAppendToBody: {
            type: Boolean,
            default: true
        },
        highlightFirstItem: {
            type: Boolean,
            default: false
        },
        showSuffix: {
            type: Boolean,
            default: true
        },
        popperWidth: Number,
        noDataText: String,
        noMatchText: String
    },
    data() {
        return {
            activated: false,
            isFocus: false,
            suggestions: [],
            loading: false,
            highlightedIndex: -1,
            suggestionDisabled: false
        };
    },
    computed: {
        isValidData() {
            const suggestions = this.suggestions;
            return Array.isArray(suggestions) && suggestions.length > 0;
        },
        isShowEmptyText() {
            return (
                this.highlightedIndex >= 0 &&
                !this.isValidData &&
                this.value &&
                this.emptyText &&
                this.isFocus
            );
        },
        emptyText() {
            return this.noDataText || this.noMatchText;
        },
        suggestionVisible() {
            return (
                (this.isValidData || this.loading || this.isShowEmptyText) &&
                this.activated
            );
        },
        id() {
            return `el-autocomplete-${generateId()}`;
        },
        inputRef() {
            return this.$refs.input;
        }
    },
    watch: {
        suggestionVisible(val) {
            const $input = this.getInput();
            if ($input) {
                this.broadcast("ElAutocompleteSuggestions", "visible", [
                    val,
                    this.popperWidth || $input.offsetWidth
                ]);
            }
        }
    },
    mounted() {
        this.debouncedGetData = debounce(this.debounce, this.getData);
        this.$on("item-click", item => {
            this.select(item);
        });
        const $input = this.getInput();
        $input.setAttribute("role", "textbox");
        $input.setAttribute("aria-autocomplete", "list");
        $input.setAttribute("aria-controls", "id");
        $input.setAttribute(
            "aria-activedescendant",
            `${this.id}-item-${this.highlightedIndex}`
        );
    },
    beforeDestroy() {
        this.$refs.suggestions.$destroy();
    },
    methods: {
        getMigratingConfig() {
            return {
                props: {
                    "custom-item":
                        "custom-item is removed, use scoped slot instead.",
                    props: "props is removed, use value-key instead."
                }
            };
        },
        getData(queryString) {
            if (this.suggestionDisabled) {
                return;
            }
            this.loading = true;
            this.fetchSuggestions(
                queryString && queryString.replace(/(^\s*)|(\s*$)/g, ""),
                suggestions => {
                    this.loading = false;
                    if (this.suggestionDisabled) {
                        return;
                    }
                    if (Array.isArray(suggestions)) {
                        this.suggestions = suggestions;
                        this.highlightedIndex = this.highlightFirstItem
                            ? 0
                            : -1;
                    } else {
                        console.error(
                            "[Element Error][Autocomplete]autocomplete suggestions must be an array"
                        );
                    }
                }
            );
        },
        handleChange(...params) {
            this.$emit("change", ...params);
        },
        handleInputChange(value) {
            this.$emit("input", value);
            this.activated = true;
            this.suggestionDisabled = false;
            if (!this.triggerOnFocus && !value) {
                this.suggestionDisabled = true;
                this.suggestions = [];
                return;
            }
            this.debouncedGetData(value);
        },
        handleFocus(event) {
            this.$emit("focus", event);
            this.isFocus = true;
            if (this.triggerOnFocus) {
                this.activated = true;
                this.debouncedGetData(this.value);
            }
        },
        handleClickSuffix() {
            if (this.disabled || (this.elForm && this.elForm.disabled)) return;
            this.activated = !this.activated;
            this.suggestionDisabled = false;
            if (this.activated) {
                this.focus();
                this.debouncedGetData();
            }
        },
        handleBlur(event) {
            this.$emit("blur", event);
            this.isFocus = false;
        },
        handleClear() {
            this.activated = false;
            this.$emit("clear");
        },
        close() {
            this.activated = false;
        },
        handleKeyEnter(e) {
            if (
                this.suggestionVisible &&
                this.highlightedIndex >= 0 &&
                this.highlightedIndex < this.suggestions.length
            ) {
                e.preventDefault();
                this.select(this.suggestions[this.highlightedIndex]);
            } else if (this.selectWhenUnmatched) {
                this.$emit("select", { value: this.value });
                this.$emit("change", this.value);
                this.$nextTick(() => {
                    this.suggestions = [];
                    this.highlightedIndex = -1;
                    this.inputRef.isComposing || this.$emit("intput-enter", e);
                });
            } else if (!this.suggestionVisible || this.isShowEmptyText) {
                this.inputRef.isComposing || this.$emit("intput-enter", e);
            }
        },
        select(item) {
            this.$emit("input", item[this.valueKey]);
            this.$emit("select", item);
            this.$emit("change", item[this.valueKey]);
            this.$nextTick(() => {
                this.suggestions = [];
                this.highlightedIndex = -1;
                this.activated = false;
                this.focus();
                // this.$emit("intput-enter", this.value);
            });
        },
        highlight(index, e) {
            if (!this.suggestionVisible || this.isShowEmptyText) {
                return;
            }
            e.stopPropagation();
            if (this.loading) {
                return;
            }
            if (index < 0) {
                this.highlightedIndex = -1;
                return;
            }
            if (index >= this.suggestions.length) {
                index = this.suggestions.length - 1;
            }
            const suggestion = this.$refs.suggestions.$el.querySelector(
                ".el-autocomplete-suggestion__wrap"
            );
            const suggestionList = suggestion.querySelectorAll(
                ".el-autocomplete-suggestion__list li"
            );

            const highlightItem = suggestionList[index];
            const scrollTop = suggestion.scrollTop;
            const offsetTop = highlightItem.offsetTop;

            if (
                offsetTop + highlightItem.scrollHeight >
                scrollTop + suggestion.clientHeight
            ) {
                suggestion.scrollTop += highlightItem.scrollHeight;
            }
            if (offsetTop < scrollTop) {
                suggestion.scrollTop -= highlightItem.scrollHeight;
            }
            this.highlightedIndex = index;
            const $input = this.getInput();
            $input.setAttribute(
                "aria-activedescendant",
                `${this.id}-item-${this.highlightedIndex}`
            );
        },
        getInput() {
            return this.$refs.input.getInput();
        }
    }
};
</script>

<style lang="scss">
.ht-arrow-icon {
    cursor: pointer;
    transition: transform 0.3s;

    &.is-reverse {
        transform: rotate(180deg);
    }
}
</style>