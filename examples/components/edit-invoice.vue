<template>
    <div>
        <ht-custom-invoice
            :name="invoiceName"
            :header-files="invoiceHeaderFiles"
            :body-files="invoiceBodyFiles"
        />
    </div>
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
            ],
            invoiceBodyFiles: [
                {
                    name: "配件编码",
                    disvalue: "示例配件编码",
                    width: 1,
                    file: "code"
                },
                {
                    name: "配件名称",
                    disvalue: "示例配件名称",
                    width: 1,
                    file: "name"
                },
                {
                    name: "配件品牌",
                    disvalue: "示例配件品牌",
                    width: 1,
                    file: "brand"
                },
            ],
        };
    }
};
</script>

<style lang="scss">
</style>