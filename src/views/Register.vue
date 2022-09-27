<template>
        <div class="login-wrapper">
                <div class="header">

                </div>
                <div class="login-content">
                        <h1>注册小米账号</h1>
                        <p>系统会根据您选择的国家/地区的法律法规存储您的个人信息</p>
                        <input type="text" placeholder="请设置你的用户名 " v-model.trim.lazy="model.name">
                        <input type="password" placeholder="请设置你的密码" v-model.trim.lazy="model.pwd">
                        <input type="phone" placeholder="请输入你的手机号" v-model.trim.lazy="model.phone">
                        <div class="login-content-checked">
                                <input type="checkbox">
                                <span>已阅读并同意小米帐号 <a href="">用户协议</a> 和 <a href="">隐私政策</a></span>

                        </div>
                        <button @click="region">注册</button>
                        <div class="last-span">
                                <span>收不到验证码？</span>
                        </div>
                </div>
        </div>
</template>

<script>
import { UserAPI } from '@/api'


export default {
        name: "region",
        data() {
                return {
                        model: {
                                name: "",
                                pwd: "",
                                phone: ""
                        }
                }
        },
        watch: {
                async 'model.name'(n, o) {
                        let a = await UserAPI.useRepeat(n)
                        if (a !== 0) return this.$miNotice('用户名已存在')
                },
                async 'model.phone'(n, o) {
                        let a = await UserAPI.phoneRepeat(n)
                        if (a !== 0) return this.$miNotice('手机号已存在')
                }

        },

        methods: {
                async region() {
                        try {
                                await UserAPI.region(this.model)
                                this.$miNotice('注册成功')
                                this.$router.push('/login')
                        } catch (e) {
                                console.log(e)
                        }
                },

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
        padding: 3.4vw 7.4vw;
}

.login-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        padding: 0 7.407vw;
        align-items: center;
}

.login-content>h1 {
        font-size: 5.2vw;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        padding: 0 0 5.5vw 0;
}

.login-content>p {
        font-size: 3.7vw;
        color: #0b84ff;
        margin-top: 1.84vw;
}

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

.last-span {
        margin-top: 11vw;
}

.last-span>span {
        font-size: 3.5vw;
        color: #0000008a;
}
</style>