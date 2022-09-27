// 要写一个函数，动态创建MiNotice组件，并挂载显示再页面上
import Vue from 'vue';
import MiNotice from './MiNotice.vue';


export default function (message) {
        const MiNoticeConstructor = Vue.extend(MiNotice);
        const instance = new MiNoticeConstructor({ data: { message } }).$mount();
        document.body.appendChild(instance.$el);
};
