<template>
        <div class="mi-dialog">
                <div class="mi-dialog-content">
                        <img :src="avatar" alt="" class="avatar">
                        <p v-text="message" class="message"></p>
                        <div class="btn">
                                <button @click="ok">确定</button>
                                <button @click="cancel" style="color: #676767">取消</button>
                        </div>
                </div>
        </div>
</template>

<script>
import avatar from './msg.png'

export default {
        name: 'MiConfirm',
        data(){
                return {
                        message: "",
                        resolve: null,
                        reject: null,
                        avatar
                }

        },
        methods: {
                ok(){
                        this.resolve();
                        this.$destroy(true);
                        document.body.removeChild(this.$el);
                },
                cancel(){
                        this.reject();
                        this.$destroy(true);
                        document.body.removeChild(this.$el);
                }
        }
}
</script>

<style lang="stylus" scoped>
.mi-dialog
        position fixed
        left 0
        top 0
        width: 100vw
        height: 100vh
        background-color rgba(0, 0, 0, 0.5)

        .mi-dialog-content
                position: absolute
                left 50%
                top 50%
                transform translate(-50%, -50%)
                min-width 70.826666%
                max-height 85%
                background-color #fff
                display flex
                flex-direction column
                justify-content: center
                align-items: center
                border-radius 2.333333vw

                img
                        width 40vw

                p
                        font-size 4vw

                .btn
                        display flex

                        button
                                width 35.413333vw
                                height 10vw
                                margin-top 5vw
                                color #ff6700
                                background-color: #fff;
                                border 1px solid rgba(0, 0, 0, 0.2)

</style>