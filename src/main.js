import Vue from 'vue';
import App from './App.vue';
import './assect/css/reset.css';
import router from './router';
import http from './util/http.js';
import store from './store';
import MiMessage from '@/components'
import './assect/css/iconfont.css'

Vue.prototype.$http = http
//以Vue.use()的方法来对Vue.prototype进行扩展是最优雅的手法
Vue.use(MiMessage);
Vue.prototype.$eventBus = new Vue();

new Vue({
        el: "#app",
        router,
        store,
        //  渲染 呈现
        render: h => h(App)
});