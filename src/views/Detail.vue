<template>
        <div v-if="model !== null">
                <div ref="scroll" class="scroll">
                        <ul ref="scrollContent">
                                <li><img :src="bannerImgs[bannerImgs.length - 1]" alt=""></li>
                                <li v-for="item in bannerImgs">
                                        <img :src="item" alt="">
                                </li>
                                <li><img :src="bannerImgs[0]" alt=""></li>
                        </ul>
                        <div class="indicator">
                                <span v-text="currentPage"></span>/<span v-text="bannerImgs.length"></span>
                        </div>
                        <span @click="goPrev"
                                style="z-index: 999999;position: fixed; left: 0; top: 0;;width: 10vw ; height: 10vw; ">
                                <i class="iconfont icon-back"></i>
                        </span>
                </div>
                <div class="content">
                        <div class="span-img-h4-p">
                                <div class="￥-span">
                                        ￥<span v-text="this.model.price"></span>
                                </div>
                                <img src="../assect/images/juan.png" alt="">
                                <h4 v-text="this.model.name"></h4>
                                <p v-text="this.model.brief"></p>
                        </div>
                        <div class="span-p-name">
                                <div class="span-name">
                                        <span>已选</span>
                                        <p v-text="this.model.name"></p>
                                </div>
                                <i> > </i>
                        </div>
                        <div class="span-p-address">
                                <div class="span-p">
                                        <span>送至</span>
                                        <p>北京市 东城区</p>
                                </div>
                                <i> > </i>
                        </div>
                        <div class="user-rate">
                                <h6>用户评价</h6>
                                <div class="span-i">
                                        <span>好评率99.8%</span>
                                        <i> > </i>
                                </div>
                        </div>
                        <div class="ul-li-span">
                                <ul>
                                        <li>
                                                <span>外观漂亮</span>
                                        </li>
                                        <li>
                                                <span>稳定运行</span>
                                        </li>
                                        <li>
                                                <span>屏幕清晰</span>
                                        </li>
                                        <li>
                                                <span>价格实惠</span>
                                        </li>
                                        <li>
                                                <span>服务一流</span>
                                        </li>
                                        <li>
                                                <span>尺寸适宜</span>
                                        </li>
                                </ul>
                        </div>
                        <div class="shop-brief">
                                <span style="color: #ff6700">商品介绍</span>
                                <span>规格参数</span>
                                <span>安装服务</span>
                        </div>
                        <div class="img">
                                <img src="../assect/images/detail/1.jpeg" alt="">
                                <img src="../assect/images/detail/2.jpg" alt="">
                                <img src="../assect/images/detail/3.jpg" alt="">
                                <img src="../assect/images/detail/4.jpg" alt="">
                                <img src="../assect/images/detail/5.jpg" alt="">
                                <img src="../assect/images/detail/6.jpg" alt="">
                                <img src="../assect/images/detail/7.jpg" alt="">
                                <img src="../assect/images/detail/8.jpg" alt="">
                                <img src="../assect/images/detail/9.jpg" alt="">
                                <img src="../assect/images/detail/10.jpg" alt="" style="margin-bottom: 13.333333vw">
                        </div>
                </div>
                <div class="foot">
                        <div class="foot-img">
                                <div class="cart-all">
                                        <router-link to="/cart">
                                                <img src="../assect/images/detail/foot.png" alt="">
                                                <span v-text="allCartCount"></span>
                                        </router-link>

                                </div>
                                <div class="img-foot2">
                                        <img src="../assect/images/detail/foot2.png" alt="">
                                </div>
                        </div>
                        <button @click="show = true" class="btn">加入购物车</button>
                </div>
                <div v-show="show" class="dialog-wrapper" @click.self="show = false">
                        <transition name="v">
                                <div v-show="show" class="dialog">
                                        <div class="header-hidden">
                                                <img :src="bannerImgs[0]" alt="">
                                                <div class="span-price">
                                                        <div> ￥<span v-text="model.price"></span></div>
                                                        <span>已选</span>
                                                        <p v-text="model.brief"></p>
                                                </div>
                                        </div>
                                        <div class="content-hidden">
                                                <div class="span-color">
                                                        <span>颜色</span>
                                                        <div class="color">
                                                                <span v-if="show1 = true">赤</span>
                                                                <span>橙</span>
                                                                <span>黄</span>
                                                                <span>绿</span>
                                                                <span>青</span>
                                                                <span>蓝</span>
                                                                <span>紫</span>
                                                        </div>
                                                </div>
                                                <div class="span-count">
                                                        <span>购买数量</span>
                                                        <MiCount :count="addCart.count" @decrease="addCart.count--"
                                                                @increase="addCart.count++"></MiCount>
                                                </div>
                                        </div>
                                        <div class="foot-hidden">
                                                <button @click="goAddCart">确定</button>
                                        </div>
                                </div>
                        </transition>
                </div>
        </div>
