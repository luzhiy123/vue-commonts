
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { INDEX_UP_CASE } from "hztl-ui/src/constants";

import {
    InvoicePageHeader,
    InvoicePageFooter,
    InvoiceEditHeader,
    InvoiceEditBody
} from "./components";

export default {
    data() {
        return {
            isShowEditBody: true
        };
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
    methods: {
        ...mapMutations([
            "changeTemplateHeader",
            "changeTemplateFooter",
            "changeTemplateBody"
        ]),
        bodyChange(soureFile, data) {
            let templateBody = [...this.templateBody];
            let curChange = templateBody.find(
                item => item.soureFile === soureFile
            );
            curChange.content = data;
            this.changeTemplateBody(templateBody);
        },
        headerChange(data) {
            this.changeTemplateHeader(data);
        },
        footerChange(data) {
            this.changeTemplateFooter(data);
        }
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
                                on-change={this.headerChange}
                            />
                            <div class="ht-invoice-body-box">
                                {this.templateBody.map((item, index) => {
                                    return (
                                        this.bodysData[item.soureFile] && (
                                            <div class="ht-invoice-body-block">
                                                {item.tableName && (
                                                    <div class="ht-invoice-table-name">{`${
                                                        INDEX_UP_CASE[index + 1]
                                                    }、${item.tableName}`}</div>
                                                )}
                                                <InvoiceEditBody
                                                    soureFile={item.soureFile}
                                                    templateData={item.content}
                                                    on-change={data =>
                                                        this.bodyChange(
                                                            item.soureFile,
                                                            data
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    );
                                })}
                            </div>
                            <InvoiceEditHeader
                                templateData={this.templateFooter}
                                on-change={this.footerChange}
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