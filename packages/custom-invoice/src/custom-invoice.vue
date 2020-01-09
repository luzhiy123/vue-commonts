
<script>

import InvoiceAlternative from "./invoice-alternative";
import InvoiceContent from "./invoice-content"

export default {
    name: "HtCustomInvoice",
    componentName: "HtCustomInvoice",
    components: {
        InvoiceAlternative,
        InvoiceContent
    },

    props: {
        name: {
            type: String,
            required: true,
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
                }
            }
        }
    },

    data() {
        return {
        };
    },
    render() {
        return (
            <div>
                <InvoiceAlternative headerFiles={this.headerFiles} bodyFiles={this.bodyFiles}  />
                <InvoiceContent templateData={this.templateData} />
            </div>
        )
    }
};
</script>