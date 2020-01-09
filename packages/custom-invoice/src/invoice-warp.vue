
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
            <div class="ht-invoice-edit-warp">
                <invoice-header templateData={this.templateData.header} />
                <invoice-body templateData={this.templateData.body} />
                <invoice-header templateData={this.templateData.footer} />
            </div>
        );
    }
};
</script>
<style lang="scss">

.ht-invoice-edit-warp {
    background-color: #000;
    padding: 20px;
}

</style>