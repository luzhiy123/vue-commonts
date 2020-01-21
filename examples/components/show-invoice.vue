<script>
import {
    INVOICE_TYPE_EMUN,
    BASE_FILES_LIST,
} from "./constants";

import aData from "./a.json";

export default {
    props: {
        type: {
            type: String,
            default: "orderPlan"
        },
        temsList: {
            type: Array
        }
    },
    data() {
        return {
            loading: false,
            selectedRow: null,
            baseFiles: {}
        };
    },
    computed: {
        temData() {
            if (!this.selectedRow || !this.temsList.length) {
                return {
                    type: this.type
                };
            }
            const curSelected = this.temsList.find(
                item => item.id === this.selectedRow.id
            );
            return {
                ...curSelected
            };
        }
    },
    watch: {
        type: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.getBaseFiles(newVal);
                    this.setSelectedRowTem();
                }
            }
        },
        temsList() {
            this.setSelectedRowTem()
        }
    },
    methods: {
        getBaseFiles(type) {
            this.baseFiles =
                BASE_FILES_LIST.find(item => item.type == type) || {};
        },
        setSelectedRowTem() {
            // 设置默认选中项，默认从上次的选项中判断id，如果无，则选中默认项
            if (this.selectedRow) {
                this.selectedRow = this.temsList.find(
                    item => item.id === this.selectedRow.id
                );
            }
            if (!this.selectedRow) {
                this.selectedRow = this.temsList.find(item => item.isDefault);
            }
        },
        handlerSelectedChange(data) {
            this.selectedRow = data;
        }
    },
    render() {
        return (
            <div class="container-card flex-container column-flex">
                <div class="flex-container auto-block">
                    <div class="auto-block invoice-warp">
                        <HtTemInvoice
                            class="invoice-container"
                            invoiceData={aData}
                            typeEmun={INVOICE_TYPE_EMUN}
                            temData={this.temData}
                            baseFiles={this.baseFiles}
                        />
                    </div>
                    <div class="tem-control" v-loading={this.loading}>
                        <div class="tem-list-box">
                            <div class="title">选择打印模板</div>
                            <ul class="tem-list">
                                {this.temsList.map(item => (
                                    <li
                                        class={
                                            this.selectedRow === item
                                                ? "active"
                                                : ""
                                        }
                                        on-click={() =>
                                            this.handlerSelectedChange(item)
                                        }
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div class="btn-group">
                            <el-button
                                on-click={window.print}
                                size="mini"
                                type="primary"
                            >
                                打印（f11）
                            </el-button>
                            <el-button
                                on-click={window.close}
                                size="mini"
                                type="primary"
                            >
                                退出（Esc）
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
</script>
<style lang="scss" scoped>
@media print {
    @page {
        size: 217mm;
        size: portrait;
        margin: 0;
    }

    .tem-control {
        display: none !important;
    }
}

.container-card {
    background: #fff;
    margin-left: 5px;

    .ht-page-title {
        margin: 5px;
    }
}

.invoice-warp {
    background-color: #e8ebee;
    padding: 20px;
}

.tem-control {
    flex: none;
    flex-direction: column;
    justify-content: space-between;
    width: 325px;
    display: flex;
    padding: 10px;
    background-color: #fff;

    .tem-list {
        border: 1px solid red;
        padding: 0;

        li {
            cursor: pointer;
            padding: 0 5px;
        }

        .active {
            background: blue;
            color: #fff;
        }
    }

    .btn-group {
        margin-bottom: 10px;
        text-align: center;
    }
}
</style>