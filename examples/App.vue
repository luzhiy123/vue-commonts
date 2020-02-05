<script>
import EditInvoice from "./components/edit-invoice";
import ShowInvoice from "./components/show-invoice";

export default {
    data() {
        return {
            temsList: [],
        };
    },
    methods: {
        hide() {
            this.visible = false;
        },
        show() {
            this.visible = true;
        },
        handleTemChange(data) {
            this.temsList = data;
        }
    },
    render() {
        return (
            <div>
                <a on-click={this.show}>编辑 </a>
                <EditInvoice
                    invoiceData={this.invoiceData}
                    baseTemsList={this.temsList}
                    on-tem-list-change={this.handleTemChange}
                    style="height:65vh"
                />
                <ShowInvoice
                    show-sample
                    invoiceData={this.invoiceData}
                    style="width:900px;"
                    temsList={this.temsList}
                />
            </div>
        );
    }
};
</script>