<template>
        <div class="address-edit">
                <div class="header">
                        <router-link to="/address">
                                <i class="iconfont icon-back" @click="changeEdit"></i>
                        </router-link>
                        <span>编辑地址</span>
                        <i></i>
                </div>
                <div class="content">
                        <div>
                                <span>收货人:</span><input type="text" placeholder="真实姓名"
                                        v-model.trim.lazy="address.receiveName">
                        </div>
                        <div>
                                <span>手机号码:</span> <input type="text" placeholder="手机号"
                                        v-model.trim.lazy="address.receivePhone">
                        </div>
                        <div>
                                <span>所在地区:</span><input type="text" placeholder="省 市 区 街道信息"
                                        v-model.trim.lazy="address.receiveRegion">
                        </div>
                        <div>
                                <span>详细地址:</span><input type="text" placeholder="详细地址"
                                        v-model.trim.lazy="address.receiveDetail">
                        </div>
                </div>
                <div class="foot">
                        <button @click="save">保存</button>
                </div>
        </div>

</template>

<script>
export default {
        name: "AddressEdit",
        props: ["model"],
        data() {
                return {
                        address: {
                                receiveName: this.model.receiveName,
                                receivePhone: this.model.receivePhone,
                                receiveRegion: this.model.receiveRegion,
                                receiveDetail: this.model.receiveDetail,
                        }
                }
        },
        methods: {
                save() {
                        //通知父组件Address.vue要保存了
                        this.$emit('endEdit', ({ ...this.address }));
                },
                changeEdit() {
                        this.$emit('rocket')
                }
                // close(){
                //         this.$emit('closeW', this.path = !this.path)
                // }
        },

};
</script>

<style lang="stylus" scoped>
.address-edit
        position fixed
        left 0
        top 0
        display flex
        flex-direction column
        width 100vw
        height 100vh
        background-color: #fff;

        .header
                flex-shrink 0
                width 100vw
                height 13.333333vw
                display flex
                align-items center
                justify-content space-between

                i
                        display: flex
                        width: 46px
                        height 30px
                        justify-content: center
                        font-size 30px
                        font-weight: bolder

                        span
                                font-size 4.16vw

                a
                        i
                                display: flex
                                width: 46px
                                height 30px
                                justify-content: center
                                font-size 30px
                                font-weight: bolder

        .content
                flex-grow 1

                div
                        padding 2.77778vw 4.166666vw
                        height 9.461067vw
                        display flex
                        align-items center
                        border-bottom 0.3vw solid #f6f6f6

                        span
                                font-size 4vw
                                color rgba(0, 0, 0, 0.8)

                        input
                                width 64vw
                                height 4.466666vw
                                padding 2.5vw 4vw
                                border 0
                                font-size 16px

        .foot
                width 100vw
                flex-shrink 0
                display flex
                justify-content center
                padding 1.5vw 0

                button
                        width 90vw
                        background-color: #ff6700
                        height 10vw
                        border 0
                        border-radius 7vw
                        color #ffffff
                        font-weight bold
                        font-size 4.16vw
</style>