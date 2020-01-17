<script>
export default {
    props: {
        showSample: Boolean,
        header: Object,
        templateData: {
            type: Array,
            required: true
        }
    },
    render() {
        return (
            <div class="ht-invoice-tem-header">
                <div class="ht-invoice-draggable-group">
                    {this.templateData.map(item => (
                        <div class={`list-group-item item-flex-${item.width}`}>
                            <div class="file-item file-name text-ellipsis">
                                {item.name}：
                            </div>
                            <div
                                class={`file-item ${
                                    this.showSample ? "ht-invoice-sample-class" : ""
                                } text-ellipsis`}
                            >
                                [
                                {this.showSample
                                    ? item.disValue
                                    : this.header[item.file]}
                                ]
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
</script>