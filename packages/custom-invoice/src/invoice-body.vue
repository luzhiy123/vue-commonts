<script>
export default {
    props: {
        templateData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {};
    },
    render() {
        return <div class="ht-invoice-edit-body">body</div>;
    }
};
</script>

<style lang="scss">
@import "../../theme-chalk/src/var";
.ht-invoice-edit-body {
    background-color: $color-bg-grey;
}
</style>
