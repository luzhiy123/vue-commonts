<script>
import HtInput from "hztl-ui/packages/input";
import { mapState, mapGetters, mapMutations } from "vuex";

import { AlternativeFiles } from "./components";

export default {
    computed: {
        ...mapState(["invoice"]),
        ...mapGetters(["altHeaderFiles", "altBodyFiles"]),
        disInvoiceName: {
            get() {
                return this.invoice.name;
            },
            set(value) {
                this.changeInvoiceName(value);
            }
        }
    },
    methods: {
        ...mapMutations(["changeInvoiceName"])
    },
    render() {
        return (
            <div class="ht-invoice-alternative flex-container column-flex">
                <div class="page-container">
                    <div class="page-title">模版名称</div>
                    <HtInput
                        class="form-value"
                        size="mini"
                        v-model={this.disInvoiceName}
                    />
                </div>
                <div class="page-title">
                    <span>打印内容</span>
                    <span class="color-gray">（拖拽到画布中）</span>
                </div>
                <div class="ht-invoice-alternative-box auto-block flex-container column-flex">
                    <div class="sub-title">&nbsp;·&nbsp;页头页尾独立字段</div>
                    <AlternativeFiles
                        group="header"
                        class="auto-block"
                        list={this.altHeaderFiles}
                    />
                </div>
                <div class="ht-invoice-alternative-box auto-block flex-container column-flex">
                    <div class="sub-title">&nbsp;·&nbsp;标题列数据</div>
                    <AlternativeFiles
                        class="auto-block"
                        group="body"
                        list={this.altBodyFiles}
                    />
                </div>
            </div>
        );
    }
};
</script>