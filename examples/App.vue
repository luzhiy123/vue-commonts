<template>
    <div class="test">
        <edit-invoice />
    </div>
</template>
<script>

import EditInvoice from "./components/edit-invoice";

export default {
    components: {
        EditInvoice
    },
    data() {
        return {
            test: "123"
        };
    }
};
</script>

<style lang="scss">
</style>