<template>
        <div class="box">
                <div class="header">
                        <router-link to="/cart">
                                <i class="iconfont icon-back"></i>
                        </router-link>
                        <span>用户结算</span>
                        <i></i>
                </div>
                <div class="content">
                        <div class="address" v-if="!showDefault">
                                <div class="name-phone-span">
                                        <div class="name-phone">
                                                <!-- <h6 v-text="$store.getters['address/defaultAddress'].receiveName"></h6>
                                                <p v-text="$store.getters['address/defaultAddress'].receivePhone"></p> -->
                                                <h6 v-text="addList.receiveName"></h6>
                                                <p v-text="addList.receivePhone"></p>
                                        </div>
                                        <div class="region-detail">
                                                <span v-text="addList.receiveRegion">

                                                </span>
                                                <span v-text="addList.receiveDetail">

                                                </span>
                                                <!-- <span
                                                        v-text="$store.getters['address/defaultAddress'].receiveRegion"></span>
                                                <span
                                                        v-text="$store.getters['address/defaultAddress'].receiveDetail"></span> -->
                                        </div>
                                        <span>(266100)</span>
                                </div>
                                <span @click="isEdit = true">
                                        <i class="i"> > </i>
                                </span>
                        </div>


                        <div class="address" v-else>
                                <div class="name-phone-span">
                                        <div class="name-phone">
                                                <!-- <h6 v-text="$store.getters['address/defaultAddress'].receiveName"></h6>
                                                <p v-text="$store.getters['address/defaultAddress'].receivePhone"></p> -->
                                                <h6 v-text="addressList.receiveName"></h6>
                                                <p v-text="addressList.receivePhone"></p>
                                        </div>
                                        <div class="region-detail">
                                                <span v-text="addressList.receiveRegion">

                                                </span>
                                                <span v-text="addressList.receiveDetail">

                                                </span>
                                                <!-- <span
                                                        v-text="$store.getters['address/defaultAddress'].receiveRegion"></span>
                                                <span
                                                        v-text="$store.getters['address/defaultAddress'].receiveDetail"></span> -->
                                        </div>
                                        <span>(266100)</span>
                                </div>
                                <span @click="isEdit = true">
                                        <i class="i"> > </i>
                                </span>
                        </div>
                        <div class="cart">
                                <ul class="list">
                                        <li v-for="item in buyList">
                                                <div class="img-h6">
                                                        <img :src="item.avatar" alt="">
                                                        <h6 class="name" v-text="item.name"></h6>
                                                </div>
                                                <div class="span-p">
                                                        <span v-text="item.count !== 1 ? item.count + 'x' : ''"></span>
                                                        <p v-text="item.price"></p>.00
                                                </div>
                                        </li>
                                </ul>
                        </div>
                        <div class="ul-li-span-p">
                                <ul>
                                        <li>
                                                <span>运费</span>
                                                <p>包邮</p>
                                        </li>
                                        <li>
                                                <span>电子普通发票</span>
                                                <p>个人</p>
                                        </li>
                                        <li>
                                                <span>优惠券</span>
                                                <p>无可用</p>
                                        </li>
                                </ul>
                        </div>
                        <div class="ul-li-p-span">
                                <ul>
                                        <li>
                                                <p>商品价格</p>
                                                <span v-text="getSum"></span>.00
                                        </li>
                                        <li>
                                                <p>配送费用</p>
                                                <span>0.00</span>
                                        </li>
                                </ul>
                        </div>
                        <div class="absolute" v-if="!showDefault">
                                <p> 配送至：</p>
                                <span v-text="addList.receiveRegion">

                                </span>
                                <span v-text="addList.receiveDetail">

                                </span>
                                <!-- <span v-text="$store.getters['address/defaultAddress'].receiveRegion"></span>
                                <span v-text="$store.getters['address/defaultAddress'].receiveDetail"></span> -->
                        </div>
                        <div class="absolute" v-else>
                                <p> 配送至：</p>
                                <span v-text="addressList.receiveRegion">

                                </span>
                                <span v-text="addressList.receiveDetail">

                                </span>
                                <!-- <span v-text="$store.getters['address/defaultAddress'].receiveRegion"></span>
                                <span v-text="$store.getters['address/defaultAddress'].receiveDetail"></span> -->
                        </div>
                </div>

                <div class="foot">
                        <div class="p-span">
                                <p>
                                        共<span v-text="getCount"></span>件
                                </p>
                                总计：<span v-text="getSum"></span><span>.00</span>
                        </div>
                        <button @click="goPay">去付款</button>
                </div>


                <div class="dialog-wrapper" v-show="isEdit" @click.self="isEdit = false">
                        <div class="dialog">
                                <h2>选择地址</h2>
                                <ul>
                                        <li v-for="item in $store.state.address.list" :key="item.id"
                                                @click="changeList(item)">
                                                <div class="name-phone-span">
                                                        <div class="name-phone">
                                                                <h6 v-text="item.receiveName"></h6>
                                                                <p v-text="item.receivePhone"></p>
                                                        </div>
                                                        <span v-text="item.receiveRegion"></span>
                                                        <span v-text="item.receiveDetail"></span>
                                                </div>
                                        </li>
                                </ul>
                        </div>
                </div>
        </div>
