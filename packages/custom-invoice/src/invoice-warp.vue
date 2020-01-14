
<script>
import { dateFormatFull } from "hztl-ui/src/utils/date-util";
import InvoiceHeader from "./invoice-header";
import InvoiceBody from "./invoice-body";

export default {
    components: {
        InvoiceHeader,
        InvoiceBody
    },

    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            curDate: new Date()
        };
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
                    <div class="ht-invoice-edit-content">
                        <img src="" alt class="logo" />
                        <div class="header-content mt-1 mb-1">
                            <span class="msg-box">
                                <span class="title">打印时间：</span>
                                <span class="content">
                                    {dateFormatFull(this.curDate)}
                                </span>
                                <span class="content">（0）</span>
                            </span>
                        </div>
                        <invoice-header
                            templateData={this.value.header}
                            on-change={this.handleHeaderChange}
                        />
                        <invoice-body
                            templateData={this.value.body}
                            on-change={this.handleBodyChange}
                        />
                        <invoice-header
                            templateData={this.value.footer}
                            on-change={this.handleFooterChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
};
</script>