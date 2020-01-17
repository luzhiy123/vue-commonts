<script>
import debounce from "throttle-debounce/debounce";
import AlternativeFiles from "./alternative-files";
import HtResizeBox from "hztl-ui/packages/resize-box";

export default {
    props: {
        templateData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            debounceHandleTemplateChange: debounce(
                100,
                this.handleTemplateChange
            )
        };
    },
    methods: {
        handleTemplateChange(data) {
            this.$emit("change", data);
        },
        handleChangeWidth(width, file) {
            file.width = width;
            this.debounceHandleTemplateChange(this.templateData);
        }
    },
    render() {
        return (
            <div class="ht-invoice-edit-body">
                <AlternativeFiles
                    group="body"
                    handle=".dragghandle"
                    list={this.templateData}
                    on={this.$listeners}
                    attrs={this.$attrs}
                    scopedSlots={{
                        default: list =>
                            list.length ? (
                                list.map(file => (
                                    <HtResizeBox
                                        width={file.width}
                                        on-change-width={width =>
                                            this.handleChangeWidth(width, file)
                                        }
                                        class="list-group-item"
                                        style={{ width: `${file.width}px` }}
                                    >
                                        <div class="dragghandle">
                                            <div
                                                class="file-item file-name text-ellipsis"
                                                title={file.name}
                                            >
                                                {file.name}
                                            </div>
                                            <div
                                                class="file-item ht-invoice-sample-class text-ellipsis"
                                                title={file.disValue}
                                            >
                                                [{file.disValue}]
                                            </div>
                                        </div>
                                    </HtResizeBox>
                                ))
                            ) : (
                                <div class="no-data">
                                    拖拽标题列数据设置表格
                                </div>
                            )
                    }}
                />
            </div>
        );
    }
};
</script>