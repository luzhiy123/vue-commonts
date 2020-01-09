<script>
import AlternativeFiles from "./alternative-files";

export default {
    components: {
        AlternativeFiles
    },
    props: {
        templateData: {
            type: Array,
            required: true
        },
    },
    methods: {
        handleTemplateChange(data) {
            this.$emit("change", data)
        }
    },
    render() {
        return (
            <div class="ht-invoice-edit-header">
                <AlternativeFiles  group="header" list={this.templateData} />
            </div>
        )
    }
}
</script>
<style lang="scss">
@import "../../theme-chalk/src/var";

.ht-invoice-edit-header {
    background-color: $color-bg-grey;
}
</style>