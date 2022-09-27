import Vue from 'vue'
import MiConfirm from './MiConfirm.vue'

export default function (message) {
    return new Promise((resolve, reject) => {
        const MiConfirmConstructor = Vue.extend(MiConfirm);
        const instance = new MiConfirmConstructor({ data: { message, resolve, reject } }).$mount();
        document.body.appendChild(instance.$el);
    });

}