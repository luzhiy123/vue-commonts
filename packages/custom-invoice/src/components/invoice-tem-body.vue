<script>
export default {
    props: {
        showSample: Boolean,
        data: Array,
        templateData: {
            type: Array,
            required: true
        },
    },
    computed: {
        useData() {
            let data;
            if (this.showSample) {
                data = [{}];
                const sampleData = data[0];
                this.templateData.forEach(item => {
                    if (item.file) {
                        sampleData[item.file] = item.disValue;
                    }
                });
            } else {
                data = this.printData;
            }
            return data;
        },
        columns() {
            return this.templateData.map(item => {
                let formatter;
                if (this.showSample) {
                    formatter = value => `[${value}]`;
                } else {
                    switch (item.type) {
                        case "index":
                            formatter = (value, row, index) => index + 1;
                            break;
                        case "date":
                            formatter = (value, row, index) => index;
                            break;
                    }
                }
                return {
                    ...item,
                    formatter
                };
            });
        }
    },
    render() {
        return (
            <div class="ht-invoice-tem-body">
                <el-table
                    data={this.useData}
                    border
                    row-class-name={this.showSample ? "ht-invoice-sample-class" : ""}
                    tooltip-effect="dark"
                    size="mini"
                >
                    {this.columns.map(item => (
                        <el-table-column
                            key={item.key || item.prop}
                            label={item.name}
                            prop={item.file}
                            width={item.width}
                            align={item.align}
                            show-overflow-tooltip
                            scopedSlots={{
                                default: ({ row, $index }) => {
                                    return item.formatter
                                        ? item.formatter(
                                            row[item.file],
                                            row,
                                            $index
                                        )
                                        : row[item.file];
                                }
                            }}
                        ></el-table-column>
                    ))}
                </el-table>
            </div>
        );
    }
};
</script>