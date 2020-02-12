
<script>
import Sidebar from "./sidebar";

export default {
    name: "HtMenuAside",
    componentName: "HtMenuAside",
    props: {
        menuList: {
            type: Array,
            required: true
        }
    },
    render() {
        return (
            <div class="ht-aside-box">
                <div class="ht-menu-logo-container">
                    <el-row style="height: 60px;">
                        <el-col span={18}>
                            <span
                                class="menu-logo"
                                style="margin: 16px 0 0 18px;"
                            >
                                <span class="icon icon-img-logo-menu" />
                            </span>
                        </el-col>
                    </el-row>
                </div>
                <div class="ht-menu-list-box">
                    <div>
                        <Sidebar menu-list={this.menuList} />
                    </div>
                </div>
            </div>
        );
    }
};
</script>
