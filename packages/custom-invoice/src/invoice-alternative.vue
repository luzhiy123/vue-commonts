<script>
import draggable from "vuedraggable";
import AlternativeFiles from "./alternative-files";

export default {
    components: {
        draggable,
        AlternativeFiles
    },
    props: {
        headerFiles: {
            type: Array,
            required: true
        },
        bodyFiles: {
            type: Array,
            required: true
        }
    },

    data() {
        return {};
    },
    methods: {},
    render() {
        return (
            <div class="ht-invoice-alternative">
                <div class="title">
                    <span>打印内容</span>
                    <span>（拖拽到画布中）</span>
                </div>
                <div class="ht-invoice-header-alternative">
                    <div class="sub-title">页头页尾独立字段</div>
                    <AlternativeFiles group={{ name: "header", pull: "clone", put: false }} list={this.headerFiles} />
                </div>
                <div>
                    <div class="sub-title">标题列数据</div>
                    <AlternativeFiles group={{ name: "body", pull: "clone", put: false }} list={this.bodyFiles} />
                </div>
            </div>
        );
    }
};
</script>
<style lang="scss">
.ht-invoice-alternative {
    .title {
        margin-bottom: 20px;
    }
    .sub-title {
        margin-bottom: 10px;
    }
}
.ht-invoice-header-alternative {
    margin-bottom: 20px;
}
</style>