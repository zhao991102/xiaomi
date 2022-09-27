import Vue from 'vue'
import MiAlert from './MiAlert.vue'

export default function (message) {
    const MiAlertConstructor = Vue.extend(MiAlert);
    const instance = new MiAlertConstructor({ data: { message } }).$mount();
    document.body.appendChild(instance.$el);
}