<template>
    <div
        v-if="!item.hidden"
        class="ht-menu-wrapper"
    >
        <template
            v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
        >
            <app-link :to="resolvePath(onlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{'submenu-title-noDropdown':!isNest}"
                >
                    <div
                        v-if="item.icon"
                        class="menu-block"
                    >
                        <i
                            :class="item.icon"
                            class="menu-icon"
                        />
                        <div class="menu-title">
                            {{ shortName }}
                        </div>
                    </div>
                    <span slot="title">
                        {{ item.meta.title || item.name }}
                    </span>
                </el-menu-item>
            </app-link>
        </template>

        <el-submenu
            ref="subMenu"
            v-else
            :index="resolvePath(item.path)"
            popper-append-to-body
        >
            <template slot="title">
                <div
                    v-if="item.icon"
                    class="menu-block"
                >
                    <i
                        :class="item.icon"
                        class="menu-icon"
                    />
                    <div class="menu-title">
                        {{ shortName }}
                    </div>
                </div>
                <span
                    slot="title"
                    v-else
                >
                    {{ item.meta.title || item.name }}
                </span>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.key || child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
import path from "path";
import { isExternal } from "hztl-ui/src/utils/validate";
import AppLink from "./link";

export default {
    name: "SidebarItem",
    components: { AppLink },
    props: {
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ""
        },
        collapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        this.onlyOneChild = null;
        return {};
    },
    computed: {
        shortName() {
            let name = this.item.meta.title || this.item.name;
            return name.substring(0, 2);
        }
    },
    methods: {
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false;
                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true;
                }
            });

            // When there is only one child router, the child router is displayed by default
            if (showingChildren.length === 1) {
                return true;
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = {
                    ...parent,
                    path: "",
                    noShowingChildren: true
                };
                return true;
            }

            return false;
        },
        resolvePath(routePath) {
            if (isExternal(routePath)) {
                return routePath;
            }
            if (isExternal(this.basePath)) {
                return this.basePath;
            }
            return path.resolve(this.basePath, routePath);
        }
    }
};
</script>