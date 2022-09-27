<template>
        <div class="mi-modal-dialog">
                <div class="content">
                        <div>
                                <slot name="title"></slot>
                        </div>
                        <div>
                                <slot></slot>
                        </div>
                        <div>
                                <slot name="foot"></slot>
                        </div>
                </div>
        </div>
</template>

<script>

export default {
        name: "MiModelDialogVue",
}
</script>

<style lang="stylus" scoped>
.mi-modal-dialog
        position fixed
        left 0
        top 0
        width: 100vw
        height: 100vh
        background-color rgba(0, 0, 0, 0.5)

        .content
                position: absolute
                left 50%
                top 50%
                transform translate(-50%, -50%)
                min-width 65%
                max-height 85%
                background-color #fff
                display flex
                flex-direction column
                justify-content: center
                align-items: center
</style>