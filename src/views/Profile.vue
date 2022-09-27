<template>
        <div class="profile">
                <div class="header">
                        <div class="header-img">
                                <img src="../assect/images/profile/header.png" alt="">
                        </div>
                        <div class="user-name" v-if="isLogin">
                                <span v-text="logName"></span>
                                <span @click="logout" style="margin-left: 40vw;">退出登录</span>
                        </div>

                        <router-link to="/login" v-else>
                                <span style="text-decoration: underline; padding: 1vw 0;">请登录</span>
                        </router-link>

                </div>
                <div class="content">
                        <div class="order">
                                <span>我的订单</span>
                                <router-link to="/order">
                                        <span>全部订单</span>
                                        <i> > </i>
                                </router-link>
                        </div>
                        <div class="order-wrapper">
                                <div class="order1">
                                        <img src="../assect/images/profile/1.png" alt="">
                                        <span>待付款</span>
                                </div>
                                <div class="order1">
                                        <img src="../assect/images/profile/2.png" alt="">
                                        <span>待收货</span>
                                </div>
                                <div class="order1">
                                        <img src="../assect/images/profile/3.png" alt="">
                                        <span>退换修</span>
                                </div>
                        </div>
                        <div class="ul-li-div">
                                <ul>
                                        <li>
                                                <div class="img-span-i">
                                                        <div class="img-span1">
                                                                <img src="../assect/images/profile/4.png" alt="">
                                                                <span>会员中心</span>
                                                        </div>
                                                        <i class="img-span1-i"> > </i>
                                                </div>
                                        </li>
                                        <li>
                                                <div class="img-span-i">
                                                        <div class="img-span2">
                                                                <img src="../assect/images/profile/5.png" alt="">
                                                                <span>我的优惠</span>
                                                        </div>
                                                        <i class="img-span2-i"> > </i>
                                                </div>
                                        </li>
                                </ul>
                        </div>
                        <div class="ul-li-div">
                                <ul>
                                        <li>
                                                <div class="img-span-i">
                                                        <div class="img-span1">
                                                                <img src="../assect/images/profile/6.png" alt="">
                                                                <span>服务中心</span>
                                                        </div>
                                                        <i class="img-span1-i"> > </i>
                                                </div>
                                        </li>
                                        <li>
                                                <div class="img-span-i">
                                                        <div class="img-span2">
                                                                <img src="../assect/images/profile/7.png" alt="">
                                                                <span>小米之家</span>
                                                        </div>
                                                        <i class="img-span2-i"> > </i>
                                                </div>
                                        </li>
                                </ul>
                        </div>
                        <div class="ul-li-div">
                                <ul>
                                        <li>
                                                <router-link to="/address">
                                                        <div class="img-span-i">
                                                                <div class="img-span1">
                                                                        <img src="../assect/images/profile/8.png"
                                                                                alt="">
                                                                        <span>我的地址</span>
                                                                </div>

                                                                <i class="img-span1-i"> > </i>

                                                        </div>
                                                </router-link>
                                        </li>
                                        <li>
                                                <div class="img-span-i">
                                                        <div class="img-span2">
                                                                <img src="../assect/images/profile/9.png" alt="">
                                                                <span>礼物码兑换</span>
                                                        </div>
                                                        <i class="img-span2-i"> > </i>
                                                </div>
                                        </li>
                                </ul>
                        </div>
                        <div class="set-up">
                                <div class="img-span">
                                        <img src="../assect/images/profile/10.png" alt="">
                                        <span>设置</span>
                                </div>
                                <i> > </i>
                        </div>
                </div>
                <div class="foot">
                        <MiTabBar></MiTabBar>
                </div>

        </div>
</template>

<script>
//导入
import MiTabBar from '../components/MiTabBar/MiTabBar.vue';

export default {
        name: "Profile",
        data() {
                return {
                        name: null,
                        isLogin: true
                }
        },
        computed: {
                // isLogin() {
                //         return !sessionStorage.getItem('name')
                // },
                logName() {
                        return sessionStorage.getItem('name')
                },
                logstatus() {
                        return sessionStorage.getItem('token') === null
                }
        },

        //注册
        components: {
                MiTabBar: MiTabBar
        },
        methods: {
                async logout() {
                        try {
                                await this.$miConfirm('确定退出登录吗？')
                                window.sessionStorage.clear();
                                this.isLogin = false
                        } catch (e) { }

                },

        },
        // watch:{
        //         name(n,o){
        //                 console.log(n);
        //                 console.log(o);
        //         }
        // }

};
</script>

