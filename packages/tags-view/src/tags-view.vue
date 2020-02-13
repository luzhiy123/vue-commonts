<template>
    <div>
        <ul
            ref="elTabs"
            :class="{'ht-tags-container': true, 'full-container': moreTags.length }"
        >
            <li
                :class="{tag: true, active: routeName===tag.name}"
                :style="{minWidth: `${tagWidth}px`}"
                v-for="tag in showTags"
                :key="tag.name"
            >
                <span
                    @click="routeChange(tag)"
                    class="tag-link"
                >{{ tag.meta && (tag.meta.tagName || tag.meta.title) || tag.name }}&emsp;</span>
                <span
                    v-if="viewTags.includes(tag)" 
                    @click.stop="closeTag(tag.name)"
                    class="tag-icon"
                >
                    <i
                        class="el-icon-close"
                    />
                </span>
            </li>
            <li class="tag dropdown-tag">
                <el-dropdown size="small">
                    <span class="el-dropdown-link">
                        <i class="el-icon-caret-bottom" />
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                            v-for="menu in tagsMenus"
                            :key="menu.command"
                            :command="menu"
                            class="ht-tag-dropdown-menu"
                        >
                            <span
                                @click="handleMenuClick(menu)"
                                class="tag-link"
                            >{{ menu.name }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item
                            v-if="moreTags.length"
                            divided
                        />
                        <el-dropdown-item
                            v-for="tag in [...moreTags]"
                            :key="tag.name"
                            :command="tag"
                            class="ht-tag-dropdown-menu"
                        >
                            <span
                                @click="routeChange(tag)"
                                class="tag-link"
                            >{{ tag.meta && (tag.meta.tagName || tag.meta.title) || tag.name }}</span>
                            <span
                                @click.stop="closeTag(tag.name)" 
                                class="tag-icon"
                            >
                                <i
                                    class="el-icon-close"
                                />
                            </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>
<script>
import Vue from "vue";
import debounce from "throttle-debounce/debounce";
import { mapState, mapActions } from "vuex";

import store from "./store";

export default {
    name: "HtTagsView",
    componentName: "HtTagsView",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: Array,
            required: true
        },
        defaultTags: {
            type:  Array,
            default() {
                return []
            }
        },
        menuList: {
            type: Array,
            required: true
        }
    },
    store,
    data() {
        return {
            debounceChangeMaxTags: debounce(100, this.changeMaxTags),
            curTab: null,
            tagsMenus: [
                {
                    command: "otherClose",
                    name: "关闭其它"
                },
                {
                    command: "allClose",
                    name: "关闭所有"
                }
            ]
        };
    },
    computed: {
        ...mapState("routeTags", ["viewTags", "moreTags", "tagWidth"]),
        flexibleTags() {
            return [...this.viewTags, ...this.moreTags]
        },
        showTags() {
            return [...this.defaultTags, ...this.viewTags] || [];
        },
        routeName() {
            return this.$route.name;
        },
        asideMenuActive() {
            return  this.$route.meta && this.$route.meta.selectedPath || this.$route.path;
        },
        baseMenus() {
            const menus = [];
            getBaseMuns(this.menuList);
            return menus;
            function getBaseMuns(menuList) {
                menuList.forEach(item => {
                    if (item.children) {
                        getBaseMuns(item.children);
                    } else {
                        menus.push(item);
                    }
                });
            }
        }
    },
    watch: {
        $route(){
            this.changeCurTag()
        },
        flexibleTags(value) {
            this.$emit("change", value)
        }
    },
    created() {
        Vue.prototype.closePage = () => {
            this.closeTag(this.$route.name);
        };
    },
    mounted() {
        this.initTagsData(
            {
                defaultTags: this.defaultTags,
                router: this.$router,
                flexibleTags: this.value
            }
        );
        window.addEventListener("resize", this.debounceChangeMaxTags);
        if (this.$route.fullPath !== "/") {
            this.changeCurTag()
        }
        this.$nextTick(() => {
            this.changeMaxTags();
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.debounceChangeMaxTags);
    },
    methods: {
        ...mapActions("routeTags", [
            "addTag",
            "closeTag",
            "closeTagByType",
            "changeMaxTagsByWidth",
            "initTagsData"
        ]),
        changeCurTag() {
            const params = {
                name: this.$route.name,
                path: this.$route.path,
                query: this.$route.query || "",
                meta: this.$route.meta
            }
            this.addTag(params);
            this.$emit("cur-tag-change", params)
        },
        handleMenuClick(menu) {
            this.closeTagByType({
                type: menu.command,
                name: this.routeName
            });
        },
        routeChange(tag) {
            this.$router.push({
                path: tag.path,
                query: { ...tag.query }
            });
        },
        changeMaxTags() {
            if (this.$el) {
                this.changeMaxTagsByWidth({
                    width: this.$el.offsetWidth,
                    routeName: this.routeName
                });
            }
        }
    }
};
</script>

