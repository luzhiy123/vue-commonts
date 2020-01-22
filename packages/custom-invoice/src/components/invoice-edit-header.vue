<script>
import { mapState } from "vuex";
import AlternativeFiles from "./alternative-files";

export default {
    props: {
        templateData: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapState(["headerData"]),
    },
    methods: {
        handleTemplateChange(data) {
            this.$emit("change", data);
        }
    },
    render() {
        return (
            <div class="ht-invoice-edit-header">
                <AlternativeFiles
                    on={this.$listeners}
                    attrs={this.$attrs}
                    group="header"
                    list={this.templateData}
                    scopedSlots={{
                        default: list =>
                            list.length ? (
                                list.map(file => (
                                    <div
                                        class={`list-group-item item-flex-${file.width}`}
                                    >
                                        <div class="file-item file-name text-ellipsis">
                                            {file.name}：
                                        </div>
                                        <div class="file-item ht-invoice-sample-class text-ellipsis">
                                            [{this.headerData[file.file]}]
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div
                                    class="no-data"
                                >
                                拖拽页头页尾部字段设置
                                </div>
                            )
                    }}
                />
            </div>
        );
    }
};
</script>