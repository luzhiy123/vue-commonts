
<script>
import { mapState, mapMutations } from "vuex";

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
        invoiceData: {
            type: Object,
            required: true
        },
        baseFiles: {
            type: Object,
            required: true
        },
        headerData: {
            type: Object
        },
        bodyData: {
            type: Array
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
    created() {
        // 该方式回重置store，导致外部引入store无法使用，只在纯粹无外部store依赖的组件中使用
        this.$store = makeInvoiceTemplateStore();
    },
    mounted() {
        this.initData();
    },
    methods: {
        ...mapMutations(["setBaseFiles", "setTemplateData"]),
        initData() {
            this.setBaseFiles(this.baseFiles);
            this.setTemplateData(this.invoiceData);
        }
    },
    render() {
        return (
            <div class="ht-invoice-tem-warp">
                <div class="ht-invoice-tem-content">
                    <InvoicePageHeader
                        showSample={this.showSample}
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