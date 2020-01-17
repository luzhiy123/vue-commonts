
<script>
import { mapState } from "vuex";

import {
    InvoicePageHeader,
    InvoicePageFooter,
    InvoiceEditHeader,
    InvoiceEditBody
} from "./components";

export default {
    components: {},
    computed: {
        ...mapState([
            "invoice",
            "templateHeader",
            "templateBody",
            "templateFooter"
        ])
    },
    render() {
        return (
            <div class="ht-invoice-edit-warp">
                <div class="ht-invoice-edit-box">
                    <div class="ht-invoice-edit-content-box">
                        <div class="ht-invoice-edit-content">
                            <InvoicePageHeader showSample />
                            <InvoiceEditHeader
                                templateData={this.templateHeader}
                            />
                            <InvoiceEditBody templateData={this.templateBody} />
                            <InvoiceEditHeader
                                templateData={this.templateFooter}
                            />
                            <InvoicePageFooter />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
</script>