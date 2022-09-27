import Vue from 'vue'
import MiLoginAlert from './MiLoginAlert.vue'

export default function () {
    return new Promise((resolve, reject) => {
        const MiLoginAlertConstructor = Vue.extend(MiLoginAlert);
        const instance = new MiLoginAlertConstructor({ data: { resolve, reject } }).$mount();
        document.body.appendChild(instance.$el);
    });

}