</template>

<script>
import { CartAPI } from '@/api'
import { OrderAPI } from "@/api";

export default {
        name: "OrderConfirm",
        data() {
                return {
                        showDefault: false,
                        isEdit: false,
                        buyList: [],
                        addList: [],
                        payList: {
                                ids: null,
                                account: 0,
                                addressId: 85,
                        },
                        bbb: 0,
                        addressList: {
                                id: 0,
                                isDefault: 0,
                                receiveName: "",
                                receivePhone: "",
                                receiveRegion: "",
                                receiveDetail: ""
                        }
                };
        },
        computed: {
                getSum() {
                        let sum = 0
                        this.buyList.forEach(item => {
                                sum += item.price * item.count
                        })
                        return sum
                },
                getCount() {
                        let count = 0
                        this.buyList.forEach(item => {
                                count += item.count
                        })
                        return count
                },
                aaa() {
                        return JSON.parse(this.$route.query.ids)
                }
        },
        async created() {
                try {
                        const ids = JSON.parse(this.$route.query.ids);
                        // Promise.all()同时开启多个异步耗时任务，全部任务成功
                        //则Promise.all认为成功，有一个失败，Promise.all则失败
                        //Promise.all自身返回一个Promise对象
                        const [list] = await Promise.all([
                                CartAPI.getByIds(ids),                          //拿到要回显的购物记录数据
                                this.$store.dispatch("address/init"),      //通知vuex数据仓库准备好address列表
                        ]);
                        this.buyList = list;
                        this.addList = this.$store.getters['address/defaultAddress']
                        this.payList.ids = this.aaa
                        this.payList.account = this.getSum;
                        this.payList.addressId = this.addList.id
                } catch (e) {
                }
        },
        methods: {
                async goPay() {
                        this.bbb = await OrderAPI.getList(this.payList)
                        this.$miNotice('添加成功')
                        this.$router.push(`/paylist?count=${this.bbb}`)

                },
                changeList(data) {
                        this.addressList = { ...data };
                        this.payList.addressId = data.id
                        this.isEdit = false
                        this.showDefault = true
                }
        },

};
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
                padding 2vw 4.444533vw
                h2
                        padding 2vw 0
                        color #ff6900
                        border-bottom 0.4vw solid gray
                ul
                        display flex
                        flex-direction column   
                        li
                                padding 3.2vw 0vw
                                border-bottom: 0.1vw solid rgba(0, 0, 0, .1)
                                display flex
                                justify-content space-between

                                &.v-enter, &.v-leave-to
                                        opacity 0

                                &.v-enter-active, &.v-leave-active
                                        transition: all 1s

                                &.v-enter-to, &.v-leave
                                        opacity: 1

                                .name-phone-span
                                        display flex
                                        flex-direction column
                                        align-items left

                                        .name-phone
                                                display flex


                                                h6
                                                        font-size 4.44444vw
                                                        margin-right 2vw
                                                        font-weight 400

                                                p
                                                        font-size 3.866666vw

                                        span
                                                font-size 3.333333vw
                                                color rgba(0, 0, 0, 0.5)
