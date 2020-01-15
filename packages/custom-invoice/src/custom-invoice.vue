
<script>

import {cloneDeep} from "loadsh";
import InvoiceAlternative from "./invoice-alternative";
import InvoiceWarp from "./invoice-warp";
const defaultTemplateData = {
    header: [],
    body: [],
    footer: []
}

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
                return cloneDeep(defaultTemplateData);
            }
        }
    },

    data() {
        return {
            invoiceName: "",
            altHeaderFiles: [],
            altBodyFiles: [],
            altTemplateData: cloneDeep(defaultTemplateData)
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            /**
             * 初始化值
             * 逻辑：
             *  1、显示值为获取模版的深层clone，原值用于备份以便还原
             *  2、字段区域需要过滤，模版区域中已经存在的剔除
             * 
             */
            this.invoiceNameChange(this.name);
            this.altTemplateData = cloneDeep(this.templateData);
            this.altHeaderFiles = this.headerFiles
                .filter(item =>
                    ![
                        ...this.altTemplateData.header,
                        ...this.altTemplateData.footer
                    ].find(it => it.name === item.name)
                )
                .map(item => ({
                    width: 0,
                    ...item
                }));
            this.altBodyFiles = this.bodyFiles
                .filter(item =>
                    !this.altTemplateData.body.find(it => it.name === item.name)
                )
                .map(item => ({
                    width: item.width || 100,
                    ...item
                }));
        },
        saveAll() {
            this.$emit("templateChange", {
                name:  this.invoiceName,
                templateData: this.altTemplateData
            });
        },
        invoiceNameChange(value) {
            this.invoiceName = value;
        }
    },
    render() {
        return (
            <div class="flex-container ht-custom-invoice">
                <InvoiceAlternative
                    headerFiles={this.altHeaderFiles}
                    bodyFiles={this.altBodyFiles}
                    invoiceName={this.invoiceName}
                    on-name-change={this.invoiceNameChange}
                />
                <div class="flex-container column-flex invoice-warp-content">
                    <div class="button-group">
                        <a class="link" on-click={this.initData}>
                            还原
                        </a>
                        <a class="link" on-click={this.saveAll}>
                            保存
                        </a>
                    </div>
                    <InvoiceWarp
                        class="auto-block"
                        v-model={this.altTemplateData}
                    />
                </div>
            </div>
        );
    }
};
</script>
