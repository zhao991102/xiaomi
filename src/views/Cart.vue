<template>
        <div class="container">
                <template v-if="isLogin">
                        <div class="header">
                                <router-link to="/home">
                                        <i class="iconfont icon-back"></i>
                                </router-link>
                                <span>购物车</span>
                                <div class="input-i">
                                        <input type="button" :value="isEdit ? '完成' : '管理'" @click="isEdit = !isEdit" />
                                        <i class="iconfont icon-search"></i>
                                </div>
                        </div>
                        <div class="content">
                                <ul class="list" v-if="list.length > 0">
                                        <li v-for="(item, i) in list" :key="item.id">
                                                <i class="checkbox"
                                                        :class="{ checked: status[i][isEdit ? 'checked2' : 'checked1'] }"
                                                        @click="status[i][isEdit ? 'checked2' : 'checked1'] = !status[i][isEdit ? 'checked2' : 'checked1']"></i>
                                                <div class="item-avatar">
                                                        <img :src="item.avatar" alt="">
                                                </div>
                                                <div class="item-detail">
                                                        <h6 class="name" v-text="item.name"></h6>
                                                        <div class="price-wrapper">
                                                                售价： <span class="price" v-text="item.price"></span> 元
                                                        </div>
                                                        <MiCount :count="item.count" @decrease="decrease(item.id)"
                                                                @increase="increase(item.id)">
                                                        </MiCount>
                                                </div>
                                        </li>
                                </ul>
                                <p v-else>
                                        <img src="../assect/images/cartnul.png" alt="">
                                        购物车还是空的
                                        <router-link to="/home">去逛逛</router-link>
                                </p>
                        </div>
                        <div class="footer" v-show="isEdit">
                                <div class="checkbox-wrapper">
                                        <i class="checkbox" :class="{ checked: isAllChecked }"
                                                @click="isAllChecked = !isAllChecked"></i> 全选
                                </div>
                                <input type="button" value="删除" @click="removeHandler" />
                        </div>
                        <div class="footer" v-show="!isEdit">
                                <div class="checkbox-wrapper">
                                        <i class="checkbox" :class="{ checked: isAllChecked }"
                                                @click="isAllChecked = !isAllChecked"></i> 全选
                                </div>
                                <div class="total-wrapper">
                                        金额<span class="total" v-text="total"></span>元
                                </div>
                                <div class="input">
                                        <router-link to="/category">
                                                <input type="button" value="继续购物">
                                        </router-link>
                                        <input type="button" value="去结算" @click="goOrderConfirm" />
                                </div>
                        </div>
                </template>
                <!--                <div>-->
                <!--                        <img src="" alt="">-->
                <!--                        <span></span>-->
                <!--                        <p></p>-->
                <!--                </div>-->
        </div>
</template>

<script>
import { MiCount } from '@/components';
import { CartAPI } from '@/api';

export default {
        name: "Cart",
        components: {
                MiCount,
        },
        data() {
                return {
                        isLogin: !!sessionStorage.getItem("token"),
                        list: [],
                        status: [],
                        isEdit: false,   // 标识购物车是否进入了编辑状态
                };
        },
        computed: {
                isAllChecked: {
                        get() {
                                return this.status.every(item => item[this.isEdit ? 'checked2' : 'checked1']);

                        },
                        set(value) {
                                this.status.forEach(item => item[this.isEdit ? "checked2" : "checked1"] = value);
                        }
                },
                total() {
                        let total = 0;
                        this.status.forEach((item, i) => {
                                if (item.checked1) {
                                        total += this.list[i].price * this.list[i].count;
                                }
                        });
                        return total;
                },
                removeIds() {
                        return this.status.reduce((ids, item, i) => {
                                item.checked2 && ids.push(this.list[i].id);
                                return ids;
                        }, []);
                },
                buyIds() {
                        return this.status.reduce((ids, item, i) => {
                                item.checked1 && ids.push(this.list[i].id);
                                return ids;
                        }, []);
                }
        },
        async mounted() {
                try {
                        this.list = await CartAPI.get();
                        this.status = this.list.map(() => ({ checked1: true, checked2: false }));
                } catch (e) {
                }
        },
        methods: {
                async decrease(id) {
                        try {
                                await CartAPI.decrease(id)
                                this.list.find(item => item.id === id).count--;
                        } catch (e) {
                        }

                },
                async increase(id) {
                        try {
                                await CartAPI.increase(id)
                                this.list.find(item => item.id === id).count++;
                        } catch (e) {
                        }

                },
                async removeHandler() {
                        try {
                                await this.$miConfirm("月底没钱了？")
                                await CartAPI.remove(this.removeIds)
                                for (let i = 0; i < this.status.length;) {
                                        if (this.status[i].checked2) {
                                                this.list.splice(i, 1);
                                                this.status.splice(i, 1);
                                        } else {
                                                i++;
                                        }
                                }
                        } catch (e) {
                        }
                },
                goOrderConfirm() {
                        console.log(1)
                        this.$router.push(`/orderconfirm?ids=${JSON.stringify(this.buyIds)}`);
                }
        }
};
</script>

