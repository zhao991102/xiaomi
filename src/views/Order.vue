<template>
        <div class="all-wrapper">
                <div class="header">
                        <div class="top">
                                <router-link to="/profile">
                                        <i class="iconfont icon-back"></i>
                                </router-link>
                                <span>商品订单</span>
                                <i class="iconfont icon-search"></i>
                        </div>
                        <div class="tab">
                                <span @click="allList" :class="{ show: change === 0 }">全部订单</span>
                                <span @click="notPay" :class="{ show: change === 1 }">未支付</span>
                                <span @click="hasPay" :class="{ show: change === 2 }">已支付</span>
                        </div>
                </div>
                <div class="content">
                        <ul class="list" v-if="change === 0">
                                <li v-for="(item, i) in payList">
                                        <div class="business">
                                                <img src="../assect/images/logo.png" alt="">
                                                <span>小米商城</span>
                                        </div>
                                        <div class="wrapper" v-for="item2 in payList[i].details">
                                                <img :src="item2.avatar" alt="">
                                                <span v-text="item2.name"></span>
                                                <div class="price-count">
                                                        <div class="price">￥<span v-text="item2.price"></span>
                                                        </div>
                                                        <div class="count">
                                                                X<span v-text="item2.count"></span>
                                                        </div>
                                                </div>
                                        </div>

                                        <div class="title">
                                                <span v-text="item.orderTime.slice(0, 19)"></span>

                                                <div class="sum-price">
                                                        <span>应付金额：</span>
                                                        <p v-text="item.account"></p>元
                                                </div>

                                        </div>
                                        <div class="btn">
                                                <button @click="remove(item.orderId)">取消订单</button>
                                                <a href="javascript:void(0)">
                                                        <button @click="pay(item.orderId)"
                                                                v-if="show = item.pay === 1 ? false : true">立即付款</button>
                                                        <button v-else>再次购买</button>
                                                </a>
                                        </div>


                                </li>
                        </ul>
                        <ul class="list" v-if="change === 1">
                                <li v-for="(item, i) in hasNotPayList">
                                        <div class="business">
                                                <img src="../assect/images/logo.png" alt="">
                                                <span>小米商城</span>
                                        </div>
                                        <div class="wrapper" v-for="item2 in hasNotPayList[i].details">
                                                <img :src="item2.avatar" alt="">
                                                <span v-text="item2.name"></span>
                                                <div class="price-count">
                                                        <div class="price">￥<span v-text="item2.price"></span>
                                                        </div>
                                                        <div class="count">
                                                                X<span v-text="item2.count"></span>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="title">
                                                <span v-text="item.orderTime.slice(0, 19)"></span>

                                                <div class="sum-price">
                                                        <span>应付金额：</span>
                                                        <p v-text="item.account"></p>元
                                                </div>

                                        </div>
                                        <div class="btn">
                                                <button @click="remove(item.orderId)">取消订单</button>
                                                <a href="javascript:void(0)">
                                                        <button @click="pay(item.orderId)">立即付款</button>
                                                </a>
                                        </div>


                                </li>
                        </ul>
                        <ul class="list" v-if="change === 2">
                                <li v-for="(item, i) in alreadyPayList">
                                        <div class="business">
                                                <img src="../assect/images/logo.png" alt="">
                                                <span>小米商城</span>
                                        </div>
                                        <div class="wrapper" v-for="item2 in alreadyPayList[i].details">
                                                <img :src="item2.avatar" alt="">
                                                <span v-text="item2.name"></span>
                                                <div class="price-count">
                                                        <div class="price">￥<span v-text="item2.price"></span>
                                                        </div>
                                                        <div class="count">
                                                                X<span v-text="item2.count"></span>
                                                        </div>
                                                </div>
                                        </div>
                                        <div class="title">
                                                <span v-text="item.orderTime.slice(0, 19)"></span>

                                                <div class="sum-price">
                                                        <span>总金额：</span>
                                                        <p v-text="item.account"></p>元
                                                </div>

                                        </div>
                                        <div class="btn">
                                                <button @click="remove(item.orderId)">取消订单</button>
                                                <a href="javascript:void(0)">
                                                        <button>再次购买</button>
                                                </a>
                                        </div>

                                </li>
                        </ul>
                </div>
                <div class="footer">
                        <MiTabBar></MiTabBar>
                </div>
        </div>
</template>

<script>
import { OrderAPI } from '@/api'
import MiTabBar from '@/components/MiTabBar/MiTabBar.vue';

