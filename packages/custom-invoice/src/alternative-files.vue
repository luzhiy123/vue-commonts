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
    methods: {},
    render() {
        return (
            <div class="ht-alternative-files">
                <Draggable
                    class="list-group"
                    attrs={this.$attrs}
                    on={this.$listeners}
                    list={this.list}
                >
                    {
                        this.$scopedSlots.default ? this.$scopedSlots.default(this.list) :this.list.map(file => (
                            <div class="list-group-item">
                                <div class="file-item file-name text-ellipsis">{file.name}：</div>
                                <div class="file-item file-value text-ellipsis">
                                [{file.disvalue}]
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