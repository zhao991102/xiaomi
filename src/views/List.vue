<template>
        <div class="list-wrapper">
                <div class="header">
                        <router-link to="/category">
                                <i class="iconfont icon-back"></i>
                        </router-link>
                        <input v-model.trim.lazy="search.name" placeholder="请输入查询关键字。。" type="text">
                        <router-link to="/home">
                                <i class="iconfont icon-home"></i>
                        </router-link>
                </div>
                <div class="order">
                        <span :class="{ active: search.orderCol === 'price' }" @click="changeOrder('price')">
                                价格
                                <i :class="`iconfont icon-${search.orderDir}`">
                                </i>
                        </span>
                        <span :class="{ active: search.orderCol === 'sale' }" @click="changeOrder('sale')">
                                销量
                                <i :class="`iconfont icon-${search.orderDir}`">

                                </i>
                        </span>
                        <span :class="{ active: search.orderCol === 'rate' }" @click="changeOrder('rate')">
                                好评
                                <i :class="`iconfont icon-${search.orderDir}`">
                                </i>
                        </span>
                        <span>
                                筛选
                        </span>
                </div>
                <div ref="scroll" class="content">
                        <div>
                                <ul>
                                        <li v-for="item in list">
                                                <router-link :to="`/detail/${item.id}`">
                                                        <img :src="item.avatar" alt="">
                                                        <div class="name-brief-price-rate-sale">
                                                                <h4 v-text="item.name"></h4>
                                                                <p v-text="item.brief"></p>
                                                                <div class="price">
                                                                        ￥ <span v-text="item.price"></span>起
                                                                </div>
                                                                <div class="rate-sale">
                                                                        好评：<span v-text="item.rate"></span> |
                                                                        销量：<span v-text="item.sale"></span>
                                                                </div>
                                                        </div>
                                                </router-link>
                                        </li>
                                </ul>
                                <p class="tip"> —— <span v-text="tip"></span> —— </p>
                        </div>
                </div>
                <i class="iconfont icon-top rocket" @click="toTop"></i>
        </div>
</template>

<script>
import { ProductAPI } from '@/api'
import IScroll from 'iscroll';
import imagesloaded from 'imagesloaded'

export default {
        name: "List",

        data() {
                return {
                        search: {
                                name: "",
                                cid: parseInt(this.$route.params.cid),
                                orderCol: "price", //price | sale | rate
                                orderDir: "asc",    //asc | desc
                                pageSize: 6
                        },
                        list: [],
                        isLoading: false, //标识当前有没有正在发送ajax处于loading状态
                        hasMore: true //标识按当前搜索条件还有没有更多商品可供加载
                };
        },
        computed: {
                tip() {
                        if (this.isLoading) return "加载中";
                        if (this.hasMore) return '上拉加载更多';
                        else if (this.list.length === 0) return '暂无相关商品， 敬请期待';
                        else return '已到达底部';
                }
        },
        methods: {
                changeOrder(col) {
                        if (this.isLoading) return
                        this.$miNotice('您的操作有点频繁')
                        if (col !== this.search.orderCol)
                                this.search.orderCol = col;
                        else
                                this.search.orderDir = this.search.orderDir === "asc" ? "desc" : "asc";
                },
                async getList(isLoadMore = false) {
                        try {
                                if (!isLoadMore) this.list = [];
                                this.isLoading = true;
                                let list = await ProductAPI.get({ ...this.search, begin: isLoadMore ? this.list.length : 0 });
                                this.hasMore = this.search.pageSize === list.length
                                if (isLoadMore) this.list = [...this.list, ...list];
                                else this.list = list;
                                if (this.scroll && !isLoadMore) this.scroll.scrollTo(0, 0)
                                this.isLoading = false;
                        } catch (e) {
                                alert(111)
                        }

                },
                toTop() {
                        if (this.scroll) this.scroll.scrollTo(0, 0, 400)
                }
        },

        watch: {
                search: {
                        handler: function () {
                                this.getList()
                        },
                        deep: true,              //开启对对象search的深度监听
                        immediate: true      //指定页面一进来也认为search变化
                },
                list() {
                        this.$nextTick(() => {
                                imagesloaded(this.$refs.scroll, () => {
                                        if (this.scroll) this.scroll.refresh();
                                        else {
                                                this.scroll = new IScroll(this.$refs.scroll, {
                                                        bounce: false,
                                                        momentum: false,
                                                        deceleration: 0.003,
                                                        click: true,
                                                });
                                                this.scroll.on('scrollEnd', () => {
                                                        if (this.isLoading) return
                                                        if (!this.hasMore) return;
                                                        if (this.scroll.maxScrollY !== this.scroll.y) return;
                                                        this.getList(true);
                                                })
                                        }
                                })
                        })
                }
        },
        beforeDestroy() {
                if (this.scroll) {
                        this.scroll.destroy();
                        this.scroll = null;
                }
        },
        created() {
                console.log('created执行了');
        },
        mounted() {
                console.log('mounted执行了');
        },
        activated() {
                console.log('activated执行了');
        },
        deactivated() {
                console.log('deactived执行了');
        }
};
</script>

<style lang="stylus" scoped>
i.rocket
        position fixed
        right 3vw
        bottom 3vw
        z-index 100
        width 13.333333vw
        height 13.333333vw
        border-radius 50%
        background-color: rgba(0, 0, 0, 0.3);
        text-align center
        line-height 13.333333vw
        font-size 7vw
        color #fff

.list-wrapper
        display: flex
        flex-direction column
        width: 100vw
        height: 100vh

        .header
                height: 12vw
                flex-shrink: 0
                display: flex
                align-items: center

                input
                        flex-grow: 1
                        margin: 0 5.333333vw
                        height: 70%
                        outline: none

                i
                        display: flex
                        width: 12vw
                        justify-content: center
                        font-size 8vw
                        font-weight: bolder

        .order
                height: 13.333333vw
                flex-shrink: 0
                display: flex
                justify-content: center

                span
                        padding: 0 5.333333vw
                        display: flex
                        align-items center

                        i
                                font-size 7vw

                        &.active
                                color: red

        .content
                flex-grow: 1
                overflow: hidden
                border-top: 1px solid #b0b0b0
                touch-action: pan-y

                p.tip
                        height: 18.666666vw
                        line-height 18.666666vw
                        text-align: center
                        font-size: 4vw
                        color: #999

                ul
                        display: flex
                        flex-direction column

                        li
                                padding 4vw 4vw 4vw 0
                                display: flex
                                border-bottom 1px solid rgba(0, 0, 0, 0.05)

                                a
                                        display flex

                                        img
                                                width: 35.2vw

                                        .name-brief-price-rate-sale
                                                display flex
                                                flex-direction column

                                                h4
                                                        font-size 4vw
                                                        font-weight 400
                                                        color #000000DE
                                                        margin-top 4vw

                                                p
                                                        font-size 3vw
                                                        color #0000008A
                                                        margin-top 1vw

                                                .price
                                                        font-size 3.333333vw
                                                        color #ff6700
                                                        margin-top 3.5vw

                                                        span
                                                                font-size 4.5vw

                                                .rate-sale
                                                        display flex
                                                        font-size 3vw
                                                        color #0000008A
                                                        margin-top 1.5vw

</style>