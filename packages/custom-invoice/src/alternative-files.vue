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
                    {this.list.map(file => (
                        <div class="list-group-item">
                            <span>{file.name}：</span>
                            <span>[{file.disvalue}]</span>
                        </div>
                    ))}
                </Draggable>
            </div>
        );
    }
};
</script>
<style lang="scss">
@import "../../theme-chalk/src/var";

.ht-alternative-files {
    .list-group {
        min-height: 20px;
    }
}

</style>