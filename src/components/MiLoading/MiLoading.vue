<template>
        <div class="mi-loading">
                <img :src="loading" alt="">
        </div>
</template>

<script>
import loading from './loading.gif';

export default {
        name: 'MiLoading',
        data(){
                return {
                        loading
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
.mi-loading
        position fixed
        top 0
        right: 0
        width 100%
        height: 100%
        background-color rgba(0, 0, 0, 0.3)

        img
                position absolute
                left 0
                right 0
                bottom 0
                top 0
                margin auto

</style>