<style lang="stylus" scoped>
i.checkbox
        display: flex;
        width: 6vw
        height: 6VW
        margin 0 2vw
        flex-shrink: 0
        background-size: 100% 100%
        background-image: url('../assect/images/icon_checkbox_check.png')

        &.checked
                background-image: url('../assect/images/icon_checkbox_uncheck.png')

.container
        width: 100vw
        height: 100vh
        display: flex
        flex-direction: column

        .header
                flex-shrink 0
                width 100vw
                height 13.333333vw
                display flex
                align-items center
                justify-content space-between
                background-color: #eee;


                a
                        i
                                display: flex
                                width: 46px
                                height 30px
                                justify-content: center
                                font-size 30px
                                color rgba(0, 0, 0, 0.3)
                                font-weight: bolder

                .input-i
                        display flex

                        i
                                width: 12vw
                                height 6vw
                                justify-content: center
                                font-size 6vw
                                color rgba(0, 0, 0, 0.3)
                                font-weight: bolder

                        input
                                border 0
                                background-color: #eee;
                                color rgba(0, 0, 0, 0.7)
                                font-size 4vw
                                font-weight bold
                                transform translateX(-2vw)

                span
                        font-size 4.16vw

        .footer
                height: 13.333333vw
                flex-shrink: 0
                display: flex
                justify-content: space-between;
                align-items center

                .checkbox-wrapper
                        display: flex;

                .total-wrapper
                        color: #999999
                        font-size 3.5vw

                        span.total
                                color #ff6700
                                font-size: 20px
                                font-weight 600

                .input
                        a
                                input
                                        width 20vw
                                        border 0
                                        height 13.333333vw
                                        line-height 13.333333vw
                                        background-color: #eee
                                        color rgba(0, 0, 0, 0.8)
                                        font-size 3.866666vw

                        input
                                width 20vw
                                border 0
                                height 13.333333vw
                                line-height 13.333333vw
                                background-color: #ff6700
                                color #fff
                                font-size 3.866666vw

        .content
                flex-grow: 1
                border-bottom: 1px solid #b0b0b0
                overflow: auto
                background-color: #eee
                p
                        display flex
                        flex-direction column
                        align-items center
                        font-size 3.2vw
                        color #00000045
                        img
                                width 40vw
                        a
                                font-size 4vw
                                color #000000de
                        

                ul.list


                        li
                                display: flex
                                align-items: center
                                padding: 2.5vw 0
                                background-color: #fff
                                margin-bottom 3vw

                                .item-avatar
                                        width: 24.466666vw
                                        height: 24.466666vw
                                        background-color: #ccc
                                        margin-right 3vw
                                        flex-shrink: 0
                                        border 1px solid #eee

                                        img
                                                width: 24.466666vw
                                                height: 24.466666vw


                                .item-detail
                                        flex-grow: 1
                                        align-self: stretch
                                        display: flex
                                        flex-direction: column
                                        justify-content: space-evenly

                                        h6.name
                                                font-size: 3.866666vw
                                                font-weight: 400
                                                color #666666

                                        .price-wrapper
                                                color: #999999
                                                font-size: 3.333333vw

                                                span.price
                                                        font-size: 3.333333vw
</style>
