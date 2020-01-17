<template>
    <ht-tem-invoice
        :baseFiles="baseFiles"
        :invoiceData="invoiceData"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>
<script>
import { BASER_HEADER, BASE_BODY } from "./constants";

export default {
    props: {
        invoiceData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            baseFiles: {
                baseHeaders: BASER_HEADER,
                baseBodys: BASE_BODY
            }
        };
    },
};
</script>

<style lang="scss">
</style>