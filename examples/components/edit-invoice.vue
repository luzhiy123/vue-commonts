<script>
import {
    INVOICE_TYPE_EMUN,
    BASE_FILES_LIST,
    DEFAULT_PRINT_TEMS
} from "./constants";

export default {
    props: {
        type: {
            type: String,
            default: "orderPlan"
        },
        baseTemsList: {
            type: Array
        }
    },
    data() {
        return {
            visible: false,
            loading: false,
            selectedRows: [],
            editTemData: {},
            baseFiles: {},
            columns: [
                {
                    label: "默认",
                    prop: "isDefault",
                    width: 50,
                    render: (value, row) => (
                        <el-checkbox
                            value={row.isDefault}
                            on-click={e => e.stopPropagation()}
                            on-change={() => this.setDefaultTem(row.id)}
                        />
                    )
                },
                {
                    label: "操作",
                    prop: "controls",
                    width: 100,
                    type: "controls",
                    render: (_, row) => (
                        <div>
                            {row.cantModify ? null : (
                                <a on-click={e => this.showEditDialog(row, e)}>
                                    编辑
                                </a>
                            )}
                            &nbsp;
                            <a on-click={e => this.copyTem(row, e)}>拷贝</a>
                            &nbsp;
                            {row.cantModify ? null : (
                                <a
                                    on-click={e =>
                                        this.removePrintTem(row.id, e)
                                    }
                                >
                                    删除
                                </a>
                            )}
                        </div>
                    )
                },
                {
                    label: "模版名称",
                    width: 100,
                    prop: "name"
                }
            ]
        };
    },
    computed: {
        temsList: {
            get() {
                return this.baseTemsList;
            },
            set(value) {
                this.$emit("tem-list-change", value);
            }
        },
        temData() {
            if (this.selectedRows.length) {
                return {
                    ...this.selectedRows[0],
                    content: this.selectedRows[0].content
                };
            } else {
                return {
                    type: this.type
                };
            }
        }
    },
    watch: {
        type: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getBaseFiles(newVal);
                    this.loadTemsList(newVal);
                }
            }
        }
    },
    methods: {
        getBaseFiles(type) {
            this.baseFiles =
                BASE_FILES_LIST.find(item => item.type == type) || {};
        },
        loadTemsList(type) {
            // 拼接内置数据，默认项如果不是后端存储数据则为本地内置数据
            const defaultTem = DEFAULT_PRINT_TEMS.find(
                item => item.type === type
            );
            this.temsList = [
                {
                    ...defaultTem,
                    isDefault: true
                }
            ];

            // 设置默认选中项，默认从上次的选项中判断id，如果无，则选中默认项
            let selected;
            if (this.selectedRows.length) {
                selected = this.temsList.find(
                    item => item.id === this.selectedRows[0].id
                );
            }
            if (!selected) {
                selected = this.temsList.find(item => item.isDefault);
            }

            this.selectedRows = selected ? [selected] : [];
        },
        currentChange(row) {
            this.selectedRows = [row];
        },
        copyTem(data, e) {
            e.stopPropagation();
            this.showEditDialog({
                name: `${data.name}的复制`,
                type: data.type,
                content: data.content
            });
        },
        showEditDialog(data, e) {
            e && e.stopPropagation();
            // 传值且存在id为编辑，不传值为新增
            this.editTemData = data
                ? {
                    ...data,
                    content: data.content
                }
                : {
                    type: this.type
                };
            this.visible = true;
        },
        hideEditDialog() {
            this.visible = false;
        },
        async removePrintTem(id, e) {
            e.stopPropagation();
            await this.$confirm("此操作将永久删除该模版, 是否继续?");
            this.temsList = this.temsList.filter(item => item.id !== id);
        },
        setDefaultTem(id) {
            this.temsList.forEach(item => {
                item.isDefault = item.id === id;
            });
        },
        handleTemChange(data) {
            if (!data.name) {
                this.$message({
                    message: "模版名不能为空！",
                    type: "warning"
                });
                return;
            }
            if (
                this.temsList.find(
                    item => item.name === data.name && item.id !== data.id
                )
            ) {
                this.$message({
                    message: "模版名不能重复！",
                    type: "warning"
                });
                return;
            }
            if (data.id) {
                const curTem = this.temsList.find(item => item.id === data.id);
                curTem.name = data.name;
                curTem.content = data.content;
            } else {
                this.temsList.push({
                    ...data,
                    id: this.temsList.length
                });
            }
            this.hideEditDialog();
        }
    },
    render() {
        return (
            <div class="container-card flex-container column-flex">
                <div class="ht-page-title">
                    {INVOICE_TYPE_EMUN[this.type]}打印模版
                </div>
                <div class="divider"></div>
                <div class="flex-container auto-block">
                    <div class="tem-control" v-loading={this.loading}>
                        <el-table
                            class="tem-list"
                            resizable={false}
                            highlight-current-row
                            on-current-change={this.currentChange}
                            data={this.temsList}
                        >
                            {this.columns.map(item => (
                                <el-table-column
                                    label={item.label}
                                    prop={item.prop}
                                    scopedSlots={{
                                        default: ({ row, $index }) => {
                                            if (item.render) {
                                                return item.render(
                                                    row[item.prop],
                                                    row,
                                                    $index
                                                );
                                            } else {
                                                return (
                                                    <span>
                                                        {item.formatter
                                                            ? item.formatter(
                                                                row[
                                                                    item.prop
                                                                ],
                                                                row,
                                                                $index
                                                            )
                                                            : row[item.prop]}
                                                    </span>
                                                );
                                            }
                                        }
                                    }}
                                />
                            ))}
                        </el-table>
                        <div class="btn-group">
                            <el-button
                                on-click={() => this.showEditDialog()}
                                size="mini"
                                type="primary"
                            >
                                新增模版
                            </el-button>
                        </div>
                    </div>
                    <div class="auto-block invoice-warp">
                        <HtTemInvoice
                            class="invoice-container"
                            show-sample
                            typeEmun={INVOICE_TYPE_EMUN}
                            temData={this.temData}
                            baseFiles={this.baseFiles}
                        />
                    </div>
                </div>
                <el-dialog
                    title="模版编辑器"
                    width="1200px"
                    visible={this.visible}
                    on-close={this.hideEditDialog}
                >
                    <ht-custom-invoice
                        style="height:65vh"
                        typeEmun={INVOICE_TYPE_EMUN}
                        temData={this.editTemData}
                        baseFiles={this.baseFiles}
                        on-template-change={this.handleTemChange}
                    />
                </el-dialog>
            </div>
        );
    }
};
</script>
<style lang="scss" scoped>
.container-card {
    background: #fff;
    margin-left: 5px;

    .ht-page-title {
        margin: 5px;
    }

    .tem-control {
        width: 325px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .tem-list {
            height: auto;
        }

        .btn-group {
            margin-bottom: 10px;
            text-align: center;
        }
    }
}

.invoice-warp {
    background-color: #000;
    padding: 20px;
}
</style>