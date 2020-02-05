<script>
import Draggable from "vuedraggable";
export default {
    components: {
        Draggable
    },
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    methods: {
        changeHandle() {
            this.$emit("change", this.list)
        }
    },
    render() {
        return (
            <div class="ht-alternative-files">
                <Draggable
                    class="ht-invoice-draggable-group"
                    attrs={this.$attrs}
                    on-change={() => this.changeHandle()}
                    list={this.list}
                >
                    {
                        this.$scopedSlots.default ? this.$scopedSlots.default(this.list) :this.list.map(file => (
                            <div class="list-group-item">
                                <div class="file-item file-name text-ellipsis">{file.name}：</div>
                                <div class="file-item ht-invoice-sample-class text-ellipsis">
                                [{file.sampleData || file.name}]
                                </div>
                            </div>
                        ))
                    }
                </Draggable>
            </div>
        );
    }
};
</script>