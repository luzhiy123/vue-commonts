<script>
import { mapState } from "vuex";

import { dateFormat } from "hztl-ui/src/utils/date-util";
import priceUppercase from "hztl-ui/src/utils/priceUppercase";

export default {
    props: {
        showSample: Boolean,
        templateData: {
            type: Array,
            required: true
        }
    },
    computed: {
        ...mapState(["headerData"]),
        formatTemplateData() {
            return this.templateData.map(item => {
                const file = {
                    ...item
                };
                if (this.showSample) {
                    file.formatter = value => `[${value}]`;
                } else {
                    switch (file.type) {
                        case "date":
                            file.formatter = dateFormat;
                            break;
                        case "uppercase":
                            file.formatter = priceUppercase;
                            break;
                        case "areaNames":
                            file.formatter = value => value.join("");
                            break;
                        default:
                            file.formatter = value => value;
                    }
                }
                return file;
            });
        }
    },
    render() {
        return (
            <div class="ht-invoice-tem-header">
                <div class="ht-invoice-draggable-group">
                    {this.formatTemplateData.map(item => (
                        <div class={`list-group-item item-flex-${item.width}`}>
                            <div class="file-item file-name">{item.name}：</div>
                            <div
                                class={`file-item ${
                                    this.showSample
                                        ? "ht-invoice-sample-class"
                                        : ""
                                } text-ellipsis`}
                            >
                                {item.formatter(this.headerData[item.file])}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
</script>