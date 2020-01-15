<template>
    <ht-custom-invoice
        :baseFiles="baseFiles"
        :invoiceData="invoiceData"
        v-bind="$attrs"
        v-on="$listeners"
        @templateChange="log"
    />
</template>
<script>
import { BASER_HEADER, BASE_BODY } from "./constants";

export default {
    data() {
        return {
            invoiceData: {
                name: "订货计划",
                type: "销售出库单",
                id: 1,

            },
            baseFiles: {
                baseHeaders: BASER_HEADER,
                baseBodys: BASE_BODY
            }
        };
    },
    methods: {
        log(data) {
            this.invoiceData.name = data.name;
            this.invoiceData.content = data.content;
        }
    }
};
</script>

<style lang="scss">
</style>