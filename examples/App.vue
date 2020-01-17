<script>
import EditInvoice from "./components/edit-invoice";
import ShowInvoice from "./components/show-invoice";
import { Dialog } from "element-ui";

export default {
    components: {
        EditInvoice,
        ShowInvoice,
        ElDialog: Dialog
    },
    data() {
        return {
            aaa: console.log,
            test: "123",
            visible: false,
            invoiceData: {
                name: "订货计划",
                type: "销售出库单",
                id: "销售出库单",
                content: {
                    templateHeader: [
                        {
                            name: "支付方式",
                            disValue: "单据支付方式",
                            width: 1,
                            file: "date"
                        }
                    ],
                    templateBody: [
                        {
                            name: "No.",
                            disValue: "序号",
                            width: 40,
                            type: "index",
                        },
                        {
                            name: "配件编码",
                            disValue: "配件编码",
                            file: "code",
                            width: 100
                        },
                    ],
                    templateFooter: []
                }
            }
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
            this.invoiceData = data;
        }
    },
    render() {
        return (
            <div>
                <a on-click={this.show}>编辑 </a>
                <ElDialog visible={this.visible} on-close={this.hide} width="1200px">
                    <EditInvoice
                        invoiceData={this.invoiceData}
                        on-template-change={this.handleTemChange}
                        style="height:65vh"
                    />
                </ElDialog>
                <ShowInvoice
                    show-sample
                    invoiceData={this.invoiceData}
                    style="width:900px;"
                />
            </div>
        );
    }
};
</script>