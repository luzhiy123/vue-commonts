
<script>
import InvoiceAlternative from "./invoice-alternative";
import InvoiceWarp from "./invoice-warp";

export default {
    name: "HtCustomInvoice",
    componentName: "HtCustomInvoice",
    components: {
        InvoiceAlternative,
        InvoiceWarp
    },

    props: {
        name: {
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
        },
        templateData: {
            type: Object,
            default() {
                return {
                    header: [],
                    body: [],
                    footer: []
                };
            }
        }
    },

    data() {
        return {};
    },
    render() {
        return (
            <div class="flex-container ht-custom-invoice">
                <InvoiceAlternative
                    headerFiles={this.headerFiles}
                    bodyFiles={this.bodyFiles}
                />
                <div class="auto-block invoice-warp">
                    <div class="button-group">
                        <a class="link">还原</a>
                        <a class="link">保存</a>
                    </div>
                    <InvoiceWarp
                        class="auto-block"
                        templateData={this.templateData}
                    />
                </div>
            </div>
        );
    }
};
</script>
<style lang="scss">
.ht-custom-invoice {
    .button-group {
        text-align: right;
        .link {
            margin-left: 10px;
        }
    }
}
</style>