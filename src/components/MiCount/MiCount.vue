<template>
        <div class="mi-count">
                <button @click="decreaseHander" :disabled="count === 1">-</button>
                <span v-text="count"></span>
                <button @click="increaseHander" :disabled="count === 5">+</button>
        </div>
</template>

<script>

export default {
        name: "MiCount",
        props: {
                count: {
                        type: Number,
                        required: true
                },
                maxCount: {
                        type: Number,
                        default: 5
                }
        },
        model: {
                props: "count",
                event: "change",
        },
        methods: {
                decreaseHander(){
                        this.$emit("decrease");
                        this.$emit("change", this.count - 1);
                        this.$emit("update:count", this.count - 1);
                },
                increaseHander(){
                        this.$emit("increase");
                        this.$emit("change", this.count + 1);
                        this.$emit("update:count", this.count + 1);
                },
        }

};
</script>

<style lang="stylus" scoped>
.mi-count
        display flex
        align-items center

        button
                width 8vw
                height 8vw
                font-size 8vw
                line-height 8vw
                color #707070
                background-color: #F4F4F4
                border 0

        span
                width 8vw
                height 8vw
                font-size 5vw
                text-align center
                border 1px solid #F4F4F4

</style>