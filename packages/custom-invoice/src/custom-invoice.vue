
<script>

import HeaderAlternative from "./header-alternative";

export default {
    name: "HtCustomInvoice",
    componentName: "HtCustomInvoice",
    components: {
        HeaderAlternative
    },

    props: {
        name: {
            type: String,
            required: true,
        },
        headerFiles: {
            type: Array,
            required: true
        },
        bodyFiles: {
            type: Array,
            required: true
        },
        invoiceData: {
            type: JSON,
        }
    },

    data() {
        return {
        };
    },
    render() {
        return (<div>asad</div>)
    }
};
</script>