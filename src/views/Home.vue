<template>
        <div class="container">
                <div class="header">
                        <img src="../assect/images/home/logo.png" alt="">
                        <div class="input">
                                <i></i>
                                <input type="text" placeholder="搜索商品名称">
                        </div>
                        <i></i>
                </div>

                <div class="content hide-scroll-bar">
                        <div class="banner-wrapper">
                                <swiper class="banner" :options="swiperOption" ref="mySwiper">
                                        <swiper-slide v-for="(item, index) in bannerList" :key="index">
                                                <img :src="item.src" alt="" />
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                </swiper>
                        </div>
                        <div class="li-img">
                                <ul>
                                        <li>
                                                <img src="../assect/images/home/1.webp" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/2.webp" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/3.webp" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/4.webp" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/5.webp" alt="">
                                        </li>
                                </ul>
                                <ul>
                                        <li>
                                                <img src="../assect/images/home/6.webp" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/7.png" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/8.png" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/9.webp" alt="">
                                        </li>
                                        <li>
                                                <img src="../assect/images/home/10.png" alt="">
                                        </li>
                                </ul>
                        </div>
                        <div class="shop123">
                                <img src="../assect/images/home/11.webp" alt="">
                                <div class="shop23">
                                        <img src="../assect/images/home/12.webp" alt="">
                                        <img src="../assect/images/home/13.webp" alt="" class="shop3">
                                </div>
                        </div>
                        <div class="shop4">
                                <img src="../assect/images/home/14.webp" alt="">
                        </div>

                </div>
                <div class="footer">
                        <MiTabBar></MiTabBar>
                </div>

        </div>
</template>


<script>
//导入
import { MiTabBar } from '@/components'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
        name: "Home",
        //注册
        components: {
                MiTabBar,
                swiper,
                swiperSlide,
        },
        data() {
                return {
                        swiperOption: {
                                autoplay: true,
                                speed: 300,
                                loop: true,
                                pagination: {
                                        el: ".swiper-pagination", //分页器
                                        clickable: true,
                                },
                        },
                        bannerList: [
                                {
                                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/21d7712ac34b367ba3a2f9354f81c31d.jpg?thumb=1&w=720&h=360'
                                },
                                {
                                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/d9155ff24a1c61649450e2551dc1deaf.jpg?thumb=1&w=720&h=360'
                                },
                                {
                                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/5782941409586489b093621b3da419de.jpg?thumb=1&w=720&h=360'
                                },
                                {
                                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/1ba1e352f7b3f61d689e23da344411b4.jpg?thumb=1&w=720&h=360'
                                },
                                {
                                        src: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8b0ef0371b09c62adc7675e64d0df487.png?thumb=1&w=720&h=360'
                                },
                        ]
                }
        }
}

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
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: #f2f2f2;
}

.header>img {
        width: 7vw;
}

.input {
        display: flex;
}

.input>i {
        width: 8.333333vw;
        height: 8.333333vw;
        background-image: url(../components/MiTabBar/11.png);
        background-size: 6.333333vw 6.333333vw;
        background-repeat: no-repeat;
        background-color: #f7f7f7;
        background-position: 1vw 1vw;
        border-radius: 8.333333vw 0 0 8.333333vw;
}

.input>input {
        width: 65vw;
        height: 8.333333vw;
        border: 0px;
        background-color: #f7f7f7;
        color: #a6a6a6;
        border-radius: 0 8.333333vw 8.333333vw 0;
        outline: none;

}

.header>i {
        width: 6vw;
        height: 6vw;
        background-image: url(../assect/images/home/top.png);
        background-size: 6.333333vw 6.333333vw;
}

.content {
        flex-grow: 1;
        overflow: auto;
}

.banner-wrapper {}

.banner-wrapper img {
        width: 100vw;
        height: 50vw;
}

.li-img {
        width: 100vw;
}

.li-img>ul {
        width: 100vw;
        display: flex;
}

.li-img>ul>li>img {
        width: 20vw;
}

.shop123 {
        display: flex;
}

.shop123>img {
        width: 49.5vw;
        height: 70vw;
        margin-right: 1vw;
}

.shop23 {
        display: flex;
        flex-direction: column;
}

.shop23>img {
        width: 49.5vw;
        height: 34.5vw;
}

.shop3 {
        margin-top: 1vw;
}


.shop4>img {
        width: 100vw;
        height: 62vw;
}

.footer {
        flex-shrink: 0;

}
</style>