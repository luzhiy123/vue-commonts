<script>
import debounce from "throttle-debounce/debounce";
import { mapState } from "vuex";
import HtResizeBox from "hztl-ui/packages/resize-box";
import AlternativeFiles from "./alternative-files";

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
    computed: {
        ...mapState(["detailsData"]),
        detail() {
            return this.detailsData[0] ? this.detailsData[0] : {}
        }
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
                                list.map(item => (
                                    <HtResizeBox
                                        width={item.width}
                                        on-change-width={width =>
                                            this.handleChangeWidth(width, item)
                                        }
                                        class="list-group-item"
                                        style={{ width: `${item.width}px` }}
                                    >
                                        <div class="dragghandle">
                                            <div
                                                class="file-item file-name text-ellipsis"
                                                title={item.name}
                                            >
                                                {item.name}
                                            </div>
                                            <div
                                                class="file-item ht-invoice-sample-class text-ellipsis"
                                                title={this.detail[item.file]}
                                            >
                                                [{this.detail[item.file]}]
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