</template>

<script>
import IScroll from 'iscroll';
import { ProductAPI, CartAPI } from "@/api";
import { MiCount } from '@/components'

export default {
        name: "Detail",
        components: {
                MiCount,
        },
        data() {
                return {
                        isLogin: !!sessionStorage.getItem('token'),
                        model: null,
                        currentPage: 0,
                        show: false,
                        addCart: {
                                pid: 0,
                                count: 1
                        },
                        allCartCount: null
                }
        },
        computed: {
                bannerImgs() {
                        return this.model ? this.model.bannerImgs.split(',') : [];
                },

        },
        async created() {
                try {
                        let id = parseInt(this.$route.params.id)
                        this.model = await ProductAPI.getModel(id)
                        if (sessionStorage.length > 0) this.allCartCount = await CartAPI.totalCart()
                        this.addCart.pid = this.model.id
                        this.$nextTick(() => {
                                this.$refs.scrollContent.style.width = `${this.bannerImgs.length + 2}00vw`;
                                this.scroll = new IScroll(this.$refs.scroll, {
                                        momentum: false,
                                        scrollY: false,
                                        scrollX: true,
                                        snap: true
                                });
                                this.scroll.on("scrollEnd", () => {
                                        if (this.scroll.currentPage.pageX === this.bannerImgs.length + 1) {
                                                this.scroll.goToPage(1, 0, 0);
                                                this.currentPage = 1;
                                        }
                                        if (this.scroll.currentPage.pageX === 0) {
                                                this.scroll.goToPage(this.bannerImgs.length, 0, 0);
                                                this.currentPage = this.bannerImgs.length;
                                                return;
                                        }
                                        this.currentPage = this.scroll.currentPage.pageX;
                                });
                                this.scroll.goToPage(1, 0, 0);
                                this.currentPage = 1;
                        });
                } catch (e) {
                        console.log(e);
                }

        },
        methods: {
                async goAddCart() {
                        this.show = false
                        if (this.isLogin) {
                                await CartAPI.addCart(this.addCart)
                                this.$miNotice('添加成功')
                        } else {
                                this.$miLoginAlert()
                                        .then(() => this.$router.push('/login'))
                        }

                        // if (sessionStorage.length > 0) this.allCartCount = await CartAPI.totalCart()
                },
                goPrev() {
                        this.$router.go(-1)
                },
        }
}
</script>

<style lang="stylus" scoped>
.dialog-wrapper
        position: fixed
        left 0
        top 0
        width 100vw
        height 100vh
        background-color: rgba(0, 0, 0, 0.5)

        .dialog
                position absolute
                left 0
                bottom 0
                width 91.111467vw
                height 70%
                background-color: #fff;
                border-radius 10px 10px 0 0
                display flex
                flex-direction column
                padding 0 4.444533vw

                &.v-enter
                        transform translateY(100%)

                &.v-enter-active
                        transition all 0.4s

                &.v-enter-active-to
                        transform: translateY(0)

                .header-hidden
                        flex-shrink 0
                        width 91.111467vw
                        display flex
                        align-items center
                        height 23.186133vw
                        padding 5vw 0

                        img
                                width 19.584vw
                                height 19.584vw

                        .span-price
                                font-size 5vw
                                color #ff5934
                                font-weight 600
                                display flex
                                flex-direction column
                                margin-left 4vw

                                div
                                        margin-bottom 3vw

                                        span
                                                font-size 5vw
                                                color #ff5934
                                                font-weight 600

                                p
                                        font-size 3.2vw
                                        color #000
                                        font-weight 400
                                        width 60vw

                .content-hidden
                        flex-grow 1
                        width 91.111467vw

                        .span-color
                                display flex
                                flex-direction column

                                span
                                        font-size 3.4vw
                                        font-weight 600
                                        margin-top 6vw
                                        margin-bottom 4vw

                                .color
                                        display flex
                                        justify-content space-between
                                        align-items center

                                        span
                                                font-size 3vw
                                                font-weight 400
                                                width 10vw
                                                text-align center
                                                margin-top 0
                                                background-color: rgba(0, 0, 0, 0.04)
                                                border-radius 2vw

                        .span-count
                                display flex
                                align-items center
                                justify-content space-between
                                margin-top 3vw

                                span
                                        font-size 3.4vw
                                        font-weight 600

                .foot-hidden
                        flex-shrink 0
                        width 91.111467vw
                        height 13.333333vw
                        display flex
                        align-items center

                        button
                                height 10vw
                                width 91.111467vw
                                background-color: #ff5934
                                border 0
                                border-radius 5vw
                                color #fff


