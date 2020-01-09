<script>


export default {
    props: {
        headerFiles: {
            type: Array,
            required: true
        },
        bodyFiles: {
            type: Array,
            required: true
        },
    },

    data() {
        return {};
    },
    render() {
        return (
            <div>
                <div>
                    打印内容
                    <span>（拖拽到画布中）</span>
                </div>
                <div>
                    <div>页头页尾独立字段</div>
                    <div>字段区域</div>
                </div>
                <div>
                    <div>标题列数据</div>
                    <div>字段区域</div>
                </div>
            </div>
        )
    }
};
</script>
