
<script>
import { dateFormatFull } from "hztl-ui/src/utils/date-util";
import { PRINGT_COPY_RIGHT } from "hztl-ui/src/constants";
import { createNamespacedHelpers } from "vuex";
import InvoiceHeader from "./invoice-header";
import InvoiceBody from "./invoice-body";

const { mapState } = createNamespacedHelpers("invoice");

export default {
    components: {
        InvoiceHeader,
        InvoiceBody
    },
    data() {
        return {
            curDate: new Date()
        };
    },
    computed: {
        ...mapState([
            "invoice",
            "templateHeader",
            "templateBody",
            "templateFooter"
        ])
    },
    methods: {
        handleHeaderChange() {
            this.$emit("change", this.value);
        },
        handleBodyChange() {
            this.$emit("change", this.value);
        },
        handleFooterChange() {
            this.$emit("change", this.value);
        }
    },
    render() {
        return (
            <div class="ht-invoice-edit-warp">
                <div class="ht-invoice-edit-box">
                    <div class="ht-invoice-edit-content-box">
                        <div class="ht-invoice-edit-content">
                            <div class="page-header">
                                <div
                                    src=""
                                    alt="[公司徽章]"
                                    class="company-logo"
                                >
                                    [公司徽章]
                                </div>
                                <span class="page-header-tip">
                                    <span class="title">打印时间：</span>
                                    <span class="content">
                                        {dateFormatFull(this.curDate)}（0)
                                    </span>
                                </span>
                                <div class="page-header-title">
                                    [公司名称]{this.invoiceTitle}
                                </div>
                            </div>
                            <invoice-header
                                templateData={this.templateHeader}
                                on-change={this.handleHeaderChange}
                            />
                            <invoice-body
                                templateData={this.templateBody}
                                on-change={this.handleBodyChange}
                            />
                            <invoice-header
                                templateData={this.templateFooter}
                                on-change={this.handleFooterChange}
                            />
                            <div class="print-copy-right">
                                {PRINGT_COPY_RIGHT}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
</script>