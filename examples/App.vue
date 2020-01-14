<script>

import EditInvoice from "./components/edit-invoice";

export default {
    components: {
        EditInvoice
    },
    data() {
        return {
            aaa: console.log,
            test: "123"
        };
    },
    methods: {
        log() {
        }
    },
    render() {
        return (<edit-invoice />)
    }
};
</script>