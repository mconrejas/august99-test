<template>
    <input type="text" v-model="val" @input="$emit('input', val)">
</template>

<script>
export default {
    props: {
        value: {
            type: String|Number,
            default: null
        }
    },

    data() {
        return {
            val: this.value
        }
    }
}
</script>