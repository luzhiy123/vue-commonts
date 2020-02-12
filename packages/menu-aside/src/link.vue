
<template>
    <component v-bind="linkProps(to)">
        <slot />
    </component>
</template>

<script>
import { isExternal } from "hztl-ui/src/utils/validate";

export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    methods: {
        linkProps(url) {
            if (isExternal(url)) {
                return {
                    is: "a",
                    href: url,
                    class: "link",
                    target: "_blank",
                    rel: "noopener"
                }
            }
            return {
                is: "router-link",
                class: "link",
                to: url
            }
        }
    }
}
</script>
