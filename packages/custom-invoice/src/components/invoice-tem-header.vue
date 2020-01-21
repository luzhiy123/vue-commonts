<script>
import { mapState } from "vuex";

export default {
    props: {
        showSample: Boolean,
        templateData: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapState(["headerData"])
    },
    render() {
        return (
            <div class="ht-invoice-tem-header">
                <div class="ht-invoice-draggable-group">
                    {this.templateData.map(item => (
                        <div class={`list-group-item item-flex-${item.width}`}>
                            <div class="file-item file-name">
                                {item.name}：
                            </div>
                            <div
                                class={`file-item ${
                                    this.showSample ? "ht-invoice-sample-class" : ""
                                } text-ellipsis`}
                            >
                                {this.headerData[item.file]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
</script>