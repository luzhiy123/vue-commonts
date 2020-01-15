
<script>
import { createNamespacedHelpers } from "vuex";
import Draggable from "vuedraggable";
const { mapMutations } = createNamespacedHelpers("invoice");

import store from "./store";
import InvoiceAlternative from "./invoice-alternative";
import InvoiceWarp from "./invoice-warp";

export default {
    name: "HtCustomInvoice",
    componentName: "HtCustomInvoice",
    components: {
        InvoiceAlternative,
        InvoiceWarp,
        Draggable
    },
    store,

    props: {
        invoiceData: {
            type: Object,
            required: true
        },
        baseFiles: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.setBaseFiles(this.baseFiles);
    },
    methods: {
        ...mapMutations(["setBaseFiles", "setTemplateData"]),
        initData() {
            this.setBaseFiles(this.baseFiles);
            this.setTemplateData(this.invoiceData);
        },
        saveAll() {
            this.$emit("templateChange");
        }
    },
    render() {
        return (
            <Draggable
                class="full-height full-width ht-trashzone"
                group={{
                    name: "trash",
                    draggable: ".dropitem",
                    put: () => true,
                    pull: false
                }}
            >
                <div class="flex-container ht-custom-invoice">
                    <InvoiceAlternative />
                    <div class="flex-container column-flex invoice-warp-content">
                        <div class="button-group">
                            <a class="link" on-click={this.initData}>
                                <i class="el-icon-refresh" />
                                &nbsp; 还原
                            </a>
                            &emsp;&emsp;
                            <a class="link" on-click={this.saveAll}>
                                <i class="el-icon-document-checked" />
                                &nbsp; 保存
                            </a>
                        </div>
                        <InvoiceWarp class="auto-block" />
                    </div>
                </div>
            </Draggable>
        );
    }
};
</script>
