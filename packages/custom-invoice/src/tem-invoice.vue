
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { INDEX_UP_CASE } from "hztl-ui/src/constants";

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
        ...mapState(["invoice"]),
        ...mapGetters([
            "templateHeader",
            "templateBody",
            "templateFooter",
            "bodysData"
        ])
    },
    watch: {
        baseFiles: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.initData();
                });
            }
        },
        temData() {
            this.setTemDataSource(this.temData);
        },
        invoiceData() {
            this.setDataSource(this.invoiceData);
        }
    },
    created() {
        // 该方式回重置store，导致外部引入store无法使用，只在纯粹无外部store依赖的组件中使用
        this.$store = makeInvoiceTemplateStore();
    },
    methods: {
        ...mapActions(["initStoreData"]),
        ...mapMutations(["setTemDataSource", "setDataSource"]),
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
                    <InvoicePageHeader showSample={this.showSample} />
                    <InvoiceTemHeader
                        showSample={this.showSample}
                        templateData={this.templateHeader}
                    />
                    <div class="ht-invoice-body-box">
                        {this.templateBody.map((item, index) => {
                            return (
                                this.bodysData[item.soureFile] && (
                                    <div class="ht-invoice-body-block">
                                        {item.tableName && (
                                            <div class="ht-invoice-table-name">{`${INDEX_UP_CASE[index + 1]}、${
                                                item.tableName
                                            }`}</div>
                                        )}
                                        <InvoiceTemBody
                                            showSample={this.showSample}
                                            data={this.bodysData[item.soureFile]}
                                            templateData={item.content}
                                        />
                                    </div>
                                )
                            );
                        })}
                    </div>
                    <InvoiceTemHeader
                        showSample={this.showSample}
                        templateData={this.templateFooter}
                    />
                    <InvoicePageFooter />
                </div>
            </div>
        );
    }
};
</script>