<template>
        <div class="paylist">
                <div class="header">
                        <div class="￥-span">￥<span v-text="account"></span></div>
                        <div class="time">
                                <CountDown :deadline="2700" v-slot="time">
                                        {{  time.minute  }}分钟
                                        {{  time.second  }}秒
                                </CountDown>
                        </div>
                        <span @click="goPrev"
                                style="z-index: 999;position: fixed; left: 0; top: 0;;width: 30px ; height: 30px;">
                                <i class="iconfont icon-back"></i>
                        </span>
                </div>
                <div class="content">
                        <div class="address">
                                <div class="receiving">
                                        收货信息：
                                        <div class="receiving-information">
                                                <div class="name-phone">
                                                        <h6
                                                                v-text="this.$store.getters['address/defaultAddress'].receiveName">
                                                        </h6>
                                                        <p
                                                                v-text="this.$store.getters['address/defaultAddress'].receivePhone">
                                                        </p>
                                                </div>
                                                <div class="region-detail">
                                                        <span
                                                                v-text="this.$store.getters['address/defaultAddress'].receiveRegion">

                                                        </span>
                                                        <span
                                                                v-text="this.$store.getters['address/defaultAddress'].receiveDetail">

                                                        </span>
                                                </div>
                                                <span>(266100)</span>
                                        </div>
                                </div>
                        </div>
                        <div class="payways-wrapper">
                                <div class="payways">
                                        <h6>支付工具</h6>
                                        <div class="paylist-div-img">
                                                <div class="paylist-img-span">
                                                        <img src="../assect/images/paylist/1.png" alt="">
                                                        <span>支付宝支付</span>
                                                </div>
                                                <div class="click-img1">
                                                        <span :class="{ active: show === true }"
                                                                @click="show = !show"></span>
                                                </div>
                                        </div>
                                        <div class="paylist-div-img">
                                                <div class="paylist-img-span">
                                                        <img src="../assect/images/paylist/3.png" alt="">
                                                        <span>微信支付</span>
                                                </div>
                                                <div class="click-img2">
                                                        <span :class="{ active: show === false }"
                                                                @click="show = !show"></span>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
                <div class="footer">
                        <button>确认支付 ￥<span v-text="account"></span></button>
                </div>

        </div>
</template>

<script>
import { OrderAPI } from '@/api'
import CountDown from 'vue-timer-countdown'

export default {
        name: 'PayList',
        data() {
                return {
                        account: 0,
                        list: [],
                        show: true
                }
        },
        components: {
                CountDown
        },
        async created() {
                try {
                        this.account = await OrderAPI.getAccount(this.$route.query.count)
                        this.$store.dispatch("address/init");
                } catch (e) { }
        },
        methods: {
                goPrev() {
                        this.$router.go(-1)
                        console.log(1);
                },
        }


};
</script>

<style scoped>
.paylist {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        background-color: #f5f5f5;
}

.header {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8.3vw 2.8vw 5.5vw;
}

.￥-span {
        display: flex;
        color: #ff6900;
        font-size: 6vw;
}

.￥-span>span {
        color: #ff6900;
        font-size: 8vw;
}

.time {
        font-size: 3vw;
        color: #0000004d;
        width: 50vw;
        height: 10vw;
        display: flex;
        justify-content: center;
        align-items: center;
}

.icon-back {
        display: flex;
        width: 46px;
        height: 30px;
        justify-content: center;
        font-size: 30px;
        font-weight: bolder;
}

.content {
        display: flex;
        flex-direction: column;

}

.address {
        width: 92vw;
        margin: 0 auto 2.7vw;
        background: #fff;
        border-radius: 2vw;
}

.receiving {
        line-height: 5vw;
        padding: 4vw;
        display: flex;
        color: #0000004d;
        font-size: 3.3vw;
}

.receiving-information {
        line-height: 5vw;
        margin-left: 3vw;
}

.receiving-information>span {
        line-height: 6vw;
}

.name-phone {
        display: flex;
}

.name-phone>h6 {
        font-size: 3.3vw;
        font-weight: 400;

}

.payways-wrapper {
        width: 92vw;
        margin: 0 auto;
        background: #fff;
        border-radius: 2vw;
}

.payways {
        padding: 4vw;
}

.payways>h6 {
        font-size: 3.88vw;
}

.payways>h6 {
        font-size: 3.88vw;
        height: 9vw;
        line-height: 9vw;
}

.paylist-div-img {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3vw 0;
}

.paylist-img-span {
        display: flex;
        align-items: center;
}

.paylist-img-span>img {
        width: 7vw;
}

.paylist-img-span>span {
        font-size: 3.5vw;
}

.click-img1 {
        width: 6vw;
        height: 6vw;
}

.click-img2 {
        width: 6vw;
        height: 6vw;
}

.click-img1>span {
        display: flex;
        width: 6vw;
        height: 6vw;
        background-image: url(../assect/images/paylist/7.png);
        background-size: 6vw 6vw;
}

.click-img1>span.active {
        display: flex;
        width: 6vw;
        height: 6vw;
        background-image: url(../assect/images/paylist/6.png);
        background-size: 6vw 6vw;
}



.click-img2>span {
        display: flex;
        width: 6vw;
        height: 6vw;
        background-image: url(../assect/images/paylist/7.png);
        background-size: 6vw 6vw;
}

.click-img2>span.active {
        display: flex;
        width: 6vw;
        height: 6vw;
        background-image: url(../assect/images/paylist/6.png);
        background-size: 6vw 6vw;
}

.footer {
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        background-color: #fff;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
}

.footer>button {
        width: 92vw;
        height: 10vw;
        color: #fff;
        font-size: 4.1vw;
        font-weight: 500;
        background: #ff6900;
        border: 1px solid #ff6900;
        border-radius: 5vw;
        margin: 2vw 0;
}

.footer>button>span {
        color: #fff;
        font-size: 4.1vw;
        font-weight: 500;
}
</style>