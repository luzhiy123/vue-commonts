
<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { makeInvoiceTemplateStore } from "./store";
import {
    InvoicePageHeader,
    InvoicePageFooter,
    InvoiceTemHeader,
    InvoiceTemBody
} from "./components";

export default {
    name: "HtTemInvoice",
    componentName: "HtTemInvoice",
    props: {
        showSample: Boolean,
        typeEmun: Object,
        temData: {
            type: Object,
            required: true
        },
        baseFiles: {
            type: Object,
            required: true
        },
        invoiceData: {
            type: Object
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
        baseFiles: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.initData();
                })
            }
        },
        temData() {
            this.setTemplateData(this.temData);
        },
        invoiceData() {
            this.initInvoiceData(this.invoiceData);
        }
    },
    created() {
        // 该方式回重置store，导致外部引入store无法使用，只在纯粹无外部store依赖的组件中使用
        this.$store = makeInvoiceTemplateStore();
    },
    methods: {
        ...mapActions(["initStoreData"]),
        ...mapMutations(["setTemplateData", "initInvoiceData"]),
        initData() {
            this.initStoreData({
                typeEmun: this.typeEmun,
                baseFiles: this.baseFiles,
                temData: this.temData,
                showSample: this.showSample,
                invoiceData: this.invoiceData
            });
        }
    },
    render() {
        return (
            <div class="ht-invoice-tem-warp">
                <div class="ht-invoice-tem-content">
                    <InvoicePageHeader
                        showSample={this.showSample}
                        typeEmun={this.typeEmun}
                        header={this.headerData}
                    />
                    <InvoiceTemHeader
                        showSample={this.showSample}
                        header={this.headerData}
                        templateData={this.templateHeader}
                    />
                    <InvoiceTemBody
                        showSample={this.showSample}
                        data={this.bodyData}
                        templateData={this.templateBody}
                    />
                    <InvoiceTemHeader
                        showSample={this.showSample}
                        header={this.headerData}
                        templateData={this.templateFooter}
                    />
                    <InvoicePageFooter />
                </div>
            </div>
        );
    }
};
</script>