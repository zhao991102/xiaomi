<template>
        <div>
                <ul class="mi-tab-bar">
                        <li>
                                <router-link to="/home">
                                        <i></i>
                                        <span>首页</span>
                                </router-link>
                        </li>
                        <li>
                                <router-link to="/category">
                                        <i></i>
                                        <span>分类</span>
                                </router-link>
                        </li>
                        <li>
                                <router-link to="/discover">
                                        <i></i>
                                        <span>米圈</span>
                                </router-link>
                        </li>
                        <li>
                                <router-link to="/cart">
                                        <i></i>
                                        <span>购物车</span>
                                        <p v-text="allCartCount" v-if="!show"></p>
                                </router-link>
                        </li>

                        <li>
                                <router-link to="/profile">
                                        <i></i>
                                        <span>我的</span>
                                </router-link>
                        </li>
                </ul>
        </div>
</template>

<script scoped>
import { CartAPI } from '@/api';

export default {
        name: "MiTabBar",
        data() {
                return {
                        allCartCount: null,
                        show: false
                }
        },
        async created() {
                try {
                        if (sessionStorage.getItem('token') === null) return this.show = !this.show
                        this.allCartCount = await CartAPI.totalCart()
                } catch (e) { }
        },
        // computed: {
        //         isLogin() {
        //                 return
        //         }
        // }

};

</script>
<style>
ul.mi-tab-bar {
        height: 10.7vw;
        display: flex;
}

ul.mi-tab-bar>li {
        width: 20%;
        display: flex;
}

ul.mi-tab-bar>li:nth-child(1) a i {
        background-image: url(./1.png);
}

ul.mi-tab-bar>li:nth-child(1) a.router-link-active i {
        background-image: url(./2.png);
}

ul.mi-tab-bar>li:nth-child(2) a i {
        background-image: url(./3.png);

}

ul.mi-tab-bar>li:nth-child(2) a.router-link-active i {
        background-image: url(./4.png);

}

ul.mi-tab-bar>li:nth-child(3) a i {
        background-image: url(./5.png);

}

ul.mi-tab-bar>li:nth-child(3) a.router-link-active i {
        background-image: url(./6.png);

}

ul.mi-tab-bar>li:nth-child(4) a i {
        background-image: url(./7.png);

}

ul.mi-tab-bar>li:nth-child(4) a.router-link-active i {
        background-image: url(./8.png);

}

ul.mi-tab-bar>li:nth-child(4) a {
        position: relative;

}



ul.mi-tab-bar>li:nth-child(5) a i {
        background-image: url(./9.png);

}

ul.mi-tab-bar>li:nth-child(5) a.router-link-active i {
        background-image: url(./10.png);

}

ul.mi-tab-bar>li>a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
}

ul.mi-tab-bar>li>a>i {
        width: 5.5vw;
        height: 5.5vw;
        background-size: 100% 100%;
}

ul.mi-tab-bar>li>a>p {
        position: absolute;
        right: 5vw;
        top: 0vw;
        background: #ff6900;
        width: 4vw;
        height: 4vw;
        border-radius: 50%;
        font-size: 3vw;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
}

ul.mi-tab-bar>li>a>span {
        font-size: 3.2vw;
        color: #666;
}

ul.mi-tab-bar>li>a:hover {
        color: red;
}
</style>