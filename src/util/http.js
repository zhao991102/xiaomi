import axios from 'axios';
import Vue from 'vue';

async function http(options, withLoading = true) {
        options.headers = { Authorization: sessionStorage.getItem("token") };
        if (withLoading) Vue.prototype.$miLoading.open();
        await new Promise(resolve => setTimeout(() => resolve(), 200))
        return axios(options)
                .then(res => {
                        if (res.status === 200) {
                                let result = res.data;
                                switch (result.code) {
                                        case 200:
                                                if (withLoading) Vue.prototype.$miLoading.close();
                                                return result.data;
                                        case 401:
                                                sessionStorage.removeItem("token")
                                                sessionStorage.removeItem("name")
                                                Vue.prototype.$miLoginAlert();
                                                return;
                                        case 199:
                                        case 500:
                                        case 404:
                                                throw new Error(result.msg); // 有错，显示抛出异常直达下面的catch
                                }
                        } else {
                                throw new Error(res.statusText);
                        }
                })
                .catch(function (error) {
                        if (withLoading) Vue.prototype.$miLoading.close();
                        Vue.prototype.$miAlert(error.message);
                        // catch这里统一对错误进行提示处理
                        // return new Promise(() => {}); // 返回一个永远是pending的Promise对象
                        return Promise.reject(error.message);
                });
}

export default http;