.scroll
        overflow hidden
        touch-action: pan-x
        position relative

        .indicator
                position absolute
                right: 10px
                bottom 10px
                background-color: rgba(0, 0, 0, 0.3)
                width 28px
                height 22px
                display flex
                justify-content center
                align-items center
                font-size 12px
                border-radius 11px
                color white

        ul
                display flex

                li
                        width 100vw
                        height 100vw
                        flex-shrink 0

                        img
                                width 100%
                                height 100%
        span
                i
                        position absolute
                        left 0
                        top: 0
                        display: flex
                        width: 10vw
                        height 10vw
                        justify-content: center
                        font-size 30px
                        font-weight: bolder


.content
        display flex
        flex-direction column
        width 100vw

        .span-img-h4-p
                display flex
                flex-direction column
                width 91.110933vw
                padding 0 4.444533vw

                .￥-span
                        color #ff6700

                        span
                                font-size 7vw
                                font-weight 600

        .span-p-name
                display flex
                justify-content space-between
                width 91.110933vw
                padding 0 4.444533vw

                .span-name
                        display flex

                        span
                                font-size 3.4vw
                                color #000

                        p
                                font-size 3.4vw
                                color #000
                                margin-left 10vw

                i
                        display flex
                        justify-content center
                        align-items center
                        font-style normal
                        color #b0b0b0
                        font-size 5vw

        .span-p-address
                display flex
                justify-content space-between
                width 91.110933vw
                padding 0 4.444533vw

                .span-p
                        display flex

                        span
                                font-size 3.4vw
                                color #000

                        p
                                font-size 3.4vw
                                color #000
                                margin-left 10vw

                i
                        display flex
                        justify-content center
                        align-items center
                        font-style normal
                        color #b0b0b0
                        font-size 5vw

        .user-rate
                display flex
                justify-content space-between
                align-items center
                height 10vw
                width 91.110933vw
                padding 0 4.444533vw

                h6
                        font-size 4vw

                .span-i
                        display flex
                        align-items center

                        span
                                font-size 3.4vw
                                color #000

                        i
                                display flex
                                justify-content center
                                align-items center
                                font-style normal
                                color #b0b0b0
                                font-size 5vw

        .ul-li-span
                width 91.110933vw
                padding 0 4.444533vw

                ul
                        display flex
                        flex-wrap wrap

                        li
                                padding 1.5vw 2 .5vw
                                margin-right: 2.8vw
                                margin-bottom: 2.8vw
                                background-color: #ffeeea
                                width 17vw
                                text-align center
                                border-radius 3vw


                                span
                                        font-size 3.2vw
                                        color #494a4b

        .shop-brief
                display flex
                height 10vw
                width 100vw
                justify-content space-between
                align-items center

                span
                        width 33%
                        text-align center
                        font-size 3.2vw

        .img
                display flex
                flex-direction column

                img
                        width 100vw

.foot
        position fixed
        bottom 0
        left 0
        display flex
        align-items center
        justify-content space-evenly
        width 100vw
        height 13.333333vw
        background-color: #fff

        .foot-img
                display flex
                align-items center
                .cart-all
                        position relative
                        display flex
                        align-items center
                        a
                                img
                                        width 10vw
                                        height 11vw
                                        margin-right 3vw
                                span
                                        position absolute
                                        right 2vw
                                        top -1vw
                                        background #ff6900
                                        width 4vw
                                        height 4vw
                                        border-radius 50%
                                        font-size 3vw
                                        color #fff
                                        display flex
                                        align-items center
                                        justify-content center
                .img-foot2
                        img
                                        width 10vw
                                        height 11vw
                                        margin-right 3vw

        .btn
                width 70vw
                height 12vw
                background-color: #ff6700
                border 0
                border-radius 3vw

</style>