
<script>
import { mapMutations, mapState } from "vuex";
import Draggable from "vuedraggable";

import { makeEditInvoiceStore } from "./store";

import InvoiceAlternative from "./invoice-alternative";
import InvoiceEditWarp from "./invoice-edit-warp";

export default {
    name: "HtCustomInvoice",
    componentName: "HtCustomInvoice",
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
    computed: {
        ...mapState([
            "invoice",
            "templateHeader",
            "templateBody",
            "templateFooter"
        ])
    },
    watch: {
        baseFiles() {
            this.initData();
        },
        invoiceData() {
            this.setTemplateData(this.invoiceData);
        }
    },
    beforeCreate() {
        // 该方式回重置store，导致外部引入store无法使用，只在纯粹无外部store依赖的组件中使用
        this.$store = makeEditInvoiceStore();
    },
    mounted() {
        this.initData();
    },
    methods: {
        ...mapMutations(["setBaseFiles", "setTemplateData"]),
        initData() {
            this.setBaseFiles(this.baseFiles);
            this.setTemplateData(this.invoiceData);
        },
        saveAll() {
            this.$emit("template-change", {
                ...this.invoice,
                content: {
                    templateHeader: this.templateHeader.map(item => ({
                        name: item.name
                    })),
                    templateBody: this.templateBody.map(item => ({
                        name: item.name,
                        width: item.width
                    })),
                    templateFooter: this.templateFooter.map(item => ({
                        name: item.name
                    }))
                }
            });
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
                handle=".no-trash-handle"
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
                        <InvoiceEditWarp class="auto-block" />
                    </div>
                </div>
            </Draggable>
        );
    }
};
</script>
