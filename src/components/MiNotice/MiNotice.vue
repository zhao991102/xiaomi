<template>
        <div>
                <p class="mi-notice" v-text="message"></p>
        </div>
</template>

<script>
export default {
        name: "MiNotice",
        data(){
                return {
                        message: ""
                };
        },
        mounted(){
                setTimeout(() => {
                        this.$destroy(true);
                        document.body.removeChild(this.$el);
                }, 1500);
        }
};
</script>

<style lang="stylus" scoped>
.mi-notice
        position: fixed
        left: 50%
        top: 10%
        transform: translateX(-50%)
        min-width: 60%
        max-width: 85%
        padding: 10px
        color: #ff6700
        box-shadow: 0 0 50px 0px #ff6700 inset
        text-align: center
        font-weight bolder
        border-radius 10px
        font-size 14px
        z-index 1000000
        background-color #fff
</style>