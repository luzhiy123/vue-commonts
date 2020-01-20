
<script>
import { dateFormatFull } from "hztl-ui/src/utils/date-util";
import { mapState } from "vuex";

export default {
    props: {
        showSample: Boolean,
        header: Object
    },
    data() {
        return {
            curDate: new Date()
        };
    },
    computed: {
        ...mapState(["invoice", "typeEmun"])
    },
    render() {
        return (
            <div class="ht-invoice-page-header">
                {this.showSample ? (
                    <div class="company-logo ht-invoice-sample-class">
                        [公司徽章]
                    </div>
                ) : (
                    <img src={this.header.companyEmblem} alt="" />
                )}
                <span class="page-header-tip">
                    <span class="title">打印时间：</span>
                    <span
                        class={`${
                            this.showSample ? "ht-invoice-sample-class" : ""
                        }`}
                    >
                        {dateFormatFull(this.curDate)}（
                        {this.showSample ? 0 : this.header.printCount})
                    </span>
                </span>
                <div
                    class={`page-header-title ${
                        this.showSample ? "ht-invoice-sample-class" : ""
                    }`}
                >
                    {this.showSample ? "[公司名称]" : this.header.companyName}
                    {this.typeEmun[this.invoice.type]}
                </div>
            </div>
        );
    }
};
</script>