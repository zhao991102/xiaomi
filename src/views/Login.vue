<template>
        <div class="login-wrapper">
                <div class="header">

                </div>
                <div class="login-content">
                        <h1>小米账号登陆</h1>
                        <div class="login-logo">
                                <img src="../assect/images/logo.png" alt="">
                        </div>
                        <p>让每个人都能享受科技的乐趣</p>
                        <input type="text" placeholder="邮箱/手机号码/小米ID" v-model.trim.lazy="model.name">
                        <input type="password" placeholder="请输入密码" v-model.lazy="model.pwd">
                        <div class="login-content-checked">
                                <input type="checkbox">
                                <span>已阅读并同意小米帐号 <a href="">用户协议</a> 和 <a href="">隐私政策</a></span>

                        </div>
                        <button @click="login">登录</button>
                        <div class="login-content-a">
                                <a href="">手机号登录</a> |
                                <router-link to="/register">立即注册</router-link>
                                |
                                <a href="">忘记密码</a>
                        </div>
                        <div class="login-content-span">
                                ——<span>其他方式登录</span>——
                        </div>
                        <div class="login-content-img">
                                <img src="../assect/images/weixin.png" alt="">
                                <img src="../assect/images/weibo.png" alt="">
                                <img src="../assect/images/pingguo.png" alt="">
                        </div>
                </div>
        </div>
</template>

<script>
import { UserAPI } from '@/api'

export default {
        name: "login",
        data: function () {
                return {
                        model: {
                                name: "",
                                pwd: ""
                        }
                }
        },
        methods: {
                async login() {
                        try {
                                let token = await UserAPI.login(this.model)
                                sessionStorage.setItem("token", token);
                                sessionStorage.setItem("name", this.model.name);
                                this.$router.replace(this.$route.query.target || "/home");
                                this.$router.go(-1)
                                this.$miNotice('登陆成功..')
                        } catch (e) { }

                }
        },
        computed: {
                register() {
                        return this.$route.query.data
                }
        }
}
</script>

<style scoped>
.login-wrapper {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
}

.header {
        height: 11.11vw;
        flex-shrink: 0;
}

.login-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 0 7.407vw;
        align-items: center;
}

.login-content>h1 {
        font-size: 5.5555vw;
        font-weight: 600;
        color: rgba(0, 0, 0, 1);
        padding: 0 0 5.5vw 0;
}

.login-logo>img {
        padding-top: 5.2vw;
}

.login-content>p {
        font-size: 3.7vw;
        color: rgba(0, 0, 0, 0.6);
        margin-top: 4vw;
        padding-bottom: 13vw;
}

.login-content-input {}

.login-content>input {
        width: 76.66666vw;
        height: 5vw;
        border: 2px solid transparent;
        background-color: #F0F0F0;
        padding: 4.26666vw 3.703vw;
        outline: none;
        border-radius: 4vw;
        margin-top: 2.8vw;
}

input::-webkit-input-placeholder {
        color: rgba(212, 212, 212);
        opacity: 1;
        font-size: 16px;
}

.login-content-checked {
        margin-top: 5.6vw;
}

.login-content-checked>span {
        font-size: 3.46666vw;
        color: rgb(135, 135, 135);
}

.login-content-checked>span>a {
        color: #0b84ff;
}

.login-content-checked>input {
        margin-right: 3vw;
}

.login-content>button {
        width: 85.192vw;
        height: 12.96266vw;
        padding: 6px 16px;
        border: 0px;
        border-radius: 6.48133vw;
        margin-top: 5.6vw;
        background-color: #0b84ff;
        color: #fff;
        font-size: 4.66666vw;
        font-weight: bold;
}

.login-content-a {
        margin-top: 5.6vw;
        font-size: 3.46666vw;
        color: rgb(135, 135, 135);
}

.login-content-a>a {
        font-size: 3.46666vw;
        color: rgb(135, 135, 135);
        margin: 0 1vw;
}

.login-content-span {
        color: rgba(135, 135, 135, 0.2);
        margin-top: 6.4816vw;
}

.login-content-span>span {
        font-size: 3.2vw;
        color: rgba(135, 135, 135);
}

.login-content-img {
        margin-top: 3.5184vw;
}

.login-content-img>img {
        margin: 0 3.244444vw;
}
</style>