<template>
        <div class="mi-dialog">
                <div class="mi-dialog-content">
                        <div class="a-login-alert">
                                <a href="">《小米商城用户协议》</a>
                                <a href="">《小米商城隐私政策》</a>
                                <a href="">《小米帐号用户协议》</a>
                                <a href="">《小米帐号隐私政策》</a>

                                <p class="message">
                                        请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件
                                </p>
                        </div>
                        <div class="btn-login-alert">
                                <button @click="cancel" style="color: #676767;">不同意</button>
                                <button @click="ok" style="color: #ff6700;">同意</button>
                        </div>
                </div>
        </div>
</template>

<script>

export default {
        name: 'MiLoginAlert',
        data(){
                return {
                        resolve: null,
                        reject: null,
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

                .a-login-alert
                        width 70.826666vw
                        height 23.333333vw
                        font-size 3.333333vw
                        padding 5.546666vw 9.706666vw
                        line-height 1.5em

                        a
                                color #ff6700
                                margin-right 1.3866666vw
                                font 500 3.333333vw / 1.5em '微软雅黑'

                        p.message
                                color #676767
                                font 500 3.333333vw / 1.5em '微软雅黑'

                .btn-login-alert
                        display flex

                        button
                                width 45.133333vw
                                height 12.746666vw
                                font-size 4.4444444vw
                                font-weight 500
                                border 0.3vw dashed #ff6700


</style>