<style lang="stylus" scoped>
.profile
        display flex
        flex-direction column
        width 100vw
        height 100vh

        .header
                flex-shrink 0
                width 100vw
                height 13.333333vw
                background-image: url(../assect/images/profile/bgc.png)
                background-size: auto 100%;
                background-color: #f37d0f
                padding 4.5vw 0
                display flex
                align-items center

                .header-img
                        width 13.733333vw
                        height 13.7333333vw
                        overflow: hidden
                        box-sizing: border-box
                        margin-left 4.4416vw
                        margin-right 2.2vw
                        border-radius: 100%
                        border: 3px solid hsla(0, 0%, 100%, .4)
                        text-align: center

                        img
                                width 11.733333vw
                 

                span
                        color #fff


        .content
                flex-grow 1
                width 100vw
                overflow auto
                background-color: #f5f5f5

                .order
                        display flex
                        justify-content space-between
                        align-items center
                        height 10.666666vw
                        width 91vw
                        padding 0 4.5vw
                        border-bottom: 1px solid rgba(0, 0, 0, .15);
                        background-color: #fff

                        span
                                font-size 4vw

                        a
                                display flex
                                align-items center

                                span
                                        font-size 3.2vw
                                        margin-right 3vw

                                i
                                        display flex
                                        flex-direction row
                                        justify-content center
                                        align-items center
                                        font-style normal
                                        font-size 5vw

                .order-wrapper
                        display flex
                        height 23.674667vw
                        width 77.777777vw
                        padding 0 11.111111vw
                        justify-content space-between
                        align-items center
                        background-color: #fff
                        margin-bottom 2.5vw

                        .order1
                                display flex
                                flex-direction column
                                align-items center

                                img
                                        width 6.7vw

                                span
                                        font-size 3vw
                                        margin-top 2vw

                .ul-li-div
                        margin-bottom 2.5vw
                        background-color: #fff


                        ul

                                li
                                        display flex
                                        height 14.4416vw
                                        flex-direction column

                                        .img-span-i
                                                width 91vw
                                                padding 0 4.5vw
                                                height 14.4416vw
                                                display flex
                                                justify-content space-between
                                                align-items center


                                                .img-span1
                                                        display flex
                                                        align-items center
                                                        flex-grow 1


                                                        img
                                                                width 7vw
                                                                border-bottom 1px solid white

                                                        span
                                                                height 14.4416vw
                                                                font-size 4vw
                                                                margin-left 4vw
                                                                line-height 14.4416vw
                                                                box-sizing border-box
                                                                border-bottom: 1px solid rgba(0, 0, 0, .15)
                                                                flex-grow 1

                                                .img-span1-i
                                                        display flex
                                                        flex-direction row
                                                        justify-content center
                                                        align-items center
                                                        font-style normal
                                                        font-size 5vw
                                                        height 14.4416vw
                                                        border-bottom: 1px solid rgba(0, 0, 0, .15)

                                                .img-span2
                                                        display flex
                                                        align-items center

                                                        img
                                                                width 7vw

                                                        span
                                                                height 14.4416vw
                                                                font-size 4vw
                                                                margin-left 4vw
                                                                line-height 14.4416vw

                                                .img-span2-i
                                                        display flex
                                                        flex-direction row
                                                        justify-content center
                                                        align-items center
                                                        font-style normal
                                                        font-size 5vw
                                                        height 14.4416vw

        .set-up
                width 91vw
                padding 0 4.5vw
                height 14.4416vw
                display flex
                justify-content space-between
                align-items center
                background-color: #fff

                .img-span
                        display flex
                        align-items center

                        img
                                width 7vw

                        span
                                height 14.4416vw
                                font-size 4vw
                                margin-left 4vw
                                line-height 14.4416vw

                i
                        display flex
                        flex-direction row
                        justify-content center
                        align-items center
                        font-style normal
                        font-size 5vw
                        height 14.4416vw


        .foot
                flex-shrink 0
                width 100vw

</style>