export default {
        name: "Or4der",
        data() {
                return {
                        payList: [],
                        change: 0,
                        alreadyPayList: [],
                        hasNotPayList: [],
                        show: true,
                        list: []
                };
        },

        methods: {
                async allList() {
                        this.payList = await OrderAPI.getPayList();
                        this.change = 0;
                },
                async notPay() {
                        this.hasNotPayList = await OrderAPI.notPayList();
                        this.change = 1;
                },
                async hasPay() {
                        this.alreadyPayList = await OrderAPI.hasPayList();
                        this.change = 2;
                },
                async remove(id) {
                        await this.$miConfirm('确定要删除吗？')
                        await OrderAPI.removeOrder(id);
                        let a = this.payList.findIndex((item) => {
                                return item.orderId === id
                        })
                        this.payList.splice(a, 1)
                        let aa = this.hasNotPayList.findIndex((item) => {
                                return item.orderId === id
                        })
                        this.hasNotPayList.splice(a, 1)
                        let aaa = this.alreadyPayList.findIndex((item) => {
                                return item.orderId === id
                        })
                        this.alreadyPayList.splice(a, 1)

                },
                async pay(id) {
                        await OrderAPI.payOrder(id);
                        let b = this.payList.find((item) => {
                                return item.orderId === id
                        })
                        let bb = this.hasNotPayList.find((item) => {
                                return item.orderId === id
                        })
                        let bbb = this.alreadyPayList.find((item) => {
                                return item.orderId === id
                        })
                        this.$miConfirm('去付款吗')
                        b.pay = 1

                }
        },
        async created() {

                this.list = await OrderAPI.getPayList();
                this.payList = this.list.reverse();
                this.alreadyPayList = await OrderAPI.hasPayList();
                this.hasNotPayList = await OrderAPI.notPayList();
        },
        components: { MiTabBar }
};
</script>

<style scoped>
.all-wrapper {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        background-color: #f2f2f2;
}

.header {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
}

.top {
        height: 13.333333vw;
        background-color: #f2f2f2;
        width: 100vw;
        height: 13.333333vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
}

.top>i {
        display: flex;
        width: 46px;
        height: 30px;
        justify-content: center;
        font-size: 30px;
        font-weight: bolder;
}

.top>i>span {
        font-size: 4.16vw;
}

.top>a>i {
        display: flex;
        width: 46px;
        height: 30px;
        justify-content: center;
        font-size: 30px;
        font-weight: bolder;
}

.tab {
        display: flex;
        height: 9vw;
        background-color: #fff;
}

.tab>span {
        width: 33.3333333%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3.5vw;
        color: #00000080;
}

.tab>span.show {
        color: #FF6900;
        font-weight: 600;
}

.content {
        flex-grow: 1;
        widows: 100vw;
        overflow: auto;
}

.list {}

.list>li {
        margin-top: 2.5vw;
        display: flex;
        flex-direction: column;
        margin-top: 3vw;
        background-color: #fff;
        padding: 0 4vw;
}

.business {
        display: flex;
        align-items: center;
        height: 10.5vw;
        border-bottom: 0.3vw solid #ececec;
}

.business>img {
        width: 5.5vw;
}

.business>span {
        font-size: 4vw;
        margin-left: 3vw;
}

.wrapper {
        display: flex;
        align-items: center;
        padding: 2.6vw 0;
}

.wrapper>img {
        width: 16vw !important;
        height: 16vw;
        flex-shrink: 0;
}

.wrapper>span {
        flex-grow: 1;
        font-size: 4vw;
}

.price-count {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;

}

.price {
        font-size: 4vw;
        color: #00000080;
}

.count {
        font-size: 3.2vw;
        color: #00000080;
}

.title {
        display: flex;
        justify-content: space-between;
        padding: 2.6vw 0;
        border-top: 0.3vw solid #ececec;
}

.title>span {
        font-size: 3vw;
        color: #00000080;
}

.sum-price {
        display: flex;
        font-size: 4.1vw;
        color: #00000080;
}

.sum-price>span {
        font-size: 3.3vw;
        color: #000;
}

.btn {
        display: flex;
        justify-content: end;
        padding: 2vw 0 3vw 0;
}

.btn>button {
        width: 16vw;
        height: 8vw;
        font-size: 3vw;
        color: #00000080;
        background-color: #fff;
        border: 0.3vw solid #00000080;
}

.btn>a>button {
        width: 16vw;
        height: 8vw;
        font-size: 3vw;
        color: #FF6900;
        background-color: #fff;
        border: 0.3vw solid #FF6900;
        margin-left: 3vw;

}

.footer {
        height: 13vw;
        flex-shrink: 0;
        box-shadow: 0 3px 14px 2px rgb(0 0 0 / 12%);
}

.wrapper>img {
        width: 25vw
}
</style>