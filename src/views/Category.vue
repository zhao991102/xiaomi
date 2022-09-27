<template>
        <div class="container">
                <div class="header">
                        <i></i>
                        <input type="text" placeholder="搜索商品名称">
                </div>
                <div class="content">
                        <div class="left hide-scroll-bar">
                                <ul class="list-main">
                                        <li v-for="item in listMain" @click="activeId = item.id">
                                                <span v-text="item.name"
                                                        :class="{ active: activeId === item.id }"></span>
                                        </li>
                                </ul>
                        </div>
                        <div class="right hide-scroll-bar">
                                <img :src="avatar" alt="" class="avatar">
                                <ul v-if="listSub.length > 0" class="list-sub">
                                        <li v-for="item in listSub">
                                                <router-link :to='`/list/${item.id}`'>
                                                        <img :src="item.avatar" alt="" class="">
                                                        <span v-text="item.name"></span>
                                                </router-link>
                                        </li>
                                </ul>
                                <!-- <p class="tip" v-else>暂无相关分类，敬请期待</p> -->
                        </div>
                </div>
                <div class="footer">
                        <MiTabBar></MiTabBar>
                </div>
        </div>
</template>

<script>
//导入
import MiTabBar from '../components/MiTabBar/MiTabBar.vue';
import { CategoryAPI } from '@/api';

export default {
        name: "Category",
        //注册
        components: {
                MiTabBar: MiTabBar
        },
        data: function () {
                return {
                        listMain: [],
                        listSub: [],
                        activeId: 0,
                }
        },
        computed: {
                avatar() {
                        return this.activeId !== 0 ? this.listMain.find(item => item.id === this.activeId).avatar : ''
                }
        },
        watch: {
                activeId(newValue) {
                        CategoryAPI.get(newValue)
                                .then(data => this.listSub = Object.freeze(data));

                }
        },
        created() {
                // this.$http({ url: '/category/list/0' })
                CategoryAPI.get(0)
                        .then(data => {
                                this.listMain = Object.freeze(data);
                                this.activeId = data[0].id;
                        });
        }


};
</script>

<style scoped>
.container {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
}

.header {
        width: 100vw;
        height: 13.333333vw;
        flex-shrink: 0;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
}

.header>i {
        width: 8.333333vw;
        height: 8.333333vw;
        background-image: url(../components/MiTabBar/11.png);
        background-size: 6.333333vw 6.333333vw;
        background-repeat: no-repeat;
        background-color: #f7f7f7;
        background-position: 1vw 1vw;
        border-radius: 8.333333vw 0 0 8.333333vw;
}

.header>input {
        width: 80.666666vw;
        height: 8.333333vw;
        border: 0px;
        background-color: #f7f7f7;
        color: #a6a6a6;
        border-radius: 0 8.333333vw 8.333333vw 0;
        outline: none;

}

.content {
        flex-grow: 1;
        border-top: 1px solid #b0b0b0;
        border-bottom: 1px solid #b0b0b0;
        display: flex;
        overflow: auto;
        background-color: #F6F6F6;
}

.left {
        width: 24.8vw;
        flex-shrink: 0;
        overflow: auto;
        background-color: #fff;
}

ul.list-main {
        padding: 0 10px;
}

ul.list-main>li {
        height: 15vw;
        display: flex;
}

ul.list-main>li>span {
        height: 24px;
        margin: auto;
        font-size: 3.333333vw;
        color: #777777;
}

ul.list-main>li>span.active {
        color: #333 !important;
        font-weight: 600;
}

.right {
        flex-grow: 1;
        overflow: auto;
        padding: 0 2.666666vw;
        box-sizing: border-box;
        background: #fff;
}

.avatar {
        width: 100%;
}

ul.list-sub {
        display: flex;
        flex-direction: column;
}

.list-sub>li {
        background-color: #F8F8F8;
        margin: 1vw;
}

.list-sub>li>a {
        display: flex;
        align-items: center;
}

.list-sub>li>a>img {
        width: 18.4vw;
}

.list-sub>li>a>span {
        color: #333;
        font-size: 3.866666vw;
}

.footer {
        width: 100vw;
        flex-shrink: 0;
}
</style>

