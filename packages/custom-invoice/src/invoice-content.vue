
<script>
import InvoiceHeader from "./invoice-header";
import InvoiceBody from "./invoice-body";

export default {
    components: {
        InvoiceHeader,
        InvoiceBody
    },

    props: {
        templateData: {
            type: Object,
            required: true
        }
    },
    render() {
        return (
            <div>
                <invoice-header templateData={this.templateData.header} />
                <invoice-body templateData={this.templateData.body} />
                <invoice-header templateData={this.templateData.footer} />
            </div>
        );
    }
};
</script>
