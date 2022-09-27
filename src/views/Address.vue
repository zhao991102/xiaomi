<template>
        <div class="container">
                <div class="header">
                        <a @click="goPrev" href="javascript: void(0)">
                                <i class="iconfont icon-back"></i>
                        </a>
                        <span>收货地址</span>
                        <i></i>
                </div>
                <div class="content">
                        <transition-group class="list" tag="ul">
                                <li v-for="item in $store.state.address.list" :key="item.id">
                                        <div class="name-phone-span">
                                                <div class="name-phone">
                                                        <h6 v-text="item.receiveName"></h6>
                                                        <p v-text="item.receivePhone"></p>
                                                </div>
                                                <span v-text="item.receiveRegion"></span>
                                                <span v-text="item.receiveDetail"></span>
                                        </div>
                                        <div class="btn">
                                                <button @click="remove(item.id)">删除</button>
                                                <button @click="beginUpdate(item)">修改</button>

                                                <button v-if="item.isDefault === 0" @click="setDefault(item.id)">
                                                        设为默认
                                                </button>
                                                <span v-else>默认地址</span>
                                        </div>
                                </li>
                        </transition-group>
                </div>
                <div class="foot">
                        <button @click="beginAdd">+ 新建收货地址</button>
                </div>
                <AddressEdit v-if="isEdit" :model="model" @endEdit="save" @rocket="isEdit = !isEdit"></AddressEdit>
        </div>
</template>

<script>
import { AddressAPI } from '@/api'
import AddressEdit from './AddressEdit.vue';

export default {
        name: "Address",
        components: { AddressEdit },
        data() {
                return {
                        list: [],
                        isEdit: false,
                        model: null,
                }
        },
        created() {
                try {
                        this.$store.dispatch('address/init');
                } catch (e) {
                }
        },
        methods: {
                async setDefault(id) {
                        try {
                                await this.$store.dispatch("address/setDefault", id);
                                this.$miNotice("设置默认地址成功..");
                        } catch (e) {
                        }
                },
                async remove(id) {
                        try {
                                await this.$miConfirm("真删？");
                                await this.$store.dispatch("address/remove", id);
                                this.$miNotice('删除成功..');
                        } catch (e) {
                        }
                },
                goPrev() {
                        this.$router.go(-1)
                },
                beginAdd() {
                        this.model = {
                                id: 0,
                                name: sessionStorage.getItem("name"),
                                receiveName: "",
                                receivePhone: "",
                                receiveRegion: "",
                                receiveDetail: "",
                                isDefault: 0
                        }
                        this.isEdit = !this.isEdit;
                },
                beginUpdate(address) {
                        this.model = Object.assign({}, address);
                        this.isEdit = true;
                },
                async save(address) {
                        address.id = this.model.id;
                        try {
                                await this.$store.dispatch(
                                        `address/${this.model.id === 0 ? "add" : "update"}`,
                                        { ...this.model, ...address }
                                )

                                this.isEdit = false;
                                this.$miNotice('编辑成功..');
                        } catch (e) {
                        }

                }
        },
};
</script>

<style lang="stylus" scoped>
.container
        width 100vw
        height 100vh
        display flex
        flex-direction column

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
                overflow auto

                ul.list
                        display flex
                        flex-direction column

                        li
                                padding 3.2vw 4.444vw
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

                                .btn
                                        display flex
                                        flex-direction column
                                        font-size 3.866666vw

                                        button
                                                border 0
                                                background-color: #ffffff
                                                color #999999

                                        span
                                                color #ff6700
                                                font-size 3.866666vw


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