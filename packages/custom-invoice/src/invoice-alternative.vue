<script>
import draggable from "vuedraggable";
import HtInput from "hztl-ui/packages/input";
import AlternativeFiles from "./alternative-files";

export default {
    components: {
        draggable,
        HtInput,
        AlternativeFiles
    },
    props: {
        invoiceName: {
            type: String,
            required: true
        },
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
    computed: {
        disInvoiceName: {
            get() {
                return this.invoiceName;
            },
            set(value) {
                this.$emit("name-change", value);
            }
        }
    },
    render() {
        return (
            <div class="ht-invoice-alternative">
                <div class="name-group">
                    <div>模版名称</div>
                    <HtInput size="mini" v-model={this.disInvoiceName} />
                </div>
                <div class="title">
                    <span>打印内容</span>
                    <span>（拖拽到画布中）</span>
                </div>
                <div class="ht-invoice-header-alternative">
                    <div class="sub-title">页头页尾独立字段</div>
                    <AlternativeFiles group="header" list={this.headerFiles} />
                </div>
                <div>
                    <div class="sub-title">标题列数据</div>
                    <AlternativeFiles group="body" list={this.bodyFiles} />
                </div>
            </div>
        );
    }
};
</script>