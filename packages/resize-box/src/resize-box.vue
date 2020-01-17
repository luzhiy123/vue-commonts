<script>
export default {
    name: "HtResizeBox",
    componentName: "HtResizeBox",
    props: {
        minWidth: {
            type: Number,
            default: 40
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        }
    },
    computed: {
        resizeBoxRef() {
            return this.$refs.resizeBox;
        },
        rightResizeSliderRef() {
            return this.$refs.rightResizeSlider;
        }
    },
    mounted() {
        this.initRightListen();
    },
    methods: {
        initRightListen() {
            const rightResizeSliderRef = this.rightResizeSliderRef;
            const resizeBoxRef = this.resizeBoxRef;

            rightResizeSliderRef.onmousedown = e => {
                const startX = e.clientX;
                const beforeWidth = resizeBoxRef.offsetWidth;
                document.onmousemove = e => {
                    const width = e.clientX - startX + beforeWidth;
                    if (width > this.minWidth) {
                        this.$emit(
                            "change-width",
                            e.clientX - startX + beforeWidth
                        );
                    }
                };
                document.onmouseup = () => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    rightResizeSliderRef.releaseCapture &&
                        rightResizeSliderRef.releaseCapture();
                };
                rightResizeSliderRef.setCapture &&
                    rightResizeSliderRef.setCapture();
            };
        }
    },
    render() {
        return (
            <div class="ht-resize-box">
                <div ref="resizeBox" class="resize-handle">
                    {this.$slots.default}
                </div>
                <div class="right-resize-slider" ref="rightResizeSlider"></div>
            </div>
        );
    }
};
</script>