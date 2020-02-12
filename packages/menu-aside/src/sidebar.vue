<template>
    <el-menu
        :default-active="asideMenuActive"
        :collapse="asideCollapse"
        :collapse-transition="false"
        :unique-opened="true"
    >
        <sidebar-item
            :platformCounts="platformCounts"
            v-for="(route, index) in menuList"
            :key="index"
            :item="{
                ...route,
                alwaysShow: true
            }"
            :base-path="route.path"
            :collapse="asideCollapse"
        />
    </el-menu>
</template>
<script>
import SidebarItem from "./sidebar-item";

export default {
    name: "MenuAside",
    components: { SidebarItem },
    props: {
        asideCollapse: {
            type: Boolean,
            default: true
        },
        menuList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            platformCounts: {
                needs: "",
                center: ""
            }
        };
    },
    computed: {
        asideMenuActive() {
            return  this.$route.meta && this.$route.meta.selectedPath || this.$route.path;
        }
    },
};
</script>
