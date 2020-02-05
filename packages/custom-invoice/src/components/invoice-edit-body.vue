<script>
import { mapGetters } from "vuex";
import debounce from "throttle-debounce/debounce";
import HtResizeBox from "hztl-ui/packages/resize-box";
import AlternativeFiles from "./alternative-files";

export default {
    props: {
        soureFile: {
            type: String,
            required: true
        },
        templateData: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            debounceHandleTemplateChange: debounce(100, this.handleTemplateChange),
            useTemplateData: []
        };
    },
    computed: {
        ...mapGetters(["bodysData"]),
        detail() {
            return this.bodysData[this.soureFile][0] ?this.bodysData[this.soureFile][0] : {};
        }
    },
    watch: {
        templateData: {
            immediate: true,
            handler(value) {
                this.useTemplateData = value
            }
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
                    group={`body${this.soureFile}`}
                    handle=".dragghandle"
                    list={this.useTemplateData}
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
                                <div class="no-data">拖拽标题列数据设置表格</div>
                            )
                    }}
                />
            </div>
        );
    }
};
</script>