.box
        display flex
        flex-direction column
        width 100vw
        height 100vh

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
                width 100vw
                background-color: #F5F5F5

                .address
                        display flex
                        align-items center
                        justify-content space-between
                        padding 5.5555467vw 5.5555467vw 4.166666vw
                        height 15.333333vw
                        background-image: url("../assect/images/bd1.png")
                        background-size: 9vw 1.2vw;
                        background-repeat repeat-x
                        background-color: #fff
                        margin-bottom 3vw
                        border-bottom: 0.3vw solid #e0e0e0

                        .name-phone-span
                                display flex
                                flex-direction column
                                justify-content space-between
                                height 100%

                                .name-phone
                                        display flex

                                        h6
                                                font-size 4vw
                                                color #3c3c3c
                                                font-weight bold
                                                margin-right 1.5vw

                                        p
                                                font-size 4vw
                                                color #3c3c3c
                                                font-weight bold

                                .region-detail
                                        display flex

                                        span
                                                font-size 3vw
                                                color #757575
                                                margin-right 1vw

                                span
                                        font-size 3vw
                                        color #757575

                        span
                                .i
                                        font-style normal
                                        display flex
                                        justify-content center
                                        align-items center
                                        font-size 6vw

                .cart
                        border-top: 0.3vw solid #e0e0e0
                        border-bottom 0.3vw solid #e0e0e0
                        margin-bottom 3vw

                        .list
                                li
                                        display flex
                                        justify-content space-between
                                        width 100vw
                                        background-color: #fff;
                                        padding 2vw 0
                                        border-bottom: 0.3vw solid #eee

                                .img-h6
                                        display flex
                                        align-items center
                                        margin-left 5.5vw

                                        img
                                                width 11vw

                                        h6
                                                font-size 3vw
                                                font-weight 400

                                .span-p
                                        display flex
                                        align-items center
                                        margin-right: 5.5vw
                                        font-size 3vw
                                        color #3c3c3c
                                        font-weight 600

                                        span
                                                font-size 3vw
                                                color #3c3c3c
                                                font-weight 400

                                        p
                                                font-size 3vw
                                                color #3c3c3c
                                                font-weight 600

                .ul-li-span-p
                        border-top: 0.3vw solid #e0e0e0
                        border-bottom: 0.3vw solid #e0e0e0
                        margin-bottom 3vw

                        ul
                                li
                                        display flex
                                        justify-content space-between
                                        padding 3vw 0
                                        background-color: #fff
                                        border-bottom: 0.3vw solid #eee

                                        span
                                                font-size 3.4vw
                                                font-weight 600
                                                margin-left 5.5vw

                                        p
                                                font-size 3.4vw
                                                color #b0b0b0
                                                margin-right: 5.5vw

                .ul-li-p-span
                        border-top: 0.3vw solid #e0e0e0
                        border-bottom: 0.3vw solid #e0e0e0

                        ul
                                li
                                        display flex
                                        padding 3vw 0
                                        background-color: #fff
                                        border-bottom: 0.3vw solid #eee
                                        font-size 3.4vw
                                        color #3c3c3c

                                        p
                                                font-size 3.4vw
                                                font-weight 600
                                                margin 0 5.5vw

                                        span
                                                font-size 3.4vw
                                                color #3c3c3c

                .absolute
                        position fixed
                        left 0
                        bottom 13.333333vw
                        width 100vw
                        background-color: #fbf3c4
                        color #b57842
                        font-size 3.2vw
                        padding 1.8vw 0
                        overflow hidden
                        display flex

                        p
                                margin-left 3vw

                        span
                                margin-right 1vw

        .foot
                flex-shrink 0
                height 13.333333vw
                display flex
                align-items center

                .p-span
                        display flex
                        font-size 4.2vw
                        color #ff6700
                        margin 0 auto

                        p
                                font-size 4vw
                                margin-right: 1vw

                                span
                                        font-size 4.2vw
                                        font-weight 400
                                        color #ff6700

                        span
                                font-size 4.2vw
                                font-weight 600
                                color #ff4d14

                button
                        width 50vw
                        height 100%
                        background-color: #ff5722
                        border 0
                        font-weight 500
                        font-size 4.2vw
                        color #fff


</style>