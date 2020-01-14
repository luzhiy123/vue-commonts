<template>
    <ht-custom-invoice
        :name="invoiceName"
        :header-files="invoiceHeaderFiles"
        :body-files="invoiceBodyFiles"
        :template-data="templateData"
        v-bind="$attrs"
        v-on="$listeners"
        @templateChange="log"
    />
</template>
<script>
export default {
    data() {
        return {
            invoiceName: "订货计划",
            invoiceHeaderFiles: [
                {
                    name: "供货单位",
                    disvalue: "供应商公司名称",
                    width: 2,
                    file: "name"
                },
                {
                    name: "联系电话",
                    disvalue: "供应商主联系电话",
                    width: 1,
                    file: "phone"
                },
                {
                    name: "业务日期",
                    disvalue: "单据业务日期",
                    width: 1,
                    file: "date"
                },
                {
                    name: "支付方式",
                    disvalue: "单据支付方式",
                    width: 1,
                    file: "date"
                },
                {
                    name: "发票类型",
                    disvalue: "单据发票类型",
                    width: 1,
                    file: "date"
                },
                {
                    name: "运费付款方",
                    disvalue: "单据运费付款方",
                    width: 1,
                    file: "date"
                },
                {
                    name: "备注",
                    disvalue: "单据备注",
                    width: 4,
                    file: "date"
                },
            ],
            templateData: {
                header: [],
                body: [],
                footer: []
            },
            invoiceBodyFiles: [
                {
                    name: "No.",
                    disvalue: "序号",
                    width: 40,
                    type: "index",
                },
                {
                    name: "配件编码",
                    disvalue: "配件编码",
                    file: "code"
                },
                {
                    name: "配件名称",
                    disvalue: "配件名称",
                    file: "name"
                },
                {
                    name: "配件品牌",
                    disvalue: "配件品牌",
                    file: "brand"
                },
                {
                    name: "产地",
                    disvalue: "产地",
                    file: "code"
                },
                {
                    name: "性质",
                    disvalue: "性质",
                    file: "code"
                },
            ]
        };
    },
    methods: {
        log(value) {
            this.templateData = value;
            console.log(value);
        }
    }
};
</script>

<style lang="scss">
</style>